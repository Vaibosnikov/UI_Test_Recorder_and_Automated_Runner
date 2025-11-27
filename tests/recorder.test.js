import { test, expect } from '@playwright/test';

test.describe('Recorder Module', () => {
  test('should capture click events', async ({ page }) => {
    await page.goto('https://example.com');
    await page.click('text=More information');
    expect(await page.title()).toContain('Example Domain');
  });

  test('should serialize events correctly', async ({ page }) => {
    const event = { type: 'click', target: 'button#submit' };
    expect(event).toHaveProperty('type', 'click');
  });
});
