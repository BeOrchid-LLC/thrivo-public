import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  /**
   * Small caption above the heading. A plain string renders as the usual
   * uppercase text eyebrow (e.g. "Features", "Pricing"); pass a node (e.g.
   * `<EyebrowBadge variant="solid">`) for a pill-style caption like CTA's
   * "Launching soon" badge instead.
   */
  eyebrow?: ReactNode;
  heading: string;
  /** Supporting copy under the heading. */
  subtext?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  headingClassName?: string;
}

/**
 * Marketing section header from the Figma landing page (ValueProp, node
 * 144:537): eyebrow (12px bold uppercase green) + extrabold h2 (42px) +
 * subtle-foreground supporting paragraph (16px). Reused by every section
 * that has this eyebrow/heading/subtext shape.
 */
export const SectionHeader = ({
  eyebrow,
  heading,
  subtext,
  align = 'left',
  className,
  headingClassName,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn('flex flex-col', align === 'center' && 'items-center text-center', className)}>
      {eyebrow &&
        (typeof eyebrow === 'string' ? <p className="text-eyebrow">{eyebrow}</p> : eyebrow)}
      <h2 className={cn('text-section-h2', eyebrow && 'mt-4', headingClassName)}>{heading}</h2>
      {subtext && <div className="text-section-subtext mt-6 max-w-xl">{subtext}</div>}
    </div>
  );
};
