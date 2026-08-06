import { site } from '@/content/site';
import { Reveal } from './Reveal';

const isPlaceholderEmail = site.email.endsWith('@example.com');

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-label"
      className="scroll-mt-20 px-[22px] py-[76px] lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1080px]">
        <Reveal as="p" className="mb-[22px] font-mono text-xs tracking-[0.14em] text-fg2 uppercase">
          06 — Contact
        </Reveal>

        <Reveal
          as="h2"
          id="contact-label"
          className="max-w-[700px] text-[34px] leading-[1.05] font-extrabold tracking-[-0.03em] lg:text-[56px]"
        >
          Got something worth building<span className="text-accent">?</span>
        </Reveal>

        <Reveal>
          <a
            href={`mailto:${site.email}`}
            className="mt-[34px] inline-block border-b border-line pb-1.5 font-mono text-[17px] break-all text-accent hover:border-accent lg:text-[26px]"
          >
            {site.email}
          </a>
        </Reveal>

        {isPlaceholderEmail && (
          <Reveal as="p" className="mt-3 font-mono text-[11px] text-fg2">
            [ placeholder — swap in your real address ]
          </Reveal>
        )}

        <Reveal className="mt-[34px] flex flex-wrap gap-3">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-[22px] py-3 text-[15px] whitespace-nowrap transition-colors hover:border-accent hover:text-accent"
          >
            GitHub ↗
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-[22px] py-3 text-[15px] whitespace-nowrap transition-colors hover:border-accent hover:text-accent"
          >
            LinkedIn ↗
          </a>
          <a
            href={site.resume}
            className="rounded-full border border-line px-[22px] py-3 text-[15px] whitespace-nowrap transition-colors hover:border-accent hover:text-accent"
          >
            Résumé ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
