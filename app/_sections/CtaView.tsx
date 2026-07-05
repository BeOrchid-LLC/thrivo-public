'use client';

import { FormEvent } from 'react';
import { SectionContainer } from '@/components/general/SectionContainer';
import { SectionHeader } from '@/components/general/SectionHeader';
import { EyebrowBadge } from '@/components/atoms/EyebrowBadge';
import { StoreButtons } from '@/components/atoms/StoreButtons';
import { RegularInput } from '@/components/atoms/RegularInput';
import { RegularBtn } from '@/components/atoms/RegularBtn';
import type { CtaContent } from '@/lib/content/cta';

/**
 * CTA (Figma node 144:855), presentational: pure function of `content`. Only
 * the elements visible in the reference screenshot are built -- the design's
 * radial glow-orb layer (node 144:856) is already baked into
 * public/images/cta-bg.png, so it isn't rebuilt as a separate element here.
 * `id="get-started"` matches the anchor the header's "Get started" link and
 * BUILD-NOTES rule 3 already expect.
 */
export function CtaView({ content }: { content: CtaContent }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO(cta): wire up the email-capture backend once it exists (see docs/BUILD-NOTES.md).
  };

  return (
    <SectionContainer
      id="get-started"
      className="scroll-mt-header"
      backgroundImageSrc="/images/cta-bg.png">
      <div className="mx-auto flex max-w-[1152px] flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full max-w-[399px]">
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
        </div>

        <div className="w-full max-w-[399px]">
          <p className="text-[11px] font-bold tracking-[0.1em] text-muted-foreground uppercase">
            {content.formLabel}
          </p>

          <form onSubmit={handleSubmit} className="mt-3 flex items-start gap-3">
            <RegularInput
              type="email"
              name="email"
              placeholder={content.formPlaceholder}
              required
              wrapClassName="flex-1"
              aria-label={content.formLabel}
            />
            <RegularBtn
              type="submit"
              text={content.formCta}
              variant="none"
              className="h-[3.25rem] shrink-0 rounded-md bg-primary-active text-white shadow-sm hover:bg-primary-active/90"
            />
          </form>

          <p className="mt-3 text-xs text-muted-foreground">{content.formFinePrint}</p>
        </div>
      </div>
    </SectionContainer>
  );
}
