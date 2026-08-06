import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Reveal } from './Reveal';
import { resetRevealObserver } from '@/lib/reveal';

const observe = vi.fn();
const unobserve = vi.fn();

function stubObserver() {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe = observe;
      unobserve = unobserve;
      disconnect = vi.fn();
    },
  );
}

function stubReducedMotion(reduced: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduced, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
}

beforeEach(() => {
  resetRevealObserver();
  observe.mockClear();
  unobserve.mockClear();
});

afterEach(() => {
  vi.unstubAllGlobals();
  resetRevealObserver();
});

describe('Reveal', () => {
  it('renders its children as a div by default', () => {
    stubReducedMotion(false);
    stubObserver();

    render(<Reveal>content</Reveal>);

    expect(screen.getByText('content').tagName).toBe('DIV');
  });

  it('renders the requested element', () => {
    stubReducedMotion(false);
    stubObserver();

    render(<Reveal as="h2">Heading</Reveal>);

    expect(screen.getByRole('heading', { name: 'Heading' })).toBeInTheDocument();
  });

  it('applies the className it is given', () => {
    stubReducedMotion(false);
    stubObserver();

    render(<Reveal className="mt-4">content</Reveal>);

    expect(screen.getByText('content')).toHaveClass('mt-4');
  });

  it('registers its element with the observer', () => {
    stubReducedMotion(false);
    stubObserver();

    render(<Reveal>content</Reveal>);

    expect(observe).toHaveBeenCalledWith(screen.getByText('content'));
    expect(screen.getByText('content')).toHaveAttribute('data-reveal', 'pending');
  });

  it('unobserves on unmount', () => {
    stubReducedMotion(false);
    stubObserver();
    const { unmount } = render(<Reveal>content</Reveal>);

    unmount();

    expect(unobserve).toHaveBeenCalled();
  });

  it('renders children visibly when IntersectionObserver is unsupported', () => {
    stubReducedMotion(false);
    vi.stubGlobal('IntersectionObserver', undefined);

    render(<Reveal>content</Reveal>);

    expect(screen.getByText('content')).toBeVisible();
    expect(screen.getByText('content')).not.toHaveAttribute('data-reveal');
  });

  it('renders children visibly when reduced motion is requested', () => {
    stubReducedMotion(true);
    stubObserver();

    render(<Reveal>content</Reveal>);

    expect(screen.getByText('content')).not.toHaveAttribute('data-reveal');
    expect(observe).not.toHaveBeenCalled();
  });
});
