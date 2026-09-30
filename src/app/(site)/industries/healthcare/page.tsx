import { Metadata } from 'next';
import Link from 'next/link';
import SectionWrapper from '@/components/SectionWrapper';
import PageHeroBackdrop from '@/components/PageHeroBackdrop';
import Breadcrumbs from '@/components/Breadcrumbs';
import ClinizyLogo from '@/components/ClinizyLogo';
import AIFeatureShowcase from '@/components/AIFeatureShowcase';
import StartProjectButton from '@/components/StartProjectButton';
import { BrowserFrame } from '@/components/DeviceFrame';
import { CLINIZY, HEALTHCARE_CAPABILITIES } from '@/data/products';
import { absoluteUrl, getBreadcrumbJsonLd, getWebPageJsonLd, organizationRef } from '@/lib/seo';

const PATH = '/industries/healthcare';
const TITLE = 'Healthcare Software Development | Makers of Clinizy Care';
const DESCRIPTION =
    'Healthcare software engineering from the team that built Clinizy Care: multi-tenant HMS & EMR, GST billing, WhatsApp API and DPDP-aligned data handling.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: PATH },
    openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: 'website' },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const builds = [
    { title: 'Clinic & hospital management systems', body: 'OPD, IPD, pharmacy, lab and billing on one patient record, for single clinics or multi-tenant platforms.' },
    { title: 'Patient-facing apps & portals', body: 'Online booking, patient portals with OTP sign-in, reports and prescriptions delivered where patients already are.' },
    { title: 'Billing, GST & collections', body: 'Correct CGST/SGST/IGST, exempt and taxable lines, MRP-inclusive pharmacy pricing, day-close and accounting exports.' },
    { title: 'WhatsApp patient communication', body: 'Reminders, recalls, receipts and reports over the WhatsApp Business API, with templates, quotas and opt-outs handled.' },
    { title: 'AI clinical workflows', body: 'Documentation assistants and agents with guardrails and a clinician in the loop, the pattern behind Bol.' },
    { title: 'Automation & alerts', body: 'Scheduled and event-driven workflows for recalls, critical results, stock and discharge, with per-site controls.' },
];

const pricing = [
    { label: 'AI agent pilot', value: 'from ₹49,999', href: '/services/ai-agents-automation' },
    { label: 'Production-ready MVP', value: 'from ₹99,999', href: '/services/ai-native-software-engineering' },
    { label: 'Multi-tenant SaaS platform', value: 'from ₹2,49,999', href: '/services/ai-native-software-engineering' },
];

const faqs = [
    {
        q: 'Do you only build healthcare software for India?',
        a: 'No. Clinizy Care is built for India, which is where our GST, Hindi and WhatsApp experience comes from, but the architecture underneath it (multi-tenancy, role-based access, audit trails and AI with guardrails) applies anywhere. We work with healthcare teams in India and internationally.',
    },
    {
        q: 'How do you handle patient data?',
        a: 'We design for data protection from the first sprint: hosting in the region you need, encryption in transit, role-based access, two-factor sign-in, audit trails and strict tenant isolation. These are the controls we run in Clinizy Care, which is built to be DPDP Act 2023 aligned. Legal compliance stays with the data fiduciary; we build the controls that make it achievable.',
    },
    {
        q: 'Can you extend or fix an existing HMS or EMR?',
        a: 'Yes. We can audit an existing system, stabilise it, add modules such as GST billing, WhatsApp messaging or AI documentation, or plan a phased migration to a new platform without stopping the clinic.',
    },
    {
        q: 'How much does healthcare software development cost?',
        a: 'Most projects start with a fixed-scope MVP from ₹99,999. Multi-tenant SaaS platforms start from ₹2,49,999 and AI agent pilots from ₹49,999, with GST extra and milestone billing in INR. We send a fixed-scope proposal after a free discovery call.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            ...getWebPageJsonLd({ name: TITLE, description: DESCRIPTION, path: PATH }),
            mentions: [{ '@id': CLINIZY.softwareId }],
        },
        {
            '@type': 'Service',
            '@id': `${absoluteUrl(PATH)}#service`,
            name: 'Healthcare software engineering',
            serviceType: 'Healthcare software development',
            description:
                'Custom healthcare software from the team that built Clinizy Care: multi-tenant HMS and EMR platforms, GST billing, WhatsApp Business API integration, clinical workflow automation, AI documentation with guardrails, and DPDP-aligned data handling.',
            provider: organizationRef(),
            url: absoluteUrl(PATH),
            areaServed: [
                { '@type': 'Country', name: 'India' },
                { '@type': 'Country', name: 'United States' },
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'Country', name: 'Australia' },
            ],
            audience: { '@type': 'Audience', audienceType: 'Healthcare providers and health-tech founders' },
        },
        {
            '@type': 'FAQPage',
            '@id': `${absoluteUrl(PATH)}#faq`,
            mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
        getBreadcrumbJsonLd([
            { name: 'Home', href: '/' },
            { name: 'Healthcare software engineering', href: PATH },
        ]),
    ],
};

