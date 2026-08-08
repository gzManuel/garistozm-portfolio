import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExternalLink } from './ExternalLink';

describe('ExternalLink', () => {
  it('opens absolute URLs in a new tab, safely', () => {
    render(<ExternalLink href="https://github.com/gzManuel">GitHub</ExternalLink>);
    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('announces that an external link leaves the page', () => {
    render(<ExternalLink href="https://example.com">Repo</ExternalLink>);

    expect(screen.getByRole('link')).toHaveAccessibleName('Repo, opens in a new tab');
  });

  // The content layer still holds `#` placeholders; opening those in a blank
  // tab would be worse than doing nothing.
  it('leaves placeholder hrefs as same-tab links', () => {
    render(<ExternalLink href="#">Résumé</ExternalLink>);
    const link = screen.getByRole('link');

    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
    expect(link).toHaveAccessibleName('Résumé');
  });

  it('treats relative paths as internal', () => {
    render(<ExternalLink href="/cv.pdf">CV</ExternalLink>);

    expect(screen.getByRole('link')).not.toHaveAttribute('target');
  });

  it('keeps the arrow decorative', () => {
    render(
      <ExternalLink href="https://example.com" arrow>
        Live site
      </ExternalLink>,
    );
    const link = screen.getByRole('link');

    expect(link).toHaveTextContent('↗');
    expect(link).toHaveAccessibleName('Live site, opens in a new tab');
  });

  it('passes through its className', () => {
    render(
      <ExternalLink href="#" className="rounded-full">
        Link
      </ExternalLink>,
    );

    expect(screen.getByRole('link')).toHaveClass('rounded-full');
  });
});
