'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteStore } from '@/lib/store/siteStore';
import { Logo } from '@/components/atoms/Logo';

const SPLASH_SEEN_SESSION_KEY = 'thrivo-splash-seen';
const BASE_LOAD_TIME = 800;
const REPEAT_VISIT_LOAD_TIME = 200;
const TRANSITION_DURATION = 0.6;
/** Safety net: force-dismiss even if `load` never fires (see the effect below). */
const MAX_WAIT_TIME = 3000;

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
 * Branded splash gate (pattern matches oj-multimedia's LoadAnimationScreen).
 * Sets siteLoading=false when done so FadeInUp wrappers (MotionContainers)
 * start animating only after the splash clears.
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
    const finish = () => {
      setPageLoaded(true);
      markSplashSeenThisSession();
    };

    if (skipHeavySplash) {
      const reducedMotion = prefersReducedMotion();
      const timer = setTimeout(finish, reducedMotion ? 0 : REPEAT_VISIT_LOAD_TIME);
      return () => clearTimeout(timer);
    }

    // `load` normally fires once (fonts/images finish); the max-wait timer is
    // a safety net for when it doesn't -- e.g. in dev, Turbopack/Fast Refresh
    // activity can keep `document.readyState` from settling or race past the
    // event entirely, which previously left the overlay stuck blocking the
    // page (pointer-events: auto) forever with nothing to recover it.
    let settled = false;
    const settleOnce = () => {
      if (settled) return;
      settled = true;
      finish();
    };

    const handleLoad = () => setTimeout(settleOnce, BASE_LOAD_TIME);

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    const maxWaitTimer = setTimeout(settleOnce, MAX_WAIT_TIME);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(maxWaitTimer);
    };
  }, [skipHeavySplash]);

  return (
    <AnimatePresence>
      {siteLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: pageLoaded ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TRANSITION_DURATION, ease: 'easeOut' }}
          onAnimationComplete={() => {
            if (pageLoaded) setSiteLoading(false);
          }}
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
