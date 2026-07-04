import { cache } from 'react';
import { fetchSectionContent } from './fetch-content';

/** String key rather than a component reference, so this stays JSON-serializable for a future CMS payload. The view maps keys to lucide icons. */
export type ValuePropCardIcon = 'shield-check' | 'zap' | 'leaf';

export interface ValuePropCard {
  icon: ValuePropCardIcon;
  title: string;
  body: string;
}

export interface ValuePropContent {
  eyebrow: string;
  heading: string;
  subtext: string;
  checklist: string[];
  cards: ValuePropCard[];
}

/**
 * Hardcoded today; becomes the value a CMS editor controls once the content
 * backend exists. Also used verbatim as the fallback when the fetch below
 * fails, so a content-fetch error degrades to this exact copy rather than an
 * error state.
 */
export const VALUE_PROP_CONTENT_FALLBACK: ValuePropContent = {
  eyebrow: 'Why Thrivo',
  heading: 'A weight loss app you can actually trust.',
  subtext:
    'Thrivo is built on one principle: healthy living should not be complicated. From transparent pricing to effortless food logging, everything is designed to be simple and easy to understand.',
  checklist: [
    'Clear price breakdown — $14.99/month',
    'Cancel in 2 taps, instant email confirmation',
    'Free tier works with no card, ever',
    'Barcode scanner covers 160+ countries',
  ],
  cards: [
    {
      icon: 'shield-check',
      title: 'No hidden charges',
      body: 'The price you see is the price you pay. No bulk billing surprises.',
    },
    {
      icon: 'zap',
      title: 'Instant first value',
      body: 'Scan a barcode, see calories. No endless forms or quizes.',
    },
    {
      icon: 'leaf',
      title: 'A real free tier',
      body: 'Barcode scanning and 7-day history, free. No credit card, no tricks.',
    },
  ],
};

/**
 * `cache()` dedupes repeat calls within a single request so multiple
 * consumers share one fetch.
 */
export const getValuePropContent = cache((): Promise<ValuePropContent> =>
  fetchSectionContent('value-prop', async () => {
    // TODO(cms): replace with the real content fetch once the backend exists, e.g.
    // const res = await fetch(`${apiBaseUrl}/api/v1/content/value-prop`, { next: { revalidate: 300 } });
    // return valuePropContentSchema.parse(await res.json());
    return VALUE_PROP_CONTENT_FALLBACK;
  })
);
