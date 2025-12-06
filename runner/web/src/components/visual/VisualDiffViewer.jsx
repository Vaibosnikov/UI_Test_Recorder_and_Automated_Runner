import React from "react";

export default function VisualDiffViewer({ theme = "dark" }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`p-4 rounded-lg border ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
      }`}
    >
      <h2 className={`${isDark ? "text-white" : "text-gray-800"} mb-3`}>
        Visual Regression
      </h2>
      <div
        className={`w-full h-48 flex items-center justify-center rounded-lg border-2 border-dashed ${
          isDark ? "border-gray-600 bg-gray-900" : "border-gray-300 bg-gray-100"
        }`}
      >
        <span className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Image diff preview will appear here
        </span>
      </div>
    </div>
  );
}
