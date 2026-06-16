'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    type ServiceDetail,
    type ServiceTheme,
    type CustomSection,
    type CustomSectionLayout,
    CUSTOM_SECTION_LAYOUTS,
    resolveServiceTheme,
} from '@/data/services';
import ServicePageClient from '@/components/ServicePageClient';
import ServiceDesignPanel from './service-editor/ServiceDesignPanel';
import { Field, Area, Card, StringListEditor, Repeater, FIELD_CLASS, LABEL_CLASS } from './service-editor/fields';

type Mode = 'create' | 'edit' | 'override';

interface ServicePageEditorProps {
    mode: Mode;
    /** The service to edit — code-defined (override), CMS copy (edit), or a blank template (create). */
    initialService?: ServiceDetail;
    /** True when a CMS override already exists for a code-defined slug. */
    hasOverride?: boolean;
}

/** Working shape: every optional block is materialised so the form stays controlled. */
interface ServiceForm {
    slug: string;
    title: string;
    shortTitle: string;
    cardDescription: string;
    description: string;
    badge: string;
    hook: string;
    seo: { title: string; metaDescription: string };
    problemHeading: string;
    problemSummary: string;
    processHeading: string;
    processSummary: string;
    metrics: { value: string; label: string }[];
    challenges: string[];
    solutions: string[];
    subServices: { heading: string; subheading: string; items: { title: string; intro: string; points: string[] }[] };
    process: { title: string; description: string }[];
    targetAudience: { for: string[]; notFor: string[] };
    pricing: { heading: string; subheading: string; tiers: PricingTierForm[]; assurances: string[] };
    whyUs: { heading: string; items: { title: string; description: string }[] };
    comparison: { heading: string; rows: { typical: string; ours: string }[] };
    testimonial: { quote: string; author: string; role: string };
    techStack: { name: string; icon: string }[];
    faqs: { question: string; answer: string }[];
    customCta: { title: string; subtitle: string; buttonText: string; bullets: string[] };
    customSections: CustomSection[];
    marketIN: {
        seoTitle: string;
        seoMeta: string;
        hook: string;
        pricingSubheading: string;
        assurances: string[];
        ctaSubtitle: string;
        pricingNote: string;
        faqs: { question: string; answer: string }[];
    };
}

interface PricingTierForm {
    name: string; tagline: string; priceLabel: string; price: string; priceIN: string; period: string; highlighted: boolean; features: string[]; buttonText: string;
}

function normalize(s?: ServiceDetail): ServiceForm {
    return {
        slug: s?.slug ?? '',
        title: s?.title ?? '',
        shortTitle: s?.shortTitle ?? '',
        cardDescription: s?.cardDescription ?? '',
        description: s?.description ?? '',
        badge: s?.badge ?? '',
        hook: s?.hook ?? '',
        seo: { title: s?.seo?.title ?? '', metaDescription: s?.seo?.metaDescription ?? '' },
        problemHeading: s?.problemHeading ?? '',
        problemSummary: s?.problemSummary ?? '',
        processHeading: s?.processHeading ?? '',
        processSummary: s?.processSummary ?? '',
        metrics: s?.metrics?.map((m) => ({ ...m })) ?? [],
        challenges: [...(s?.challenges ?? [])],
        solutions: [...(s?.solutions ?? [])],
        subServices: {
            heading: s?.subServices?.heading ?? '',
            subheading: s?.subServices?.subheading ?? '',
            items: s?.subServices?.items?.map((it) => ({ title: it.title, intro: it.intro ?? '', points: [...it.points] })) ?? [],
        },
        process: s?.process?.map((p) => ({ ...p })) ?? [],
        targetAudience: { for: [...(s?.targetAudience?.for ?? [])], notFor: [...(s?.targetAudience?.notFor ?? [])] },
        pricing: {
            heading: s?.pricing?.heading ?? '',
            subheading: s?.pricing?.subheading ?? '',
            tiers: s?.pricing?.tiers?.map((t) => ({
                name: t.name, tagline: t.tagline ?? '', priceLabel: t.priceLabel ?? '', price: t.price, priceIN: t.priceIN ?? '', period: t.period ?? '', highlighted: t.highlighted ?? false, features: [...t.features], buttonText: t.buttonText,
            })) ?? [],
            assurances: [...(s?.pricing?.assurances ?? [])],
        },
        whyUs: { heading: s?.whyUs?.heading ?? '', items: s?.whyUs?.items?.map((it) => ({ ...it })) ?? [] },
        comparison: { heading: s?.comparison?.heading ?? '', rows: s?.comparison?.rows?.map((r) => ({ ...r })) ?? [] },
        testimonial: { quote: s?.testimonial?.quote ?? '', author: s?.testimonial?.author ?? '', role: s?.testimonial?.role ?? '' },
        techStack: s?.techStack?.map((t) => ({ ...t })) ?? [],
        faqs: s?.faqs?.map((f) => ({ ...f })) ?? [],
        customCta: { title: s?.customCta?.title ?? '', subtitle: s?.customCta?.subtitle ?? '', buttonText: s?.customCta?.buttonText ?? '', bullets: [...(s?.customCta?.bullets ?? [])] },
        customSections: s?.customSections?.map((c) => ({ ...c, items: c.items?.map((it) => ({ ...it })) })) ?? [],
        marketIN: {
            seoTitle: s?.marketIN?.seo?.title ?? '',
            seoMeta: s?.marketIN?.seo?.metaDescription ?? '',
            hook: s?.marketIN?.hook ?? '',
            pricingSubheading: s?.marketIN?.pricingSubheading ?? '',
            assurances: [...(s?.marketIN?.assurances ?? [])],
            ctaSubtitle: s?.marketIN?.ctaSubtitle ?? '',
            pricingNote: s?.marketIN?.pricingNote ?? '',
            faqs: s?.marketIN?.faqs?.map((f) => ({ ...f })) ?? [],
        },
    };
}

