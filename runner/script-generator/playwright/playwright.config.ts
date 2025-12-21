import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // ---------------------------------
  // Global configuration
  // ---------------------------------
  timeout: 90_000,
<<<<<<< HEAD
  retries: 0,

  // All generated specs live here
=======
  retries: 1,
>>>>>>> 5ba95c7fc1d786d05a991e513179205deb15d6a9
  testDir: "./generated",

  // All artifacts (screenshots, videos, traces, JSON)
  outputDir: "./results",

  // ---------------------------------
  // Reporters (HUMAN + MACHINE)
  // ---------------------------------
  reporter: [
    ["list"],

<<<<<<< HEAD
    // Human readable report
    ["html", { open: "never", outputFolder: "playwright-report" }],

    // Dashboard + analytics input
    ["json", { outputFile: "results/results.json" }]
=======
    // ✅ JSON report for TestCraft processing
    ["json", { outputFile: "results/playwright-results.json" }],

    // ✅ Human-friendly HTML report
    ["html", { open: "never", outputFolder: "playwright-report" }]
>>>>>>> 5ba95c7fc1d786d05a991e513179205deb15d6a9
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
