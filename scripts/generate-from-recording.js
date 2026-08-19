#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const [,, inputPath, outputPath] = process.argv;

if (!inputPath) {
  console.log('Usage: node scripts/generate-from-recording.js <input.json> [output.spec.ts]');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/generate-from-recording.js recording-123456.json');
  console.log('  node scripts/generate-from-recording.js recording.json my-test.spec.ts');
  process.exit(1);
}

const events = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const lines = [
  "import { test, expect } from '@playwright/test';",
  '',
  "test('Recording from JSON', async ({ page }) => {",
];

for (const e of events) {
  if (e.type === 'navigate' && e.url) {
    lines.push(`  await page.goto('${e.url}');`);
  } else if (e.type === 'click' && e.selector) {
    lines.push(`  await page.click('${e.selector}');`);
  } else if (e.type === 'type' && e.selector && e.value) {
    lines.push(`  await page.fill('${e.selector}', '${e.value.replace(/'/g, "\\'")}');`);
  } else if (e.type === 'assert' && e.selector) {
    lines.push(`  await expect(page.locator('${e.selector}')).toBeVisible();`);
  }
}

lines.push('});');
lines.push('');

const output = outputPath || inputPath.replace(/\.json$/i, '.spec.ts');
fs.writeFileSync(output, lines.join('\n'), 'utf8');

console.log(`Generated Playwright test: ${output}`);
