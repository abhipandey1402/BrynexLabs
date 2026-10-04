import Image from 'next/image';
import type { ReactNode } from 'react';
import CaseIcon, { type CaseIconKey } from './CaseIcon';
import { CLINIZY } from '@/data/products';
import type { CaseStudy } from '@/data/case-studies';

/**
 * Hero artwork for case studies, drawn in code: crisp at any size, themed by
 * the Brynex tokens (light and dark), animated only for people who haven't
 * asked for reduced motion. Every scene is an illustration of how the AI
 * works, never a screenshot, and uses fictional labels only.
 */

export const pop = 'motion-safe:animate-pop-in';
export const d = (s: number) => ({ animationDelay: `${s}s` });

/* ---------------------------- shared pieces ---------------------------- */

export function SceneShell({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
    return (
        <div role="img" aria-label={label} className={`relative overflow-hidden rounded-3xl border border-border bg-background-secondary/70 p-4 sm:p-6 md:p-8 ${className}`}>
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_0%,rgba(var(--accent-rgb),0.16),transparent_72%)]" />
                <div
                    className="absolute inset-0 opacity-[0.04] invert dark:invert-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
                        backgroundSize: '44px 44px',
                    }}
                />
            </div>
            <div className="relative">{children}</div>
        </div>
    );
}

/** An arrow of light between columns: horizontal on desktop, vertical when stacked. */
export function Flow({ delay = 0 }: { delay?: number }) {
    const dot = 'absolute h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)]';
    return (
        <div className="flex items-center justify-center" aria-hidden="true">
            <span className="relative hidden h-px w-10 bg-border md:block lg:w-14">
                <span className={`${dot} top-1/2 -translate-x-1/2 -translate-y-1/2 motion-safe:animate-flow`} style={d(delay)} />
            </span>
            <span className="relative block h-8 w-px bg-border md:hidden">
                <span className={`${dot} left-1/2 -translate-x-1/2 -translate-y-1/2 motion-safe:animate-flow-y`} style={d(delay)} />
            </span>
        </div>
    );
}

