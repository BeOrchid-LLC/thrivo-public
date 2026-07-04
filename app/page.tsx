import { MainLayout } from '@/components/layout/MainLayout';
import { Hero } from './_sections/Hero';
import { TrustBar } from './_sections/TrustBar';

/**
 * Landing page. Remaining sections are built incrementally — see
 * docs/BUILD-NOTES.md for the section plan, Figma node IDs, and the rule to
 * compose sections from the shared atoms in components/atoms + components/ui.
 */
export default function HomePage() {
  return (
    <MainLayout className="pt-[var(--header-height)]">
      <Hero />
      <TrustBar />
    </MainLayout>
  );
}
