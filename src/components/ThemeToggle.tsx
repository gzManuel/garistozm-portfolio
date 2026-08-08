'use client';

import { useLayoutEffect } from 'react';
import { applyTheme, resolveTheme, toggleTheme } from '@/lib/theme';

/**
 * Dark/light switch.
 *
 * Holds no React state on purpose: `data-theme` on <html> is the single source
 * of truth, set before first paint by the inline script in the root layout. The
 * label follows it via CSS, so there is nothing for React to hydrate and no
 * server/client mismatch — and the whole control ships as a click handler.
 *
 * Each label carries its own screen-reader phrasing describing what the button
 * *does*; the inactive one is `display: none`, so it stays out of the accessible
 * name. A bare "Dark" would only state the current value, leaving it ambiguous
 * whether clicking selects dark or leaves it.
 */
export function ThemeToggle() {
  useLayoutEffect(() => {
    // React's Strict Mode remount in development resets <html> to the attributes
    // it manages from JSX, wiping the one the inline script set. Re-assert it.
    // No-op in production.
    applyTheme(resolveTheme());
  }, []);

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      className="flex cursor-pointer items-center gap-2 rounded-full border border-line bg-bg3 px-3 py-1.5 text-xs whitespace-nowrap text-fg transition-colors hover:border-accent"
    >
      <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
      <span data-theme-label="dark">
        <span aria-hidden="true">Dark</span>
        <span className="sr-only">Switch to light theme</span>
      </span>
      <span data-theme-label="light">
        <span aria-hidden="true">Light</span>
        <span className="sr-only">Switch to dark theme</span>
      </span>
    </button>
  );
}
