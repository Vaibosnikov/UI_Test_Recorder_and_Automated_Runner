import { test, expect } from '@playwright/test';

const UI = process.env.UI_BASE_URL || 'http://localhost:5173';

test('smoke: dashboard home and header', async ({ page }) => {
  await page.goto(UI);
  await expect(page.locator('text=TestCraft Dashboard')).toHaveCount(1);
});

test('smoke: runs table exists', async ({ page }) => {
  await page.goto(UI);
  await expect(page.locator('text=Recent Test Runs')).toHaveCount(1);
});