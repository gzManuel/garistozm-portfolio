import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  applyTheme,
  currentTheme,
  persistTheme,
  resolveTheme,
  storedTheme,
  THEME_STORAGE_KEY,
  toggleTheme,
} from './theme';

function mockMatchMedia(prefersLight: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query.includes('light') ? prefersLight : !prefersLight,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('storedTheme', () => {
  it('returns the persisted value', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
    expect(storedTheme()).toBe('light');
  });

  it('returns null when nothing is stored', () => {
    expect(storedTheme()).toBeNull();
  });

  it('ignores a stored value that is not a theme', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'solarized');
    expect(storedTheme()).toBeNull();
  });

  it('returns null instead of throwing when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError: storage is disabled');
    });
    expect(storedTheme()).toBeNull();
  });
});

describe('resolveTheme', () => {
  it('prefers the stored value over the system preference', () => {
    mockMatchMedia(true);
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    expect(resolveTheme()).toBe('dark');
  });

  it('falls back to the system preference when nothing is stored', () => {
    mockMatchMedia(true);
    expect(resolveTheme()).toBe('light');
  });

  it('defaults to dark when the system prefers dark', () => {
    mockMatchMedia(false);
    expect(resolveTheme()).toBe('dark');
  });

  it('defaults to dark when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    expect(resolveTheme()).toBe('dark');
  });
});

describe('currentTheme', () => {
  it('reads the attribute painted on <html>', () => {
    applyTheme('light');
    expect(currentTheme()).toBe('light');
  });

  it('treats a missing or bogus attribute as dark', () => {
    expect(currentTheme()).toBe('dark');
    document.documentElement.setAttribute('data-theme', 'neon');
    expect(currentTheme()).toBe('dark');
  });
});

describe('persistTheme', () => {
  it('writes to localStorage', () => {
    persistTheme('light');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('swallows storage errors so the toggle still works', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => {
      persistTheme('dark');
    }).not.toThrow();
  });
});

describe('toggleTheme', () => {
  it('flips dark to light, painting and persisting it', () => {
    applyTheme('dark');
    expect(toggleTheme()).toBe('light');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('flips light back to dark', () => {
    applyTheme('light');
    expect(toggleTheme()).toBe('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
