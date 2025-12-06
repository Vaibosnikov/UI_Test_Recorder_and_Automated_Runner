import React from "react";

export default function LatestRunsTable({ data }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-3">Recent Test Runs</h2>

      <table className="w-full text-left">
        <thead className="text-gray-400 text-sm">
          <tr>
            <th>ID</th>
            <th>Test ID</th>
            <th>Status</th>
            <th>Branch</th>
            <th>Duration</th>
            <th>Started At</th>
          </tr>
        </thead>

        <tbody className="text-gray-300">
          {data.map((run) => (
            <tr key={run.id} className="border-t border-gray-700">
              <td>{run.id}</td>
              <td>{run.testId}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs 
                  ${
                    run.status === "passed"
                      ? "bg-green-700"
                      : run.status === "failed"
                      ? "bg-red-700"
                      : "bg-yellow-600"
                  }`}
                >
                  {run.status}
                </span>
              </td>
              <td>{run.branch}</td>
              <td>{run.duration} ms</td>
              <td>{run.startedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
