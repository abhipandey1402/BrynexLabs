import CaseIcon from './CaseIcon';
import type { ArchitectureLayer } from '@/data/case-studies';

/**
 * "How it fits together": the system as horizontal layers, what users touch
 * at the top and where it runs at the bottom, with the AI layer picked out in
 * the accent colour. Light flows down the connectors between layers.
 */
export default function ArchitectureStack({ layers }: { layers: ArchitectureLayer[] }) {
    return (
        <ol className="mx-auto max-w-5xl">
            {layers.map((l, i) => (
                <li key={l.layer}>
                    <div
                        className={`relative grid gap-4 overflow-hidden rounded-2xl border p-5 md:grid-cols-[15rem_minmax(0,1fr)] md:items-center md:gap-6 md:p-6 ${
                            l.highlight ? 'border-accent/40 bg-accent/5 shadow-card' : 'border-border bg-background-card'
                        }`}
                    >
                        {l.highlight && <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-accent/15 blur-2xl motion-safe:animate-sheen" aria-hidden="true" />}
                        <div className="relative flex items-start gap-3.5">
                            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${l.highlight ? 'bg-accent-gradient text-white' : 'bg-accent/10 text-accent'}`}>
                                <CaseIcon name={l.icon} className="h-5 w-5" />
                            </span>
                            <div>
                                <h3 className="text-base font-bold tracking-tight text-foreground">{l.layer}</h3>
                                <p className="text-sm text-foreground-muted">{l.caption}</p>
                            </div>
                        </div>
                        <ul className="relative flex flex-wrap gap-2">
                            {l.items.map((item) => (
                                <li
                                    key={item}
                                    className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                                        l.highlight ? 'border-accent/30 bg-background-card text-foreground' : 'border-border bg-background-secondary/70 text-foreground-secondary'
                                    }`}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {i < layers.length - 1 && (
                        <div className="relative mx-auto h-7 w-px bg-border" aria-hidden="true">
                            <span
                                className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)] motion-safe:animate-flow-y"
                                style={{ animationDelay: `${i * 0.45}s` }}
                            />
                        </div>
                    )}
                </li>
            ))}
        </ol>
    );
}
