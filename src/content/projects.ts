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
      'A portfolio tracking application. Track investments across multiple portfolios, log buy/sell/fee transactions, and monitor asset prices for stocks and CEDEARs — in pesos or either kind of dollar.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS Lambda'],

    // No liveUrl yet — pp-track isn't deployed. Add one here and the button returns.
    repoUrl: 'https://github.com/gzManuel/pp-track',

    shot: {
      src: '/pp-track.png',
      alt: 'pp-track overview screen: an allocation donut chart, a cost and gain/loss bar chart, and a table of positions.',
    },
  },
} as const satisfies ProjectsContent;
