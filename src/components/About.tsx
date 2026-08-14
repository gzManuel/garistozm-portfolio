import Image from 'next/image';
import { about } from '@/content/about';
import { Reveal } from './Reveal';
import { Section } from './Section';

export function About() {
  const [lead, follow] = about.paragraphs;

  /* Narrow and centred on mobile, filling the label column at `lg` — as the mock sizes it. */
  const portrait = (
    <Reveal className="relative mx-auto aspect-[4/5] w-[150px] overflow-hidden rounded-[15px] border border-line bg-bg3 lg:mx-0 lg:w-full">
      <Image
        src={about.portrait.src}
        alt={about.portrait.alt}
        fill
        sizes="(min-width: 1024px) 200px, 150px"
        className="object-cover"
      />
    </Reveal>
  );

  return (
    <Section id="about" index="01" heading="About" media={portrait}>
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
