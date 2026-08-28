import { Skeleton } from '@/components/ui/skeleton';
import { SectionContainer } from '@/components/general/SectionContainer';

/** Loading placeholder shown while `getCtaContent()` is pending; mirrors CtaView's shell so there's no layout shift when real content swaps in. */
export function CtaSkeleton() {
  return (
    <SectionContainer
      id="get-started"
      className="scroll-mt-header"
      containerClassName="px-4"
      backgroundImageSrc="/images/cta-bg.png">
      <div
        className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between"
        aria-busy="true"
        aria-label="Loading CTA">
        <div className="w-full max-w-[399px]">
          <Skeleton className="h-[29px] w-[157px] rounded-full" />
          <Skeleton className="mt-4 h-[93px] w-full" />
          <Skeleton className="mt-4 h-[52px] w-full max-w-[313px]" />

          <div className="mt-6 flex gap-3">
            <Skeleton className="h-[52px] w-[165px] rounded-md" />
            <Skeleton className="h-[52px] w-[165px] rounded-md" />
          </div>
        </div>

        <div className="w-full max-w-[399px]">
          <Skeleton className="h-3 w-40" />

          <div className="mt-3 flex gap-3">
            <Skeleton className="h-[52px] flex-1 rounded-md" />
            <Skeleton className="h-[52px] w-[120px] shrink-0 rounded-md" />
          </div>

          <Skeleton className="mt-3 h-4 w-56" />
        </div>
      </div>
    </SectionContainer>
  );
}
