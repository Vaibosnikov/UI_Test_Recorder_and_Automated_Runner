import React from "react";

const statusColors = {
  passed: "bg-green-100 text-green-700 border-green-300",
  failed: "bg-red-100 text-red-700 border-red-300",
  skipped: "bg-yellow-100 text-yellow-700 border-yellow-300",
};

export default function LatestRunsTable({ runs = [] }) {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-4 shadow">
      <h2 className="text-lg font-semibold mb-3">Recent Test Runs</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-white/10 text-left text-gray-300 uppercase text-xs">
              <th className="p-3">Feature / Application</th>
              <th className="p-3">Test</th>
              <th className="p-3">Status</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Started At</th>
            </tr>
          </thead>

          <tbody>
            {runs.map((run) => (
              <tr
                key={run.id}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >
                {/* Feature / Application */}
                <td className="p-3">
                  <a
                    href="#"
                    className="text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span className="text-green-400">🖋️</span>
                    {run.feature || `Feature ${run.id}`}
                  </a>
                </td>

                {/* Test Name */}
                <td className="p-3 text-gray-200">
                  {run.test_name || "Unknown Test"}
                </td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-md border text-xs font-semibold inline-flex items-center gap-1 ${
                      statusColors[run.status.toLowerCase()]
                    }`}
                  >
                    {run.status.charAt(0).toUpperCase() +
                      run.status.slice(1)}{" "}
                    {run.status === "passed" && "✅"}
                    {run.status === "failed" && "❌"}
                    {run.status === "skipped" && "⏭️"}
                  </span>
                </td>

                {/* Duration */}
                <td className="p-3 text-gray-300">
                  {run.duration_ms >= 1000
                    ? `${(run.duration_ms / 1000).toFixed(1)} s`
                    : `${run.duration_ms} ms`}
                </td>

                {/* Started At */}
                <td className="p-3 text-gray-300">
                  {new Date(run.started_at).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Tip */}
      <p className="mt-2 text-xs text-gray-400">
        Tip: Click the <span className="text-blue-400">Feature / Application</span> to view test details (steps, screenshots, and logs).
      </p>
    </div>
  );
}
