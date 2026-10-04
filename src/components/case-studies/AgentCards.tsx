import CaseIcon from './CaseIcon';
import { CLINIZY_GREEN_TEXT } from '../ClinizyLogo';
import type { CaseStudyAgent } from '@/data/case-studies';

function StatusBadge({ status }: { status: NonNullable<CaseStudyAgent['status']> }) {
    const live = status === 'Live';
    const early = status === 'Early access';
    return (
        <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                live ? CLINIZY_GREEN_TEXT : early ? 'border-accent/30 bg-accent/10 text-accent' : 'border-border text-foreground-muted'
            }`}
            style={live ? { borderColor: 'rgba(26,107,60,0.35)', backgroundColor: 'rgba(26,107,60,0.08)' } : undefined}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-[#1A6B3C] dark:bg-[#2E9B59]' : early ? 'bg-accent' : 'bg-foreground-muted/60'}`} aria-hidden="true" />
            {status}
        </span>
    );
}

/**
 * The AI agents (or AI pipeline stages) behind a case study. Each card says
 * what the agent does and the control that keeps it safe, because that second
 * line is what a buyer of AI agents actually needs to see.
 */
export default function AgentCards({ agents, className = '', compact = false }: { agents: CaseStudyAgent[]; className?: string; compact?: boolean }) {
    // Compact: two columns at most, for use inside a narrower panel.
    const cols = compact ? 'md:grid-cols-2' : `sm:grid-cols-2 ${agents.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`;
    return (
        <ul className={`grid gap-4 ${cols} ${className}`}>
            {agents.map((agent) => (
                <li
                    key={agent.name}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background-card p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover"
                >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                    <div className="flex items-start justify-between gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-gradient text-white">
                            <CaseIcon name={agent.icon} className="h-5 w-5" />
                        </span>
                        <span className="flex flex-wrap justify-end gap-1.5">
                            {agent.kind && (
                                <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold text-foreground-secondary">{agent.kind}</span>
                            )}
                            {agent.status && <StatusBadge status={agent.status} />}
                        </span>
                    </div>
                    <h3 className="mt-5 flex flex-wrap items-baseline gap-x-2 text-lg font-bold tracking-tight text-foreground">
                        {agent.nameHi && (
                            <span lang="hi" className="text-accent">
                                {agent.nameHi}
                            </span>
                        )}
                        {agent.name}
                    </h3>
                    <p className="text-sm font-medium text-foreground-muted">{agent.role}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-foreground-secondary">{agent.does}</p>
                    <div className="mt-auto pt-5">
                        <p className="flex gap-2 border-t border-border pt-4 text-sm leading-snug text-foreground-secondary">
                            <CaseIcon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>
                                <span className="font-semibold text-foreground">Safeguard: </span>
                                {agent.safeguard}
                            </span>
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}
