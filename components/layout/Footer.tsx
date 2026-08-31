import Link from 'next/link';
import { Logo } from '@/components/atoms/Logo';
import { COPYRIGHT, FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants/texts';

/**
 * Site footer from the Figma design (node 144:886): logo + legal links +
 * social handles, with the copyright row underneath.
 */
export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="public-container flex flex-col gap-8 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Logo />

          <nav
            className="flex flex-wrap items-center gap-x-8 gap-y-3"
            aria-label="Legal and contact">
            {FOOTER_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-fine">{COPYRIGHT}</p>
          <p className="text-fine">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
