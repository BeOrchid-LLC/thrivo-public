'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteStore } from '@/lib/store/siteStore';
import { Logo } from '@/components/atoms/Logo';

const SPLASH_SEEN_SESSION_KEY = 'thrivo-splash-seen';
const BASE_LOAD_TIME = 800;
const REPEAT_VISIT_LOAD_TIME = 200;
const TRANSITION_DURATION = 0.6;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function hasSeenSplashThisSession(): boolean {
  try {
    return sessionStorage.getItem(SPLASH_SEEN_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markSplashSeenThisSession(): void {
  try {
    sessionStorage.setItem(SPLASH_SEEN_SESSION_KEY, '1');
  } catch {
    // Private mode or blocked storage — skip persistence
  }
}

/**
 * Branded splash gate. Sets siteLoading=false when done so FadeInUp wrappers
 * (MotionContainers) start animating only after the splash clears.
 */
export const LoadAnimationScreen = () => {
  const {
    siteLoading,
    actions: { setSiteLoading },
  } = useSiteStore(state => state);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [skipHeavySplash] = useState(() => {
    if (typeof window === 'undefined') return false;

    return hasSeenSplashThisSession() || prefersReducedMotion();
  });

  useEffect(() => {
    // A fixed delay, not a `window.load` listener: `load` fires once all
    // resources (images, fonts, dev-mode HMR chunks) finish, which is both
    // slow (conflicts with the site's own LCP budget) and unreliable here --
    // in dev, Turbopack/Fast Refresh activity can delay or race past `load`
    // entirely, leaving `pageLoaded` stuck `false` forever with the overlay
    // still blocking the page (`pointer-events: auto`). A timer always fires.
    const reducedMotion = prefersReducedMotion();
    const loadTime = skipHeavySplash
      ? reducedMotion
        ? 0
        : REPEAT_VISIT_LOAD_TIME
      : BASE_LOAD_TIME;

    const timer = setTimeout(() => {
      setPageLoaded(true);
      markSplashSeenThisSession();
    }, loadTime);

    return () => clearTimeout(timer);
  }, [skipHeavySplash]);

  useEffect(() => {
    if (pageLoaded && siteLoading) {
      const timer = setTimeout(() => setSiteLoading(false), TRANSITION_DURATION * 1000);
      return () => clearTimeout(timer);
    }
  }, [pageLoaded, siteLoading, setSiteLoading]);

  return (
    <AnimatePresence>
      {siteLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: pageLoaded ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TRANSITION_DURATION, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          style={{ pointerEvents: pageLoaded ? 'none' : 'auto' }}
          aria-hidden>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}>
            <Logo href="" size={40} textClassName="text-2xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
