import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { observeReveal, prefersReducedMotion, resetRevealObserver } from './reveal';

type ObserverCallback = (entries: IntersectionObserverEntry[], self: IntersectionObserver) => void;

interface FakeObserver {
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  trigger: (target: Element, isIntersecting: boolean) => void;
}

/** Installs a fake IntersectionObserver and returns a handle to drive it. */
function stubObserver(): FakeObserver {
  const handle: Partial<FakeObserver> = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };

  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: ObserverCallback) {
        handle.trigger = (target, isIntersecting) => {
          callback([{ target, isIntersecting } as IntersectionObserverEntry], this as never);
        };
      }
      observe = handle.observe!;
      unobserve = handle.unobserve!;
      disconnect = handle.disconnect!;
    },
  );

  return handle as FakeObserver;
}

function stubReducedMotion(reduced: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduced, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
}

beforeEach(() => {
  resetRevealObserver();
});

afterEach(() => {
  vi.unstubAllGlobals();
  resetRevealObserver();
});

describe('prefersReducedMotion', () => {
  it('is true when the user asked for reduced motion', () => {
    stubReducedMotion(true);
    expect(prefersReducedMotion()).toBe(true);
  });

  it('is false when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    expect(prefersReducedMotion()).toBe(false);
  });
});

describe('observeReveal', () => {
  it('hides the element and registers it with the observer', () => {
    stubReducedMotion(false);
    const observer = stubObserver();
    const el = document.createElement('div');

    observeReveal(el);

    expect(el).toHaveAttribute('data-reveal', 'pending');
    expect(observer.observe).toHaveBeenCalledWith(el);
  });

  it('reveals and unobserves the element once it intersects', () => {
    stubReducedMotion(false);
    const observer = stubObserver();
    const el = document.createElement('div');

    observeReveal(el);
    observer.trigger(el, true);

    expect(el).toHaveAttribute('data-reveal', 'shown');
    expect(observer.unobserve).toHaveBeenCalledWith(el);
  });

  it('leaves the element hidden while it is out of view', () => {
    stubReducedMotion(false);
    const observer = stubObserver();
    const el = document.createElement('div');

    observeReveal(el);
    observer.trigger(el, false);

    expect(el).toHaveAttribute('data-reveal', 'pending');
    expect(observer.unobserve).not.toHaveBeenCalled();
  });

  it('shares one observer across elements', () => {
    stubReducedMotion(false);
    const observer = stubObserver();
    const first = document.createElement('div');
    const second = document.createElement('div');

    observeReveal(first);
    observeReveal(second);

    expect(observer.observe).toHaveBeenCalledTimes(2);
  });

  it('unobserves on cleanup', () => {
    stubReducedMotion(false);
    const observer = stubObserver();
    const el = document.createElement('div');

    observeReveal(el)();

    expect(observer.unobserve).toHaveBeenCalledWith(el);
  });

  // Regression: an anchor jump can move an element from below the viewport to
  // above it without ever intersecting, so the observer never reports it.
  it('reveals an element that was scrolled past without intersecting', () => {
    stubReducedMotion(false);
    const observer = stubObserver();
    const jumpedPast = document.createElement('div');
    const inView = document.createElement('div');

    // Positioned entirely above the viewport.
    jumpedPast.getBoundingClientRect = () => ({ bottom: -120, top: -300 }) as DOMRect;

    observeReveal(jumpedPast);
    observeReveal(inView);

    // Only `inView` intersects; the sweep must still rescue `jumpedPast`.
    observer.trigger(inView, true);

    expect(jumpedPast).toHaveAttribute('data-reveal', 'shown');
    expect(inView).toHaveAttribute('data-reveal', 'shown');
  });

  it('reveals scrolled-past elements on scroll, with no intersection at all', async () => {
    stubReducedMotion(false);
    stubObserver();
    const el = document.createElement('div');
    el.getBoundingClientRect = () => ({ bottom: -50, top: -200 }) as DOMRect;

    observeReveal(el);
    expect(el).toHaveAttribute('data-reveal', 'pending');

    window.dispatchEvent(new Event('scroll'));
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve(null);
      });
    });

    expect(el).toHaveAttribute('data-reveal', 'shown');
  });

  it('never hides anything when reduced motion is requested', () => {
    stubReducedMotion(true);
    const observer = stubObserver();
    const el = document.createElement('div');

    observeReveal(el);

    expect(el).not.toHaveAttribute('data-reveal');
    expect(observer.observe).not.toHaveBeenCalled();
  });

  it('never hides anything when IntersectionObserver is unsupported', () => {
    stubReducedMotion(false);
    vi.stubGlobal('IntersectionObserver', undefined);
    const el = document.createElement('div');

    expect(() => {
      observeReveal(el)();
    }).not.toThrow();
    expect(el).not.toHaveAttribute('data-reveal');
  });
});
