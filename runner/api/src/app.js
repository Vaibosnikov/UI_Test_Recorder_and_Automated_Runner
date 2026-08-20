import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/v1/runs', (req, res) => {
  res.json({ status: 'ok', runs: [] });
});

app.post('/v1/generate-script', (req, res) => {
  const { events } = req.body;

  if (!Array.isArray(events) || events.length === 0) {
    return res.status(400).json({ error: 'At least one recorded event is required' });
  }

  return res.json({ script: generatePlaywrightTest(events) });
});

app.post('/generate', (req, res) => {
  const { actions } = req.body;

  if (!Array.isArray(actions) || actions.length === 0) {
    return res.status(400).json({ error: 'At least one recorded action is required' });
  }

  return res.json({ script: generatePlaywrightTest(actions) });
});

function escapeText(value = '') {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n');
}

function selectorFor(event) {
  return event.selector || event.target?.selector || event.cssSelector || event.element?.selector || '';
}

function generatePlaywrightTest(events) {
  const lines = [
    "import { test, expect } from '@playwright/test';",
    '',
    "test('Recorded test', async ({ page }) => {",
  ];

  const firstUrl = events.find((event) => event.type === 'navigate' && event.url)?.url;
  if (firstUrl) {
    lines.push(`  await page.goto('${escapeText(firstUrl)}');`);
  }

  for (const event of events) {
    const type = event.type || event.action;
    const selector = selectorFor(event);

    if (type === 'navigate' && event.url && event.url !== firstUrl) {
      lines.push(`  await page.goto('${escapeText(event.url)}');`);
    } else if ((type === 'click' || type === 'pointerdown') && selector) {
      lines.push(`  await page.locator('${escapeText(selector)}').click();`);
    } else if ((type === 'input' || type === 'fill' || type === 'change') && selector) {
      const value = event.value ?? event.target?.value ?? '';
      lines.push(`  await page.locator('${escapeText(selector)}').fill('${escapeText(value)}');`);
    } else if ((type === 'assert' || type === 'visible') && selector) {
      lines.push(`  await expect(page.locator('${escapeText(selector)}')).toBeVisible();`);
    }
  }

  lines.push('});', '');
  return lines.join('\n');
}

export default app;
