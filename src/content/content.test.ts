import { describe, expect, it } from 'vitest';
import { about } from './about';
import { hero } from './hero';
import { projects } from './projects';
import { signals } from './signals';
import { site } from './site';
import { skills } from './skills';
import { timeline } from './timeline';

/**
 * Guards against the kind of breakage that comes from hand-editing copy: a
 * typo'd anchor that scrolls nowhere, or a field emptied out mid-edit. Cheap
 * insurance for the one file the user is expected to keep editing.
 */

const strings = (value: unknown): string[] => {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
};

describe('site', () => {
  it('has a valid absolute URL', () => {
    expect(() => new URL(site.url)).not.toThrow();
  });

  it('uses in-page anchors for every nav item', () => {
    for (const item of site.nav) {
      expect(item.href).toMatch(/^#[a-z-]+$/);
    }
  });

  it('has no duplicate nav targets', () => {
    const hrefs = site.nav.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it('points the external profile links at real hosts', () => {
    for (const url of [site.github, site.linkedin]) {
      expect(url.startsWith('https://')).toBe(true);
    }
  });
});

describe('hero', () => {
  it('lists whoami lines with unique keys', () => {
    const keys = hero.whoami.map((line) => line.key);
    expect(keys.length).toBeGreaterThan(0);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('links its primary call to action to a section on the page', () => {
    expect(hero.primaryCta.href).toBe('#contact');
  });
});

describe('skills', () => {
  it('has non-empty groups', () => {
    expect(skills.groups.length).toBeGreaterThan(0);
    for (const group of skills.groups) {
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it('marks at least one daily driver, or the legend is meaningless', () => {
    const daily = skills.groups.flatMap((group) => group.items).filter((item) => item.daily);
    expect(daily.length).toBeGreaterThan(0);
  });

  it('names each skill only once across all groups', () => {
    const names = skills.groups.flatMap((group) => group.items.map((item) => item.name));
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('projects', () => {
  it('describes the featured project with a stack', () => {
    expect(projects.featured.stack.length).toBeGreaterThan(0);
  });
});

describe('timeline', () => {
  it('has entries', () => {
    expect(timeline.entries.length).toBeGreaterThan(0);
  });
});

describe('every content module', () => {
  it('contains no empty or untrimmed strings', () => {
    const all = strings([about, hero, projects, signals, site, skills, timeline]);
    expect(all.length).toBeGreaterThan(0);
    for (const value of all) {
      expect(value).toBe(value.trim());
      expect(value).not.toBe('');
    }
  });
});
