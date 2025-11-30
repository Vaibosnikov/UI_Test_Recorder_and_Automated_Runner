/**
 * generated/login_flow.spec.ts
 * Sample generated test (simulates recorder output). Uses visual util.
 */

import { test, expect } from '@playwright/test';
import { compareWithBaseline } from '../utils/visual.js';

test('Generated Login Flow', async ({ page }, testInfo) => {
  await page.goto(process.env.BASE_URL || 'http://localhost:3000');

  // Simple recorded steps (example)
  await page.click('text=Login');
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password');
  await page.click('text=Sign in');

  // Assert landing
  await expect(page.locator('text=Welcome')).toBeVisible();

  // Visual regression check
  const screenshot = await page.screenshot({ fullPage: false });
  const { mismatched, isNewBaseline, diffPath, score } = await compareWithBaseline({ testName: testInfo.title.replace(/\\s+/g, '_'), buffer: screenshot });

  if (isNewBaseline) {
    console.log('New baseline created for', testInfo.title);
  } else if (mismatched) {
    console.log('Visual mismatch:', { score, diffPath });
  }

  expect(mismatched, Visual diff score ).toBe(false);
});
