import type { ReactNode } from 'react';
import CaseIcon from './CaseIcon';
import { AgentNode, MiniDoc, Pipeline, SceneShell, d, pop } from './CaseArt';
import type { CaseStudyProduct, ProductScene } from '@/data/case-studies';

/**
 * A product's animated scene, drawn from its `scene` data: inputs flow into
 * the product's AI agents and come out as a note, a record list, a chart, a
 * conversation or a brief. One renderer, five very different pictures.
 * Illustrations only: every label is fictional demo content.
 */

type Output = ProductScene['output'];

function OutputCard({ output }: { output: Output }) {
    const rows = output.rows;
    let body: ReactNode;

    switch (output.kind) {
        case 'note':
            body = (
                <div className="mt-3 space-y-2">
                    {rows.map((r, i) => (
                        <div key={i} className={`flex items-baseline gap-2 text-xs ${pop}`} style={d(1.4 + i * 0.4)}>
                            {r.label && <span className="w-4 shrink-0 font-bold text-accent">{r.label}</span>}
                            <span className="text-foreground-secondary">{r.text}</span>
                        </div>
                    ))}
                </div>
            );
            break;
        case 'records':
            body = (
                <div className="mt-3 space-y-2">
                    {rows.map((r, i) => (
                        <div key={i} className={`flex items-center justify-between gap-3 rounded-md bg-background-secondary/70 px-2.5 py-1.5 text-xs ${pop}`} style={d(1.4 + i * 0.35)}>
                            <span className="min-w-0 truncate text-foreground-secondary">{r.text}</span>
                            {r.value && <span className="shrink-0 font-semibold text-accent">{r.value}</span>}
                        </div>
                    ))}
                </div>
            );
            break;
        case 'chart':
            body = (
                <div className="mt-3 space-y-2.5">
                    {rows.map((r, i) => {
                        const w = Math.max(18, 100 - i * 24);
                        return (
                            <div key={i} className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-2 text-xs">
                                <span className="truncate text-foreground-secondary">{r.text}</span>
                                <span className="h-2 rounded-full bg-border">
                                    <span className="block h-full origin-left rounded-full bg-accent motion-safe:animate-fill-line" style={{ width: `${w}%`, animationDelay: `${1.4 + i * 0.3}s` }} />
                                </span>
                                {r.value && <span className="font-semibold text-foreground">{r.value}</span>}
                            </div>
                        );
                    })}
                </div>
            );
            break;
        case 'chat':
            body = (
                <div className="mt-3 space-y-2">
                    {rows.map((r, i) => {
                        const agent = r.label === 'agent';
                        return (
                            <div key={i} className={`flex ${agent ? 'justify-end' : 'justify-start'} ${pop}`} style={d(1.3 + i * 0.6)}>
                                <span
                                    className={`max-w-[88%] rounded-2xl px-3 py-1.5 text-xs leading-snug text-foreground ${agent ? 'rounded-tr-sm bg-accent/15' : 'rounded-tl-sm border border-border bg-background-secondary'}`}
                                >
                                    {r.text}
                                </span>
                            </div>
                        );
                    })}
                </div>
            );
            break;
        case 'brief':
            body = (
                <ol className="mt-3 space-y-1.5">
                    {rows.map((r, i) => (
                        <li key={i} className={`flex items-center justify-between gap-3 rounded-md bg-background-secondary/70 px-2.5 py-1.5 text-xs ${pop}`} style={d(1.4 + i * 0.45)}>
                            <span className="text-foreground-secondary">
                                {i + 1}. {r.text}
                            </span>
                            {r.value && <span className="shrink-0 font-bold text-accent">{r.value}</span>}
                        </li>
                    ))}
                </ol>
            );
            break;
    }

    return (
        <div className={`rounded-xl border border-border bg-background-card p-3.5 shadow-card ${pop}`} style={d(1.2)}>
            <p className="text-xs font-semibold text-foreground">{output.title}</p>
            {body}
            {output.footnote && (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                    <CaseIcon name="review" className="h-3.5 w-3.5" /> {output.footnote}
                </p>
            )}
        </div>
    );
}

export default function ProductScene({ product }: { product: CaseStudyProduct }) {
    const { scene } = product;
    return (
        <SceneShell label={`Illustration: ${product.name}. ${scene.inputLabel} flow through ${product.agents.map((a) => a.name).join(', ')} and come out as ${scene.outputLabel.toLowerCase()}.`}>
            <Pipeline
                inputLabel={scene.inputLabel}
                inputs={scene.inputs.map((x, i) => (
                    <MiniDoc key={x.title} badge={x.badge} title={x.title} delay={0.1 + i * 0.2} />
                ))}
                agents={product.agents.slice(0, 3).map((a, i) => (
                    <AgentNode key={a.name} icon={a.icon} label={a.name} sub={a.status === 'Roadmap' ? `${a.role} · proposed` : a.role} delay={0.4 + i * 0.3} />
                ))}
                outputLabel={scene.outputLabel}
                output={<OutputCard output={scene.output} />}
            />
        </SceneShell>
    );
}
