/**
 * tests/example-smoke.spec.ts
 * Simple smoke test to ensure UI is reachable and basic element exists
 */

import { test, expect } from '@playwright/test';

test('UI availability smoke', async ({ page }) => {
  await page.goto(process.env.BASE_URL || 'http://localhost:3000');
  await expect(page.locator('body')).toBeVisible();
});
