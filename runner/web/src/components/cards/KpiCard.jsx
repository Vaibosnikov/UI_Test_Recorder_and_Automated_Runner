import React from "react";

export default function KpiCard({ title, value, subValue, theme = "dark" }) {
  const isDark = theme === "dark";

  const bgClass = isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300";
  const titleClass = isDark ? "text-gray-400" : "text-gray-600";
  const valueClass = isDark ? "text-white" : "text-gray-900";
  const subValueClass = isDark ? "text-green-400" : "text-green-600";

  return (
    <div className={`p-4 rounded-lg shadow-md border ${bgClass}`}>
      <p className={`text-sm ${titleClass}`}>{title}</p>
      <p className={`text-3xl font-semibold mt-1 ${valueClass}`}>{value}</p>
      {subValue && (
        <p className={`text-xs mt-1 ${subValueClass}`}>{subValue}</p>
      )}
    </div>
  );
}
