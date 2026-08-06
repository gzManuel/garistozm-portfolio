import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';
import { THEME_STORAGE_KEY } from '@/lib/theme';

function stubPrefersLight(prefersLight: boolean) {
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

describe('ThemeToggle', () => {
  it('paints the stored preference on mount', () => {
    stubPrefersLight(true);
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');

    render(<ThemeToggle />);

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('falls back to the system preference when nothing is stored', () => {
    stubPrefersLight(true);

    render(<ThemeToggle />);

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('flips the theme and persists it on click', async () => {
    stubPrefersLight(false);
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('flips back on a second click', async () => {
    stubPrefersLight(false);
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    await user.click(button);
    await user.click(button);

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('still toggles when localStorage is unavailable', async () => {
    stubPrefersLight(false);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('renders both labels for the stylesheet to switch between', () => {
    stubPrefersLight(false);
    render(<ThemeToggle />);

    expect(screen.getByText('Dark')).toHaveAttribute('data-theme-label', 'dark');
    expect(screen.getByText('Light')).toHaveAttribute('data-theme-label', 'light');
  });
});
