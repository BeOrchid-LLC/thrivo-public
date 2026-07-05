'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useInitSiteStore } from '@/lib/store/siteStore';

// ssr: false would exclude the overlay from the server-sent HTML, letting the
// real page paint first and the splash cover it in afterward — SSR it instead
// so the overlay is already in the initial markup.
const LoadAnimationScreenLazy = dynamic(() =>
  import('./LoadAnimationScreen').then(module => ({ default: module.LoadAnimationScreen }))
);

function isSplashEnabled(): boolean {
  // Off by default in every environment (protects LCP/INP and matches prod
  // behavior in dev) — opt in explicitly via NEXT_PUBLIC_ENABLE_SPLASH=true.
  return process.env.NEXT_PUBLIC_ENABLE_SPLASH === 'true';
}

function ClearSiteLoadingOnMount() {
  useEffect(() => {
    useInitSiteStore.getState().actions.setSiteLoading(false);
  }, []);

  return null;
}

export function LoadAnimationScreenDynamic() {
  if (!isSplashEnabled()) {
    return <ClearSiteLoadingOnMount />;
  }

  return <LoadAnimationScreenLazy />;
}
