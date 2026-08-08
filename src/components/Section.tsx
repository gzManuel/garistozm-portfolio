import type { ReactNode } from 'react';
import type { SectionId } from '@/content/site';
import { Reveal } from './Reveal';

/** Shared so `Section` and the hand-rolled sections derive the same id. */
export function sectionLabelId(key: string): string {
  return `${key.replace(/\W+/g, '-').toLowerCase()}-label`;
}

interface SectionProps {
  id?: SectionId;
  /** The decorative counter shown before the heading, e.g. "01". */
  index: string;
  /** The real heading text — what search engines and screen readers get. */
  heading: string;
  children: ReactNode;
  /** Uses the raised `bg2` background, as the mock does for Projects and Signals. */
  raised?: boolean;
  className?: string;
}

/**
 * The mock's repeated section chrome: a narrow mono label column beside the
 * content, collapsing to a single column below `lg`.
 *
 * The counter is decorative and hidden from assistive tech, so the `<h2>` reads
 * as "About" rather than "01 — About" while looking identical on screen. That
 * heading also names the section as a region landmark.
 */
export function Section({
  id,
  index,
  heading,
  children,
  raised = false,
  className = '',
}: SectionProps) {
  const labelId = sectionLabelId(id ?? heading);

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
          <span aria-hidden="true">{index} — </span>
          {heading}
        </Reveal>
        <div>{children}</div>
      </div>
    </section>
  );
}
