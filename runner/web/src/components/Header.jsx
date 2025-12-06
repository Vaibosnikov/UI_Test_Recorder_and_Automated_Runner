import React from "react";

export default function Header({ theme = "dark" }) {
  const isDark = theme === "dark";

  const bgClass = isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-300";
  const titleText = isDark ? "text-white" : "text-gray-900";

  return (
    <header className={`${bgClass} px-4 py-2 border-b transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className={`text-xl font-bold ${titleText}`}>
          <span className="text-blue-400">TestCraft</span> Dashboard
        </h1>
      </div>
    </header>
  );
}
