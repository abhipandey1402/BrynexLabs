import CaseIcon from '../CaseIcon';
import type { Roadmap, RoadmapStage } from '@/data/blueprint-types';

/** How each stage is drawn. Solid = building or shipping, outlined = still being designed, grey = steady-state. */
const STAGE_STYLE: Record<RoadmapStage, string> = {
    Build: 'bg-accent-dark text-white',
    Harden: 'bg-accent-dark text-white',
    // Tinted stages sit on an opaque card colour so the quarter gridlines never show through the bars.
    Design: 'border border-accent/50 bg-background-card bg-[linear-gradient(rgba(var(--accent-rgb),0.12),rgba(var(--accent-rgb),0.12))] text-accent',
    Pilot: 'bg-background-card bg-[linear-gradient(rgba(var(--accent-rgb),0.45),rgba(var(--accent-rgb),0.45))] text-foreground',
    Rollout: 'bg-accent text-white',
    Operate: 'bg-background-card bg-[linear-gradient(rgba(var(--foreground-muted),0.22),rgba(var(--foreground-muted),0.22))] text-foreground-secondary',
};

const LEGEND: { stage: RoadmapStage; note: string }[] = [
    { stage: 'Build', note: 'Shared layer' },
    { stage: 'Harden', note: 'Evals around what exists' },
    { stage: 'Design', note: 'Scope, tools, eval set' },
    { stage: 'Pilot', note: 'Few customers, review on' },
    { stage: 'Rollout', note: 'Staged, in production' },
    { stage: 'Operate', note: 'Steady state' },
];

/**
 * Eight-quarter swimlane roadmap. Each row is one deliverable; its bar is split
 * into stages. Below it, a chart counts the AI agents in production per quarter,
 * derived from the same data so the two can never disagree.
 */
