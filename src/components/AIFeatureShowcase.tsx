'use client';

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { AI_FEATURES, AUTOPILOT_LIVE, CLINIZY, type AIFeature, type AIFeatureId } from '@/data/products';
import { CLINIZY_GREEN_TEXT } from './ClinizyLogo';

/** How long each capability stays on screen before auto-advancing. */
const DWELL_MS = 5600;
const GREEN = CLINIZY.brandGreen;

/**
 * Compact, auto-advancing showcase of the AI inside Clinizy Care
 * (Bol, Saathi, Awaz, Nazar, Buddhi, Setu) plus the live Autopilot strip.
 * - The active tab's progress bar *is* the timer: its animationend advances
 *   the carousel, so pausing the animation (hover/focus/Pause) pauses it.
 * - Reduced motion: no progress animation, so no auto-advance; users click.
 * - WAI-ARIA tabs: arrow keys / Home / End move between capabilities.
 * Previews are illustrations of how each capability works, not screenshots,
 * and every item carries its real status (Early access / Roadmap).
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
    const roadmapNames = AI_FEATURES.filter((f) => f.status === 'Roadmap').map((f) => f.name);

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
        <div className={className}>
            <div
                className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
                }}
            >
                <div role="tablist" aria-label="AI inside Clinizy Care" aria-orientation="vertical" className="flex flex-col gap-1">
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
                                className={`group relative overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-colors duration-200 ${
                                    selected ? 'border-border bg-background-secondary' : 'border-transparent hover:bg-background-secondary/60'
                                }`}
                            >
                                <span className="flex items-center gap-3">
                                    <span
                                        lang="hi"
                                        aria-hidden="true"
                                        className={`flex h-9 w-14 shrink-0 items-center justify-center rounded-lg text-[15px] font-semibold transition-colors ${
                                            selected ? 'bg-accent-gradient text-white' : 'bg-accent/10 text-accent'
                                        }`}
                                    >
                                        {f.nameHi}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="flex flex-wrap items-baseline gap-x-2">
                                            <span className={`font-semibold ${selected ? 'text-foreground' : 'text-foreground-secondary group-hover:text-foreground'}`}>
                                                {f.name}
                                            </span>
                                            <span className="text-sm text-foreground-muted">{f.title}</span>
                                        </span>
                                        {/* Only the active capability expands — six fit in a small area */}
                                        <span
                                            className={`grid text-sm text-foreground-secondary transition-[grid-template-rows,opacity] duration-300 ease-out ${
                                                selected ? 'mt-0.5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                            }`}
                                        >
                                            <span className="overflow-hidden">{f.summary}</span>
                                        </span>
                                    </span>
                                    <StatusBadge status={f.status} compact />
                                </span>
                                {/* Progress bar — doubles as the auto-advance timer */}
                                {selected && (
                                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-border" aria-hidden="true">
                                        <span
                                            key={`${active}-${reducedMotion}`}
                                            className="block h-full origin-left bg-accent"
                                            style={{
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
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <span lang="hi" className="text-lg font-semibold text-accent">{feature.nameHi}</span>
                        <span className="text-lg font-bold text-foreground">{feature.name}</span>
                        <span className="text-foreground-muted" aria-hidden="true">·</span>
                        <span className="text-foreground-secondary">{feature.title}</span>
                        <StatusBadge status={feature.status} />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{feature.detail}</p>
                    {/* Keyed so each capability's animation replays from the start */}
                    <div key={feature.id} className="mt-4 flex min-h-[220px] flex-1 items-center justify-center rounded-xl border border-border bg-background-card p-4 sm:p-5">
                        <FeatureVisual id={feature.id} />
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-4">
                        <p className="text-xs text-foreground-muted">
                            Illustration of how it works. {CLINIZY.bol.name} is in early access; {roadmapNames.join(', ')} are on our roadmap and not yet available.
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

            {/* Live today — proof beside the roadmap */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-border px-4 py-3">
                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${CLINIZY_GREEN_TEXT}`}>
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping" style={{ backgroundColor: GREEN }} />
                        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: GREEN }} />
                    </span>
                    Live today
                </span>
                <span className="text-sm font-semibold text-foreground">Autopilot: 24 automations</span>
                <ul className="flex flex-wrap gap-1.5" aria-label="Examples of live automations">
                    {AUTOPILOT_LIVE.map((a) => (
                        <li key={a} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground-secondary">
                            {a}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function StatusBadge({ status, compact = false }: { status: AIFeature['status']; compact?: boolean }) {
    const early = status === 'Early access';
    return (
        <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 font-semibold ${compact ? 'text-[11px]' : 'text-xs'} ${
                early ? 'border-accent/30 bg-accent/10 text-accent' : 'border-border text-foreground-muted'
            }`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${early ? 'bg-accent' : 'bg-foreground-muted/60'}`} aria-hidden="true" />
            {status}
        </span>
    );
}

/* ------------------------------------------------------------------ */
/* Per-capability illustrations. motion-safe:animate-pop-in uses fill- */
/* mode "both", so staged items stay hidden until their delay — and    */
/* are simply visible (no animation) for reduced-motion users.         */
/* All names and numbers are fictional demo content.                   */
/* ------------------------------------------------------------------ */

const pop = 'motion-safe:animate-pop-in';
const d = (s: number) => ({ animationDelay: `${s}s` });

function FeatureVisual({ id }: { id: AIFeatureId }) {
    switch (id) {
        case 'bol':
            return <BolVisual />;
        case 'saathi':
            return <SaathiVisual />;
        case 'awaz':
            return <AwazVisual />;
        case 'nazar':
            return <NazarVisual />;
        case 'buddhi':
            return <BuddhiVisual />;
        case 'setu':
            return <SetuVisual />;
    }
}

function Wave({ bars, className = 'h-10' }: { bars: number[]; className?: string }) {
    return (
        <span className={`flex items-center gap-1 ${className}`}>
            {bars.map((h, i) => (
                <span key={i} className="w-1.5 rounded-full bg-accent motion-safe:animate-wave" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.08}s` }} />
            ))}
        </span>
    );
}

