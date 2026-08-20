const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} - ${error}`);
  }
  return response.json();
}

export const apiClient = {
  async getRuns() {
    return fetchJSON(`${API_BASE_URL}/v1/runs`);
  },
  async createRun(runData) {
    return fetchJSON(`${API_BASE_URL}/v1/runs`, {
      method: 'POST',
      body: JSON.stringify(runData),
    });
  },
  async generateScript(events) {
    const response = await fetch(`${API_BASE_URL}/v1/generate-script`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events }),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Script generation failed: ${response.status} - ${error}`);
    }
    return response.text();
  },
  async getHealth() {
    return fetchJSON(`${API_BASE_URL}/v1/health`);
  },
};
