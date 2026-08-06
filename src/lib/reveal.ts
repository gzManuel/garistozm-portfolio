/**
 * Shared scroll-reveal observer, ported from the design mock's `observe()`.
 *
 * One IntersectionObserver is shared by every revealed element rather than one
 * per component. Elements are hidden only here — never in the server-rendered
 * markup — so a page without JS, or with reduced motion requested, shows all of
 * its content immediately.
 *
 * The observer alone is not enough. Jumping to an anchor (or restoring a scroll
 * position on reload) can take an element straight from below the viewport to
 * above it without ever intersecting, and IntersectionObserver only reports
 * threshold *crossings* — so those elements would stay hidden forever. Anything
 * scrolled past therefore gets swept in as well.
 */

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.05,
};

let observer: IntersectionObserver | null = null;
let sweepScheduled = false;

/** Elements hidden and awaiting reveal. */
const pending = new Set<Element>();

function reveal(el: Element): void {
  el.setAttribute('data-reveal', 'shown');
  pending.delete(el);
  observer?.unobserve(el);
  if (pending.size === 0) stopSweeping();
}

/** Reveals anything that scrolled past the top of the viewport unseen. */
function sweepScrolledPast(): void {
  for (const el of pending) {
    if (el.getBoundingClientRect().bottom < 0) reveal(el);
  }
}

function onScroll(): void {
  if (sweepScheduled) return;
  sweepScheduled = true;
  requestAnimationFrame(() => {
    sweepScheduled = false;
    sweepScrolledPast();
  });
}

function startSweeping(): void {
  window.addEventListener('scroll', onScroll, { passive: true });
}

function stopSweeping(): void {
  window.removeEventListener('scroll', onScroll);
}

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null;

  observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) reveal(entry.target);
    }
    sweepScrolledPast();
  }, OBSERVER_OPTIONS);

  return observer;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Hides `el`, then reveals it once it scrolls into view — or once it has been
 * scrolled past. Returns a cleanup function. If the observer is unavailable or
 * motion is unwelcome, `el` is left visible and this is a no-op.
 */
export function observeReveal(el: Element): () => void {
  if (prefersReducedMotion()) return () => undefined;

  const io = getObserver();
  if (!io) return () => undefined;

  el.setAttribute('data-reveal', 'pending');
  if (pending.size === 0) startSweeping();
  pending.add(el);
  io.observe(el);

  return () => {
    pending.delete(el);
    io.unobserve(el);
    if (pending.size === 0) stopSweeping();
  };
}

/** Test hook — drops the module-level observer so each test starts clean. */
export function resetRevealObserver(): void {
  observer?.disconnect();
  observer = null;
  pending.clear();
  stopSweeping();
}
