import { test, expect } from '@playwright/test';

test('Recorded Flow (TestCraft)', async ({ page }) => {
  await page.goto(process.env.BASE_URL || "http://localhost:5173");
  await page.goto(process.env.BASE_URL || "http://localhost:5173" + '/ax/claim');
});
