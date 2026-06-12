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
    badge?: string;
    problemHeading?: string;
    problemSummary?: string;
    processHeading?: string;
    processSummary?: string;
    subServices?: {
        heading: string;
        subheading?: string;
        items: { title: string; intro?: string; points: string[] }[];
    };
    whyUs?: {
        heading: string;
        items: { title: string; description: string }[];
    };
    comparison?: {
        heading: string;
        rows: { typical: string; ours: string }[];
    };
    pricing?: {
        heading: string;
        subheading?: string;
        tiers: {
            name: string;
            tagline?: string;
            priceLabel?: string;
            price: string;
            priceIN?: string;
            period?: string;
            features: string[];
            highlighted?: boolean;
            buttonText: string;
        }[];
        assurances?: string[];
    };
    /**
     * India-market variant, rendered as a separate crawlable page at
     * /in/services/[slug] (hreflang en-IN). Indian visitors are geo-routed
     * to it by middleware; crawlers index both versions independently.
     */
    marketIN?: {
        seo?: { title: string; metaDescription: string };
        hook?: string;
        pricingSubheading?: string;
        assurances?: string[];
        ctaSubtitle?: string;
        pricingNote?: string;
        faqs?: { question: string; answer: string }[];
    };
    process?: { title: string; description: string }[];
    targetAudience?: { for: string[]; notFor: string[] };
    testimonial?: { quote: string; author: string; role: string; avatar?: string };
    customCta?: { title: string; subtitle: string; buttonText: string; bullets?: string[] };
}

