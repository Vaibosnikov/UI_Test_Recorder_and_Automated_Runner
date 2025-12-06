import React from "react";

// Example mock data
const mockFlakyData = [
  { test: "Login Test", runs: [true, false, true, true, false] },
  { test: "Signup Test", runs: [true, true, true, true, true] },
  { test: "Checkout Test", runs: [false, true, false, false, true] },
  { test: "Profile Test", runs: [true, true, false, true, true] },
];

export default function FlakyTestsHeatmap({ theme = "dark" }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`p-4 rounded-lg border transition-colors duration-300 ${
        isDark ? "bg-slate-800 border-slate-700" : "bg-gray-100 border-gray-300"
      }`}
    >
      <h3 className={`text-sm font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
        Flaky Tests Heatmap
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className={`p-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Test</th>
              {[...Array(5)].map((_, i) => (
                <th key={i} className={`p-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Run {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockFlakyData.map((row) => (
              <tr key={row.test}>
                <td className={`p-2 font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                  {row.test}
                </td>
                {row.runs.map((pass, i) => (
                  <td
                    key={i}
                    className={`p-2 rounded ${
                      pass
                        ? isDark
                          ? "bg-green-700"
                          : "bg-green-200 text-green-800"
                        : isDark
                        ? "bg-red-700"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {pass ? "✔" : "✖"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
