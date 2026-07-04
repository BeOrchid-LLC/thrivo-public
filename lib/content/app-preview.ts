import { cache } from 'react';
import { fetchSectionContent } from './fetch-content';

export interface AppPreviewContent {
  eyebrow: string;
  heading: string;
  paragraph: string;
  backgroundImageSrc: string;
  phoneImageSrc: string;
  phoneImageAlt: string;
}

/**
 * Hardcoded today; becomes the value a CMS editor controls once the content
 * backend exists. Also used verbatim as the fallback when the fetch below
 * fails, so a content-fetch error degrades to this exact copy rather than an
 * error state.
 */
export const APP_PREVIEW_CONTENT_FALLBACK: AppPreviewContent = {
  eyebrow: 'The thrivo app',
  heading: 'Outcomes, not gimmicks.',
  paragraph:
    'Research shows that consistently tracking what you eat leads to better choices over time. Thrivo helps you build that habit — simply, consistently, and without any hassle.',
  backgroundImageSrc: '/images/progress-bg.png',
  phoneImageSrc: '/images/mobile-progress-tracker.png',
  phoneImageAlt:
    'Thrivo progress screen showing current weight, logging streak, and a weight-over-time chart',
};

/**
 * `cache()` dedupes repeat calls within a single request so multiple
 * consumers share one fetch.
 */
export const getAppPreviewContent = cache((): Promise<AppPreviewContent> =>
  fetchSectionContent('app-preview', async () => {
    // TODO(cms): replace with the real content fetch once the backend exists, e.g.
    // const res = await fetch(`${apiBaseUrl}/api/v1/content/app-preview`, { next: { revalidate: 300 } });
    // return appPreviewContentSchema.parse(await res.json());
    return APP_PREVIEW_CONTENT_FALLBACK;
  })
);
