'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { leadCapturePayloadSchema } from '@beorchid-llc/thrivo-contracts';
import { SectionContainer } from '@/components/general/SectionContainer';
import { SectionHeader } from '@/components/general/SectionHeader';
import { FadeInUpCard } from '@/components/general/MotionContainers';
import { EyebrowBadge } from '@/components/atoms/EyebrowBadge';
import { StoreButtons } from '@/components/atoms/StoreButtons';
import { RegularInput } from '@/components/atoms/RegularInput';
import { RegularBtn } from '@/components/atoms/RegularBtn';
import { toast } from '@/components/atoms/Toast';
import { captureLead } from '@/lib/api/leads';
import type { CtaContent } from '@/lib/content/cta';

// Derived from the shared contracts schema (the same one the backend's
// leadsRateLimit route validates against) rather than re-declared, so client
// and server can never drift on what counts as a valid email (R6 I24). The
// form only collects `email`; `source` and the UTM params are added
// programmatically after validation, same as before.
const ctaEmailSchema = leadCapturePayloadSchema.pick({ email: true });
type CtaFormValues = z.infer<typeof ctaEmailSchema>;

/**
 * CTA (Figma node 144:855), presentational: pure function of `content`. Only
 * the elements visible in the reference screenshot are built -- the design's
 * radial glow-orb layer (node 144:856) is already baked into
 * public/images/cta-bg.png, so it isn't rebuilt as a separate element here.
 * `id="get-started"` matches the anchor the header's "Get started" link and
 * BUILD-NOTES rule 3 already expect.
 */
export function CtaView({ content }: { content: CtaContent }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CtaFormValues>({
    resolver: zodResolver(ctaEmailSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async ({ email }: CtaFormValues) => {
    const params = new URLSearchParams(window.location.search);

    setIsSubmitting(true);
    try {
      await captureLead({
        email,
        source: 'cta',
        utmSource: params.get('utm_source') ?? undefined,
        utmMedium: params.get('utm_medium') ?? undefined,
        utmCampaign: params.get('utm_campaign') ?? undefined,
      });
      toast({
        title: "You're on the list!",
        description: "We'll email you the moment Thrivo launches.",
        variant: 'success',
      });
      reset();
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Please try again in a moment.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionContainer
      id="get-started"
      className="scroll-mt-header"
      containerClassName="px-4"
      backgroundImageSrc="/images/cta-bg.png">
      <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
        <FadeInUpCard index={0} className="w-full max-w-[399px]">
          <SectionHeader
            eyebrow={
              <EyebrowBadge variant="solid" withDot className="w-fit">
                {content.badge}
              </EyebrowBadge>
            }
            heading={content.heading}
            subtext={content.subtext}
          />

          <StoreButtons
            className="mt-6"
            appStoreHref={content.appStoreHref}
            googlePlayHref={content.googlePlayHref}
          />
        </FadeInUpCard>

        <FadeInUpCard index={1} className="w-full max-w-[399px]">
          <p className="text-[0.6875rem] font-bold tracking-[0.1em] text-muted-foreground uppercase">
            {content.formLabel}
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-3 flex items-start gap-3">
            <RegularInput
              type="email"
              placeholder={content.formPlaceholder}
              disabled={isSubmitting}
              wrapClassName="flex-1"
              aria-label={content.formLabel}
              errors={errors.email?.message ? [errors.email.message] : []}
              {...register('email')}
            />
            <RegularBtn
              type="submit"
              text={content.formCta}
              variant="none"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="h-[3.25rem] shrink-0 rounded-md bg-primary-active text-white shadow-sm hover:bg-primary-active/90"
            />
          </form>

          <p className="mt-3 text-[0.8125rem] text-muted-foreground">{content.formFinePrint}</p>
        </FadeInUpCard>
      </div>
    </SectionContainer>
  );
}
