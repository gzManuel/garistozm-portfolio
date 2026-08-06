export interface TimelineEntry {
  readonly when: string;
  readonly role: string;
  readonly org: string;
  readonly note: string;
}

export interface TimelineContent {
  readonly entries: readonly TimelineEntry[];
  /** Rendered as a visible caveat; delete it once the rows below are real. */
  readonly placeholderNote: string | null;
}

// TODO(manuel): every row below is a placeholder. Replace the employers, dates
// and the education entry with the real ones, then set `placeholderNote` to null
// to remove the caveat box from the page.
// Annotated rather than `as const satisfies` so `placeholderNote` keeps its
// `string | null` type — setting it to null is the intended edit.
export const timeline: TimelineContent = {
  entries: [
    {
      when: '2023 — now',
      role: 'Software Engineer',
      org: 'U.S. product team (placeholder)',
      note: 'Led Storefront and Quick Cases migrations; owned CI/CD with Jenkins and Amplify, blue/green deployments, and client demos.',
    },
    {
      when: '2021 — 2023',
      role: 'Frontend Engineer',
      org: 'Agency / consultancy (placeholder)',
      note: 'Built Contentful and Builder components with ADA accessibility and performance budgets.',
    },
    {
      when: '2019 — 2021',
      role: 'Web Developer',
      org: 'First role (placeholder)',
      note: 'Shipped React and Node features across several client products.',
    },
    {
      when: 'Education',
      role: 'Degree / bootcamp (placeholder)',
      org: 'Institution, Buenos Aires',
      note: 'Add field of study and graduation year.',
    },
  ],
  placeholderNote: '[ placeholder rows — swap in real employers, dates and degree ]',
};
