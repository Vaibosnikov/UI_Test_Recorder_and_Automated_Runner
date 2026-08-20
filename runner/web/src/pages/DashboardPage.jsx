import { useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient';

export default function DashboardPage() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRuns();
    const interval = setInterval(loadRuns, 5000);
    return () => clearInterval(interval);
  }, []);

  async function loadRuns() {
    try {
      setLoading(true);
      const data = await apiClient.getRuns();
      setRuns(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function getStatusBadge(status) {
    const colors = {
      passed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      running: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  if (loading && runs.length === 0) {
    return <div className="p-8 text-center">Loading test runs...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test Runs Dashboard</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-800">
          Error: {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Failed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {runs.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No test runs yet. Run a test from the extension or CLI.
                </td>
              </tr>
            ) : (
              runs.map((run) => (
                <tr key={run.test_id || run._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{run.test_id}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(run.status)}`}>
                      {run.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{run.passed || 0}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{run.failed || 0}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{run.duration_ms ? `${run.duration_ms}ms` : '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {run.timestamp ? new Date(run.timestamp).toLocaleString() : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
