/**
 * A screen capture served from /public, rendered edge-to-edge in its card cell. The
 * intrinsic size is declared so the card reserves the right box before the file loads
 * and keeps the capture's own ratio rather than cropping it.
 */
export interface Screenshot {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface Project {
  readonly name: string;
  readonly status: string;
  readonly blurb: string;
  readonly stack: readonly string[];
  /** Omitted while a project is repo-only — the card drops the "Live site" button. */
  readonly liveUrl?: string;
  readonly repoUrl: string;
  readonly shot: Screenshot;
}

export interface ProjectsContent {
  readonly heading: string;
  readonly featured: Project;
}

export const projects = {
  heading: 'Selected work',
  featured: {
    name: 'pp-track',
    status: 'Source available',
    blurb:
      "Argentines who invest in pesos lose track of what they've actually made — devaluation turns a paper gain into a real loss, and a peso-denominated balance never shows it. pp-track values a portfolio on the Argentine market in ARS and in both parallel dollar rates, MEP and CCL, so the number you read is the real one. I use it to track my own holdings.",
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Fastify', 'Prisma', 'PostgreSQL', 'Turborepo'],

    // No liveUrl yet — pp-track isn't deployed. Add one here and the button returns.
    repoUrl: 'https://github.com/gzManuel/pp-track',

    // An animated capture, so it is served as-is: the optimizer would flatten it to a
    // single frame. /pp-track.png is the same screen as a still, kept for the poster.
    shot: {
      src: '/pp-track.gif',
      alt: 'Walkthrough of pp-track: switching the valuation between ARS, MEP and CCL, filtering by portfolio, hiding balances, and logging a transaction, with the allocation donut, cost and gain/loss bars and positions table updating on each change.',
      width: 800,
      height: 423,
    },
  },
} as const satisfies ProjectsContent;
