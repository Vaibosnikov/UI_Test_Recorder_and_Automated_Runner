import React from "react";

function RunsTable({ runs }) {
  if (!runs || runs.length === 0) {
    return <p>No runs available yet.</p>;
  }

  return (
    <table className="runs-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Test ID</th>
          <th>Status</th>
          <th>Environment</th>
          <th>Branch</th>
          <th>Duration (ms)</th>
          <th>Started At</th>
        </tr>
      </thead>
      <tbody>
        {runs.map((run) => (
          <tr key={run.id}>
            <td>{run.id}</td>
            <td>{run.test_id}</td>
            <td className={`status status-${run.status}`}>
              {run.status}
            </td>
            <td>{run.environment || "-"}</td>
            <td>{run.branch || "-"}</td>
            <td>{run.duration_ms ?? "-"}</td>
            <td>
              {run.started_at
                ? new Date(run.started_at).toLocaleString()
                : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RunsTable;
