/**
 * Every anchorable section on the page. Sections take their `id` from this
 * union and nav hrefs are derived from it, so a typo'd anchor is a compile
 * error rather than a link that silently scrolls nowhere.
 */
export const SECTION_IDS = ['about', 'skills', 'projects', 'path', 'contact'] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export interface NavItem {
  readonly label: string;
  readonly href: `#${SectionId}`;
}

export interface SiteContent {
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly timezone: string;
  readonly url: string;
  readonly description: string;
  readonly email: string;
  readonly github: string;
  readonly linkedin: string;
  readonly resume: string;
  readonly nav: readonly NavItem[];
  readonly footerNote: string;
}

export const site = {
  name: 'Manuel Garisto',
  role: 'Senior Frontend Engineer',
  location: 'Buenos Aires, Argentina',
  timezone: 'GMT-3',

  // Production domain, apex (no `www`). Used for the canonical link, OpenGraph
  // URLs, sitemap and robots — keep it in sync with the primary domain on Vercel.
  url: 'https://manuelgaristo.com',

  description:
    'Senior frontend engineer in Buenos Aires. Six years shipping production React and Next.js for U.S. teams — ADA-compliant e-commerce and ed-tech, legacy migrations, CI/CD, and components that hold up after handoff.',

  email: 'garistozm@outlook.com',

  github: 'https://github.com/gzManuel',
  linkedin: 'https://www.linkedin.com/in/garistozunamanuel',

  // TODO(manuel): drop the CV PDF in /public and link it here (e.g. '/manuel-garisto-cv.pdf').
  resume: '#',

  nav: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Path', href: '#path' },
  ],

  footerNote: 'Buenos Aires · GMT-3 · U.S. hours overlap',
} as const satisfies SiteContent;
