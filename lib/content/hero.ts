import { cache } from 'react';
import { fetchSectionContent } from './fetch-content';

export interface HeroContent {
  eyebrow: string;
  headingLine1: string;
  headingHighlight: string;
  headingLine2Rest: string;
  headingLine3: string;
  paragraph: string;
  finePrint: string;
  backgroundImageSrc: string;
  dashboardImageSrc: string;
  dashboardAlt: string;
}

/**
 * Hardcoded today; becomes the value a CMS editor controls once the content
 * backend exists. Also used verbatim as the fallback when the fetch below
 * fails, so a content-fetch error degrades to this exact copy rather than an
 * error state.
 */
export const HERO_CONTENT_FALLBACK: HeroContent = {
  eyebrow: 'Honest. Simple. Effective.',
  headingLine1: 'Weight loss',
  headingHighlight: 'without',
  headingLine2Rest: 'the',
  headingLine3: 'nonsense.',
  paragraph:
    'Thrivo is a mobile weight-loss app that helps you build healthier eating habits by scanning barcodes, logging meals, and tracking calories, macros, water, and weight progress.',
  finePrint: 'Free tier available — no credit card required.',
  backgroundImageSrc: '/images/public-hero-bg.png',
  dashboardImageSrc: '/images/mobile-dashboard.png',
  dashboardAlt: 'Thrivo app dashboard showing daily calories, macro progress, and water intake',
};

/**
 * `cache()` dedupes repeat calls within a single request so multiple
 * consumers (e.g. this section plus a future JSON-LD block) share one fetch.
 */
export const getHeroContent = cache((): Promise<HeroContent> =>
  fetchSectionContent('hero', async () => {
    // TODO(cms): replace with the real content fetch once the backend exists, e.g.
    // const res = await fetch(`${apiBaseUrl}/api/v1/content/hero`, { next: { revalidate: 300 } });
    // return heroContentSchema.parse(await res.json());
    return HERO_CONTENT_FALLBACK;
  })
);
