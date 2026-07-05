import { cache } from 'react';
import { fetchSectionContent } from './fetch-content';

export interface FaqQuestion {
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  heading: string;
  subtext: string;
  questions: FaqQuestion[];
}

/**
 * Hardcoded today; becomes the value a CMS editor controls once the content
 * backend exists. Also used verbatim as the fallback when the fetch below
 * fails, so a content-fetch error degrades to this exact copy rather than an
 * error state. Shape matches `faqJsonLd()` (lib/jsonld.ts) directly.
 */
export const FAQ_CONTENT_FALLBACK: FaqContent = {
  eyebrow: 'FAQ',
  heading: 'Honest answers, like everything else.',
  subtext: "We'd rather answer these upfront than bury them in fine print.",
  questions: [
    {
      question: 'Do I need a credit card for the free tier?',
      answer:
        'No. The Free plan works with just an email — no credit card, ever. Scan barcodes, log meals, and track your daily calories without entering payment details.',
    },
    {
      question: 'How do I cancel?',
      answer:
        "Cancel anytime from Settings in just 2 taps — no phone calls, no forms. You'll keep Premium access until the end of your current billing period.",
    },
    {
      question: 'Does the food scanner work outside the US?',
      answer:
        "Yes. The barcode scanner covers over 5 million foods across 160+ countries, so it works wherever you're logging meals, not just in the US.",
    },
    {
      question: 'Are there real human coaches?',
      answer:
        "Thrivo doesn't use human coaches. You get daily evidence-based nudges and progress insights generated from your own data, available instantly any time of day.",
    },
    {
      question: 'What happens at the end of the 14-day trial?',
      answer:
        "Your card is charged the plan price you selected at signup, and we show the exact charge date upfront. Cancel before the trial ends and you won't be charged.",
    },
    {
      question: 'Can I use Thrivo for free, forever?',
      answer:
        'Yes. The Free plan has no expiry — barcode scanning, manual logging, and 7-day history stay free for as long as you use Thrivo.',
    },
  ],
};

/**
 * `cache()` dedupes repeat calls within a single request so multiple
 * consumers share one fetch.
 */
export const getFaqContent = cache((): Promise<FaqContent> =>
  fetchSectionContent('faq', async () => {
    // TODO(cms): replace with the real content fetch once the backend exists, e.g.
    // const res = await fetch(`${apiBaseUrl}/api/v1/content/faq`, { next: { revalidate: 300 } });
    // return faqContentSchema.parse(await res.json());
    return FAQ_CONTENT_FALLBACK;
  })
);
