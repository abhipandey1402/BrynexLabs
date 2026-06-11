export interface ServiceDetail {
    slug: string;
    title: string;
    description: string;
    shortTitle?: string;
    cardDescription?: string;
    seo: {
        title: string;
        metaDescription: string;
    };
    challenges: string[];
    solutions: string[];
    techStack: { name: string; icon: string }[];
    faqs: { question: string; answer: string }[];
    metrics?: { value: string; label: string }[];
    hook?: string;
    process?: { title: string; description: string }[];
    targetAudience?: { for: string[]; notFor: string[] };
    testimonial?: { quote: string; author: string; role: string; avatar?: string };
    customCta?: { title: string; subtitle: string; buttonText: string };
}

export const services: ServiceDetail[] = [
    {
        slug: 'ai-agents-automation',
        title: 'Agentic AI & Intelligent Automation',
        description: 'Autonomous AI agents that reason, use tools, and execute complex workflows end-to-end — built on LangChain, LangGraph, RAG, and your own business data.',
        seo: {
            title: 'AI Agent Development & Intelligent Automation | Brynex Labs',
            metaDescription: 'Production-grade AI agents built with LangChain, LangGraph, RAG, and vector databases. Automate support, operations, and data workflows with autonomous, tool-using agents.',
        },
        challenges: [
            'Excessive time spent on repetitive, multi-step manual workflows',
            'Scaling customer support without proportional cost increases',
            'Company knowledge locked in documents, tickets, and wikis no one can search',
            'Generic chatbots that can\'t take real action in your systems',
        ],
        solutions: [
            'Custom AI agents built on GPT, Claude, Gemini, and open-source models from Hugging Face',
            'Multi-agent workflow orchestration with LangChain, LangGraph, and CrewAI',
            'Retrieval-Augmented Generation (RAG) pipelines over your internal knowledge using Pinecone, Qdrant, and pgvector',
            'Tool-using agents that call your APIs, query databases, and complete multi-step tasks autonomously',
            'Fine-tuned and self-hosted open-source models for privacy-sensitive workloads',
            'Evaluation, guardrails, and observability so agents stay accurate, safe, and on-brand in production',
        ],
        techStack: [
            { name: 'LangChain', icon: 'LC' },
            { name: 'LangGraph', icon: 'LG' },
            { name: 'CrewAI', icon: 'Crew' },
            { name: 'AutoGen', icon: 'AG' },
            { name: 'LlamaIndex', icon: 'LI' },
            { name: 'OpenAI', icon: 'GPT' },
            { name: 'Anthropic Claude', icon: 'Cld' },
            { name: 'Google Gemini', icon: 'Gem' },
            { name: 'Hugging Face', icon: 'HF' },
            { name: 'Ollama', icon: 'OL' },
            { name: 'vLLM', icon: 'vLLM' },
            { name: 'Pinecone', icon: 'PC' },
            { name: 'Qdrant', icon: 'Qd' },
            { name: 'Weaviate', icon: 'Wv' },
            { name: 'ChromaDB', icon: 'Chr' },
            { name: 'pgvector', icon: 'pgv' },
            { name: 'MCP', icon: 'MCP' },
            { name: 'LangSmith', icon: 'LS' },
            { name: 'n8n', icon: 'n8n' },
            { name: 'Python', icon: 'Py' },
            { name: 'FastAPI', icon: 'API' },
            { name: 'Redis', icon: 'Rd' },
        ],
        process: [
            { title: 'Use-Case & ROI Mapping', description: 'We identify the workflows where agents deliver measurable savings — and rule out the ones where simple automation is the better answer.' },
            { title: 'Data & RAG Foundation', description: 'Your documents, tickets, and databases become a retrieval layer — chunked, embedded, and indexed in a vector database for grounded answers.' },
            { title: 'Agent Design & Orchestration', description: 'We design single or multi-agent systems with LangGraph — reasoning loops, tool use, memory, and human-in-the-loop checkpoints where it matters.' },
            { title: 'Evaluation & Guardrails', description: 'Automated eval suites, output validation, and guardrails catch hallucinations and unsafe actions before your users ever see them.' },
            { title: 'Deploy, Monitor & Improve', description: 'Agents ship to production with tracing, cost monitoring, and feedback loops that make them measurably better every week.' },
        ],
        faqs: [
            {
                question: 'Is my business data safe with AI agents?',
                answer: 'Yes. We deploy in private VPCs, use self-hosted open-source models where required, and ensure no data is ever used to train public models.',
            },
            {
                question: 'Can AI agents really handle complex, multi-step tasks?',
                answer: 'Modern agentic systems built on LangGraph can plan, use external tools and APIs, recover from errors, and escalate to humans — reliably executing workflows that used to need a person at every step.',
            },
            {
                question: 'Which models and frameworks do you work with?',
                answer: 'We\'re framework-agnostic but typically build on LangChain, LangGraph, and CrewAI, using GPT, Claude, Gemini, or fine-tuned Hugging Face models — paired with vector databases like Pinecone, Qdrant, or pgvector for RAG.',
            },
            {
                question: 'How much does it cost to run AI agents in production?',
                answer: 'Costs depend on usage and model selection. We optimize with model routing, prompt caching, and right-sized open-source models to keep operational costs predictable and low.',
            },
        ],
    },
    {
        slug: 'ai-native-software-engineering',
        title: 'AI-Native Software Engineering',
        description: 'Full-cycle product engineering — custom software, SaaS platforms, web & mobile apps, cloud infrastructure, and legacy modernization — built AI-first for speed and scale.',
        seo: {
            title: 'AI-Native Software Engineering Services | Brynex Labs',
            metaDescription: 'End-to-end AI-native software engineering: custom development, multi-tenant SaaS platforms, web & mobile apps, cloud & DevOps, and application modernization under one roof.',
        },
        challenges: [
            'Off-the-shelf software doesn\'t fit your unique business needs',
            'Legacy systems that are slow, insecure, and expensive to maintain',
            'Infrastructure that can\'t keep up as your user base grows',
            'Fragmented vendors for web, mobile, cloud, and backend work',
            'Products built without AI leverage, losing ground to faster competitors',
        ],
        solutions: [
            'Full-cycle custom development from discovery to deployment, accelerated by AI-assisted engineering',
            'Multi-tenant SaaS platforms with subscription billing, data isolation, and enterprise-grade security',
            'High-performance web and cross-platform mobile apps built with Next.js and React Native',
            'Cloud architecture, Infrastructure as Code, and zero-downtime CI/CD pipelines on AWS, GCP, or Azure',
            'Phased legacy modernization to modern architectures without disrupting your business',
            'AI embedded where it creates leverage — intelligent search, personalization, and automated workflows',
        ],
        techStack: [
            { name: 'Next.js', icon: 'Next' },
            { name: 'React', icon: 'Re' },
            { name: 'TypeScript', icon: 'TS' },
            { name: 'Node.js', icon: 'Node' },
            { name: 'NestJS', icon: 'Nest' },
            { name: 'Python', icon: 'Py' },
            { name: 'Go', icon: 'Go' },
            { name: 'React Native', icon: 'RN' },
            { name: 'Flutter', icon: 'Fl' },
            { name: 'Tailwind CSS', icon: 'TW' },
            { name: 'GraphQL', icon: 'GQL' },
            { name: 'PostgreSQL', icon: 'PG' },
            { name: 'MongoDB', icon: 'MDB' },
            { name: 'Redis', icon: 'Rd' },
            { name: 'Prisma', icon: 'Pr' },
            { name: 'Supabase', icon: 'Sb' },
            { name: 'AWS', icon: 'AWS' },
            { name: 'Google Cloud', icon: 'GCP' },
            { name: 'Azure', icon: 'Az' },
            { name: 'Docker', icon: 'Dk' },
            { name: 'Kubernetes', icon: 'K8s' },
            { name: 'Terraform', icon: 'Tf' },
            { name: 'Vercel', icon: 'V' },
            { name: 'GitHub Actions', icon: 'CI' },
            { name: 'Stripe', icon: 'St' },
        ],
        process: [
            { title: 'Discovery & Architecture', description: 'We map your business goals, audit existing systems, and design an architecture built for long-term scale — not just the first release.' },
            { title: 'Design & Prototype', description: 'Pixel-perfect UI/UX and clickable prototypes so you validate the product before a single line of production code is written.' },
            { title: 'AI-Accelerated Build Sprints', description: 'Production-grade development in short, transparent sprints — AI-assisted engineering lets a lean team ship at twice the pace.' },
            { title: 'Hardened Launch', description: 'Automated testing, security hardening, and zero-downtime CI/CD deployment to your cloud of choice.' },
            { title: 'Scale & Evolve', description: 'Monitoring, cloud cost optimization, and continuous iteration as your product and traffic grow.' },
        ],
        faqs: [
            {
                question: 'What does "AI-native" actually mean?',
                answer: 'Two things: we use AI-assisted engineering to ship faster with fewer defects, and we design your product so AI capabilities — search, personalization, automation — can be embedded from day one instead of bolted on later.',
            },
            {
                question: 'What types of software do you build?',
                answer: 'Everything from custom internal tools and APIs to multi-tenant SaaS platforms, high-performance websites, and cross-platform mobile apps — plus the cloud infrastructure that runs them.',
            },
            {
                question: 'Can you modernize our existing legacy application?',
                answer: 'Yes. We typically use the "Strangler Pattern" to migrate functionality piece-by-piece, running old and new systems in parallel for zero-downtime, low-risk migrations.',
            },
            {
                question: 'How long does a typical project take?',
                answer: 'A Minimum Viable Product (MVP) usually takes 8-12 weeks. Larger platforms or enterprise modernizations run 4-6+ months, delivered in increments so you see progress every sprint.',
            },
        ],
    },
    {
        slug: 'saas-seo',
        title: 'SaaS SEO Services for B2B Companies',
        shortTitle: 'SaaS SEO & Organic Growth',
        cardDescription: 'Scale your MRR with sustainable, high-converting organic traffic strategies tailored for SaaS companies.',
        description: 'Turn Organic Traffic into Pipeline, Demo Requests & Revenue. We help B2B SaaS companies turn SEO into a predictable revenue channel—not just a traffic source.',
        hook: 'Turn Organic Traffic into Pipeline, Demo Requests & Revenue. We help B2B SaaS companies turn SEO into a predictable revenue channel—not just a traffic source.',
        seo: {
            title: 'SaaS SEO Services for B2B Companies | Revenue-Focused SEO Agency',
            metaDescription: 'Turn SEO into a predictable revenue channel. We help B2B SaaS companies drive demo requests, pipeline, and growth with revenue-focused SEO strategies.',
        },
        challenges: [
            'Traffic growth without mapping to demo conversions',
            'Blog-heavy strategies targeting low buying intent',
            'Keyword research disconnected from ICP and sales funnel',
            'SEO operating in isolation from product and conversion',
        ],
        solutions: [
            'We Focus on Revenue, Not Just Traffic — everything tied to demo generation and pipeline growth',
            'Built for SaaS (Not Generic SEO) — we understand SaaS funnels, product-led growth, and high-consideration buying journeys',
            'Programmatic + Scalable SEO — we build systems that scale, not just manual execution',
            'SEO + CRO Combined — we don\'t stop at traffic, we optimize conversions',
            'Strategic Growth Partner — we don\'t just execute, we help you build a growth engine',
        ],
        techStack: [
            { name: 'Ahrefs', icon: 'Ahf' },
            { name: 'Semrush', icon: 'Sem' },
            { name: 'Search Console', icon: 'GSC' },
            { name: 'GA4', icon: 'GA4' },
            { name: 'Screaming Frog', icon: 'Frog' },
            { name: 'Surfer SEO', icon: 'Surf' },
            { name: 'Clearscope', icon: 'CS' },
            { name: 'Tag Manager', icon: 'GTM' },
            { name: 'Looker Studio', icon: 'LkS' },
            { name: 'Microsoft Clarity', icon: 'Clr' },
            { name: 'Hotjar', icon: 'HJ' },
            { name: 'HubSpot', icon: 'Hub' },
            { name: 'Next.js', icon: 'Next' },
            { name: 'PageSpeed Insights', icon: 'PSI' },
        ],
        faqs: [
            {
                question: 'How long does SaaS SEO take?',
                answer: 'You can expect initial traction in ~3 months. Meaningful growth compounds over 6–12 months.',
            },
            {
                question: 'How is SaaS SEO different from regular SEO?',
                answer: 'SaaS SEO focuses on buyer intent, product alignment, and demo conversion — not just traffic.',
            },
            {
                question: 'What makes your approach different?',
                answer: 'We connect SEO directly to pipeline and revenue, not just rankings.',
            },
        ],
        process: [
            { title: 'BOFU Keyword Capture', description: 'We prioritize high-intent keywords that drive demo requests—not just traffic.' },
            { title: 'Product-Led Content Strategy', description: 'Content aligned with your product use cases, not generic topics.' },
            { title: 'Conversion-Focused Landing Pages', description: 'Pages designed to rank AND convert into demos.' },
            { title: 'Programmatic SEO for Scale', description: 'Build scalable page systems to capture long-tail demand.' },
            { title: 'SEO + CRO Loop', description: 'Continuously optimize pages to increase demo conversions—not just visits.' },
        ],
        targetAudience: {
            for: [
                'B2B SaaS companies in India or global markets',
                'Growth-stage startups (Series A–B or similar traction)',
                'Teams with an existing product and consistent customer acquisition',
                'Founders & marketing leaders focused on pipeline, demo requests, and revenue — not just traffic',
                'Teams ready to invest in long-term, scalable organic growth',
            ],
            notFor: [
                'You\'re pre-product or validating your idea',
                'You expect results in less than 30 days',
                'There\'s no clear ICP or positioning',
                'You\'re not ready to invest in long-term growth',
            ]
        },
        customCta: {
            title: 'Ready to Turn SEO into a Revenue Channel?',
            subtitle: 'Get more demo requests (not just traffic), a scalable organic growth engine, and SEO aligned with your product and funnel.',
            buttonText: 'Get Your Custom Growth Plan',
        }
    },
];
