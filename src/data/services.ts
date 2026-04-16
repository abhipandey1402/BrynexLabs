export interface ServiceDetail {
    slug: string;
    title: string;
    description: string;
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
        slug: 'custom-software-development',
        title: 'Custom Software Development',
        description: 'Architect and build bespoke applications that solve your specific business challenges.',
        seo: {
            title: 'Custom Software Development Services | Brynex Labs',
            metaDescription: 'Scalable, enterprise-grade custom software development. We build bespoke applications tailored to your business goals using modern tech stacks.',
        },
        challenges: [
            'Inefficient manual processes slowing down growth',
            'Legacy systems that are difficult to maintain or scale',
            'Off-the-shelf software doesn\'t meet unique business needs',
            'Lack of integration between different business platforms',
        ],
        solutions: [
            'Full-cycle application development from discovery to deployment',
            'Modernization of legacy systems for better performance',
            'Seamless API integrations and data synchronization',
            'User-centric architecture designed for long-term scalability',
        ],
        techStack: [
            { name: 'Node.js', icon: 'Node' },
            { name: 'Python', icon: 'Python' },
            { name: 'Go', icon: 'Go' },
            { name: 'PostgreSQL', icon: 'DB' },
            { name: 'Docker', icon: 'Docker' },
            { name: 'Kubernetes', icon: 'K8s' },
        ],
        faqs: [
            {
                question: 'How long does a custom software project typically take?',
                answer: 'Timelines vary based on complexity. A Minimum Viable Product (MVP) can take 8-12 weeks, while larger enterprise systems may take 6+ months.',
            },
            {
                question: 'Do you provide ongoing support after launch?',
                answer: 'Yes, we offer flexible maintenance and support packages to ensure your software stays secure, updated, and high-performing.',
            },
            {
                question: 'Can you integrate with our existing tools?',
                answer: 'Absolutely. We specialize in building custom APIs and integrations to ensure your new software works seamlessly with your current ecosystem.',
            },
        ],
    },
    {
        slug: 'saas-product-engineering',
        title: 'SaaS Product Engineering',
        description: 'Launch your product with scalable, production-grade code and modern architecture.',
        seo: {
            title: 'SaaS Product Engineering & Development | Brynex Labs',
            metaDescription: 'Expert SaaS engineering services for startups and enterprises. We build multi-tenant, scalable, and secure SaaS platforms.',
        },
        challenges: [
            'Difficulty scaling infrastructure as user base grows',
            'Security concerns regarding multi-tenant data isolation',
            'Slow time-to-market for new features',
            'High operational costs due to inefficient architecture',
        ],
        solutions: [
            'Robust multi-tenant architecture and data isolation',
            'Serverless and auto-scaling cloud infrastructure',
            'Continuous Integration/Continuous Deployment (CI/CD) pipelines',
            'Subscription management and payment gateway integration',
        ],
        techStack: [
            { name: 'Next.js', icon: 'Next' },
            { name: 'TypeScript', icon: 'TS' },
            { name: 'AWS', icon: 'AWS' },
            { name: 'Stripe', icon: 'Stripe' },
            { name: 'Redis', icon: 'Redis' },
            { name: 'Terraform', icon: 'Terra' },
        ],
        faqs: [
            {
                question: 'How do you handle multi-tenancy?',
                answer: 'We implement strict data isolation layers at the database or schema level to ensure complete privacy and security for every user.',
            },
            {
                question: 'Can you help with migrating an existing app to SaaS?',
                answer: 'Yes, we specialize in refactoring monoliths into scalable multi-tenant architectures suitable for SaaS models.',
            },
            {
                question: 'What payment providers do you support?',
                answer: 'We have deep experience with Stripe, Chargebee, and PayPal, but we can integrate with any modern payment gateway.',
            },
        ],
    },
    {
        slug: 'ai-agents-automation',
        title: 'AI Agents & Automation',
        description: 'Build autonomous AI agents to handle complex workflows, customer support, and data analysis 24/7.',
        seo: {
            title: 'AI Software Development & Automation Agents | Brynex Labs',
            metaDescription: 'Transform your business with autonomous AI agents. We specialize in LLM integration, custom automation, and AI-powered workflows.',
        },
        challenges: [
            'Excessive time spent on repetitive administrative tasks',
            'Scaling customer support without proportional cost increases',
            'Difficulty extracting actionable insights from large datasets',
            'Human error in complex, multi-step workflows',
        ],
        solutions: [
            'Custom AI agents built on GPT-4, Claude, or Llama models',
            'Retrieval-Augmented Generation (RAG) for internal knowledge bases',
            'Automated workflow orchestration using LangChain or AutoGPT',
            'Intelligent data processing and predictive analytics',
        ],
        techStack: [
            { name: 'OpenAI', icon: 'AI' },
            { name: 'LangChain', icon: 'LC' },
            { name: 'Pinecone', icon: 'Vector' },
            { name: 'Python', icon: 'Py' },
            { name: 'Anthropic', icon: 'Ant' },
            { name: 'HuggingFace', icon: 'HF' },
        ],
        faqs: [
            {
                question: 'Are my business data safe with AI?',
                answer: 'Yes. We prioritize privacy by using private VPCs, local LLMs where necessary, and ensuring no data is used for training public models.',
            },
            {
                question: 'Can AI agents really handle complex tasks?',
                answer: 'Modern AI agents can execute multi-step reasoning, use external tools (APIs), and make decisions based on defined constraints.',
            },
            {
                question: 'How much does it cost to run AI agents?',
                answer: 'Costs depend on usage and model selection. We optimize token usage and implement caching to keep operational costs low.',
            },
        ],
    },
    {
        slug: 'cloud-infrastructure',
        title: 'Cloud & Infrastructure',
        description: 'Deploy with confidence using secure, scalable, and automated cloud solutions.',
        seo: {
            title: 'Cloud Infrastructure & DevOps Services | Brynex Labs',
            metaDescription: 'Optimize your cloud presence with expert DevOps and infrastructure services. We specialize in AWS, Azure, GCP, and Kubernetes.',
        },
        challenges: [
            'Frequent downtime and performance bottlenecks',
            'Manual deployment processes prone to error',
            'Skyrocketing cloud costs without clear ROI',
            'Lack of disaster recovery and security compliance',
        ],
        solutions: [
            'Infrastructure as Code (IaC) using Terraform or Pulumi',
            'Zero-downtime deployment pipelines',
            'Cloud cost optimization and performance monitoring',
            'Security hardening and automated backups',
        ],
        techStack: [
            { name: 'AWS', icon: 'AWS' },
            { name: 'GCP', icon: 'GCP' },
            { name: 'Azure', icon: 'Azure' },
            { name: 'Terraform', icon: 'Terra' },
            { name: 'Kubernetes', icon: 'K8s' },
            { name: 'GitHub Actions', icon: 'CI' },
        ],
        faqs: [
            {
                question: 'Which cloud provider do you recommend?',
                answer: 'It depends on your specific needs. AWS is great for mature ecosystems, GCP for data/AI, and Azure for enterprise integrations.',
            },
            {
                question: 'How do you ensure our infrastructure is secure?',
                answer: 'We follow the principle of least privilege, implement SOC2/HIPAA compliant patterns, and use automated security scanning.',
            },
            {
                question: 'Can you help reduce our monthly cloud bill?',
                answer: 'Yes, our cloud audit service typically identifies 20-40% savings through right-sizing and architectural improvements.',
            },
        ],
    },
    {
        slug: 'web-mobile-development',
        title: 'Web & Mobile Development',
        description: 'Engage users with lightning-fast, SEO-optimized websites and high-performance mobile apps.',
        seo: {
            title: 'High-Performance Web & Mobile App Development | Brynex Labs',
            metaDescription: 'Build stunning, fast, and responsive web and mobile applications. Specializing in Next.js, React Native, and high-performance UI/UX.',
        },
        challenges: [
            'Slow page loads hurting conversion and SEO',
            'Poor mobile experience driving away users',
            'Inconsistent UI/UX across different platforms',
            'Difficulty maintaining feature parity between web and mobile',
        ],
        solutions: [
            'Performant web apps built with Next.js and React',
            'Cross-platform mobile apps using React Native',
            'Pixel-perfect, responsive UI design',
            'Headless CMS integrations for flexible content management',
        ],
        techStack: [
            { name: 'Next.js', icon: 'Next' },
            { name: 'React Native', icon: 'Mobile' },
            { name: 'Tailwind CSS', icon: 'CSS' },
            { name: 'Framer Motion', icon: 'Anim' },
            { name: 'Sanity.io', icon: 'CMS' },
            { name: 'Vercel', icon: 'V' },
        ],
        faqs: [
            {
                question: 'Native vs. Cross-platform: which is better?',
                answer: 'For most business apps, cross-platform (React Native) is better as it saves 40% in cost while maintaining native performance.',
            },
            {
                question: 'How do you optimize for SEO?',
                answer: 'We use Server-Side Rendering (SSR), optimized meta tags, semantic HTML, and lightning-fast asset delivery.',
            },
            {
                question: 'Can you build a Progressive Web App (PWA)?',
                answer: 'Yes, we can build PWAs that offer app-like functionality, offline access, and push notifications through the browser.',
            },
        ],
    },
    {
        slug: 'application-modernization',
        title: 'Application Modernization',
        description: 'Transform legacy systems into modern, efficient, and secure digital assets.',
        seo: {
            title: 'Legacy Application Modernization Services | Brynex Labs',
            metaDescription: 'Modernize your legacy software with expert refactoring, cloud migration, and architecture updates. Improve performance, security, and scalability.',
        },
        challenges: [
            'System is slow and expensive to maintain',
            'Security vulnerabilities in outdated frameworks',
            'Difficulty finding talent for legacy tech stacks',
            'Inability to integrate with modern cloud services',
        ],
        solutions: [
            'Phased migration to modern architectures (Microservices/Serverless)',
            'Legacy code refactoring and framework upgrades',
            'Database migration and optimization',
            'Implementing modern CI/CD and automated testing',
        ],
        techStack: [
            { name: 'Docker', icon: 'Docker' },
            { name: 'Node.js', icon: 'Node' },
            { name: 'PostgreSQL', icon: 'DB' },
            { name: 'Terraform', icon: 'Terra' },
            { name: 'AWS', icon: 'AWS' },
            { name: 'Redis', icon: 'Redis' },
        ],
        faqs: [
            {
                question: 'Do we need to rewrite everything from scratch?',
                answer: 'Not necessarily. We often use the "Strangler Pattern" to migrate functionality piece-by-piece, reducing risk and allowing you to stay operational.',
            },
            {
                question: 'How long does a modernization project take?',
                answer: 'It depends on the scope. Small refactoring can take weeks, while a full cloud migration of an enterprise system might take several months.',
            },
            {
                question: 'Will there be downtime during the migration?',
                answer: 'We aim for zero-downtime migrations by running old and new systems in parallel until we are confident in the switch.',
            },
        ],
    },
    {
        slug: 'saas-seo',
        title: 'SaaS SEO & Organic Growth',
        description: 'Stop renting your audience from ad platforms. Build a compounding organic growth engine that scales MRR autonomously.',
        hook: 'Stop renting your audience from ad platforms. We help B2B SaaS companies transition from high-CAC paid campaigns to a high-converting organic pipeline.',
        metrics: [
            { value: '300%', label: 'Average Traffic Increase' },
            { value: '60%', label: 'Lower Cost Per Acquisition' },
            { value: '10x', label: 'ROI vs Paid Channels' },
        ],
        seo: {
            title: 'SaaS SEO & Organic Growth | Brynex Labs',
            metaDescription: 'Drive high-intent traffic and scale your SaaS MRR with our specialized technical, programmatic, and content-driven SEO strategies.',
        },
        challenges: [
            'Paid ad channels (CAC) are eating your profit margins and scaling is impossible without bleeding cash.',
            'Your React/Next.js app is completely invisible to Google search bots due to SPA rendering walls.',
            'You rank for low-intent "fluff" keywords that bring traffic but absolutely zero product trials.',
            'Competitors with inferior products are dominating your niche using simple comparison pages.',
        ],
        solutions: [
            'Zero-CAC Core Engine: Shift your acquisition from rented paid ads to an owned, compounding organic traffic pipeline.',
            'SPA Technical Mastery: We implement comprehensive SSR/SSG for Next.js & React to obliterate rendering walls and guarantee indexing.',
            'BOFU Conversion Architecture: Stop targeting informational fluff and dominate bottom-of-the-funnel keywords where buyers are actively ready to subscribe.',
            'Programmatic SEO (pSEO): Rapidly deploy hundreds of automated "Alternative to X" comparison pages to steal competitor traffic.',
            'Semantic Authority Building: Algorithmically outrank massive legacy competitors using targeted Digital PR and white-hat data-backed links.',
        ],
        techStack: [
            { name: 'Ahrefs', icon: 'Ahf' },
            { name: 'Semrush', icon: 'Sem' },
            { name: 'GSC', icon: 'GSC' },
            { name: 'GA4', icon: 'GA4' },
            { name: 'Next.js', icon: 'Next' },
            { name: 'Screaming Frog', icon: 'Frog' },
        ],
        faqs: [
            {
                question: 'How long does it take to see results from SaaS SEO?',
                answer: 'While technical improvements can show rapid indexing benefits within weeks, a comprehensive content and authority strategy typically takes 3-6 months to show significant MRR impact.',
            },
            {
                question: 'How do you handle SEO for React/Next.js apps?',
                answer: 'We specialize in optimizing JavaScript frameworks. We implement Server-Side Rendering (SSR), Static Site Generation (SSG), dynamic sitemaps, and optimized metadata to ensure flawless crawling.',
            },
            {
                question: 'What makes SEO for SaaS different from normal SEO?',
                answer: 'SaaS SEO uniquely focuses on product-led growth (PLG), feature/use-case pages, comparison pages (vs. competitors), and driving free trials rather than simple form fills or e-commerce purchases.',
            },
        ],
        process: [
            { title: 'Technical & Architecture Audit', description: 'We resolve crawlability blockers, implement Next.js Server-Side Rendering (SSR), fix Core Web Vitals, and perfectly structure your URL hierarchy.' },
            { title: 'BOFU Content Engine', description: 'We launch comparison pages (Alternative to X), use-case features, and integration pages designed strictly for lead conversion.' },
            { title: 'Programmatic Scaling', description: 'Using pSEO, we generate high-quality hyper-targeted landing pages around combinations of your integrations and use-cases to dominate long-tail intent keywords.' },
            { title: 'Semantic Authority PR', description: 'We acquire massive domain authority explicitly through data-backed digital PR and partnerships relevant strictly to the B2B SaaS space.' },
        ],
        targetAudience: {
            for: [
                'Post-Seed or Series A+ B2B SaaS companies',
                'Products with high Customer Lifetime Value (LTV)',
                'Companies spending $10k+/mo on paid ads with diminishing returns',
                'Teams with React or Next.js frontends struggling with organic indexing',
            ],
            notFor: [
                'Companies seeking cheap, high-volume generic AI content farms',
                'Businesses expecting overnight 10x results without technical investment',
                'Teams unwilling to implement crucial engineering and architecture recommendations',
            ]
        },
        testimonial: {
            quote: 'Working with Brynex Labs completely shifted our growth model. We were burning cash on Google Ads with horrible CAC. In 5 months, they built an organic architecture that now drives 60% of our enterprise demos on autopilot.',
            author: 'Michael R.',
            role: 'VP of Growth, Enterprise SaaS Platform',
        },
        customCta: {
            title: 'Stop Burning Cash on Paid Ads',
            subtitle: 'Get a free, no-obligation Technical SEO Audit and a custom 6-month organic growth blueprint for your SaaS.',
            buttonText: 'Request Free Audit',
        }
    },
];
