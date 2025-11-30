import { postRunSummary } from './api-client.js';

export async function sendSummary(summary) {
  try {
    const res = await postRunSummary(summary);
    console.log('Posted run summary status', res.status);
  } catch (err) {
    console.error('Failed to post summary', err.message || err);
  }
}
