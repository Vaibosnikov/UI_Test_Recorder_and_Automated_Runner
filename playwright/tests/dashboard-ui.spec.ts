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

    // Prefer role-based selector for main heading
    await expect(
      page.getByRole('heading', { name: /testcraft dashboard/i })
    ).toBeVisible();
  });

  test('Recent Test Runs section present and table renders', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Section heading should exist (don’t assume uniqueness)
    await expect(
      page.getByRole('heading', { name: /recent test runs/i })
    ).toBeVisible();

    // Wait for table to appear instead of using timeouts
    const table = page.getByRole('table');
    await expect(table, 'Recent Test Runs table should render').toBeVisible();

    // Validate at least one expected column header
    await expect(
      table.getByRole('columnheader', { name: /id/i })
    ).toBeVisible();
  });
});
