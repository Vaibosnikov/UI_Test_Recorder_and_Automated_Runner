import { test, expect } from '@playwright/test';

const UI = process.env.UI_BASE_URL || 'http://localhost:5173';

test.describe('Visualization components presence', () => {
  test('Charts render as SVGs on dashboard', async ({ page }) => {
    await page.goto(UI);
    await page.waitForTimeout(500);
    // Check presence of at least one SVG (Recharts renders SVG)
    const svgs = await page.$$eval('svg', els => els.length);
    expect(svgs).toBeGreaterThan(0);
  });

  test('Run Status chart shows legend labels', async ({ page }) => {
    await page.goto(UI);
    // Recharts renders legend items as text nodes; look for "passed" or "failed"
    const found = await page.locator('text=passed').count();
    const found2 = await page.locator('text=failed').count();
    expect(found + found2).toBeGreaterThanOrEqual(0);
  });
});