## 📌 Overview

The Playwright Integration module is the execution engine for TestCraft.
It is responsible for:
- Running Playwright tests (both generated and manual)
- Managing execution configuration
- Collecting artifacts (screenshots, traces, HTML reports)
- Uploading results to the backend API
Providing helper scripts for CI/CD automation
This module completes the Recorder → Script Generator → Runner workflow of TestCraft.

---

## 📁 Directory Structure
```
runner/playwright/
│
├── config/
│   └── playwright.config.ts        # Playwright configuration
│
├── scripts/
│   ├── run-suite.js                # Runs full test suite
│   ├── run-single-test.js          # Runs a single spec file
│   ├── collect-artifacts.js        # Collects reports & artifacts
│   ├── upload-results.js           # Uploads summary to backend
│   └── runner-utils.js             # Shared helpers
│
├── tests/
│   └── example-smoke.spec.ts       # Smoke test to validate UI availability
│
├── generated/
│   └── login_flow.spec.ts          # Sample generated test (placeholder)
│
├── integration/
│   ├── api-client.js               # API wrapper for posting data to backend
│   ├── test-fetcher.js             # Fetches tests from backend
│   ├── post-results.js             # Sends run summary metadata
│   └── health-check.js             # Ensures UI/API readiness
│
├── results/                        # Playwright output directory (created at runtime)
│
└── package.json
```

---

### 🚀 Getting Started
1. Install Dependencies
```
cd runner/playwright
npm install
npx playwright install
```

This installs:
- Playwright runner
- Chromium browser
- Dependencies such as axios, form-data

---

### 🌍 Environment Variables
These are optional. Defaults will be used if you don’t provide values.
| Variable       | Default                 | Purpose                     |
| -------------- | ----------------------- | --------------------------- |
| `API_BASE_URL` | `http://localhost:5000` | Backend API endpoint        |
| `UI_BASE_URL`  | `http://localhost:5173` | Dashboard UI endpoint       |
| `REPO_ROOT`    | current directory       | Used for locating artifacts |

Set env vars in PowerShell:
```powershell
$env:API_BASE_URL="http://localhost:5000"
$env:UI_BASE_URL="http://localhost:5173"
```

---

### 🧪 Running Tests
#### A. Run Full Test Suite
```
npm run test:suite
```
This will:
- Fetch all tests from backend
- Execute them with Playwright
- Collect artifacts
- Upload results to backend

#### B. Run Single Test
```
npm run test:single -- --name login_flow.spec.ts
```
The test must exist in `runner/playwright/generated/` directory.
or
`runner/playwright/tests/` for manual tests.

#### C. Run via wrapper script
```
npm run run:suite
```
equivalent to full test execution but wrapped in a node process to match CI needs.

---

### 📦 Test Artifacts

After execution, artifacts appear under:

```
runner/playwright/results/
```
Contents include:
- HTML Reports
- Screenshots
- Traces
- Summary JSON files

---

### 🗂 Collecting Artifacts
```
npm run run:collect
```
Generates
`runner/playwright/results/summary.json`

contains
- Timestamps
- List of reports/artifacts generated
---
### 📤 Uploading Results to Backend
```
npm run run:upload
```
uploads summary to:
`POST /v1/runs/upload-summary`
(Modify endpoint based on actual backend implementation)

Backend stores:
- Run metadata
- Artifact info
- Execution time

---

### 🔗 Integration Functions

Located inside `/integration`:
`api-client.js`
Handles:
Posting run summaries
Uploading artifact files

`test-fetcher.js`
(Optional)
Fetches available tests from backend for dynamic execution.

`post-results.js`
Helper for sending summary JSON to backend.

`health-check.js`

Waits for:

- Backend API → health OK
- Dashboard UI → reachable

Used inside CI before running tests.

---

### 📝 Notes for CI/CD
- The CI workflow should:
  1. Build and serve the dashboard UI
  2. Start the backend API
  3. Install PlayWright Binaries
  4. Execute
        ```
        npm run run:suite
        ```
  5. Upload artifacts as GitHub Actions artifacts
This module is fully compatible with GitHub Actions

---

### 🎯 Purpose Summary
The Playwright Integration module completes the TestCraft pipeline:
- Recorder → captures user interactions
- Script Generator → converts actions into Playwright .spec.ts
- Playwright Runner → executes tests and reports results

This module ensures your entire system is testable, automated, and CI-ready.
---