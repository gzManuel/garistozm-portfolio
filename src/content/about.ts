export interface AboutChip {
  readonly label: string;
  /** Accent-filled when true; the mock highlights only the availability chip. */
  readonly highlight: boolean;
}

export interface AboutContent {
  readonly paragraphs: readonly [string, string];
  readonly chips: readonly AboutChip[];
}

export const about = {
  paragraphs: [
    'Senior frontend engineer with 6+ years building ADA-compliant e-commerce and ed-tech platforms for U.S. client teams, backed by production Node.js and Python/Flask experience. I raised Brilliant Earth PDP/PLP Lighthouse scores from 62 to 92, and cut a Harvard Business School batch job from 24 hours to 1.5 minutes with AWS Lambda and Jenkins.',
    'I own frontend architecture, testing strategy, CI/CD pipelines and AI-assisted legacy migrations end to end — Next.js and Turborepo monorepos, Contentful and Builder.io components, WCAG 2.1 remediation. I lead code and architecture reviews, mentor developers, and give the occasional technical talk.',
  ],
  chips: [
    { label: 'Open to full-time', highlight: true },
    { label: 'Contract work', highlight: false },
    { label: 'Remote · U.S. hours', highlight: false },
    { label: 'English · Spanish', highlight: false },
  ],
} as const satisfies AboutContent;
