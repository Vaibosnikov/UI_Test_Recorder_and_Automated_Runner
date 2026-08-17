#!/usr/bin/env node

/**
 * TestCraft Playwright Runner
 * Executes Playwright tests and uploads results to backend API
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const RESULTS_DIR = path.join(__dirname, 'results');

// Ensure results directory exists
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

console.log('🚀 TestCraft Playwright Runner');
console.log('================================');
console.log(`API Base URL: ${API_BASE_URL}`);
console.log(`Results Directory: ${RESULTS_DIR}`);
console.log('');

// Determine which tests to run
const testFile = process.argv[2];
const testArgs = testFile ? `tests/${testFile}` : 'tests/';

try {
  console.log(`▶️  Running Playwright tests: ${testArgs}`);
  console.log('');
  
  // Run Playwright tests with JSON reporter
  const playwrightCmd = `npx playwright test ${testArgs} --reporter=json --output=${RESULTS_DIR}`;
  execSync(playwrightCmd, {
    cwd: __dirname,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'test' }
  });
  
  console.log('');
  console.log('✅ Playwright tests completed');
  
  // Check if results file exists
  const resultsFile = path.join(RESULTS_DIR, 'results.json');
  if (fs.existsSync(resultsFile)) {
    console.log(`📄 Results written to: ${resultsFile}`);
    
    // Upload results to backend
    uploadResults(resultsFile);
  } else {
    console.log('⚠️  No results file generated');
  }
  
} catch (error) {
  console.error('❌ Test execution failed');
  console.error(error.message);
  process.exit(1);
}

/**
 * Upload test results to backend API
 * @param {string} resultsFile - Path to JSON results file
 */
function uploadResults(resultsFile) {
  console.log('');
  console.log('📤 Uploading results to backend...');
  
  try {
    const resultsData = fs.readFileSync(resultsFile, 'utf8');
    const results = JSON.parse(resultsData);
    
    // Format results for backend
    const payload = {
      runId: `run_${Date.now()}`,
      timestamp: new Date().toISOString(),
      testDir: 'playwright/tests',
      totalTests: results.tests?.length || 0,
      passed: results.tests?.filter(t => t.status === 'passed').length || 0,
      failed: results.tests?.filter(t => t.status === 'failed').length || 0,
      skipped: results.tests?.filter(t => t.status === 'skipped').length || 0,
      duration: results.duration || 0,
      results: results.tests || [],
      rawResults: results
    };
    
    // POST to backend
    const uploadCmd = `curl -X POST ${API_BASE_URL}/v1/runs \\
      -H "Content-Type: application/json" \\
      -d '${JSON.stringify(payload)}'`;
    
    console.log(`Executing: ${uploadCmd}`);
    const response = execSync(uploadCmd, { encoding: 'utf8' });
    console.log('✅ Results uploaded successfully');
    console.log(response);
    
  } catch (error) {
    console.error('⚠️  Failed to upload results');
    console.error(error.message);
  }
}
