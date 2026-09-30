import type { BlogPost } from '@/data/blog';
import type { CaseStudy } from '@/data/case-studies';
import { getAuthorBySlug, getAuthorForCategory, type Author } from '@/data/authors';
import { CLINIZY } from '@/data/products';

export const SITE_URL = 'https://brynex.in';
export const SITE_NAME = 'Brynex Labs';
export const SITE_EMAIL = 'hello@brynex.in';
export const SITE_FOUNDING_YEAR = '2023';
export const SITE_SOCIAL_PROFILES = [
    'https://www.linkedin.com/company/brynexlabs',
    'https://x.com/brynexlabs',
];

export function absoluteUrl(path = '/'): string {
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Dedicated brand logo (distinct from the favicon/apple-icon) for schema + publisher marks. */
export const SITE_LOGO_URL = absoluteUrl('/logo');

/** Reusable ImageObject for the brand logo — square, min 112px per Google guidance. */
function logoImageObject() {
    return {
        '@type': 'ImageObject',
        url: SITE_LOGO_URL,
        width: 512,
        height: 512,
    };
}

/** A reference to the site-wide Organization node so pages don't redefine it. */
export function organizationRef() {
    return { '@id': `${SITE_URL}/#organization` };
}

/** Stable @id of the founder's Person node (defined on /authors/abhi-pandey). */
export const FOUNDER_PERSON_ID = `${SITE_URL}/authors/abhi-pandey#person`;

/**
 * Clinizy Care's Organization node, owned by clinizy.in. We only reference it
 * (with enough properties to be self-describing) — clinizy.in stays canonical,
 * and its schema already declares parentOrganization → our @id.
 */
function clinizyOrganizationNode() {
    return {
        '@type': 'Organization',
        '@id': CLINIZY.organizationId,
        name: CLINIZY.name,
        url: CLINIZY.url,
    };
}

function founderPersonNode() {
    const founder = getAuthorBySlug('abhi-pandey');
    return {
        '@type': 'Person',
        '@id': FOUNDER_PERSON_ID,
        name: founder?.name ?? 'Abhi Pandey',
        url: `${SITE_URL}/authors/abhi-pandey`,
        ...(founder ? { jobTitle: founder.jobTitle } : {}),
        ...(founder?.sameAs && founder.sameAs.length > 0 ? { sameAs: founder.sameAs } : {}),
    };
}

export function getOrganizationJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: 'Brynex Labs AI and Software Development',
        url: SITE_URL,
        logo: logoImageObject(),
        image: absoluteUrl('/opengraph-image'),
        email: SITE_EMAIL,
        foundingDate: SITE_FOUNDING_YEAR,
        description:
            'Brynex Labs is an AI & SaaS product studio from India. It builds and operates its own software — Clinizy Care, hospital management software for Indian clinics and nursing homes — and builds AI agents, intelligent automation, SaaS platforms and revenue-focused SEO for clients in India, the USA, the UK and Australia.',
        slogan: 'We build our own products. Then we build yours.',
        founder: founderPersonNode(),
        subOrganization: clinizyOrganizationNode(),
        brand: clinizyOrganizationNode(),
        areaServed: [
            { '@type': 'Country', name: 'United States' },
            { '@type': 'Country', name: 'India' },
            { '@type': 'Country', name: 'United Kingdom' },
            { '@type': 'Country', name: 'Australia' },
            { '@type': 'Country', name: 'Canada' },
        ],
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: SITE_EMAIL,
            areaServed: ['US', 'IN', 'GB', 'AU', 'CA'],
            availableLanguage: ['English', 'Hindi'],
        },
        knowsAbout: [
            'AI agent development',
            'agentic AI',
            'LLM application development',
            'RAG pipelines',
            'custom software development',
            'SaaS product engineering',
            'cloud infrastructure',
            'SaaS SEO',
            'healthcare software',
            'hospital management software',
            'DPDP Act compliance',
            'multi-tenant SaaS architecture',
            'WhatsApp Business API integration',
            'GST billing software',
        ],
        sameAs: SITE_SOCIAL_PROFILES,
    };
}

export function getWebSiteJsonLd() {
    return {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: organizationRef(),
    };
}

export function getBreadcrumbJsonLd(items: { name: string; href: string }[]) {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.href),
        })),
    };
}

/**
 * A page-level WebPage node (or a subtype like AboutPage/ContactPage/
 * CollectionPage) tied back to the site and organization. Gives hub and
 * utility pages a first-class entity instead of only the site-wide Org block.
 */
export function getWebPageJsonLd(params: {
    type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
    name: string;
    description: string;
    path: string;
}) {
    return {
        '@type': params.type ?? 'WebPage',
        '@id': `${absoluteUrl(params.path)}#webpage`,
        url: absoluteUrl(params.path),
        name: params.name,
        description: params.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: organizationRef(),
    };
}

/** ItemList of links — used to give hub pages (e.g. /services) real structure. */
export function getItemListJsonLd(items: { name: string; href: string }[]) {
    return {
        '@type': 'ItemList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            url: absoluteUrl(item.href),
        })),
    };
}

/** A named person (blog author) with a stable @id and link back to the Org. */
export function getPersonJsonLd(author: Author) {
    return {
        '@type': 'Person',
        '@id': `${SITE_URL}/authors/${author.slug}#person`,
        name: author.name,
        url: `${SITE_URL}/authors/${author.slug}`,
        jobTitle: author.jobTitle,
        description: author.bio,
        worksFor:
            author.alsoWorksFor && author.alsoWorksFor.length > 0
                ? [organizationRef(), ...author.alsoWorksFor.map((org) => ({ '@type': 'Organization', ...org }))]
                : organizationRef(),
        ...(author.sameAs && author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
    };
}

export function getBlogImageUrl(post: BlogPost): string {
    return absoluteUrl(`/blog/${post.slug}/og-image`);
}

export function getCaseStudyImageUrl(slug: string): string {
    return absoluteUrl(`/case-studies/${slug}/og-image`);
}

function normalizeDate(value: string): string {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString();
}

export function getPostDate(post: BlogPost): string {
    return normalizeDate(post.publishedAt ?? post.date);
}

export function getPostModifiedDate(post: BlogPost): string {
    return normalizeDate(post.updatedAt ?? post.publishedAt ?? post.date);
}

export function getBlogPostingJsonLd(post: BlogPost) {
    const author = getAuthorForCategory(post.category);
    return {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.seoDescription,
        image: getBlogImageUrl(post),
        author: {
            '@type': 'Person',
            '@id': `${SITE_URL}/authors/${author.slug}#person`,
            name: author.name,
            url: `${SITE_URL}/authors/${author.slug}`,
        },
        publisher: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            logo: logoImageObject(),
        },
        datePublished: getPostDate(post),
        dateModified: getPostModifiedDate(post),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': absoluteUrl(`/blog/${post.slug}`),
        },
        ...(post.techTags && post.techTags.length > 0 ? { keywords: post.techTags.join(', ') } : {}),
    };
}

/** Article schema for a case study — with image, dates, author, and publisher. */
export function getCaseStudyArticleJsonLd(project: CaseStudy) {
    const published = normalizeDate(project.publishedAt ?? '2026-01-01');
    return {
        '@type': 'Article',
        headline: project.title,
        description: project.summary,
        image: getCaseStudyImageUrl(project.slug),
        author: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
        },
        publisher: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            logo: logoImageObject(),
        },
        datePublished: published,
        dateModified: normalizeDate(project.updatedAt ?? project.publishedAt ?? '2026-01-01'),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': absoluteUrl(`/case-studies/${project.slug}`),
        },
    };
}
