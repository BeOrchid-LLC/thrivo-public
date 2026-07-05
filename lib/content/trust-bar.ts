import { cache } from 'react';
import { fetchSectionContent } from './fetch-content';

export interface TrustStat {
  value: string;
  label: string;
  /** Figma highlights the price stat in accent orange; every other stat is ink. */
  accent?: boolean;
}

export interface TrustBarContent {
  stats: TrustStat[];
}

/**
 * Hardcoded today; becomes the value a CMS editor controls once the content
 * backend exists. Also used verbatim as the fallback when the fetch below
 * fails, so a content-fetch error degrades to this exact copy rather than an
 * error state.
 */
export const TRUST_BAR_CONTENT_FALLBACK: TrustBarContent = {
  stats: [
    { value: '5M+', label: 'foods in database' },
    { value: '160+', label: 'countries supported' },
    { value: '60 sec', label: 'to first food log' },
    { value: '$14.99', label: 'per month, full stop', accent: true },
  ],
};

/**
 * `cache()` dedupes repeat calls within a single request so multiple
 * consumers share one fetch.
 */
export const getTrustBarContent = cache((): Promise<TrustBarContent> =>
  fetchSectionContent('trust-bar', async () => {
    // TODO(cms): replace with the real content fetch once the backend exists, e.g.
    // const res = await fetch(`${apiBaseUrl}/api/v1/content/trust-bar`, { next: { revalidate: 300 } });
    // return trustBarContentSchema.parse(await res.json());
    return TRUST_BAR_CONTENT_FALLBACK;
  })
);
