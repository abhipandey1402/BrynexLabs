import type { BlogCategory } from './blog';

/**
 * Real, named authors for E-E-A-T and AI-citation signals. Every blog post is
 * attributed to one of these people by topic (see {@link getAuthorForCategory}),
 * and each renders a `Person` entity in the article's structured data plus a
 * dedicated author page at `/authors/<slug>`.
 */
export interface Author {
    slug: string;
    name: string;
    jobTitle: string;
    /** One-paragraph, first-person-neutral bio. Factual — no invented credentials. */
    bio: string;
    /** Short line shown under bylines. */
    tagline: string;
    /** Only real external profiles belong here (Person.sameAs). Empty until provided. */
    sameAs?: string[];
}

export const authors: Author[] = [
    {
        slug: 'abhi-pandey',
        name: 'Abhi Pandey',
        jobTitle: 'Senior Software Engineer',
        tagline: 'Senior Software Engineer at Brynex Labs',
        bio: 'Abhi Pandey is a Senior Software Engineer at Brynex Labs, where he builds production-grade AI agents, RAG pipelines, and full-stack SaaS platforms with LangChain, LangGraph, Python, and Next.js. He writes about applied AI engineering, software architecture, and shipping reliable systems to production.',
    },
    {
        slug: 'shashi-tiwari',
        name: 'Shashi Tiwari',
        jobTitle: 'Head of SEO',
        tagline: 'Head of SEO at Brynex Labs',
        bio: 'Shashi Tiwari is Head of SEO at Brynex Labs, leading revenue-focused SaaS SEO, technical SEO, and generative engine optimization (GEO) for B2B software companies. He writes about turning organic search into pipeline — from BOFU keyword strategy to AI-search visibility.',
    },
];

const BY_SLUG = new Map(authors.map((a) => [a.slug, a] as const));

/** The engineering author is the default byline for all technical topics. */
export const DEFAULT_AUTHOR = authors[0];

export function getAuthorBySlug(slug: string): Author | undefined {
    return BY_SLUG.get(slug);
}

export function getAllAuthorSlugs(): string[] {
    return authors.map((a) => a.slug);
}

/**
 * Topic → author. SEO/marketing content is attributed to the Head of SEO;
 * everything else (AI, SaaS, Cloud, DevOps, Engineering) to the Senior
 * Software Engineer. Kept as a pure function so it works for both static and
 * CMS posts regardless of the free-text author stored on the record.
 */
export function getAuthorForCategory(category?: BlogCategory | string): Author {
    const c = String(category ?? '').toLowerCase();
    if (c === 'seo' || c === 'marketing') {
        return getAuthorBySlug('shashi-tiwari') ?? DEFAULT_AUTHOR;
    }
    return DEFAULT_AUTHOR;
}
