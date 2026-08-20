# TestCraft - Setup Guide

## Prerequisites

- Node.js 20+ installed
- Chrome browser (for extension testing)
- Git for cloning the repository

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Vaibosnikov/UI_Test_Recorder_and_Automated_Runner.git
cd UI_Test_Recorder_and_Automated_Runner
```

### 2. Install and Start Backend Services

#### API Server
```bash
cd runner/api
npm install
npm run dev
```
The API runs on `http://localhost:5000`.

#### Web Dashboard
```bash
cd runner/web
npm install
npm run dev
```
The dashboard runs on `http://localhost:5173`.

### 3. Install the Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `recorder/` folder from the repository
5. The TestCraft icon should appear in your extensions toolbar

### 4. Verify Installation

1. **API**: Visit `http://localhost:5000/v1/health` - should return `{"status":"ok"}`
2. **Dashboard**: Visit `http://localhost:5173` - should show the TestCraft UI
3. **Extension**: Click the TestCraft icon - should show "API connected ✓" in green

## Using TestCraft

### Recording a Test

1. Navigate to the website you want to test
2. Click the TestCraft extension icon
3. Click **Start Recording** (you'll see a "Recording…" badge in the header)
4. Perform your test actions (clicks, inputs, navigation)
5. Click **Stop Recording**
6. Click **Generate Script** to download a Playwright test file

### Running Tests

#### Option 1: Via Dashboard
1. Open the dashboard at `http://localhost:5173`
2. Your recorded runs should appear automatically
3. Click **Run** to execute tests

#### Option 2: Via CLI
```bash
cd runner/playwright
npm install
npx playwright test
```

## CI/CD Workflow

The project uses GitHub Actions for continuous integration:

- **Workflow file**: `.github/workflows/ci.yml`
- **Triggers**: Push to `main` or `dev`, pull requests
- **Steps**:
  1. Checkout code
  2. Setup Node 20
  3. Install dependencies (API, Web, Playwright)
  4. Start API and Web servers
  5. Run Playwright tests
  6. Upload test results as artifacts

**Note**: The workflow uses `npm install` (not `npm ci`) to avoid lockfile version issues.

## Troubleshooting

### Extension Not Loading
- Ensure you selected the `recorder/` folder (not its contents)
- Check `chrome://extensions/` for error messages
- Reload the extension if needed

### API Connection Issues
- Verify the API server is running on port 5000
- Check browser console for CORS errors
- The extension popup shows API status in real-time

### Dashboard Not Showing Runs
- Ensure API server is running first
- Check browser console for API errors
- The dashboard polls `/v1/runs` every 5 seconds

## Next Steps

- Review the [Architecture](architecture.md) for system design
- Check the [API Reference](api-reference.md) for endpoint details
- Start recording your first test!
