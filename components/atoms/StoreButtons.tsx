import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StoreButtonProps {
  href: string;
  icon: ReactNode;
  label: string;
  className?: string;
}

/**
 * Dark store pill from the Figma hero/CTA: ink fill, 52px tall, 14px radius,
 * green glow shadow (nodes 144:501 / 144:505).
 */
function StoreButton({ href, icon, label, className }: StoreButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-13 min-w-[165px] items-center justify-center gap-2.5 rounded-md bg-foreground px-6 text-[15px] font-semibold text-background shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
        className
      )}>
      {icon}
      {label}
    </Link>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
      <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31M6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
    </svg>
  );
}

interface StoreButtonsProps {
  appStoreHref?: string;
  googlePlayHref?: string;
  className?: string;
}

/** App Store + Google Play button pair used in the hero and CTA sections. */
export function StoreButtons({
  appStoreHref = '#',
  googlePlayHref = '#',
  className,
}: StoreButtonsProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <StoreButton href={appStoreHref} icon={<AppleIcon />} label="App Store" />
      <StoreButton href={googlePlayHref} icon={<PlayIcon />} label="Google Play" />
    </div>
  );
}
