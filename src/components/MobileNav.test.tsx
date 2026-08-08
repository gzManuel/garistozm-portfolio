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

  // The panel stays mounted (just `hidden`) so aria-controls always resolves to
  // a real element rather than dangling while closed.
  it('keeps the panel in the DOM so aria-controls resolves', () => {
    render(<MobileNav />);

    // `hidden: true` opts into querying elements excluded from the a11y tree —
    // exactly what we want to assert here: the target exists while closed.
    const target = screen.getByRole('navigation', { name: 'Mobile', hidden: true });

    expect(trigger()).toHaveAttribute('aria-controls', target.id);
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

  it('closes when a press lands outside the menu', async () => {
    const user = userEvent.setup();
    render(
      <>
        <MobileNav />
        <button type="button">elsewhere</button>
      </>,
    );
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(panel()).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'elsewhere' }));

    expect(panel()).not.toBeInTheDocument();
  });

  it('stays open when a press lands inside the menu', async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(trigger());

    await user.click(screen.getByRole('navigation', { name: 'Mobile' }));

    expect(panel()).toBeInTheDocument();
  });

  // Regression: this is a non-modal disclosure, not a dialog. Trapping focus
  // here would strand keyboard users in a menu they can see past.
  it('does not trap focus inside the panel', async () => {
    const user = userEvent.setup();
    render(
      <>
        <MobileNav />
        <a href="#after">after</a>
      </>,
    );
    await user.click(trigger());

    screen.getByRole('link', { name: 'Contact' }).focus();
    await user.tab();

    expect(screen.getByRole('link', { name: 'after' })).toHaveFocus();
  });
});
