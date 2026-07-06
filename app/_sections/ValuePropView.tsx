import { Check, Leaf, ShieldCheck, Zap } from 'lucide-react';
import { SectionContainer } from '@/components/general/SectionContainer';
import { SectionHeader } from '@/components/general/SectionHeader';
import type { LucideIconComp } from '@/lib/types/general';
import type {
  ValuePropCard as ValuePropCardData,
  ValuePropCardIcon,
  ValuePropContent,
} from '@/lib/content/value-prop';

const CARD_ICONS: Record<ValuePropCardIcon, LucideIconComp> = {
  'shield-check': ShieldCheck,
  zap: Zap,
  leaf: Leaf,
};

/** One checklist row: tint-tile bullet + statement (repeated for content.checklist). */
function ChecklistItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-tint-tile">
        <Check className="size-[11px] text-primary" aria-hidden />
      </span>
      <span className="text-[15px] leading-[1.5] text-foreground">{text}</span>
    </li>
  );
}

/** One flat list-style card: icon tile + title + body (repeated for content.cards). */
function ValuePropCard({ icon, title, body }: ValuePropCardData) {
  const Icon = CARD_ICONS[icon];
  return (
    <div className="flex items-start gap-4 rounded-lg bg-white p-5 shadow-xs">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-tint-tile">
        <Icon className="size-[19px] text-primary" aria-hidden />
      </div>
      <div>
        <p className="text-sm leading-[1.5] font-semibold text-foreground">{title}</p>
        <p className="text-card-body mt-1">{body}</p>
      </div>
    </div>
  );
}

/**
 * ValueProp (Figma node 144:535), presentational: pure function of `content`
 * so both the live-fetched path and the error-boundary fallback path render
 * identical markup. Both columns are capped at the design's 391px so they
 * read as a centered pair rather than stretching across the full section
 * width; outer section padding/max-width come from the shared SectionContainer.
 */
export function ValuePropView({ content }: { content: ValuePropContent }) {
  return (
    <SectionContainer>
      <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-around">
        <div className="w-full max-w-[391px]">
          <SectionHeader
            eyebrow={content.eyebrow}
            heading={content.heading}
            subtext={content.subtext}
          />
          <ul className="mt-8 flex flex-col gap-4">
            {content.checklist.map(item => (
              <ChecklistItem key={item} text={item} />
            ))}
          </ul>
        </div>

        <div className="flex w-full max-w-[391px] flex-col gap-5 rounded-3xl bg-tint-panel p-8">
          {content.cards.map(card => (
            <ValuePropCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
