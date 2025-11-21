import { test, expect } from '@playwright/test';

test.describe('Playwright Integration Verification', () => {
  test('smoke: homepage loads and title is correct', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navigation works and URL changes', async ({ page }) => {
    await page.goto('https://example.com');
    await page.click('a');
    await expect(page).toHaveURL(/iana.org/);
  });

  test('visual regression baseline', async ({ page }) => {
    await page.goto('https://example.com');
    await page.waitForLoadState('networkidle');
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');
  });
});
