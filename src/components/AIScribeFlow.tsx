import { CLINIZY } from '@/data/products';
import { CLINIZY_GREEN_TEXT } from './ClinizyLogo';

const BARS = [0.35, 0.8, 0.55, 1, 0.7, 0.45, 0.9, 0.6, 0.4, 0.85, 0.5, 0.75];
const NOTE_LINES = [
    { label: 'S', width: '82%' },
    { label: 'O', width: '64%' },
    { label: 'A', width: '72%' },
    { label: 'P', width: '56%' },
];

/**
 * How Clinizy Scribe works, drawn as an animated pipeline. This is an
 * illustration of the flow — not a product screenshot — and it carries the
 * same "Early access" status clinizy.in uses. All motion is motion-safe.
 */
export default function AIScribeFlow({ className = '' }: { className?: string }) {
    const green = CLINIZY.brandGreen;
    const { scribe } = CLINIZY;

    return (
        <figure className={`rounded-3xl border border-border bg-background-card p-6 sm:p-8 ${className}`}>
            <figcaption className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-lg font-bold tracking-tight text-foreground">{scribe.name}</span>
                <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${CLINIZY_GREEN_TEXT}`}
                    style={{ borderColor: `${green}40`, backgroundColor: `${green}14` }}
                >
                    {scribe.status}
                </span>
                <span className="w-full text-sm text-foreground-secondary sm:w-auto">
                    AI clinical notes: from a doctor&apos;s dictation to a structured draft, with a guardrail in between.
                </span>
            </figcaption>

            <ol className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-3">
                {/* 1 — Dictation */}
                <li className="rounded-2xl border border-border bg-background-secondary/60 p-5">
                    <p className="text-xs font-semibold text-foreground-muted">Step 1</p>
                    <p className="mt-1 font-semibold text-foreground">The doctor dictates</p>
                    <div className="mt-4 flex h-10 items-center gap-1" aria-hidden="true">
                        {BARS.map((h, i) => (
                            <span
                                key={i}
                                className="w-1.5 origin-center rounded-full motion-safe:animate-wave"
                                style={{ height: `${h * 100}%`, backgroundColor: green, opacity: 0.85, animationDelay: `${i * 0.09}s` }}
                            />
                        ))}
                    </div>
                    <p className="mt-3 text-sm italic text-foreground-secondary">&ldquo;Fever for three days, dry cough, no breathlessness&hellip;&rdquo;</p>
                </li>

                <Connector color={green} />

                {/* 2 — Guardrail */}
                <li className="rounded-2xl border border-border bg-background-secondary/60 p-5">
                    <p className="text-xs font-semibold text-foreground-muted">Step 2</p>
                    <p className="mt-1 font-semibold text-foreground">A guardrail agent checks it</p>
                    <div className="mt-4 flex h-10 items-center" aria-hidden="true">
                        <span className="relative flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${green}1A` }}>
                            <span className="absolute inset-0 rounded-xl motion-safe:animate-glow-pulse" style={{ boxShadow: `0 0 0 1px ${green}55, 0 0 18px ${green}40` }} />
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <path d="M9 12l2 2 4-4" />
                            </svg>
                        </span>
                    </div>
                    <p className="mt-3 text-sm text-foreground-secondary">Non-clinical input is rejected before anything is drafted.</p>
                </li>

                <Connector color={green} delay="1.2s" />

                {/* 3 — Structured note */}
                <li className="rounded-2xl border border-border bg-background-secondary/60 p-5">
                    <p className="text-xs font-semibold text-foreground-muted">Step 3</p>
                    <p className="mt-1 font-semibold text-foreground">A structured draft to review</p>
                    <div className="mt-4 space-y-2" aria-hidden="true">
                        {NOTE_LINES.map((line, i) => (
                            <div key={line.label} className="flex items-center gap-2">
                                <span className="w-3 text-[11px] font-bold text-foreground-muted">{line.label}</span>
                                <span className="h-1.5 rounded-full bg-border" style={{ width: line.width }}>
                                    <span
                                        className="block h-full origin-left rounded-full motion-safe:animate-fill-line"
                                        style={{ backgroundColor: green, animationDelay: `${0.4 + i * 0.35}s` }}
                                    />
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-3 text-sm text-foreground-secondary">{scribe.documentTypes.join(' · ')}</p>
                </li>
            </ol>
        </figure>
    );
}

/** A connector with a dot travelling along it — horizontal on desktop, hidden on mobile (steps stack). */
function Connector({ color, delay = '0s' }: { color: string; delay?: string }) {
    return (
        <li aria-hidden="true" className="relative hidden w-10 items-center md:flex">
            <span className="h-px w-full bg-border" />
            <span
                className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full motion-safe:animate-flow"
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}`, animationDelay: delay }}
            />
        </li>
    );
}
