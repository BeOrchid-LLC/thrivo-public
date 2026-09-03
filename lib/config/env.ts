import { z } from 'zod';

/**
 * Client-safe env config. All vars here are NEXT_PUBLIC_* and inlined at build
 * time, so this module is importable from both server and client components.
 * Parsing happens at module load — a bad value fails the build, not a request.
 */
const envSchema = z.object({
  NEXT_PUBLIC_LIVE_URL: z.url().default('https://thrivo.fit'),
  NEXT_PUBLIC_API_URL: z.url().default('https://api.thrivo.fit'),
  NEXT_PUBLIC_ENABLE_WEB_VITALS: z.enum(['0', '1']).optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_APP_STORE_URL: z.url().optional(),
  NEXT_PUBLIC_GOOGLE_PLAY_URL: z.url().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_LIVE_URL: process.env.NEXT_PUBLIC_LIVE_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_ENABLE_WEB_VITALS: process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  NEXT_PUBLIC_APP_STORE_URL: process.env.NEXT_PUBLIC_APP_STORE_URL,
  NEXT_PUBLIC_GOOGLE_PLAY_URL: process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL,
});

export const liveUrl = env.NEXT_PUBLIC_LIVE_URL;
export const apiUrl = env.NEXT_PUBLIC_API_URL;

/**
 * SEO identity must always use the verified public domain. A preview build
 * may still set NEXT_PUBLIC_LIVE_URL for runtime/CSP concerns, but that host
 * must not leak into canonical, Open Graph, sitemap, or structured-data URLs.
 */
export const canonicalUrl = 'https://thrivo.fit';
