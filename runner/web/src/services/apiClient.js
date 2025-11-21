// For dashboard-ui we use mock data; apiClient will attempt backend fallbacks in future integration.
const DEFAULT_BASE_URL = "http://localhost:5000";

export async function fetchRuns() {
  // Dashboard-UI branch uses local mock file import at component-level.
  // This function kept for future use (dashboard-integration).
  const res = await fetch(`${DEFAULT_BASE_URL}/v1/runs`).catch(() => null);
  if (res && res.ok) {
    return res.json();
  }
  return null;
}
