import { Skeleton } from '@/components/ui/skeleton';
import { SectionContainer } from '@/components/general/SectionContainer';

/** Loading placeholder shown while `getPricingContent()` is pending; mirrors PricingView's shell so there's no layout shift when real content swaps in. */
export function PricingSkeleton() {
  return (
    <SectionContainer id="pricing" className="scroll-mt-header" background="muted">
      <div aria-busy="true" aria-label="Loading pricing">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="mt-4 h-[76px] w-full max-w-[576px]" />
        <Skeleton className="mt-2 h-[26px] w-64" />

        <Skeleton className="mt-8 h-6 w-44 rounded-full" />

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-[566px] w-full rounded-3xl" />
          <Skeleton className="h-[566px] w-full rounded-3xl" />
        </div>

        <Skeleton className="mt-8 h-5 w-full max-w-xl" />
      </div>
    </SectionContainer>
  );
}
