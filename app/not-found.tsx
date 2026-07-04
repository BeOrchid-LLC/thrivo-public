import type { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import { RegularBtn } from '@/components/atoms/RegularBtn';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist. Return home.",
};

export default function NotFoundPage() {
  return (
    <MainLayout hideScrollToTop>
      <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-[var(--header-height)]">
        <div className="mx-auto grid gap-8 text-center">
          <div className="grid gap-4">
            <h1 className="text-6xl font-extrabold text-primary md:text-8xl">404</h1>
            <h2 className="text-section-h2">Page not found</h2>
            <p className="text-body-lg">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>
          <RegularBtn
            text="Back to home"
            linkProps={{ href: '/' }}
            wrapClassName="mx-auto"
            aria-label="Back to home"
          />
        </div>
      </div>
    </MainLayout>
  );
}
