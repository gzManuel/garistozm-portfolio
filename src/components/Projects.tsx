import Image from 'next/image';
import { projects, type ProjectsContent } from '@/content/projects';
import { ExternalLink } from './ExternalLink';
import { GitHubIcon, GlobeIcon } from './Icons';
import { Reveal } from './Reveal';
import { sectionLabelId } from './Section';

// Widened from the `as const` literal so optional fields like liveUrl stay readable here.
const { featured }: ProjectsContent = projects;

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby={sectionLabelId('projects')}
      className="scroll-mt-20 border-b border-line bg-bg2 px-[22px] py-16 lg:px-16 lg:py-[104px]"
    >
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-5">
          <Reveal
            as="h2"
            id={sectionLabelId('projects')}
            className="text-3xl font-extrabold tracking-[-0.025em] lg:text-[42px]"
          >
            {projects.heading}
          </Reveal>
          <Reveal as="p" className="font-mono text-xs tracking-[0.1em] text-fg2 uppercase">
            03 — Projects
          </Reveal>
        </div>

        <Reveal
          as="article"
          className="overflow-hidden rounded-[18px] border border-line bg-bg transition-colors hover:border-accent"
        >
          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            <div className="p-[26px] lg:p-10">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-extrabold tracking-[-0.02em] lg:text-[30px]">
                  {featured.name}
                </h3>
                <span className="rounded-full bg-accent-soft px-[11px] py-[5px] font-mono text-[10px] tracking-[0.08em] whitespace-nowrap text-accent uppercase">
                  {featured.status}
                </span>
              </div>

              <p className="mt-4 text-base leading-[1.65] text-fg2 lg:text-[17px]">
                {featured.blurb}
              </p>

              <ul className="mt-[26px] flex list-none flex-wrap gap-2">
                {featured.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line px-3 py-1.5 font-mono text-[11px] text-fg2"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {/* Without a deployment the repo is the primary call to action, so it takes
                  the filled button and "Live site" drops out rather than linking nowhere. */}
              <div className="mt-[30px] flex flex-wrap gap-2.5">
                {featured.liveUrl && (
                  <ExternalLink
                    href={featured.liveUrl}
                    arrow
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-[11px] text-sm font-semibold whitespace-nowrap text-accent-ink hover:opacity-90"
                  >
                    <GlobeIcon />
                    Live site
                  </ExternalLink>
                )}
                <ExternalLink
                  href={featured.repoUrl}
                  arrow
                  className={
                    featured.liveUrl
                      ? 'inline-flex items-center gap-2 rounded-full border border-line px-5 py-[11px] text-sm whitespace-nowrap transition-colors hover:border-accent hover:text-accent'
                      : 'inline-flex items-center gap-2 rounded-full bg-accent px-5 py-[11px] text-sm font-semibold whitespace-nowrap text-accent-ink hover:opacity-90'
                  }
                >
                  <GitHubIcon />
                  Repository
                </ExternalLink>
              </div>
            </div>

            {/* Screenshot slot. The shot covers the whole cell; the hatch is the loading fill. */}
            <div className="relative min-h-[220px] border-t border-line bg-[repeating-linear-gradient(135deg,var(--bg3)_0_9px,var(--bg2)_9px_18px)] lg:min-h-[320px] lg:border-t-0 lg:border-l">
              <Image
                src={featured.shot.src}
                alt={featured.shot.alt}
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover object-left-top"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
