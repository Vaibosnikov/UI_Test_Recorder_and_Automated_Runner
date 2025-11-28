import { test, expect } from '@playwright/test';

// Simulated generator test: verify conversion of events to Playwright commands
test('Script Generator: should convert events to Playwright syntax', async () => {
  const toPlaywright = (event: any) => {
    if (event.type === 'click') return `await page.click("${event.selector}");`;
    if (event.type === 'input') return `await page.fill("${event.selector}", "${event.value}");`;
    return '';
  };

  const clickEvent = { type: 'click', selector: '#btnSubmit' };
  const inputEvent = { type: 'input', selector: "[name='username']", value: 'vaishnavi' };

  const clickCode = toPlaywright(clickEvent);
  const inputCode = toPlaywright(inputEvent);

  expect(clickCode).toBe(`await page.click("#btnSubmit");`);
  expect(inputCode).toBe(`await page.fill("[name='username']", "vaishnavi");`);
});
