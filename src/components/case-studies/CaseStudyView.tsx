import Link from 'next/link';
import SectionWrapper from '../SectionWrapper';
import Breadcrumbs from '../Breadcrumbs';
import PageHeroBackdrop from '../PageHeroBackdrop';
import StartProjectButton from '../StartProjectButton';
import { BrowserFrame } from '../DeviceFrame';
import CaseArt from './CaseArt';
import CaseIcon from './CaseIcon';
import CaseThumb from './CaseThumb';
import AgentCards from './AgentCards';
import ProductUseCases from './ProductUseCases';
import type { CaseStudy } from '@/data/case-studies';
import { services } from '@/data/services';

const KIND_LABEL: Record<CaseStudy['kind'], string> = {
    client: 'Client build',
    'in-house': 'Our own product',
    platform: 'Platform blueprint',
};

const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const PARTNER_POINTS = [
    { icon: 'bot' as const, title: 'Agents built for production', body: 'Evals, guardrails and observability ship with every agent, so it keeps working after launch.' },
    { icon: 'stethoscope' as const, title: 'A team that runs a live AI product', body: 'Clinizy Care is ours. We know what breaks in production because we carry the pager.' },
    { icon: 'layers' as const, title: 'Full-stack ownership', body: 'App, API, AI and cloud from one senior team, with no hand-offs between vendors.' },
    { icon: 'shield' as const, title: 'You own everything', body: '100% code and IP ownership, fixed-scope milestones and weekly demos.' },
];


/** Splits "Lead-in: rest of the sentence" so the lead-in can be emphasised. */
function splitLead(text: string, max = 80): { lead: string; rest: string } | null {
    const i = text.indexOf(': ');
    if (i < 6 || i > max) return null;
    const lead = text.slice(0, i);
    if (/[.!?]/.test(lead)) return null;
    return { lead, rest: text.slice(i + 2) };
}

const inlineLink = 'font-semibold text-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent';

