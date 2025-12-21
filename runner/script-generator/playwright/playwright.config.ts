import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // ---------- Global ----------
  timeout: 90_000,
  retries: 1,
  testDir: "./generated",
  outputDir: "./results",

  // ---------- Reporters ----------
  reporter: [
    ["list"],

    // ✅ JSON report for TestCraft processing
    ["json", { outputFile: "results/playwright-results.json" }],

    // ✅ Human-friendly HTML report
    ["html", { open: "never", outputFolder: "playwright-report" }]
  ],

  // ---------- Shared Settings ----------
  use: {
    headless: false,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,

    // IMPORTANT for visual baseline
    screenshot: "on",
    video: "retain-on-failure",
    trace: "on-first-retry",

    actionTimeout: 15_000,
    navigationTimeout: 30_000
  },

  // ---------- Projects ----------
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