const clean = (v: string) => v.trim();
const nonEmpty = (arr: string[]) => arr.map(clean).filter(Boolean);

/** Build the API/preview payload, pruning empty optional blocks (mirrors the server validator). */
function assemble(form: ServiceForm, theme: ServiceTheme): ServiceDetail {
    const out: ServiceDetail = {
        slug: clean(form.slug).toLowerCase(),
        title: clean(form.title),
        description: clean(form.description),
        seo: { title: clean(form.seo.title), metaDescription: clean(form.seo.metaDescription) },
        challenges: nonEmpty(form.challenges),
        solutions: nonEmpty(form.solutions),
        techStack: form.techStack.map((t) => ({ name: clean(t.name), icon: clean(t.icon) })).filter((t) => t.name),
        faqs: form.faqs.map((f) => ({ question: clean(f.question), answer: clean(f.answer) })).filter((f) => f.question && f.answer),
        theme,
    };
    const scal = (k: keyof ServiceForm, dest: keyof ServiceDetail = k as keyof ServiceDetail) => {
        const v = clean(form[k] as string);
        if (v) (out as unknown as Record<string, unknown>)[dest as string] = v;
    };
    scal('shortTitle'); scal('cardDescription'); scal('badge'); scal('hook');
    scal('problemHeading'); scal('problemSummary'); scal('processHeading'); scal('processSummary');

    const metrics = form.metrics.map((m) => ({ value: clean(m.value), label: clean(m.label) })).filter((m) => m.value && m.label);
    if (metrics.length) out.metrics = metrics;

    const subItems = form.subServices.items.map((it) => ({ title: clean(it.title), intro: clean(it.intro) || undefined, points: nonEmpty(it.points) })).filter((it) => it.title);
    if (clean(form.subServices.heading) && subItems.length) out.subServices = { heading: clean(form.subServices.heading), subheading: clean(form.subServices.subheading) || undefined, items: subItems };

    const process = form.process.map((p) => ({ title: clean(p.title), description: clean(p.description) })).filter((p) => p.title && p.description);
    if (process.length) out.process = process;

    const taFor = nonEmpty(form.targetAudience.for); const taNot = nonEmpty(form.targetAudience.notFor);
    if (taFor.length || taNot.length) out.targetAudience = { for: taFor, notFor: taNot };

    const tiers = form.pricing.tiers.map((t) => ({
        name: clean(t.name), tagline: clean(t.tagline) || undefined, priceLabel: clean(t.priceLabel) || undefined, price: clean(t.price), priceIN: clean(t.priceIN) || undefined, period: clean(t.period) || undefined, highlighted: t.highlighted, features: nonEmpty(t.features), buttonText: clean(t.buttonText) || 'Get started',
    })).filter((t) => t.name && t.price);
    if (clean(form.pricing.heading) && tiers.length) out.pricing = { heading: clean(form.pricing.heading), subheading: clean(form.pricing.subheading) || undefined, tiers, assurances: nonEmpty(form.pricing.assurances) };

    const whyItems = form.whyUs.items.map((it) => ({ title: clean(it.title), description: clean(it.description) })).filter((it) => it.title && it.description);
    if (clean(form.whyUs.heading) && whyItems.length) out.whyUs = { heading: clean(form.whyUs.heading), items: whyItems };

    const rows = form.comparison.rows.map((r) => ({ typical: clean(r.typical), ours: clean(r.ours) })).filter((r) => r.typical && r.ours);
    if (clean(form.comparison.heading) && rows.length) out.comparison = { heading: clean(form.comparison.heading), rows };

    if (clean(form.testimonial.quote)) out.testimonial = { quote: clean(form.testimonial.quote), author: clean(form.testimonial.author), role: clean(form.testimonial.role) };

    if (clean(form.customCta.title)) out.customCta = { title: clean(form.customCta.title), subtitle: clean(form.customCta.subtitle), buttonText: clean(form.customCta.buttonText) || 'Start a project', bullets: nonEmpty(form.customCta.bullets) };

    const customSections = form.customSections.map((cs) => {
        const items = (cs.items ?? []).map((it) => ({ title: clean(it.title), description: clean(it.description ?? '') || undefined })).filter((it) => it.title);
        const next: CustomSection = { id: cs.id, layout: cs.layout };
        if (clean(cs.eyebrow ?? '')) next.eyebrow = clean(cs.eyebrow!);
        if (clean(cs.heading ?? '')) next.heading = clean(cs.heading!);
        if (clean(cs.subheading ?? '')) next.subheading = clean(cs.subheading!);
        if (clean(cs.body ?? '')) next.body = clean(cs.body!);
        if (clean(cs.buttonText ?? '')) next.buttonText = clean(cs.buttonText!);
        if (items.length) next.items = items;
        return next;
    }).filter((cs) => cs.heading || cs.body || cs.eyebrow || cs.items || cs.buttonText);
    if (customSections.length) out.customSections = customSections;

    const mFaqs = form.marketIN.faqs.map((f) => ({ question: clean(f.question), answer: clean(f.answer) })).filter((f) => f.question && f.answer);
    const m = form.marketIN;
    const marketIN: NonNullable<ServiceDetail['marketIN']> = {};
    if (clean(m.seoTitle) && clean(m.seoMeta)) marketIN.seo = { title: clean(m.seoTitle), metaDescription: clean(m.seoMeta) };
    if (clean(m.hook)) marketIN.hook = clean(m.hook);
    if (clean(m.pricingSubheading)) marketIN.pricingSubheading = clean(m.pricingSubheading);
    if (nonEmpty(m.assurances).length) marketIN.assurances = nonEmpty(m.assurances);
    if (clean(m.ctaSubtitle)) marketIN.ctaSubtitle = clean(m.ctaSubtitle);
    if (clean(m.pricingNote)) marketIN.pricingNote = clean(m.pricingNote);
    if (mFaqs.length) marketIN.faqs = mFaqs;
    if (Object.keys(marketIN).length) out.marketIN = marketIN;

    return out;
}

