'use client';

import { PropsWithChildren } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { WebVitalsReporter } from '@/components/observability/WebVitalsReporter';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <TooltipProvider delayDuration={700} skipDelayDuration={300}>
      <WebVitalsReporter />
      {children}
      <Toaster />
    </TooltipProvider>
  );
};
