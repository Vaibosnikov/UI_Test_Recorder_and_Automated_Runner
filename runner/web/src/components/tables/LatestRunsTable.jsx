import React from "react";

// Mapping from test IDs to friendly names
const testNameMap = {
  "AC-LOGIN-001": "Login Page",
  "AC-SIGNUP-002": "Signup Page",
  "AC-CHECKOUT-003": "Checkout Flow",
  "AC-PROFILE-004": "Profile Page",
  // Add more mappings as needed
};

// Helper function to format duration
const formatDuration = (ms) => (ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} s`);

export default function LatestRunsTable({ data = [], theme = "dark" }) {
  const isDark = theme === "dark";

  const bgClass = isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300";
  const headerText = isDark ? "text-gray-400" : "text-gray-600";
  const bodyText = isDark ? "text-gray-300" : "text-gray-800";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  const headerBg = isDark ? "bg-gray-800" : "bg-gray-100";

  if (!data.length) {
    return (
      <div className={`p-4 rounded-lg border ${bgClass} transition-colors duration-300`}>
        <h2 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}>
          Recent Test Runs
        </h2>
        <p className={`transition-colors duration-300 ${bodyText}`}>No runs available</p>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg border ${bgClass} overflow-x-auto transition-colors duration-300`}>
      <h2 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}>
        Recent Test Runs
      </h2>

      <table className="w-full text-left border-collapse">
        <thead className={`${headerText} text-sm sticky top-0 ${headerBg} border-b ${borderColor} transition-colors duration-300`}>
          <tr>
            <th className="p-2">Feature / Application</th>
            <th className="p-2">Status</th>
            <th className="p-2">Duration</th>
            <th className="p-2">Started At</th>
          </tr>
        </thead>

        <tbody className={`transition-colors duration-300 ${bodyText}`}>
          {data.map((run) => (
            <tr key={run.id} className={`border-t ${borderColor}`}>
              <td className="p-2">
                <a
                  href={`/app/${run.testId}`} // Replace with actual link
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {testNameMap[run.testId] || run.testId}
                </a>
              </td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors duration-300 ${
                    run.status === "passed"
                      ? isDark
                        ? "bg-green-700 text-green-100"
                        : "bg-green-200 text-green-800"
                      : run.status === "failed"
                      ? isDark
                        ? "bg-red-700 text-red-100"
                        : "bg-red-200 text-red-800"
                      : isDark
                      ? "bg-yellow-600 text-yellow-100"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {run.status === "passed" ? "Passed ✅" : run.status === "failed" ? "Failed ❌" : run.status}
                </span>
              </td>
              <td className="p-2">{formatDuration(run.duration)}</td>
              <td className="p-2">{new Date(run.startedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
