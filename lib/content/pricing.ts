import { cache } from 'react';
import { fetchSectionContent } from './fetch-content';

export interface PricingPrice {
  amount: string;
  /** Empty for the always-free plan, which has no "/ month" suffix. */
  period: string;
}

/**
 * Full card content for one billing cycle. Free and Premium each carry a
 * `monthly` and `annual` variant so the toggle can swap price, copy, and
 * badges together -- not just the number (e.g. Premium's annual variant adds
 * a "Best value" badge and drops the trial price-note for a billed-as-yearly
 * breakdown; Free's annual copy leans into "no expiry" instead of "free
 * forever").
 */
export interface PricingPlanVariant {
  price: PricingPrice;
  priceNote?: string;
  /** "Billed as $150 / year" (Premium annual only). */
  billingDetail?: { label: string; amount: string };
  /** "You save $29.88 vs monthly billing." (Premium annual only). */
  savingsNote?: string;
  /** Orange pill, top-left (Premium annual only). */
  bestValueBadge?: string;
  /** Translucent pill, top-right (Premium, both cycles). */
  trialBadge?: string;
  features: string[];
}

export interface PricingPlan {
  id: 'free' | 'premium';
  name: string;
  monthly: PricingPlanVariant;
  annual: PricingPlanVariant;
  cta: { text: string; href: string };
  /** Premium's green gradient card vs Free's plain white card. */
  highlighted?: boolean;
}

export interface PricingContent {
  eyebrow: string;
  heading: string;
  subtext: string;
  monthlyLabel: string;
  annualLabel: string;
  annualSaveBadge: string;
  plans: PricingPlan[];
  footnote: string;
}

/**
 * Hardcoded today; becomes the value a CMS editor controls once the content
 * backend exists. Also used verbatim as the fallback when the fetch below
 * fails, so a content-fetch error degrades to this exact copy rather than an
 * error state.
 */
export const PRICING_CONTENT_FALLBACK: PricingContent = {
  eyebrow: 'Pricing',
  heading: 'Transparent pricing, the way it should be.',
  subtext: 'Two billing options. No surprises.',
  monthlyLabel: 'Monthly',
  annualLabel: 'Annual',
  annualSaveBadge: 'Save 17%',
  plans: [
    {
      id: 'free',
      name: 'Free',
      monthly: {
        price: { amount: '$0', period: '' },
        priceNote: 'No card required.',
        features: [
          'Barcode food scanner — unlimited',
          'Manual food search & logging',
          'Daily calorie total',
          '7-day food log history',
          'No credit card. Free forever.',
        ],
      },
      annual: {
        price: { amount: '$0', period: '' },
        priceNote: 'No card required. Ever.',
        features: [
          'Barcode food scanner — unlimited',
          'Manual food search & logging',
          'Daily calorie total',
          '7-day food log history',
          'No credit card. No expiry.',
        ],
      },
      cta: { text: 'Start for free', href: '#get-started' },
    },
    {
      id: 'premium',
      name: 'Premium',
      monthly: {
        price: { amount: '$14.99', period: '/ month' },
        priceNote: 'Card required for trial. Exact charge date shown upfront.',
        trialBadge: '14-day trial',
        features: [
          'Everything in Free',
          'Personalised calorie target (TDEE)',
          'Full macro tracking — protein, carbs, fat',
          'Unlimited food log history',
          'Weight progress chart + goal date',
          'Daily psychology nudges',
          'Water tracking & hydration goal',
          'Progress charts (weight over time, streak, weekly averages)',
        ],
      },
      annual: {
        price: { amount: '$12.50', period: '/ month' },
        billingDetail: { label: 'Billed as', amount: '$150 / year' },
        savingsNote: 'You save $29.88 vs monthly billing.',
        bestValueBadge: 'Best value',
        trialBadge: '14-day trial',
        features: [
          'Everything in Free',
          'Personalised calorie target (TDEE)',
          'Full macro tracking — protein, carbs, fat',
          'Unlimited food log history',
          'Weight progress chart + goal date',
          'Daily evidence-based nudges',
          'Water tracking & hydration goal',
          'Progress charts (weight over time, streak, weekly averages)',
        ],
      },
      cta: { text: 'Start 14-day trial', href: '#get-started' },
      highlighted: true,
    },
  ],
  footnote:
    'Monthly plan billed on the same date each month. Cancel anytime from Settings in just 2 taps.',
};

/**
 * `cache()` dedupes repeat calls within a single request so multiple
 * consumers share one fetch.
 */
export const getPricingContent = cache((): Promise<PricingContent> =>
  fetchSectionContent('pricing', async () => {
    // TODO(cms): replace with the real content fetch once the backend exists, e.g.
    // const res = await fetch(`${apiBaseUrl}/api/v1/content/pricing`, { next: { revalidate: 300 } });
    // return pricingContentSchema.parse(await res.json());
    return PRICING_CONTENT_FALLBACK;
  })
);
