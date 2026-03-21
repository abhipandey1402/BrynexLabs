import type { MetadataRoute } from 'next';

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

  const mappings = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Potential dynamic routes appending if data sources were provided...
  // For now returning the primary routes
  return mappings;
}
