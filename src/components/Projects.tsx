import { projects } from '@/content/projects';
import { Reveal } from './Reveal';

const { featured, ghosts } = projects;

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-label"
      className="scroll-mt-20 border-b border-line bg-bg2 px-[22px] py-16 lg:px-16 lg:py-[104px]"
    >
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-5">
          <Reveal
            as="h2"
            id="projects-label"
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

              <div className="mt-[30px] flex flex-wrap gap-2.5">
                <a
                  href={featured.liveUrl}
                  className="rounded-full bg-accent px-5 py-[11px] text-sm font-semibold whitespace-nowrap text-accent-ink hover:opacity-90"
                >
                  Live site ↗
                </a>
                <a
                  href={featured.repoUrl}
                  className="rounded-full border border-line px-5 py-[11px] text-sm whitespace-nowrap transition-colors hover:border-accent hover:text-accent"
                >
                  Repository ↗
                </a>
              </div>
            </div>

            {/* Screenshot slot. The diagonal hatch is the mock's placeholder fill. */}
            <div className="flex min-h-[200px] items-center justify-center border-t border-line bg-[repeating-linear-gradient(135deg,var(--bg3)_0_9px,var(--bg2)_9px_18px)] p-5 lg:min-h-[320px] lg:border-t-0 lg:border-l">
              <span className="rounded-lg border border-line bg-bg px-4 py-2.5 text-center font-mono text-[11px] tracking-[0.1em] text-fg2 uppercase">
                {featured.shotLabel}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-4 grid gap-4 lg:grid-cols-2">
          {ghosts.map((ghost) => (
            <div
              key={ghost.label}
              className="rounded-[18px] border border-dashed border-line p-7 text-fg2"
            >
              <p className="font-mono text-[11px] tracking-[0.1em] uppercase">{ghost.label}</p>
              <p className="mt-3 text-[15px] leading-relaxed">{ghost.note}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
