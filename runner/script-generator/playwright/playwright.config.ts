import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // ---------------------------------
  // Global configuration
  // ---------------------------------
  timeout: 90_000,
  retries: 0,

  // All generated specs live here
  testDir: "./generated",

  // All artifacts (screenshots, videos, traces, JSON)
  outputDir: "./results",

  // ---------------------------------
  // Reporters (HUMAN + MACHINE)
  // ---------------------------------
  reporter: [
    ["list"],

    // Human readable report
    ["html", { open: "never", outputFolder: "playwright-report" }],

    // Dashboard + analytics input
    ["json", { outputFile: "results/results.json" }]
  ],

  // ---------------------------------
  // Shared browser settings
  // ---------------------------------
  use: {
    headless: false,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,

    // Visual regression support
    screenshot: "on",
    video: "retain-on-failure",
    trace: "on-first-retry",

    actionTimeout: 15_000,
    navigationTimeout: 30_000
  },

  // ---------------------------------
  // Projects
  // ---------------------------------
  projects: [
    {
      name: "Chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome"
      }
    }
  ]
});
