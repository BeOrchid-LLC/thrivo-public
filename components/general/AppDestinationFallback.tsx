import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Smartphone } from 'lucide-react';
import { Logo } from '@/components/atoms/Logo';
import { StoreButtons } from '@/components/atoms/StoreButtons';

export interface AppDestination {
  title: string;
  description: string;
  schemePath: string;
}

export const appFallbackMetadata: Metadata = { robots: { index: false, follow: false } };

export function AppDestinationFallback({ title, description, schemePath }: AppDestination) {
  return (
    <main className="min-h-screen bg-background px-5 py-12 flex items-center justify-center">
      <section className="w-full max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-xl sm:p-12">
        <Logo className="mx-auto mb-8" />
        <span className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Smartphone aria-hidden className="size-7" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted-foreground">
          {description}
        </p>
        <Link
          href={`thrivo://${schemePath}`}
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground">
          Open Thrivo <ArrowRight className="size-4" aria-hidden />
        </Link>
        <p className="mt-8 text-sm text-muted-foreground">Don&apos;t have Thrivo installed?</p>
        <StoreButtons className="mt-4 justify-center" />
        <Link href="/" className="mt-8 inline-block text-sm font-semibold text-primary underline">
          Return to thrivo.fit
        </Link>
      </section>
    </main>
  );
}
