// playwright/tests/dashboard-ui.spec.ts
import { test, expect } from '@playwright/test';

/**
 * This spec relies on playwright.config.ts -> use.baseURL
 * CI sets BASE_URL = http://127.0.0.1:5000
 *
 * IMPORTANT: Ensure the UI is served from the same origin as BASE_URL.
 * If the UI is currently only available on a separate dev server (e.g., :5173),
 * this spec will fail unless you either:
 *  - start the frontend in CI, or
 *  - serve the built UI from the backend on :5000, or
 *  - temporarily skip @ui tests with --grep-invert @ui.
 */

test.describe('@ui Dashboard UI smoke tests', () => {
  test('Dashboard loads and shows header', async ({ page }) => {
    // Navigate to the root (or change to '/dashboard' if that's your route)
    const res = await page.goto('/', { waitUntil: 'domcontentloaded' });

    // If server not up, res may be undefined -> keep assertion tolerant but informative
    expect(res?.ok() ?? false, 'UI root should load successfully').toBeTruthy();

    await expect(page.getByText('TestCraft Dashboard')).toHaveCount(1);
  });

  test('Recent Test Runs section present and table loads', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Recent Test Runs')).toHaveCount(1);

    // Give the UI a small buffer for data/mock rendering
    await page.waitForTimeout(500);

    // Check table header exists (prefer role/locator when available)
    await expect(page.locator('th:has-text("ID")')).toHaveCount(1);
  });
});
