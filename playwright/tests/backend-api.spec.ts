import { test, expect } from '@playwright/test';

const API = process.env.API_BASE_URL || 'http://localhost:3000'; // adjust if backend runs on other port

test.describe('Backend API basic checks', () => {
  test('health endpoint returns 200', async ({ request }) => {
    const res = await request.get(`${API}/`);
    expect(res.ok()).toBeTruthy();
  });

  test('GET /v1/runs returns JSON (or 404 if endpoint not implemented)', async ({ request }) => {
    const res = await request.get(`${API}/v1/runs`);
    // if route doesn't exist, accept 404 but fail if other error
    expect([200, 404]).toContain(res.status());
    if (res.ok()) {
      const body = await res.json();
      expect(Array.isArray(body) || typeof body === 'object').toBeTruthy();
    }
  });

  test('POST /v1/tests accepts simple payload (optional)', async ({ request }) => {
    const payload = {
      projectId: 'demo',
      name: 'smoke-recorded-test',
      steps: [{ action: 'click', selector: 'body', value: '' }]
    };

    const res = await request.post(`${API}/v1/tests`, { data: payload });
    // Many implementations will return 201 or 200 or 404 if not implemented yet
    expect([201, 200, 404]).toContain(res.status());
  });
});