import { Metadata } from 'next';
import Link from 'next/link';
import SectionWrapper from '@/components/SectionWrapper';

export const metadata: Metadata = {
    title: 'Hire AI Developers | Dedicated AI Engineers from $25/hr',
    description: 'Hire senior AI developers skilled in LangChain, LangGraph, RAG, and LLM integration. Dedicated AI engineers for US, UK & global companies at 40–60% below US rates. Start within 72 hours.',
    alternates: { canonical: '/hire-ai-developers' },
    openGraph: {
        title: 'Hire AI Developers | Dedicated AI Engineers from $25/hr',
        description: 'Hire senior AI developers skilled in LangChain, LangGraph, RAG, and LLM integration — at 40–60% below US rates. Start within 72 hours.',
        url: '/hire-ai-developers',
        type: 'website',
    },
};

const skills = [
    { title: 'AI Agent Development', description: 'Autonomous, tool-using agents built with LangChain, LangGraph, and CrewAI that plan, reason, and execute multi-step workflows in production.' },
    { title: 'RAG & LLM Integration', description: 'Retrieval-Augmented Generation pipelines over your business data using Pinecone, Qdrant, and pgvector — grounded answers, no hallucinated facts.' },
    { title: 'Custom LLM Applications', description: 'Chat assistants, copilots, document intelligence, and AI-powered features integrated directly into your existing SaaS or enterprise product.' },
    { title: 'Model Fine-Tuning & Self-Hosting', description: 'Fine-tuned and self-hosted open-source models (Llama, Mistral) with vLLM and Ollama for privacy-sensitive and cost-sensitive workloads.' },
    { title: 'AI Evaluation & Guardrails', description: 'Eval suites, output validation, observability with LangSmith, and guardrails that keep agents accurate, safe, and on-brand.' },
    { title: 'Full-Stack Product Engineering', description: 'Our AI developers are product engineers first — Python, FastAPI, Next.js, and cloud infrastructure, so AI features ship as part of real software.' },
];

const engagementModels = [
    { title: 'Dedicated AI Developer', description: 'A senior AI engineer working exclusively on your product, integrated into your team, tools, and standups — delivered under our existing AI engineering services.', detail: 'From $3,000/month' },
    { title: 'Dedicated AI Team', description: 'A cross-functional pod — AI engineer, full-stack developer, and tech lead — for end-to-end delivery of our agentic AI and software engineering services.', detail: 'Custom quote' },
    { title: 'Fixed-Scope AI Project', description: 'A clearly scoped agent, RAG pipeline, or AI feature delivered at a fixed price with milestones through our Agentic AI & Intelligent Automation service.', detail: 'From $4,999' },
];

