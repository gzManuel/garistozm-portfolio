import { site } from '@/content/site';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg-blur backdrop-blur-[10px]">
      <div className="flex items-center justify-between gap-5 px-[22px] py-4 lg:px-16 lg:py-[18px]">
        <a href="#top" className="font-mono text-[13px] font-medium tracking-[0.02em]">
          <span className="text-accent">mg</span>
          <span className="text-fg2">.dev</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-fg2 md:flex">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-fg">
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-accent px-4 py-2 whitespace-nowrap text-accent transition-colors hover:bg-accent hover:text-accent-ink"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
