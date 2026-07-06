'use client';

import { useState } from 'react';
import { Check, TriangleAlert } from 'lucide-react';
import { SectionContainer } from '@/components/general/SectionContainer';
import { SectionHeader } from '@/components/general/SectionHeader';
import { FadeInUpWrap, FadeInUpCard } from '@/components/general/MotionContainers';
import { Switch } from '@/components/ui/switch';
import { AppLink } from '@/components/atoms/AppLink';
import { cn } from '@/lib/utils';
import type { PricingContent, PricingPlan } from '@/lib/content/pricing';

type BillingCycle = 'monthly' | 'annual';

/** One plan card: price + feature checklist + CTA (repeated for content.plans -- Free and Premium, each re-rendered per billing cycle). */
function PricingCard({ plan, billingCycle }: { plan: PricingPlan; billingCycle: BillingCycle }) {
  const { highlighted } = plan;
  const isAnnual = billingCycle === 'annual';
  const variant = plan[billingCycle];
  // Premium's secondary-text tone: muted (#F4F6F9) on the flat monthly green,
  // but white/60 once the darker annual gradient is in play (node 155:1430).
  const mutedTone = highlighted
    ? isAnnual
      ? 'text-white/60'
      : 'text-muted'
    : 'text-subtle-foreground';

  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-3xl p-8',
        highlighted
          ? cn('text-white', isAnnual ? 'bg-premium-card-annual' : 'bg-premium-card')
          : 'border border-border bg-white'
      )}>
      {highlighted && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/20 to-transparent"
        />
      )}

      {(variant.bestValueBadge || variant.trialBadge) && (
        <div className="relative mb-6 flex items-center justify-between gap-2">
          <div>
            {variant.bestValueBadge && (
              <span className="rounded-full bg-accent px-3 py-1 text-[0.6875rem] font-bold text-accent-foreground">
                {variant.bestValueBadge}
              </span>
            )}
          </div>
          <div>
            {variant.trialBadge && (
              <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[0.6875rem] font-bold text-white">
                {variant.trialBadge}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="relative pb-6">
        <p className={cn('text-[0.6875rem] font-bold tracking-[0.1em] uppercase', mutedTone)}>
          {plan.name}
        </p>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-[2.75rem] leading-none font-extrabold">{variant.price.amount}</span>
          {variant.price.period && (
            <span className={cn('pb-1.5 text-sm', mutedTone)}>{variant.price.period}</span>
          )}
        </div>

        {variant.priceNote && (
          <p
            className={cn(
              'mt-1 text-[0.8125rem]',
              highlighted ? mutedTone : 'text-muted-foreground'
            )}>
            {variant.priceNote}
          </p>
        )}

        {variant.billingDetail && (
          <p className="mt-1 text-[0.8125rem] text-white/80">
            {variant.billingDetail.label}{' '}
            <span className="font-bold text-white">{variant.billingDetail.amount}</span>
          </p>
        )}

        {variant.savingsNote && (
          <p className="mt-0.5 text-[0.8125rem] text-white/50">{variant.savingsNote}</p>
        )}
      </div>

      <ul className="relative flex flex-1 flex-col gap-3 pb-8">
        {variant.features.map(feature => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              className={cn(
                'mt-0.5 size-3.5 shrink-0',
                highlighted ? 'text-white' : 'text-primary'
              )}
              aria-hidden
            />
            <span className={cn('text-sm', highlighted ? 'text-white/90' : 'text-foreground/85')}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <AppLink
        href={plan.cta.href}
        className={cn(
          'relative flex h-[52px] items-center justify-center rounded-md text-[0.9375rem] font-semibold transition-colors duration-200',
          highlighted
            ? 'bg-white font-bold text-primary-active hover:bg-white/90'
            : 'border-2 border-foreground text-foreground hover:bg-foreground hover:text-background'
        )}>
        {plan.cta.text}
      </AppLink>
    </div>
  );
}

/**
 * Pricing (Figma node 144:681 monthly / 155:1391 annual), presentational: pure
 * function of `content` so both the live-fetched path and the error-boundary
 * fallback path render identical markup. Billing-cycle toggle is local UI
 * state, not content -- it swaps which variant (`plan.monthly` / `plan.annual`)
 * each card renders, which carries its own price, copy, and badges (e.g.
 * Premium's annual variant swaps in the darker gradient, a "Best value"
 * badge, and a billed-as-yearly breakdown in place of the trial price-note).
 * `ui/switch` is the shared toggle atom already earmarked for this in
 * docs/BUILD-NOTES.md.
 */
export function PricingView({ content }: { content: PricingContent }) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const isAnnual = billingCycle === 'annual';

  return (
    <SectionContainer id="pricing" className="scroll-mt-header" background="muted">
      <div className="mx-auto max-w-[873px]">
        <FadeInUpWrap>
          <SectionHeader
            eyebrow={content.eyebrow}
            heading={content.heading}
            subtext={content.subtext}
            headingClassName="max-w-[576px]"
          />

          <div className="mt-8 flex items-center gap-4">
            <span
              className={cn(
                'text-sm font-semibold',
                isAnnual ? 'text-muted-foreground' : 'text-foreground'
              )}>
              {content.monthlyLabel}
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={checked => setBillingCycle(checked ? 'annual' : 'monthly')}
              aria-label="Toggle annual billing"
            />
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  'text-sm font-semibold',
                  isAnnual ? 'text-foreground' : 'text-muted-foreground'
                )}>
                {content.annualLabel}
              </span>
              <span className="rounded-full bg-accent px-2 py-0.5 text-[0.6875rem] font-bold text-accent-foreground">
                {content.annualSaveBadge}
              </span>
            </span>
          </div>
        </FadeInUpWrap>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
          {content.plans.map((plan, index) => (
            <FadeInUpCard key={plan.id} index={index}>
              <PricingCard plan={plan} billingCycle={billingCycle} />
            </FadeInUpCard>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-2">
          <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
          <p className="text-[0.8125rem] text-muted-foreground">{content.footnote}</p>
        </div>
      </div>
    </SectionContainer>
  );
}
