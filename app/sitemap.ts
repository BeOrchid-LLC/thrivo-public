import type { MetadataRoute } from 'next';
import { liveUrl } from '@/lib/config/env';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: liveUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
