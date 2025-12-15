// playwright/playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright/tests', 
  timeout: 30_000,
  fullyParallel: true,

  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:4173', // <-- match YAML
    headless: true,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },

  webServer: {
    // Build then preview, targeting the web subfolder
    command: 'npm --prefix runner/web run build && npm --prefix runner/web run preview -- --port 4173 --strictPort --host 127.0.0.1',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  },

  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'Firefox',  use: { ...devices['Desktop Firefox'] } },
    // { name: 'WebKit',   use: { ...devices['Desktop Safari'] } },
  ],

  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
