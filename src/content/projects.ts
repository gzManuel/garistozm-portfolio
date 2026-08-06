export interface Project {
  readonly name: string;
  readonly status: string;
  readonly blurb: string;
  readonly stack: readonly string[];
  readonly liveUrl: string;
  readonly repoUrl: string;
  /** Alt text for the screenshot slot; also the caption while it's a placeholder. */
  readonly shotLabel: string;
}

export interface GhostSlot {
  readonly label: string;
  readonly note: string;
}

export interface ProjectsContent {
  readonly heading: string;
  readonly featured: Project;
  readonly ghosts: readonly GhostSlot[];
}

export const projects = {
  heading: 'Selected work',
  featured: {
    name: 'pp-track',
    status: 'Live',
    blurb:
      'A portfolio tracking application. Track investments across multiple portfolios, log buy/sell/fee transactions, and monitor asset prices for stocks and CEDEARs — in pesos or either kind of dollar.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS Lambda'],

    // TODO(manuel): real URLs for pp-track. Until then both buttons are inert.
    liveUrl: '#',
    repoUrl: '#',

    // TODO(manuel): drop a screenshot in /public and render it instead of this slot.
    shotLabel: 'pp-track screenshot / demo gif',
  },
  ghosts: [
    {
      label: 'Slot 02',
      note: 'Card template ready — drop in a second project when you want it.',
    },
    {
      label: 'Slot 03',
      note: 'Same layout scales to a two-up grid once there are three or more.',
    },
  ],
} as const satisfies ProjectsContent;
