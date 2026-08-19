/** A screenshot served from /public, rendered edge-to-edge in its card cell. */
export interface Screenshot {
  readonly src: string;
  readonly alt: string;
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

    shot: {
      src: '/pp-track.png',
      alt: 'pp-track overview screen: an allocation donut chart, a cost and gain/loss bar chart, and a table of positions.',
    },
  },
} as const satisfies ProjectsContent;
