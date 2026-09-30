'use client';

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { AI_FEATURES, CLINIZY, type AIFeature, type AIFeatureVisual } from '@/data/products';
import { CLINIZY_GREEN_TEXT } from './ClinizyLogo';

/** How long each feature stays on screen before auto-advancing. */
const DWELL_MS = 5200;
const GREEN = CLINIZY.brandGreen;

/**
 * Compact, auto-advancing showcase of Clinizy Care's AI + Autopilot features.
 * - The active tab's progress bar *is* the timer: its animationend advances
 *   the carousel, so pausing the animation (hover/focus) pauses the carousel.
 * - Reduced motion: no progress animation, so no auto-advance; users click.
 * - WAI-ARIA tabs: arrow keys / Home / End move between features.
 * Previews are illustrations of how each feature works, not screenshots.
 */
export default function AIFeatureShowcase({ className = '' }: { className?: string }) {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    /** Explicit pause (WCAG 2.2.2) — independent of hover/focus pausing. */
    const [userPaused, setUserPaused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const baseId = useId();
    const feature = AI_FEATURES[active];

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReducedMotion(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    const next = useCallback(() => setActive((i) => (i + 1) % AI_FEATURES.length), []);

    const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        const last = AI_FEATURES.length - 1;
        const moves: Record<string, number> = {
            ArrowDown: active === last ? 0 : active + 1,
            ArrowRight: active === last ? 0 : active + 1,
            ArrowUp: active === 0 ? last : active - 1,
            ArrowLeft: active === 0 ? last : active - 1,
            Home: 0,
            End: last,
        };
        if (!(e.key in moves)) return;
        e.preventDefault();
        setActive(moves[e.key]);
        tabRefs.current[moves[e.key]]?.focus();
    };

    return (
        <div
            className={`grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8 ${className}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
            }}
        >
            <div role="tablist" aria-label="AI and Autopilot features" aria-orientation="vertical" className="flex flex-col gap-1">
                {AI_FEATURES.map((f, i) => {
                    const selected = i === active;
                    return (
                        <button
                            key={f.id}
                            ref={(el) => {
                                tabRefs.current[i] = el;
                            }}
                            id={`${baseId}-tab-${f.id}`}
                            role="tab"
                            type="button"
                            aria-selected={selected}
                            aria-controls={`${baseId}-panel`}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => setActive(i)}
                            onKeyDown={onKeyDown}
                            className={`group relative overflow-hidden rounded-xl border px-4 py-2.5 text-left transition-colors duration-200 ${
                                selected
                                    ? 'border-border bg-background-secondary'
                                    : 'border-transparent hover:bg-background-secondary/60'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <KindBadge kind={f.kind} />
                                <span className={`font-semibold ${selected ? 'text-foreground' : 'text-foreground-secondary group-hover:text-foreground'}`}>
                                    {f.title}
                                </span>
                            </span>
                            {/* Only the active feature expands — keeps six features in a small area */}
                            <span
                                className={`grid text-sm text-foreground-secondary transition-[grid-template-rows,opacity] duration-300 ease-out ${
                                    selected ? 'mt-1 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                }`}
                            >
                                <span className="overflow-hidden">{f.summary}</span>
                            </span>
                            {/* Progress bar — doubles as the auto-advance timer */}
                            {selected && (
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-border" aria-hidden="true">
                                    <span
                                        key={`${active}-${reducedMotion}`}
                                        className="block h-full origin-left"
                                        style={{
                                            backgroundColor: GREEN,
                                            transform: reducedMotion ? 'scaleX(1)' : undefined,
                                            animation: reducedMotion ? undefined : `bx-progress ${DWELL_MS}ms linear forwards`,
                                            animationPlayState: paused || userPaused ? 'paused' : 'running',
                                        }}
                                        onAnimationEnd={next}
                                    />
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div
                id={`${baseId}-panel`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${feature.id}`}
                className="flex flex-col rounded-2xl border border-border bg-background-secondary/50 p-5 sm:p-6"
            >
                <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground">{feature.title}</span>
                    <StatusBadge status={feature.status} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{feature.detail}</p>
                {/* Keyed so each feature's animation replays from the start */}
                <div key={feature.id} className="mt-4 flex min-h-[208px] flex-1 items-center justify-center rounded-xl border border-border bg-background-card p-4 sm:p-5">
                    <FeatureVisual id={feature.id} />
                </div>
                <div className="mt-3 flex items-start justify-between gap-4">
                    <p className="text-xs text-foreground-muted">
                        Illustration of how the feature works. {CLINIZY.scribe.name} is in early access; Autopilot automations are live.
                    </p>
                    {!reducedMotion && (
                        <button
                            type="button"
                            onClick={() => setUserPaused((p) => !p)}
                            className="shrink-0 rounded-md border border-border px-2 py-0.5 text-xs font-semibold text-foreground-secondary transition-colors hover:text-foreground"
                            aria-pressed={userPaused}
                        >
                            {userPaused ? 'Play' : 'Pause'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function KindBadge({ kind }: { kind: AIFeature['kind'] }) {
    return kind === 'AI' ? (
        <span className="rounded-md bg-accent-gradient px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">AI</span>
    ) : (
        <span className="rounded-md border border-border px-1.5 py-0.5 text-[10px] font-bold leading-none text-foreground-secondary">AUTO</span>
    );
}

function StatusBadge({ status }: { status: AIFeature['status'] }) {
    const live = status === 'Live';
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold ${live ? CLINIZY_GREEN_TEXT : 'text-accent border-accent/30 bg-accent/10'}`}
            style={live ? { borderColor: `${GREEN}40`, backgroundColor: `${GREEN}14` } : undefined}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${live ? '' : 'bg-accent'}`} style={live ? { backgroundColor: GREEN } : undefined} aria-hidden="true" />
            {status}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/* Per-feature illustrations. motion-safe:animate-pop-in uses fill-mode */
/* "both", so staged items stay hidden until their delay — and are     */
/* simply visible (no animation) for reduced-motion users.             */
/* ------------------------------------------------------------------ */

const pop = 'motion-safe:animate-pop-in';
const d = (s: number) => ({ animationDelay: `${s}s` });

function FeatureVisual({ id }: { id: AIFeatureVisual }) {
    switch (id) {
        case 'notes':
            return <NotesVisual />;
        case 'documents':
            return <DocumentsVisual />;
        case 'guardrail':
            return <GuardrailVisual />;
        case 'recall':
            return <RecallVisual />;
        case 'safety':
            return <SafetyVisual />;
        case 'stock':
            return <StockVisual />;
    }
}

function NotesVisual() {
    const bars = [0.35, 0.8, 0.55, 1, 0.7, 0.45, 0.9, 0.6, 0.4, 0.85];
    const lines = [
        { k: 'S', t: 'Fever × 3 days, dry cough', w: '88%' },
        { k: 'O', t: 'Temp 101°F, chest clear', w: '72%' },
        { k: 'A', t: 'Viral URTI', w: '48%' },
        { k: 'P', t: 'Paracetamol, fluids, review in 3 days', w: '94%' },
    ];
    return (
        <div className="grid w-full items-center gap-4 sm:grid-cols-[auto_auto_1fr]" aria-hidden="true">
            <div className="flex h-12 items-center gap-1">
                {bars.map((h, i) => (
                    <span key={i} className="w-1.5 rounded-full motion-safe:animate-wave" style={{ height: `${h * 100}%`, backgroundColor: GREEN, animationDelay: `${i * 0.08}s` }} />
                ))}
            </div>
            <svg className="hidden text-foreground-muted sm:block" width="28" height="16" viewBox="0 0 28 16" fill="none">
                <path d="M2 8h22m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="space-y-2 rounded-lg border border-border bg-background-secondary/60 p-3">
                <p className="text-[11px] font-semibold text-foreground-muted">SOAP note · draft</p>
                {lines.map((l, i) => (
                    <div key={l.k} className={`flex items-baseline gap-2 text-xs ${pop}`} style={d(0.3 + i * 0.45)}>
                        <span className={`w-3 shrink-0 font-bold ${CLINIZY_GREEN_TEXT}`}>{l.k}</span>
                        <span className="text-foreground-secondary">{l.t}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DocumentsVisual() {
    const docs = ['Discharge summary', 'H&P', 'ER note'];
    return (
        <div className="relative h-44 w-full max-w-sm" aria-hidden="true">
            {docs.map((doc, i) => (
                <div
                    key={doc}
                    className={`absolute inset-x-0 rounded-xl border border-border bg-background-secondary p-4 shadow-card ${pop}`}
                    style={{ top: `${i * 22}px`, left: `${i * 18}px`, right: `${(2 - i) * 18}px`, zIndex: i, ...d(i * 0.35) }}
                >
                    <p className="text-xs font-semibold text-foreground">{doc}</p>
                    <div className="mt-3 space-y-1.5">
                        {[92, 76, 84, 58].map((w, j) => (
                            <span key={j} className="block h-1.5 rounded-full bg-border" style={{ width: `${w}%` }}>
                                {i === docs.length - 1 && (
                                    <span className="block h-full origin-left rounded-full motion-safe:animate-fill-line" style={{ backgroundColor: GREEN, animationDelay: `${0.9 + j * 0.25}s` }} />
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function GuardrailVisual() {
    return (
        <div className="w-full max-w-md space-y-3" aria-hidden="true">
            <div className={`flex items-center justify-between gap-3 rounded-lg border border-border bg-background-secondary/60 px-3 py-2.5 ${pop}`}>
                <span className="text-sm text-foreground-secondary">&ldquo;BP 150/95, headache since morning&hellip;&rdquo;</span>
                <span className={`flex shrink-0 items-center gap-1 text-xs font-semibold ${pop} ${CLINIZY_GREEN_TEXT}`} style={d(0.6)}>
                    <Check /> Clinical
                </span>
            </div>
            <div className={`flex items-center justify-between gap-3 rounded-lg border border-border bg-background-secondary/60 px-3 py-2.5 ${pop}`} style={d(0.9)}>
                <span className="text-sm text-foreground-muted line-through decoration-foreground-muted/50">&ldquo;Write a birthday poem&rdquo;</span>
                <span className={`flex shrink-0 items-center gap-1 text-xs font-semibold text-[#B91C1C] dark:text-[#F87171] ${pop}`} style={d(1.5)}>
                    <Cross /> Rejected
                </span>
            </div>
            <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-foreground-secondary ${pop}`} style={{ backgroundColor: `${GREEN}14`, ...d(2.1) }}>
                <Shield /> Anti-hallucination checks passed on the draft
            </div>
        </div>
    );
}

function RecallVisual() {
    const msgs = [
        'Namaste! Your follow-up with Dr. Mehta is due on Friday. Reply 1 to confirm.',
        'Reminder: your Metformin refill runs out in 3 days.',
        'We missed you today. Tap to book a new slot.',
    ];
    return (
        <div className="w-full max-w-sm space-y-2.5" aria-hidden="true">
            {msgs.map((m, i) => (
                <div key={m} className={`w-[88%] rounded-2xl rounded-tl-sm border border-border bg-background-secondary px-3.5 py-2.5 ${pop}`} style={d(0.25 + i * 0.7)}>
                    <p className="text-[13px] leading-snug text-foreground">{m}</p>
                    <p className={`mt-1 text-right text-[10px] font-medium ${CLINIZY_GREEN_TEXT}`}>
                        WhatsApp · ✓✓
                    </p>
                </div>
            ))}
        </div>
    );
}

function SafetyVisual() {
    return (
        <div className="w-full max-w-md space-y-3" aria-hidden="true">
            <div className="rounded-lg border border-border bg-background-secondary/60 p-3">
                <p className="text-[11px] font-semibold text-foreground-muted">Lab result · Serum potassium</p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">6.8 mmol/L</span>
                    <span className="relative inline-flex items-center rounded-full bg-[#B91C1C] px-2.5 py-0.5 text-xs font-bold text-white">
                        <span className="absolute inset-0 rounded-full bg-[#B91C1C] opacity-60 motion-safe:animate-ping" />
                        <span className="relative">Critical</span>
                    </span>
                </div>
            </div>
            <div className={`flex items-center gap-3 rounded-lg border border-border bg-background-card p-3 ${pop}`} style={d(0.9)}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${GREEN}1A`, color: GREEN }}>
                    <Bell />
                </span>
                <span className="text-sm text-foreground">
                    Escalated to the doctor on duty
                    <span className="block text-xs text-foreground-muted">Critical result alert · automatic</span>
                </span>
            </div>
        </div>
    );
}

function StockVisual() {
    const rows = [
        { name: 'Amoxicillin 500', level: 82, tone: GREEN, text: CLINIZY_GREEN_TEXT, note: 'In stock', delay: 0.2 },
        { name: 'ORS sachets', level: 18, tone: '#B45309', text: 'text-[#B45309] dark:text-[#FBBF24]', note: 'Below reorder level', delay: 0.6 },
        { name: 'Insulin glargine', level: 55, tone: '#B91C1C', text: 'text-[#B91C1C] dark:text-[#F87171]', note: 'Expires in 30 days', delay: 1.0 },
    ];
    return (
        <div className="w-full max-w-md space-y-3" aria-hidden="true">
            {rows.map((r) => (
                <div key={r.name} className={pop} style={d(r.delay)}>
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground">{r.name}</span>
                        <span className={`font-semibold ${r.text}`}>{r.note}</span>
                    </div>
                    <span className="mt-1.5 block h-2 rounded-full bg-border">
                        <span className="block h-full origin-left rounded-full motion-safe:animate-fill-line" style={{ width: `${r.level}%`, backgroundColor: r.tone, animationDelay: `${r.delay}s` }} />
                    </span>
                </div>
            ))}
            <p className={`pt-1 text-xs font-medium text-foreground-secondary ${pop}`} style={d(1.6)}>
                Reorder and near-expiry alerts sent to the pharmacist
            </p>
        </div>
    );
}

function Check() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
        </svg>
    );
}
function Cross() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );
}
function Shield() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}
function Bell() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    );
}
