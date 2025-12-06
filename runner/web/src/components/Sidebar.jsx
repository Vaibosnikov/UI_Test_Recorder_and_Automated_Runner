import React from "react";
import { useTheme } from "./ThemeProvider";

export default function Sidebar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-slate-900 border-slate-700 text-slate-200"
    : "bg-gray-100 border-gray-300 text-gray-900";

  const hoverClass = isDark ? "hover:bg-slate-700" : "hover:bg-gray-200";

  return (
    <aside
      className={`w-64 h-screen border-r p-5 transition-colors duration-300 ${bgClass}`}
    >
      <nav className="space-y-3">
        <div className="text-xs uppercase tracking-wide opacity-70">
          Navigation
        </div>

        <a className={`block p-2 rounded-md font-medium cursor-pointer transition ${hoverClass}`}>
          Overview
        </a>

        <a className={`block p-2 rounded-md font-medium cursor-pointer transition ${hoverClass}`}>
          Runs
        </a>

        <a className={`block p-2 rounded-md font-medium cursor-pointer transition ${hoverClass}`}>
          Tests
        </a>

        <a className={`block p-2 rounded-md font-medium cursor-pointer transition ${hoverClass}`}>
          Reports
        </a>

        <a className={`block p-2 rounded-md font-medium cursor-pointer transition ${hoverClass}`}>
          Settings
        </a>
      </nav>
    </aside>
  );
}
