import { Suspense, use } from 'react';
import { SectionErrorBoundary } from '@/components/general/SectionErrorBoundary';
import { getCtaContent, CTA_CONTENT_FALLBACK } from '@/lib/content/cta';
import { CtaView } from './CtaView';
import { CtaSkeleton } from './CtaSkeleton';

/** Suspends on the content promise via `use()` -- no useEffect/useState fetch. */
function CtaData() {
  const content = use(getCtaContent());
  return <CtaView content={content} />;
}

/**
 * Section entry point: Suspense shows a skeleton while content resolves;
 * SectionErrorBoundary catches a failed fetch and degrades to the section's
 * own hardcoded fallback copy instead of taking down the page.
 */
export const Cta = () => {
  return (
    <SectionErrorBoundary section="cta" fallback={<CtaView content={CTA_CONTENT_FALLBACK} />}>
      <Suspense fallback={<CtaSkeleton />}>
        <CtaData />
      </Suspense>
    </SectionErrorBoundary>
  );
};
