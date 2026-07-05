import { Suspense, use } from 'react';
import { SectionErrorBoundary } from '@/components/general/SectionErrorBoundary';
import { getPricingContent, PRICING_CONTENT_FALLBACK } from '@/lib/content/pricing';
import { PricingView } from './PricingView';
import { PricingSkeleton } from './PricingSkeleton';

/** Suspends on the content promise via `use()` -- no useEffect/useState fetch. */
function PricingData() {
  const content = use(getPricingContent());
  return <PricingView content={content} />;
}

/**
 * Section entry point: Suspense shows a skeleton while content resolves;
 * SectionErrorBoundary catches a failed fetch and degrades to the section's
 * own hardcoded fallback copy instead of taking down the page.
 */
export const Pricing = () => {
  return (
    <SectionErrorBoundary
      section="pricing"
      fallback={<PricingView content={PRICING_CONTENT_FALLBACK} />}>
      <Suspense fallback={<PricingSkeleton />}>
        <PricingData />
      </Suspense>
    </SectionErrorBoundary>
  );
};
