import { Suspense, use } from 'react';
import { SectionErrorBoundary } from '@/components/general/SectionErrorBoundary';
import { getFeaturesContent, FEATURES_CONTENT_FALLBACK } from '@/lib/content/features';
import { FeaturesView } from './FeaturesView';
import { FeaturesSkeleton } from './FeaturesSkeleton';

/** Suspends on the content promise via `use()` -- no useEffect/useState fetch. */
function FeaturesData() {
  const content = use(getFeaturesContent());
  return <FeaturesView content={content} />;
}

/**
 * Section entry point: Suspense shows a skeleton while content resolves;
 * SectionErrorBoundary catches a failed fetch and degrades to the section's
 * own hardcoded fallback copy instead of taking down the page.
 */
export const Features = () => {
  return (
    <SectionErrorBoundary
      section="features"
      fallback={<FeaturesView content={FEATURES_CONTENT_FALLBACK} />}>
      <Suspense fallback={<FeaturesSkeleton />}>
        <FeaturesData />
      </Suspense>
    </SectionErrorBoundary>
  );
};
