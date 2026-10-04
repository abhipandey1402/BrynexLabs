import { Metadata } from 'next';
import Link from 'next/link';
import SectionWrapper from '@/components/SectionWrapper';
import PageHeroBackdrop from '@/components/PageHeroBackdrop';
import Breadcrumbs from '@/components/Breadcrumbs';
import ClinizyLogo, { CLINIZY_GREEN_TEXT } from '@/components/ClinizyLogo';
import AIFeatureShowcase from '@/components/AIFeatureShowcase';
import StartProjectButton from '@/components/StartProjectButton';
import { BrowserFrame } from '@/components/DeviceFrame';
import { CLINIZY } from '@/data/products';
import { getBreadcrumbJsonLd, getItemListJsonLd, getWebPageJsonLd } from '@/lib/seo';

const TITLE = 'Products by Brynex Labs | Software We Build and Run';
const DESCRIPTION =
    'Brynex Labs builds and runs its own software. Clinizy Care, AI-powered hospital software for Indian clinics, is the first product from our studio.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/products' },
    openGraph: { title: TITLE, description: DESCRIPTION, url: '/products', type: 'website' },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const reasons = [
    {
        title: 'We carry the pager',
        body: 'When a token queue stalls or an invoice looks wrong mid-morning, it is our product and our problem. That operating experience comes with every client build.',
    },
    {
        title: 'Every playbook is tested on us first',
        body: 'Multi-tenant architecture, AI documentation, WhatsApp automation, GST billing and SEO: we shipped each one for our own product before recommending it to anyone else.',
    },
    {
        title: 'We pay the cloud bill',
        body: 'A plan that starts at ₹1,999 a month only works on lean, well-designed infrastructure. We design for running cost from day one, because our own margins depend on it.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            ...getWebPageJsonLd({ type: 'CollectionPage', name: TITLE, description: DESCRIPTION, path: '/products' }),
            // clinizy.in owns the SoftwareApplication node — reference, never redefine.
            mentions: [{ '@id': CLINIZY.softwareId }, { '@id': CLINIZY.organizationId }],
        },
        getItemListJsonLd([{ name: 'Clinizy Care: how we built it', href: '/products/clinizy-care' }]),
        getBreadcrumbJsonLd([
            { name: 'Home', href: '/' },
            { name: 'Products', href: '/products' },
        ]),
    ],
};

export default function ProductsPage() {
    const dashboard = CLINIZY.screenshots.dashboard;

    return (
        <div className="pb-8">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <SectionWrapper animate={false} className="relative overflow-hidden !pt-32 md:!pt-40 !pb-12 md:!pb-16">
                <PageHeroBackdrop />
                <div className="relative z-10 max-w-4xl">
                    <Breadcrumbs className="mb-10" items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
                    <h1 className="text-4xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-5xl md:text-7xl">
                        Products we build and run
                    </h1>
                    <p className="mt-7 max-w-3xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
                        Brynex Labs is a product studio. Alongside client work, we build and operate software of our own,
                        so the architecture, AI and automation we recommend to you has already run in our own production.
                    </p>
                </div>
            </SectionWrapper>

            <SectionWrapper ariaLabel="Clinizy Care" className="!pt-4">
                <article className="grid overflow-hidden rounded-3xl border border-border bg-background-card shadow-card lg:grid-cols-12">
                    <div className="flex flex-col p-7 sm:p-10 lg:col-span-5 lg:p-12">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground-secondary">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#2E9B59]" aria-hidden="true" />
                                Live
                            </span>
                            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">AI-powered</span>
                        </div>
                        <h2 className="mt-6">
                            <ClinizyLogo className="w-[200px]" />
                        </h2>
                        <p className="mt-2 text-sm font-medium text-foreground-muted">{CLINIZY.category}</p>
                        <p className="mt-6 text-lg leading-relaxed text-foreground-secondary">{CLINIZY.summary}</p>
                        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Clinizy Care at a glance">
                            {CLINIZY.proofChips.map((chip) => (
                                <li
                                    key={chip}
                                    className={`rounded-full border px-3 py-1 text-sm font-semibold ${CLINIZY_GREEN_TEXT}`}
                                    style={{ borderColor: `${CLINIZY.brandGreen}40`, backgroundColor: `${CLINIZY.brandGreen}14` }}
                                >
                                    {chip}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-auto lg:pt-8">
                            <Link
                                href="/products/clinizy-care"
                                className="inline-flex items-center justify-center gap-2 rounded-button bg-accent-gradient px-6 py-3.5 font-semibold text-white shadow-button transition-all hover:brightness-110"
                            >
                                How we built Clinizy Care
                            </Link>
                            <a
                                href={CLINIZY.homeUrl}
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center justify-center px-2 py-3 font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                            >
                                Explore Clinizy Care
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center p-5 sm:p-8 lg:col-span-7 lg:p-10" style={{ backgroundColor: `${CLINIZY.brandGreen}12` }}>
                        {dashboard ? (
                            <BrowserFrame shot={dashboard} address="clinizy.in/dashboard" sizes="(min-width: 1024px) 52vw, 100vw" className="w-full" />
                        ) : (
                            <ol className="grid w-full grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                                {CLINIZY.modules.map((module) => (
                                    <li key={module} className="border-b border-border pb-3 font-medium text-foreground">
                                        {module}
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>
                </article>
            </SectionWrapper>

            <SectionWrapper ariaLabel="AI in our products">
                <div className="mb-10 max-w-3xl">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">AI where it saves a clinic real time</h2>
                    <p className="mt-4 text-lg leading-relaxed text-foreground-secondary">
                        Bol, in early access today, drafts clinical notes from a doctor&apos;s dictation, with a guardrail agent
                        that refuses non-clinical input. Saathi, Awaz, Nazar, Buddhi and Setu are next on our roadmap. Each one
                        uses the same agent-plus-guardrails pattern we build for{' '}
                        <Link href="/services/ai-agents-automation" className="font-semibold text-foreground underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                            clients who need AI agents in production
                        </Link>
                        .
                    </p>
                </div>
                <div className="rounded-3xl border border-border bg-background-card p-5 sm:p-8">
                    <AIFeatureShowcase />
                </div>
            </SectionWrapper>

            <SectionWrapper ariaLabel="Why we build our own products">
                <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    Why a software studio builds its own products
                </h2>
                <div className="mt-10 grid divide-y divide-border rounded-2xl border border-border bg-background-card md:grid-cols-3 md:divide-x md:divide-y-0">
                    {reasons.map((reason) => (
                        <div key={reason.title} className="p-7 lg:p-9">
                            <h3 className="text-xl font-bold tracking-tight text-foreground">{reason.title}</h3>
                            <p className="mt-3 leading-relaxed text-foreground-secondary">{reason.body}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper ariaLabel="Work with us">
                <div className="rounded-[2rem] border border-border bg-background-secondary/60 px-7 py-14 text-center md:px-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">Want this team on your product?</h2>
                    <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground-secondary">
                        The engineers who built Clinizy Care build AI agents, SaaS platforms and SEO for founders worldwide.
                        Building in healthcare? See our{' '}
                        <Link href="/industries/healthcare" className="font-semibold text-foreground underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                            healthcare software engineering
                        </Link>{' '}
                        practice.
                    </p>
                    <div className="mt-9 flex justify-center">
                        <StartProjectButton source="Products hub CTA" />
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
