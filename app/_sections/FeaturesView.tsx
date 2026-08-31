'use client';

import { Bell, BarChart3, Droplets, Scan, ShieldCheck, TrendingUp } from 'lucide-react';
import { SectionContainer } from '@/components/general/SectionContainer';
import { SectionHeader } from '@/components/general/SectionHeader';
import { FadeInUpWrap, FadeInUpCard } from '@/components/general/MotionContainers';
import { cn } from '@/lib/utils';
import type { LucideIconComp } from '@/lib/types/general';
import type { Feature, FeatureIcon, FeaturesContent } from '@/lib/content/features';

const FEATURE_ICONS: Record<FeatureIcon, LucideIconComp> = {
  scan: Scan,
  'bar-chart': BarChart3,
  'trending-up': TrendingUp,
  bell: Bell,
  droplets: Droplets,
  'shield-check': ShieldCheck,
};

/** One card in the 2-up grid: icon tile + title + body (repeated for content.features). */
function FeatureCard({ icon, title, body, accent }: Feature) {
  const Icon = FEATURE_ICONS[icon];
  return (
    <div className="rounded-lg border border-border bg-white p-6">
      <div
        className={cn(
          'flex size-10 items-center justify-center rounded-md',
          accent ? 'bg-tint-tile-accent' : 'bg-tint-tile'
        )}>
        <Icon
          className={cn('size-[19px]', accent ? 'text-accent-hover' : 'text-primary')}
          aria-hidden
        />
      </div>
      <p className="text-card-title mt-4">{title}</p>
      <p className="text-card-body mt-2">{body}</p>
    </div>
  );
}

/**
 * Features (Figma node 144:601), presentational: pure function of `content`
 * so both the live-fetched path and the error-boundary fallback path render
 * identical markup. The header and grid use the full shared section rails; the
 * heading itself retains its readable text width.
 */
export function FeaturesView({ content }: { content: FeaturesContent }) {
  return (
    <SectionContainer id="features" className="scroll-mt-header overflow-hidden" background="muted">
      <div>
        <FadeInUpWrap>
          <SectionHeader
            eyebrow={content.eyebrow}
            heading={content.heading}
            headingClassName="max-w-[757px]"
          />
        </FadeInUpWrap>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content.features.map((feature, index) => (
            <FadeInUpCard key={feature.title} index={index}>
              <FeatureCard {...feature} />
            </FadeInUpCard>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
