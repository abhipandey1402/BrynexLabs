import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
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

  const serviceMappings = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const posts = await getAllPosts();
  const blogMappings = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticMappings, ...serviceMappings, ...blogMappings];
}
