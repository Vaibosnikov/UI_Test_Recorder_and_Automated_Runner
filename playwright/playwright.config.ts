import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Because this config file is inside the `playwright/` folder,
  // `./tests` resolves to `playwright/tests`.
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI for stability */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  /* Shared settings for all tests */
  use: {
    /**
     * Base URL for `page.goto()` and API `request` calls.
     * We prefer IPv4 (127.0.0.1) to avoid ::1 resolution issues on runners.
     * Matches backend default port (5000) from runner/api/src/config/env.js.
     */
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:5000',

    /* Collect trace when retrying a failed test */
    trace: 'on-first-retry',
  },

  /* Ensure Playwright discovers all spec files (optional but helpful) */
  testMatch: /.*\.spec\.(ts|js)$/,

  /* Configure projects for major browsers */
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],

  /* If you later want Playwright to manage the server startup, uncomment this block (Option B)
     and remove the manual start from your workflow.
  */
  // webServer: {
  //   // Start backend from repo root using the runner/api script
  //   command: 'npm run dev --prefix runner/api',
  //   url: process.env.BASE_URL || 'http://127.0.0.1:5000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120_000,
  // },
});
