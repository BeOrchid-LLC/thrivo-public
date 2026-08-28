import { LegalHeader } from '@/components/layout/LegalHeader';
import { ScrollToTop } from '@/components/general/ScrollToTop';

/**
 * Shared shell for Privacy Policy / Terms of Service / Cancellation Policy /
 * Contact — fixed
 * header + content + footer shape like `MainLayout`, but with `LegalHeader`
 * (legal-page nav, no "Get started" CTA) and `LegalFooter` (compact,
 * content-width-constrained, not the marketing site's full-bleed `Footer`).
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LegalHeader />
      <main className="min-h-screen pt-[var(--header-height)]">
        {children}
        <ScrollToTop />
      </main>
    </>
  );
}
