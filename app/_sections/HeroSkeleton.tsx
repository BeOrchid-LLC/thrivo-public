import { Skeleton } from '@/components/ui/skeleton';

/** Loading placeholder shown while `getHeroContent()` is pending; mirrors HeroView's shell so there's no layout shift when real content swaps in. */
export function HeroSkeleton() {
  return (
    <section
      className="relative overflow-hidden py-20 lg:flex lg:min-h-[708px] lg:items-center lg:py-0"
      aria-busy="true"
      aria-label="Loading hero content">
      <div className="public-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="max-w-[448px]">
          <Skeleton className="h-7 w-64 rounded-full" />
          <Skeleton className="mt-6 h-[178px] w-full max-w-[399px]" />
          <Skeleton className="mt-6 h-14 w-full max-w-[399px]" />
          <div className="mt-8 flex gap-3">
            <Skeleton className="h-13 w-[165px] rounded-md" />
            <Skeleton className="h-13 w-[165px] rounded-md" />
          </div>
          <Skeleton className="mt-6 h-4 w-56" />
        </div>

        <div className="flex justify-center lg:justify-end">
          <Skeleton className="h-[492px] w-full max-w-[227px] rounded-phone" />
        </div>
      </div>
    </section>
  );
}
