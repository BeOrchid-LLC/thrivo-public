import Image from 'next/image';
import { SectionHeader } from '@/components/general/SectionHeader';
import type { AppPreviewContent } from '@/lib/content/app-preview';

/**
 * AppPreview (Figma node 144:668), presentational: pure function of `content`
 * so both the live-fetched path and the error-boundary fallback path render
 * identical markup. Composition follows the reference screenshot (phone
 * mockup left, copy right, centered as a pair) rather than Figma's raw node
 * tree, which has a couple of stray/duplicate containers that never render
 * (an empty container behind the phone, an off-canvas decorative layer) --
 * the decorative glow they'd otherwise produce is already baked into
 * public/images/progress-bg.png. Section padding/width follow the same
 * regular-container + section-padding classes SectionContainer uses, hand-
 * rolled here (as in Hero) because of the full-bleed background image.
 */
export function AppPreviewView({ content }: { content: AppPreviewContent }) {
  return (
    <section className="relative overflow-hidden section-padding">
      <Image src={content.backgroundImageSrc} alt="" fill sizes="100vw" className="object-cover" />

      <div className="regular-container relative z-10">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-x-[222px]">
          <div className="flex justify-center">
            <Image
              src={content.phoneImageSrc}
              alt={content.phoneImageAlt}
              width={218}
              height={486}
              className="h-auto w-full max-w-[218px]"
            />
          </div>

          <div className="w-full max-w-[391px]">
            <SectionHeader
              eyebrow={content.eyebrow}
              heading={content.heading}
              subtext={content.paragraph}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
