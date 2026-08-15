import { site } from '@/content/site';
import { ExternalLink } from './ExternalLink';
import { DocumentIcon, GitHubIcon, LinkedInIcon } from './Icons';
import { Reveal } from './Reveal';
import { sectionLabelId } from './Section';

const isPlaceholderEmail = site.email.endsWith('@example.com');

const outboundPill =
  'inline-flex items-center gap-2 rounded-full border border-line px-[22px] py-3 text-[15px] whitespace-nowrap transition-colors hover:border-accent hover:text-accent';

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby={sectionLabelId('contact')}
      className="scroll-mt-20 px-[22px] py-[76px] lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1080px]">
        <Reveal as="p" className="mb-[22px] font-mono text-xs tracking-[0.14em] text-fg2 uppercase">
          06 — Contact
        </Reveal>

        <Reveal
          as="h2"
          id={sectionLabelId('contact')}
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
          <ExternalLink href={site.github} arrow className={outboundPill}>
            <GitHubIcon />
            GitHub
          </ExternalLink>
          <ExternalLink href={site.linkedin} arrow className={outboundPill}>
            <LinkedInIcon />
            LinkedIn
          </ExternalLink>
          <ExternalLink href={site.resume} arrow newTab className={outboundPill}>
            <DocumentIcon />
            Résumé
          </ExternalLink>
        </Reveal>
      </div>
    </section>
  );
}
