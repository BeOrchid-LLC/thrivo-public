import { Suspense, use } from 'react';
import { SectionErrorBoundary } from '@/components/general/SectionErrorBoundary';
import { getHeroContent, HERO_CONTENT_FALLBACK } from '@/lib/content/hero';
import { HeroView } from './HeroView';
import { HeroSkeleton } from './HeroSkeleton';

/** Suspends on the content promise via `use()` -- no useEffect/useState fetch. */
function HeroData() {
  const content = use(getHeroContent());
  return <HeroView content={content} />;
}

/**
 * Section entry point: Suspense shows a skeleton while content resolves;
 * SectionErrorBoundary catches a failed fetch and degrades to the section's
 * own hardcoded fallback copy instead of taking down the page.
 */
export const Hero = () => {
  return (
    <SectionErrorBoundary section="hero" fallback={<HeroView content={HERO_CONTENT_FALLBACK} />}>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroData />
      </Suspense>
    </SectionErrorBoundary>
  );
};
