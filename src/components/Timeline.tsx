import { timeline } from '@/content/timeline';
import { Reveal } from './Reveal';
import { Section } from './Section';

export function Timeline() {
  return (
    <Section id="path" label="04 — Path">
      {timeline.entries.map((entry) => (
        <Reveal
          key={`${entry.when}-${entry.role}`}
          className="grid gap-1.5 border-t border-line py-6 lg:grid-cols-[128px_1fr] lg:gap-7"
        >
          <div className="pt-[3px] font-mono text-xs text-fg2">{entry.when}</div>
          <div>
            <h3 className="text-lg font-semibold lg:text-[19px]">{entry.role}</h3>
            <p className="mt-[5px] text-[15px] text-accent">{entry.org}</p>
            <p className="mt-2.5 text-[15px] leading-relaxed text-fg2">{entry.note}</p>
          </div>
        </Reveal>
      ))}

      {timeline.placeholderNote !== null && (
        <Reveal
          as="p"
          className="mt-5 rounded-lg bg-bg3 px-3.5 py-3 font-mono text-[11px] leading-[1.7] text-fg2"
        >
          {timeline.placeholderNote}
        </Reveal>
      )}
    </Section>
  );
}
