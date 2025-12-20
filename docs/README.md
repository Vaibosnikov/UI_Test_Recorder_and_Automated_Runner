# TestCraft – UI Test Recorder & Automated Runner

> **TestCraft** is an open-source, browser-based UI automation framework that enables users to record browser interactions, convert them into runnable **Playwright tests**, execute them locally or in CI pipelines, and analyze results through a **dashboard and Playwright HTML reports**.

---

## Project Structure

```text
UI_Test_Recorder_and_Automated_Runner/
├── runner/
│   ├── api/                # Backend API & Playwright runner
│   ├── web/                # Dashboard frontend (React + Vite)
│   └── recorder/           # Chrome extension (recorder UI & content scripts)
├── .github/
│   └── workflows/
│       └── playwright.yml  # Reusable CI template for Playwright
├── package.json            # Root orchestration & one-click startup
```

---

## Overview

TestCraft bridges the gap between **manual testing** and **automation** by offering a **record → export → generate → run → visualize** workflow for browser-based UI testing.

The system is designed to help:
- QA engineers
- Non-engineers and testers with limited automation experience
- Developers who want rapid Playwright test generation

While recording requires no coding, the generated output remains **clean, industry-standard Playwright test suites** that are fully portable.

---

## Key Features

- 🎥 **Browser Recorder**  
  Capture clicks, text input, and navigation directly from the browser.

- 📦 **JSON Export (Portable Recording)**  
  Export recorded flows as structured JSON for reuse, inspection, or regeneration.

- 🧩 **Script Generation**  
  Convert recordings or exported JSON into Playwright `.spec.ts` files with assertions.

- ⚡ **Automated Test Runner**  
  Execute generated tests locally or headlessly via Playwright.

- 📊 **Dashboard Interface**  
  View test runs, execution status, and historical trends.

- 📄 **Playwright HTML Reports**  
  Access detailed execution artifacts including logs, screenshots, and videos.

- 🛠️ **CI/CD Integration**  
  Plug generated tests into GitHub Actions or other CI systems.

- 🚀 **One-Command Startup**  
  Start backend and dashboard together using a single npm command.

---

## Design Decisions & Objective Alignment

TestCraft was built with explicit alignment to the original project objectives, focusing on reducing automation friction for non-engineers while preserving industry best practices.

### CI Template with Demonstrated Usage
A reusable GitHub Actions CI workflow is provided and is also used internally within TestCraft.  
This validates the template in real execution scenarios and demonstrates correct usage rather than offering a theoretical configuration.

### Simplified Startup for Non-Engineers
Running frontend and backend in separate terminals is standard industry practice.  
To reduce onboarding friction for non-engineers, TestCraft introduces a **one-command startup** that orchestrates all required services without hiding underlying architecture.

### Portable Test Output
Generated Playwright tests are:
- integrated into the TestCraft runner
- easily accessible for download and reuse in external repositories

The tests belong to the user and are not locked to TestCraft.

### Reporting Philosophy
Playwright HTML reports remain the authoritative execution artifact.  
The dashboard complements these reports by offering high-level insights and trends across test runs.

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd UI_Test_Recorder_and_Automated_Runner
```

### 2. Install dependencies

```bash
npm install

cd runner/api
npm install

cd ../web
npm install
```

---

## One-Command Startup

From the project root:

```bash
npm run testcraft:start
```

This command:
- starts the backend API (`http://localhost:5000`)
- starts the dashboard frontend (`http://localhost:5173`)
- streams logs together
- stops cleanly with `Ctrl + C`

Browser extensions cannot spawn OS processes; orchestration is intentionally handled via npm scripts.

---

## Loading the Recorder Extension

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select:

```text
runner/recorder
```

5. Pin the TestCraft Recorder extension

---

## How to Use TestCraft

### Step 1: Record a Flow
- Open the target web application
- Click the TestCraft extension
- Click **Start Recording**
- Perform user actions
- Click **Stop Recording**

### Step 2: Convert to JSON (Portable Recording)
- Click **Convert to JSON**
- A structured JSON file is created that:
  - is stored inside the TestCraft repository
  - is automatically downloaded to the user’s local Downloads folder

