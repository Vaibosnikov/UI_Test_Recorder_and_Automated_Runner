import React from "react";
import { useTheme } from "./ThemeProvider";

export default function SummaryCard({ title, value }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
<<<<<<< HEAD
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
=======
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 flex-1 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="text-gray-500 dark:text-slate-400 text-sm">{title}</div>
      <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
>>>>>>> c1569ec22f02ec85a92c37cfd5c85177a6b480c9
    </div>
  );
}
