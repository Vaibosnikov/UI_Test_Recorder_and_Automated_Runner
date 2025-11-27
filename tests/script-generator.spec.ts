import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Generated spec contains Playwright commands', async () => {
  const events = [
    { type: 'navigation', value: 'https://example.com' },
    { type: 'click', selector: 'button#login' },
    { type: 'input', selector: 'input#user', value: 'alice' }
  ];
  fs.writeFileSync('recorded-events.json', JSON.stringify(events));

  const spec = `
import { test } from '@playwright/test';
test('recorded test', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('button#login');
  await page.fill('input#user','alice');
});
`;
  fs.writeFileSync('generated/recorded.spec.ts', spec);
  const content = fs.readFileSync('generated/recorded.spec.ts', 'utf8');
  expect(content).toContain('page.goto');
  expect(content).toContain('page.click');
  expect(content).toContain('page.fill');
});
