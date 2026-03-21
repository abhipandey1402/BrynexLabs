import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/private/'], // Common private areas, adjust if needed
    },
    sitemap: 'https://brynex.in/sitemap.xml',
  };
}
