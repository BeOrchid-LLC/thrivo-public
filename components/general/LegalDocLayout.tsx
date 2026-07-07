'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  LegalBlock,
  LegalDocContent,
  LegalDocSection,
  LegalListItem,
} from '@/lib/content/legal/types';
import { LegalFooter } from '../layout/LegalFooter';

const EMAIL_PATTERN = /[\w.+-]+@[\w-]+\.[\w.-]+/g;

/** Renders `text` with any email addresses turned into mailto links (e.g. "email subscriptions@beorchid.com"). */
function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(EMAIL_PATTERN);
  const emails = text.match(EMAIL_PATTERN) ?? [];

  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {emails[i] && (
        <a
          href={`mailto:${emails[i]}`}
          className="font-medium text-primary-active underline hover:no-underline">
          {emails[i]}
        </a>
      )}
    </Fragment>
  ));
}

function ParagraphBlockView({ text }: { text: string }) {
  return (
    <p className="text-xs leading-[1.625] text-[#4a5565] lg:text-sm">
      <LinkifiedText text={text} />
    </p>
  );
}

function ListItemRow({ item }: { item: LegalListItem }) {
  return (
    <li className="flex items-start gap-2 text-sm leading-[1.625] text-[#364153]">
      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
      <span>
        {item.term && <span className="font-bold text-foreground">{item.term} — </span>}
        {item.text}
      </span>
    </li>
  );
}

/**
 * One row of a definition-style list (e.g. "Stripe — payment processing"):
 * dot + bold term + muted description, divided from the next row by a
 * hairline border. Below `lg`, term/description stack vertically (no
 * em-dash) with a primary-tinted divider and smaller type; at `lg` and up
 * they sit inline on one line with a neutral divider.
 */
function DefinitionListRow({ item, isLast }: { item: LegalListItem; isLast: boolean }) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 px-3.5 py-3 lg:items-center lg:gap-2 lg:px-4 lg:py-2.5',
        !isLast && 'border-b border-primary-active/[0.07] lg:border-black/10'
      )}>
      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary lg:mt-0" aria-hidden />
      <div className="flex flex-col lg:flex-row lg:items-baseline lg:gap-1">
        <span className="text-[0.8125rem] leading-[1.5] font-semibold text-[#1e2939] lg:text-sm">
          {item.term}
        </span>
        <span className="text-[0.6875rem] leading-[1.375] text-[#6a7282] lg:text-sm">
          <span className="hidden lg:inline">— </span>
          {item.text}
        </span>
      </div>
    </div>
  );
}

/**
 * A bordered bullet-list card; the icon+label header is optional (e.g. "Your
 * rights" has no header). When every item has a `term`, it renders as a
 * divided definition-list instead (e.g. "Third-party services") -- rows with
 * their own padding and a hairline divider, rather than a padded card of
 * flowing bullet text.
 */
function ListBlockView({ block }: { block: Extract<LegalBlock, { type: 'list' }> }) {
  const isDefinitionList = block.items.every(item => item.term);

  if (isDefinitionList) {
    return (
      <div className="overflow-hidden rounded-[14px] border border-primary-active/[0.13] lg:rounded-[10px]">
        {block.items.map((item, i) => (
          <DefinitionListRow key={i} item={item} isLast={i === block.items.length - 1} />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-primary-active/[0.13] p-4">
      {(block.icon || block.label) && (
        <div className="mb-2 flex items-center gap-2">
          {block.icon && (
            <span className="text-base" aria-hidden>
              {block.icon}
            </span>
          )}
          {block.label && <p className="text-sm font-semibold text-[#1e2939]">{block.label}</p>}
        </div>
      )}
      <ul className="flex flex-col">
        {block.items.map((item, i) => (
          <ListItemRow key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}

/** An icon-less title + paragraph mini-card (e.g. "Retention"). */
function NoteBlockView({ block }: { block: Extract<LegalBlock, { type: 'note' }> }) {
  return (
    <div className="rounded-lg bg-muted p-5">
      <p className="text-sm font-bold text-foreground">{block.title}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        <LinkifiedText text={block.text} />
      </p>
    </div>
  );
}

/** A highlighted bar, optionally with an action button (e.g. "Email us"). */
function CalloutBarBlockView({ block }: { block: Extract<LegalBlock, { type: 'callout-bar' }> }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-[10px] bg-primary-active/[0.06] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-sm text-[#364153]">
        <LinkifiedText text={block.text} />
      </p>
      {block.action && (
        <a
          href={block.action.href}
          className="inline-flex shrink-0 items-center justify-center rounded-[4px] bg-primary-active px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-primary-active/90">
          {block.action.label}
        </a>
      )}
    </div>
  );
}

function SectionBlockView({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <ParagraphBlockView text={block.text} />;
    case 'list':
      return <ListBlockView block={block} />;
    case 'note':
      return <NoteBlockView block={block} />;
    case 'callout-bar':
      return <CalloutBarBlockView block={block} />;
  }
}

/** One numbered section: heading, optional callout pill, then its ordered content blocks. */
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
      <div className="flex items-center gap-2.5 lg:gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-active text-xs font-bold text-white lg:size-8 lg:text-sm lg:font-semibold">
          {index + 1}
        </span>
        <h2 className="text-[0.9375rem] leading-[1.375] font-semibold text-[#101828] lg:text-lg">
          {section.heading}
        </h2>
      </div>

      {section.callout && (
        <p className="mt-4 inline-flex w-fit items-center rounded-[8px] bg-primary-active/[0.08] px-3 py-1.5 text-[0.75rem] leading-4 font-semibold tracking-[0.05em] text-primary-active uppercase lg:mt-5">
          {section.callout}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-4 lg:mt-5 lg:gap-5">
        {section.blocks.map((block, i) => (
          <SectionBlockView key={i} block={block} />
        ))}
      </div>
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
            <h1 className="text-3xl font-bold text-[#101828]">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-[#6a7282]">{subtitle}</p>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 rounded-[10px] border border-primary-active/[0.13] bg-primary-active/[0.03] px-8 py-4 sm:grid-cols-4">
              {meta.map(item => (
                <div key={item.label}>
                  <p className="text-[0.625rem] leading-[0.9375rem] font-semibold tracking-[0.1em] text-[#99a1af] uppercase">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#1e2939]">{item.value}</p>
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
          <LegalFooter />
        </div>
      </div>
    </div>
  );
}
