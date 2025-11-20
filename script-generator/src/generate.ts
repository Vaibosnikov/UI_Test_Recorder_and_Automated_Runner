import type { Recording } from './schema';

export const toPlaywrightSpec = (recording: Recording, name = 'Recorded Flow') => {
  const firstUrl = recording.find(e => e.url)?.url || 'about:blank';

  const steps = recording.map(evt => {
    if (evt.kind === 'click') return `  await page.click(${JSON.stringify(evt.selector)});`;
    if (evt.kind === 'input') return `  await page.fill(${JSON.stringify(evt.selector)}, ${JSON.stringify(evt.value)});`;
    return '';
  }).join('\n');

  return `import { test, expect } from '@playwright/test';

test(${JSON.stringify(name)}, async ({ page }) => {
  await page.goto(${JSON.stringify(firstUrl)});
${steps}
});`;
};
