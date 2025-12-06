import React from "react";

export default function TestPipelineFunnel({ theme = "dark" }) {
  const isDark = theme === "dark";

  const containerClasses = `p-4 rounded-lg border transition-colors duration-300 ${
    isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-gray-900"
  }`;

  const stepClasses = (color, width) =>
    `p-2 rounded font-medium text-white transition-all duration-300 ${color} ${width}`;

  return (
    <div className={containerClasses}>
      <h2 className="text-lg font-semibold mb-3">Test Execution Funnel</h2>

      <div className="space-y-3">
        {/* Step 1 */}
        <div
          className={stepClasses(isDark ? "bg-blue-700" : "bg-blue-600", "w-full")}
        >
          Recorded
        </div>

        {/* Step 2 */}
        <div
          className={stepClasses(isDark ? "bg-purple-700" : "bg-purple-600", "w-4/5")}
        >
          Script Generated
        </div>

        {/* Step 3 */}
        <div
          className={stepClasses(isDark ? "bg-indigo-700" : "bg-indigo-600", "w-3/5")}
        >
          Execution Triggered
        </div>

        {/* Step 4 */}
        <div
          className={stepClasses(isDark ? "bg-green-700" : "bg-green-600", "w-2/5")}
        >
          Passed
        </div>
      </div>
    </div>
  );
}
