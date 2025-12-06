import React from "react";

export default function Sidebar({ theme = "dark" }) {
  const isDark = theme === "dark";

  const bgClass = isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-300";
  const textClass = isDark ? "text-slate-300" : "text-gray-800";
  const hoverClass = isDark ? "hover:bg-slate-700" : "hover:bg-gray-200";

  return (
    <aside className={`w-64 ${bgClass} border-r p-4 transition-colors duration-300`}>
      <nav className="space-y-2">
        <div className={`text-xs uppercase mb-2 ${textClass}`}>Navigation</div>
        <a className={`block p-2 rounded ${hoverClass}`}>Overview</a>
        <a className={`block p-2 rounded ${hoverClass}`}>Runs</a>
        <a className={`block p-2 rounded ${hoverClass}`}>Tests</a>
        <a className={`block p-2 rounded ${hoverClass}`}>Reports</a>
        <a className={`block p-2 rounded ${hoverClass}`}>Settings</a>
      </nav>
    </aside>
  );
}
