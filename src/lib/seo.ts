import type { BlogPost } from '@/data/blog';

export const SITE_URL = 'https://brynex.in';
export const SITE_NAME = 'Brynex Labs';
export const SITE_EMAIL = 'hello@brynex.in';
export const SITE_SOCIAL_PROFILES = [
    'https://www.linkedin.com/company/brynexlabs',
    'https://x.com/brynexlabs',
];

export function absoluteUrl(path = '/'): string {
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getOrganizationJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: 'Brynex Labs AI and Software Development',
        url: SITE_URL,
        logo: absoluteUrl('/apple-icon'),
        email: SITE_EMAIL,
        description:
            'Brynex Labs builds production-grade AI agents, intelligent automation, custom software, SaaS platforms, and revenue-focused SaaS SEO for startups and enterprises across the USA and India.',
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
        knowsAbout: [
            'AI agent development',
            'agentic AI',
            'LLM application development',
            'RAG pipelines',
            'custom software development',
            'SaaS product engineering',
            'cloud infrastructure',
            'SaaS SEO',
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
        publisher: {
            '@id': `${SITE_URL}/#organization`,
        },
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

export function getBlogImageUrl(post: BlogPost): string {
    return absoluteUrl(`/blog/${post.slug}/opengraph-image`);
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
    return {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.seoDescription,
        image: getBlogImageUrl(post),
        author: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: post.author,
        },
        publisher: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: absoluteUrl('/apple-icon'),
            },
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
