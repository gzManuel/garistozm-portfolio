import { site } from '@/content/site';

export function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-3 border-t border-line px-[22px] py-[26px] font-mono text-[11px] text-fg2 lg:px-16">
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <span>{site.footerNote}</span>
    </footer>
  );
}
