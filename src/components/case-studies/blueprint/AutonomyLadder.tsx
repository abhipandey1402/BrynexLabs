import type { AutonomyLevel, AutonomyRow } from '@/data/blueprint-types';

const LEVELS: { level: AutonomyLevel; label: string; short: string }[] = [
    { level: 0, label: 'No model', short: 'Ordinary code' },
    { level: 1, label: 'Suggests', short: 'A person copies it' },
    { level: 2, label: 'Drafts for approval', short: 'A person approves' },
    { level: 3, label: 'Acts within limits', short: 'Read-only or refuse-only' },
];

function Dots({ ceiling, delay }: { ceiling: AutonomyLevel; delay: number }) {
    return (
        <div className="relative flex items-center justify-between" aria-hidden="true">
            <span className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-border" />
            {LEVELS.map((l) => {
                const reached = l.level <= ceiling;
                const isCeiling = l.level === ceiling;
                return (
                    <span
                        key={l.level}
                        className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                            isCeiling ? 'border-accent bg-accent text-white motion-safe:animate-pop-in' : reached ? 'border-accent/40 bg-accent/20' : 'border-border bg-background-card'
                        }`}
                        style={isCeiling ? { animationDelay: `${delay}s` } : undefined}
                    >
                        {isCeiling && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                );
            })}
        </div>
    );
}

/**
 * An autonomy ceiling for every agent: how far up the ladder it is allowed
 * to go, agreed before it is built. The visual point is the cluster at the
 * third rung: almost everything stops at "a person approves".
 */
export default function AutonomyLadder({ rows }: { rows: AutonomyRow[] }) {
    const products = Array.from(new Set(rows.map((r) => r.product)));
    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-background-card shadow-card">
            {/* header (desktop) */}
            <div className="hidden grid-cols-[14rem_minmax(14rem,20rem)_minmax(0,1fr)] gap-x-8 border-b border-border bg-background-secondary/60 px-6 py-4 md:grid">
                <span className="text-xs font-semibold text-foreground-muted">Agent</span>
                <div className="grid grid-cols-4 text-center">
                    {LEVELS.map((l) => (
                        <div key={l.level} className="px-0.5">
                            <p className="text-[11px] font-bold leading-tight text-foreground">{l.label}</p>
                            <p className="mt-0.5 text-[10px] leading-tight text-foreground-muted">{l.short}</p>
                        </div>
                    ))}
                </div>
                <span className="text-xs font-semibold text-foreground-muted">Why it stops there</span>
            </div>

            {products.map((product) => (
                <div key={product} className="border-b border-border last:border-b-0">
                    <p className="bg-background-secondary/40 px-6 py-2 text-xs font-bold text-foreground-secondary">{product}</p>
                    {rows
                        .filter((r) => r.product === product)
                        .map((r, i) => (
                            <div key={r.agent} className="grid gap-x-8 gap-y-3 px-6 py-4 md:grid-cols-[14rem_minmax(14rem,20rem)_minmax(0,1fr)] md:items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-foreground">{r.agent}</span>
                                    <span
                                        className={`rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${
                                            r.status === 'Live' ? 'border-[#1A6B3C]/35 text-[#1A6B3C] dark:text-[#2E9B59]' : 'border-border text-foreground-muted'
                                        }`}
                                    >
                                        {r.status}
                                    </span>
                                </div>
                                <div className="max-w-xs md:max-w-none">
                                    <Dots ceiling={r.ceiling} delay={0.1 + i * 0.08} />
                                    <p className="mt-1.5 text-[11px] font-semibold text-accent md:hidden">{LEVELS[r.ceiling].label}</p>
                                </div>
                                <p className="text-sm leading-relaxed text-foreground-secondary">{r.note}</p>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}
