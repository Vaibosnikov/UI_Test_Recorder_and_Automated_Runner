// src/components/Header.jsx
import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header({ theme = "dark", title = "TestCraft Dashboard", children }) {
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 border-slate-700"
    : "bg-gradient-to-r from-white via-gray-100 to-white border-gray-300";

  return (
    <header className={`${bgClass} px-6 py-4 border-b transition-colors duration-300 w-full`}>
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Empty div for left spacing */}
        <div className="flex-1" />

        {/* Title centered */}
        <h1 className="flex-1 text-2xl md:text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transform-gpu transition-transform duration-300">
          {title}
        </h1>

        {/* Right-aligned ThemeToggle */}
        <div className="flex-1 flex justify-end">
          {children || <ThemeToggle />}
        </div>
      </div>
    </header>
  );
}
