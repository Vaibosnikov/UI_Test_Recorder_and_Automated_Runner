# validate-runner.ps1
# Runs the complete local validation sequence for the Playwright runner.
# Usage: powershell -ExecutionPolicy Bypass -File .\validate-runner.ps1

param(
  [string] = 'http://localhost:3000',
  [string] = 'http://localhost:3000'
)

Write-Host "=== Validation started ==="

# set envs for this process
 = 
 = 

Write-Host "=== Health check ==="
node integration/health-check.js

Write-Host "=== Fetch tests (if any) ==="
try {
  node integration/test-fetcher.js
} catch {
  Write-Warning "test-fetcher failed (continuing): "
}

Write-Host "=== Install Playwright browsers ==="
npx playwright install --with-deps

Write-Host "=== Run full test suite ==="
node scripts/run-suite.js

Write-Host "=== Collect artifacts ==="
node scripts/collect-artifacts.js

Write-Host "=== Upload results (may fail) ==="
try {
  node integration/upload-results.js
} catch {
  Write-Warning "upload failed (this might be expected if backend rejects): "
}

Write-Host "=== Validation complete ==="
