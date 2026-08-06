import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

// Vitest cleans up rendered trees automatically; only the module-level DOM state
// our own code writes needs resetting between tests.
afterEach(() => {
  document.documentElement.removeAttribute('data-theme');
  window.localStorage.clear();
});
