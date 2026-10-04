import Link from 'next/link';
import SectionWrapper from '../SectionWrapper';
import Breadcrumbs from '../Breadcrumbs';
import PageHeroBackdrop from '../PageHeroBackdrop';
import StartProjectButton from '../StartProjectButton';
import { BrowserFrame } from '../DeviceFrame';
import CaseArt, { SCENE_LABEL } from './CaseArt';
import CaseIcon from './CaseIcon';
import CaseThumb from './CaseThumb';
import AgentCards from './AgentCards';
import ProductUseCases from './ProductUseCases';
import ArchitectureStack from './ArchitectureStack';
import CaseFaq from './CaseFaq';
import { CaseTocMobile, CaseTocRail, ReadingProgress, type TocItem } from './CaseToc';
import BlueprintDeepDive, { blueprintSections } from './blueprint/BlueprintDeepDive';
import StorySection, { slugify } from './StorySection';
import type { CaseStudy } from '@/data/case-studies';
import { services } from '@/data/services';

const KIND_LABEL: Record<CaseStudy['kind'], string> = {
    client: 'Client build',
    'in-house': 'Our own product',
    platform: 'Platform roadmap',
};

const PARTNER_POINTS = [
    { icon: 'bot' as const, title: 'Agents built for production', body: 'Evals, guardrails and observability ship with every agent, so it keeps working after launch.' },
    { icon: 'stethoscope' as const, title: 'A team that runs a live AI product', body: 'Clinizy Care is ours. We know what breaks in production because we carry the pager.' },
    { icon: 'layers' as const, title: 'Full-stack ownership', body: 'App, API, AI and cloud from one senior team, with no hand-offs between vendors.' },
    { icon: 'shield' as const, title: 'You own everything', body: '100% code and IP ownership, fixed-scope milestones and weekly demos.' },
];

const fmtDate = (iso?: string) => (iso ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(iso)) : null);

/** Rough reading time from every visible block of prose on the page. */
function readingMinutes(study: CaseStudy): number {
    const parts: string[] = [study.summary];
    study.takeaways?.forEach((t) => parts.push(t.text));
    study.sections.forEach((s) => parts.push(...s.paragraphs, ...(s.bullets ?? [])));
    study.agents?.forEach((a) => parts.push(a.does, a.safeguard));
    study.products?.forEach((p) => parts.push(p.problem, p.solution, ...p.agents.flatMap((a) => [a.does, a.safeguard])));
    study.lessons?.forEach((l) => parts.push(l.body));
    study.faqs?.forEach((f) => parts.push(f.q, f.a));
    study.engagement.forEach((e) => parts.push(e.body));
    const bp = study.blueprint;
    if (bp) {
        parts.push(bp.roadmapIntro, bp.flowIntro, bp.autonomyIntro, bp.evalIntro, bp.riskIntro);
        bp.flow.forEach((f) => parts.push(f.detail));
        bp.autonomy.forEach((a) => parts.push(a.note));
        bp.evalLoop.forEach((e) => parts.push(e.detail));
        bp.risks.forEach((r) => parts.push(r.scenario, r.control));
        bp.narrative.forEach((n) => parts.push(...n.paragraphs, ...(n.bullets ?? [])));
    }
    const words = parts.join(' ').split(/\s+/).filter(Boolean).length;
    return Math.max(3, Math.round(words / 210));
}

const inlineLink = 'font-semibold text-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent';

