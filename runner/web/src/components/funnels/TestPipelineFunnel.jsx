import React from "react";

export default function TestPipelineFunnel({ theme = "dark" }) {
  const isDark = theme === "dark";

  // Container background and text dynamically follow the theme
  const containerClasses = `p-4 rounded-lg border transition-colors duration-300 ${
    isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-gray-900"
  }`;

  // Step bars: background changes by theme, text color follows contrast
  const stepClasses = (bgColor, width, textColor) =>
    `p-2 rounded font-medium transition-all duration-300 ${bgColor} ${width} ${textColor}`;

  return (
    <div className={containerClasses}>
      <h2
        className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Test Execution Funnel
      </h2>

      <div className="space-y-3">
        {/* Step 1 */}
        <div
          className={stepClasses(
            isDark ? "bg-blue-700" : "bg-blue-200",
            "w-full",
            isDark ? "text-white" : "text-blue-800"
          )}
        >
          Recorded
        </div>

        {/* Step 2 */}
        <div
          className={stepClasses(
            isDark ? "bg-purple-700" : "bg-purple-200",
            "w-4/5",
            isDark ? "text-white" : "text-purple-800"
          )}
        >
          Script Generated
        </div>

        {/* Step 3 */}
        <div
          className={stepClasses(
            isDark ? "bg-indigo-700" : "bg-indigo-200",
            "w-3/5",
            isDark ? "text-white" : "text-indigo-800"
          )}
        >
          Execution Triggered
        </div>

        {/* Step 4 */}
        <div
          className={stepClasses(
            isDark ? "bg-green-700" : "bg-green-200",
            "w-2/5",
            isDark ? "text-white" : "text-green-800"
          )}
        >
          Passed
        </div>
      </div>
    </div>
  );
}
