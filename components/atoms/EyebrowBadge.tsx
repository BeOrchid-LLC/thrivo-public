import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface EyebrowBadgeProps {
  children: ReactNode;
  /** Show the orange dot after the text (hero style in the Figma design). */
  withDot?: boolean;
  /** Optional leading icon (12px in the design). */
  icon?: ReactNode;
  className?: string;
}

/**
 * Pill badge from the Figma hero/CTA sections: green-tint gradient background,
 * uppercase bold green text, optional orange dot.
 */
export function EyebrowBadge({ children, withDot = false, icon, className }: EyebrowBadgeProps) {
  return (
    <span className={cn('badge-pill', className)}>
      {icon}
      {children}
      {withDot && <span className="size-1.5 rounded-full bg-accent" aria-hidden />}
    </span>
  );
}
