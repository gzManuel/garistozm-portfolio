export interface Achievement {
  readonly kind: string;
  readonly text: string;
}

export interface Testimonial {
  readonly quote: string;
  readonly attribution: string;
}

export interface SignalsContent {
  readonly testimonials: readonly Testimonial[];
  readonly achievements: readonly Achievement[];
}

export const signals = {
  testimonials: [
    {
      quote:
        'Manuel is a delight to work with. Ever eager to help out and learn new skills, he goes above and beyond to try to come up with suggestions on what more he can do from the task assigned. He’s great with Next.js, TypeScript and unit testing, and picked up things like Cypress needed for our project in a short span.',
      attribution: 'Bhuvanasri Kalyana Sundaram · Senior Engineer, Aerospike',
    },
  ],
  achievements: [
    {
      kind: 'Performance',
      text: 'Brilliant Earth PDP/PLP from 62 to 92 on Lighthouse — LCP 4.2s → 2.0s after a BFF layer cut API calls per page from 7 to 2.',
    },
    {
      kind: 'Automation',
      text: 'AWS Lambda and Jenkins took a Harvard Quick Cases batch job from 24 hours to 1.5 minutes, and converted 120,000+ XML documents to HTML.',
    },
    {
      kind: 'Accessibility',
      text: 'ADA / WCAG 2.1 remediation across 160+ components on client e-commerce and ed-tech sites, verified with Axe, SortSite and manual AT passes.',
    },
    {
      kind: 'Leadership',
      text: 'Led Nexus, an internal engineering guild of three developers, and gave the talk "Compound Design Patterns & Next.js SSR vs CSR".',
    },
    {
      kind: 'AI-assisted delivery',
      text: 'Picked by Harvard to pilot an internal AI development tool on a course migration — shipped in under two months, held to their coding standards.',
    },
    {
      kind: 'Certification',
      text: 'Node.js (Intermediate), HackerRank — 2025.',
    },
  ],
} as const satisfies SignalsContent;
