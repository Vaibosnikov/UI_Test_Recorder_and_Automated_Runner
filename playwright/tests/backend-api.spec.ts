// playwright/tests/backend-api.spec.ts
import { test, expect } from '@playwright/test';

test.describe('@api Backend API basic checks', () => {
  test('health endpoint returns 200 and ok JSON', async ({ request }) => {
    const res = await request.get('/health');
    expect(res.status(), 'Health endpoint should return 200').toBe(200);

    const body = await res.json();
    // Optional: tighten this once stable
    expect(body).toMatchObject({ status: 'ok' });
    expect(typeof body.timestamp).toBe('string');
  });

  test('GET /v1/runs returns JSON (or 404 if endpoint not implemented)', async ({ request }) => {
    const res = await request.get('/v1/runs');
    expect([200, 404]).toContain(res.status());
    if (res.ok()) {
      const data = await res.json();
      expect(Array.isArray(data) || typeof data === 'object').toBeTruthy();
    }
  });

  test('POST /v1/tests accepts simple payload (optional)', async ({ request }) => {
    const payload = {
      projectId: 'demo',
      name: 'smoke-recorded-test',
      steps: [{ action: 'click', selector: 'body', value: '' }],
    };

    const res = await request.post('/v1/tests', { data: payload });
    expect([201, 200, 404]).toContain(res.status());
  });
});
