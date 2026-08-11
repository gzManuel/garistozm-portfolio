export interface Skill {
  readonly name: string;
  /** Marked with the accent treatment and explained by the "daily driver" key. */
  readonly daily: boolean;
}

export interface SkillGroup {
  readonly label: string;
  readonly items: readonly Skill[];
}

export interface SkillsContent {
  readonly intro: string;
  readonly legend: string;
  readonly groups: readonly SkillGroup[];
}

const skill = (name: string, daily = false): Skill => ({ name, daily });

export const skills = {
  intro: 'Grouped by what I reach for, not scored out of ten. Daily drivers are marked.',
  legend: 'daily driver',
  groups: [
    {
      label: 'Languages',
      items: [
        skill('TypeScript', true),
        skill('JavaScript', true),
        skill('HTML / CSS', true),
        skill('SCSS', true),
        skill('Python'),
        skill('SQL'),
      ],
    },
    {
      label: 'Frontend',
      items: [
        skill('React', true),
        skill('Next.js', true),
        skill('Tailwind CSS', true),
        skill('Redux'),
        skill('TanStack Query'),
        skill('MUI'),
        skill('Storybook'),
        skill('Angular'),
      ],
    },
    {
      label: 'Backend & APIs',
      items: [
        skill('Node.js', true),
        skill('Express'),
        skill('GraphQL', true),
        skill('REST', true),
        skill('BFF pattern', true),
        skill('OIDC / JWT'),
        skill('Flask'),
      ],
    },
    {
      label: 'Testing',
      items: [
        skill('Jest', true),
        skill('React Testing Library', true),
        skill('Vitest'),
        skill('Cypress'),
        skill('Mocha & Chai'),
      ],
    },
    {
      label: 'Cloud & tooling',
      items: [
        skill('AWS Lambda', true),
        skill('S3', true),
        skill('Amplify', true),
        skill('Jenkins CI/CD', true),
        skill('GitHub Actions'),
        skill('Turborepo', true),
        skill('Docker'),
        skill('Vercel'),
        skill('Copilot', true),
        skill('Claude', true),
      ],
    },
    {
      label: 'Data & content',
      items: [
        skill('PostgreSQL'),
        skill('MongoDB'),
        skill('Redis'),
        skill('Firebase'),
        skill('Contentful', true),
        skill('Builder.io', true),
      ],
    },
    {
      label: 'Accessibility & performance',
      items: [
        skill('WCAG 2.1 / ADA', true),
        skill('Axe'),
        skill('SortSite'),
        skill('Lighthouse', true),
        skill('Core Web Vitals', true),
      ],
    },
  ],
} as const satisfies SkillsContent;