export default function RoadmapGantt({ roadmap }: { roadmap: Roadmap }) {
    const q = roadmap.quarters;
    const quarters = Array.from({ length: q }, (_, i) => i + 1);
    const cols = `15rem repeat(${q}, minmax(0, 1fr))`;

    // Agents in production by the end of each quarter: baseline plus every agent whose Rollout has begun.
    const agentItems = roadmap.lanes.flatMap((l) => l.items).filter((i) => i.agent);
    const gaQuarter = (item: (typeof agentItems)[number]) => item.segments.find((s) => s.stage === 'Rollout')?.from ?? Infinity;
    const growth = [0, ...quarters].map((qq) => {
        const added = agentItems.filter((a) => gaQuarter(a) <= qq);
        return { q: qq, added: added.length, newThisQuarter: agentItems.filter((a) => gaQuarter(a) === qq).map((a) => a.label.replace(' agent', '')) };
    });
    const max = roadmap.baselineAgents + agentItems.length;

    return (
        <div>
            <ul className="mb-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="Legend">
                {LEGEND.map((l) => (
                    <li key={l.stage} className="flex items-center gap-2 text-xs text-foreground-secondary">
                        <span className={`inline-block h-3.5 w-7 rounded ${STAGE_STYLE[l.stage]}`} aria-hidden="true" />
                        <span>
                            <span className="font-semibold text-foreground">{l.stage}</span> · {l.note}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Phones get a compact strip per deliverable (below); the full swimlane is for wider screens. */}
            <div className="hidden overflow-x-auto rounded-2xl border border-border bg-background-card shadow-card md:block">
                <div className="relative min-w-[900px]">
                    {/* quarter gridlines */}
                    <div className="pointer-events-none absolute inset-y-0 left-[15rem] right-0 grid" style={{ gridTemplateColumns: `repeat(${q}, minmax(0, 1fr))` }} aria-hidden="true">
                        {quarters.map((n) => (
                            <span key={n} className={`border-l ${n === q / 2 + 1 ? 'border-border-hover' : 'border-border'}`} />
                        ))}
                    </div>

                    {/* header */}
                    <div className="relative grid border-b border-border bg-background-secondary/60" style={{ gridTemplateColumns: cols }}>
                        <div className="px-5 py-3 text-xs font-semibold text-foreground-muted">Deliverable</div>
                        <div className="py-1.5 text-center text-[11px] font-semibold text-foreground-muted" style={{ gridColumn: `2 / span ${q / 2}` }}>
                            Year one
                        </div>
                        <div className="py-1.5 text-center text-[11px] font-semibold text-foreground-muted" style={{ gridColumn: `${2 + q / 2} / span ${q / 2}` }}>
                            Year two
                        </div>
                        <div />
                        {quarters.map((n) => (
                            <div key={n} className="pb-2 text-center text-xs font-bold text-foreground">
                                Q{n}
                            </div>
                        ))}
                    </div>

                    {roadmap.lanes.map((lane) => (
                        <div key={lane.name} className="relative border-b border-border last:border-b-0">
                            <div className="flex items-center gap-2.5 bg-background-secondary/40 px-5 py-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-accent">
                                    <CaseIcon name={lane.icon} className="h-3.5 w-3.5" />
                                </span>
                                <span className="text-sm font-bold tracking-tight text-foreground">{lane.name}</span>
                            </div>
                            {lane.items.map((item) => (
                                <div key={item.label} className="grid items-center py-1.5" style={{ gridTemplateColumns: cols }}>
                                    <div className="flex items-center gap-2 px-5 text-[13px] leading-tight text-foreground-secondary">
                                        {item.agent && <span className="shrink-0 rounded bg-accent-gradient px-1.5 py-0.5 text-[9px] font-bold leading-none text-white">AI</span>}
                                        <span>{item.label}</span>
                                    </div>
                                    {item.segments.map((seg, i) => (
                                        <div
                                            key={i}
                                            className={`mx-px flex h-7 items-center justify-center rounded text-[11px] font-semibold ${STAGE_STYLE[seg.stage]}`}
                                            style={{ gridColumn: `${seg.from + 1} / ${seg.to + 2}`, gridRow: 1 }}
                                        >
                                            {seg.stage}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4 md:hidden">
                {roadmap.lanes.map((lane) => (
                    <div key={lane.name} className="overflow-hidden rounded-2xl border border-border bg-background-card shadow-card">
                        <div className="flex items-center gap-2.5 bg-background-secondary/50 px-4 py-2.5">
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-accent">
                                <CaseIcon name={lane.icon} className="h-3.5 w-3.5" />
                            </span>
                            <span className="text-sm font-bold tracking-tight text-foreground">{lane.name}</span>
                        </div>
                        <div className="space-y-4 p-4">
                            <div className="grid grid-cols-8 gap-1 text-center text-[10px] font-semibold text-foreground-muted" aria-hidden="true">
                                {quarters.map((n) => (
                                    <span key={n}>Q{n}</span>
                                ))}
                            </div>
                            {lane.items.map((item) => (
                                <div key={item.label}>
                                    <p className="mb-1.5 flex items-center gap-2 text-[13px] font-semibold leading-tight text-foreground">
                                        {item.agent && <span className="shrink-0 rounded bg-accent-gradient px-1.5 py-0.5 text-[9px] font-bold leading-none text-white">AI</span>}
                                        {item.label}
                                    </p>
                                    <div className="grid grid-cols-8 gap-1">
                                        {quarters.map((n) => {
                                            const seg = item.segments.find((sg) => n >= sg.from && n <= sg.to);
                                            return seg ? (
                                                <span key={n} className={`flex h-7 items-center justify-center rounded text-[10px] font-bold ${STAGE_STYLE[seg.stage]}`} title={`Q${n}: ${seg.stage}`}>
                                                    {seg.stage[0]}
                                                </span>
                                            ) : (
                                                <span key={n} className="h-7 rounded border border-dashed border-border" aria-hidden="true" />
                                            );
                                        })}
                                    </div>
                                    <p className="mt-1.5 text-[11px] text-foreground-muted">{item.segments.map((sg) => `${sg.stage} Q${sg.from}${sg.to > sg.from ? `\u2013Q${sg.to}` : ''}`).join(' \u00b7 ')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* AI agents in production, by quarter */}
            <div className="mt-10 rounded-2xl border border-border bg-background-card p-6 shadow-card md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-bold tracking-tight text-foreground">AI agents in production, by quarter</h3>
                        <p className="mt-1 text-sm text-foreground-muted">Derived from the roadmap above. An agent counts once its rollout begins.</p>
                    </div>
                    <ul className="flex gap-4 text-xs text-foreground-secondary">
                        <li className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-sm bg-foreground-muted/40" /> Live today
                        </li>
                        <li className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-sm bg-accent" /> Added by the plan
                        </li>
                    </ul>
                </div>
                <div className="mt-8 grid items-end gap-2 sm:gap-3" style={{ gridTemplateColumns: `repeat(${q + 1}, minmax(0, 1fr))` }}>
                    {growth.map((g) => (
                        <div key={g.q} className="flex flex-col items-center">
                            <span className="mb-1.5 text-sm font-bold text-foreground">{roadmap.baselineAgents + g.added}</span>
                            <div className="flex w-full max-w-[3.25rem] flex-col justify-end overflow-hidden rounded-t-md" style={{ height: `${max * 14}px` }} aria-hidden="true">
                                {g.added > 0 && <div className="w-full bg-accent-gradient motion-safe:animate-pop-in" style={{ height: `${g.added * 14}px`, animationDelay: `${g.q * 0.07}s` }} />}
                                <div className="w-full bg-foreground-muted/35" style={{ height: `${roadmap.baselineAgents * 14}px` }} />
                            </div>
                            <span className="mt-2 text-xs font-semibold text-foreground-secondary">{g.q === 0 ? 'Today' : `Q${g.q}`}</span>
                            <span className="mt-1 hidden min-h-[2.5rem] text-center text-[10px] leading-tight text-foreground-muted lg:block">
                                {g.newThisQuarter.length > 0 ? `+ ${g.newThisQuarter.join(', ')}` : ''}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
