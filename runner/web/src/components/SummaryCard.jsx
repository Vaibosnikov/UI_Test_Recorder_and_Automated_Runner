import React from "react";
import { useTheme } from "./ThemeProvider"; // ✅ use global theme

export default function SummaryCard({ title, value }) {
  const { theme } = useTheme();     // ✅ get global theme
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-slate-800 border-slate-700 text-slate-200"
    : "bg-white border-gray-300 text-gray-900";

  const labelText = isDark ? "text-slate-400" : "text-gray-500";

  return (
    <div className={`p-4 rounded flex-1 border transition-colors duration-300 ${bgClass}`}>
      <div className={`text-sm ${labelText}`}>{title}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
