import { cache } from 'react';
import { fetchSectionContent } from './fetch-content';
import { env } from '@/lib/config/env';

export interface CtaContent {
  badge: string;
  heading: string;
  subtext: string;
  appStoreHref: string;
  googlePlayHref: string;
  formLabel: string;
  formPlaceholder: string;
  formCta: string;
  formFinePrint: string;
}

/**
 * Hardcoded today; becomes the value a CMS editor controls once the content
 * backend exists. Also used verbatim as the fallback when the fetch below
 * fails, so a content-fetch error degrades to this exact copy rather than an
 * error state.
 */
export const CTA_CONTENT_FALLBACK: CtaContent = {
  badge: 'Launching soon',
  heading: 'Start losing weight today.',
  subtext: 'No tricks. No tedious set-ups. No fluff. Scan your first food in 60 seconds.',
  appStoreHref: env.NEXT_PUBLIC_APP_STORE_URL ?? '/#get-started',
  googlePlayHref: env.NEXT_PUBLIC_GOOGLE_PLAY_URL ?? '/#get-started',
  formLabel: 'Get launch notification',
  formPlaceholder: 'your@email.com',
  formCta: 'Notify me',
  formFinePrint: 'A confirmation now, then one email when we launch. No spam.',
};

/**
 * `cache()` dedupes repeat calls within a single request so multiple
 * consumers share one fetch.
 */
export const getCtaContent = cache((): Promise<CtaContent> =>
  fetchSectionContent('cta', async () => {
    // TODO(cms): replace with the real content fetch once the backend exists, e.g.
    // const res = await fetch(`${apiBaseUrl}/api/v1/content/cta`, { next: { revalidate: 300 } });
    // return ctaContentSchema.parse(await res.json());
    return CTA_CONTENT_FALLBACK;
  })
);
