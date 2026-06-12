import { Metadata } from 'next';
import Link from 'next/link';
import SectionWrapper from '@/components/SectionWrapper';

export const metadata: Metadata = {
    title: 'AI Development Company in India | Brynex Labs',
    description: 'Brynex Labs is a top AI development company in India building AI agents, LLM applications, RAG systems & custom software for clients in the USA, UK, Australia & India. Get a free consultation.',
    alternates: { canonical: '/ai-development-company-in-india' },
    openGraph: {
        title: 'AI Development Company in India | Brynex Labs',
        description: 'Top AI development company in India — AI agents, LLM applications, RAG systems & custom software for clients in the USA, UK, Australia & India.',
        url: '/ai-development-company-in-india',
        type: 'website',
    },
};

const offerings = [
    { title: 'AI Agent Development', href: '/services/ai-agents-automation', description: 'Autonomous, tool-using AI agents built on LangChain, LangGraph, and CrewAI that automate support, operations, and data workflows end-to-end.' },
    { title: 'RAG & LLM Applications', href: '/services/ai-agents-automation', description: 'Retrieval-Augmented Generation over your documents, tickets, and databases using Pinecone, Qdrant, and pgvector — accurate, grounded AI on your own data.' },
    { title: 'Custom Software & SaaS Development', href: '/services/ai-native-software-engineering', description: 'Full-cycle product engineering: multi-tenant SaaS platforms, web & mobile apps, and cloud infrastructure — built AI-first with Next.js, Python, and AWS/GCP.' },
    { title: 'SaaS SEO & Organic Growth', href: '/services/saas-seo', description: 'Revenue-focused SEO for B2B SaaS companies — BOFU keywords, programmatic SEO, and CRO that turn organic traffic into demos and pipeline.' },
];

const reasons = [
    { title: '40–60% Lower Cost, Same Quality', description: 'Senior AI engineers in India deliver at $25–$45/hour versus $120–$250/hour in the US — with identical tooling, code review standards, and production rigor.' },
    { title: 'Senior-Led Engineering Collective', description: '10+ senior engineers with 4+ years average experience. No juniors learning on your budget, no bloated management layers between you and your team.' },
    { title: 'US & Global Timezone Coverage', description: 'Guaranteed overlap with US Eastern and Pacific hours, async-first daily updates, and US-style contracts with NDA and full IP transfer.' },
    { title: 'Production AI, Not Demos', description: 'Evaluation suites, guardrails, observability, and cost optimization are part of every AI build — so what we ship keeps working after launch.' },
];

const faqs = [
    { q: 'Why hire an AI development company in India?', a: 'India hosts nearly 60% of global IT outsourcing with a 5.9-million-strong tech workforce. Companies in the USA and Europe typically save 40–60% on engineering costs while accessing senior AI talent experienced with LangChain, RAG, and production LLM systems.' },
    { q: 'How much does AI development cost in India?', a: 'With Brynex Labs, a focused AI agent pilot starts at $4,999, production agent systems at $12,999, and a production-ready MVP at $9,999. Dedicated senior AI engineers start near $3,000/month — roughly half of comparable US rates.' },
    { q: 'Do you work with clients in the USA, UK, and Australia?', a: 'Yes — most of our clients are international. We provide guaranteed timezone overlap, USD invoicing, US-style contracts with NDA, and full intellectual property transfer on every engagement.' },
    { q: 'Which AI technologies do you specialize in?', a: 'LangChain, LangGraph, CrewAI, and LlamaIndex for orchestration; OpenAI GPT, Anthropic Claude, and Gemini plus self-hosted open-source models; Pinecone, Qdrant, and pgvector for RAG; LangSmith for evaluation and observability.' },
    { q: 'How do we start a project with Brynex Labs?', a: 'Book a free consultation. Within 48–72 hours we run a discovery call, map your use case and ROI, and send a fixed-scope proposal — you only commit once the scope and price are clear.' },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["Organization", "ProfessionalService"],
            "name": "Brynex Labs",
            "@id": "https://brynex.in/#organization",
            "description": "AI development company in India building AI agents, LLM applications, RAG systems, and custom software for clients in the USA, UK, Australia, and India.",
            "url": "https://brynex.in",
            "email": "hello@brynex.in",
            "address": { "@type": "PostalAddress", "addressCountry": "IN" },
            "areaServed": [
                { "@type": "Country", "name": "United States" },
                { "@type": "Country", "name": "India" },
                { "@type": "Country", "name": "United Kingdom" },
                { "@type": "Country", "name": "Australia" }
            ]
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brynex.in" },
                { "@type": "ListItem", "position": 2, "name": "AI Development Company in India", "item": "https://brynex.in/ai-development-company-in-india" }
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": { "@type": "Answer", "text": faq.a }
            }))
        }
    ]
};

export default function AIDevelopmentCompanyIndiaPage() {
    return (
        <div className="pt-32 pb-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SectionWrapper>
                {/* Hero */}
                <div className="max-w-3xl mb-20">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                        AI Development Company in <span className="text-accent">India</span>, Trusted Globally
                    </h1>
                    <p className="text-xl text-foreground-secondary leading-relaxed mb-8">
                        Brynex Labs builds production-grade AI agents, LLM applications, and custom software from India for startups and enterprises in the USA, UK, Australia, and India — senior engineers, fixed-scope pricing, and full IP ownership.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-white font-bold hover:opacity-90 transition-opacity">
                            Get a Free Consultation
                        </Link>
                        <Link href="/case-studies" className="inline-flex items-center px-8 py-4 rounded-full border border-border text-foreground font-bold hover:border-accent transition-colors">
                            See Our Results
                        </Link>
                    </div>
                </div>

                {/* What we build */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 tracking-tight">
                        AI &amp; Software Services We <span className="text-accent">Deliver</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {offerings.map((offering) => (
                            <Link key={offering.title} href={offering.href} className="group p-8 bg-background-secondary border border-border rounded-2xl hover:border-accent/40 transition-colors block">
                                <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-accent transition-colors">{offering.title}</h3>
                                <p className="text-foreground-secondary text-sm leading-relaxed">{offering.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Why India / Why Brynex */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 tracking-tight">
                        Why Global Companies Choose <span className="text-accent">Brynex Labs</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reasons.map((reason) => (
                            <div key={reason.title} className="p-8 bg-background-card border border-border rounded-2xl">
                                <h3 className="font-bold text-xl text-foreground mb-3">{reason.title}</h3>
                                <p className="text-foreground-secondary text-sm leading-relaxed">{reason.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQs */}
                <div className="mb-20 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 tracking-tight">
                        Frequently Asked <span className="text-accent">Questions</span>
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.q} className="p-6 bg-background-secondary border border-border rounded-xl">
                                <h3 className="font-bold text-lg text-foreground mb-2">{faq.q}</h3>
                                <p className="text-foreground-secondary text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center py-12 px-6 bg-background-card border border-border rounded-[2rem]">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                        Build your AI product with India&apos;s senior engineers
                    </h2>
                    <p className="text-foreground-secondary text-lg max-w-2xl mx-auto mb-8">
                        Free discovery call, fixed-scope proposal within 72 hours, and a team that ships to production — not just prototypes.
                    </p>
                    <Link href="/contact" className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-white font-bold hover:opacity-90 transition-opacity">
                        Start Your Project
                    </Link>
                </div>
            </SectionWrapper>
        </div>
    );
}
