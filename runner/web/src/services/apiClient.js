// Centralized API client for the dashboard

const DEFAULT_BASE_URL = "http://localhost:5000";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_BASE_URL;

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `API error ${response.status}: ${text || response.statusText}`
    );
  }
  return response.json();
}

export async function fetchTests() {
  const res = await fetch(`${API_BASE_URL}/v1/tests`);
  return handleResponse(res);
}

export async function fetchRuns() {
  const res = await fetch(`${API_BASE_URL}/v1/runs`);
  return handleResponse(res);
}
