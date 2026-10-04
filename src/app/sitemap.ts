import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { caseStudies } from '@/data/case-studies';
import { getAllAuthorSlugs } from '@/data/authors';
import { getAllPosts } from '@/lib/blogService';

// Computed per request so CMS-published articles appear immediately for crawlers.
export const dynamic = 'force-dynamic';

const STATIC_ROUTE_LASTMOD: Record<string, string> = {
  '': '2026-09-30',
  '/about': '2026-09-30',
  '/services': '2026-07-05',
  '/how-we-work': '2026-06-16',
  '/careers': '2026-06-16',
  '/contact': '2026-06-16',
  '/privacy': '2026-06-16',
  '/terms': '2026-06-16',
  '/blog': '2026-09-30',
  '/case-studies': '2026-10-04',
  '/hire-ai-developers': '2026-06-16',
  '/ai-development-company-in-india': '2026-06-16',
  '/products': '2026-09-30',
  '/products/clinizy-care': '2026-09-30',
  '/industries/healthcare': '2026-09-30',
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://brynex.in';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/how-we-work',
    '/careers',
    '/contact',
    '/privacy',
    '/terms',
    '/blog',
    '/case-studies',
  ];

  const staticMappings = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(STATIC_ROUTE_LASTMOD[route] ?? '2026-06-16'),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const landingRoutes = [
    '/hire-ai-developers',
    '/ai-development-company-in-india',
    '/products',
    '/products/clinizy-care',
    '/industries/healthcare',
  ];
  const landingMappings = landingRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(STATIC_ROUTE_LASTMOD[route] ?? '2026-06-16'),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const serviceMappings = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date('2026-07-05'),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const caseStudyMappings = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(study.updatedAt ?? study.publishedAt ?? '2026-06-16'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const authorMappings = getAllAuthorSlugs().map((slug) => ({
    url: `${baseUrl}/authors/${slug}`,
    lastModified: new Date('2026-09-30'),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const posts = await getAllPosts();
  const blogMappings = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt ?? post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticMappings, ...landingMappings, ...serviceMappings, ...caseStudyMappings, ...authorMappings, ...blogMappings];
}
