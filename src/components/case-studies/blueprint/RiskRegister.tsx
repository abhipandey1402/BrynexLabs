import type { RiskRow } from '@/data/blueprint-types';

const KIND_STYLE: Record<RiskRow['kind'], string> = {
    Prevent: 'border-accent/30 bg-accent/10 text-accent',
    Detect: 'border-border bg-background-secondary text-foreground',
    Contain: 'border-border-hover bg-foreground/5 text-foreground-secondary',
};

/** The risk register: each failure mode, a concrete scenario, and the control that answers it. */
export default function RiskRegister({ risks }: { risks: RiskRow[] }) {
    const counts = (['Prevent', 'Detect', 'Contain'] as const).map((k) => ({ k, n: risks.filter((r) => r.kind === k).length }));
    return (
        <div>
            <ul className="mb-5 flex flex-wrap gap-2" aria-label="Controls by kind">
                {counts.map((c) => (
                    <li key={c.k} className={`rounded-full border px-3 py-1 text-xs font-semibold ${KIND_STYLE[c.k]}`}>
                        {c.n} {c.k.toLowerCase()}
                    </li>
                ))}
            </ul>
            <div className="overflow-hidden rounded-2xl border border-border bg-background-card shadow-card">
                <div className="hidden grid-cols-[13rem_minmax(0,1fr)_minmax(0,1.2fr)_6rem] gap-x-6 border-b border-border bg-background-secondary/60 px-6 py-3.5 text-xs font-semibold text-foreground-muted md:grid">
                    <span>Risk</span>
                    <span>What could go wrong</span>
                    <span>What stops it</span>
                    <span>Control</span>
                </div>
                <ul className="divide-y divide-border">
                    {risks.map((r) => (
                        <li key={r.risk} className="grid gap-x-6 gap-y-2 px-6 py-5 md:grid-cols-[13rem_minmax(0,1fr)_minmax(0,1.2fr)_6rem] md:items-start">
                            <h3 className="text-[15px] font-bold tracking-tight text-foreground">{r.risk}</h3>
                            <p className="text-sm leading-relaxed text-foreground-secondary">{r.scenario}</p>
                            <p className="text-sm leading-relaxed text-foreground">{r.control}</p>
                            <span className={`w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${KIND_STYLE[r.kind]}`}>{r.kind}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
