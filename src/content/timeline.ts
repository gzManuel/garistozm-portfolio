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

export const timeline: TimelineContent = {
  entries: [
    {
      when: '2025 — now',
      role: 'Frontend Engineer',
      org: 'Harvard Business School (via Unosquare)',
      note: 'Sole frontend engineer on the OIDC login for the Shared Platform, owned end to end. 40+ React components as statically generated Next.js pages at 98/100 Lighthouse, 20+ content models migrated to Contentful behind a zero-downtime blue-green cutover, and AWS Lambdas that converted 120,000+ XML documents to HTML.',
    },
    {
      when: '2023 — 2024',
      role: 'Frontend Engineer',
      org: 'Brilliant Earth (via Unosquare)',
      note: 'Migrated PDP/PLP and 120+ components from Django + Jinja to a Next.js 14 Turborepo monorepo. A BFF layer cut API calls per page from 7 to 2 and LCP from 4.2s to 2.0s; Lighthouse went 62 → 92. Instituted PR reviews and coverage gates — velocity +20%, post-release bugs −30%.',
    },
    {
      when: '2022 — 2023',
      role: 'Full-Stack Engineer',
      org: 'Aerospike · OpenTech Alliance (via Unosquare)',
      note: 'Shipped a Next.js + MUI real-time database console in under 8 weeks; 120 Jest/RTL tests took coverage 35% → 85% and a 20-scenario Cypress suite kept escape defects under 1%. Earlier, 30+ Dynamics 365 PCF controls in 4 weeks with zero critical UAT defects.',
    },
    {
      when: '2021 — 2022',
      role: 'Full-Stack Web Developer',
      org: 'Nearshorecode',
      note: 'React/Node recruitment analytics app in under 6 weeks, ingesting ~1,000 Trello webhook events a day into MongoDB and cutting weekly status prep from ~3h to 10 min. Five Express microservices, JWT-based RBAC, and blue-green releases to Heroku via GitHub Actions.',
    },
    {
      when: '2020 — 2021',
      role: 'Full-Stack Web Developer',
      org: 'Freelance',
      note: 'Three green-field products delivered solo from discovery to production in under 12 weeks each — a casting-agency operations dashboard, a trivia game, and an artist–venue booking portal.',
    },
    {
      when: 'Education',
      role: 'B.S. Systems Engineering · 2020',
      org: 'Universidad San Francisco Xavier de Chuquisaca, Bolivia',
      note: 'Node.js (Intermediate) certification, HackerRank — 2025.',
    },
  ],
  placeholderNote: null,
};
