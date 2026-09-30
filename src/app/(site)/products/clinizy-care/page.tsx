import { Metadata } from 'next';
import Link from 'next/link';
import SectionWrapper from '@/components/SectionWrapper';
import Breadcrumbs from '@/components/Breadcrumbs';
import ClinizyLogo from '@/components/ClinizyLogo';
import AIFeatureShowcase from '@/components/AIFeatureShowcase';
import StartProjectButton from '@/components/StartProjectButton';
import { BrowserFrame, PhoneFrame } from '@/components/DeviceFrame';
import { CLINIZY, type Screenshot } from '@/data/products';
import { absoluteUrl, getBreadcrumbJsonLd, organizationRef, SITE_URL } from '@/lib/seo';

const PATH = '/products/clinizy-care';
const TITLE = 'How We Built Clinizy Care | Hospital Software by Brynex Labs';
const DESCRIPTION =
    'The builder’s story of Clinizy Care: why Indian clinics needed it, how we built an AI-powered, multi-tenant HMS, and what running it taught us.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: PATH },
    openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: 'article' },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const glance = [
    { value: '11', label: 'Modules on one patient record' },
    { value: '24', label: 'Built-in automations' },
    { value: '3', label: 'Interface languages' },
    { value: 'Web', label: 'Runs in the browser, nothing to install' },
];

const architecture = [
    {
        title: 'Multi-tenant, and it fails closed',
        body: 'Every clinic shares the same database but never sees another clinic’s data. A tenant guard is injected into every query, count, aggregate and write. With no tenant in context it returns nothing, and a real-database test suite proves it.',
        href: '/blog/how-we-built-multi-tenant-hms-indian-clinics',
        linkLabel: 'How the tenant guard works',
    },
    {
        title: 'One codebase, three surfaces',
        body: 'The marketing site, the clinic app and the admin console come from one React and Vite codebase, backed by a Node.js API on MongoDB. Validation schemas and the role-permission matrix are shared by client and server, so they can’t drift.',
    },
    {
        title: 'Queues for everything that leaves the building',
        body: 'WhatsApp messages, emails, PDFs and reports go through AWS queues with dead-letter queues and an idempotent worker, so a slow provider never slows the front desk.',
        href: '/blog/whatsapp-business-api-clinic-scale',
        linkLabel: 'What we learned running WhatsApp at clinic scale',
    },
    {
        title: 'Money in paise, tax by place of supply',
        body: 'Amounts are integers in paise end to end. CGST/SGST or IGST follows the place of supply, pharmacy MRP is treated as tax-inclusive, and finalized bills are immutable.',
        href: '/blog/gst-billing-engine-lessons-clinics',
        linkLabel: 'Lessons from the GST billing engine',
    },
    {
        title: 'India-hosted and access-controlled',
        body: 'Hosted on AWS Mumbai and encrypted in transit, with seven staff roles, two-factor sign-in and an audit trail of every change, built to be DPDP Act 2023 aligned.',
        href: '/blog/dpdp-act-health-tech-builders',
        linkLabel: 'The DPDP Act for health-tech builders',
    },
    {
        title: 'A live queue on every screen',
        body: 'Server-sent events push the OPD queue to reception, the consulting room and the waiting-room TV at the same moment, and the TV shows patient initials only.',
    },
];

const lessons = [
    {
        title: 'Fail closed, then prove it',
        body: 'Our first tenant guard covered reads but not every write path. We extended it to updates, deletes, counts and inserts, then added tests against a real database, because mocked models can’t prove isolation.',
    },
    {
        title: 'Background jobs are production too',
        body: 'In a multi-tenant system one unguarded scheduled job can take every clinic down at once. Every job now runs inside a guard, with a database lock so only one instance runs it.',
    },
    {
        title: 'Time zones are business logic',
        body: 'Indian clinics live in IST, which starts at 18:30 UTC. Financial years, day-close and monthly bill numbers are all computed explicitly in IST, so a late-evening bill lands on the right day.',
    },
    {
        title: 'Hinglish is its own language',
        body: 'A front desk that thinks in Hinglish isn’t served by transliterated English. We ship it as a separate, written-for-humans locale beside English and Hindi, and a parity test fails the build if any string is missing.',
    },
    {
        title: 'Never ship fake data',
        body: 'Early screens had placeholder fallbacks that looked like real bills and records. We removed every one. An honest empty state beats a convincing fake, especially in healthcare.',
    },
    {
        title: 'AI-native, senior-owned',
        body: 'We built Clinizy Care the way we build for clients: AI coding agents draft, senior engineers design, review and own every merge, behind thousands of automated tests.',
    },
];

