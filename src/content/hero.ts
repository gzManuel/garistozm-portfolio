export interface WhoamiLine {
  readonly key: string;
  readonly value: string;
}

export interface HeroContent {
  readonly eyebrow: string;
  readonly headline: string;
  readonly lead: string;
  readonly primaryCta: { readonly label: string; readonly href: string };
  readonly filename: string;
  readonly whoami: readonly WhoamiLine[];
}

export const hero = {
  eyebrow: 'Manuel Garisto · Buenos Aires, Argentina · Remote-first',
  headline: 'Senior frontend engineer, based in Buenos Aires.',
  lead: 'I take tangled legacy front-ends and hand back fast, accessible, well-tested products — with the pipelines to keep shipping them.',
  primaryCta: { label: 'Get in touch', href: '#contact' },
  filename: 'whoami.ts',
  whoami: [
    { key: 'role', value: '"Senior Frontend Engineer"' },
    { key: 'years', value: '6' },
    { key: 'stack', value: '[React, Next, TypeScript, Node, AWS]' },
    { key: 'focus', value: '[a11y, performance, migrations]' },
    { key: 'timezone', value: '"GMT-3 · US overlap"' },
    { key: 'open_to', value: '[full-time, contract]' },
  ],
} as const satisfies HeroContent;
