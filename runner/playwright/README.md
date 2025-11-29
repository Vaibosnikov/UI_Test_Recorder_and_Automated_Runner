# Playwright Runner (TestCraft)

Location: runner/playwright

## Quickstart
1. Install dependencies
```
- cd runner/plawright
- npm install
- npx playwright install
```

2. Set env vars (optional)
- API_BASE_URL (default http://localhost:5000)
- UI_BASE_URL (default http://localhost:5173)

3. Run the full suite
```
- npm run tests:suite
```
OR
```
- npm run run:suite
```

4. Run a single generated test
```
npm run test:single – –name login_flow.spec.ts
```

5. Collect artifacts and upload (optional)
```
npm run run:collect
npm run run:upload  # requires backend upload endpoint

```

## Files
- config/playwright.config.ts: Playwright configuration
- tests/: hand written smoke/spec files
- generated/: auto-generated specs from script-generator
- results/: Playwright output and artifacts
- scripts/: runner helper scripts
- integration/: functions to interact with backend