import { signals } from '@/content/signals';
import { Reveal } from './Reveal';
import { Section } from './Section';

export function Signals() {
  return (
    <Section label="05 — Signals" raised>
      <Reveal as="blockquote" className="border-l-2 border-accent pl-[22px]">
        <p className="text-[19px] leading-[1.55] tracking-[-0.015em] lg:text-[25px]">
          &ldquo;{signals.testimonial.quote}&rdquo;
        </p>
        {/* A plain <p> rather than <footer>: a nested footer competes with the
            page footer for the contentinfo landmark in some AT. */}
        <p className="mt-4 font-mono text-[11px] tracking-[0.08em] text-fg2 uppercase">
          {signals.testimonial.attribution}
        </p>
      </Reveal>

      <div className="mt-[38px] grid gap-3.5 lg:grid-cols-3">
        {signals.achievements.map((achievement) => (
          <Reveal key={achievement.kind} className="rounded-2xl border border-line bg-bg p-[22px]">
            <p className="font-mono text-[11px] tracking-[0.1em] text-accent uppercase">
              {achievement.kind}
            </p>
            <p className="mt-3 text-base leading-[1.55] text-fg">{achievement.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
