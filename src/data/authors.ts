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
    /** Visible profile links on the author page (label + href). Mirrors sameAs. */
    profileLinks?: { label: string; href: string }[];
    /** Other organizations this person works for, by @id (Person.worksFor). */
    alsoWorksFor?: { '@id': string; name: string; url: string }[];
}

export const authors: Author[] = [
    {
        slug: 'abhi-pandey',
        name: 'Abhi Pandey',
        // Must match clinizy.in/about character-for-character.
        jobTitle: 'Founder & CTO',
        tagline: 'Founder & CTO at Brynex Labs',
        bio: 'Abhi Pandey is the Founder & CTO of Brynex Labs. He leads product and engineering for Clinizy Care, the hospital management software Brynex Labs builds and runs for India\'s clinics and nursing homes, and for the AI agents and SaaS platforms the studio builds for clients. He writes about multi-tenant SaaS architecture, applied AI engineering, and shipping reliable systems to production.',
        sameAs: [
            'https://www.linkedin.com/in/abhipandey1402',
            'https://github.com/abhipandey1402',
            'https://clinizy.in/about',
        ],
        profileLinks: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhipandey1402' },
            { label: 'GitHub', href: 'https://github.com/abhipandey1402' },
            { label: 'Founder profile on Clinizy Care', href: 'https://clinizy.in/about' },
        ],
        alsoWorksFor: [
            { '@id': 'https://clinizy.in/#organization', name: 'Clinizy Care', url: 'https://clinizy.in' },
        ],
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
 * everything else (AI, SaaS, Cloud, DevOps, Engineering) to the Founder &
 * CTO. Kept as a pure function so it works for both static and
 * CMS posts regardless of the free-text author stored on the record.
 */
export function getAuthorForCategory(category?: BlogCategory | string): Author {
    const c = String(category ?? '').toLowerCase();
    if (c === 'seo' || c === 'marketing') {
        return getAuthorBySlug('shashi-tiwari') ?? DEFAULT_AUTHOR;
    }
    return DEFAULT_AUTHOR;
}
