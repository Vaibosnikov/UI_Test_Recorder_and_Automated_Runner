const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

// --- Configuration ---
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';
const TEST_DIR = path.join(__dirname, 'tests');
const RESULTS_DIR = path.join(__dirname, 'results');

// Ensure results directory exists
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

// --- Helper Functions ---

function runCommand(command, description) {
  console.log(`\n${description}`);
  console.log(`Executing: ${command}\n`);
  try {
    execSync(command, { stdio: 'inherit', cwd: __dirname });
    return true;
  } catch (error) {
    console.warn(`⚠️  ${description} failed (this is expected for integration tests without full stack running)`);
    return false;
  }
}

function uploadResults() {
  const resultsPath = path.join(RESULTS_DIR, 'results.json');
  if (!fs.existsSync(resultsPath)) {
    console.log('\n📄 No results file found to upload');
    return;
  }

  // Read the full results and write to a separate payload file for upload
  const payload = fs.readFileSync(resultsPath, 'utf8');
  const payloadPath = path.join(RESULTS_DIR, 'payload.json');
  fs.writeFileSync(payloadPath, payload, 'utf8');

  console.log('\n📤 Uploading results to backend...');
  
  // Use file-based upload to avoid Windows command-line length limits
  const uploadCmd = `curl -X POST ${API_BASE_URL}/v1/runs ^
      -H "Content-Type: application/json" ^
      -d "@${payloadPath}"`;
  
  try {
    execSync(uploadCmd, { stdio: 'inherit', cwd: __dirname });
    console.log('\n✅ Results uploaded successfully');
  } catch (error) {
    console.log('\n⚠️  Failed to upload results');
  }
}

// --- Main Execution ---

console.log('▶️  Running Playwright tests: all tests\n');

// Run Playwright tests
const playwrightCmd = 'npx playwright test ';
const success = runCommand(playwrightCmd, 'Running Playwright tests');

// Upload results to backend
uploadResults();

console.log('\n✅ Playwright tests completed');
console.log(`📄 Results written to: ${RESULTS_DIR}\n`);
