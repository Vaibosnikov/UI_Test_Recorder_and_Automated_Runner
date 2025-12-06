import React from "react";

export default function FlakyTestsHeatmap({ theme = "dark" }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`p-4 rounded-lg border ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
      }`}
    >
      <h2 className={`${isDark ? "text-white" : "text-gray-800"} mb-3`}>
        Flaky Tests Heatmap
      </h2>
      <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>
        Coming soon...
      </p>
    </div>
  );
}
