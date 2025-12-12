import { test, expect } from "@playwright/test";

test("UI availability smoke", async ({ page }) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";
  await page.goto(baseUrl);
  await expect(page.locator("body")).toBeVisible();
});
