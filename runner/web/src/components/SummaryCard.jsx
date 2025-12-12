// src/components/SummaryCard.jsx
import React from "react";
import { useTheme } from "./ThemeProvider";

export default function SummaryCard({ title, value }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`
        p-5 rounded-xl border backdrop-blur-md shadow-md transition-all duration-300
        ${isDark
          ? "bg-slate-800/40 border-slate-700/60 text-slate-100 shadow-slate-900/40"
          : "bg-white/60 border-gray-300 text-gray-900 shadow-gray-300/50"}
      `}
    >
      <div className={`text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>
        {title}
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">
        {value}
      </div>
    </div>
  );
}
