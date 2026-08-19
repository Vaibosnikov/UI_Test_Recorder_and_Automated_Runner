# TestCraft

> Record once, run anywhere — AI-powered test automation for modern web apps.

## Overview

TestCraft is a Chrome extension that records user interactions and generates Playwright scripts that run across browsers and CI environments.

## Core Components

| Component | Description |
| --- | --- |
| **Chrome Extension** | Records user actions and exports them as structured test data |
| **Dashboard** | Visualizes test runs, pass/fail trends, and performance metrics |
| **Backend API** | Stores test runs and provides endpoints for the dashboard and recorder |
| **Playwright Runner** | Executes generated scripts and reports results back to the API |

## Extension (E2E)

### Quick Start

1. **Load the extension**
   - Open `chrome://extensions/`, enable Developer mode, click **Load unpacked**
   - Select the `recorder/` directory

2. **Start the backend**
   ```bash
   cd runner/api
   npm install
   npm run dev
   ```

3. **Record actions**
   - Open any web page
   - Click the TestCraft icon, then **Start Recording**
   - Perform actions, then **Stop Recording**

4. **Generate and run a test**
   - Click **Generate Script**, save the `.spec.ts` into `runner/playwright/tests/`
   - Start the dashboard: `cd runner/web && npm run dev`
   - Run tests: `node runner/playwright/run-tests.js`

See `recorder/README.md` for detailed instructions and troubleshooting.

## Local Development

### Prerequisites

- Node.js 20+
- npm
- A Chromium-based browser (for the Chrome extension)

### Start the Backend API

```bash
cd runner/api
npm install
npm run dev
```

The API runs on **http://localhost:5000**.

### Start the Dashboard

```bash
cd runner/web
npm install
npm run dev
```

The dashboard runs on **http://localhost:5173**.

### Run Playwright Tests

Ensure both the API and dashboard are running, then:

```bash
cd C:\Users\v-sharmavaib\UI_Test_Recorder_and_Automated_Runner
node runner/playwright/run-tests.js
```

Expected output: **15 passed** with results uploaded to the API.

### Troubleshooting

- **API port conflict**: Ensure nothing else is using port 5000, or set `PORT=5001` and update `API_BASE_URL` accordingly.
- **Dashboard not loading**: Confirm the API is running and reachable at `http://localhost:5000/v1/runs`.
- **Test failures**: Check that both API and dashboard are up before running tests.

## CI

TestCraft includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

- Installs dependencies for API, web, and Playwright
- Starts API and web servers
- Runs the Playwright test suite
- Uploads results as an artifact

## License

MIT
