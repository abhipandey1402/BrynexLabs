'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { ContactSubmission, LeadStatus } from '@/lib/contactStore';

function Spinner({ className = '' }: { className?: string }) {
    return (
        <svg className={`animate-spin ${className}`} width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
            <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}

type StatusFilter = 'all' | 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
type SortOrder = 'newest' | 'oldest' | 'followup' | 'value';

const PIPELINE: LeadStatus[] = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];

const STATUS_STYLES: Record<LeadStatus, string> = {
    new: 'bg-accent/10 text-accent border-accent/30',
    contacted: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    qualified: 'bg-violet-500/10 text-violet-500 border-violet-500/30',
    proposal: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    won: 'bg-green-500/10 text-green-500 border-green-500/30',
    lost: 'bg-red-500/10 text-red-500 border-red-500/30',
    closed: 'bg-background-secondary text-foreground-muted border-border',
};

const EMAIL_STYLES: Record<string, string> = {
    sent: 'bg-green-500/10 text-green-500 border-green-500/30',
    failed: 'bg-red-500/10 text-red-500 border-red-500/30',
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
};

function timeAgo(iso: string): string {
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function fullTimestamp(iso: string): string {
    return new Date(iso).toLocaleString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit',
    });
}

/** ISO-3166 alpha-2 → flag emoji ("IN" → 🇮🇳). */
function countryFlag(code?: string): string {
    if (!code || code.length !== 2) return '';
    return String.fromCodePoint(...code.toUpperCase().split('').map((c) => 0x1f1a5 + c.charCodeAt(0)));
}

function deviceFromUA(ua?: string): string {
    if (!ua) return '—';
    const isMobile = /mobile|iphone|android/i.test(ua);
    const browser = /edg\//i.test(ua) ? 'Edge'
        : /chrome\//i.test(ua) ? 'Chrome'
        : /safari\//i.test(ua) ? 'Safari'
        : /firefox\//i.test(ua) ? 'Firefox'
        : 'Browser';
    return `${isMobile ? 'Mobile' : 'Desktop'} · ${browser}`;
}

function todayISO(): string {
    return new Date().toISOString().slice(0, 10);
}

function isOverdue(lead: ContactSubmission): boolean {
    return Boolean(
        lead.followUpAt &&
        lead.followUpAt < todayISO() &&
        !['won', 'lost', 'closed'].includes(lead.status),
    );
}

