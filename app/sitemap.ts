import type { MetadataRoute } from 'next';
import { liveUrl } from '@/lib/config/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = [
    { path: '', priority: 1 },
    { path: '/privacy-policy', priority: 0.5 },
    { path: '/terms-of-service', priority: 0.5 },
    { path: '/cancellation-policy', priority: 0.5 },
    { path: '/contact', priority: 0.5 },
    { path: '/delete-account', priority: 0.5 },
  ];

  return publicRoutes.map(({ path, priority }) => ({
    url: `${liveUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }));
}
