'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { AppLink } from '@/components/atoms/AppLink';
import { GhostBtn } from '@/components/atoms/GhostBtn';
import { Logo } from '@/components/atoms/Logo';
import { NAV_LINKS } from '@/lib/constants/texts';

/**
 * Structure/UX ported from oj-multimedia's Header (fixed bar, `container mx-auto
 * px-4`, `lg:` desktop breakpoint, inline expanding mobile panel instead of a
 * side drawer). Content — logo, nav labels, CTA styling — matches the Figma
 * nav (node 144:458): dark-green pill CTA, uppercase wordmark, no nav icons.
 */
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getStartedBtn = (
    <AppLink
      href="#get-started"
      onClick={() => setIsMenuOpen(false)}
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] bg-primary-active px-5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-active/90 lg:w-fit">
      Get started
      <ArrowRight className="size-3.5" aria-hidden />
    </AppLink>
  );

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
      style={{ height: 'var(--header-height)' }}>
      <div className="public-container mx-auto h-full">
        <div className="flex h-full items-center justify-between">
          <Logo textClassName="text-base uppercase tracking-normal" />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV_LINKS.map(link => (
              <AppLink
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground">
                {link.label}
              </AppLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">{getStartedBtn}</div>

            <GhostBtn
              LucideIcon={isMenuOpen ? X : Menu}
              iconClass="size-5"
              srOnlyText={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="rounded-full touch-hit lg:hidden"
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
            <nav className="container mx-auto flex flex-col gap-2 px-4 py-4" aria-label="Main">
              {NAV_LINKS.map(link => (
                <AppLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground">
                  {link.label}
                </AppLink>
              ))}
              <div className="mt-2 border-t border-border pt-2">{getStartedBtn}</div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
