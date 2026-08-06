import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pure static site: `next build` emits HTML/CSS/JS into `out/`, no server runtime.
  output: 'export',
  // The default image loader needs a server; unsupported under `output: 'export'`.
  images: { unoptimized: true },
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;
