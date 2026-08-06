'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { site } from '@/content/site';

const FOCUSABLE = 'a[href], button:not([disabled])';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Move focus into the panel when it opens so the keyboard trap has somewhere
  // to start from.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
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

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          className="absolute inset-x-0 top-full border-b border-line bg-bg2 px-[22px] py-4"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="block py-2 text-base text-fg2 hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={close}
                  className="inline-block rounded-full border border-accent px-4 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-accent-ink"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
