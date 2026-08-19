# TestCraft Recorder (Chrome Extension)

Chrome extension that records user interactions and generates Playwright tests.

## Load the Extension (Development)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `recorder/` directory from this repo

The TestCraft icon should appear in your extensions toolbar.

## Record and Run Tests (E2E)

### 1. Start the Backend API

```bash
cd runner/api
npm install
npm run dev
```

The API runs on **http://localhost:5000**.

### 2. Open the Extension Popup

1. Navigate to any web page you want to test
2. Click the TestCraft extension icon
3. Click **Start Recording**
4. Perform actions (click, type, navigate)
5. Click **Stop Recording**

### 3. Generate a Playwright Script

1. In the popup, click **Generate Script**
2. A `.spec.ts` file will download
3. Save it into `runner/playwright/tests/` (e.g. `recorded-extension.spec.ts`)

### 4. Run the Test

Ensure the API and dashboard are running, then:

```bash
cd C:\Users\v-sharmavaib\UI_Test_Recorder_and_Automated_Runner
node runner/playwright/run-tests.js
```

Your recorded test will run as part of the suite.

## Configuration

The extension uses `recorder/src/config.js` to configure the backend URL:

```js
export const API_BASE_URL = 'http://localhost:5000';
```

Change this if your API runs on a different host/port.

## Troubleshooting

- **Generate Script fails**: Ensure the API is running and reachable at `http://localhost:5000/v1/generate-script`.
- **Run Tests fails**: Check that both API and dashboard are up, and the extension's `API_BASE_URL` matches.
- **Events not showing**: Reload the extension and the target page, then try recording again.
