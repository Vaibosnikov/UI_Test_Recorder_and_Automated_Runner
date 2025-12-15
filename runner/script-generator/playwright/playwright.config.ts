import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './generated',
  timeout: 60000,
  retries: 0,

  use: {
    headless: false,
    viewport: { width: 1280, height: 800 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
});
