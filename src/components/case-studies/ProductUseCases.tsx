'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import CaseIcon from './CaseIcon';
import AgentCards from './AgentCards';
import ProductScene from './ProductScenes';
import type { CaseStudyProduct } from '@/data/case-studies';

/**
 * Interactive explorer for a multi-product case study: one tab per product,
 * each with its own animated scene, use case, AI agents and stack. Fully
 * keyboard-navigable (WAI-ARIA tabs). Switching tabs replays the scene.
 */
export default function ProductUseCases({ products, heading, intro }: { products: CaseStudyProduct[]; heading?: string; intro?: string }) {
    const [active, setActive] = useState(0);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const baseId = useId();
    const product = products[active];

    const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        const last = products.length - 1;
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
        <div>
            <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:col-span-5">{heading ?? 'Five products, five use cases'}</h2>
                {intro && <p className="text-lg leading-relaxed text-foreground-secondary lg:col-span-7">{intro}</p>}
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-8">
                <div
                    role="tablist"
                    aria-label="Products"
                    aria-orientation="vertical"
                    className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
                >
                    {products.map((p, i) => {
                        const selected = i === active;
                        return (
                            <button
                                key={p.id}
                                ref={(el) => {
                                    tabRefs.current[i] = el;
                                }}
                                id={`${baseId}-tab-${p.id}`}
                                role="tab"
                                type="button"
                                aria-selected={selected}
                                aria-controls={`${baseId}-panel`}
                                tabIndex={selected ? 0 : -1}
                                onClick={() => setActive(i)}
                                onKeyDown={onKeyDown}
                                className={`group flex min-w-[15rem] shrink-0 items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors duration-200 lg:min-w-0 ${
                                    selected ? 'border-border bg-background-card shadow-card' : 'border-transparent hover:bg-background-card/70'
                                }`}
                            >
                                <span
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                        selected ? 'bg-accent-gradient text-white' : 'bg-accent/10 text-accent'
                                    }`}
                                >
                                    <CaseIcon name={p.icon} className="h-5 w-5" />
                                </span>
                                <span className="min-w-0">
                                    <span className={`block text-[15px] font-semibold leading-tight ${selected ? 'text-foreground' : 'text-foreground-secondary group-hover:text-foreground'}`}>{p.name}</span>
                                    <span className="mt-0.5 block text-sm leading-snug text-foreground-muted">{p.slogan}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${product.id}`} className="min-w-0">
                    {/* Keyed so the scene replays on every switch */}
                    <div key={product.id}>
                        <ProductScene product={product} />
                        <p className="mt-2.5 text-xs text-foreground-muted">Illustration of the use case with fictional demo content. Agents marked Roadmap are planned for the next phase and are not shipped yet.</p>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="text-sm font-semibold text-foreground-muted">Who uses it</h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-foreground-secondary">{product.persona}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-foreground-muted">The problem</h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-foreground-secondary">{product.problem}</p>
                        </div>
                    </div>
                    <div className="mt-6 rounded-2xl border border-border bg-background-card p-6">
                        <h3 className="text-lg font-bold tracking-tight text-foreground">What we built</h3>
                        <p className="mt-2 leading-relaxed text-foreground-secondary">{product.solution}</p>
                        <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                            {product.capabilities.map((c) => (
                                <li key={c} className="flex gap-2.5 text-[15px] leading-snug text-foreground-secondary">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <h3 className="mb-4 mt-8 text-lg font-bold tracking-tight text-foreground">The AI agents inside</h3>
                    <AgentCards agents={product.agents} compact />

                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology">
                        {product.stack.map((t) => (
                            <li key={t} className="rounded-full border border-border bg-background-secondary px-3 py-1.5 text-xs font-medium text-foreground-secondary">
                                {t}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
