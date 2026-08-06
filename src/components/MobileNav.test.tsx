import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MobileNav } from './MobileNav';
import { site } from '@/content/site';

const trigger = () => screen.getByRole('button');
const panel = () => screen.queryByRole('navigation', { name: 'Mobile' });

describe('MobileNav', () => {
  it('starts closed', () => {
    render(<MobileNav />);

    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    expect(panel()).not.toBeInTheDocument();
  });

  it('opens on click and moves focus into the panel', async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(trigger());

    expect(trigger()).toHaveAttribute('aria-expanded', 'true');
    expect(panel()).toBeInTheDocument();
    expect(screen.getByRole('link', { name: site.nav[0].label })).toHaveFocus();
  });

  it('lists every nav item plus the contact link', async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(trigger());

    for (const item of site.nav) {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute('href', item.href);
    }
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(trigger());

    await user.keyboard('{Escape}');

    expect(panel()).not.toBeInTheDocument();
    expect(trigger()).toHaveFocus();
  });

  it('closes when a nav link is followed', async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(trigger());

    await user.click(screen.getByRole('link', { name: 'Projects' }));

    expect(panel()).not.toBeInTheDocument();
  });

  it('closes on a second click of the trigger', async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(trigger());

    await user.click(trigger());

    expect(panel()).not.toBeInTheDocument();
  });

  it('traps Tab inside the panel', async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(trigger());

    const links = screen.getAllByRole('link');
    const first = links[0]!;
    const last = links[links.length - 1]!;

    last.focus();
    await user.tab();
    expect(first).toHaveFocus();

    await user.tab({ shift: true });
    expect(last).toHaveFocus();
  });
});
