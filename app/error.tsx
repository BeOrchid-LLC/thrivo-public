'use client';

import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { RegularBtn } from '@/components/atoms/RegularBtn';
import { reportClientError } from '@/lib/observability/clientErrorReporting';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    void reportClientError(error, { digest: error.digest, boundary: 'app/error' });
  }, [error]);

  return (
    <MainLayout hideHeader hideFooter hideScrollToTop>
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="mx-auto grid gap-8 text-center">
          <div className="grid gap-4">
            <h1 className="text-6xl font-extrabold text-accent md:text-8xl">500</h1>
            <h2 className="text-section-h2">Something went wrong</h2>
            <p className="text-body-lg">
              {process.env.NODE_ENV === 'development'
                ? error.message
                : "We're sorry, but something went wrong. Please try again."}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <RegularBtn text="Try again" onClick={reset} LeftIcon={RefreshCw} />
            <RegularBtn
              text="Back to home"
              variant="cta"
              linkProps={{ href: '/' }}
              aria-label="Back to home"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
