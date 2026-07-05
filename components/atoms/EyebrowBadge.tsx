import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface EyebrowBadgeProps {
  children: ReactNode;
  /** Show the orange/white dot (hero: after the text; solid/CTA: before it, per the design). */
  withDot?: boolean;
  /** Optional leading icon (12px in the design, "tint" variant only). */
  icon?: ReactNode;
  className?: string;
  /** "tint" (default): Hero-style green-tint pill. "solid": CTA-style solid orange pill, white text/dot. */
  variant?: 'tint' | 'solid';
}

/**
 * Pill badge from the Figma hero/CTA sections. "tint" is the hero style:
 * green-tint gradient background, uppercase bold green text, optional orange
 * dot after the text. "solid" is the CTA style (node 144:860): solid orange
 * fill, white text, white dot before the text.
 */
export function EyebrowBadge({
  children,
  withDot = false,
  icon,
  className,
  variant = 'tint',
}: EyebrowBadgeProps) {
  const dot = withDot && (
    <span
      className={cn('size-1.5 rounded-full', variant === 'tint' ? 'bg-accent' : 'bg-white/80')}
      aria-hidden
    />
  );

  return (
    <span
      className={cn(
        variant === 'tint'
          ? 'badge-pill'
          : 'inline-flex items-center gap-1.5 rounded-full bg-accent-hover px-3 py-1.5 text-[11px] font-bold tracking-[0.1em] text-white uppercase',
        className
      )}>
      {variant === 'solid' ? (
        <>
          {dot}
          {children}
        </>
      ) : (
        <>
          {icon}
          {children}
          {dot}
        </>
      )}
    </span>
  );
}
