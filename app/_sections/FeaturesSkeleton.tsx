import { Skeleton } from '@/components/ui/skeleton';
import { SectionContainer } from '@/components/general/SectionContainer';

/** Loading placeholder shown while `getFeaturesContent()` is pending; mirrors FeaturesView's shell so there's no layout shift when real content swaps in. */
export function FeaturesSkeleton() {
  return (
    <SectionContainer id="features" className="scroll-mt-header" background="muted">
      <div aria-busy="true" aria-label="Loading features">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="mt-4 h-[93px] w-full max-w-[757px]" />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-[201px] w-full rounded-lg" />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
