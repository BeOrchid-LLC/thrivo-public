import { Skeleton } from '@/components/ui/skeleton';

/** Loading placeholder shown while `getAppPreviewContent()` is pending; mirrors AppPreviewView's shell so there's no layout shift when real content swaps in. */
export function AppPreviewSkeleton() {
  return (
    <section
      className="relative overflow-hidden section-padding"
      aria-busy="true"
      aria-label="Loading app preview">
      <div className="public-container">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-x-[222px]">
          <Skeleton className="h-[486px] w-full max-w-[218px] rounded-phone" />

          <div className="w-full max-w-[391px]">
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="mt-4 h-[93px] w-full" />
            <Skeleton className="mt-6 h-[78px] w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
