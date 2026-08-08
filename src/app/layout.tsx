import type { Metadata } from 'next';
import { Azeret_Mono, Figtree } from 'next/font/google';
import { site } from '@/content/site';
import './globals.css';

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
  display: 'swap',
});

const azeretMono = Azeret_Mono({
  variable: '--font-azeret-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

// Generated at build time by `app/og.png/route.tsx`.
const ogAlt = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  keywords: ['Manuel Garisto', 'full-stack developer', 'React', 'Next.js', 'TypeScript', 'AWS'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    siteName: site.name,
    locale: 'en_US',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: ogAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [{ url: '/og.png', alt: ogAlt }],
  },
};

// Runs during HTML parsing, before first paint, so the correct palette is
// already applied when the page is painted. See the Next.js
// "preventing flash before hydration" guide.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"||t==="dark"?t:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"))}catch(e){}})()`;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { '@type': 'PostalAddress', addressLocality: site.location },
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${figtree.variable} ${azeretMono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-bg font-sans text-fg">
        <a
          href="#top"
          className="sr-only rounded-full bg-accent px-4 py-2 font-medium text-accent-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
