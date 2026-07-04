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
 * Marketing section header from the Figma landing page: eyebrow (12px bold
 * uppercase green) + extrabold h2 (42px) + muted supporting paragraph.
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
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}>
      {eyebrow && <p className="text-eyebrow">{eyebrow}</p>}
      <h2 className={cn('text-section-h2', headingClassName)}>{heading}</h2>
      {subtext && <div className="text-body-lg max-w-xl">{subtext}</div>}
    </div>
  );
};
