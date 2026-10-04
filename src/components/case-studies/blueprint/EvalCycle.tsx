import CaseIcon from '../CaseIcon';
import type { EvalStep } from '@/data/blueprint-types';

/**
 * The evaluation loop as a ring: a point of light circles it, and the six
 * stages sit around it. Beside the ring, each stage is explained in order.
 * On narrow screens the ring is dropped and the numbered list carries it.
 */
export default function EvalCycle({ steps }: { steps: EvalStep[] }) {
    const n = steps.length;
    const R = 36;
    const pts = steps.map((_, i) => {
        const a = (-90 + (360 / n) * i) * (Math.PI / 180);
        return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
    });

    return (
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
            <div className="relative mx-auto hidden aspect-square w-full max-w-[560px] md:block" aria-hidden="true">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r={R} fill="none" stroke="rgb(var(--accent-rgb))" strokeOpacity="0.4" strokeWidth="0.5" strokeDasharray="1.6 2.2" className="bx-dash" />
                </svg>
                {/* travelling light */}
                <div className="absolute inset-0 motion-safe:animate-orbit" style={{ animationDuration: '14s' }}>
                    <span
                        className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_rgba(var(--accent-rgb),0.9)]"
                        style={{ top: `${50 - R}%` }}
                    />
                </div>
                <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent/40 bg-background-card text-center shadow-card">
                    <span className="absolute -inset-2 rounded-full border border-accent/25 motion-safe:animate-glow-pulse" />
                    <CaseIcon name="radar" className="relative h-6 w-6 text-accent" />
                    <span className="relative mt-1 text-xs font-bold leading-tight text-foreground">
                        Evaluation
                        <br />
                        loop
                    </span>
                </div>
                {steps.map((s, i) => (
                    <div key={s.title} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pts[i].x}%`, top: `${pts[i].y}%` }}>
                        <div className="flex min-w-[8.5rem] items-center gap-2 rounded-xl border border-border bg-background-card px-2.5 py-2 shadow-card">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-gradient text-xs font-bold text-white">{i + 1}</span>
                            <span className="text-[13px] font-semibold leading-tight text-foreground">{s.title}</span>
                        </div>
                    </div>
                ))}
            </div>

            <ol className="space-y-5">
                {steps.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                            <CaseIcon name={s.icon} className="h-5 w-5" />
                        </span>
                        <div>
                            <h3 className="text-base font-bold tracking-tight text-foreground">
                                <span className="mr-1.5 text-accent">{i + 1}.</span>
                                {s.title}
                            </h3>
                            <p className="mt-1 text-[15px] leading-relaxed text-foreground-secondary">{s.detail}</p>
                        </div>
                    </li>
                ))}
                <li className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-foreground-muted">Then back to step 1, for the life of the product.</li>
            </ol>
        </div>
    );
}