const faqs = [
    { q: 'How quickly can we onboard an AI developer?', a: 'Typically within 48–72 hours of signing. We share matched profiles first, you interview them, and the engineer you select starts immediately — no bait-and-switch.' },
    { q: 'How much does it cost to hire AI developers from India?', a: 'Senior AI developers through Brynex Labs start around $25–$45/hour (roughly $3,000–$8,000/month for a dedicated engineer) — 40–60% below comparable US rates of $120–$250/hour, with the same tooling and code-quality standards.' },
    { q: 'Do your AI developers overlap with US working hours?', a: 'Yes. Every engagement includes 3–5 hours of guaranteed overlap with US Eastern or Pacific time, async-first daily updates, and a single senior point of contact.' },
    { q: 'Who owns the code and IP?', a: 'You do — 100%. Every engagement includes an NDA and full intellectual property transfer in the contract, with code delivered into your own repositories from day one.' },
    { q: 'What if the developer is not a good fit?', a: 'We offer a risk-free replacement: if an engineer is not working out in the first two weeks, we replace them at no cost or you can exit the engagement.' },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            "name": "Hire AI Developers",
            "serviceType": "Dedicated-engineer engagement for Agentic AI & Intelligent Automation and AI-Native Software Engineering",
            "description": "Hire the senior AI engineers behind Brynex Labs' agentic AI and AI-native software engineering services — skilled in LangChain, LangGraph, RAG, and LLM integration. Serving the USA, UK, Australia, and India.",
            "provider": {
                "@type": "Organization",
                "@id": "https://brynex.in/#organization",
                "name": "Brynex Labs",
                "url": "https://brynex.in"
            },
            "areaServed": [
                { "@type": "Country", "name": "United States" },
                { "@type": "Country", "name": "India" },
                { "@type": "Country", "name": "United Kingdom" },
                { "@type": "Country", "name": "Australia" }
            ],
            "url": "https://brynex.in/hire-ai-developers"
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://brynex.in" },
                { "@type": "ListItem", "position": 2, "name": "Hire AI Developers", "item": "https://brynex.in/hire-ai-developers" }
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

export default function HireAIDevelopersPage() {
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
                        Hire AI Developers Who Ship to <span className="text-accent">Production</span>
                    </h1>
                    <p className="text-xl text-foreground-secondary leading-relaxed mb-8">
                        Hire the same senior engineers behind our <Link href="/services/ai-agents-automation" className="text-accent hover:underline">Agentic AI &amp; Intelligent Automation</Link> and <Link href="/services/ai-native-software-engineering" className="text-accent hover:underline">AI-Native Software Engineering</Link> services — as a dedicated developer or a full team. Start within 72 hours at 40–60% below US agency rates, with full IP ownership and US-timezone overlap.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-white font-bold hover:opacity-90 transition-opacity">
                            Get Matched with AI Developers
                        </Link>
                        <Link href="/services/ai-agents-automation" className="inline-flex items-center px-8 py-4 rounded-full border border-border text-foreground font-bold hover:border-accent transition-colors">
                            Explore AI Agent Development
                        </Link>
                    </div>
                </div>

                {/* Skills */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 tracking-tight">
                        What Our AI Developers <span className="text-accent">Do Best</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill) => (
                            <div key={skill.title} className="p-6 bg-background-secondary border border-border rounded-xl hover:border-accent/40 transition-colors">
                                <h3 className="font-bold text-lg text-foreground mb-3">{skill.title}</h3>
                                <p className="text-foreground-secondary text-sm leading-relaxed">{skill.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Engagement models */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 tracking-tight">
                        Flexible Ways to <span className="text-accent">Engage</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {engagementModels.map((model) => (
                            <div key={model.title} className="p-8 bg-background-card border border-border rounded-2xl flex flex-col">
                                <h3 className="font-bold text-xl text-foreground mb-3">{model.title}</h3>
                                <p className="text-foreground-secondary text-sm leading-relaxed mb-6 flex-1">{model.description}</p>
                                <span className="text-accent font-bold">{model.detail}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Brynex */}
                <div className="mb-20 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
                        Why Companies in the USA &amp; Europe Hire Through <span className="text-accent">Brynex Labs</span>
                    </h2>
                    <ul className="space-y-4 text-foreground-secondary leading-relaxed list-disc pl-5">
                        <li><strong className="text-foreground">Senior engineers only</strong> — 4+ years average experience; the people you interview are the people who write your code.</li>
                        <li><strong className="text-foreground">Production AI experience</strong> — our developers have shipped real agents, RAG systems, and LLM features, not just demos. See our <Link href="/case-studies" className="text-accent hover:underline">case studies</Link>.</li>
                        <li><strong className="text-foreground">40–60% cost advantage</strong> — India-based delivery with US-grade engineering standards, contracts, and communication.</li>
                        <li><strong className="text-foreground">Zero middlemen</strong> — direct access to your engineers with a senior point of contact, following our <Link href="/how-we-work" className="text-accent hover:underline">transparent delivery process</Link>.</li>
                    </ul>
                </div>

                {/* FAQs */}
                <div className="mb-20 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 tracking-tight">
                        Hiring AI Developers: <span className="text-accent">FAQs</span>
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
                        Ready to hire your AI developer?
                    </h2>
                    <p className="text-foreground-secondary text-lg max-w-2xl mx-auto mb-8">
                        Tell us what you&apos;re building and we&apos;ll share matched senior profiles within 48 hours — no commitment required.
                    </p>
                    <Link href="/contact" className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-white font-bold hover:opacity-90 transition-opacity">
                        Book a Free Consultation
                    </Link>
                </div>
            </SectionWrapper>
        </div>
    );
}
