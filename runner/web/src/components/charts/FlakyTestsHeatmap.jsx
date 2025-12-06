=import React from "react";

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

      {/* Placeholder content */}
      <div
        className={`h-56 flex items-center justify-center rounded ${
          isDark ? "bg-slate-700 text-gray-400" : "bg-gray-200 text-gray-600"
        }`}
      >
        Placeholder Heatmap
      </div>
    </div>
  );
}
