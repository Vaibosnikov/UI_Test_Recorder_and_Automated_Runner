import axios from 'axios';
const API_BASE = process.env.API_BASE_URL || 'http://localhost:5000';
const UI_BASE = process.env.UI_BASE_URL || 'http://localhost:5173';

export async function waitFor(url, attempts = 15, delayMs = 1000) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await axios.get(url, { timeout: 3000 });
      if (res.status >= 200 && res.status < 400) return true;
    } catch (e) {}
    await new Promise(r => setTimeout(r, delayMs));
  }
  return false;
}

export async function checkServices() {
  const apiReady = await waitFor(`${API_BASE}/`, 20, 1000);
  const uiReady = await waitFor(`${UI_BASE}/`, 20, 1000);
  if (!apiReady) console.warn('API not reachable at', API_BASE);
  if (!uiReady) console.warn('UI not reachable at', UI_BASE);
  return apiReady && uiReady;
}