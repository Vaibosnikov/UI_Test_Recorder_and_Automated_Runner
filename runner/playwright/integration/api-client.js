import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:5000';

export async function postRunSummary(summary) {
  const url = `${API_BASE.replace(/\/$/, '')}/v1/runs`;
  return axios.post(url, summary);
}

export async function uploadArtifact(filePath, runId) {
  // placeholder: implement multipart upload endpoint if backend supports
  const url = `${API_BASE.replace(/\/$/, '')}/v1/artifacts/upload`;
  // If backend supports multipart, implement using FormData
  const FormData = (await import('form-data')).default;
  const form = new FormData();
  form.append('runId', runId);
  form.append('file', fs.createReadStream(filePath));
  const headers = form.getHeaders();
  return axios.post(url, form, { headers });
}