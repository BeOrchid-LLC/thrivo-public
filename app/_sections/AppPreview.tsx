import { Suspense, use } from 'react';
import { SectionErrorBoundary } from '@/components/general/SectionErrorBoundary';
import { getAppPreviewContent, APP_PREVIEW_CONTENT_FALLBACK } from '@/lib/content/app-preview';
import { AppPreviewView } from './AppPreviewView';
import { AppPreviewSkeleton } from './AppPreviewSkeleton';

/** Suspends on the content promise via `use()` -- no useEffect/useState fetch. */
function AppPreviewData() {
  const content = use(getAppPreviewContent());
  return <AppPreviewView content={content} />;
}

/**
 * Section entry point: Suspense shows a skeleton while content resolves;
 * SectionErrorBoundary catches a failed fetch and degrades to the section's
 * own hardcoded fallback copy instead of taking down the page.
 */
export const AppPreview = () => {
  return (
    <SectionErrorBoundary
      section="app-preview"
      fallback={<AppPreviewView content={APP_PREVIEW_CONTENT_FALLBACK} />}>
      <Suspense fallback={<AppPreviewSkeleton />}>
        <AppPreviewData />
      </Suspense>
    </SectionErrorBoundary>
  );
};
