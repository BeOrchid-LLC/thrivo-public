import type { Metadata } from 'next';
import { Logo } from '@/components/atoms/Logo';
import { UnsubscribeClient } from './UnsubscribeClient';

export const metadata: Metadata = {
  title: 'Email preferences | Thrivo',
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = '' } = await searchParams;
  return (
    <main className="min-h-screen bg-background px-5 py-12 flex items-center justify-center">
      <section className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-xl sm:p-12">
        <Logo className="mx-auto mb-8" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Weekly review emails</h1>
        <UnsubscribeClient token={token} />
      </section>
    </main>
  );
}
