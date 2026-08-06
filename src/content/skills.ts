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
        skill('Python'),
        skill('HTML / CSS', true),
      ],
    },
    {
      label: 'Frameworks',
      items: [
        skill('React', true),
        skill('Next.js', true),
        skill('Node.js', true),
        skill('Angular'),
      ],
    },
    {
      label: 'Cloud & tooling',
      items: [
        skill('AWS Lambda', true),
        skill('S3', true),
        skill('Amplify', true),
        skill('Jenkins CI/CD', true),
        skill('Cypress'),
        skill('Copilot', true),
        skill('Claude', true),
      ],
    },
    {
      label: 'Data & content',
      items: [
        skill('PostgreSQL'),
        skill('MongoDB'),
        skill('Firebase'),
        skill('Contentful', true),
        skill('Builder.io', true),
      ],
    },
  ],
} as const satisfies SkillsContent;
