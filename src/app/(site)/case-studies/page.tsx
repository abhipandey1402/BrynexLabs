import { Metadata } from 'next';
import Link from 'next/link';
import SectionWrapper from '@/components/SectionWrapper';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeroBackdrop from '@/components/PageHeroBackdrop';
import StartProjectButton from '@/components/StartProjectButton';
import CaseThumb from '@/components/case-studies/CaseThumb';
import CaseIcon from '@/components/case-studies/CaseIcon';
import { caseStudies, type CaseStudy } from '@/data/case-studies';
import { getBreadcrumbJsonLd, getItemListJsonLd, getWebPageJsonLd } from '@/lib/seo';

const TITLE = 'Case Studies: AI Agents & SaaS Platforms | Brynex Labs';
const DESCRIPTION =
    'How Brynex Labs builds AI agents and SaaS platforms: a healthcare AI platform blueprint, an AI hiring ATS, an exam-prep engine, and our own Clinizy Care.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/case-studies' },
    openGraph: { title: TITLE, description: DESCRIPTION, url: '/case-studies' },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const KIND_LABEL: Record<CaseStudy['kind'], string> = {
    client: 'Client build',
    'in-house': 'Our own product',
    platform: 'Platform blueprint',
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        getWebPageJsonLd({ type: 'CollectionPage', name: TITLE, description: DESCRIPTION, path: '/case-studies' }),
        getItemListJsonLd(caseStudies.map((c) => ({ name: c.title, href: `/case-studies/${c.slug}` }))),
        getBreadcrumbJsonLd([
            { name: 'Home', href: '/' },
            { name: 'Case studies', href: '/case-studies' },
        ]),
    ],
};

function StudyCard({ study, featured = false }: { study: CaseStudy; featured?: boolean }) {
    const lead = study.results.slice(0, featured ? 3 : 2);
    return (
        <Link
            href={`/case-studies/${study.slug}`}
            className={`group flex overflow-hidden rounded-3xl border border-border bg-background-card shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover ${
                featured ? 'flex-col lg:col-span-2 lg:flex-row' : 'flex-col'
            }`}
        >
            <CaseThumb study={study} className={featured ? 'lg:w-[48%] lg:aspect-auto lg:min-h-[340px]' : ''} />
            <div className={`flex flex-1 flex-col p-7 ${featured ? 'lg:p-10' : 'md:p-8'}`}>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-accent">{study.clientName}</span>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold text-foreground-secondary">{KIND_LABEL[study.kind]}</span>
                </div>
                <h2 className={`mt-3 font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent ${featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>{study.title}</h2>
                <p className="mt-4 line-clamp-4 leading-relaxed text-foreground-secondary">{study.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Topics">
                    {study.tags.map((t) => (
                        <li key={t} className="rounded-full bg-background-secondary px-2.5 py-1 text-xs font-medium text-foreground-secondary">
                            {t}
                        </li>
                    ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-5 pt-7">
                    <dl className="flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-5">
                        {lead.map((r) => (
                            <div key={r.label}>
                                <dd className="text-xl font-bold tracking-tight text-foreground">{r.value}</dd>
                                <dt className="mt-0.5 text-xs text-foreground-muted">{r.label}</dt>
                            </div>
                        ))}
                    </dl>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent">
                        Read the case study
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function CaseStudiesIndex() {
    const [featured, ...rest] = caseStudies;

    return (
        <div className="pb-8">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <SectionWrapper animate={false} className="relative overflow-hidden !pt-32 md:!pt-40 !pb-12 md:!pb-16">
                <PageHeroBackdrop />
                <div className="relative z-10 max-w-4xl">
                    <Breadcrumbs className="mb-10" items={[{ label: 'Home', href: '/' }, { label: 'Case studies' }]} />
                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                        <CaseIcon name="bot" className="h-3.5 w-3.5" /> AI agents, in production
                    </span>
                    <h1 className="mt-6 text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-5xl md:text-7xl">AI products we&apos;ve built and run</h1>
                    <p className="mt-7 max-w-3xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
                        Four case studies, each built around AI agents: a multi-product healthcare AI platform, an AI hiring platform, an exam-prep engine, and Clinizy Care, the product we run ourselves. This is what working with us as your technology partner looks like.
                    </p>
                    <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <StartProjectButton source="Case studies hero" />
                        <Link href="/services/ai-agents-automation" className="px-2 py-3 text-lg font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent">
                            Our AI agent services
                        </Link>
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper animate={false} ariaLabel="Case studies" className="!pt-4">
                <div className="grid gap-6 lg:grid-cols-2">
                    {featured && <StudyCard study={featured} featured />}
                    {rest.map((study) => (
                        <StudyCard key={study.slug} study={study} />
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper ariaLabel="Start a project">
                <div className="rounded-[2rem] border border-border bg-background-card px-7 py-14 text-center shadow-card md:px-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">Looking for an AI technology partner?</h2>
                    <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground-secondary">
                        Whether it&apos;s one agent or a whole platform, you&apos;ll work directly with the senior engineers who build and run these products.
                    </p>
                    <div className="mt-9 flex justify-center">
                        <StartProjectButton source="Case studies footer" />
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
