# garistozm-portfolio

Personal site for Manuel Garisto — a statically exported Next.js app, built from a
Claude Design mock.

## Stack

|           |                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| Framework | Next.js 16 (App Router), statically exported (`output: 'export'`)                                            |
| Language  | TypeScript — `strict`, plus `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax` |
| Styling   | Tailwind CSS v4, CSS-first config — design tokens live in `src/app/globals.css`                              |
| Tests     | Vitest + React Testing Library, 80% coverage floor (enforced)                                                |
| Quality   | Type-aware ESLint (`strictTypeChecked`) + jsx-a11y, Prettier, Husky                                          |
| Hosting   | Vercel — no serverless functions, no runtime cost                                                            |

There is no animation library. The scroll reveal is a shared `IntersectionObserver`
plus a CSS transition (`src/lib/reveal.ts`), which does what the mock did for a
fraction of the bytes. The only client-side JavaScript on the page is the theme
toggle, the mobile nav and that observer.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Command                 | Purpose                                    |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Dev server                                 |
| `npm run build`         | Static export into `out/`                  |
| `npm run preview`       | Serve the built `out/` locally             |
| `npm run typecheck`     | `tsc --noEmit`                             |
| `npm run lint`          | ESLint (type-aware)                        |
| `npm run format`        | Prettier, including Tailwind class sorting |
| `npm run test`          | Vitest, single run                         |
| `npm run test:watch`    | Vitest, watch mode                         |
| `npm run test:coverage` | Vitest with the 80% threshold enforced     |

There is no `npm start` — `next start` is incompatible with `output: 'export'`. Use
`npm run preview` to serve the real build.

Git hooks (Husky): `pre-commit` runs lint-staged; `pre-push` runs typecheck and the
test suite. Those are local and bypassable, so CI is the real gate:
`.github/workflows/ci.yml` runs typecheck, lint, format, tests and build on every
push and PR to `main`.

## Social card

`src/app/og.png/route.tsx` generates the 1200×630 share image at build time from
`src/content/site.ts`, so it stays in sync with your name and role automatically.

It's a Route Handler rather than Next's `opengraph-image.tsx` convention on purpose:
that convention emits an _extensionless_ asset, which a static host serves with no
`Content-Type` header — crawlers reject it and the card silently renders blank. A path
ending in `.png` gets the right content type everywhere.

## Editing content

All copy lives in `src/content/` — no strings are hardcoded in components.

| File          | Contents                                                 |
| ------------- | -------------------------------------------------------- |
| `site.ts`     | Name, URL, email, social links, résumé, nav, section ids |
| `hero.ts`     | Headline, lead, `whoami.ts` card lines                   |
| `about.ts`    | About paragraphs and availability chips                  |
| `skills.ts`   | Skill groups; `daily: true` gets the accent treatment    |
| `projects.ts` | Featured project plus the two empty slots                |
| `timeline.ts` | Work history and education                               |
| `signals.ts`  | Testimonial and achievement cards                        |

Search for `TODO(manuel)` to find every placeholder still carried over from the
mock — real email, employers and dates, project URLs, résumé PDF, production domain.

Two placeholder notices are rendered conditionally and disappear on their own once
the real content is in:

- the timeline caveat box, when `timeline.placeholderNote` is set to `null`
- the "placeholder address" line under the email, when `site.email` no longer ends
  in `@example.com`

Section anchors are typed: `SECTION_IDS` in `site.ts` is the single source for both
the nav hrefs and the section `id`s, so a mistyped anchor fails the build rather
than silently scrolling nowhere.

## Theming

`data-theme` on `<html>` is the source of truth. An inline script in
`src/app/layout.tsx` sets it during HTML parsing — before first paint — from
`localStorage`, falling back to `prefers-color-scheme`. The toggle holds no React
state, so there is nothing to hydrate and no flash of the wrong palette.

## Deploying

Import the repo on Vercel and accept the detected Next.js defaults; `output: 'export'`
makes it a pure static deploy. Pushes to `main` deploy to production.

Before the first deploy, set `site.url` in `src/content/site.ts` to the real domain —
it feeds the canonical link, OpenGraph tags, `sitemap.xml` and `robots.txt`.
