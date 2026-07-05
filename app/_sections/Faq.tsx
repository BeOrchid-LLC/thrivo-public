import { Suspense, use } from 'react';
import { SectionErrorBoundary } from '@/components/general/SectionErrorBoundary';
import { getFaqContent, FAQ_CONTENT_FALLBACK } from '@/lib/content/faq';
import { FaqView } from './FaqView';
import { FaqSkeleton } from './FaqSkeleton';

/** Suspends on the content promise via `use()` -- no useEffect/useState fetch. */
function FaqData() {
  const content = use(getFaqContent());
  return <FaqView content={content} />;
}

/**
 * Section entry point: Suspense shows a skeleton while content resolves;
 * SectionErrorBoundary catches a failed fetch and degrades to the section's
 * own hardcoded fallback copy instead of taking down the page.
 */
export const Faq = () => {
  return (
    <SectionErrorBoundary section="faq" fallback={<FaqView content={FAQ_CONTENT_FALLBACK} />}>
      <Suspense fallback={<FaqSkeleton />}>
        <FaqData />
      </Suspense>
    </SectionErrorBoundary>
  );
};
