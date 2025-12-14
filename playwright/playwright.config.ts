// playwright/playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // or './playwright/tests' if that's where your tests are
  timeout: 30_000,
  fullyParallel: true,

  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:5173', // <-- matches YAML
    headless: true,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },

  webServer: {
    // Build first, then preview on the same port
    command: 'npm run build && npm run preview -- --port 5173',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  },

  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    // enable Firefox/WebKit later as needed
  ],

  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
