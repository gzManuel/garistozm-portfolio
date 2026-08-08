import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

/*
 * Social card, generated once at build time and emitted as `out/og.png`.
 *
 * This is a Route Handler rather than the `opengraph-image.tsx` file convention
 * on purpose. That convention produces an *extensionless* asset at
 * `/opengraph-image`, and a plain static host serves it with no `Content-Type`
 * header at all (verified with `serve out`: 200, zero content-type) — which
 * crawlers reject, so the card would silently render blank. A route whose path
 * ends in `.png` gets the right content-type from every static host.
 *
 * Static export supports Route Handlers as long as they are GET-only and don't
 * read from the request.
 */
export const dynamic = 'force-static';

const size = { width: 1200, height: 630 };

// Satori resolves a limited colour space, so the palette is inlined as hex
// rather than referencing the oklch() custom properties from globals.css.
const BG = '#0b0d0f';
const FG = '#e9edf0';
const FG2 = '#9aa7b0';
const ACCENT = '#6fd2e8';
const LINE = '#242c33';

export function GET() {
  return new ImageResponse(
    // Satori supports flexbox only — no grid, and every child needs an
    // explicit display value.
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: BG,
        padding: '80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <div style={{ width: '40px', height: '2px', background: ACCENT, display: 'flex' }} />
        <div
          style={{
            display: 'flex',
            color: FG2,
            fontSize: '26px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          {site.name}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            color: FG,
            fontSize: '96px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}
        >
          Full-stack web
        </div>
        <div
          style={{
            display: 'flex',
            color: FG,
            fontSize: '96px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}
        >
          developer<span style={{ color: ACCENT }}>.</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: `1px solid ${LINE}`,
          paddingTop: '28px',
          color: FG2,
          fontSize: '28px',
        }}
      >
        <div style={{ display: 'flex' }}>{site.location} · Remote-first</div>
        <div style={{ display: 'flex', color: ACCENT }}>mg.dev</div>
      </div>
    </div>,
    size,
  );
}
