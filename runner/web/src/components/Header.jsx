import React from "react";

export default function Header({ theme = "dark" }) {
  const isDark = theme === "dark";

  const bgClass = isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-300";
  const titleText = isDark ? "text-white" : "text-gray-900";
  const subtitleText = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <header className={`${bgClass} p-4 border-b transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${titleText}`}>
            <span className="text-blue-400">TestCraft</span> Dashboard
          </h1>
          <p className={`text-sm ${subtitleText}`}>
            UI components & styling (feature/visualizations)
          </p>
        </div>
        <div></div> {/* Empty right side */}
      </div>
    </header>
  );
}
