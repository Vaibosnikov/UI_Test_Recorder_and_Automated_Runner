import { test, expect } from '@playwright/test';

test('Inline HTML test', async ({ page }) => {
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Inline Test</title>
      </head>
      <body>
        <h1>Welcome to the Inline Test Page</h1>
        <p>This is a test paragraph rendered directly in the browser.</p>
        <a href="https://playwright.dev">Learn more</a>
      </body>
    </html>
  `);

  // Assertions
  await expect(page.locator('h1')).toHaveText('Welcome to the Inline Test Page');
  await expect(page.locator('p')).toContainText('test paragraph');
  await expect(page.locator('a')).toHaveText('Learn more');

  // Click the link
  await page.locator('a').click();

  // Confirm navigation
  await expect(page).toHaveURL('https://playwright.dev');
});




