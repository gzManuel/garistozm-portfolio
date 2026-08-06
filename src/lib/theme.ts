export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'theme';
export const THEME_ATTRIBUTE = 'data-theme';

function isTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light';
}

/**
 * The stored preference, or null when absent or unreadable.
 * Reads throw in some private-browsing modes, hence the guard.
 */
export function storedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

export function systemTheme(): Theme {
  if (typeof window.matchMedia !== 'function') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/** What the inline script in the root layout resolves to, recomputed on the client. */
export function resolveTheme(): Theme {
  return storedTheme() ?? systemTheme();
}

/** The theme currently painted, read from the DOM rather than React state. */
export function currentTheme(): Theme {
  const value = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  return isTheme(value) ? value : 'dark';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
}

export function persistTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable. The toggle still works for this page view, it just
    // won't be remembered.
  }
}

/** Flips the painted theme and persists the choice. Returns the new theme. */
export function toggleTheme(): Theme {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  persistTheme(next);
  return next;
}
