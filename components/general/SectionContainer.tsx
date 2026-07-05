'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface SectionContainerProps {
  children: ReactNode;
  /** Forwarded to the outer <section> -- e.g. an anchor-nav target like "features". */
  id?: string;
  className?: string;
  containerClassName?: string;
  background?: 'default' | 'muted' | 'primary';
  customContainer?: boolean;
  /** Full-bleed background image behind the container (e.g. CTA's baked-in glow, node 144:855). */
  backgroundImageSrc?: string;
}

const backgroundClasses = {
  default: '',
  // Full-opacity #F4F6F9 alternate section bg from the Figma design (Features, node 144:601).
  muted: 'bg-muted',
  primary: 'bg-primary text-primary-foreground',
};

/**
 * Reusable section container wrapper with consistent padding and container styling
 */
export const SectionContainer = ({
  children,
  id,
  className,
  containerClassName,
  background = 'default',
  customContainer = false,
  backgroundImageSrc,
}: SectionContainerProps) => {
  return (
    <section
      id={id}
      className={cn(
        'w-full section-padding',
        backgroundImageSrc && 'relative overflow-hidden',
        backgroundClasses[background],
        className
      )}>
      {backgroundImageSrc && (
        <Image
          src={backgroundImageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover"
        />
      )}
      <div
        className={cn(
          customContainer ? 'container-custom' : 'regular-container',
          containerClassName
        )}>
        {children}
      </div>
    </section>
  );
};
