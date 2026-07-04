import { z } from 'zod';

/**
 * Client-safe env config. All vars here are NEXT_PUBLIC_* and inlined at build
 * time, so this module is importable from both server and client components.
 * Parsing happens at module load — a bad value fails the build, not a request.
 */
const envSchema = z.object({
  NEXT_PUBLIC_LIVE_URL: z.url().default('https://thrivo.fit'),
  NEXT_PUBLIC_ENABLE_WEB_VITALS: z.enum(['0', '1']).optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_LIVE_URL: process.env.NEXT_PUBLIC_LIVE_URL,
  NEXT_PUBLIC_ENABLE_WEB_VITALS: process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

export const liveUrl = env.NEXT_PUBLIC_LIVE_URL;
