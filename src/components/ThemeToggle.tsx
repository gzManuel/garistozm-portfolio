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
      <span className="sr-only">Theme:</span>
      <span data-theme-label="dark">Dark</span>
      <span data-theme-label="light">Light</span>
    </button>
  );
}
