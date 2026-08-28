import Link from 'next/link';
import { LogoMark } from '@/components/atoms/Logo';

/**
 * Footer for the (legal) route group (Figma: Privacy Policy / Terms of
 * Service / Contact). Unlike the marketing `Footer` (full-bleed `bg-muted` +
 * neutral border, two stacked rows), this one is a single compact row, has
 * no background fill, a primary-active-tinted border (matching the
 * card borders used throughout LegalDocLayout), and is constrained to the
 * page's content width via `regular-container` directly on the `<footer>`
 * itself — on desktop it does not span the full viewport width, only the
 * main content column.
 */
export function LegalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="regular-container px-4 flex flex-col items-start gap-3 border-t border-primary-active/[0.13] mt-2 lg:mt-10 pt-6 pb-0 lg:pb-10 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2 text-xs text-[#737373]">
        <LogoMark size={20} />
        <span>© {year} BeOrchid LLC</span>
        <span className="text-[#99a1af]">·</span>
        <Link href="/" className="text-primary-active hover:underline">
          thrivo.fit
        </Link>
        <span className="text-[#99a1af]">·</span>
        <a href="mailto:subscriptions@beorchid.com" className="text-primary-active hover:underline">
          subscriptions@beorchid.com
        </a>
      </div>
      <p className="text-xs text-[#737373]">© {year} BeOrchid LLC. All rights reserved.</p>
    </footer>
  );
}