function escapeCsv(value: unknown): string {
    const s = String(value ?? '');
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function exportCsv(leads: ContactSubmission[]) {
    const headers = [
        'Name', 'Email', 'Phone', 'Status', 'Priority', 'Deal Value (USD)', 'Follow-up',
        'Preferred Slot', 'Timezone', 'Country', 'Source Page', 'Landing Page', 'Referrer',
        'UTM Source', 'UTM Medium', 'UTM Campaign', 'Project Details', 'Submitted', 'Notes',
    ];
    const rows = leads.map((l) => [
        l.name, l.email, l.phone ?? '', l.status, l.priority ? 'yes' : '', l.value ?? '',
        l.followUpAt ?? '', `${l.preferredDate} ${l.preferredTime}`, l.timezone, l.country ?? '',
        l.sourcePath ?? '', l.landingPage ?? '', l.referrer ?? '',
        l.utmSource ?? '', l.utmMedium ?? '', l.utmCampaign ?? '',
        l.projectDetails ?? '', l.createdAt,
        (l.notes ?? []).map((n) => `[${n.createdAt.slice(0, 10)}] ${n.text}`).join(' | '),
    ].map(escapeCsv).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brynex-leads-${todayISO()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

export default function LeadsList({ initialLeads }: { initialLeads: ContactSubmission[] }) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [starredOnly, setStarredOnly] = useState(false);
    const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
    const [expanded, setExpanded] = useState<string | null>(null);
    // busyKey targets the exact control being saved, e.g. "<id>:status:won".
    const [busyKey, setBusyKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const [noteDraft, setNoteDraft] = useState('');
    const [valueDraft, setValueDraft] = useState<string>('');
    const [valueEditing, setValueEditing] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const refreshing = useRef(false);

    // Keep the loader visible until the refreshed server data has actually
    // rendered — clearing it after the fetch alone makes the UI feel stuck.
    useEffect(() => {
        if (!isPending && refreshing.current) {
            refreshing.current = false;
            setBusyKey(null);
        }
    }, [isPending]);

    // Legacy 'closed' leads ride along in the Lost bucket.
    const inBucket = (lead: ContactSubmission, bucket: StatusFilter) =>
        bucket === 'all' || lead.status === bucket || (bucket === 'lost' && lead.status === 'closed');

    const counts = useMemo(() => {
        const c: Record<StatusFilter, number> = {
            all: initialLeads.length, new: 0, contacted: 0, qualified: 0, proposal: 0, won: 0, lost: 0,
        };
        for (const l of initialLeads) {
            const key = l.status === 'closed' ? 'lost' : l.status;
            if (key in c) c[key as StatusFilter]++;
        }
        return c;
    }, [initialLeads]);

    const metrics = useMemo(() => {
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const inPipeline = counts.contacted + counts.qualified + counts.proposal;
        const decided = counts.won + counts.lost;
        const pipelineValue = initialLeads
            .filter((l) => !['won', 'lost', 'closed'].includes(l.status))
            .reduce((sum, l) => sum + (l.value ?? 0), 0);
        const wonValue = initialLeads
            .filter((l) => l.status === 'won')
            .reduce((sum, l) => sum + (l.value ?? 0), 0);
        return {
            thisWeek: initialLeads.filter((l) => new Date(l.createdAt).getTime() > weekAgo).length,
            inPipeline,
            winRate: decided > 0 ? Math.round((counts.won / decided) * 100) : null,
            pipelineValue,
            wonValue,
            overdue: initialLeads.filter(isOverdue).length,
            emailFailures: initialLeads.filter((l) => l.emailStatus === 'failed').length,
        };
    }, [initialLeads, counts]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const list = initialLeads.filter((lead) => {
            if (!inBucket(lead, statusFilter)) return false;
            if (starredOnly && !lead.priority) return false;
            if (q) {
                const haystack = [
                    lead.name, lead.email, lead.phone, lead.projectDetails, lead.sourcePath,
                    lead.utmSource, lead.utmCampaign, lead.country,
                    ...(lead.notes ?? []).map((n) => n.text),
                ].join(' ').toLowerCase();
                if (!haystack.includes(q)) return false;
            }
            return true;
        });
        return list.sort((a, b) => {
            switch (sortOrder) {
                case 'oldest': return a.createdAt.localeCompare(b.createdAt);
                case 'value': return (b.value ?? 0) - (a.value ?? 0);
                case 'followup': {
                    const av = a.followUpAt ?? '9999-12-31';
                    const bv = b.followUpAt ?? '9999-12-31';
                    return av.localeCompare(bv);
                }
                default: return b.createdAt.localeCompare(a.createdAt);
            }
        });
    }, [initialLeads, query, statusFilter, starredOnly, sortOrder]);

    const act = async (key: string, fn: () => Promise<Response>, successNotice?: string) => {
        setBusyKey(key);
        setError(null);
        setNotice(null);
        try {
            const res = await fn();
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(data.error ?? 'Something went wrong.');
                setBusyKey(null);
                return;
            }
            if (successNotice) setNotice(successNotice);
            refreshing.current = true;
            startTransition(() => router.refresh());
        } catch {
            setError('Network error — please try again.');
            setBusyKey(null);
        }
    };

    const patch = (key: string, id: string, payload: Record<string, unknown>, successNotice?: string) =>
        act(key, () => fetch(`/api/admin/leads/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }), successNotice);

    const retryEmail = (id: string) =>
        act(`${id}:retry`, () => fetch(`/api/admin/leads/${id}/retry-email`, { method: 'POST' }), 'Notification email sent.');

    const remove = (id: string, name: string) => {
        if (!window.confirm(`Delete the submission from "${name}"? This cannot be undone.`)) return;
        return act(`${id}:delete`, () => fetch(`/api/admin/leads/${id}`, { method: 'DELETE' }));
    };

    const submitNote = (id: string) => {
        const text = noteDraft.trim();
        if (!text) return;
        return act(`${id}:note`, () => fetch(`/api/admin/leads/${id}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        }), 'Note added.').then(() => setNoteDraft(''));
    };

    const removeNote = (id: string, noteId: string) =>
        act(`${id}:note-del:${noteId}`, () => fetch(`/api/admin/leads/${id}/notes?noteId=${noteId}`, { method: 'DELETE' }));

    const saveValue = (id: string) => {
        const raw = valueDraft.trim();
        setValueEditing(null);
        if (raw === '') return patch(`${id}:value`, id, { value: null });
        const num = Number(raw);
        if (!Number.isFinite(num) || num < 0) {
            setError('Deal value must be a positive number.');
            return;
        }
        return patch(`${id}:value`, id, { value: num });
    };

    const [copiedId, setCopiedId] = useState<string | null>(null);
    const copyEmail = async (id: string, email: string) => {
        try {
            await navigator.clipboard.writeText(email);
            setCopiedId(id);
            setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 2000);
        } catch {
            setError('Could not copy to clipboard.');
        }
    };

    const stats = [
        { label: 'Total Leads', value: counts.all },
        { label: 'New', value: counts.new, accent: counts.new > 0 ? 'text-accent' : undefined },
        { label: 'In Pipeline', value: metrics.inPipeline },
        { label: 'Won', value: `${counts.won}${metrics.winRate !== null ? ` · ${metrics.winRate}%` : ''}` },
        { label: 'Pipeline Value', value: metrics.pipelineValue > 0 ? `$${metrics.pipelineValue.toLocaleString()}` : '—' },
        { label: 'This Week', value: metrics.thisWeek },
        { label: 'Overdue Follow-ups', value: metrics.overdue, accent: metrics.overdue > 0 ? 'text-red-500' : 'text-green-500' },
        { label: 'Email Failures', value: metrics.emailFailures, accent: metrics.emailFailures > 0 ? 'text-red-500' : 'text-green-500' },
    ];

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-border bg-background-card px-5 py-4">
                        <p className={`text-2xl font-black tracking-tight ${stat.accent ?? 'text-foreground'}`}>{stat.value}</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-foreground-secondary mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {error && (
                <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500">
                    {error}
                </div>
            )}
            {notice && (
                <div role="status" className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-500">
                    {notice}
                </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-background-secondary border border-border w-fit" role="tablist" aria-label="Filter by status">
                    {(['all', 'new', 'contacted', 'qualified', 'proposal', 'won', 'lost'] as const).map((s) => (
                        <button
                            key={s}
                            type="button"
                            role="tab"
                            aria-selected={statusFilter === s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize whitespace-nowrap transition-all ${
                                statusFilter === s
                                    ? 'bg-accent text-white shadow-button'
                                    : 'text-foreground-secondary hover:text-foreground hover:bg-background-card'
                            }`}
                        >
                            {s} <span className={statusFilter === s ? 'opacity-80' : 'text-foreground-muted'}>({counts[s]})</span>
                        </button>
                    ))}
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end xl:shrink-0">
                    <button
                        type="button"
                        onClick={() => setStarredOnly(!starredOnly)}
                        aria-pressed={starredOnly}
                        title="Show starred leads only"
                        className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors ${
                            starredOnly ? 'border-amber-500/50 bg-amber-500/10 text-amber-500' : 'border-border text-foreground-secondary hover:text-foreground'
                        }`}
                    >
                        ★ Starred
                    </button>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                        aria-label="Sort leads"
                        className="rounded-xl border border-border bg-background-card px-3 py-2 text-xs font-bold text-foreground focus:border-accent focus:outline-none"
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="followup">Follow-up due</option>
                        <option value="value">Highest value</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => exportCsv(filtered)}
                        disabled={filtered.length === 0}
                        className="px-3 py-2 rounded-xl border border-border text-xs font-bold text-foreground-secondary hover:text-foreground hover:border-accent transition-colors disabled:opacity-50"
                    >
                        Export CSV ({filtered.length})
                    </button>
                    <div className="relative w-full sm:w-56">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search leads, notes, UTM…"
                            aria-label="Search leads"
                            className="w-full rounded-xl border border-border bg-background-card pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-foreground-muted placeholder:opacity-60 focus:border-accent focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* List */}
            {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-background-card/50 px-6 py-16 text-center">
                    <p className="text-foreground font-bold mb-1">
                        {initialLeads.length === 0 ? 'No submissions yet' : 'No leads match this filter'}
                    </p>
                    <p className="text-foreground-secondary text-sm">
                        {initialLeads.length === 0
                            ? 'Contact form submissions from across the site will appear here the moment they arrive.'
                            : 'Try a different search or status filter.'}
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {filtered.map((lead) => {
                        const isOpen = expanded === lead.id;
                        const isBusy = busyKey?.startsWith(`${lead.id}:`) ?? false;
                        const overdue = isOverdue(lead);
                        return (
                            <div
                                key={lead.id}
                                className={`rounded-xl border bg-background-card transition-colors ${isOpen ? 'border-accent/40' : 'border-border hover:border-accent/30'}`}
                            >
                                {/* Row header */}
                                <div className="w-full flex items-start sm:items-center gap-2 px-5 py-4">
                                    <button
                                        type="button"
                                        disabled={isBusy}
                                        onClick={() => patch(`${lead.id}:star`, lead.id, { priority: !lead.priority })}
                                        title={lead.priority ? 'Unstar lead' : 'Star lead'}
                                        aria-label={lead.priority ? 'Unstar lead' : 'Star lead'}
                                        className={`mt-0.5 sm:mt-0 text-lg leading-none transition-colors ${lead.priority ? 'text-amber-500' : 'text-foreground-muted/40 hover:text-amber-500'}`}
                                    >
                                        {busyKey === `${lead.id}:star` ? <Spinner className="text-amber-500" /> : '★'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setExpanded(isOpen ? null : lead.id); setNoteDraft(''); setValueEditing(null); }}
                                        aria-expanded={isOpen}
                                        className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${STATUS_STYLES[lead.status]}`}>
                                                    {lead.status}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${EMAIL_STYLES[lead.emailStatus] ?? EMAIL_STYLES.pending}`}>
                                                    {lead.emailStatus === 'sent' ? 'Email sent' : lead.emailStatus === 'failed' ? 'Email failed' : 'Email pending'}
                                                </span>
                                                {overdue && (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border bg-red-500/10 text-red-500 border-red-500/30">
                                                        Follow-up overdue
                                                    </span>
                                                )}
                                                {lead.value !== undefined && lead.value > 0 && (
                                                    <span className="text-[11px] font-bold text-green-500">${lead.value.toLocaleString()}</span>
                                                )}
                                                {lead.country && (
                                                    <span className="text-[11px] font-semibold text-foreground-muted">{countryFlag(lead.country)} {lead.country}</span>
                                                )}
                                                {lead.sourcePath && (
                                                    <span className="text-[11px] font-semibold text-foreground-muted truncate">from {lead.sourcePath}</span>
                                                )}
                                            </div>
                                            <p className="font-bold text-foreground truncate">
                                                {lead.name} <span className="font-medium text-foreground-secondary">· {lead.email}</span>
                                            </p>
                                            {lead.projectDetails && !isOpen && (
                                                <p className="text-sm text-foreground-muted truncate mt-0.5">{lead.projectDetails}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            {(lead.notes?.length ?? 0) > 0 && (
                                                <span className="text-[11px] font-bold text-foreground-muted" title={`${lead.notes!.length} notes`}>
                                                    {lead.notes!.length} 📝
                                                </span>
                                            )}
                                            <span className="text-xs font-semibold text-foreground-muted" title={fullTimestamp(lead.createdAt)}>
                                                {timeAgo(lead.createdAt)}
                                            </span>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`text-foreground-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>

                                {/* Expanded detail */}
                                {isOpen && (
                                    <div className="border-t border-border px-5 py-5 space-y-5">
                                        {/* Pipeline */}
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mb-2">Pipeline Stage</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {PIPELINE.map((s) => {
                                                    const stageBusy = busyKey === `${lead.id}:status:${s}`;
                                                    return (
                                                        <button
                                                            key={s}
                                                            type="button"
                                                            disabled={isBusy || lead.status === s}
                                                            onClick={() => patch(`${lead.id}:status:${s}`, lead.id, { status: s })}
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold capitalize border transition-all disabled:cursor-default ${
                                                                stageBusy
                                                                    ? 'border-accent/50 bg-accent/10 text-accent'
                                                                    : lead.status === s
                                                                        ? STATUS_STYLES[s]
                                                                        : `border-border text-foreground-secondary hover:border-accent hover:text-foreground ${isBusy ? 'opacity-50' : ''}`
                                                            }`}
                                                        >
                                                            {stageBusy && <Spinner />}
                                                            {stageBusy ? 'Moving…' : s}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Facts grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mb-1">Phone</p>
                                                <p className="font-semibold text-foreground">{lead.phone || '—'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mb-1">Requested Slot</p>
                                                <p className="font-semibold text-foreground">{lead.preferredDate} at {lead.preferredTime}</p>
                                                <p className="text-xs text-foreground-muted">{lead.timezone}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mb-1 flex items-center gap-1.5">
                                                    Follow-up Date {busyKey === `${lead.id}:followup` && <Spinner className="text-accent" />}
                                                </p>
                                                <input
                                                    type="date"
                                                    value={lead.followUpAt ?? ''}
                                                    disabled={isBusy}
                                                    onChange={(e) => patch(`${lead.id}:followup`, lead.id, { followUpAt: e.target.value || null })}
                                                    className={`rounded-lg border bg-background-secondary px-2.5 py-1.5 text-xs font-semibold focus:border-accent focus:outline-none disabled:opacity-60 ${overdue ? 'border-red-500/50 text-red-500' : 'border-border text-foreground'}`}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mb-1">Deal Value (USD)</p>
                                                {valueEditing === lead.id ? (
                                                    <input
                                                        type="number"
                                                        autoFocus
                                                        min={0}
                                                        value={valueDraft}
                                                        onChange={(e) => setValueDraft(e.target.value)}
                                                        onBlur={() => saveValue(lead.id)}
                                                        onKeyDown={(e) => { if (e.key === 'Enter') saveValue(lead.id); }}
                                                        className="w-28 rounded-lg border border-border bg-background-secondary px-2.5 py-1.5 text-xs font-semibold text-foreground focus:border-accent focus:outline-none"
                                                    />
                                                ) : busyKey === `${lead.id}:value` ? (
                                                    <span className="inline-flex items-center gap-1.5 font-semibold text-accent text-sm">
                                                        <Spinner /> Saving…
                                                    </span>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => { setValueEditing(lead.id); setValueDraft(lead.value?.toString() ?? ''); }}
                                                        className="font-semibold text-foreground hover:text-accent transition-colors"
                                                    >
                                                        {lead.value ? `$${lead.value.toLocaleString()}` : 'Set value +'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Source & tracking */}
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mb-1.5">Source & Tracking</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2 rounded-lg bg-background-secondary border border-border px-4 py-3 text-xs">
                                                <p><span className="text-foreground-muted">Submitted:</span> <span className="font-semibold text-foreground">{fullTimestamp(lead.createdAt)}</span></p>
                                                <p><span className="text-foreground-muted">Page:</span> <span className="font-semibold text-foreground">{lead.sourcePath ?? '—'}</span></p>
                                                <p><span className="text-foreground-muted">Landing:</span> <span className="font-semibold text-foreground">{lead.landingPage ?? '—'}</span></p>
                                                <p><span className="text-foreground-muted">Country:</span> <span className="font-semibold text-foreground">{lead.country ? `${countryFlag(lead.country)} ${lead.country}` : '—'}</span></p>
                                                <p className="truncate"><span className="text-foreground-muted">Referrer:</span> <span className="font-semibold text-foreground" title={lead.referrer}>{lead.referrer ?? 'Direct / none'}</span></p>
                                                <p><span className="text-foreground-muted">UTM:</span> <span className="font-semibold text-foreground">{[lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(' / ') || '—'}</span></p>
                                                <p><span className="text-foreground-muted">Device:</span> <span className="font-semibold text-foreground">{deviceFromUA(lead.userAgent)}</span></p>
                                                <p>
                                                    <span className="text-foreground-muted">Notification:</span>{' '}
                                                    <span className="font-semibold text-foreground capitalize">{lead.emailStatus} · {lead.emailAttempts} attempt{lead.emailAttempts === 1 ? '' : 's'}</span>
                                                </p>
                                            </div>
                                            {lead.lastEmailError && (
                                                <p className="text-xs text-red-500 break-words mt-1.5">{lead.lastEmailError}</p>
                                            )}
                                        </div>

                                        {lead.projectDetails && (
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mb-1.5">Project Details</p>
                                                <p className="text-sm text-foreground-secondary leading-relaxed whitespace-pre-wrap rounded-lg bg-background-secondary border border-border px-4 py-3">
                                                    {lead.projectDetails}
                                                </p>
                                            </div>
                                        )}

                                        {/* Notes */}
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mb-1.5">
                                                Notes {lead.notes?.length ? `(${lead.notes.length})` : ''}
                                            </p>
                                            <div className="flex gap-2 mb-3">
                                                <input
                                                    type="text"
                                                    value={noteDraft}
                                                    onChange={(e) => setNoteDraft(e.target.value)}
                                                    onKeyDown={(e) => { if (e.key === 'Enter') submitNote(lead.id); }}
                                                    placeholder="Add a note — call summary, next step, objection…"
                                                    className="flex-1 rounded-lg border border-border bg-background-secondary px-3.5 py-2 text-sm text-foreground placeholder:text-foreground-muted placeholder:opacity-60 focus:border-accent focus:outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    disabled={isBusy || !noteDraft.trim()}
                                                    onClick={() => submitNote(lead.id)}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-gradient text-white text-xs font-bold shadow-button hover:brightness-110 transition-all disabled:opacity-50"
                                                >
                                                    {busyKey === `${lead.id}:note` ? <><Spinner /> Adding…</> : 'Add'}
                                                </button>
                                            </div>
                                            {(lead.notes?.length ?? 0) > 0 && (
                                                <ul className="space-y-2">
                                                    {lead.notes!.map((note) => (
                                                        <li key={note.id} className="group flex items-start justify-between gap-3 rounded-lg bg-background-secondary border border-border px-4 py-2.5">
                                                            <div className="min-w-0">
                                                                <p className="text-sm text-foreground-secondary whitespace-pre-wrap break-words">{note.text}</p>
                                                                <p className="text-[11px] text-foreground-muted mt-0.5">{fullTimestamp(note.createdAt)}</p>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                disabled={isBusy}
                                                                onClick={() => removeNote(lead.id, note.id)}
                                                                title="Delete note"
                                                                className={`text-foreground-muted hover:text-red-500 text-xs font-bold transition-all shrink-0 ${busyKey === `${lead.id}:note-del:${note.id}` ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                                            >
                                                                {busyKey === `${lead.id}:note-del:${note.id}` ? <Spinner className="text-red-500" /> : '✕'}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            <a
                                                href={`mailto:${lead.email}?subject=${encodeURIComponent('Re: Your consultation request — Brynex Labs')}`}
                                                className="px-4 py-2 rounded-lg bg-accent-gradient text-white text-xs font-bold shadow-button hover:brightness-110 transition-all"
                                            >
                                                Reply by Email
                                            </a>
                                            {lead.phone && (
                                                <a
                                                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name.split(' ')[0]}, this is Brynex Labs — thanks for reaching out about your project!`)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 rounded-lg border border-green-500/40 text-xs font-bold text-green-500 hover:bg-green-500/10 transition-colors"
                                                >
                                                    WhatsApp
                                                </a>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => copyEmail(lead.id, lead.email)}
                                                className={`px-4 py-2 rounded-lg border text-xs font-bold transition-colors ${
                                                    copiedId === lead.id
                                                        ? 'border-green-500/40 bg-green-500/10 text-green-500'
                                                        : 'border-border text-foreground-secondary hover:border-accent hover:text-foreground'
                                                }`}
                                            >
                                                {copiedId === lead.id ? '✓ Copied' : 'Copy Email'}
                                            </button>
                                            {lead.emailStatus !== 'sent' && (
                                                <button
                                                    type="button"
                                                    disabled={isBusy}
                                                    onClick={() => retryEmail(lead.id)}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-amber-500/40 text-xs font-bold text-amber-500 hover:bg-amber-500/10 transition-colors disabled:opacity-50"
                                                >
                                                    {busyKey === `${lead.id}:retry` ? <><Spinner /> Sending…</> : 'Retry Notification Email'}
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                disabled={isBusy}
                                                onClick={() => remove(lead.id, lead.name)}
                                                className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-500/30 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                            >
                                                {busyKey === `${lead.id}:delete` ? <><Spinner /> Deleting…</> : 'Delete'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
