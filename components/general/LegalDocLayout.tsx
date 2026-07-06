'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Ban,
  ChevronDown,
  CreditCard,
  Server,
  Shield,
  ShieldAlert,
  User,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  LegalDocContent,
  LegalDocGroup,
  LegalDocIconKey,
  LegalDocSection,
} from '@/lib/content/legal/types';
import type { LucideIconComp } from '@/lib/types/general';

const LEGAL_DOC_ICONS: Record<LegalDocIconKey, LucideIconComp> = {
  user: User,
  activity: Activity,
  shield: Shield,
  server: Server,
  'credit-card': CreditCard,
  'shield-alert': ShieldAlert,
  ban: Ban,
};

/** Bullet list of one group's items (e.g. under "Account information"). */
function GroupItemList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-col gap-2">
      {items.map(item => (
        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** One bordered icon+bullet-list card within a section (e.g. "Account information"). */
function GroupCard({ group }: { group: LegalDocGroup }) {
  const Icon = LEGAL_DOC_ICONS[group.icon];
  return (
    <div className="card-surface p-5">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-primary" aria-hidden />
        <p className="text-sm font-bold text-foreground">{group.label}</p>
      </div>
      <GroupItemList items={group.items} />
    </div>
  );
}

/** One numbered section: heading, optional callout pill, paragraphs, optional group cards. */
function SectionBlock({
  section,
  index,
  registerRef,
}: {
  section: LegalDocSection;
  index: number;
  registerRef: (el: HTMLElement | null) => void;
}) {
  return (
    <section id={section.id} ref={registerRef} className="scroll-mt-legal">
      <div className="flex items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-active text-sm font-bold text-white">
          {index + 1}
        </span>
        <h2 className="text-lg font-bold text-foreground sm:text-xl">{section.heading}</h2>
      </div>

      {section.callout && <p className="badge-pill mt-4 w-fit">{section.callout}</p>}

      <div className="mt-4 flex flex-col gap-3">
        {section.paragraphs.map((paragraph, i) => (
          <p key={i} className="leading-[1.625] text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      {section.groups && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {section.groups.map(group => (
            <GroupCard key={group.label} group={group} />
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Shared "long-form legal document" shell for Privacy Policy / Terms of
 * Service (Figma: sidebar TOC + scrollspy). TOC entries are plain native
 * `<a href="#id">` tags, not `AppLink`/next/link — Next's `<Link>` intercepts
 * the click for client-side routing and does not reliably scroll for a
 * same-page hash-only href, so a real anchor is what actually lets the
 * browser's native fragment navigation (root's `data-scroll-behavior="smooth"`
 * + each section's `.scroll-mt-legal` offset) do the scrolling.
 *
 * Below `lg`, the sidebar collapses into a sticky "On this page" bar
 * directly under the header, showing the active section and expanding into
 * the same list on tap.
 */
export function LegalDocLayout({ content }: { content: LegalDocContent }) {
  const { title, subtitle, meta, sections } = content;
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const sectionElsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const topMostVisible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (topMostVisible) {
          setActiveId(topMostVisible.target.id);
        }
      },
      // Fires once a section's heading crosses ~15% down the viewport, so
      // the "active" section updates while it's still comfortably in view
      // rather than only once it hits the very top edge.
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach(section => {
      const el = sectionElsRef.current[section.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const activeSection = sections.find(section => section.id === activeId) ?? sections[0];

  return (
    <div className="pb-24">
      {/* Mobile/tablet collapsible TOC — sits right under the fixed header. */}
      <div className="sticky top-[var(--header-height)] z-40 mt-0 border-y border-border bg-background lg:hidden">
        <button
          type="button"
          onClick={() => setIsTocOpen(prev => !prev)}
          aria-expanded={isTocOpen}
          className="regular-container flex w-full items-center justify-between gap-3 py-3">
          <span className="text-[0.6875rem] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            On this page
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-primary-active">
            {activeSection?.heading}
            <ChevronDown
              className={cn('size-4 transition-transform duration-200', isTocOpen && 'rotate-180')}
              aria-hidden
            />
          </span>
        </button>

        <AnimatePresence>
          {isTocOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              aria-label="On this page"
              className="overflow-hidden border-t border-border">
              <ul className="regular-container flex flex-col py-2">
                {sections.map(section => {
                  const isActive = section.id === activeId;
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={() => setIsTocOpen(false)}
                        className="flex items-center gap-2.5 py-2.5 text-sm">
                        <span
                          className={cn(
                            'size-1.5 shrink-0 rounded-full',
                            isActive ? 'bg-primary-active' : 'bg-border'
                          )}
                          aria-hidden
                        />
                        <span
                          className={cn(
                            isActive ? 'font-semibold text-primary-active' : 'text-muted-foreground'
                          )}>
                          {section.heading}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <div className="regular-container mt-0 lg:grid lg:grid-cols-[240px_1fr] lg:items-start lg:gap-16">
        {/* Desktop sidebar */}
        <nav
          className="sticky top-[calc(var(--header-height)+2rem)] hidden lg:block"
          aria-label="On this page">
          <p className="text-[0.6875rem] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            On this page
          </p>
          <ul className="mt-4 flex flex-col gap-1">
            {sections.map(section => {
              const isActive = section.id === activeId;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'block rounded-lg px-3 py-2 text-sm transition-colors duration-200',
                      isActive
                        ? 'bg-primary/10 font-semibold text-primary-active'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}>
                    {section.heading}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Content */}
        <div className="mt-0 flex flex-col gap-14">
          <div className="pt-12">
            <h1 className="text-section-h2">{title}</h1>
            <p className="text-section-subtext mt-3 max-w-2xl">{subtitle}</p>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 rounded-2xl bg-muted p-6 sm:grid-cols-4">
              {meta.map(item => (
                <div key={item.label}>
                  <p className="text-[0.6875rem] font-bold tracking-[0.08em] text-muted-foreground uppercase">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          {sections.map((section, index) => (
            <SectionBlock
              key={section.id}
              section={section}
              index={index}
              registerRef={el => {
                sectionElsRef.current[section.id] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
