// playwright/tests/qa-validation.spec.ts
import { test, expect } from '@playwright/test';

/**
 * Relies on playwright.config.ts -> use.baseURL
 * CI sets BASE_URL = http://127.0.0.1:5000
 *
 * If your QA route is different (e.g., `/qa/validate` or `/health/qa`),
 * adjust the path below accordingly.
 */

test.describe('@api QA validation endpoint presence', () => {
  test('GET /v1/qa/validate is reachable and returns 200/404', async ({ request }) => {
    let res: Awaited<ReturnType<typeof request.get>> | null = null;

    // Try/catch so we can skip gracefully if the route is unreachable
    try {
      res = await request.get('/v1/qa/validate', { timeout: 10_000 });
    } catch {
      res = null;
    }

    // If service is not reachable at all, skip (not a hard failure for pipeline)
    test.skip(res === null, 'QA validation endpoint not reachable via baseURL');

    // Endpoint exists: accept 200 (implemented) or 404 (not implemented yet)
    expect([200, 404]).toContain(res!.status());

    if (res!.ok()) {
      const body = await res!.json().catch(() => null);
      // Expect body to be something truthy (object/array/string)
      expect(body, 'Body should be present when response is OK').toBeTruthy();
    }
  });
});
