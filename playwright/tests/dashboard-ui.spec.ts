// playwright/tests/dashboard-ui.spec.ts
import { test, expect } from '@playwright/test';

/**
 * UI smoke + light E2E coverage.
 *
 * Relies on playwright.config.ts -> use.baseURL
 * CI should ensure the UI is reachable at BASE_URL.
 */

test.describe('@ui Dashboard UI smoke tests', () => {
  test('Dashboard loads and shows main header', async ({ page }) => {
    const res = await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Fail fast if the app itself is unreachable
    expect(
      res?.ok() ?? false,
      'UI root should load successfully'
    ).toBeTruthy();

    // Main dashboard heading
    await expect(
      page.getByRole('heading', { name: /testcraft dashboard/i })
    ).toBeVisible();
  });

  test('Recent Test Runs section present and table renders', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Explicitly pick the first "Recent Test Runs" heading (strict-mode safe)
    const sectionHeading = page
      .getByRole('heading', { name: 'Recent Test Runs' })
      .first();

    await expect(sectionHeading).toBeVisible();

    // Scope the table to the same section to avoid strict-mode violations
    const table = sectionHeading
      .locator('..')
      .getByRole('table');

    await expect(
      table,
      'Recent Test Runs table should render'
    ).toBeVisible();
  });
});