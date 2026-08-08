import { site } from '@/content/site';

export function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-3 border-t border-line px-[22px] py-[26px] font-mono text-[11px] text-fg2 lg:px-16">
      {/*
        No year: this is a static export, so `new Date()` would freeze at build
        time and quietly go stale every January until the next deploy.
      */}
      <span>© {site.name}</span>
      <span>{site.footerNote}</span>
    </footer>
  );
}
