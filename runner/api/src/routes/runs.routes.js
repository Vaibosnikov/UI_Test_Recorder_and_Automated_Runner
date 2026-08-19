import express from 'express';

const router = express.Router();

let runsStore = [];

// POST /v1/runs - accept test run results from Playwright runner
router.post('/', (req, res) => {
  const body = req.body || {};

  // Accept both minimal envelope and full Playwright report
  const testId = body.test_id || 'playwright-smoke';
  const status = body.status || (body.rawResults?.stats?.unexpected === 0 ? 'passed' : 'failed');

  const runRecord = {
    test_id: testId,
    status,
    total: body.total,
    passed: body.passed,
    failed: body.failed,
    duration_ms: body.duration_ms,
    timestamp: body.timestamp || new Date().toISOString(),
    raw: body,
  };

  runsStore.push(runRecord);
  res.json({ ok: true, id: runsStore.length - 1, test_id: testId, status });
});

// GET /v1/runs - return stored runs
router.get('/', (req, res) => {
  res.json(runsStore);
});

// POST /v1/generate-script - convert recorded events to Playwright code
router.post('/generate-script', (req, res) => {
  const { events = [] } = req.body;

  const lines = [
    "import { test, expect } from '@playwright/test';",
    '',
    "test('Extension recording', async ({ page }) => {",
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

  res.type('text/plain').send(lines.join('\n'));
});

export function registerRunsRoutes(app) {
  app.use('/v1/runs', router);
}
