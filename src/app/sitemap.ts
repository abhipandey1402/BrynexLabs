import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { caseStudies } from '@/data/case-studies';
import { getAllPosts } from '@/lib/blogService';

// Computed per request so CMS-published articles appear immediately for crawlers.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://brynex.in';
  const lastModified = new Date();

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
    lastModified,
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const landingRoutes = ['/hire-ai-developers', '/ai-development-company-in-india'];
  const landingMappings = landingRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const serviceMappings = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // India-market variants (hreflang en-IN pairs of the global service pages).
  const indiaServiceMappings = services
    .filter((service) => service.marketIN)
    .map((service) => ({
      url: `${baseUrl}/in/services/${service.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));

  const caseStudyMappings = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const posts = await getAllPosts();
  const blogMappings = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticMappings, ...landingMappings, ...serviceMappings, ...indiaServiceMappings, ...caseStudyMappings, ...blogMappings];
}
