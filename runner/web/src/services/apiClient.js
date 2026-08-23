const RAW_API_URL = import.meta.env.VITE_API_URL;
export const API_BASE_URL = (RAW_API_URL && RAW_API_URL.trim().length > 0)
  ? RAW_API_URL.trim().replace(/\/+$/, '')
  : 'http://localhost:5000';

async function fetchJSON(path) {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url);
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`API error ${response.status} for ${url}: ${text}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON from ${url}: ${text}`);
  }
}

export const apiClient = {
  getHealth() {
    return fetchJSON('/v1/health');
  },
  getRuns() {
    return fetchJSON('/v1/runs');
  },
};
