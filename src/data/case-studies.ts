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
        title: 'Engineering a High-Performance Front End for an AI Recruitment Platform',
        clientName: 'RegorTalent',
        industry: 'AI-driven recruitment (HR tech) · Early-stage startup',
        summary:
            'RegorTalent needed a fast, dependable front end for an AI recruitment platform that kept pace with a startup shipping weekly. Brynex Labs built the React interface and an Atlassian-integrated support system — cutting support resolution time 30%, support costs 70%, and post-deployment issues 20%.',
        heroImage: '/images/case-studies/regortalent-hero.jpg',
        seo: {
            title: 'RegorTalent Case Study: AI Recruitment Platform Front End | Brynex Labs',
            metaDescription:
                'How Brynex Labs engineered RegorTalent\'s React/Redux front end and Atlassian support system — 30% faster ticket resolution, 70% lower support costs, 20% fewer bugs.',
        },
        snapshot: [
            { label: 'Industry', value: 'AI recruitment (HR tech)' },
            { label: 'Stage', value: 'Fast-paced early-stage startup' },
            { label: 'Scope', value: 'Front-end architecture, build & support tooling' },
            { label: 'Working model', value: 'Embedded team, weekly iterative releases' },
        ],
        sections: [
            {
                heading: 'About RegorTalent',
                paragraphs: [
                    'RegorTalent is an AI-driven recruitment platform built to help hiring teams move faster — bringing sourcing, screening, and candidate matching into one workflow instead of a dozen disconnected tools. Recruiters live inside it all day, which means the interface is not a nice-to-have; it is the product.',
                    'As an early-stage startup shipping quickly, RegorTalent needed a front end that could evolve week over week without quietly accumulating the kind of technical debt that slows every future release. They partnered with Brynex Labs to own that layer.',
                ],
            },
            {
                heading: 'The Challenge',
                paragraphs: [
                    'Recruitment software lives or dies on the interface. Recruiters spend their entire day inside candidate lists, pipelines, and match results — data-dense views that have to stay fast and legible even as thousands of records flow through them. A sluggish or confusing screen does not just annoy users; it costs the platform credibility with the hiring teams evaluating it.',
                    'RegorTalent needed three things at once: a genuinely responsive, high-performance UI with UX polished enough to build trust; an API layer reliable enough that an expired token or a transient network error never dumped a recruiter out of their work mid-task; and a way to keep a fast-growing support load from swamping the team and stalling the release cycle.',
                ],
            },
            {
                heading: 'Our Approach',
                paragraphs: [
                    'Brynex embedded with RegorTalent as their front-end engineering partner, working in the tight, feedback-driven loop a startup at this stage needs. We shipped in short cycles and folded real recruiter feedback back into the product continuously, so decisions were validated against actual usage rather than assumptions.',
                    'Crucially, we optimized for maintainability from day one instead of optimizing for a demo. That meant a component architecture designed to be reused, an API layer designed to fail gracefully, and a support system designed to scale with the user base — the unglamorous foundations that let a small team keep shipping fast without breaking things.',
                ],
            },
            {
                heading: 'What We Built',
                paragraphs: [
                    'We built and owned the front end recruiters work in every day: a responsive, high-performance interface in React.js, Tailwind CSS, and Redux, backed by a reliable API layer and a structured support pipeline.',
                ],
                bullets: [
                    'A reusable component system — shared, well-bounded UI primitives that made new features cheaper and safer to ship, and cut the front-end codebase roughly 25%.',
                    'A centralized API layer built on Axios with interceptors handling authentication and error handling in one place, so every request got consistent auth, retry, and error behavior without duplicating logic across the app.',
                    'An Atlassian-integrated support system, built on the Atlassian API, that turned an ad-hoc support process into a structured, trackable pipeline — and gave engineering a clean signal loop from production back into the backlog.',
                ],
            },
            {
                heading: 'The Engineering Decisions Behind It',
                paragraphs: [
                    'Redux for shared state: in an app where the same candidate, filter, and pipeline state is read and mutated across many views, we centralized it in Redux so the UI stayed consistent and predictable — with deliberate attention to render performance so large candidate lists stayed smooth rather than thrashing on every update.',
                    'Axios interceptors as the reliability backbone: auth-token handling and error normalization belong in one place, not scattered across feature code. A single interceptor layer gave us one place to refresh tokens, handle 401s, and surface consistent error states. That centralization is a big part of why post-deployment issues dropped around 20% — fewer places for the same class of bug to hide.',
                    'Reusable components as a debt strategy: every shared primitive we extracted was one less place for a bug to live. The ~25% reduction in code was not cosmetic — less code meant fewer regressions and faster, safer releases for a team that had to ship weekly.',
                    'Atlassian for support: wiring support into Atlassian\'s tooling — structured tickets, routing, and knowledge capture through the Atlassian API — brought resolution time down 30% and support costs down 70%, while turning support noise into structured product signal.',
                ],
            },
            {
                heading: 'The Impact',
                paragraphs: [
                    'The combination compounded: a leaner, reusable front end meant fewer bugs and faster features; a centralized, resilient API layer meant recruiters stayed in flow; and a structured support system meant issues were resolved faster and cheaper, with the learnings feeding straight back into the roadmap.',
                    'For a startup whose competitive edge is speed, the result was the ability to keep shipping quickly without the usual tax — a front end that got easier to change over time, not harder.',
                ],
            },
        ],
        techStack: [
            { name: 'React.js', icon: 'React' },
            { name: 'Redux', icon: 'Redux' },
            { name: 'Tailwind CSS', icon: 'TW' },
            { name: 'Axios', icon: 'Ax' },
            { name: 'REST APIs', icon: 'API' },
            { name: 'Atlassian API', icon: 'Atl' },
            { name: 'JavaScript', icon: 'JS' },
        ],
        results: [
            { label: 'Faster ticket resolution', value: '30%', context: 'Atlassian-integrated support' },
            { label: 'Lower support costs', value: '70%' },
            { label: 'Fewer post-deploy issues', value: '20%' },
            { label: 'Less front-end code', value: '25%', context: 'reusable component system' },
        ],
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
                    'ExamPapers turned mock creation from a manual, one-at-a-time chore into an automated pipeline, so learners get fresh, varied practice instead of a single shared paper — and instant, topic-level feedback instead of a bare score.',
                    'The result is a platform where the content scales with demand and the learner always knows what to work on next, built on a foundation meant to hold up when it matters most: the night before the exam.',
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
            { label: 'AI mock generation', value: 'End-to-end', context: 'source material to scored mock' },
            { label: 'Scoring & topic feedback', value: 'Instant', context: 'not just a final number' },
            { label: 'Practice per learner', value: 'Fresh & varied', context: 'not a single static paper' },
            { label: 'Designed for exam season', value: 'Peak-ready', context: 'resilient under demand spikes' },
        ],
        publishedAt: '2026-03-25',
        updatedAt: '2026-07-24',
    },
];
