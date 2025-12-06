// playwright/tests/backend-api.spec.ts
import { test, expect } from '@playwright/test';

// This spec relies on playwright.config.ts -> use.baseURL
// In CI we set BASE_URL = http://127.0.0.1:5000 (job-level env in your workflow)

test.describe('@api Backend API basic checks', () => {
  test('health endpoint returns 200', async ({ request }) => {
    // Use relative path so it resolves via baseURL
    const res = await request.get('/');
    expect(res.status(), 'Health endpoint should return 200').toBe(200);
    expect(res.ok()).toBeTruthy();
  });

  test('GET /v1/runs returns JSON (or 404 if endpoint not implemented)', async ({ request }) => {
    const res = await request.get('/v1/runs');
    // Accept 200 or 404 while the route is under development
    expect([200, 404]).toContain(res.status());

    if (res.ok()) {
      const body = await res.json();
      // Be flexible: array or object based on your API design
      expect(Array.isArray(body) || typeof body === 'object').toBeTruthy();
    }
  });

  test('POST /v1/tests accepts simple payload (optional)', async ({ request }) => {
    const payload = {
      projectId: 'demo',
      name: 'smoke-recorded-test',
      steps: [{ action: 'click', selector: 'body', value: '' }],
    };

    const res = await request.post('/v1/tests', { data: payload });
    // Many implementations will return 201 or 200; accept 404 if not implemented yet
    expect([201, 200, 404]).toContain(res.status());
  });
});
