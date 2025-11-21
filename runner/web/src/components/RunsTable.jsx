import React from "react";

export default function RunsTable({ runs }) {
  if (!runs || runs.length === 0) {
    return <div className="text-slate-400">No runs available.</div>;
  }

  return (
    <div className="overflow-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
            <th className="p-2">ID</th>
            <th className="p-2">Test ID</th>
            <th className="p-2">Status</th>
            <th className="p-2">Branch</th>
            <th className="p-2">Duration (ms)</th>
            <th className="p-2">Started At</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((r) => (
            <tr key={r.id} className="border-b border-slate-800">
              <td className="p-2 text-sm">{r.id}</td>
              <td className="p-2 text-sm">{r.test_id}</td>
              <td className={`p-2 text-sm ${r.status === "passed" ? "text-green-400" : "text-red-400"}`}>
                {r.status}
              </td>
              <td className="p-2 text-sm">{r.branch}</td>
              <td className="p-2 text-sm">{r.duration_ms ?? "-"}</td>
              <td className="p-2 text-sm">{r.started_at ? new Date(r.started_at).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
