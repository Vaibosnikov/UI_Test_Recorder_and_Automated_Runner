const express = require('express');
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

module.exports = router;
