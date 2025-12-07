import { test, expect } from '@playwright/test';

// Basic login happy-path generated from recorder JSON.
test('Login Flow (Generated via Script Generator)', async ({ page }) => {
  await page.goto(process.env.BASE_URL || "http://localhost:5000");
  await page.goto(process.env.BASE_URL || "http://localhost:5000" + '/login');
  await page.fill("[data-testid='email-input']", "user@example.com");
  await page.fill("[data-testid='password-input']", "password123");
  await page.click("[data-testid='login-submit']");
  await expect(page.locator("h1")).toHaveText("Dashboard");
});
