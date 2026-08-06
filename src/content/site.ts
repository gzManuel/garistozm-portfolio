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
  role: 'Full-stack web developer',
  location: 'Buenos Aires, Argentina',
  timezone: 'GMT-3',

  // TODO(manuel): swap for the production domain once the Vercel project has one.
  // Used for the canonical link, OpenGraph URLs, sitemap and robots.
  url: 'https://garistozm.vercel.app',

  description:
    'Full-stack web developer in Buenos Aires. Six years shipping production React and Next.js for U.S. teams — migrations, CI/CD, and accessible components that hold up after handoff.',

  // TODO(manuel): replace with your real address — this is the mock placeholder.
  email: 'hello@example.com',

  // TODO(manuel): point these at your actual profiles.
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',

  // TODO(manuel): drop a PDF in /public and link it here (e.g. '/manuel-garisto-cv.pdf').
  resume: '#',

  nav: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Path', href: '#path' },
  ],

  footerNote: 'Buenos Aires · GMT-3',
} as const satisfies SiteContent;
