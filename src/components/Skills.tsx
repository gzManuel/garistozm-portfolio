import { skills } from '@/content/skills';
import { Reveal } from './Reveal';
import { Section } from './Section';

export function Skills() {
  return (
    <Section id="skills" index="02" heading="Stack">
      <Reveal
        as="p"
        className="mb-[34px] max-w-[620px] text-base leading-[1.7] text-fg2 lg:text-[19px]"
      >
        {skills.intro}
      </Reveal>

      {/* 1px gap over a line-coloured background is the mock's hairline grid; light mode
          leaves the softer bg-on-bg2 seam. */}
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line lg:grid-cols-2 dark:bg-line">
        {skills.groups.map((group) => (
          <Reveal key={group.label} className="bg-bg2 px-[26px] pt-[26px] pb-7">
            <h3 className="mb-[18px] font-mono text-[11px] font-medium tracking-[0.12em] text-fg2 uppercase">
              {group.label}
            </h3>
            <ul className="flex list-none flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className={`rounded-lg border px-[13px] py-[7px] font-mono text-xs leading-[1.2] whitespace-nowrap ${
                    item.daily
                      ? 'border-accent bg-accent-soft text-accent'
                      : 'border-line bg-transparent text-fg2'
                  }`}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal as="p" className="mt-[18px] flex items-center gap-2 font-mono text-[11px] text-fg2">
        <span aria-hidden="true" className="inline-block h-2 w-2 rounded-sm bg-accent" />
        {skills.legend}
      </Reveal>
    </Section>
  );
}
