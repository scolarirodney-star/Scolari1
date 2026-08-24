'use client';

import { useEffect } from 'react';

export function SiteInitializer() {
  useEffect(() => {
    const loadInteractions = () => void import('./site.js');
    if (window.location.hash && window.location.hash !== '#inicio') {
      loadInteractions();
      return;
    }

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(loadInteractions, { timeout: 700 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(loadInteractions, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
