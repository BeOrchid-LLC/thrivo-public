import { Suspense, use } from 'react';
import { SectionErrorBoundary } from '@/components/general/SectionErrorBoundary';
import { getTrustBarContent, TRUST_BAR_CONTENT_FALLBACK } from '@/lib/content/trust-bar';
import { TrustBarView } from './TrustBarView';
import { TrustBarSkeleton } from './TrustBarSkeleton';

/** Suspends on the content promise via `use()` -- no useEffect/useState fetch. */
function TrustBarData() {
  const content = use(getTrustBarContent());
  return <TrustBarView content={content} />;
}

/**
 * Section entry point: Suspense shows a skeleton while content resolves;
 * SectionErrorBoundary catches a failed fetch and degrades to the section's
 * own hardcoded fallback copy instead of taking down the page.
 */
export const TrustBar = () => {
  return (
    <SectionErrorBoundary
      section="trust-bar"
      fallback={<TrustBarView content={TRUST_BAR_CONTENT_FALLBACK} />}>
      <Suspense fallback={<TrustBarSkeleton />}>
        <TrustBarData />
      </Suspense>
    </SectionErrorBoundary>
  );
};
