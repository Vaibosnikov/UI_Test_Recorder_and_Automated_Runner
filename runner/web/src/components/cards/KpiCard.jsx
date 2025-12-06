import React from "react";

export default function KpiCard({ title, value, subValue, theme = "dark" }) {
  const isDark = theme === "dark";

  // Container background, border, and shadow based on theme
  const containerClasses = `p-4 rounded-lg border shadow transition-colors duration-300 ${
    isDark ? "bg-gray-800 border-gray-700 shadow-md" : "bg-white border-gray-300 shadow-sm"
  }`;

  // Text classes based on theme
  const titleClass = isDark ? "text-gray-400" : "text-gray-600";
  const valueClass = isDark ? "text-white" : "text-gray-900";
  const subValueClass = isDark ? "text-green-400" : "text-green-600";

  return (
    <div className={containerClasses}>
      <p className={`text-sm ${titleClass} transition-colors duration-300`}>{title}</p>
      <p className={`text-3xl font-semibold mt-1 ${valueClass} transition-colors duration-300`}>{value}</p>
      {subValue && (
        <p className={`text-xs mt-1 ${subValueClass} transition-colors duration-300`}>
          {subValue}
        </p>
      )}
    </div>
  );
}
