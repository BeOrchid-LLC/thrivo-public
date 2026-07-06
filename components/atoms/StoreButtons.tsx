import Link from 'next/link';
import { cn } from '@/lib/utils';

interface StoreButtonProps {
  href: string;
  iconSrc: string;
  label: string;
  className?: string;
}

/**
 * Dark store pill from the Figma hero/CTA: ink fill, 52px tall, 14px radius,
 * green glow shadow (nodes 144:501 / 144:505).
 */
function StoreButton({ href, iconSrc, label, className }: StoreButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-13 min-w-[165px] items-center justify-center gap-2.5 rounded-md bg-foreground px-6 text-[0.9375rem] font-semibold text-background shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
        className
      )}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static 20px icon, no benefit from next/image optimization */}
      <img src={iconSrc} alt="" width={20} height={20} className="size-5" aria-hidden />
      {label}
    </Link>
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
      <StoreButton href={appStoreHref} iconSrc="/icons/apple-white.svg" label="App Store" />
      <StoreButton href={googlePlayHref} iconSrc="/icons/playstore.svg" label="Google Play" />
    </div>
  );
}
