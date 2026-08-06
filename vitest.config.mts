import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Resolves the `@/*` alias from tsconfig.json natively — no plugin needed.
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // Scoped to code that carries logic. layout.tsx (fonts and the pre-paint
      // inline script), route metadata files and the test harness are excluded
      // so the 80% floor measures something real rather than being padded by
      // files no unit test can meaningfully exercise.
      include: ['src/components/**', 'src/lib/**', 'src/content/**'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/test/**'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