export default function CaseStudyView({ study, related }: { study: CaseStudy; related: CaseStudy[] }) {
    const relatedServices = study.relatedServices.map((slug) => services.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));

    const toc = [
        ...(study.agents ? [{ id: 'agents', label: 'AI agents' }] : []),
        ...(study.products ? [{ id: 'products', label: 'Products & use cases' }] : []),
        ...study.sections.map((s) => ({ id: slugify(s.heading), label: s.heading })),
        { id: 'engagement', label: study.engagementHeading ?? 'How we worked' },
        { id: 'stack', label: study.stackHeading ?? 'Technology' },
    ];

    return (
        <div className="pb-8">
            {/* Hero */}
            <SectionWrapper animate={false} className="relative overflow-hidden !pt-32 md:!pt-40 !pb-10">
                <PageHeroBackdrop />
                <div className="relative z-10">
                    <Breadcrumbs className="mb-10" items={[{ label: 'Home', href: '/' }, { label: 'Case studies', href: '/case-studies' }, { label: study.clientName }]} />
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                                {study.kicker}
                            </span>
                            <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground-secondary">{KIND_LABEL[study.kind]}</span>
                        </div>
                        <h1 className="mt-6 text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">{study.title}</h1>
                        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground-secondary md:text-xl">{study.summary}</p>
                        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <StartProjectButton source={`Case study hero: ${study.slug}`} />
                            <a
                                href={study.agents ? '#agents' : study.products ? '#products' : '#results'}
                                className="px-2 py-3 text-lg font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                            >
                                {study.agents ? 'Meet the AI agents' : study.products ? 'See the five use cases' : 'See the results'}
                            </a>
                        </div>
                    </div>
                    <CaseArt study={study} className="mt-12" />
                </div>
            </SectionWrapper>

            {/* Snapshot */}
            <SectionWrapper animate={false} className="!py-4">
                <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
                    {study.snapshot.map((row) => (
                        <div key={row.label} className="bg-background-card p-6">
                            <dt className="text-xs font-semibold text-foreground-muted">{row.label}</dt>
                            <dd className="mt-2 text-base font-semibold leading-snug text-foreground">{row.value}</dd>
                        </div>
                    ))}
                </dl>
            </SectionWrapper>

            {/* Results */}
            <SectionWrapper id="results" ariaLabel="Results" className="!py-10 md:!py-14">
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
                <SectionWrapper id="agents" ariaLabel="AI agents" className="border-y border-border bg-background-secondary/50">
                    <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:col-span-5">{study.agentsHeading ?? 'The AI agents'}</h2>
                        {study.agentsIntro && <p className="text-lg leading-relaxed text-foreground-secondary lg:col-span-7">{study.agentsIntro}</p>}
                    </div>
                    <AgentCards agents={study.agents} />
                </SectionWrapper>
            )}

            {/* Real product screen (demo data) */}
            {study.heroShot && (
                <SectionWrapper ariaLabel="The product" className="!pb-4">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">The product, in production</h2>
                    <p className="mt-3 max-w-2xl text-lg text-foreground-secondary">A real screen from Clinizy Care, shown with demo data.</p>
                    <div className="mt-8 rounded-3xl border border-border bg-background-secondary/60 p-3 sm:p-6">
                        <BrowserFrame shot={study.heroShot} address={study.heroShot.address} sizes="(min-width: 1024px) 64rem, 100vw" />
                    </div>
                </SectionWrapper>
            )}

            {/* Multi-product use cases */}
            {study.products && (
                <SectionWrapper id="products" ariaLabel="Products and use cases" className="border-y border-border bg-background-secondary/50">
                    <ProductUseCases products={study.products} heading={study.productsHeading} intro={study.productsIntro} />
                </SectionWrapper>
            )}

            {/* Story, with an "on this page" rail */}
            <SectionWrapper ariaLabel="The story">
                <div className="grid gap-12 lg:grid-cols-12">
                    <aside className="hidden lg:col-span-3 lg:block">
                        <nav aria-label="On this page" className="sticky top-28">
                            <p className="mb-4 text-sm font-semibold text-foreground">On this page</p>
                            <ul className="space-y-2.5 border-l border-border">
                                {toc.map((item) => (
                                    <li key={item.id}>
                                        <a href={`#${item.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-foreground-secondary transition-colors hover:border-accent hover:text-foreground">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    <div className="space-y-16 lg:col-span-9">
                        {study.sections.map((section) => (
                            <section key={section.heading} id={slugify(section.heading)} className="scroll-mt-28">
                                <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{section.heading}</h2>
                                <div className="mt-5 max-w-3xl space-y-5">
                                    {section.paragraphs.map((para, i) => {
                                        const split = /decisions/i.test(section.heading) ? splitLead(para, 90) : null;
                                        return (
                                            <p key={i} className="text-lg leading-relaxed text-foreground-secondary">
                                                {split ? (
                                                    <>
                                                        <strong className="font-semibold text-foreground">{split.lead}: </strong>
                                                        {split.rest}
                                                    </>
                                                ) : (
                                                    para
                                                )}
                                            </p>
                                        );
                                    })}
                                </div>
                                {section.bullets && section.bullets.length > 0 && (
                                    <ul className="mt-6 max-w-3xl space-y-4">
                                        {section.bullets.map((bullet, i) => {
                                            const split = splitLead(bullet, 60);
                                            return (
                                                <li key={i} className="flex gap-3 text-lg leading-relaxed text-foreground-secondary">
                                                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                                                    <span>
                                                        {split ? (
                                                            <>
                                                                <strong className="font-semibold text-foreground">{split.lead}: </strong>
                                                                {split.rest}
                                                            </>
                                                        ) : (
                                                            bullet
                                                        )}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </section>
                        ))}

                        {/* Engagement */}
                        <section id="engagement" className="scroll-mt-28">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{study.engagementHeading ?? 'How we worked'}</h2>
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
                            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{study.stackHeading ?? 'Technology'}</h2>
                            <ul className="mt-6 flex flex-wrap gap-2.5">
                                {study.techStack.map((tech) => (
                                    <li key={tech.name} className="rounded-full border border-border bg-background-secondary px-4 py-2 text-sm font-medium text-foreground-secondary">
                                        {tech.name}
                                    </li>
                                ))}
                            </ul>
                        </section>

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
                    </div>
                </div>
            </SectionWrapper>

            {/* Technology partner band */}
            <SectionWrapper ariaLabel="Why Brynex Labs" className="border-y border-border bg-background-secondary/50">
                <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Your AI technology partner</h2>
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
                <SectionWrapper ariaLabel="More case studies">
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
            <SectionWrapper ariaLabel="Start a project">
                <div className="rounded-[2rem] border border-border bg-background-card px-7 py-14 text-center shadow-card md:px-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">Have an AI product to build?</h2>
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
