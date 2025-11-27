import { test, expect } from '@playwright/test';

test.describe('Playwright Integration', () => {
  test('should run a basic navigation flow', async ({ page }) => {
    await page.goto('https://example.com');
    expect(await page.title()).toBe('Example Domain');
  });

  test('should support headless execution', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://example.com');
    expect(await page.title()).toBe('Example Domain');
    await context.close();
  });
});

