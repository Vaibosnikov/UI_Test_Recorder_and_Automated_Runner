import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: path.resolve(__dirname, '../tests'),
  timeout: 60_000,
  expect: { timeout: 5000 },
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  outputDir: path.resolve(__dirname, '../results'),
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