const inlineLink = 'font-semibold text-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent';

export default function HealthcarePage() {
    const dashboard = CLINIZY.screenshots.dashboard;
    const green = CLINIZY.brandGreen;

    return (
        <div className="pb-8">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <SectionWrapper animate={false} className="relative overflow-hidden !pt-32 md:!pt-40 !pb-12 md:!pb-16">
                <PageHeroBackdrop />
                <div className="relative z-10 max-w-5xl">
                    <Breadcrumbs className="mb-10" items={[{ label: 'Home', href: '/' }, { label: 'Healthcare' }]} />
                    <h1 className="text-4xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-5xl md:text-7xl">
                        Healthcare software engineering — from the team that built Clinizy
                    </h1>
                    <p className="mt-7 max-w-3xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
                        We build hospital, clinic and patient-facing software for healthcare founders and providers, on the
                        architecture we already run in production for Clinizy Care: multi-tenant, AI-assisted, GST-ready and
                        WhatsApp-native.
                    </p>
                    <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <StartProjectButton source="Healthcare page hero" />
                        <Link href="/products/clinizy-care" className="px-2 py-3 text-lg font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent">
                            See how we built Clinizy Care
                        </Link>
                    </div>
                </div>
            </SectionWrapper>

            {/* Proven capabilities */}
            <SectionWrapper ariaLabel="Proven capabilities">
                <div className="mb-10 max-w-3xl">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Capabilities we&apos;ve proven in production</h2>
                    <p className="mt-4 text-lg text-foreground-secondary">
                        Every item here runs in Clinizy Care today. If we haven&apos;t shipped it for ourselves, it isn&apos;t on this list.
                    </p>
                </div>
                <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
                    {HEALTHCARE_CAPABILITIES.map((c) => (
                        <div key={c.title} className="bg-background-card p-7">
                            <h3 className="text-lg font-bold tracking-tight text-foreground">{c.title}</h3>
                            <p className="mt-3 leading-relaxed text-foreground-secondary">{c.description}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Proof: Clinizy Care */}
            <SectionWrapper ariaLabel="Proof: Clinizy Care" className="border-y border-border bg-background-secondary/50">
                <article className="overflow-hidden rounded-3xl border border-border bg-background-card shadow-card">
                    <div className="grid lg:grid-cols-12">
                        <div className="p-7 sm:p-10 lg:col-span-5 lg:p-12">
                            <p className="text-sm font-semibold text-foreground-muted">The proof</p>
                            <h2 className="mt-3">
                                <ClinizyLogo className="w-[190px]" />
                            </h2>
                            <p className="mt-6 text-lg leading-relaxed text-foreground-secondary">
                                Clinizy Care is our own{' '}
                                <a href={CLINIZY.homeUrl} className={inlineLink}>hospital management software for Indian clinics</a>
                                , built and run by Brynex Labs: eleven modules on one patient record, 24 built-in automations,
                                WhatsApp built in, and an interface in English, Hindi and Hinglish.
                            </p>
                            <ul className="mt-6 space-y-2 text-foreground-secondary">
                                <li>
                                    <Link href="/case-studies/clinizy-care" className={inlineLink}>Read the Clinizy Care case study</Link>
                                </li>
                                <li>
                                    <Link href="/blog/how-we-built-multi-tenant-hms-indian-clinics" className={inlineLink}>How we built a multi-tenant HMS</Link>
                                </li>
                                <li>
                                    <Link href="/blog/dpdp-act-health-tech-builders" className={inlineLink}>The DPDP Act for health-tech builders</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center p-5 sm:p-8 lg:col-span-7 lg:p-10" style={{ backgroundColor: `${green}12` }}>
                            {dashboard ? (
                                <BrowserFrame shot={dashboard} address="clinizy.in/dashboard" sizes="(min-width: 1024px) 52vw, 100vw" className="w-full" />
                            ) : (
                                <ol className="grid w-full grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                                    {CLINIZY.modules.map((m) => (
                                        <li key={m} className="border-b border-border pb-3 font-medium text-foreground">{m}</li>
                                    ))}
                                </ol>
                            )}
                        </div>
                    </div>
                    <div className="border-t border-border p-6 sm:p-8 lg:p-10">
                        <h3 className="mb-6 text-xl font-bold tracking-tight text-foreground md:text-2xl">The AI we&apos;re building into Clinizy Care, and can build for you</h3>
                        <AIFeatureShowcase />
                    </div>
                </article>
            </SectionWrapper>

            {/* What we build */}
            <SectionWrapper ariaLabel="What we build">
                <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">What we can build for you</h2>
                <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                    {builds.map((b) => (
                        <div key={b.title} className="border-t border-border pt-5">
                            <h3 className="text-lg font-bold tracking-tight text-foreground">{b.title}</h3>
                            <p className="mt-2 leading-relaxed text-foreground-secondary">{b.body}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Engagement */}
            <SectionWrapper ariaLabel="How engagements start" className="border-y border-border bg-background-secondary/50">
                <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-5">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Fixed scope, milestone billing</h2>
                        <p className="mt-4 text-lg text-foreground-secondary">
                            Senior engineers only, weekly demos, and 100% code and IP ownership. Prices exclude GST.
                        </p>
                    </div>
                    <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:col-span-7">
                        {pricing.map((p) => (
                            <div key={p.label} className="flex flex-col bg-background-card p-6">
                                <dt className="order-2 mt-1 text-sm text-foreground-secondary">
                                    <Link href={p.href} className="hover:text-accent transition-colors">{p.label}</Link>
                                </dt>
                                <dd className="order-1 text-2xl font-bold tracking-tight text-foreground">{p.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </SectionWrapper>

            {/* FAQ */}
            <SectionWrapper ariaLabel="Healthcare software FAQ">
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Questions healthcare teams ask us</h2>
                <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
                    {faqs.map((f) => (
                        <div key={f.q}>
                            <h3 className="text-lg font-bold tracking-tight text-foreground">{f.q}</h3>
                            <p className="mt-3 leading-relaxed text-foreground-secondary">{f.a}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* CTA */}
            <SectionWrapper ariaLabel="Start a project">
                <div className="rounded-[2rem] border border-border bg-background-card px-7 py-14 text-center shadow-card md:px-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">Building healthcare software?</h2>
                    <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground-secondary">
                        Tell us what you&apos;re building. You&apos;ll talk to the engineers who built Clinizy Care, and get a
                        fixed-scope proposal before you commit.
                    </p>
                    <div className="mt-9 flex justify-center">
                        <StartProjectButton source="Healthcare page footer" />
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
