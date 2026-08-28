'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { AppLink } from '@/components/atoms/AppLink';
import { GhostBtn } from '@/components/atoms/GhostBtn';
import { Logo } from '@/components/atoms/Logo';
import { cn } from '@/lib/utils';
import { LEGAL_NAV_LINKS } from '@/lib/constants/texts';

/**
 * Header variant for the (legal) route group (Figma: Privacy Policy /
 * Terms of Service / Cancellation Policy / Contact). Same fixed-bar shell as
 * `Header`, but the marketing nav + "Get started" CTA are swapped for legal
 * page links
 * with active-route highlighting — there's no CTA on these pages at all,
 * not just a hidden one.
 */
export const LegalHeader = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeLink = LEGAL_NAV_LINKS.find(link => link.href === pathname);

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
      style={{ height: 'var(--header-height)' }}>
      <div className="regular-container mx-auto h-full px-4">
        <div className="flex h-full items-center justify-between">
          <Logo textClassName="text-base uppercase tracking-normal" />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Legal">
            {LEGAL_NAV_LINKS.map(link => {
              const isActive = link.href === pathname;
              return (
                <AppLink
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'font-semibold text-primary-active'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}>
                  {link.label}
                </AppLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            {activeLink && (
              <span className="text-sm font-semibold text-primary-active">{activeLink.label}</span>
            )}
            <GhostBtn
              LucideIcon={isMenuOpen ? X : Menu}
              iconClass="size-5"
              srOnlyText={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="rounded-full touch-hit"
              onClick={() => setIsMenuOpen(prev => !prev)}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background lg:hidden">
            <nav className="container mx-auto flex flex-col gap-2 px-4 py-4" aria-label="Legal">
              {LEGAL_NAV_LINKS.map(link => {
                const isActive = link.href === pathname;
                return (
                  <AppLink
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200',
                      isActive
                        ? 'bg-primary/10 font-semibold text-primary-active'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}>
                    {link.label}
                  </AppLink>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
