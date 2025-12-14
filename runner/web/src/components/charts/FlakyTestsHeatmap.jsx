import React from "react";

// Mapping test names to friendly feature/application names
const testNameMap = {
  "Login Test": "Login Page",
  "Signup Test": "Signup Page",
  "Checkout Test": "Checkout Flow",
  "Profile Test": "Profile Page",
  // Add more mappings if needed
};

const mockFlakyData = [
  { test: "Login Test", runs: [true, false, true, true, false] },
  { test: "Signup Test", runs: [true, true, true, true, true] },
  { test: "Checkout Test", runs: [false, true, false, false, true] },
  { test: "Profile Test", runs: [true, true, false, true, true] },
];

export default function FlakyTestsHeatmap({ theme = "dark" }) {
  const isDark = theme === "dark";

  // Container
  const containerClasses = `p-4 rounded-lg border transition-colors duration-300 ${
    isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-gray-900"
  }`;

  const headerTextClass = isDark ? "text-white" : "text-gray-900";
  const tableHeaderText = isDark ? "text-gray-300" : "text-gray-700";
  const tableBodyText = isDark ? "text-white" : "text-gray-900";
  const tableBorder = isDark ? "border-slate-700" : "border-gray-300";

  return (
    <div className={containerClasses}>
      <h3 className={`text-sm font-semibold mb-2 transition-colors duration-300 ${headerTextClass}`}>
        Flaky Tests Heatmap
      </h3>

      <div className="overflow-x-auto">
        <table
          className={`w-full text-center border-collapse border ${tableBorder} rounded transition-colors duration-300`}
        >
          <thead className={`sticky top-0 ${isDark ? "bg-slate-800" : "bg-gray-100"} border-b ${tableBorder}`}>
            <tr>
              <th className={`p-2 transition-colors duration-300 ${tableHeaderText}`}>Feature / Application</th>
              {[...Array(5)].map((_, i) => (
                <th key={i} className={`p-2 transition-colors duration-300 ${tableHeaderText}`}>
                  Run {i + 1}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={`transition-colors duration-300 ${tableBodyText}`}>
            {mockFlakyData.map((row) => (
              <tr key={row.test}>
                <td className={`p-2 font-medium transition-colors duration-300`}>
                  <a
                    href={`/app/${row.test}`} // Replace with actual app/report link
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {testNameMap[row.test] || row.test}
                  </a>
                </td>

                {row.runs.map((pass, i) => {
                  const cellClasses = pass
                    ? isDark
                      ? "bg-green-700 text-green-100"
                      : "bg-green-200 text-green-800"
                    : isDark
                    ? "bg-red-700 text-red-100"
                    : "bg-red-200 text-red-800";

                  return (
                    <td
                      key={i}
                      className={`p-2 rounded font-bold text-center transition-colors duration-300 ${cellClasses}`}
                    >
                      {pass ? "✔" : "✖"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
