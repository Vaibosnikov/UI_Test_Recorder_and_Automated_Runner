import React from "react";

export default function SummaryCard({ title, value, theme = "dark" }) {
  const isDark = theme === "dark";

  const bgClass = isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black";

  return (
    <div className={`p-4 rounded flex-1 border ${bgClass}`}>
      <div className="text-sm text-gray-400 dark:text-gray-400">{title}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
