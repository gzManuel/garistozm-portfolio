import { about } from '@/content/about';
import { Reveal } from './Reveal';
import { Section } from './Section';

export function About() {
  const [lead, follow] = about.paragraphs;

  return (
    <Section id="about" label="01 — About">
      <Reveal as="p" className="text-base leading-[1.7] text-fg lg:text-[19px]">
        {lead}
      </Reveal>
      <Reveal as="p" className="mt-[22px] text-base leading-[1.7] text-fg2 lg:text-[19px]">
        {follow}
      </Reveal>

      <Reveal as="ul" className="mt-[30px] flex list-none flex-wrap gap-2.5">
        {about.chips.map((chip) => (
          <li
            key={chip.label}
            className={`rounded-full px-3.5 py-[7px] font-mono text-[11px] tracking-[0.06em] whitespace-nowrap uppercase ${
              chip.highlight ? 'bg-accent-soft text-accent' : 'bg-bg3 text-fg2'
            }`}
          >
            {chip.label}
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
