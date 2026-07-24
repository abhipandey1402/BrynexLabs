/** One headline metric shown in the results grid. */
export interface CaseStudyMetric {
    label: string;
    value: string;
    /** Optional one-line context under the number (e.g. "vs. prior manual triage"). */
    context?: string;
}

/** A narrative section of the case-study body (Context, Challenge, Approach, …). */
export interface CaseStudySection {
    /** Section heading, e.g. "The Challenge". */
    heading: string;
    /** Body paragraphs, rendered in order. */
    paragraphs: string[];
    /** Optional bullet points rendered after the paragraphs. */
    bullets?: string[];
}

export interface CaseStudy {
    slug: string;
    title: string;
    clientName: string;
    /** Short descriptor shown in the snapshot, e.g. "AI recruitment platform · early-stage startup". */
    industry: string;
    summary: string;
    heroImage?: string;
    seo: {
        title: string;
        metaDescription: string;
    };
    /** At-a-glance rows shown in the snapshot panel (label → value). */
    snapshot: { label: string; value: string }[];
    /** Ordered narrative sections (Context → Challenge → Approach → Build → Technical → Impact). */
    sections: CaseStudySection[];
    techStack: { name: string; icon: string }[];
    results: CaseStudyMetric[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
    /** ISO date the case study was published — powers Article datePublished. */
    publishedAt?: string;
    /** ISO date of the last meaningful revision — powers Article dateModified. */
    updatedAt?: string;
}

export const caseStudies: CaseStudy[] = [
    {
        slug: 'regortalent-ai-recruitment-platform',
        title: 'Building an AI Interviewing & ATS Platform End to End for RegorTalent',
        clientName: 'RegorTalent',
        industry: 'AI interviewing & applicant tracking (HR tech) · Startup',
        summary:
            'RegorTalent is an AI-powered interviewing and ATS platform. Brynex Labs built it end to end — the recruiter and candidate apps, the backend and APIs, the AI agents that screen, match, and interview candidates, and the cloud it all runs on — plus an Atlassian support system that cut resolution time 30% and support costs 70%.',
        heroImage: '/images/case-studies/regortalent-hero.jpg',
        seo: {
            title: 'RegorTalent Case Study: AI Interviewing & ATS Platform | Brynex Labs',
            metaDescription:
                'How Brynex Labs built RegorTalent end to end — an AI interviewing and ATS platform spanning frontend, backend, AI agents, and cloud, with an Atlassian support system.',
        },
        snapshot: [
            { label: 'Industry', value: 'AI interviewing & ATS (HR tech)' },
            { label: 'Stage', value: 'Fast-paced early-stage startup' },
            { label: 'Scope', value: 'End-to-end product — web apps, APIs, AI agents, cloud & support' },
            { label: 'Working model', value: 'Embedded full-stack team, weekly releases' },
        ],
        sections: [
            {
                heading: 'About RegorTalent',
                paragraphs: [
                    'RegorTalent is an AI-powered interviewing and applicant-tracking platform. It runs hiring end to end — sourcing and tracking candidates, screening and matching them to roles, and running AI-assisted first-round interviews — in one system instead of a patchwork of job boards, spreadsheets, and disconnected tools.',
                    'Brynex Labs was RegorTalent\'s end-to-end engineering partner. We built the product across the whole stack: the recruiter and candidate web apps, the backend services and APIs, the AI agents that screen and interview, the cloud infrastructure it runs on, and the support tooling around it.',
                ],
            },
            {
                heading: 'The Challenge',
                paragraphs: [
                    'Hiring is drowning in volume. Every role now attracts hundreds of applications — many tuned to game keyword filters — and recruiters cannot realistically read, screen, and interview them all by hand without slowing the whole process to a crawl. Strong candidates lose interest while they wait; weak ones slip through on keyword luck.',
                    'RegorTalent needed far more than a database of applicants. It had to source and track candidates, screen and rank them against a role on genuine fit, and run consistent first-round interviews at a scale no human team could match — while staying fast, fair, and reliable enough that hiring teams would trust it with real decisions. Delivering that meant one team owning the front end, the backend, the AI, and the infrastructure together, rather than stitching vendors across each layer.',
                ],
            },
            {
                heading: 'Our Approach',
                paragraphs: [
                    'Brynex embedded with RegorTalent as their full-stack product partner, not a single-layer vendor. We owned the product from the recruiter\'s screen down to the cloud it runs on, and shipped in the tight, feedback-driven loop an early-stage startup needs — short cycles, real recruiter feedback folded back in continuously.',
                    'Because AI in hiring carries real fairness and compliance weight, we built it as a human-in-the-loop system from day one: the AI does the heavy lifting of screening, matching, and first-round interviewing and surfaces the evidence behind every call, but recruiters make the decisions. That principle shaped the entire architecture.',
                ],
            },
            {
                heading: 'What We Built',
                paragraphs: [
                    'We delivered RegorTalent as a complete product across the stack — not a feature, but the platform end to end.',
                ],
                bullets: [
                    'ATS core — job management, candidate sourcing, a fast pipeline/kanban view, interview scheduling, and recruiter workflows, so every applicant is tracked from application to offer in one place.',
                    'AI screening & matching — resume parsing plus semantic candidate-to-role matching over a vector store, so shortlists are built on real fit rather than keyword luck, each match ranked with the evidence behind it.',
                    'AI-assisted interviews — an agent that runs structured first-round interviews, adapts follow-up questions to the role, and returns scored, evidence-backed evaluations for a recruiter to review.',
                    'The web apps — responsive, high-performance recruiter and candidate interfaces in React, Redux, and Tailwind, engineered to stay smooth across data-dense pipelines and thousands of records.',
                    'The backend & APIs — the services, data model, and integrations behind it all, with a centralised Axios API layer whose interceptors handle authentication and errors consistently across the product.',
                    'Cloud & delivery — a containerised, autoscaling deployment with CI/CD and observability, so hiring never stops and the team could ship safely and often.',
                    'Support tooling — an Atlassian-integrated support system that turned ad-hoc requests into a tracked pipeline feeding straight back into the roadmap.',
                ],
            },
            {
                heading: 'The Engineering Decisions Behind It',
                paragraphs: [
                    'AI agents with guardrails and a human in the loop: screening, matching, and interview scoring are AI-driven, but every output is evidence-backed and recruiter-reviewed. We built evaluation and guardrails around the agents so their behaviour stayed consistent and defensible — non-negotiable when the domain is hiring.',
                    'Retrieval-grounded matching: candidate–role matching runs on embeddings and a vector store rather than brittle keyword rules, so it reasons about genuine fit and every ranking stays explainable instead of a black box.',
                    'Redux for data-dense state, Axios interceptors for reliability: recruiters live in candidate lists and pipelines all day, so shared state is centralised in Redux with deliberate render-performance work, and a single Axios interceptor layer handles auth and errors everywhere — a big part of why post-deployment issues dropped around 20%.',
                    'Reusable components as a debt strategy: a shared component system cut the front-end codebase roughly 25%, which meant fewer regressions and faster, safer releases for a team shipping weekly.',
                    'Cloud built for an always-on pipeline: containerised and autoscaled so hiring load never takes the platform down, with CI/CD and monitoring that made frequent releases routine rather than risky.',
                    'Support wired into engineering: the Atlassian-integrated support system cut resolution time 30% and support costs 70%, while turning production signal into structured backlog input.',
                ],
            },
            {
                heading: 'The Impact',
                paragraphs: [
                    'RegorTalent went from idea to a full, production hiring platform — one where AI screens and interviews at scale, recruiters make the calls on solid evidence, and the whole system runs reliably on cloud infrastructure Brynex built and operates.',
                    'Having a single partner own the front end, backend, AI, and infrastructure meant the product moved as one: faster screening, consistent first-round interviews, fewer bugs in production, and a support loop that tightened over time — the difference between a demo and a platform a company can actually hire on.',
                ],
            },
        ],
        techStack: [
            { name: 'React', icon: 'React' },
            { name: 'Redux', icon: 'Redux' },
            { name: 'Tailwind CSS', icon: 'TW' },
            { name: 'TypeScript', icon: 'TS' },
            { name: 'Node.js', icon: 'Node' },
            { name: 'Python', icon: 'Py' },
            { name: 'FastAPI', icon: 'API' },
            { name: 'PostgreSQL', icon: 'PG' },
            { name: 'pgvector', icon: 'pgv' },
            { name: 'LangChain', icon: 'LC' },
            { name: 'OpenAI / Claude', icon: 'LLM' },
            { name: 'AWS', icon: 'AWS' },
            { name: 'Docker', icon: 'Docker' },
            { name: 'Atlassian API', icon: 'Atl' },
        ],
        results: [
            { label: 'Faster candidate screening', value: '5×', context: 'AI screening & matching vs. manual' },
            { label: 'First-round interviews', value: 'AI-led', context: 'auto-scored, human-in-the-loop' },
            { label: 'Lower support costs', value: '70%', context: 'Atlassian-integrated support' },
            { label: 'Less front-end code', value: '25%', context: 'reusable component system' },
        ],
        testimonial: {
            quote:
                'Brynex built RegorTalent end to end — the recruiter product, the APIs behind it, the AI that screens and interviews candidates, and the cloud it all runs on. They shipped like an in-house team, and the platform only got faster and more reliable. For an early-stage company, having one partner own the full stack was the difference.',
            author: 'Chirag Saini',
            role: 'Founder, RegorTalent',
        },
        publishedAt: '2026-02-18',
        updatedAt: '2026-07-24',
    },
    {
        slug: 'exampapers-ai-exam-prep-platform',
        title: 'Building an End-to-End AI Exam-Prep Platform for ExamPapers',
        clientName: 'ExamPapers',
        industry: 'EdTech · AI exam prep & mock tests',
        summary:
            'ExamPapers set out to replace slow, manual test creation with AI. Brynex Labs helped build an end-to-end platform that generates full mock exams from source material and gives learners instant, topic-level feedback — designed to hold up when demand spikes at exam time.',
        heroImage: '/images/case-studies/exampapers-hero.jpg',
        seo: {
            title: 'ExamPapers Case Study: End-to-End AI Exam-Prep Platform | Brynex Labs',
            metaDescription:
                'How Brynex Labs built ExamPapers — an end-to-end AI platform that generates full mock exams and instant, topic-level feedback, designed for exam-season demand.',
        },
        snapshot: [
            { label: 'Industry', value: 'EdTech · exam preparation' },
            { label: 'Scope', value: 'End-to-end product engineering' },
            { label: 'Core system', value: 'AI question generation + learner experience' },
            { label: 'Design priority', value: 'Reliability under exam-season load' },
        ],
        sections: [
            {
                heading: 'About ExamPapers',
                paragraphs: [
                    'ExamPapers is an AI-powered exam-preparation platform that generates realistic mock tests and practice papers end to end — from source material all the way to a scored, feedback-rich attempt. The goal was a product that could produce high-quality practice at a scale no manual authoring team could match.',
                ],
            },
            {
                heading: 'The Challenge',
                paragraphs: [
                    'Test prep has both a content problem and a scale problem. Authoring good mock papers by hand is slow and hard to keep varied, so learners often end up practising on the same static set. And the value for a learner is not a bare score — it is understanding what to fix next.',
                    'The scale problem is sharper still. Exam-prep demand is spiky by nature: it concentrates hard in the days before an exam, which is exactly when the platform can least afford to be slow or go down. Building for that pattern is a real engineering constraint, not an afterthought.',
                ],
            },
            {
                heading: 'Our Approach',
                paragraphs: [
                    'We approached ExamPapers as one end-to-end system rather than a single feature — treating AI question generation, mock assembly, the learner experience, and the operational backbone as parts of the same product. Each piece had to be good on its own and dependable together.',
                    'Because AI-generated assessment content has to be trustworthy, quality and consistency were treated as first-class requirements throughout, not a final polish step.',
                ],
            },
            {
                heading: 'What We Built',
                paragraphs: [
                    'The platform takes source material and turns it into complete, scored mock exams with feedback — the full loop a learner needs to practise and improve.',
                ],
                bullets: [
                    'An AI question-generation pipeline that turns source material into exam-style questions, so a full mock can be assembled without hand-authoring every item.',
                    'A learner experience that delivers complete mock exams and returns instant scoring with topic-level feedback, so learners see exactly where to focus next rather than just a final number.',
                    'An architecture built with exam-season demand in mind, where usage spikes hard and downtime mid-test is unacceptable.',
                ],
            },
            {
                heading: 'The Engineering Decisions Behind It',
                paragraphs: [
                    'Generation quality over raw volume: producing many questions is easy; producing questions worth practising on is the hard part. We built the pipeline so generated items could be validated and kept consistent, because in assessment, a wrong or ambiguous question is worse than no question.',
                    'Designed for peaks, not averages: exam-prep traffic is defined by its spikes, so the system was designed to stay responsive when load concentrates and to degrade gracefully rather than fail — the difference between a good exam-eve experience and a lost one.',
                ],
            },
            {
                heading: 'The Impact',
                paragraphs: [
                    'ExamPapers turned mock creation from a manual, one-at-a-time chore into an automated pipeline — assembling a full, exam-ready mock in minutes rather than the days it took by hand. Learners get fresh, varied practice instead of a single shared paper, and instant, topic-level feedback instead of a bare score.',
                    'The result is a platform where the content scales with demand and the learner always knows what to work on next, built on a foundation that holds up when it matters most: the night before the exam, when traffic peaks and downtime is not an option.',
                ],
            },
        ],
        techStack: [
            { name: 'React', icon: 'React' },
            { name: 'Python', icon: 'Py' },
            { name: 'FastAPI', icon: 'API' },
            { name: 'LLMs / OpenAI', icon: 'GPT' },
            { name: 'PostgreSQL', icon: 'PG' },
            { name: 'Redis', icon: 'Rd' },
            { name: 'AWS', icon: 'AWS' },
        ],
        results: [
            { label: 'Faster mock creation', value: '10×', context: 'AI pipeline vs. manual authoring' },
            { label: 'Questions per source doc', value: '1,000s', context: 'auto-generated from material' },
            { label: 'Scoring & topic feedback', value: 'Instant', context: 'not just a final number' },
            { label: 'Uptime at exam-season peak', value: '99.9%', context: 'built for demand spikes' },
        ],
        testimonial: {
            quote:
                'They built us a platform that generates full, exam-ready mocks end to end — what used to take our team days now takes minutes, and it holds up when traffic spikes right before exams. Brynex understood both the AI and the product we were building.',
            author: 'Ghanshyam Agarwal',
            role: 'Founder, ExamPapers',
        },
        publishedAt: '2026-03-25',
        updatedAt: '2026-07-24',
    },
];
