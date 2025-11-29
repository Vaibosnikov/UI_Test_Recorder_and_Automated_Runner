import { test, expect } from '@playwright/test';

const UI = process.env.UI_BASE_URL || 'http://localhost:5173';

test('generated: login flow (sample)', async ({ page }) => {
  await page.goto(UI);
  // sample steps - replace selectors with real ones if needed
  // these lines are placeholders to demonstrate generated code
  // await page.fill('input[name="username"]', 'demo');
  // await page.fill('input[name="password"]', 'demo');
  // await page.click('button[type="submit"]');
  // await expect(page.locator('text=Welcome')).toHaveCount(1);

  // if UI is mock, at least check dashboard loads
  await expect(page.locator('text=TestCraft Dashboard')).toHaveCount(1);
});