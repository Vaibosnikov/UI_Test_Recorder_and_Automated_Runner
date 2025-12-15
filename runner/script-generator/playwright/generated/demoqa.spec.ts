import { test, expect } from '@playwright/test';

test('DemoQA smoke test', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  await expect(page.locator('h1')).toHaveText('Text Box');

  await page.fill('#userName', 'Vaibhav');
  await page.fill('#userEmail', 'vaibhav@testcraft.dev');
  await page.fill('#currentAddress', 'Lucknow');
  await page.fill('#permanentAddress', 'BITS Pilani');

  await page.click('#submit');

  await expect(page.locator('#name')).toContainText('Vaibhav');
});