This JSON represents the recorded intent and can be reused or regenerated later.

### Step 3: Convert to Test
- Click **Convert to Test**
- A Playwright `.spec.ts` file is generated from the recording or JSON
- The test is stored in the runner for execution

### Step 4: Run Tests
- Click **Run Test**
- Tests execute headlessly via Playwright

### Step 5: View Execution Results
- Click **Open Playwright Report**
- View pass/fail status, logs, screenshots, and videos

### Step 6: View Dashboard
- Click **Open Dashboard**
- Review test execution history and trends

---

## CI/CD Integration

## Tailoring the CI Pipeline for Your Own Repository

TestCraft provides a reusable **Playwright GitHub Actions workflow**.  
This workflow is intentionally minimal and standards-based so it can be adapted to **any Playwright project**.

Follow the steps below to tailor it to your repository.

---

### Step 1: Copy the CI Workflow

Copy the workflow file from TestCraft:

```text
.github/workflows/playwright.yml
```

Paste it into your own repository at the same path:

```text
.your-repo/
└── .github/
    └── workflows/
        └── playwright.yml
```

GitHub Actions automatically detects workflows placed in this directory.

---

### Step 2: Configure Node.js Version

Update the Node.js version to match your project environment:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 18
```

**Guidelines:**
- Use **Node.js 18+** for Playwright compatibility
- Match the version used locally to avoid environment drift

---

### Step 3: Install Dependencies

Choose the install command based on your dependency setup.

**Recommended (lockfile present):**
```yaml
- run: npm ci
```

**Alternative (no lockfile):**
```yaml
- run: npm install
```

`npm ci` ensures faster and deterministic installs in CI environments.

---

### Step 4: Install Playwright Browsers

Playwright requires browser binaries to be installed explicitly:

```yaml
- run: npx playwright install --with-deps
```

This installs Chromium (and other browsers if enabled).

---

### Step 5: Configure Test Location

By default, Playwright runs all detected tests:

```yaml
- run: npx playwright test
```

If your generated tests live in a custom directory, specify the path:

```yaml
- run: npx playwright test tests/
```

or

```yaml
- run: npx playwright test playwright/tests/
```

Use the directory where TestCraft-generated `.spec.ts` files are copied.

---

### Step 6: Configure Application Under Test (Base URL)

If tests depend on a deployed or running application, configure the base URL.

**Option A: Environment variable**
```yaml
- run: npx playwright test
  env:
    BASE_URL: https://staging.example.com
```

**Option B: Playwright config**
```ts
use: {
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
}
```

This allows the same tests to run locally and in CI.

---

### Step 7: Upload Playwright HTML Report (Optional)

To retain execution artifacts, upload the Playwright HTML report:

```yaml
- uses: actions/upload-artifact@v4
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
```

This enables post-run debugging and failure analysis.

---

### Step 8: Configure Workflow Triggers

Control when the CI pipeline runs:

```yaml
on:
  push:
    branches: [ main ]
  pull_request:
```

Common strategies:
- Run tests on every pull request
- Restrict full test runs to the main branch

---

### Summary

By updating:
- Node version
- Install command
- Test location
- Base URL
- Report handling

TestCraft-generated tests can run seamlessly in **any Playwright-enabled repository**.

---

## Intended Audience

TestCraft is designed for:
- QA engineers and testers
- Non-engineers seeking low-friction UI automation
- Developers who want fast Playwright test generation

TestCraft is not intended to replace:
- Enterprise test management platforms
- Large-scale browser grid farms
- AI-based selector healing systems

---

## Team & Responsibilities

| Name | Role | Primary Responsibilities |
|-----|-----|--------------------------|
| Vaibhav Sharma | Full Stack Developer | System architecture, backend APIs, runner integration |
| Dakshita Singh | Frontend Engineer | Dashboard UI, charts, React & TailwindCSS |
| Vaishnavi Tiwari | Automation Engineer | Recorder logic, Playwright script generation |
| Saiyada Anshra Afzal | DevOps Engineer | CI/CD pipelines, environment orchestration, one-command startup |

---