export function Column({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
    return (
        <div className={`min-w-0 ${className}`}>
            <p className="mb-2.5 text-xs font-semibold text-foreground-muted">{label}</p>
            <div className="space-y-2.5">{children}</div>
        </div>
    );
}

export function MiniDoc({ badge, title, delay }: { badge: string; title: string; delay: number }) {
    return (
        <div className={`flex items-center gap-2.5 rounded-lg border border-border bg-background-card px-3 py-2.5 shadow-card ${pop}`} style={d(delay)}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">{badge}</span>
            <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold text-foreground">{title}</span>
                <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-border" />
            </span>
        </div>
    );
}

export function AgentNode({ icon, label, sub, delay }: { icon: CaseIconKey; label: string; sub: string; delay: number }) {
    return (
        <div className={`flex items-center gap-3 rounded-xl border border-accent/30 bg-background-card p-3 shadow-card ${pop}`} style={d(delay)}>
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-gradient text-white">
                <span className="absolute -inset-0.5 rounded-xl ring-2 ring-accent/40 motion-safe:animate-sheen" />
                <CaseIcon name={icon} className="relative h-5 w-5" />
            </span>
            <span className="min-w-0">
                <span className="block text-sm font-semibold leading-tight text-foreground">{label}</span>
                <span className="block text-xs text-foreground-muted">{sub}</span>
            </span>
        </div>
    );
}

export function Pipeline({ inputLabel, inputs, agents, outputLabel, output }: { inputLabel: string; inputs: ReactNode; agents: ReactNode; outputLabel: string; output: ReactNode }) {
    return (
        <div className="grid items-center gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.1fr)_auto_minmax(0,1.2fr)]">
            <Column label={inputLabel}>{inputs}</Column>
            <Flow />
            <Column label="AI agents">{agents}</Column>
            <Flow delay={1.1} />
            <Column label={outputLabel}>{output}</Column>
        </div>
    );
}

/* ------------------------------- hiring -------------------------------- */

function HiringScene() {
    const rows = [
        { w: '92%', first: true },
        { w: '74%' },
        { w: '58%' },
    ];
    return (
        <Pipeline
            inputLabel="Applications"
            inputs={
                <>
                    <MiniDoc badge="A" title="Resume · backend role" delay={0.1} />
                    <MiniDoc badge="B" title="Resume · product role" delay={0.3} />
                    <MiniDoc badge="C" title="Resume · data role" delay={0.5} />
                </>
            }
            agents={
                <>
                    <AgentNode icon="file-search" label="Screening agent" sub="Reads every resume" delay={0.4} />
                    <AgentNode icon="network" label="Matching agent" sub="Semantic fit" delay={0.7} />
                    <AgentNode icon="message" label="Interview agent" sub="Scored first round" delay={1.0} />
                </>
            }
            outputLabel="Recruiter's view"
            output={
                <div className={`rounded-xl border border-border bg-background-card p-3.5 shadow-card ${pop}`} style={d(1.2)}>
                    <p className="text-xs font-semibold text-foreground">Ranked shortlist · evidence attached</p>
                    <div className="mt-3 space-y-2.5">
                        {rows.map((r, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                <span className="h-6 w-6 shrink-0 rounded-full bg-accent/15" />
                                <span className="h-2 flex-1 rounded-full bg-border">
                                    <span className="block h-full origin-left rounded-full bg-accent motion-safe:animate-fill-line" style={{ width: r.w, animationDelay: `${1.4 + i * 0.3}s` }} />
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                        <CaseIcon name="review" className="h-3.5 w-3.5" /> Recruiter decides
                    </p>
                </div>
            }
        />
    );
}

/* -------------------------------- exam --------------------------------- */

function ExamScene() {
    const topics = [0.9, 0.35, 0.65, 0.2, 0.8, 0.5];
    return (
        <Pipeline
            inputLabel="Source material"
            inputs={
                <>
                    <MiniDoc badge="PDF" title="Syllabus & notes" delay={0.1} />
                    <MiniDoc badge="Q" title="Past papers" delay={0.3} />
                    <MiniDoc badge="T" title="Topic outline" delay={0.5} />
                </>
            }
            agents={
                <>
                    <AgentNode icon="sparkles" label="Generation agent" sub="Exam-style questions" delay={0.4} />
                    <AgentNode icon="shield" label="Validation" sub="Consistent & trustworthy" delay={0.7} />
                    <AgentNode icon="layers" label="Mock assembly" sub="A full paper" delay={1.0} />
                </>
            }
            outputLabel="Learner's mock"
            output={
                <div className={`rounded-xl border border-border bg-background-card p-3.5 shadow-card ${pop}`} style={d(1.2)}>
                    <p className="text-xs font-semibold text-foreground">Mock exam · instant feedback</p>
                    <div className="mt-3 space-y-2">
                        {[0, 1, 2].map((q) => (
                            <div key={q} className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-foreground-muted">Q{q + 1}</span>
                                <span className="h-1.5 flex-1 rounded-full bg-border" />
                                <span className="flex gap-1">
                                    {[0, 1, 2, 3].map((o) => (
                                        <span key={o} className={`h-2.5 w-2.5 rounded-full border ${o === q + 1 ? 'border-accent bg-accent' : 'border-border'}`} />
                                    ))}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-3 text-[11px] font-semibold text-foreground-muted">Topic-level feedback</p>
                    <div className="mt-1.5 grid grid-cols-6 gap-1">
                        {topics.map((t, i) => (
                            <span key={i} className={`h-5 rounded ${pop}`} style={{ backgroundColor: `rgba(var(--accent-rgb), ${0.15 + t * 0.75})`, ...d(1.6 + i * 0.12) }} />
                        ))}
                    </div>
                </div>
            }
        />
    );
}

/* ------------------------------ hub (ring) ----------------------------- */

export interface HubNode {
    label: string;
    sub?: string;
    icon: CaseIconKey;
    /** Devanagari name, shown before the English label. */
    hi?: string;
    status?: 'Live' | 'Early access' | 'Roadmap';
}

/**
 * A hub-and-spoke ring: a central product with its AI agents around it.
 * Desktop positions the nodes on an ellipse with drifting dashed spokes;
 * on small screens it falls back to a plain two-column grid.
 */
export function HubScene({ nodes, center, legend = true }: { nodes: HubNode[]; center: ReactNode; legend?: boolean }) {
    const n = nodes.length;
    const pts = nodes.map((_, i) => {
        const a = (-90 + (360 / n) * i) * (Math.PI / 180);
        return { x: 50 + 36 * Math.cos(a), y: 50 + 38 * Math.sin(a) };
    });
    const hasStatus = nodes.some((x) => x.status);

    return (
        <div>
            {/* Desktop ring */}
            <div className="relative mx-auto hidden h-[380px] w-full max-w-[700px] sm:block">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    {pts.map((p, i) => (
                        <line
                            key={i}
                            x1="50"
                            y1="50"
                            x2={p.x}
                            y2={p.y}
                            stroke="rgb(var(--accent-rgb))"
                            strokeOpacity="0.45"
                            strokeWidth="1.5"
                            strokeDasharray="4 6"
                            vectorEffect="non-scaling-stroke"
                            className="bx-dash"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    ))}
                </svg>
                <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/40 bg-background-card shadow-card">
                    <span className="absolute -inset-2 rounded-full border border-accent/25 motion-safe:animate-glow-pulse" />
                    {center}
                </div>
                {nodes.map((node, i) => (
                    <div key={node.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pts[i].x}%`, top: `${pts[i].y}%` }}>
                        <HubChip node={node} delay={0.15 + i * 0.12} />
                    </div>
                ))}
            </div>

            {/* Mobile grid */}
            <div className="sm:hidden">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-accent/40 bg-background-card shadow-card">{center}</div>
                <div className="grid grid-cols-2 gap-2.5">
                    {nodes.map((node, i) => (
                        <HubChip key={node.label} node={node} delay={0.1 + i * 0.1} />
                    ))}
                </div>
            </div>

            {legend && hasStatus && (
                <p className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-foreground-muted">
                    <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-accent" /> Early access
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full border border-foreground-muted" /> Roadmap
                    </span>
                </p>
            )}
        </div>
    );
}

function HubChip({ node, delay }: { node: HubNode; delay: number }) {
    const early = node.status === 'Early access';
    return (
        <div className={`flex min-w-[9.5rem] items-center gap-2.5 rounded-xl border bg-background-card px-3 py-2 shadow-card ${early ? 'border-accent/50' : 'border-border'} ${pop}`} style={d(delay)}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-gradient text-white">
                <CaseIcon name={node.icon} className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-1.5">
                    {node.hi && (
                        <span lang="hi" className="text-sm font-semibold text-accent">
                            {node.hi}
                        </span>
                    )}
                    <span className="truncate text-sm font-semibold text-foreground">{node.label}</span>
                </span>
                {node.sub && <span className="block truncate text-[11px] text-foreground-muted">{node.sub}</span>}
            </span>
            {node.status && <span className={`h-2 w-2 shrink-0 rounded-full ${early ? 'bg-accent' : 'border border-foreground-muted'}`} aria-hidden="true" />}
        </div>
    );
}

/* ------------------------------- clinic -------------------------------- */

function ClinicScene({ study }: { study: CaseStudy }) {
    const nodes: HubNode[] = (study.agents ?? []).map((a) => ({
        label: a.name,
        hi: a.nameHi,
        sub: a.role,
        icon: a.icon,
        status: a.status,
    }));
    return (
        <HubScene
            nodes={nodes}
            center={<Image src={CLINIZY.symbol.src} alt="" width={CLINIZY.symbol.width} height={CLINIZY.symbol.height} sizes="64px" className="relative h-14 w-14 object-contain" />}
        />
    );
}

/* -------------------------------- suite -------------------------------- */

function SuiteScene({ study }: { study: CaseStudy }) {
    const nodes: HubNode[] = (study.products ?? []).map((p) => ({ label: p.name, sub: p.slogan, icon: p.icon }));
    return <HubScene nodes={nodes} center={<CaseIcon name="cpu" className="relative h-9 w-9 text-accent" strokeWidth={1.6} />} legend={false} />;
}

/* -------------------------------- entry -------------------------------- */

export const SCENE_LABEL: Record<CaseStudy['art'], string> = {
    hiring: 'Illustration: resumes flow through screening, matching and interview agents into a ranked shortlist that a recruiter reviews.',
    exam: 'Illustration: source material flows through generation, validation and assembly into a mock exam with topic-level feedback.',
    clinic: 'Illustration: Clinizy Care at the centre of six AI agents: Bol, Saathi, Awaz, Nazar, Buddhi and Setu.',
    suite: 'Illustration: the five products that make up the platform.',
};

export default function CaseArt({ study, className = '' }: { study: CaseStudy; className?: string }) {
    const label = SCENE_LABEL[study.art];

    // A raster hero (e.g. a generated image) takes over when one is supplied.
    if (study.heroImage) {
        return (
            <div className={`relative overflow-hidden rounded-3xl border border-border ${className}`}>
                <Image src={study.heroImage} alt={label} width={1600} height={900} priority sizes="(min-width: 1024px) 64rem, 100vw" className="block h-auto w-full" />
            </div>
        );
    }

    return (
        <SceneShell label={label} className={className}>
            {study.art === 'hiring' && <HiringScene />}
            {study.art === 'exam' && <ExamScene />}
            {study.art === 'clinic' && <ClinicScene study={study} />}
            {study.art === 'suite' && <SuiteScene study={study} />}
        </SceneShell>
    );
}
