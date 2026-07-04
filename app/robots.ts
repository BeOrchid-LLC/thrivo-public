import type { MetadataRoute } from 'next';
import { liveUrl } from '@/lib/config/env';

/**
 * AI-crawler allowlist for GEO (generative engine optimization) — explicitly
 * welcomes the assistants/answer-engines that cite sources, per
 * docs/seo-aeo-geo-strategy.md. Flip an individual agent to disallow here if
 * policy ever requires it.
 */
const AI_CRAWLER_USER_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: AI_CRAWLER_USER_AGENTS,
        allow: '/',
      },
    ],
    sitemap: `${liveUrl}/sitemap.xml`,
  };
}
