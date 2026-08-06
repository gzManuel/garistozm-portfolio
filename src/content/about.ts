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
    'Passionate and versatile software engineer with 6+ years of experience, delivering high-quality solutions across U.S.-based teams. Recent highlights include leading migration projects like Storefront, Quick Cases and legacy repositories with AI, using Next.js, React, AWS S3 and Lambda, establishing CI/CD workflows with Jenkins, AWS Amplify and blue/green deployments, and presenting demos to clients.',
    "I also build components for Builder and Contentful, enhancing ADA accessibility and optimizing performance. I'm eager to bring my expertise to transformative, challenging projects, with clean and maintainable code.",
  ],
  chips: [
    { label: 'Open to full-time', highlight: true },
    { label: 'Contract work', highlight: false },
    { label: 'English · Spanish', highlight: false },
  ],
} as const satisfies AboutContent;