export const services: ServiceDetail[] = [
    {
        slug: 'ai-agents-automation',
        title: 'Agentic AI & Intelligent Automation',
        description: 'Autonomous AI agents that reason, use tools, and execute complex workflows end-to-end — built on LangChain, LangGraph, RAG, and your own business data.',
        badge: 'AI Agent Development',
        hook: 'Automate the work that eats your team\'s week. We build autonomous AI agents that reason, use tools, and execute complete workflows on your own business data — safely, measurably, in production.',
        metrics: [
            { value: '2–6 wks', label: 'First agent in production' },
            { value: '40–60%', label: 'Below US agency rates' },
            { value: '100%', label: 'Code & IP ownership' },
        ],
        problemHeading: 'Why Most AI Initiatives Stall',
        problemSummary: 'Result: AI stays a demo on someone\'s laptop while your team keeps scaling headcount instead of throughput.',
        processHeading: 'Our Production AI Agent Framework',
        processSummary: 'This is how AI agents become reliable digital workers — not another abandoned pilot.',
        subServices: {
            heading: 'Our AI Agent Development Services',
            subheading: 'Everything you need to take AI from idea to a production system that pays for itself.',
            items: [
                {
                    title: 'Custom AI Agent Development',
                    intro: 'Agents built around your exact workflow:',
                    points: ['Tool-using agents that call your APIs & databases', 'Human-in-the-loop checkpoints where it matters', 'Error recovery and escalation built in'],
                },
                {
                    title: 'RAG & Knowledge Systems',
                    intro: 'Your company knowledge, finally searchable:',
                    points: ['Documents, tickets & wikis chunked and embedded', 'Pinecone, Qdrant, or pgvector retrieval layers', 'Grounded answers with citations — no hallucinated facts'],
                },
                {
                    title: 'Multi-Agent Orchestration',
                    intro: 'Complex workflows, decomposed and automated:',
                    points: ['LangGraph & CrewAI orchestration', 'Planner, worker & reviewer agent patterns', 'State, memory & long-running task management'],
                },
                {
                    title: 'AI Chatbots & Copilots',
                    intro: 'Assistants that act, not just answer:',
                    points: ['Customer support automation with real resolutions', 'In-product copilots for your SaaS', 'Slack, WhatsApp & web deployments'],
                },
                {
                    title: 'LLM Integration & Fine-Tuning',
                    intro: 'The right model for each job:',
                    points: ['GPT, Claude, Gemini & open-source models', 'Fine-tuned & self-hosted models for privacy', 'Model routing & prompt caching for cost control'],
                },
                {
                    title: 'Evaluation, Guardrails & AI Ops',
                    intro: 'The part most agencies skip:',
                    points: ['Automated eval suites before every release', 'Output validation & safety guardrails', 'Tracing, cost monitoring & feedback loops with LangSmith'],
                },
            ],
        },
        whyUs: {
            heading: 'Why Companies Choose Brynex for AI Agents',
            items: [
                { title: 'Production-First, Not Demo-First', description: 'Evals, guardrails, and observability ship with every agent — so it keeps working after the launch call ends.' },
                { title: 'ROI Mapped Before We Build', description: 'We quantify hours saved and cost per task up front, and rule out workflows where simple automation beats an agent.' },
                { title: 'Model-Agnostic by Design', description: 'GPT, Claude, Gemini, or self-hosted open-source — chosen for your accuracy, privacy, and cost targets, never vendor lock-in.' },
                { title: 'Your Data Stays Yours', description: 'Private VPC deployments, self-hosted models where required, and zero training on your proprietary data.' },
                { title: 'Senior Engineers Only', description: '4+ years average experience. The engineers who scope your agent are the ones who build and ship it.' },
            ],
        },
        comparison: {
            heading: 'How We\'re Different from Typical AI Agencies',
            rows: [
                { typical: 'Impressive demos that break in production', ours: 'Evals, guardrails & monitoring from day one' },
                { typical: 'A generic chatbot bolted onto your site', ours: 'Tool-using agents that execute real workflows' },
                { typical: 'Locked into one model vendor', ours: 'Model-agnostic: GPT, Claude, Gemini, open-source' },
                { typical: 'Black-box costs that balloon at scale', ours: 'Model routing & caching for predictable spend' },
                { typical: 'Open-ended hourly billing', ours: 'Fixed-scope pilots mapped to measurable ROI' },
            ],
        },
        pricing: {
            heading: 'AI Agent Development Pricing',
            subheading: 'Fixed-scope, milestone-billed projects — you know the full investment before we write a line of code:',
            tiers: [
                {
                    name: 'Agent Pilot',
                    tagline: 'Prove the ROI on one workflow',
                    priceLabel: 'Starting at',
                    price: '$4,999',
                    priceIN: '₹49,999',
                    period: '/project',
                    features: [
                        'One workflow automated end-to-end',
                        'RAG over one knowledge source',
                        'Evaluation suite & guardrails included',
                        'Live in 2–4 weeks',
                        '30 days of post-launch support',
                    ],
                    buttonText: 'Start with a Pilot',
                },
                {
                    name: 'Production Agent System',
                    tagline: 'The full automation engine',
                    priceLabel: 'Starting at',
                    price: '$12,999',
                    priceIN: '₹1,49,999',
                    period: '/project',
                    highlighted: true,
                    features: [
                        'Multi-step, tool-using agent workflows',
                        'API, database & CRM integrations',
                        'Multi-agent orchestration with LangGraph',
                        'Observability + cost monitoring dashboard',
                        'Live in 6–10 weeks · 90 days support',
                    ],
                    buttonText: 'Scope My Agent System',
                },
                {
                    name: 'Enterprise AI Automation',
                    tagline: 'AI across departments, on your infrastructure',
                    priceLabel: 'Custom scope',
                    price: 'Custom',
                    features: [
                        'Multiple workflows & departments',
                        'Private VPC or self-hosted models',
                        'Fine-tuning on proprietary data',
                        'SLAs & dedicated senior team',
                        'Security review & compliance support',
                    ],
                    buttonText: 'Talk to an Architect',
                },
            ],
            assurances: [
                'Free discovery call & ROI mapping',
                'NDA before we see your data',
                'Milestone billing — pay as we deliver',
                '100% code & IP ownership',
            ],
        },
        marketIN: {
            seo: {
                title: 'AI Agent Development Company in India | Pilots from ₹49,999',
                metaDescription: 'AI agent development in India — pilots from ₹49,999, production agent systems from ₹1,49,999. LangChain, RAG & guardrails for Indian startups & enterprises. GST invoicing, free consultation.',
            },
            hook: 'Automate the work that eats your team\'s week. Production-grade AI agents for Indian startups, D2C brands, and enterprises — built on your own business data, at pricing that makes sense for the Indian market.',
            pricingSubheading: 'Honest Indian-market pricing — fixed scope, milestone billed, GST invoice included:',
            assurances: [
                'Free discovery call & ROI mapping',
                'GST invoicing & INR payments (UPI/bank)',
                'Milestone billing — pay as we deliver',
                '100% code & IP ownership',
            ],
            ctaSubtitle: 'Book a free use-case mapping call — in English or Hindi. We\'ll tell you honestly which workflows are agent-ready, and which aren\'t worth your money yet.',
            pricingNote: 'Prices for the Indian market · GST extra · INR invoicing',
            faqs: [
                {
                    question: 'How much does AI agent development cost in India?',
                    answer: 'An AI agent pilot that automates one workflow starts at ₹49,999. Production agent systems with API integrations and multi-agent orchestration start at ₹1,49,999, and enterprise automation across departments is custom-scoped. Every project gets a fixed quote after a free discovery call — GST extra, milestone billing in INR.',
                },
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
                    question: 'Do you work with startups and enterprises across India?',
                    answer: 'Yes — we work remote-first with startups, D2C brands, and enterprises across Bangalore, Mumbai, Delhi NCR, Pune, Hyderabad, and the rest of India. Calls in English or Hindi, GST invoicing, and INR payments via UPI or bank transfer.',
                },
                {
                    question: 'How long does it take to launch an AI agent?',
                    answer: 'A pilot goes live in 2–4 weeks; production agent systems with integrations and guardrails take 6–10 weeks. You see working demos every week from the first sprint.',
                },
            ],
        },
        targetAudience: {
            for: [
                'Teams drowning in repetitive, multi-step manual workflows',
                'Companies scaling customer support without wanting to scale headcount',
                'Businesses with knowledge trapped in documents, tickets, and wikis',
                'SaaS products adding AI features their competitors don\'t have',
                'US, UK, Australia & India companies wanting senior AI talent at sane rates',
            ],
            notFor: [
                'You want a generic chatbot live by Friday',
                'There\'s no real workflow or data for the agent to work with',
                'You expect AI magic without measurement or iteration',
                'You\'re not ready to involve a process owner from your team',
            ],
        },
        customCta: {
            title: 'Ready to Put AI Agents to Work?',
            subtitle: 'Book a free use-case mapping call. We\'ll tell you honestly which workflows are agent-ready — and which aren\'t.',
            buttonText: 'Map Your AI Use Case — Free',
            bullets: [
                'A workflow automated end-to-end (not a demo)',
                'Grounded answers on your own business data',
                'Evals, guardrails & cost monitoring included',
            ],
        },
        seo: {
            title: 'AI Agent Development Company | Agentic AI & Automation Services',
            metaDescription: 'Brynex Labs is an AI agent development company serving the USA & India. Production-grade AI agents with LangChain, LangGraph, RAG & vector databases — automate support, operations & workflows.',
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
            {
                question: 'How much does AI agent development cost?',
                answer: 'A focused single-workflow pilot starts at $4,999, production agent systems with integrations and multi-agent orchestration start at $12,999, and enterprise automation across departments is custom-scoped. Every project gets a fixed quote after a free discovery call — our India-based senior team delivers at 40–60% below US agency rates.',
            },
            {
                question: 'Do you build AI agents for companies in the USA and other countries?',
                answer: 'Yes. We work with clients across the USA, UK, Australia, and India with significant timezone overlap, async-first communication, and contracts/invoicing in USD. Most of our AI agent projects are for US-based SaaS and enterprise teams.',
            },
        ],
    },
    {
        slug: 'ai-native-software-engineering',
        title: 'AI-Native Software Engineering',
        description: 'Full-cycle product engineering — custom software, SaaS platforms, web & mobile apps, cloud infrastructure, and legacy modernization — built AI-first for speed and scale.',
        badge: 'Custom Software & SaaS Development',
        hook: 'Your product, engineered for scale. Full-cycle custom software — SaaS platforms, web & mobile apps, and cloud infrastructure — shipped by senior engineers at AI-accelerated speed.',
        metrics: [
            { value: '8–12 wks', label: 'MVP to production' },
            { value: '40–60%', label: 'Below US agency rates' },
            { value: '100%', label: 'Code & IP ownership' },
        ],
        problemHeading: 'Why Software Projects Go Sideways',
        problemSummary: 'Result: slow roadmaps, rising maintenance costs, and products losing ground to faster competitors.',
        processHeading: 'Our AI-Accelerated Delivery Framework',
        processSummary: 'This is how a lean senior team ships enterprise-grade software at twice the usual pace.',
        subServices: {
            heading: 'Our Software Engineering Services',
            subheading: 'One senior team across the full product lifecycle — no fragmented vendors.',
            items: [
                {
                    title: 'Custom Software Development',
                    intro: 'Software that fits your business exactly:',
                    points: ['Internal tools, dashboards & APIs', 'Workflow systems off-the-shelf software can\'t match', 'Discovery-to-deployment under one roof'],
                },
                {
                    title: 'SaaS Product Engineering',
                    intro: 'Platforms built to sell from day one:',
                    points: ['Multi-tenant architecture with data isolation', 'Subscription billing with Stripe', 'Enterprise-grade auth & security'],
                },
                {
                    title: 'Web & Mobile App Development',
                    intro: 'High-performance apps on every screen:',
                    points: ['Next.js web apps tuned for Core Web Vitals', 'React Native & Flutter cross-platform mobile', 'Pixel-perfect, conversion-focused UI'],
                },
                {
                    title: 'Cloud & DevOps Engineering',
                    intro: 'Infrastructure that scales with you:',
                    points: ['AWS, GCP & Azure architecture', 'Infrastructure as Code with Terraform', 'Zero-downtime CI/CD pipelines'],
                },
                {
                    title: 'Application Modernization',
                    intro: 'Legacy to modern, without the risk:',
                    points: ['Strangler-pattern phased migrations', 'Old and new systems running in parallel', 'Zero-downtime, low-risk cutovers'],
                },
                {
                    title: 'Embedded AI Features',
                    intro: 'AI where it creates real leverage:',
                    points: ['Intelligent search & personalization', 'Automated workflows inside your product', 'Built AI-native, not bolted on later'],
                },
            ],
        },
        whyUs: {
            heading: 'Why Companies Build with Brynex Labs',
            items: [
                { title: 'Senior Engineers Only', description: '4+ years average experience — no juniors learning on your budget, no bait-and-switch after the sales call.' },
                { title: 'AI-Accelerated Sprints', description: 'AI-assisted engineering lets a lean senior team ship at twice the pace — you pay for outcomes, not headcount.' },
                { title: 'Zero Middlemen', description: 'Direct access to the engineers building your product. Decisions happen in one conversation, not three handoffs.' },
                { title: 'Fixed Scope, Respected Budget', description: 'Fixed-scope proposals with milestone billing. If a feature isn\'t worth building, we\'ll tell you before you pay for it.' },
                { title: 'Hardened for Production', description: 'Automated tests, security hardening, and zero-downtime deploys are the default — not a premium add-on.' },
            ],
        },
        comparison: {
            heading: 'How We\'re Different from Typical Dev Shops',
            rows: [
                { typical: 'Junior-heavy teams behind a senior salesperson', ours: 'Senior engineers from the first call to the last commit' },
                { typical: 'Open-ended hourly billing', ours: 'Fixed-scope proposals with milestone billing' },
                { typical: 'Layers of PMs between you and the code', ours: 'Direct engineer access with weekly demos' },
                { typical: '"Works on demo day", breaks in production', ours: 'Automated tests, CI/CD & security hardening built in' },
                { typical: 'AI bolted on as an afterthought', ours: 'AI-native architecture from the first design doc' },
            ],
        },
        pricing: {
            heading: 'Custom Software Development Pricing',
            subheading: 'Transparent, fixed-scope pricing — know your full investment before development starts:',
            tiers: [
                {
                    name: 'Launch MVP',
                    tagline: 'Validate fast with a real product',
                    priceLabel: 'Starting at',
                    price: '$9,999',
                    priceIN: '₹99,999',
                    period: '/project',
                    features: [
                        'Core feature set, production-ready',
                        'Next.js web app with polished UI',
                        'Auth, database & cloud deployment',
                        'Live in 6–10 weeks',
                        '30 days of post-launch support',
                    ],
                    buttonText: 'Scope My MVP',
                },
                {
                    name: 'SaaS Platform',
                    tagline: 'Built to onboard paying customers',
                    priceLabel: 'Starting at',
                    price: '$24,999',
                    priceIN: '₹2,49,999',
                    period: '/project',
                    highlighted: true,
                    features: [
                        'Multi-tenant architecture & data isolation',
                        'Stripe subscription billing & admin panel',
                        'Web + mobile (React Native) options',
                        'CI/CD, automated tests & monitoring',
                        'Live in 3–5 months · 90 days support',
                    ],
                    buttonText: 'Plan My Platform',
                },
                {
                    name: 'Enterprise & Modernization',
                    tagline: 'Legacy to modern, without downtime',
                    priceLabel: 'Custom scope',
                    price: 'Custom',
                    features: [
                        'Phased strangler-pattern migration',
                        'Dedicated senior engineering team',
                        'Cloud architecture & DevOps overhaul',
                        'SLAs, security review & compliance',
                        'Zero-downtime cutovers',
                    ],
                    buttonText: 'Talk to an Architect',
                },
            ],
            assurances: [
                'Free discovery call & architecture review',
                'Fixed quote within 72 hours',
                'Weekly demos — see progress every sprint',
                '100% code & IP ownership',
            ],
        },
        marketIN: {
            seo: {
                title: 'Custom Software Development Company in India | MVP from ₹99,999',
                metaDescription: 'Custom software & SaaS development in India — MVPs from ₹99,999, multi-tenant SaaS platforms from ₹2,49,999. Senior engineers, fixed-scope quotes, GST invoicing. Free consultation.',
            },
            hook: 'Your product, engineered for scale. SaaS platforms, web & mobile apps, and cloud infrastructure for Indian startups and businesses — senior engineers, global quality, Indian-market pricing.',
            pricingSubheading: 'Honest Indian-market pricing — fixed scope, weekly demos, GST invoice included:',
            assurances: [
                'Free discovery call & architecture review',
                'Fixed quote within 72 hours',
                'GST invoicing & INR payments (UPI/bank)',
                '100% code & IP ownership',
            ],
            ctaSubtitle: 'Tell us what you\'re building — in English or Hindi. You\'ll get a senior engineer\'s honest assessment and a fixed-scope INR quote within 72 hours.',
            pricingNote: 'Prices for the Indian market · GST extra · INR invoicing',
            faqs: [
                {
                    question: 'How much does custom software development cost in India?',
                    answer: 'A production-ready MVP starts at ₹99,999, full multi-tenant SaaS platforms at ₹2,49,999, and enterprise modernization is custom-scoped. You get a fixed-scope quote within 72 hours of a free discovery call — GST extra, milestone billing in INR.',
                },
                {
                    question: 'What types of software do you build?',
                    answer: 'Everything from custom internal tools and APIs to multi-tenant SaaS platforms, high-performance websites, and cross-platform mobile apps — plus the cloud infrastructure that runs them.',
                },
                {
                    question: 'How long does a typical project take?',
                    answer: 'A Minimum Viable Product (MVP) usually takes 6-10 weeks. Larger platforms or enterprise modernizations run 4-6+ months, delivered in increments so you see progress every sprint.',
                },
                {
                    question: 'Can you modernize our existing legacy application?',
                    answer: 'Yes. We typically use the "Strangler Pattern" to migrate functionality piece-by-piece, running old and new systems in parallel for zero-downtime, low-risk migrations.',
                },
                {
                    question: 'Do you work with Indian startups and SMEs?',
                    answer: 'Yes — Indian startups, D2C brands, and SMEs are a core part of our client base. We work remote-first across Bangalore, Mumbai, Delhi NCR, Pune, Hyderabad, and all of India, with calls in English or Hindi, GST invoicing, and INR payments via UPI or bank transfer.',
                },
                {
                    question: 'Will I own the source code and IP?',
                    answer: '100%. Upon project completion and final payment, all intellectual property, design assets, and source code are fully transferred to you — delivered into your own repositories from day one.',
                },
            ],
        },
        targetAudience: {
            for: [
                'Founders building a new SaaS product or MVP',
                'Enterprises modernizing slow, expensive legacy systems',
                'Teams tired of juggling separate web, mobile, and cloud vendors',
                'US & European companies wanting offshore quality without offshore chaos',
                'Products that need AI capabilities designed in, not bolted on',
            ],
            notFor: [
                'You\'re shopping purely for the cheapest possible freelancer',
                'The project is spec\'d as a one-week throwaway',
                'No decision-maker can join discovery and weekly demos',
                'You expect a big-bang rewrite with no phased delivery',
            ],
        },
        customCta: {
            title: 'Ready to Build Production-Grade Software?',
            subtitle: 'Tell us what you\'re building. You\'ll get a senior engineer\'s honest assessment and a fixed-scope proposal within 72 hours.',
            buttonText: 'Get Your Proposal — Free',
            bullets: [
                'A senior team shipping weekly from day one',
                'Fixed-scope pricing with full IP transfer',
                'Architecture built for the next 5 years, not the demo',
            ],
        },
        seo: {
            title: 'Custom Software Development Company | SaaS, Web & Mobile Apps',
            metaDescription: 'Custom software development company for startups & enterprises in the USA and India — multi-tenant SaaS platforms, web & mobile apps, cloud & DevOps, and application modernization under one roof.',
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
            {
                question: 'How much does custom software development cost?',
                answer: 'A production-ready MVP starts at $9,999, full multi-tenant SaaS platforms at $24,999, and enterprise modernization is custom-scoped. Because our senior engineering team operates from India serving US and global clients, you get top-tier quality at 40–60% below typical US agency rates — with fixed-scope quotes, not open-ended hourly billing.',
            },
            {
                question: 'Can US and European companies outsource software development to you?',
                answer: 'Yes — most of our clients are in the USA and Europe. We provide overlapping working hours, daily async updates, US-style contracts with NDA and full IP transfer, and a single senior point of contact, making offshore development feel like an in-house team.',
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
            title: 'SaaS SEO Agency | B2B SaaS SEO Services That Drive Pipeline',
            metaDescription: 'Brynex Labs is a SaaS SEO agency for B2B companies in the USA & India. We turn organic traffic into demo requests, pipeline & MRR with BOFU keywords, programmatic SEO, and CRO.',
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
            {
                question: 'How much do SaaS SEO services cost?',
                answer: 'Engagements typically start at $1,500–$3,000/month for growth-stage SaaS companies and scale with scope. Every plan ties deliverables to pipeline metrics — demo requests and signups — not vanity traffic.',
            },
            {
                question: 'Do you work with SaaS companies outside India?',
                answer: 'Yes — we work with B2B SaaS companies in the USA, UK, Australia, and India. Strategy, content, and reporting are built for the market you sell into, including US-specific keyword and competitor research.',
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
