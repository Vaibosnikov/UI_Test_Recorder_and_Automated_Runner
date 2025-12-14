import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Playwright will discover tests ONLY from this directory
  testDir: "./generated",

  // Global timeouts
  timeout: 60_000,
  expect: {
    timeout: 5_000
  },

  // Test reports
  reporter: [
    ["list"],
    ["html", { open: "never" }]
  ],

  // Artifacts output
  outputDir: "./results",

  // Shared test settings
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    baseURL: process.env.BASE_URL || "http://localhost:5000"
  },

  // Browser projects
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
