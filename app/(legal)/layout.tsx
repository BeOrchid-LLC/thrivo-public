import { LegalHeader } from '@/components/layout/LegalHeader';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/general/ScrollToTop';

/**
 * Shared shell for Privacy Policy / Terms of Service / Contact — same
 * fixed-header + footer shape as `MainLayout`, but with `LegalHeader`
 * (legal-page nav, no "Get started" CTA) instead of the marketing `Header`.
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LegalHeader />
      <main className="min-h-screen pt-[var(--header-height)]">
        {children}
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}
