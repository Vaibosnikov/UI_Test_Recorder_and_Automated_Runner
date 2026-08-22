import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/v1/health', (req, res) => res.json({ status: 'ok' }));
app.get('/v1/runs', (req, res) => res.json({ status: 'ok', runs: [] }));
app.post('/v1/runs', (req, res) => {
  const { events } = req.body || {};
  if (!Array.isArray(events)) return res.status(400).json({ error: 'events must be an array' });
  return res.status(201).json({ status: 'accepted', eventCount: events.length });
});

app.post('/v1/generate-script', (req, res) => {
  const { events } = req.body || {};
  if (!Array.isArray(events) || events.length === 0) return res.status(400).json({ error: 'At least one recorded event is required' });
  return res.json({ script: generatePlaywrightTest(events) });
});

app.post('/generate', (req, res) => {
  const { actions } = req.body || {};
  if (!Array.isArray(actions) || actions.length === 0) return res.status(400).json({ error: 'At least one recorded action is required' });
  return res.json({ script: generatePlaywrightTest(actions) });
});

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

function escapeText(value = '') {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n');
}

function selectorFor(event) {
  return event?.selector || event?.target?.selector || event?.cssSelector || event?.element?.selector || '';
}

function locatorExpression(selector) {
  const roleMatch = /^role=([^\[]+)\[name="([\s\S]*)"\]$/.exec(selector);
  if (roleMatch) return `page.getByRole('${escapeText(roleMatch[1])}', { name: '${escapeText(roleMatch[2])}' })`;
  return selector ? `page.locator('${escapeText(selector)}')` : '';
}

function generatePlaywrightTest(events) {
  const lines = ["import { test, expect } from '@playwright/test';", '', "test('Recorded test', async ({ page }) => {"];
  const firstUrl = events.find((event) => event?.type === 'navigate' && event?.url)?.url;
  if (firstUrl) lines.push(`  await page.goto('${escapeText(firstUrl)}');`);

  for (const event of events) {
    if (!event || typeof event !== 'object') continue;
    const type = event.type || event.action;
    const selector = selectorFor(event);
    const locator = locatorExpression(selector);

    if (type === 'navigate' && event.url && event.url !== firstUrl) {
      lines.push(`  await page.goto('${escapeText(event.url)}');`);
    } else if ((type === 'click' || type === 'pointerdown') && locator) {
      lines.push(`  await ${locator}.click();`);
    } else if ((type === 'input' || type === 'fill' || type === 'change') && locator) {
      if (event.masked) {
        lines.push(`  // Sensitive value redacted for '${escapeText(selector)}'`);
        lines.push(`  await ${locator}.fill(process.env.TEST_SECRET_VALUE || '');`);
      } else {
        lines.push(`  await ${locator}.fill('${escapeText(event.value ?? event.target?.value ?? '')}');`);
      }
    } else if ((type === 'assert' || type === 'visible') && locator) {
      lines.push(`  await expect(${locator}).toBeVisible();`);
    } else {
      lines.push(`  // Skipped unsupported recorded event: ${escapeText(String(type || 'unknown'))}`);
    }
  }

  lines.push('});', '');
  return lines.join('\n');
}

export default app;
