'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { site } from '@/content/site';

/**
 * Small-screen navigation, built as a **disclosure** rather than a dialog.
 *
 * It deliberately does not trap focus. The panel is non-modal — there is no
 * scrim and the rest of the page stays interactive — and the ARIA Authoring
 * Practices are explicit that a disclosure must let focus move out naturally.
 * Trapping it here would strand keyboard users in a menu they can see past.
 *
 * The panel stays mounted and toggles `hidden`, so `aria-controls` always
 * resolves to a real element instead of dangling while closed.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Move focus to the first item on open, so keyboard users land inside the
  // thing they just opened.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      close(true);
    };

    // pointerdown rather than click: fires before focus moves, so the panel
    // closes even when the press lands on another focusable element.
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && rootRef.current?.contains(target)) return;
      close();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, close]);

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => {
          setOpen((value) => !value);
        }}
        className="flex cursor-pointer flex-col gap-1 rounded-lg border border-line p-2 transition-colors hover:border-accent"
      >
        <span aria-hidden="true" className="block h-px w-4 bg-fg" />
        <span aria-hidden="true" className="block h-px w-4 bg-fg" />
      </button>

      <div
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-bg2 px-[22px] py-4"
      >
        {/* The id sits on the <nav>, not the wrapper: aria-controls should
            point at the region it actually controls. */}
        <nav id={panelId} aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => {
                    close();
                  }}
                  className="block py-2 text-base text-fg2 hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => {
                  close();
                }}
                className="inline-block rounded-full border border-accent px-4 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-accent-ink"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
