import type { ReactNode } from 'react';
import type { SectionId } from '@/content/site';
import { Reveal } from './Reveal';

interface SectionProps {
  id?: SectionId;
  /** The mono eyebrow heading, e.g. "01 — About". */
  label: string;
  children: ReactNode;
  /** Uses the raised `bg2` background, as the mock does for Projects and Signals. */
  raised?: boolean;
  className?: string;
}

/**
 * The mock's repeated section chrome: a narrow mono label column beside the
 * content, collapsing to a single column below `lg`.
 *
 * The label doubles as the section's accessible name, so each one shows up as a
 * navigable region landmark rather than an anonymous block.
 */
export function Section({ id, label, children, raised = false, className = '' }: SectionProps) {
  const labelId = `${id ?? label.replace(/\W+/g, '-').toLowerCase()}-label`;

  return (
    <section
      {...(id ? { id } : {})}
      aria-labelledby={labelId}
      className={`scroll-mt-20 border-b border-line px-[22px] py-16 lg:px-16 lg:py-[104px] ${
        raised ? 'bg-bg2' : ''
      } ${className}`}
    >
      <div className="mx-auto grid max-w-[1080px] gap-5 lg:grid-cols-[200px_1fr] lg:gap-14">
        <Reveal
          as="h2"
          id={labelId}
          className="font-mono text-xs font-medium tracking-[0.14em] text-fg2 uppercase"
        >
          {label}
        </Reveal>
        <div>{children}</div>
      </div>
    </section>
  );
}
