import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * The Thrivo "T" mark (public/icons/logo.svg), inlined so it can be sized
 * without a network request and stays crisp at any size.
 */
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden>
      <path
        d="M30.1369 0C41.0313 0 49.863 8.83164 49.863 19.726V70.137C49.863 75.5842 45.4471 80 39.9999 80C34.5528 80 30.1369 75.5842 30.1369 70.137V0Z"
        fill="#09823C"
      />
      <path
        d="M19.726 19.726C8.83163 19.726 -3.86044e-07 10.8944 -8.62252e-07 -1.14441e-05L30.137 -1.27614e-05C41.0314 -1.32376e-05 49.863 8.83163 49.863 19.726L19.726 19.726Z"
        fill="#09823C"
      />
      <path
        d="M49.8629 8.62251e-07C38.9686 3.86043e-07 30.1369 8.83165 30.1369 19.726L60.2739 19.726C71.1683 19.726 79.9999 10.8944 79.9999 2.17958e-06L49.8629 8.62251e-07Z"
        fill="#F39C12"
      />
    </svg>
  );
}

interface LogoProps {
  /** Show the "thrivo" wordmark next to the mark. Defaults to true. */
  showText?: boolean;
  hideTextOnMobile?: boolean;
  className?: string;
  textClassName?: string;
  /** Wraps the logo in a Link when set; pass "" to render unlinked (e.g. splash screen). */
  href?: string;
  size?: number;
}

/**
 * Single source of truth for the Thrivo logo — use this anywhere the brand
 * mark or wordmark appears (header, footer, splash screen, etc).
 */
export function Logo({
  showText = true,
  hideTextOnMobile = false,
  className = '',
  textClassName = '',
  href = '/',
  size = 32,
}: LogoProps) {
  const textClasses = hideTextOnMobile ? 'hidden sm:block' : '';
  const logoContent = (
    <div className={cn('flex items-center gap-2', className)}>
      <LogoMark size={size} />
      {showText && (
        <span
          className={cn(
            'font-display font-bold text-xl lowercase text-foreground',
            textClasses,
            textClassName
          )}>
          thrivo
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center" aria-label="Thrivo home">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
