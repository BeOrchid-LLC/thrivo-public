'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
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
 *
 * Above-the-fold, so its reveal plays on mount (`animate`, not the
 * `whileInView` scroll-trigger every other section uses) with each element
 * cascading in 0.1s apart -- see docs/scroll-animations.md.
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}>
            <EyebrowBadge icon={<BadgeCheck className="size-3" aria-hidden />} withDot>
              {content.eyebrow}
            </EyebrowBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display mt-6">
            {content.headingLine1}
            <br />
            <span className="gradient-text">{content.headingHighlight}</span>{' '}
            {content.headingLine2Rest}
            <br />
            {content.headingLine3}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg mt-6">
            {content.paragraph}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            <StoreButtons className="mt-8" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-fine mt-6">
            {content.finePrint}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center lg:justify-end">
          <Image
            src={content.dashboardImageSrc}
            alt={content.dashboardAlt}
            width={227}
            height={492}
            priority
            className="h-auto w-full max-w-[227px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
