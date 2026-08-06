'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { observeReveal } from '@/lib/reveal';

interface RevealProps {
  children: ReactNode;
  /** Element to render. Defaults to a plain div. */
  as?: ElementType;
  className?: string;
  /** Forwarded so a revealed heading can name its section via aria-labelledby. */
  id?: string;
}

/**
 * Fades and lifts its child into view on scroll.
 *
 * The wrapper renders with no reveal state at all, so the static HTML is fully
 * visible; `observeReveal` adds the hidden state on mount only when it can also
 * guarantee removing it again.
 */
export function Reveal({ children, as: Tag = 'div', className, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeReveal(el);
  }, []);

  return (
    <Tag ref={ref} className={className} {...(id ? { id } : {})}>
      {children}
    </Tag>
  );
}
