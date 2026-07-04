import { Suspense, use } from 'react';
import { SectionErrorBoundary } from '@/components/general/SectionErrorBoundary';
import { getValuePropContent, VALUE_PROP_CONTENT_FALLBACK } from '@/lib/content/value-prop';
import { ValuePropView } from './ValuePropView';
import { ValuePropSkeleton } from './ValuePropSkeleton';

/** Suspends on the content promise via `use()` -- no useEffect/useState fetch. */
function ValuePropData() {
  const content = use(getValuePropContent());
  return <ValuePropView content={content} />;
}

/**
 * Section entry point: Suspense shows a skeleton while content resolves;
 * SectionErrorBoundary catches a failed fetch and degrades to the section's
 * own hardcoded fallback copy instead of taking down the page.
 */
export const ValueProp = () => {
  return (
    <SectionErrorBoundary
      section="value-prop"
      fallback={<ValuePropView content={VALUE_PROP_CONTENT_FALLBACK} />}>
      <Suspense fallback={<ValuePropSkeleton />}>
        <ValuePropData />
      </Suspense>
    </SectionErrorBoundary>
  );
};
