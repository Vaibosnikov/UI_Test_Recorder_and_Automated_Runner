import { test, expect } from '@playwright/test';

test.describe('Recorder Extension Verification', () => {
  test('popup UI loads', async ({ page }) => {
    test.skip(true, 'Extension ID not available in CI; skipping.');
    await page.goto('chrome-extension://<EXT_ID>/popup.html');
    await expect(page.locator('h3')).toHaveText('UI Test Recorder');
  });
});
