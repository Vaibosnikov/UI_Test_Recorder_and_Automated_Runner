import { useEffect, useState } from 'react';
import { apiClient, API_BASE_URL } from './services/apiClient.js';

export default function App() {
  const [health, setHealth] = useState(null);
  const [runs, setRuns] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const healthData = await apiClient.getHealth();
        if (!cancelled) setHealth(healthData);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }

      try {
        const runsData = await apiClient.getRuns();
        if (!cancelled) setRuns(runsData?.runs || []);
      } catch (err) {
        if (!cancelled) setError((prev) => prev || err.message);
      }

      if (!cancelled) setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '960px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '4px' }}>Test Runs Dashboard</h1>
      <p style={{ color: '#666', marginTop: 0, fontSize: '13px' }}>
        API base URL: <code>{API_BASE_URL}</code>
      </p>

      <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px' }}>
        <strong>API health: </strong>
        {loading && <span>Checking...</span>}
        {!loading && health && <span style={{ color: 'green' }}>{health.status}</span>}
        {!loading && !health && <span style={{ color: '#b00020' }}>Unavailable</span>}
      </section>

      {error && (
        <section style={{ border: '1px solid #f0b4b4', background: '#fff5f5', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', color: '#b00020' }}>
          Error: {error}
        </section>
      )}

      <section style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px 16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '4px 8px' }}>Test ID</th>
              <th style={{ textAlign: 'left', padding: '4px 8px' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '4px 8px' }}>Passed</th>
              <th style={{ textAlign: 'left', padding: '4px 8px' }}>Failed</th>
              <th style={{ textAlign: 'left', padding: '4px 8px' }}>Duration</th>
              <th style={{ textAlign: 'left', padding: '4px 8px' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {runs.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '12px 8px', color: '#666' }}>
                  No test runs yet. Run a test from the extension or CLI.
                </td>
              </tr>
            )}
            {runs.map((run) => (
              <tr key={run.id || run.testId}>
                <td style={{ padding: '4px 8px' }}>{run.id || run.testId}</td>
                <td style={{ padding: '4px 8px' }}>{run.status}</td>
                <td style={{ padding: '4px 8px' }}>{run.passed}</td>
                <td style={{ padding: '4px 8px' }}>{run.failed}</td>
                <td style={{ padding: '4px 8px' }}>{run.duration}</td>
                <td style={{ padding: '4px 8px' }}>{run.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
