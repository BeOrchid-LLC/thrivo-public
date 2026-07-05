import { Skeleton } from '@/components/ui/skeleton';

/** Loading placeholder shown while `getTrustBarContent()` is pending; mirrors TrustBarView's shell so there's no layout shift when real content swaps in. */
export function TrustBarSkeleton() {
  return (
    <section
      className="w-full border-y border-[#e5e7eb] bg-tint-band py-[41px]"
      aria-busy="true"
      aria-label="Loading trust stats">
      <div className="regular-container flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <Skeleton className="h-[33px] w-20" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </div>
    </section>
  );
}