const TABS = ['content', 'india', 'design', 'preview'] as const;
type Tab = typeof TABS[number];
const TAB_LABELS: Record<Tab, string> = { content: 'Content', india: 'India Variant', design: 'Design', preview: 'Preview' };

export default function ServicePageEditor({ mode, initialService, hasOverride }: ServicePageEditorProps) {
    const router = useRouter();
    const [form, setForm] = useState<ServiceForm>(() => normalize(initialService));
    const [theme, setTheme] = useState<Required<ServiceTheme>>(() => resolveServiceTheme(initialService?.theme, initialService?.customSections?.map((c) => c.id) ?? []));
    const [tab, setTab] = useState<Tab>('content');
    const [previewMarket, setPreviewMarket] = useState<'GLOBAL' | 'IN'>('GLOBAL');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);

    // Targeted updaters keep re-renders cheap and the call sites readable.
    const set = <K extends keyof ServiceForm>(key: K, value: ServiceForm[K]) => setForm((f) => ({ ...f, [key]: value }));
    const setSeo = (patch: Partial<ServiceForm['seo']>) => setForm((f) => ({ ...f, seo: { ...f.seo, ...patch } }));
    const setSub = (patch: Partial<ServiceForm['subServices']>) => setForm((f) => ({ ...f, subServices: { ...f.subServices, ...patch } }));
    const setTA = (patch: Partial<ServiceForm['targetAudience']>) => setForm((f) => ({ ...f, targetAudience: { ...f.targetAudience, ...patch } }));
    const setPricing = (patch: Partial<ServiceForm['pricing']>) => setForm((f) => ({ ...f, pricing: { ...f.pricing, ...patch } }));
    const setWhy = (patch: Partial<ServiceForm['whyUs']>) => setForm((f) => ({ ...f, whyUs: { ...f.whyUs, ...patch } }));
    const setComp = (patch: Partial<ServiceForm['comparison']>) => setForm((f) => ({ ...f, comparison: { ...f.comparison, ...patch } }));
    const setTestimonial = (patch: Partial<ServiceForm['testimonial']>) => setForm((f) => ({ ...f, testimonial: { ...f.testimonial, ...patch } }));
    const setCta = (patch: Partial<ServiceForm['customCta']>) => setForm((f) => ({ ...f, customCta: { ...f.customCta, ...patch } }));
    const setIN = (patch: Partial<ServiceForm['marketIN']>) => setForm((f) => ({ ...f, marketIN: { ...f.marketIN, ...patch } }));
    const patchTheme = (patch: Partial<ServiceTheme>) => setTheme((t) => ({ ...t, ...patch }));

    // Custom sections live in `form`, but their placement lives in `theme.sections`.
    // Adding/removing one keeps both in sync so it appears in the order + Design panel.
    const addCustomSection = () => {
        const id = `custom-${Math.random().toString(36).slice(2, 9)}`;
        setForm((f) => ({ ...f, customSections: [...f.customSections, { id, layout: 'text' as CustomSectionLayout }] }));
        setTheme((t) => ({ ...t, sections: [...t.sections, { key: id, visible: true, background: 'default' }] }));
    };
    const updateCustomSection = (id: string, patch: Partial<CustomSection>) =>
        setForm((f) => ({ ...f, customSections: f.customSections.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));
    const removeCustomSection = (id: string) => {
        setForm((f) => ({ ...f, customSections: f.customSections.filter((c) => c.id !== id) }));
        setTheme((t) => ({ ...t, sections: t.sections.filter((s) => s.key !== id) }));
    };

    const previewService = useMemo(() => assemble(form, theme), [form, theme]);

    const save = async () => {
        setSaving(true);
        setError(null);
        setNotice(null);
        const payload = previewService;
        try {
            const isCreate = mode === 'create';
            const res = await fetch(isCreate ? '/api/admin/services' : `/api/admin/services/${initialService!.slug}`, {
                method: isCreate ? 'POST' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? 'Something went wrong while saving.');
                return;
            }
            router.push('/super-admin/services');
            router.refresh();
        } catch {
            setError('Network error — the service page was not saved.');
        } finally {
            setSaving(false);
        }
    };

    const resetToCode = async () => {
        if (!initialService) return;
        if (!window.confirm('Delete the CMS version and restore the code-defined page? This cannot be undone.')) return;
        setSaving(true);
        setError(null);
        try {
            const res = await fetch(`/api/admin/services/${initialService.slug}`, { method: 'DELETE' });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setError(data.error ?? 'Could not reset this page.');
                return;
            }
            router.push('/super-admin/services');
            router.refresh();
        } catch {
            setError('Network error — nothing was changed.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* ===== Action bar — flush under the main header (cancels the shell's py-8) ===== */}
            <div className="sticky top-28 lg:top-0 z-20 -mt-8 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 bg-background/95 backdrop-blur border-b border-border flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-1 p-1 rounded-xl bg-background-secondary border border-border" role="tablist">
                    {TABS.map((t) => (
                        <button
                            key={t}
                            type="button"
                            role="tab"
                            aria-selected={tab === t}
                            onClick={() => setTab(t)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${tab === t ? 'bg-accent text-white shadow-button' : 'text-foreground-secondary hover:text-foreground hover:bg-background-card'}`}
                        >
                            {TAB_LABELS[t]}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    {mode !== 'create' && (
                        <a href={`/services/${initialService!.slug}`} target="_blank" rel="noreferrer" className="px-3.5 py-2 rounded-lg text-xs font-bold text-foreground-muted hover:text-accent transition-colors">
                            View live ↗
                        </a>
                    )}
                    {(mode === 'edit' || (mode === 'override' && hasOverride)) && (
                        <button type="button" onClick={resetToCode} disabled={saving} className="px-4 py-2 rounded-xl border border-border text-sm font-bold text-foreground-secondary hover:border-red-500 hover:text-red-500 transition-colors disabled:opacity-50">
                            Reset to code
                        </button>
                    )}
                    <button type="button" onClick={save} disabled={saving} className="px-5 py-2.5 rounded-xl bg-accent-gradient text-white text-sm font-bold shadow-button hover:brightness-110 transition-all disabled:opacity-50">
                        {saving ? 'Saving…' : mode === 'create' ? 'Create Page' : mode === 'override' ? 'Publish Changes' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {mode === 'override' && !hasOverride && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-foreground-secondary">
                    <span className="font-bold text-amber-500">Code-defined page.</span>{' '}
                    Saving creates a CMS copy that replaces the original on the live site. Use <span className="font-bold text-foreground">Reset to code</span> later to restore it.
                </div>
            )}
            {error && <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-500">{error}</div>}
            {notice && <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-sm font-semibold text-green-500">{notice}</div>}

            {/* ===== Content tab ===== */}
            {tab === 'content' && (
                <div className="space-y-4 max-w-3xl">
                    <Card title="Basics">
                        {mode === 'create' ? (
                            <Field label="URL Slug" value={form.slug} onChange={(v) => set('slug', v.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} placeholder="my-new-service" mono hint="Lives at /services/your-slug. Lowercase, hyphens only." />
                        ) : (
                            <div>
                                <label className={LABEL_CLASS}>URL Slug</label>
                                <div className="flex items-center gap-1 text-sm"><span className="text-foreground-muted shrink-0">/services/</span><input value={form.slug} disabled className={`${FIELD_CLASS} !py-2 font-mono text-sm opacity-60 cursor-not-allowed`} /></div>
                            </div>
                        )}
                        <Field label="Title" value={form.title} onChange={(v) => set('title', v)} placeholder="e.g. AI-Native Software Engineering" hint="The last two words render in the accent colour." />
                        <Field label="Badge" value={form.badge} onChange={(v) => set('badge', v)} placeholder="e.g. AI Agent Development" hint="Small pill above the hero title." />
                        <Area label="Hook" value={form.hook} onChange={(v) => set('hook', v)} placeholder="The headline sub-paragraph in the hero…" rows={3} />
                        <Area label="Description" value={form.description} onChange={(v) => set('description', v)} placeholder="Used for schema.org + as the hero fallback…" rows={2} hint="At least 20 characters." />
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Field label="Short Title" value={form.shortTitle} onChange={(v) => set('shortTitle', v)} placeholder="Shown on cards/links" />
                            <Field label="Card Description" value={form.cardDescription} onChange={(v) => set('cardDescription', v)} placeholder="Shown on the services grid card" />
                        </div>
                    </Card>

                    <Card title="SEO">
                        <Field label="SEO Title" value={form.seo.title} onChange={(v) => setSeo({ title: v })} placeholder="The browser tab + search result title" hint="At least 10 characters." />
                        <Area label="Meta Description" value={form.seo.metaDescription} onChange={(v) => setSeo({ metaDescription: v })} rows={3} placeholder="The search-result snippet…" hint={`${form.seo.metaDescription.length}/320 — aim for 50–160.`} />
                    </Card>

                    <Card title="Metrics" subtitle="The 3-up stat band under the hero" defaultOpen={false}>
                        <Repeater label="Metrics" items={form.metrics} onChange={(v) => set('metrics', v)} makeNew={() => ({ value: '', label: '' })} itemTitle={(m) => m.value || 'New metric'}
                            render={(m, u) => (
                                <div className="grid sm:grid-cols-2 gap-3">
                                    <Field label="Value" value={m.value} onChange={(v) => u({ value: v })} placeholder="e.g. 40–60%" />
                                    <Field label="Label" value={m.label} onChange={(v) => u({ label: v })} placeholder="e.g. Below US agency rates" />
                                </div>
                            )} />
                    </Card>

                    <Card title="The Problem" defaultOpen={false}>
                        <Field label="Heading" value={form.problemHeading} onChange={(v) => set('problemHeading', v)} placeholder="e.g. Why Most AI Initiatives Stall" />
                        <StringListEditor label="Challenges" items={form.challenges} onChange={(v) => set('challenges', v)} placeholder="A challenge your buyer faces" />
                        <Area label="Summary callout" value={form.problemSummary} onChange={(v) => set('problemSummary', v)} rows={2} placeholder="The 'Result:' line under the challenges" />
                    </Card>

                    <Card title="How We Solve It" defaultOpen={false}>
                        <StringListEditor label="Solutions" items={form.solutions} onChange={(v) => set('solutions', v)} placeholder="A capability or solution" />
                    </Card>

                    <Card title="Sub-Services" defaultOpen={false}>
                        <Field label="Heading" value={form.subServices.heading} onChange={(v) => setSub({ heading: v })} placeholder="e.g. Our AI Agent Development Services" />
                        <Area label="Subheading" value={form.subServices.subheading} onChange={(v) => setSub({ subheading: v })} rows={2} placeholder="Optional intro line" />
                        <Repeater label="Cards" items={form.subServices.items} onChange={(v) => setSub({ items: v })} makeNew={() => ({ title: '', intro: '', points: [] })} itemTitle={(it) => it.title || 'New card'}
                            render={(it, u) => (
                                <>
                                    <Field label="Title" value={it.title} onChange={(v) => u({ title: v })} placeholder="Card title" />
                                    <Field label="Intro" value={it.intro} onChange={(v) => u({ intro: v })} placeholder="Optional one-liner" />
                                    <StringListEditor label="Points" items={it.points} onChange={(v) => u({ points: v })} placeholder="A bullet point" />
                                </>
                            )} />
                    </Card>

                    <Card title="Process / Methodology" defaultOpen={false}>
                        <Field label="Heading" value={form.processHeading} onChange={(v) => set('processHeading', v)} placeholder="e.g. Our Production AI Agent Framework" />
                        <Repeater label="Steps" items={form.process} onChange={(v) => set('process', v)} makeNew={() => ({ title: '', description: '' })} itemTitle={(p, i) => `${String(i + 1).padStart(2, '0')} ${p.title || 'New step'}`}
                            render={(p, u) => (
                                <>
                                    <Field label="Title" value={p.title} onChange={(v) => u({ title: v })} placeholder="Step title" />
                                    <Area label="Description" value={p.description} onChange={(v) => u({ description: v })} rows={2} placeholder="What happens in this step" />
                                </>
                            )} />
                        <Area label="Summary callout" value={form.processSummary} onChange={(v) => set('processSummary', v)} rows={2} placeholder="Closing line under the steps" />
                    </Card>

                    <Card title="Who This Is For" defaultOpen={false}>
                        <StringListEditor label="Ideal Fit" items={form.targetAudience.for} onChange={(v) => setTA({ for: v })} placeholder="A trait of a great-fit client" />
                        <StringListEditor label="Not a Fit" items={form.targetAudience.notFor} onChange={(v) => setTA({ notFor: v })} placeholder="A trait of a poor-fit client" />
                    </Card>

                    <Card title="Pricing" defaultOpen={false}>
                        <Field label="Heading" value={form.pricing.heading} onChange={(v) => setPricing({ heading: v })} placeholder="e.g. AI Agent Development Pricing" />
                        <Area label="Subheading" value={form.pricing.subheading} onChange={(v) => setPricing({ subheading: v })} rows={2} placeholder="Optional intro line" />
                        <Repeater label="Tiers" items={form.pricing.tiers} onChange={(v) => setPricing({ tiers: v })} makeNew={() => ({ name: '', tagline: '', priceLabel: '', price: '', priceIN: '', period: '', highlighted: false, features: [], buttonText: '' })} itemTitle={(t) => t.name || 'New tier'}
                            render={(t, u) => (
                                <>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <Field label="Name" value={t.name} onChange={(v) => u({ name: v })} placeholder="e.g. Agent Pilot" />
                                        <Field label="Tagline" value={t.tagline} onChange={(v) => u({ tagline: v })} placeholder="One-line positioning" />
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <Field label="Price Label" value={t.priceLabel} onChange={(v) => u({ priceLabel: v })} placeholder="e.g. Starting at" />
                                        <Field label="Period" value={t.period} onChange={(v) => u({ period: v })} placeholder="e.g. /project" />
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <Field label="Price (Global)" value={t.price} onChange={(v) => u({ price: v })} placeholder="e.g. $4,999" />
                                        <Field label="Price (India ₹)" value={t.priceIN} onChange={(v) => u({ priceIN: v })} placeholder="e.g. ₹49,999" />
                                    </div>
                                    <StringListEditor label="Features" items={t.features} onChange={(v) => u({ features: v })} placeholder="What's included" />
                                    <Field label="Button Text" value={t.buttonText} onChange={(v) => u({ buttonText: v })} placeholder="e.g. Start with a Pilot" />
                                    <label className="flex items-center gap-2 text-sm font-semibold text-foreground-secondary cursor-pointer">
                                        <input type="checkbox" checked={t.highlighted} onChange={(e) => u({ highlighted: e.target.checked })} className="w-4 h-4 accent-[color:var(--accent)]" />
                                        Highlight as “Most Popular”
                                    </label>
                                </>
                            )} />
                        <StringListEditor label="Assurances" items={form.pricing.assurances} onChange={(v) => setPricing({ assurances: v })} placeholder="e.g. NDA before we see your data" hint="The trust row under the pricing tiers." />
                    </Card>

                    <Card title="Why Us" defaultOpen={false}>
                        <Field label="Heading" value={form.whyUs.heading} onChange={(v) => setWhy({ heading: v })} placeholder="e.g. Why Companies Choose Brynex" />
                        <Repeater label="Cards" items={form.whyUs.items} onChange={(v) => setWhy({ items: v })} makeNew={() => ({ title: '', description: '' })} itemTitle={(it) => it.title || 'New card'}
                            render={(it, u) => (
                                <>
                                    <Field label="Title" value={it.title} onChange={(v) => u({ title: v })} placeholder="Differentiator" />
                                    <Area label="Description" value={it.description} onChange={(v) => u({ description: v })} rows={2} placeholder="Why it matters" />
                                </>
                            )} />
                    </Card>

                    <Card title="Comparison Table" defaultOpen={false}>
                        <Field label="Heading" value={form.comparison.heading} onChange={(v) => setComp({ heading: v })} placeholder="e.g. How We're Different" />
                        <Repeater label="Rows" items={form.comparison.rows} onChange={(v) => setComp({ rows: v })} makeNew={() => ({ typical: '', ours: '' })} itemTitle={(r) => r.ours || 'New row'}
                            render={(r, u) => (
                                <div className="grid sm:grid-cols-2 gap-3">
                                    <Field label="Typical Agency" value={r.typical} onChange={(v) => u({ typical: v })} placeholder="The common shortcoming" />
                                    <Field label="Our Approach" value={r.ours} onChange={(v) => u({ ours: v })} placeholder="What we do instead" />
                                </div>
                            )} />
                    </Card>

                    <Card title="Tech Stack" subtitle="Scrolling marquee of tools" defaultOpen={false}>
                        <Repeater label="Tech" items={form.techStack} onChange={(v) => set('techStack', v)} makeNew={() => ({ name: '', icon: '' })} itemTitle={(t) => t.name || 'New tool'}
                            render={(t, u) => (
                                <div className="grid sm:grid-cols-2 gap-3">
                                    <Field label="Name" value={t.name} onChange={(v) => u({ name: v })} placeholder="e.g. LangChain" />
                                    <Field label="Icon (short)" value={t.icon} onChange={(v) => u({ icon: v })} placeholder="e.g. LC" hint="2–4 letters shown in the chip." />
                                </div>
                            )} />
                    </Card>

                    <Card title="Testimonial" defaultOpen={false}>
                        <Area label="Quote" value={form.testimonial.quote} onChange={(v) => setTestimonial({ quote: v })} rows={3} placeholder="Client quote (leave blank to hide)" />
                        <div className="grid sm:grid-cols-2 gap-3">
                            <Field label="Author" value={form.testimonial.author} onChange={(v) => setTestimonial({ author: v })} placeholder="Name" />
                            <Field label="Role" value={form.testimonial.role} onChange={(v) => setTestimonial({ role: v })} placeholder="Title, Company" />
                        </div>
                    </Card>

                    <Card title="FAQs" defaultOpen={false}>
                        <Repeater label="FAQs" items={form.faqs} onChange={(v) => set('faqs', v)} makeNew={() => ({ question: '', answer: '' })} itemTitle={(f) => f.question || 'New question'}
                            render={(f, u) => (
                                <>
                                    <Field label="Question" value={f.question} onChange={(v) => u({ question: v })} placeholder="The question" />
                                    <Area label="Answer" value={f.answer} onChange={(v) => u({ answer: v })} rows={3} placeholder="The answer" />
                                </>
                            )} />
                    </Card>

                    <Card title="Final Call-to-Action" defaultOpen={false}>
                        <Field label="Title" value={form.customCta.title} onChange={(v) => setCta({ title: v })} placeholder="e.g. Ready to Put AI Agents to Work?" />
                        <Area label="Subtitle" value={form.customCta.subtitle} onChange={(v) => setCta({ subtitle: v })} rows={2} placeholder="Supporting line" />
                        <Field label="Button Text" value={form.customCta.buttonText} onChange={(v) => setCta({ buttonText: v })} placeholder="e.g. Map Your AI Use Case — Free" />
                        <StringListEditor label="Bullets" items={form.customCta.bullets} onChange={(v) => setCta({ bullets: v })} placeholder="A reason to act" />
                    </Card>

                    <Card title="Custom Sections" subtitle="Add your own blocks — reorder & style them in the Design tab">
                        {form.customSections.length === 0 && (
                            <p className="text-sm text-foreground-muted">No custom sections yet. Add one to insert a block the built-in sections don’t cover.</p>
                        )}
                        <div className="space-y-4">
                            {form.customSections.map((cs, i) => {
                                const layoutMeta = CUSTOM_SECTION_LAYOUTS.find((l) => l.value === cs.layout);
                                return (
                                    <div key={cs.id} className="rounded-xl border border-border bg-background p-4 space-y-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-xs font-bold text-foreground-secondary truncate">Custom #{i + 1} · {cs.heading?.trim() || layoutMeta?.label}</span>
                                            <button type="button" onClick={() => removeCustomSection(cs.id)} className="p-1.5 rounded-lg text-foreground-muted hover:text-red-500 hover:bg-red-500/10 transition-colors" aria-label="Remove custom section">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                        <div>
                                            <label className={LABEL_CLASS}>Layout</label>
                                            <select value={cs.layout} onChange={(e) => updateCustomSection(cs.id, { layout: e.target.value as CustomSectionLayout })} className={`${FIELD_CLASS} !py-2.5`}>
                                                {CUSTOM_SECTION_LAYOUTS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                                            </select>
                                            {layoutMeta && <p className="mt-1.5 text-xs text-foreground-muted">{layoutMeta.hint}</p>}
                                        </div>
                                        <Field label="Eyebrow" value={cs.eyebrow ?? ''} onChange={(v) => updateCustomSection(cs.id, { eyebrow: v })} placeholder="Small label above the heading (optional)" />
                                        <Field label="Heading" value={cs.heading ?? ''} onChange={(v) => updateCustomSection(cs.id, { heading: v })} placeholder="Section heading" />
                                        {cs.layout !== 'cta' && (
                                            <Area label="Subheading" value={cs.subheading ?? ''} onChange={(v) => updateCustomSection(cs.id, { subheading: v })} rows={2} placeholder="Optional intro line" />
                                        )}
                                        {(cs.layout === 'text' || cs.layout === 'cta') && (
                                            <Area label="Body" value={cs.body ?? ''} onChange={(v) => updateCustomSection(cs.id, { body: v })} rows={4} placeholder="Body copy…" hint="Leave a blank line between paragraphs." />
                                        )}
                                        {cs.layout === 'cta' && (
                                            <Field label="Button Text" value={cs.buttonText ?? ''} onChange={(v) => updateCustomSection(cs.id, { buttonText: v })} placeholder="e.g. Book a Call" />
                                        )}
                                        {(cs.layout === 'cards' || cs.layout === 'list') && (
                                            <Repeater label="Items" items={cs.items ?? []} onChange={(v) => updateCustomSection(cs.id, { items: v })} makeNew={() => ({ title: '', description: '' })} itemTitle={(it) => it.title || 'New item'}
                                                render={(it, u) => (
                                                    <>
                                                        <Field label="Title" value={it.title} onChange={(v) => u({ title: v })} placeholder="Item title" />
                                                        <Area label="Description" value={it.description ?? ''} onChange={(v) => u({ description: v })} rows={2} placeholder="Optional description" />
                                                    </>
                                                )} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <button type="button" onClick={addCustomSection} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-border text-sm font-bold text-foreground-secondary hover:border-accent hover:text-accent transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                            Add custom section
                        </button>
                    </Card>
                </div>
            )}

            {/* ===== India variant tab ===== */}
            {tab === 'india' && (
                <div className="space-y-4 max-w-3xl">
                    <div className="rounded-xl border border-border bg-background-secondary/30 px-5 py-4 text-sm text-foreground-secondary">
                        These optional overrides power the crawlable <span className="font-bold text-foreground">/in/services/{form.slug || 'your-slug'}</span> page. Leave a field blank to fall back to the global content. Fill any field to enable the India variant.
                    </div>
                    <Card title="India SEO">
                        <Field label="SEO Title" value={form.marketIN.seoTitle} onChange={(v) => setIN({ seoTitle: v })} placeholder="India-specific search title" />
                        <Area label="Meta Description" value={form.marketIN.seoMeta} onChange={(v) => setIN({ seoMeta: v })} rows={3} placeholder="India-specific snippet" />
                    </Card>
                    <Card title="India Copy">
                        <Area label="Hook" value={form.marketIN.hook} onChange={(v) => setIN({ hook: v })} rows={3} placeholder="India-market hero hook" />
                        <Area label="Pricing Subheading" value={form.marketIN.pricingSubheading} onChange={(v) => setIN({ pricingSubheading: v })} rows={2} placeholder="e.g. Honest Indian-market pricing…" />
                        <StringListEditor label="Assurances" items={form.marketIN.assurances} onChange={(v) => setIN({ assurances: v })} placeholder="e.g. GST invoicing & INR payments" />
                        <Area label="CTA Subtitle" value={form.marketIN.ctaSubtitle} onChange={(v) => setIN({ ctaSubtitle: v })} rows={2} placeholder="India-market final CTA line" />
                        <Field label="Pricing Note" value={form.marketIN.pricingNote} onChange={(v) => setIN({ pricingNote: v })} placeholder="e.g. Prices for the Indian market · GST extra" />
                    </Card>
                    <Card title="India FAQs" subtitle="Replace the global FAQs on the India page">
                        <Repeater label="FAQs" items={form.marketIN.faqs} onChange={(v) => setIN({ faqs: v })} makeNew={() => ({ question: '', answer: '' })} itemTitle={(f) => f.question || 'New question'}
                            render={(f, u) => (
                                <>
                                    <Field label="Question" value={f.question} onChange={(v) => u({ question: v })} placeholder="The question" />
                                    <Area label="Answer" value={f.answer} onChange={(v) => u({ answer: v })} rows={3} placeholder="The answer" />
                                </>
                            )} />
                    </Card>
                </div>
            )}

            {/* ===== Design tab ===== */}
            {tab === 'design' && (
                <div className="max-w-3xl">
                    <ServiceDesignPanel value={theme} onChange={patchTheme} customSections={form.customSections} />
                </div>
            )}

            {/* ===== Preview tab ===== */}
            {tab === 'preview' && (
                <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <p className="text-xs text-foreground-muted">Live preview — reflects unsaved changes. Scroll to reveal animated sections.</p>
                        {previewService.marketIN && (
                            <div className="flex gap-1 p-1 rounded-lg bg-background-secondary border border-border">
                                {(['GLOBAL', 'IN'] as const).map((mk) => (
                                    <button key={mk} type="button" onClick={() => setPreviewMarket(mk)} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${previewMarket === mk ? 'bg-accent text-white' : 'text-foreground-secondary hover:text-foreground'}`}>
                                        {mk === 'GLOBAL' ? '🌎 Global' : '🇮🇳 India'}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="rounded-2xl border border-border overflow-hidden bg-background">
                        <ServicePageClient
                            key={`${previewMarket}-${theme.accentColor}-${theme.heroLayout}`}
                            service={previewService}
                            market={previewService.marketIN ? previewMarket : 'GLOBAL'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
