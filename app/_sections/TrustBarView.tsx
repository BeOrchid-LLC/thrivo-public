'use client';

import { cn } from '@/lib/utils';
import { FadeInUpCard } from '@/components/general/MotionContainers';
import type { TrustBarContent } from '@/lib/content/trust-bar';

/**
 * TrustBar (Figma node 144:513), presentational: pure function of `content`
 * so both the live-fetched path and the error-boundary fallback path render
 * identical markup. Full-width tint band (border-y + `.bg-tint-band` wash)
 * with a centered, wrapping row of stat pairs — narrower vertical padding
 * than the standard `section-padding` rhythm, matching the slim strip in
 * the design.
 */
export function TrustBarView({ content }: { content: TrustBarContent }) {
  return (
    <section className="w-full overflow-hidden border-y border-[#e5e7eb] bg-tint-band py-[41px]">
      <div className="public-container flex flex-wrap items-center justify-around gap-x-16 gap-y-8">
        {content.stats.map((stat, index) => (
          <FadeInUpCard key={stat.label} index={index} className="text-center">
            <p
              className={cn(
                'text-[1.375rem] leading-[1.5] font-extrabold',
                stat.accent ? 'text-accent-hover' : 'text-foreground'
              )}>
              {stat.value}
            </p>
            <p className="mt-1 text-base leading-[1.5] text-muted-foreground">{stat.label}</p>
          </FadeInUpCard>
        ))}
      </div>
    </section>
  );
}
