import type { MetadataRoute } from 'next';
import { liveUrl } from '@/lib/config/env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${liveUrl}/sitemap.xml`,
  };
}
