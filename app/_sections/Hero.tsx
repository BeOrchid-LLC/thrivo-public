import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import { EyebrowBadge } from '@/components/atoms/EyebrowBadge';
import { StoreButtons } from '@/components/atoms/StoreButtons';
import { HERO_CONTENT } from '@/lib/constants/texts';

/**
 * Hero (Figma node 144:482). Layout/composition follows the reference
 * screenshot (two columns, dashboard mockup right); styling values (colors,
 * type scale, spacing) come from Figma. The decorative glows are baked into
 * public/images/public-hero-bg.png rather than built with CSS gradients.
 */
export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:flex lg:min-h-[708px] lg:items-center lg:py-0">
      <Image
        src="/images/public-hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="regular-container relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="max-w-[448px]">
          <EyebrowBadge icon={<BadgeCheck className="size-3" aria-hidden />} withDot>
            {HERO_CONTENT.eyebrow}
          </EyebrowBadge>

          <h1 className="text-display mt-6">
            {HERO_CONTENT.headingLine1}
            <br />
            <span className="gradient-text">{HERO_CONTENT.headingHighlight}</span>{' '}
            {HERO_CONTENT.headingLine2Rest}
            <br />
            {HERO_CONTENT.headingLine3}
          </h1>

          <p className="text-body-lg mt-6">{HERO_CONTENT.paragraph}</p>

          <StoreButtons className="mt-8" />

          <p className="text-fine mt-6">{HERO_CONTENT.finePrint}</p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Image
            src="/images/mobile-dashboard.png"
            alt={HERO_CONTENT.dashboardAlt}
            width={227}
            height={492}
            priority
            className="h-auto w-full max-w-[227px]"
          />
        </div>
      </div>
    </section>
  );
};
