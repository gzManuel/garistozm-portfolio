import { hero } from '@/content/hero';
import { site } from '@/content/site';
import { ExternalLink } from './ExternalLink';
import { Reveal } from './Reveal';

const heroPill =
  'rounded-full border border-line px-[22px] py-3.5 text-[15px] whitespace-nowrap transition-colors hover:border-accent hover:text-accent';

export function Hero() {
  return (
    <section className="border-b border-line px-[22px] py-14 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1160px] items-center gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <Reveal
            as="p"
            className="mb-[22px] font-mono text-xs tracking-[0.14em] text-accent uppercase"
          >
            {hero.eyebrow}
          </Reveal>

          <Reveal
            as="h1"
            className="text-[38px] leading-[1.04] font-extrabold tracking-[-0.03em] lg:text-[62px]"
          >
            {hero.headline}
          </Reveal>

          <Reveal
            as="p"
            className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-fg2 lg:text-xl"
          >
            {hero.lead}
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold whitespace-nowrap text-accent-ink hover:opacity-90"
            >
              {hero.primaryCta.label}
            </a>
            <ExternalLink href={site.github} className={heroPill}>
              GitHub
            </ExternalLink>
            <ExternalLink href={site.linkedin} className={heroPill}>
              LinkedIn
            </ExternalLink>
          </Reveal>
        </div>

        <Reveal className="overflow-hidden rounded-2xl border border-line bg-bg2">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3 font-mono text-[11px] text-fg2">
            <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-accent" />
            {hero.filename}
          </div>
          <div className="px-5 py-[22px] font-mono text-xs leading-[2.05] text-fg2 lg:text-[13px]">
            {hero.whoami.map((line) => (
              <div key={line.key}>
                <span className="text-accent">{line.key}</span> = {line.value}
              </div>
            ))}
            <div className="text-fg" aria-hidden="true">
              → <span className="caret inline-block h-[15px] w-2 bg-accent align-[-2px]" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
