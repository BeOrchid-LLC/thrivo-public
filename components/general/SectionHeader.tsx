import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  /** Small uppercase eyebrow above the heading (e.g. "Features", "Pricing"). */
  eyebrow?: string;
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
      {eyebrow && <p className="text-eyebrow">{eyebrow}</p>}
      <h2 className={cn('text-section-h2', eyebrow && 'mt-4', headingClassName)}>{heading}</h2>
      {subtext && <div className="text-section-subtext mt-6 max-w-xl">{subtext}</div>}
    </div>
  );
};
