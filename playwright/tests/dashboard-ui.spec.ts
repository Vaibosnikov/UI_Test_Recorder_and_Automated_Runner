import { test, expect } from '@playwright/test';

const UI = process.env.UI_BASE_URL || 'http://localhost:5173';

test.describe('Dashboard UI smoke tests', () => {
  test('Dashboard loads and shows header', async ({ page }) => {
    const res = await page.goto(UI, { waitUntil: 'domcontentloaded' });
    // If dev server not up, this will throw; test will fail clearly.
    expect(res?.ok() ?? true).toBeTruthy();
    await expect(page.locator('text=TestCraft Dashboard')).toHaveCount(1);
  });

  test('Recent Test Runs section present and table loads', async ({ page }) => {
    await page.goto(UI);
    await expect(page.locator('text=Recent Test Runs')).toHaveCount(1);
    // Wait a short while for mock data to render
    await page.waitForTimeout(500);
    // Check table header exists
    await expect(page.locator('th:has-text("ID")')).toHaveCount(1);
  });
});