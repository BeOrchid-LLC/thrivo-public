import { Skeleton } from '@/components/ui/skeleton';
import { SectionContainer } from '@/components/general/SectionContainer';

/** Loading placeholder shown while `getFaqContent()` is pending; mirrors FaqView's shell so there's no layout shift when real content swaps in. */
export function FaqSkeleton() {
  return (
    <SectionContainer id="faq" className="scroll-mt-header" containerClassName="px-4">
      <div
        className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between"
        aria-busy="true"
        aria-label="Loading FAQ">
        <div className="lg:max-w-[360px]">
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="mt-4 h-[139px] w-full max-w-[313px]" />
          <Skeleton className="mt-4 h-[49px] w-full max-w-[313px]" />
        </div>

        <div className="flex w-full flex-col gap-0 lg:max-w-[492px]">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="my-2.5 h-6 w-full" />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