function galleryShots(): { key: string; shot: Screenshot; caption: string; phone?: boolean }[] {
    const s = CLINIZY.screenshots;
    const items: { key: string; shot?: Screenshot; caption: string; phone?: boolean }[] = [
        { key: 'opd', shot: s.opd, caption: 'The live OPD queue' },
        { key: 'billing', shot: s.billing, caption: 'GST billing' },
        { key: 'prescription', shot: s.prescription, caption: 'Digital prescription' },
        { key: 'pharmacy', shot: s.pharmacy, caption: 'Pharmacy & inventory' },
        { key: 'ipd', shot: s.ipd, caption: 'IPD & bed management' },
        { key: 'lab', shot: s.lab, caption: 'Lab & diagnostics' },
        { key: 'automations', shot: s.automations, caption: 'Automations' },
        { key: 'hindi', shot: s.hindi, caption: 'The dashboard in Hindi' },
        { key: 'mobile', shot: s.mobile, caption: 'The OPD queue in a phone browser', phone: true },
    ];
    return items.filter((i): i is { key: string; shot: Screenshot; caption: string; phone?: boolean } => Boolean(i.shot));
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebPage',
            '@id': `${absoluteUrl(PATH)}#webpage`,
            url: absoluteUrl(PATH),
            name: TITLE,
            description: DESCRIPTION,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            publisher: organizationRef(),
            // clinizy.in is canonical for the product: reference its SoftwareApplication by @id only.
            about: { '@id': CLINIZY.softwareId },
            mentions: [{ '@id': CLINIZY.organizationId }],
            ...(CLINIZY.screenshots.dashboard ? { primaryImageOfPage: absoluteUrl(CLINIZY.screenshots.dashboard.src) } : {}),
        },
        getBreadcrumbJsonLd([
            { name: 'Home', href: '/' },
            { name: 'Products', href: '/products' },
            { name: 'Clinizy Care', href: PATH },
        ]),
    ],
};

const inlineLink = 'font-semibold text-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent';

