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
  it('exposes every section as a named region', () => {
    render(<Home />);

    for (const name of [
      '01 — About',
      '02 — Stack',
      'Selected work',
      '04 — Path',
      '05 — Signals',
      /Got something worth building/,
    ]) {
      expect(screen.getByRole('region', { name })).toBeInTheDocument();
    }
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

  it('exposes the contact email as a mailto link', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: site.email })).toHaveAttribute(
      'href',
      `mailto:${site.email}`,
    );
  });
});
