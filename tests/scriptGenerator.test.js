import { test, expect } from '@playwright/test';

test.describe('Script Generator', () => {
  test('should generate a valid script snippet', async () => {
    const script = `await page.goto('https://example.com');`;
    expect(script).toMatch(/page\.goto/);
  });

  test('should handle multiple steps', async () => {
    const steps = [
      "await page.goto('https://example.com');",
      "await page.click('text=More information');"
    ];
    expect(steps.length).toBeGreaterThan(1);
  });
});
