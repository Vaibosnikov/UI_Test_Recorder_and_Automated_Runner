import { test, expect } from "@playwright/test";

test("Recorded Flow (TestCraft)", async ({ page }) => {
  await page.click("span");
  await page.goto("https://demoqa.com/text-box");
  await page.click("span");
  await page.goto("https://demoqa.com/checkbox");
  await page.click("span");
  await page.goto("https://demoqa.com/radio-button");
  await page.click("span");
  await page.goto("https://demoqa.com/webtables");
  await page.click("path");
  await page.click("path");
  await page.click("path");
});
