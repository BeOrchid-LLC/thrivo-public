'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  showText?: boolean;
  hideTextOnMobile?: boolean;
  className?: string;
  textClassName?: string;
  href?: string;
  size?: number;
}

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
      <Image
        src="/logo.svg"
        alt="Thrivo logo"
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
      />
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
