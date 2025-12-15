import { test, expect } from '@playwright/test';

test('Recorded Flow (TestCraft)', async ({ page }) => {
  await page.goto(process.env.BASE_URL || "http://localhost:5173");
  await page.click("span");
  await page.click("button");
  await page.click("span");
  await page.click("a");
  await page.click("div");
  await page.click("button");
});
