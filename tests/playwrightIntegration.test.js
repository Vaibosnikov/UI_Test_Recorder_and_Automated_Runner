import { test, expect } from '@playwright/test';

test.describe('Playwright Integration Suite', () => {
  test('should navigate to example.com and verify title', async ({ page }) => {
    await page.goto('https://example.com');
    const title = await page.title();
    expect(title).toBe('Example Domain');
  });

  test('should run in headless mode without errors', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://example.com');
    expect(await page.title()).toBe('Example Domain');
    await context.close();
  });

  test('should capture basic page metrics', async ({ page }) => {
    await page.goto('https://example.com');
    const metrics = await page.evaluate(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }));
    expect(metrics.width).toBeGreaterThan(0);
    expect(metrics.height).toBeGreaterThan(0);
  });

  test('should validate DOM element presence', async ({ page }) => {
    await page.goto('https://example.com');
    const heading = await page.locator('h1');
    await expect(heading).toHaveText('Example Domain');
  });
});
