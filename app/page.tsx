import { MainLayout } from '@/components/layout/MainLayout';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationJsonLd, websiteJsonLd, mobileAppJsonLd } from '@/lib/jsonld';
import { Hero } from './_sections/Hero';
import { TrustBar } from './_sections/TrustBar';
import { ValueProp } from './_sections/ValueProp';
import { Features } from './_sections/Features';
import { AppPreview } from './_sections/AppPreview';
import { Pricing } from './_sections/Pricing';
import { Faq } from './_sections/Faq';

/**
 * Landing page. Remaining sections are built incrementally — see
 * docs/BUILD-NOTES.md for the section plan, Figma node IDs, and the rule to
 * compose sections from the shared atoms in components/atoms + components/ui.
 */
export default function HomePage() {
  return (
    <MainLayout className="pt-[var(--header-height)]">
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(), mobileAppJsonLd()]} />

      <Hero />
      <TrustBar />
      <ValueProp />
      <Features />
      <AppPreview />
      <Pricing />
      <Faq />
    </MainLayout>
  );
}
