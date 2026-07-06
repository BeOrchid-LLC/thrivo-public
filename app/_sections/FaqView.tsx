'use client';

import { SectionContainer } from '@/components/general/SectionContainer';
import { SectionHeader } from '@/components/general/SectionHeader';
import { FadeInUpWrap, FadeInUpCard } from '@/components/general/MotionContainers';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqJsonLd } from '@/lib/jsonld';
import type { FaqContent, FaqQuestion } from '@/lib/content/faq';

/** One Q&A row (repeated for content.questions); ui/accordion already carries the design's divider, spacing, and chevron-rotate styling. */
function FaqAccordionItem({ value, question, answer }: { value: string } & FaqQuestion) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent>{answer}</AccordionContent>
    </AccordionItem>
  );
}

/**
 * FAQ (Figma node 144:804), presentational: pure function of `content` so
 * both the live-fetched path and the error-boundary fallback path render
 * identical markup. Header column is capped narrow like the design (a
 * left-aligned SectionHeader, not the centered variant other sections use);
 * the accordion column sits to its right at the design's ~492px, with the
 * pair spread across the shared max-width container via justify-between.
 */
export function FaqView({ content }: { content: FaqContent }) {
  return (
    <SectionContainer id="faq" className="scroll-mt-header">
      <JsonLd data={faqJsonLd(content.questions)} />

      <div className="mx-auto flex max-w-[1152px] flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <FadeInUpWrap className="lg:max-w-[360px]">
          <SectionHeader
            eyebrow={content.eyebrow}
            heading={content.heading}
            subtext={content.subtext}
          />
        </FadeInUpWrap>

        <Accordion type="single" collapsible className="w-full lg:max-w-[492px]">
          {content.questions.map((faq, index) => (
            <FadeInUpCard key={faq.question} index={index}>
              <FaqAccordionItem value={`item-${index}`} {...faq} />
            </FadeInUpCard>
          ))}
        </Accordion>
      </div>
    </SectionContainer>
  );
}
