import CaseIcon from '../CaseIcon';
import type { FlowStep } from '@/data/blueprint-types';

function Chip({ children, tone }: { children: React.ReactNode; tone: 'live' | 'roadmap' | 'human' | 'plain' }) {
    const styles = {
        live: 'border-[#1A6B3C]/35 bg-[#1A6B3C]/10 text-[#1A6B3C] dark:text-[#2E9B59]',
        roadmap: 'border-accent/30 bg-accent/10 text-accent',
        human: 'border-border bg-background-secondary text-foreground',
        plain: 'border-border text-foreground-secondary',
    }[tone];
    return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${styles}`}>{children}</span>;
}

/**
 * One referral's journey through the five products as a vertical route:
 * a token of light travels the line, and each stop says who acts (agent,
 * engine or person) and whether that capability is live or proposed.
 */
export default function ReferralFlow({ steps }: { steps: FlowStep[] }) {
    return (
        <ol className="relative mx-auto max-w-5xl">
            {/* the route */}
            <div className="absolute bottom-6 left-5 top-6 w-px bg-border md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
                <span
                    className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_rgba(var(--accent-rgb),0.9)] motion-safe:animate-flow-y"
                    style={{ animationDuration: '11s' }}
                />
            </div>

            {steps.map((step, i) => {
                const left = i % 2 === 0;
                const tone = step.status === 'Live' ? 'live' : step.status === 'Roadmap' ? 'roadmap' : 'human';
                return (
                    <li key={step.title} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-x-6">
                        {/* node */}
                        <div className="relative z-10 flex justify-center md:col-start-2 md:row-start-1">
                            <span
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background-card ${
                                    step.status === 'Human' ? 'border-foreground-muted text-foreground' : step.status === 'Live' ? 'border-[#1A6B3C] text-[#1A6B3C] dark:border-[#2E9B59] dark:text-[#2E9B59]' : 'border-accent text-accent'
                                }`}
                            >
                                <CaseIcon name={step.icon} className="h-[18px] w-[18px]" />
                            </span>
                        </div>
                        {/* card */}
                        <div className={`rounded-2xl border border-border bg-background-card p-5 shadow-card md:row-start-1 ${left ? 'md:col-start-1 md:text-right' : 'md:col-start-3'}`}>
                            <div className={`flex flex-wrap items-center gap-1.5 ${left ? 'md:justify-end' : ''}`}>
                                <Chip tone={tone}>{step.status}</Chip>
                                <Chip tone="plain">{step.actor}</Chip>
                                <span className="text-xs font-semibold text-foreground-muted">{step.owner}</span>
                            </div>
                            <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground">
                                <span className="mr-2 text-accent">{i + 1}.</span>
                                {step.title}
                            </h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-foreground-secondary">{step.detail}</p>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}