export default function CaseStudyView({ study, related }: { study: CaseStudy; related: CaseStudy[] }) {
    const relatedServices = study.relatedServices.map((slug) => services.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));

    // "On this page", in document order. Studies with a roadmap put its diagrams after the story.
    const bp = study.blueprint;
    const toc: TocItem[] = [
        ...(study.agents ? [{ id: 'agents', label: 'AI agents' }] : []),
        ...(study.products ? [{ id: 'products', label: 'Products and use cases' }] : []),
        ...(study.architecture ? [{ id: 'architecture', label: study.architectureHeading ?? 'How it fits together' }] : []),
        ...study.sections.map((s) => ({ id: slugify(s.heading), label: s.heading })),
        { id: 'engagement', label: study.engagementHeading ?? 'How we worked' },
        { id: 'stack', label: study.stackHeading ?? 'Technology' },
        ...(bp ? blueprintSections(bp) : []),
        ...(study.lessons ? [{ id: 'lessons', label: 'Lessons you can reuse' }] : []),
        ...(study.faqs ? [{ id: 'faq', label: 'Questions' }] : []),
    ];

    const published = fmtDate(study.publishedAt);
    const updated = study.updatedAt && study.updatedAt !== study.publishedAt ? fmtDate(study.updatedAt) : null;
    const minutes = readingMinutes(study);

    return (
        <div className="pb-8">
            <ReadingProgress targetId="story" />

            {/* Hero */}
            <SectionWrapper animate={false} className="relative overflow-hidden !pt-32 md:!pt-40 !pb-10">
                <PageHeroBackdrop />
                <div className="relative z-10">
                    <Breadcrumbs className="mb-10" items={[{ label: 'Home', href: '/' }, { label: 'Case studies', href: '/case-studies' }, { label: study.clientName }]} />
                    <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
                        <div className="lg:col-span-7">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                                    {study.kicker}
                                </span>
                                <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground-secondary">{KIND_LABEL[study.kind]}</span>
                            </div>
                            <h1 className="mt-6 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">{study.title}</h1>
                            <p className="mt-6 text-lg leading-relaxed text-foreground-secondary md:text-xl">{study.summary}</p>
                            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground-muted">
                                {published && <span>Published {published}</span>}
                                {updated && <span>Updated {updated}</span>}
                                <span>{minutes} min read</span>
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <StartProjectButton source={`Case study hero: ${study.slug}`} />
                                <a
                                    href={study.agents ? '#agents' : study.products ? '#products' : '#results'}
                                    className="px-2 py-3 text-lg font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                                >
                                    {study.agents ? 'Meet the AI agents' : study.products ? 'See the five use cases' : 'See the results'}
                                </a>
                            </div>
                        </div>

                        <aside aria-label="Project snapshot" className="rounded-2xl border border-border bg-background-card/90 p-6 shadow-card backdrop-blur lg:col-span-5">
                            <p className="text-sm font-semibold text-foreground-muted">Snapshot</p>
                            <dl className="mt-3 divide-y divide-border">
                                {study.snapshot.map((row) => (
                                    <div key={row.label} className="py-3.5">
                                        <dt className="text-xs text-foreground-muted">{row.label}</dt>
                                        <dd className="mt-1 text-[15px] font-semibold leading-snug text-foreground">{row.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </aside>
                    </div>

                    <figure className="mt-12">
                        <CaseArt study={study} />
                        <figcaption className="mt-3 text-sm text-foreground-muted">{SCENE_LABEL[study.art]}</figcaption>
                    </figure>
                </div>
            </SectionWrapper>

            {/* Key takeaways */}
            {study.takeaways && (
                <SectionWrapper animate={false} ariaLabel="Key takeaways" className="!py-6">
                    <h2 className="sr-only">Key takeaways</h2>
                    <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
                        {study.takeaways.map((t) => (
                            <div key={t.label} className="bg-background-card p-6">
                                <dt className="text-sm font-bold text-accent">{t.label}</dt>
                                <dd className="mt-2 text-[15px] leading-relaxed text-foreground-secondary">{t.text}</dd>
                            </div>
                        ))}
                    </dl>
                </SectionWrapper>
            )}

            {/* Results */}
            <SectionWrapper animate={false} id="results" ariaLabel="Results" className="scroll-mt-24 !py-10 md:!py-14">
                <h2 className="sr-only">Results</h2>
                <ul className={`grid grid-cols-2 gap-x-6 gap-y-10 ${study.results.length > 4 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
                    {study.results.map((r) => (
                        <li key={r.label} className="border-t-2 border-accent/60 pt-5">
                            <p className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{r.value}</p>
                            <p className="mt-2 text-sm font-semibold text-foreground">{r.label}</p>
                            {r.context && <p className="mt-1 text-sm text-foreground-muted">{r.context}</p>}
                        </li>
                    ))}
                </ul>
            </SectionWrapper>

            {/* AI agents */}
            {study.agents && (
                <SectionWrapper animate={false} id="agents" ariaLabel="AI agents" className="scroll-mt-24 border-y border-border bg-background-secondary/50">
                    <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-start">
                        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:col-span-5">{study.agentsHeading ?? 'The AI agents'}</h2>
                        {study.agentsIntro && <p className="text-lg leading-relaxed text-foreground-secondary lg:col-span-7">{study.agentsIntro}</p>}
                    </div>
                    <AgentCards agents={study.agents} />
                </SectionWrapper>
            )}

            {/* Real product screen (demo data) */}
            {study.heroShot && (
                <SectionWrapper animate={false} ariaLabel="The product" className="!pb-4">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">The product, in production</h2>
                    <p className="mt-3 max-w-2xl text-lg text-foreground-secondary">A real screen from Clinizy Care, shown with demo data.</p>
                    <div className="mt-8 rounded-3xl border border-border bg-background-secondary/60 p-3 sm:p-6">
                        <BrowserFrame shot={study.heroShot} address={study.heroShot.address} sizes="(min-width: 1024px) 64rem, 100vw" />
                    </div>
                </SectionWrapper>
            )}

            {/* Multi-product use cases */}
            {study.products && (
                <SectionWrapper animate={false} id="products" ariaLabel="Products and use cases" className="scroll-mt-24 border-y border-border bg-background-secondary/50">
                    <ProductUseCases products={study.products} heading={study.productsHeading} intro={study.productsIntro} />
                </SectionWrapper>
            )}

            {/* How it fits together */}
            {study.architecture && (
                <SectionWrapper animate={false} id="architecture" ariaLabel="Architecture" className="scroll-mt-24">
                    <div className="mb-10 grid gap-5 lg:grid-cols-12 lg:items-start">
                        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:col-span-5">{study.architectureHeading ?? 'How it fits together'}</h2>
                        {study.architectureIntro && <p className="text-lg leading-relaxed text-foreground-secondary lg:col-span-7">{study.architectureIntro}</p>}
                    </div>
                    <ArchitectureStack layers={study.architecture} />
                </SectionWrapper>
            )}

            {/* Story, with an "on this page" rail */}
            <SectionWrapper animate={false} id="story" ariaLabel="The story">
                <div className="grid gap-12 lg:grid-cols-12">
                    <aside className="hidden lg:col-span-3 lg:block">
                        <CaseTocRail items={toc} />
                    </aside>

                    <div className="lg:col-span-9">
                        <CaseTocMobile items={toc} />

                        <div className="space-y-16">
                            {study.sections.map((section) => (
                                <StorySection key={section.heading} section={section} />
                            ))}

                            {/* Engagement */}
                            <section id="engagement" className="scroll-mt-28">
                                <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">{study.engagementHeading ?? 'How we worked'}</h2>
                                <ol className="mt-8 space-y-0">
                                    {study.engagement.map((step, i) => (
                                        <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                                            {i < study.engagement.length - 1 && <span className="absolute left-[1.15rem] top-10 h-[calc(100%-1.75rem)] w-px bg-border" aria-hidden="true" />}
                                            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background-card text-sm font-bold text-accent">{i + 1}</span>
                                            <div className="pt-1.5">
                                                <h3 className="text-lg font-bold tracking-tight text-foreground">{step.title}</h3>
                                                <p className="mt-1.5 max-w-2xl leading-relaxed text-foreground-secondary">{step.body}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </section>

                            {/* Tech stack */}
                            <section id="stack" className="scroll-mt-28">
                                <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">{study.stackHeading ?? 'Technology'}</h2>
                                <ul className="mt-6 flex flex-wrap gap-2.5">
                                    {study.techStack.map((tech) => (
                                        <li key={tech.name} className="rounded-full border border-border bg-background-secondary px-4 py-2 text-sm font-medium text-foreground-secondary">
                                            {tech.name}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Lessons */}
                            {study.lessons && !bp && (
                                <section id="lessons" className="scroll-mt-28">
                                    <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">Lessons you can reuse</h2>
                                    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                                        {study.lessons.map((l) => (
                                            <li key={l.title} className="rounded-2xl border border-border bg-background-card p-6 shadow-card">
                                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                                                    <CaseIcon name="idea" className="h-[18px] w-[18px]" />
                                                </span>
                                                <h3 className="mt-4 text-base font-bold tracking-tight text-foreground">{l.title}</h3>
                                                <p className="mt-2 text-[15px] leading-relaxed text-foreground-secondary">{l.body}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Testimonial — only when a real, attributed quote exists */}
                            {study.testimonial && (
                                <figure className="relative rounded-2xl border border-border bg-background-card p-8 shadow-card">
                                    <span className="absolute left-0 top-8 h-12 w-1 rounded-r bg-accent" aria-hidden="true" />
                                    <blockquote className="text-xl leading-relaxed text-foreground">&ldquo;{study.testimonial.quote}&rdquo;</blockquote>
                                    <figcaption className="mt-5 text-sm">
                                        <span className="font-bold text-foreground">{study.testimonial.author}</span>
                                        <span className="text-foreground-muted">, {study.testimonial.role}</span>
                                    </figcaption>
                                </figure>
                            )}

                            {/* FAQ */}
                            {study.faqs && !bp && (
                                <section id="faq" className="scroll-mt-28">
                                    <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">Questions</h2>
                                    <div className="mt-8">
                                        <CaseFaq faqs={study.faqs} />
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* Looking ahead: the roadmap diagrams, then lessons and questions */}
            {bp && <BlueprintDeepDive data={bp} />}
            {bp && study.lessons && (
                <SectionWrapper animate={false} id="lessons" ariaLabel="Lessons you can reuse" className="scroll-mt-24">
                    <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">Lessons you can reuse</h2>
                    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {study.lessons.map((l) => (
                            <li key={l.title} className="rounded-2xl border border-border bg-background-card p-6 shadow-card">
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                                    <CaseIcon name="idea" className="h-[18px] w-[18px]" />
                                </span>
                                <h3 className="mt-4 text-base font-bold tracking-tight text-foreground">{l.title}</h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-foreground-secondary">{l.body}</p>
                            </li>
                        ))}
                    </ul>
                </SectionWrapper>
            )}
            {bp && study.faqs && (
                <SectionWrapper animate={false} id="faq" ariaLabel="Questions" className="scroll-mt-24 border-t border-border">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">Questions</h2>
                        <div className="mt-8">
                            <CaseFaq faqs={study.faqs} />
                        </div>
                    </div>
                </SectionWrapper>
            )}

            {/* Technology partner band */}
            <SectionWrapper animate={false} ariaLabel="Why Brynex Labs" className="border-y border-border bg-background-secondary/50">
                <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">Your AI technology partner</h2>
                        <p className="mt-4 text-lg leading-relaxed text-foreground-secondary">
                            Building with AI agents? Bring us the problem. We design, build and run it with you, and we can show you what we already run ourselves.
                        </p>
                        {relatedServices.length > 0 && (
                            <ul className="mt-6 space-y-2">
                                {relatedServices.map((s) => (
                                    <li key={s.slug}>
                                        <Link href={`/services/${s.slug}`} className={inlineLink}>
                                            {s.shortTitle ?? s.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:col-span-8">
                        {PARTNER_POINTS.map((p) => (
                            <li key={p.title} className="bg-background-card p-7">
                                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                                    <CaseIcon name={p.icon} className="h-5 w-5" />
                                </span>
                                <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">{p.title}</h3>
                                <p className="mt-2 leading-relaxed text-foreground-secondary">{p.body}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </SectionWrapper>

            {/* Related */}
            {related.length > 0 && (
                <SectionWrapper animate={false} ariaLabel="More case studies">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">More case studies</h2>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {related.map((r) => (
                            <Link
                                key={r.slug}
                                href={`/case-studies/${r.slug}`}
                                className="group overflow-hidden rounded-2xl border border-border bg-background-card shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover"
                            >
                                <CaseThumb study={r} />
                                <div className="p-5">
                                    <p className="text-xs font-semibold text-accent">{r.clientName}</p>
                                    <h3 className="mt-2 text-base font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent">{r.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </SectionWrapper>
            )}

            {/* Final CTA */}
            <SectionWrapper animate={false} ariaLabel="Start a project">
                <div className="rounded-[2rem] border border-border bg-background-card px-7 py-14 text-center shadow-card md:px-16">
                    <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">Have an AI product to build?</h2>
                    <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground-secondary">
                        Tell us what you&apos;re building. You&apos;ll talk to the engineers who ship AI agents for a living, and get a fixed-scope proposal before you commit.
                    </p>
                    <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <StartProjectButton source={`Case study footer: ${study.slug}`} />
                        <Link href="/case-studies" className="px-2 py-3 text-lg font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent">
                            All case studies
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
