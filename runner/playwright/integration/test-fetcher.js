/**
 * Optional helper: fetch tests from backend to run dynamically
 */
import axios from 'axios';
const API_BASE = process.env.API_BASE_URL || 'http://localhost:5000';

export async function fetchTests() {
  const url = `${API_BASE.replace(/\/$/, '')}/v1/tests`;
  const res = await axios.get(url, { timeout: 10000 }).catch(()=>null);
  if (!res || res.status !== 200) return [];
  return res.data;
}
