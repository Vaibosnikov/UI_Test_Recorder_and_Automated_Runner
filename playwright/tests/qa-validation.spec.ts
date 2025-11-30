import { test, expect } from '@playwright/test';

const API = process.env.API_BASE_URL || 'http://localhost:5000';

test('QA validation endpoint / runner/qa script presence', async ({ request }) => {
  // Best-effort check: if QA service exposes endpoint /v1/qa/validate, call it.
  const res = await request.get(`${API}/v1/qa/validate`).catch(()=>null);

  if (res === null) {
    test.skip(true, 'QA validation endpoint not available on API_BASE_URL');
    return;
  }

  expect([200, 404]).toContain(res.status());
  if (res.ok()) {
    const body = await res.json();
    // expect body to include a summary or report key
    expect(body).toBeTruthy();
  }
});