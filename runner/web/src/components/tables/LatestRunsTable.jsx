import React from "react";

export default function LatestRunsTable({ data, theme = "dark" }) {
  const isDark = theme === "dark";

  const bgClass = isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300";
  const headerText = isDark ? "text-gray-400" : "text-gray-600";
  const bodyText = isDark ? "text-gray-300" : "text-gray-800";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";

  return (
    <div className={`p-4 rounded-lg border ${bgClass}`}>
      <h2 className={`${isDark ? "text-white" : "text-gray-800"} text-lg font-semibold mb-3`}>
        Recent Test Runs
      </h2>

      <table className="w-full text-left">
        <thead className={`${headerText} text-sm`}>
          <tr>
            <th>ID</th>
            <th>Test ID</th>
            <th>Status</th>
            <th>Branch</th>
            <th>Duration</th>
            <th>Started At</th>
          </tr>
        </thead>

        <tbody className={bodyText}>
          {data.map((run) => (
            <tr key={run.id} className={`border-t ${borderColor}`}>
              <td>{run.id}</td>
              <td>{run.testId}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    run.status === "passed"
                      ? isDark
                        ? "bg-green-700"
                        : "bg-green-200 text-green-800"
                      : run.status === "failed"
                      ? isDark
                        ? "bg-red-700"
                        : "bg-red-200 text-red-800"
                      : isDark
                      ? "bg-yellow-600"
                      : "bg-yellow-200 text-yellow-800"
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
