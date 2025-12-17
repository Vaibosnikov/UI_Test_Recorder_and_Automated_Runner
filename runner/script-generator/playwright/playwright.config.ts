import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 90_000,

  testDir: "./generated",

  reporter: [
    ["list"],
    ["html", { open: "never" }]
  ],

  use: {
    headless: false,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,

    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",

    actionTimeout: 15_000,
    navigationTimeout: 30_000
  },

  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
