import type { ReactNode } from 'react';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Appends the ↗ affordance, hidden from assistive tech. */
  arrow?: boolean;
  /**
   * Forces a new tab for a same-origin href. For assets that are not the site —
   * the résumé PDF — where following the link in place would drop the visitor
   * out of the page they were reading.
   */
  newTab?: boolean;
}

/** An href that actually leaves the site, rather than a `#` placeholder. */
function isAbsolute(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/**
 * One code path for outbound links.
 *
 * `target="_blank"` is applied to genuinely absolute URLs and to hrefs opted in
 * via `newTab`, so the `#` placeholders still sitting in `content/` don't open
 * empty tabs — and the ↗ glyph is decorative, so screen readers don't announce
 * "north east arrow" after every link name.
 */
export function ExternalLink({
  href,
  children,
  className,
  arrow = false,
  newTab = false,
}: ExternalLinkProps) {
  const opensInNewTab = isAbsolute(href) || newTab;

  return (
    <a
      href={href}
      className={className}
      {...(opensInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {arrow && <span aria-hidden="true"> ↗</span>}
      {/*
        Leading comma, not a leading space: the accessible-name algorithm trims
        each node before joining, so a space would be dropped and the name would
        run together as "Repoopens in a new tab".
      */}
      {opensInNewTab && <span className="sr-only">, opens in a new tab</span>}
    </a>
  );
}
