import React from "react";

export default function RunsTable({ runs }) {
  if (!runs || runs.length === 0) {
    return <div className="text-gray-500 dark:text-slate-400">No runs available.</div>;
  }

  return (
    <div className="overflow-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr
            className="
              text-left text-gray-600 dark:text-slate-400 text-sm
              border-b border-gray-300 dark:border-slate-700
            "
          >
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
            <tr
              key={r.id}
              className="
                border-b border-gray-200 dark:border-slate-800
                hover:bg-gray-100 dark:hover:bg-slate-800/40
                transition-colors
              "
            >
              <td className="p-2 text-sm text-gray-800 dark:text-white">{r.id}</td>
              <td className="p-2 text-sm text-gray-800 dark:text-white">{r.test_id}</td>

              <td
                className={`p-2 text-sm font-semibold ${
                  r.status === "passed"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {r.status}
              </td>

              <td className="p-2 text-sm text-gray-800 dark:text-white">{r.branch}</td>
              <td className="p-2 text-sm text-gray-800 dark:text-white">
                {r.duration_ms ?? "-"}
              </td>

              <td className="p-2 text-sm text-gray-800 dark:text-white">
                {r.started_at ? new Date(r.started_at).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