export default function ClinizyCareProductPage() {
    const dashboard = CLINIZY.screenshots.dashboard;
    const gallery = galleryShots();
    const green = CLINIZY.brandGreen;

    return (
        <div className="pt-28 pb-8">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <SectionWrapper className="relative overflow-hidden !pb-10">
                <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[1000px] -translate-x-1/2 bg-accent-glow opacity-80" aria-hidden="true" />
                <div className="relative">
                    <Breadcrumbs
                        className="mb-10"
                        items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Clinizy Care' }]}
                    />
                    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-6">
                            <ClinizyLogo className="w-[190px]" />
                            <h1 className="mt-8 text-4xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                                How we built Clinizy Care
                            </h1>
                            <p className="mt-6 text-lg leading-relaxed text-foreground-secondary md:text-xl">
                                Clinizy Care is AI-powered hospital management software for India&apos;s clinics, nursing homes
                                and small hospitals. Brynex Labs designed it, built it and runs it. This is the builder&apos;s
                                story: the problem, what we built, how it fits together, and what running it has taught us.
                            </p>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <a
                                    href={CLINIZY.homeUrl}
                                    target="_blank"
                                    rel="noopener"
                                    className="inline-flex items-center justify-center gap-2 rounded-button px-7 py-4 text-lg font-semibold text-white transition-all hover:brightness-110"
                                    style={{ backgroundColor: green, boxShadow: `0 10px 30px -12px ${green}` }}
                                >
                                    Explore Clinizy Care
                                </a>
                                <StartProjectButton source="Clinizy product page hero" />
                            </div>
                        </div>
                        <div className="lg:col-span-6">
                            {dashboard && (
                                <div className="rounded-3xl p-3 sm:p-5" style={{ backgroundColor: `${green}14` }}>
                                    <BrowserFrame shot={dashboard} address="clinizy.in/dashboard" priority sizes="(min-width: 1024px) 48vw, 100vw" />
                                </div>
                            )}
                        </div>
                    </div>

                    <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
                        {glance.map((g) => (
                            <div key={g.label} className="flex flex-col bg-background-card p-6">
                                <dt className="order-2 mt-1 text-sm text-foreground-secondary">{g.label}</dt>
                                <dd className="order-1 text-3xl font-bold tracking-tight text-foreground">{g.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </SectionWrapper>

            {/* The problem */}
            <SectionWrapper ariaLabel="The problem">
                <div className="grid gap-10 lg:grid-cols-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:col-span-4">
                        The problem: paper registers and borrowed software
                    </h2>
                    <div className="space-y-6 text-lg leading-relaxed text-foreground-secondary lg:col-span-8">
                        <p>
                            Walk into a clinic in a tier-2 town and the day still runs on paper: a token slip at the door, a
                            handwritten prescription, a bill from a separate pharmacy counter, and a follow-up that depends on
                            someone remembering to call.
                        </p>
                        <p>
                            The software that does exist was mostly built for someone else. Large hospital systems are priced
                            and designed for metro hospitals. Imported tools don&apos;t understand GST, can&apos;t be used in
                            Hindi, and have never seen a token queue. Small clinics and nursing homes were left choosing between
                            paper and a product that didn&apos;t fit.
                        </p>
                        <p>
                            We set out to build software that works the way Indian clinics actually work, in the language the
                            front desk actually speaks, at a price a single-doctor practice can start with.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* What we built */}
            <SectionWrapper ariaLabel="What we built" className="border-y border-border bg-background-secondary/50">
                <div className="grid gap-10 lg:grid-cols-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:col-span-4">
                        What we built: one patient record, eleven modules
                    </h2>
                    <div className="lg:col-span-8">
                        <div className="space-y-6 text-lg leading-relaxed text-foreground-secondary">
                            <p>
                                A patient&apos;s visit moves through one shared record. Reception registers them and issues a
                                token, and the doctor sees them in a live{' '}
                                <a href={CLINIZY.links.opdQueue} className={inlineLink}>OPD queue management system</a>{' '}
                                built for walk-ins and appointments together. The prescription is written digitally, pharmacy
                                dispenses against it, and the bill picks up every line with the right tax through{' '}
                                <a href={CLINIZY.links.gstBilling} className={inlineLink}>GST billing software designed for clinics</a>.
                            </p>
                            <p>
                                Then{' '}
                                <a href={CLINIZY.links.whatsapp} className={inlineLink}>WhatsApp messaging for clinics</a>{' '}
                                takes over: the prescription, the receipt, the lab report and the follow-up reminder reach the
                                patient on the app they already use. You can see{' '}
                                <a href={CLINIZY.links.features} className={inlineLink}>every Clinizy Care module and feature</a>{' '}
                                on clinizy.in, and{' '}
                                <a href={CLINIZY.links.pricing} className={inlineLink}>plans start at ₹1,999 a month</a>{' '}
                                (excluding GST).
                            </p>
                        </div>
                        <ul className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2" aria-label="The 11 modules">
                            {CLINIZY.modules.map((module) => (
                                <li key={module} className="flex items-center justify-between border-b border-border py-3 font-medium text-foreground">
                                    {module}
                                    {module === 'AI Clinical Documentation' && (
                                        <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                                            Early access
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </SectionWrapper>

            {/* AI inside */}
            <SectionWrapper ariaLabel="AI inside Clinizy Care">
                <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:col-span-5">
                        AI where the minutes are, automation everywhere else
                    </h2>
                    <p className="text-lg leading-relaxed text-foreground-secondary lg:col-span-7">
                        Documentation is where a doctor&apos;s day disappears, so that&apos;s where we started: Bol drafts
                        structured notes from dictation and is in early access. Saathi, Awaz, Nazar, Buddhi and Setu are next on
                        the roadmap. Around them, 24 automations already handle the repetitive work, from follow-up recalls to
                        critical-result alerts.
                    </p>
                </div>
                <div className="rounded-3xl border border-border bg-background-card p-5 sm:p-8">
                    <AIFeatureShowcase />
                </div>
            </SectionWrapper>

            {/* Architecture */}
            <SectionWrapper ariaLabel="Architecture highlights" className="border-y border-border bg-background-secondary/50">
                <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">Architecture highlights</h2>
                <p className="mt-4 max-w-3xl text-lg text-foreground-secondary">
                    The decisions that carry the most weight, and where we&apos;ve written them up in detail.
                </p>
                <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
                    {architecture.map((item) => (
                        <div key={item.title} className="flex flex-col bg-background-card p-7">
                            <h3 className="text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
                            <p className="mt-3 leading-relaxed text-foreground-secondary">{item.body}</p>
                            {item.href && (
                                <Link href={item.href} className="mt-5 text-sm font-semibold text-accent transition-colors hover:text-accent-dark">
                                    {item.linkLabel}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Lessons */}
            <SectionWrapper ariaLabel="Lessons learned">
                <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">What running it taught us</h2>
                        <p className="mt-4 text-lg text-foreground-secondary">
                            Building a product is one education. Running it for real clinics every day is another.
                        </p>
                    </div>
                    <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-8">
                        {lessons.map((lesson) => (
                            <div key={lesson.title} className="border-t border-border pt-5">
                                <h3 className="text-lg font-bold tracking-tight text-foreground">{lesson.title}</h3>
                                <p className="mt-2 leading-relaxed text-foreground-secondary">{lesson.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Gallery — real screens with demo data only */}
            {gallery.length > 0 && (
                <SectionWrapper ariaLabel="Screens" className="border-y border-border bg-background-secondary/50">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Inside the product</h2>
                    <p className="mt-4 max-w-3xl text-lg text-foreground-secondary">Real screens from Clinizy Care, shown with demo data.</p>
                    <div className="mt-10 grid gap-8 md:grid-cols-2">
                        {gallery.map((item) => (
                            <figure key={item.key} className={item.phone ? 'mx-auto w-full max-w-[260px]' : ''}>
                                {item.phone ? (
                                    <PhoneFrame shot={item.shot} sizes="260px" />
                                ) : (
                                    <BrowserFrame shot={item.shot} address="clinizy.in" sizes="(min-width: 768px) 45vw, 100vw" />
                                )}
                                <figcaption className="mt-3 text-sm font-medium text-foreground-secondary">{item.caption}</figcaption>
                            </figure>
                        ))}
                    </div>
                </SectionWrapper>
            )}

            {/* CTAs */}
            <SectionWrapper ariaLabel="See Clinizy Care">
                <div className="grid overflow-hidden rounded-[2rem] border border-border bg-background-card lg:grid-cols-2">
                    <div className="p-8 md:p-12" style={{ backgroundColor: `${green}12` }}>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">See Clinizy Care for yourself</h2>
                        <p className="mt-4 text-lg text-foreground-secondary">
                            Every plan starts with a 30-day free trial on clinizy.in, which is the home for the product, its
                            features and its pricing.
                        </p>
                        <a
                            href={CLINIZY.homeUrl}
                            target="_blank"
                            rel="noopener"
                            className="mt-8 inline-flex items-center justify-center rounded-button px-7 py-4 text-lg font-semibold text-white transition-all hover:brightness-110"
                            style={{ backgroundColor: green }}
                        >
                            Explore Clinizy Care
                        </a>
                    </div>
                    <div className="p-8 md:p-12">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">Building in healthcare?</h2>
                        <p className="mt-4 text-lg text-foreground-secondary">
                            The team behind Clinizy Care builds HMS, EMR, billing and patient-messaging software for healthcare
                            founders and providers. Read the{' '}
                            <Link href="/case-studies/clinizy-care" className={inlineLink}>Clinizy Care case study</Link> or see our{' '}
                            <Link href="/industries/healthcare" className={inlineLink}>healthcare software engineering</Link> practice.
                        </p>
                        <div className="mt-8">
                            <StartProjectButton source="Clinizy product page footer" />
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
