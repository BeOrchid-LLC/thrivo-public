import { Suspense, use } from 'react';
import { SectionErrorBoundary } from '@/components/general/SectionErrorBoundary';
import { getHeroContent, HERO_CONTENT_FALLBACK } from '@/lib/content/hero';
import { HeroView } from './HeroView';

/** Suspends on the content promise via `use()` -- no useEffect/useState fetch. */
function HeroData() {
  const content = use(getHeroContent());
  return <HeroView content={content} />;
}

/**
 * Section entry point: Suspense shows the section's real fallback copy while
 * content resolves;
 * SectionErrorBoundary catches a failed fetch and degrades to the section's
 * own hardcoded fallback copy instead of taking down the page.
 */
export const Hero = () => {
  return (
    <SectionErrorBoundary section="hero" fallback={<HeroView content={HERO_CONTENT_FALLBACK} />}>
      <Suspense fallback={<HeroView content={HERO_CONTENT_FALLBACK} />}>
        <HeroData />
      </Suspense>
    </SectionErrorBoundary>
  );
};
