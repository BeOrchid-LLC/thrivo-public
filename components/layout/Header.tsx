'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu } from 'lucide-react';
import { Logo } from '@/components/atoms/Logo';
import { NAV_LINKS } from '@/lib/constants/texts';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { GhostBtn } from '@/components/atoms/GhostBtn';

/**
 * Fixed public header from the Figma nav (node 144:458): logo left, anchor
 * links center, green "Get started" pill right. Collapses to a sheet on mobile.
 */
export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const getStartedBtn = (
    <Link
      href="#get-started"
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary/90 active:bg-primary-active">
      Get started
      <ArrowRight className="size-3.5" aria-hidden />
    </Link>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-height)] border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="regular-container flex h-full items-center justify-between gap-4">
        <Logo />

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
          aria-label="Main">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">{getStartedBtn}</div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <GhostBtn
              LucideIcon={Menu}
              iconClass="size-6"
              srOnlyText="Open menu"
              className="md:hidden touch-hit"
            />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-6">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-8 flex flex-col gap-6">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-foreground transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ))}
              <div onClick={() => setMobileOpen(false)}>{getStartedBtn}</div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
