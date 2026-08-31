import { Skeleton } from '@/components/ui/skeleton';
import { SectionContainer } from '@/components/general/SectionContainer';

/** Loading placeholder shown while `getValuePropContent()` is pending; mirrors ValuePropView's shell so there's no layout shift when real content swaps in. */
export function ValuePropSkeleton() {
  return (
    <SectionContainer>
      <div
        className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:justify-between"
        aria-busy="true"
        aria-label="Loading value proposition">
        <div className="w-full max-w-[391px]">
          <Skeleton className="h-4 w-28 rounded-full" />
          <Skeleton className="mt-4 h-[139px] w-full" />
          <Skeleton className="mt-6 h-[78px] w-full" />
          <div className="mt-8 flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-[23px] w-full" />
            ))}
          </div>
        </div>

        <div className="flex w-full max-w-[391px] flex-col gap-5 rounded-3xl bg-tint-panel p-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[108px] w-full rounded-lg" />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
