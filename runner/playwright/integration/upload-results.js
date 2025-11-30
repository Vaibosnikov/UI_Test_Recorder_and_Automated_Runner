/**
 * integration/upload-results.js
 * Posts a run summary and packaged artifacts to the backend.
 *
 * Expected backend endpoint:
 *   POST /results/upload
 */

import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';

const API = (process.env.API_ENDPOINT || 'http://localhost:3000').replace(/\/$/, '');
const RUN_ID = process.env.RUN_ID || local-;
const AUTH = process.env.AUTH_TOKEN || '';

async function upload() {
  const form = new FormData();
  form.append('runId', RUN_ID);
  form.append('meta', JSON.stringify({ runId: RUN_ID, timestamp: Date.now() }));

  const artifactsDir = path.resolve(process.cwd(), 'artifacts_bundle');
  if (!fs.existsSync(artifactsDir)) {
    console.log('No artifacts found at', artifactsDir, '- ensure tests have run and collect-artifacts executed');
  } else {
    // attach files recursively (top-level files only for simplicity)
    const files = fs.readdirSync(artifactsDir);
    for (const f of files) {
      const filePath = path.join(artifactsDir, f);
      if (fs.lstatSync(filePath).isFile()) {
        form.append('files', fs.createReadStream(filePath), f);
      }
    }
  }

  console.log('Uploading results to', ${API}/results/upload);
  const res = await fetch(${API}/results/upload, { method: 'POST', body: form, headers: { Authorization: AUTH } });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(Upload failed:  );
  }
  console.log('Upload successful');
}

upload().catch(err => {
  console.error('Upload error:', err.message);
  process.exit(2);
});
