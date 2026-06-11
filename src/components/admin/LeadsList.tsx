'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ContactSubmission, LeadStatus } from '@/lib/contactStore';

type StatusFilter = 'all' | LeadStatus;

const STATUS_STYLES: Record<LeadStatus, string> = {
    new: 'bg-accent/10 text-accent border-accent/30',
    contacted: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
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

export default function LeadsList({ initialLeads }: { initialLeads: ContactSubmission[] }) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [expanded, setExpanded] = useState<string | null>(null);
    const [busy, setBusy] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);

    const counts = useMemo(() => ({
        all: initialLeads.length,
        new: initialLeads.filter((l) => l.status === 'new').length,
        contacted: initialLeads.filter((l) => l.status === 'contacted').length,
        closed: initialLeads.filter((l) => l.status === 'closed').length,
    }), [initialLeads]);

    const failedEmails = useMemo(
        () => initialLeads.filter((l) => l.emailStatus === 'failed').length,
        [initialLeads],
    );

    const weekAgo = useMemo(() => Date.now() - 7 * 24 * 60 * 60 * 1000, []);
    const thisWeek = useMemo(
        () => initialLeads.filter((l) => new Date(l.createdAt).getTime() > weekAgo).length,
        [initialLeads, weekAgo],
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return initialLeads.filter((lead) => {
            if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
            if (q) {
                const haystack = `${lead.name} ${lead.email} ${lead.phone ?? ''} ${lead.projectDetails ?? ''}`.toLowerCase();
                if (!haystack.includes(q)) return false;
            }
            return true;
        });
    }, [initialLeads, query, statusFilter]);

    const act = async (id: string, fn: () => Promise<Response>, successNotice?: string) => {
        setBusy(id);
        setError(null);
        setNotice(null);
        try {
            const res = await fn();
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(data.error ?? 'Something went wrong.');
                return;
            }
            if (successNotice) setNotice(successNotice);
            router.refresh();
        } catch {
            setError('Network error — please try again.');
        } finally {
            setBusy(null);
        }
    };

    const setStatus = (id: string, status: LeadStatus) =>
        act(id, () => fetch(`/api/admin/leads/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        }));

    const retryEmail = (id: string) =>
        act(id, () => fetch(`/api/admin/leads/${id}/retry-email`, { method: 'POST' }), 'Notification email sent.');

    const remove = (id: string, name: string) => {
        if (!window.confirm(`Delete the submission from "${name}"? This cannot be undone.`)) return;
        return act(id, () => fetch(`/api/admin/leads/${id}`, { method: 'DELETE' }));
    };

    const stats = [
        { label: 'Total Leads', value: counts.all },
        { label: 'New', value: counts.new, accent: counts.new > 0 ? 'text-accent' : undefined },
        { label: 'This Week', value: thisWeek },
        { label: 'Email Failures', value: failedEmails, accent: failedEmails > 0 ? 'text-red-500' : 'text-green-500' },
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex gap-1 p-1 rounded-xl bg-background-secondary border border-border w-fit" role="tablist" aria-label="Filter by status">
                    {(['all', 'new', 'contacted', 'closed'] as const).map((s) => (
                        <button
                            key={s}
                            type="button"
                            role="tab"
                            aria-selected={statusFilter === s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                                statusFilter === s
                                    ? 'bg-accent text-white shadow-button'
                                    : 'text-foreground-secondary hover:text-foreground hover:bg-background-card'
                            }`}
                        >
                            {s} <span className={statusFilter === s ? 'opacity-80' : 'text-foreground-muted'}>({counts[s]})</span>
                        </button>
                    ))}
                </div>
                <div className="relative sm:w-72">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search name, email, message…"
                        aria-label="Search leads"
                        className="w-full rounded-xl border border-border bg-background-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted placeholder:opacity-60 focus:border-accent focus:outline-none transition-colors"
                    />
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
                        const isBusy = busy === lead.id;
                        return (
                            <div
                                key={lead.id}
                                className={`rounded-xl border bg-background-card transition-colors ${isOpen ? 'border-accent/40' : 'border-border hover:border-accent/30'}`}
                            >
                                {/* Row header */}
                                <button
                                    type="button"
                                    onClick={() => setExpanded(isOpen ? null : lead.id)}
                                    aria-expanded={isOpen}
                                    className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5 py-4 text-left"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${STATUS_STYLES[lead.status]}`}>
                                                {lead.status}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${EMAIL_STYLES[lead.emailStatus] ?? EMAIL_STYLES.pending}`}>
                                                {lead.emailStatus === 'sent' ? 'Email sent' : lead.emailStatus === 'failed' ? 'Email failed' : 'Email pending'}
                                            </span>
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
                                        <span className="text-xs font-semibold text-foreground-muted" title={fullTimestamp(lead.createdAt)}>
                                            {timeAgo(lead.createdAt)}
                                        </span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`text-foreground-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Expanded detail */}
                                {isOpen && (
                                    <div className="border-t border-border px-5 py-5 space-y-5">
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
                                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mb-1">Submitted</p>
                                                <p className="font-semibold text-foreground">{fullTimestamp(lead.createdAt)}</p>
                                                {lead.sourcePath && <p className="text-xs text-foreground-muted">via {lead.sourcePath}</p>}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mb-1">Notification</p>
                                                <p className="font-semibold text-foreground capitalize">
                                                    {lead.emailStatus}
                                                    <span className="font-medium text-foreground-muted"> · {lead.emailAttempts} attempt{lead.emailAttempts === 1 ? '' : 's'}</span>
                                                </p>
                                                {lead.lastEmailError && (
                                                    <p className="text-xs text-red-500 break-words mt-0.5">{lead.lastEmailError}</p>
                                                )}
                                            </div>
                                        </div>

                                        {lead.projectDetails && (
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mb-1.5">Project Details</p>
                                                <p className="text-sm text-foreground-secondary leading-relaxed whitespace-pre-wrap rounded-lg bg-background-secondary border border-border px-4 py-3">
                                                    {lead.projectDetails}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap items-center gap-2">
                                            <a
                                                href={`mailto:${lead.email}?subject=${encodeURIComponent('Re: Your consultation request — Brynex Labs')}`}
                                                className="px-4 py-2 rounded-lg bg-accent-gradient text-white text-xs font-bold shadow-button hover:brightness-110 transition-all"
                                            >
                                                Reply by Email
                                            </a>
                                            {lead.status !== 'contacted' && (
                                                <button
                                                    type="button"
                                                    disabled={isBusy}
                                                    onClick={() => setStatus(lead.id, 'contacted')}
                                                    className="px-4 py-2 rounded-lg border border-border text-xs font-bold text-foreground hover:border-accent transition-colors disabled:opacity-50"
                                                >
                                                    Mark Contacted
                                                </button>
                                            )}
                                            {lead.status !== 'closed' && (
                                                <button
                                                    type="button"
                                                    disabled={isBusy}
                                                    onClick={() => setStatus(lead.id, 'closed')}
                                                    className="px-4 py-2 rounded-lg border border-border text-xs font-bold text-foreground-secondary hover:border-accent hover:text-foreground transition-colors disabled:opacity-50"
                                                >
                                                    Close Lead
                                                </button>
                                            )}
                                            {lead.status !== 'new' && (
                                                <button
                                                    type="button"
                                                    disabled={isBusy}
                                                    onClick={() => setStatus(lead.id, 'new')}
                                                    className="px-4 py-2 rounded-lg border border-border text-xs font-bold text-foreground-secondary hover:border-accent hover:text-foreground transition-colors disabled:opacity-50"
                                                >
                                                    Reopen
                                                </button>
                                            )}
                                            {lead.emailStatus !== 'sent' && (
                                                <button
                                                    type="button"
                                                    disabled={isBusy}
                                                    onClick={() => retryEmail(lead.id)}
                                                    className="px-4 py-2 rounded-lg border border-amber-500/40 text-xs font-bold text-amber-500 hover:bg-amber-500/10 transition-colors disabled:opacity-50"
                                                >
                                                    {isBusy ? 'Sending…' : 'Retry Notification Email'}
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                disabled={isBusy}
                                                onClick={() => remove(lead.id, lead.name)}
                                                className="ml-auto px-4 py-2 rounded-lg border border-red-500/30 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                            >
                                                Delete
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
