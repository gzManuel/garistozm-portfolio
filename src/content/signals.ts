export interface Achievement {
  readonly kind: string;
  readonly text: string;
}

export interface Testimonial {
  readonly quote: string;
  readonly attribution: string;
}

export interface SignalsContent {
  readonly testimonial: Testimonial;
  readonly achievements: readonly Achievement[];
}

// TODO(manuel): the quote and its attribution are placeholders — get a real one
// from a colleague or lead, or delete the Signals section from `app/page.tsx`.
export const signals = {
  testimonial: {
    quote:
      'Manuel took the migration nobody wanted to touch and turned it into the cleanest repo on the team.',
    attribution: '[ placeholder quote — colleague name, role ]',
  },
  achievements: [
    {
      kind: 'Migrations',
      text: 'Three legacy repositories moved to Next.js with AI-assisted refactors, no feature freeze.',
    },
    {
      kind: 'Accessibility',
      text: 'ADA remediation across a component library used by multiple client sites.',
    },
    {
      kind: 'Certification',
      // TODO(manuel): name the actual certification.
      text: '[ placeholder — AWS / accessibility cert goes here ]',
    },
  ],
} as const satisfies SignalsContent;
