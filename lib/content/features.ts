import { cache } from 'react';
import { fetchSectionContent } from './fetch-content';

/** String key rather than a component reference, so this stays JSON-serializable for a future CMS payload. The view maps keys to lucide icons. */
export type FeatureIcon =
  'scan' | 'bar-chart' | 'trending-up' | 'bell' | 'droplets' | 'shield-check';

export interface Feature {
  icon: FeatureIcon;
  title: string;
  body: string;
  /** Figma tints this one card's icon orange instead of green (Transparent subscription). */
  accent?: boolean;
}

export interface FeaturesContent {
  eyebrow: string;
  heading: string;
  features: Feature[];
}

/**
 * Hardcoded today; becomes the value a CMS editor controls once the content
 * backend exists. Also used verbatim as the fallback when the fetch below
 * fails, so a content-fetch error degrades to this exact copy rather than an
 * error state.
 */
export const FEATURES_CONTENT_FALLBACK: FeaturesContent = {
  eyebrow: 'Features',
  heading: 'Calm, fast, and designed to fit into your day.',
  features: [
    {
      icon: 'scan',
      title: 'Barcode food scanner',
      body: "Logging your meals should be effortless. Just scan, log, and keep living. Access over 5 million foods from 160+ countries, even when you're offline.",
    },
    {
      icon: 'bar-chart',
      title: 'Macro tracking',
      body: 'See your protein, carbs, and fats at a glance, tailored to your goals and updated with every meal.',
    },
    {
      icon: 'trending-up',
      title: 'Progress charts',
      body: "Your progress is more than a number on the scale. See trends, build streaks, and celebrate how far you've come.",
    },
    {
      icon: 'bell',
      title: 'Daily food log reminders',
      body: 'Set gentle reminders that fit your routine, not the other way around. Thrivo helps you stay consistent without getting in the way.',
    },
    {
      icon: 'droplets',
      title: 'Water tracking',
      body: "Log your water in a single tap, track your daily goal, and get a gentle nudge when it's time for another glass.",
    },
    {
      icon: 'shield-check',
      title: 'Transparent subscription',
      body: 'We believe in complete transparency. No hidden fees. No confusing billing. Just clear pricing, easy cancellation, and instant receipts.',
      accent: true,
    },
  ],
};

/**
 * `cache()` dedupes repeat calls within a single request so multiple
 * consumers share one fetch.
 */
export const getFeaturesContent = cache((): Promise<FeaturesContent> =>
  fetchSectionContent('features', async () => {
    // TODO(cms): replace with the real content fetch once the backend exists, e.g.
    // const res = await fetch(`${apiBaseUrl}/api/v1/content/features`, { next: { revalidate: 300 } });
    // return featuresContentSchema.parse(await res.json());
    return FEATURES_CONTENT_FALLBACK;
  })
);
