# TestCraft Playwright Runner

Minimal Playwright test runner that executes tests and reports results to the TestCraft backend API.

## Prerequisites

- Node.js 18+
- Playwright browsers installed: `npx playwright install --with-deps`

## Installation

```bash
cd runner/playwright
npm install
```

## Configuration

Create a `.env` file (or set environment variables):

```bash
API_BASE_URL=http://localhost:5000
BASE_URL=http://localhost:5173
```

**Default ports:**
- Backend API: `http://localhost:5000`
- Frontend Dashboard: `http://localhost:5173`

## Usage

### Run all tests

```bash
node run-tests.js
```

### Run a specific test file

```bash
node run-tests.js recorded.spec.ts
```

### Run with headed browser (for debugging)

```bash
npm run test:headed
```

### Custom API endpoint

```bash
$env:API_BASE_URL="http://localhost:3000"  # PowerShell
node run-tests.js
```

## Output

The runner will:
1. Execute Playwright tests
2. Generate a JSON report
3. POST results to `POST /v1/runs` on the backend API
4. Print a summary to the console

## File Structure

```
runner/playwright/
├── package.json
├── playwright.config.ts      # Playwright configuration
├── run-tests.js              # Main runner script
├── setup.bat                 # Windows setup script
├── setup.sh                  # Unix/Mac setup script
├── tests/                    # Test files (copied from root playwright/tests/)
└── results/                  # Generated test results (gitignored)
```

## Troubleshooting

### Tests fail with "Cannot find module '@playwright/test'"

Make sure you installed dependencies:
```bash
npm install
```

### Upload fails with connection refused

Make sure the backend API is running:
```bash
cd runner/api
npm run dev
```

Default API URL is `http://localhost:5000`. Change with `API_BASE_URL` env var.