function BolVisual() {
    const lines = [
        { k: 'S', t: 'Fever × 3 days, sore throat' },
        { k: 'O', t: 'Temp 101°F, chest clear' },
        { k: 'A', t: 'Acute pharyngitis' },
        { k: 'P', t: 'Paracetamol SOS, review in 1 week' },
    ];
    return (
        <div className="grid w-full items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)]" aria-hidden="true">
            <div className="space-y-3">
                <Wave bars={[0.35, 0.8, 0.55, 1, 0.7, 0.45, 0.9, 0.6, 0.4, 0.85]} />
                <p className="text-sm italic leading-snug text-foreground-secondary">&ldquo;Teen din se bukhar, gala kharab, chest clear&hellip;&rdquo;</p>
            </div>
            <svg className="hidden text-foreground-muted sm:block" width="28" height="16" viewBox="0 0 28 16" fill="none">
                <path d="M2 8h22m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="space-y-2 rounded-lg border border-border bg-background-secondary/60 p-3">
                <p className="text-[11px] font-semibold text-foreground-muted">Draft · review before finalising</p>
                {lines.map((l, i) => (
                    <div key={l.k} className={`flex items-baseline gap-2 text-xs ${pop}`} style={d(0.3 + i * 0.45)}>
                        <span className="w-3 shrink-0 font-bold text-accent">{l.k}</span>
                        <span className="text-foreground-secondary">{l.t}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Bubble({ from, children, delay, meta }: { from: 'patient' | 'agent'; children: ReactNode; delay: number; meta?: string }) {
    const agent = from === 'agent';
    return (
        <div className={`flex ${agent ? 'justify-end' : 'justify-start'} ${pop}`} style={d(delay)}>
            <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug text-foreground ${
                    agent ? 'rounded-tr-sm' : 'rounded-tl-sm border border-border bg-background-secondary'
                }`}
                style={agent ? { backgroundColor: `${GREEN}1F` } : undefined}
            >
                {children}
                {meta && <span className="mt-0.5 block text-right text-[10px] text-foreground-muted">{meta}</span>}
            </div>
        </div>
    );
}

function SaathiVisual() {
    return (
        <div className="w-full max-w-sm space-y-2" aria-hidden="true">
            <Bubble from="patient" delay={0.2} meta="9:47 pm">
                <span lang="hi">डॉक्टर साहब कल कितने बजे बैठेंगे? माँ को दिखाना है</span>
            </Bubble>
            <Bubble from="agent" delay={0.9} meta="Saathi · 9:47 pm">
                Kal Dr. Sharma 10 se 1 baje tak hain. 10:40 ka slot khali hai, book kar doon?
            </Bubble>
            <Bubble from="patient" delay={1.6}>
                Haan, kar do
            </Bubble>
            <Bubble from="agent" delay={2.3} meta="Saathi · 9:48 pm">
                Booked ✓ Token 12, kal 10:40. Location aur reminder bhej diya hai.
            </Bubble>
        </div>
    );
}

function AwazVisual() {
    return (
        <div className="w-full max-w-sm space-y-3" aria-hidden="true">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background-secondary/60 p-3">
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <span className="absolute inset-0 rounded-full bg-accent/20 motion-safe:animate-ping" />
                    <svg className="relative" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                </span>
                <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">Calling Kamla Devi</span>
                    <span className="block text-xs text-foreground-muted">Refill reminder · Hindi · 0:32</span>
                </span>
                <Wave bars={[0.4, 0.9, 0.6, 1, 0.5]} className="h-6" />
            </div>
            <p className={`rounded-lg border border-border bg-background-card px-3 py-2 text-[13px] text-foreground-secondary ${pop}`} style={d(0.6)}>
                <span lang="hi">&ldquo;आपकी बीपी की दवा गुरुवार को ख़त्म होगी। दोबारा मँगानी है तो &lsquo;हाँ&rsquo; कहिए।&rdquo;</span>
            </p>
            <div className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-xs font-medium ${pop}`} style={{ backgroundColor: `${GREEN}14`, ...d(1.5) }}>
                <span className="text-foreground">Answer: &ldquo;Haan&rdquo;</span>
                <span className={CLINIZY_GREEN_TEXT}>Refill request logged ✓</span>
            </div>
        </div>
    );
}

function NazarVisual() {
    const items = [
        { t: '6 lab orders not billed', v: '₹4,800' },
        { t: '9 follow-ups missed, no message sent', v: '~₹3,600' },
        { t: 'Amoxyclav expiring in 38 days', v: '₹7,220' },
    ];
    return (
        <div className="w-full max-w-sm rounded-2xl border border-border bg-background-secondary/60 p-3.5" aria-hidden="true">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">Clinizy Nazar · daily brief</span>
                <span className="text-[11px] text-foreground-muted">8:00 am</span>
            </div>
            <p className="mt-2 text-[13px] text-foreground-secondary">Kal: 47 patients · ₹62,400 collected</p>
            <p className="mt-2 text-xs font-bold text-foreground">Aaj ke 3 kaam</p>
            <ol className="mt-1.5 space-y-1.5">
                {items.map((it, i) => (
                    <li key={it.t} className={`flex items-center justify-between gap-3 rounded-lg bg-background-card px-2.5 py-1.5 text-[13px] ${pop}`} style={d(0.4 + i * 0.5)}>
                        <span className="text-foreground-secondary">
                            {i + 1}. {it.t}
                        </span>
                        <span className="shrink-0 font-bold text-accent">{it.v}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}

function BuddhiVisual() {
    const history = [52, 60, 48, 66, 58, 72];
    const forecast = [78, 70];
    const max = 90;
    return (
        <div className="w-full max-w-md space-y-3" aria-hidden="true">
            <div className="rounded-xl border border-border bg-background-secondary/60 p-3">
                <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-foreground">Pan 40 · strips per month</span>
                    <span className="text-foreground-muted">From prescriptions, not sales</span>
                </div>
                <div className="mt-3 flex h-24 items-end gap-2">
                    {history.map((v, i) => (
                        <span key={`h${i}`} className={`flex-1 rounded-t bg-foreground-muted/40 ${pop}`} style={{ height: `${(v / max) * 100}%`, ...d(i * 0.08) }} />
                    ))}
                    {forecast.map((v, i) => (
                        <span
                            key={`f${i}`}
                            className={`flex-1 rounded-t border-2 border-dashed border-accent bg-accent/15 ${pop}`}
                            style={{ height: `${(v / max) * 100}%`, ...d(0.6 + i * 0.15) }}
                        />
                    ))}
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] text-foreground-muted">
                    <span>Apr</span>
                    <span className="text-accent">Forecast: Oct–Nov</span>
                </div>
            </div>
            <div className={`flex items-center justify-between gap-3 rounded-lg border border-border bg-background-card px-3 py-2 text-[13px] ${pop}`} style={d(1.1)}>
                <span className="text-foreground-secondary">Expiry rescue: Amoxyclav 625, 40 strips</span>
                <span className="shrink-0 text-xs font-semibold text-accent">Return window: 12 days</span>
            </div>
        </div>
    );
}

function SetuVisual() {
    const rows = [
        { name: 'Dr. R. Sharma', v: '₹8.42L', w: 100 },
        { name: 'Dr. A. Kumari', v: '₹6.15L', w: 73 },
        { name: 'Dr. M. Prasad', v: '₹3.46L', w: 41 },
    ];
    return (
        <div className="w-full max-w-md space-y-3" aria-hidden="true">
            <div className={`rounded-2xl rounded-tl-sm border border-border bg-background-secondary px-3.5 py-2 text-[13px] text-foreground ${pop}`}>
                &ldquo;Pichhle teen mahine mein sabse zyada revenue kis doctor ne banaya?&rdquo;
            </div>
            <div className={`rounded-xl border border-border bg-background-card p-3 ${pop}`} style={d(0.5)}>
                <p className="text-xs font-semibold text-foreground">Revenue by doctor · Jun–Aug</p>
                <div className="mt-2.5 space-y-2">
                    {rows.map((r, i) => (
                        <div key={r.name} className="grid grid-cols-[6.5rem_1fr_3.5rem] items-center gap-2 text-xs">
                            <span className="truncate text-foreground-secondary">{r.name}</span>
                            <span className="h-2 rounded-full bg-border">
                                <span className="block h-full origin-left rounded-full bg-accent motion-safe:animate-fill-line" style={{ width: `${r.w}%`, animationDelay: `${0.8 + i * 0.25}s` }} />
                            </span>
                            <span className="text-right font-semibold text-foreground">{r.v}</span>
                        </div>
                    ))}
                </div>
                <p className="mt-2.5 text-[10px] text-foreground-muted">Answered from a pre-approved, clinic-scoped report</p>
            </div>
        </div>
    );
}
