import { test, expect } from '@playwright/test';

/**
 * End-to-End Example Test
 * 
 * This test demonstrates a complete flow:
 * 1. Navigate to a page
 * 2. Interact with elements
 * 3. Assert expected outcomes
 * 
 * Run with: npx playwright test e2e-example.spec.ts
 */

test('should complete e2e flow successfully', async ({ page }) => {
  // Navigate to the dashboard
  await page.goto('http://localhost:5173');
  
  // Wait for the dashboard to load
  await expect(page.locator('h1')).toContainText('Test Runs Dashboard');
  
  // Verify the table is present
  const table = page.locator('table');
  await expect(table).toBeVisible();
  
  // Check if API is healthy
  const healthResponse = await page.request.get('http://localhost:5000/v1/health');
  expect(healthResponse.ok()).toBeTruthy();
  
  const healthData = await healthResponse.json();
  expect(healthData.status).toBe('ok');
  
  console.log('✅ E2E test passed - Dashboard and API are working!');
});
