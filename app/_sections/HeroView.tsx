import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import { EyebrowBadge } from '@/components/atoms/EyebrowBadge';
import { StoreButtons } from '@/components/atoms/StoreButtons';
import type { HeroContent } from '@/lib/content/hero';

/**
 * Hero (Figma node 144:482), presentational: pure function of `content` so
 * both the live-fetched path and the error-boundary fallback path render
 * identical markup. Layout/composition follows the reference screenshot
 * (two columns, dashboard mockup right); styling values (colors, type scale,
 * spacing) come from Figma. The decorative glows are baked into the
 * background image rather than built with CSS gradients.
 */
export function HeroView({ content }: { content: HeroContent }) {
  return (
    <section className="relative overflow-hidden py-20 lg:flex lg:min-h-[708px] lg:items-center lg:py-0">
      <Image
        src={content.backgroundImageSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="regular-container relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="max-w-[448px]">
          <EyebrowBadge icon={<BadgeCheck className="size-3" aria-hidden />} withDot>
            {content.eyebrow}
          </EyebrowBadge>

          <h1 className="text-display mt-6">
            {content.headingLine1}
            <br />
            <span className="gradient-text">{content.headingHighlight}</span>{' '}
            {content.headingLine2Rest}
            <br />
            {content.headingLine3}
          </h1>

          <p className="text-body-lg mt-6">{content.paragraph}</p>

          <StoreButtons className="mt-8" />

          <p className="text-fine mt-6">{content.finePrint}</p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Image
            src={content.dashboardImageSrc}
            alt={content.dashboardAlt}
            width={227}
            height={492}
            priority
            className="h-auto w-full max-w-[227px]"
          />
        </div>
      </div>
    </section>
  );
}
