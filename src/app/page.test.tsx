import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';
import { site } from '@/content/site';

beforeEach(() => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    },
  );
});

describe('Home', () => {
  it('renders exactly one h1', () => {
    render(<Home />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('renders the page landmarks', () => {
    render(<Home />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  // Each section is a named region, so the nav's targets are reachable
  // landmarks rather than anonymous blocks. (The href-to-id linkage itself is
  // enforced by the `SectionId` union at compile time.)
  // The numeric counters are decorative, so regions and headings are named by
  // real words — what search engines index and what screen readers list.
  it('exposes every section as a region named by descriptive text', () => {
    render(<Home />);

    for (const name of [
      'About',
      'Stack',
      'Selected work',
      'Path',
      'Signals',
      /Got something worth building/,
    ]) {
      expect(screen.getByRole('region', { name })).toBeInTheDocument();
    }
  });

  it('keeps the counters out of the accessible heading text', () => {
    render(<Home />);

    const names = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);

    // Visually the counter is still there…
    expect(names.some((n) => n.startsWith('01 — About'))).toBe(true);
    // …but no heading is *named* by one.
    expect(screen.queryByRole('heading', { name: /^\d\d —/ })).toBeNull();
  });

  it('renders one nav link per configured section', () => {
    render(<Home />);
    const nav = screen.getByRole('navigation', { name: 'Primary' });

    for (const item of site.nav) {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute('href', item.href);
    }
    expect(nav).toBeInTheDocument();
  });

  it('renders the numbered section labels in order', () => {
    render(<Home />);

    const numbered = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent)
      .filter((label) => /^\d\d —/.test(label));

    expect(numbered).toEqual(['01 — About', '02 — Stack', '04 — Path', '05 — Signals']);
  });

  it('makes the skip-link target focusable', () => {
    render(<Home />);
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
  });

  it('exposes the contact email as a mailto link', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: site.email })).toHaveAttribute(
      'href',
      `mailto:${site.email}`,
    );
  });
});
