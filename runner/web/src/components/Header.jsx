// src/components/Header.jsx
import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header({ theme = "dark", title = "TestCraft Dashboard", children }) {
  const isDark = theme === "dark";

  // Background based on theme
  const bgClass = isDark
    ? "bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 border-slate-700"
    : "bg-gradient-to-r from-white via-gray-100 to-white border-gray-300";

  return (
<<<<<<< HEAD
    <header className={`${bgClass} px-6 py-4 border-b transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Title centered with gradient and hover effect */}
        <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transform-gpu transition-transform duration-300">
          {title}
        </h1>

        {/* Theme toggle or other right-side elements */}
        {children && <div>{children}</div>}
=======
    <header className="border-b border-slate-800 bg-[#020617]">
      <div className="flex items-center justify-between px-6 py-3">
        {/* centered title using a flex trick */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg md:text-xl font-semibold text-slate-100 tracking-wide">
            TestCraft Dashboard
          </h1>
        </div>

        {/* right-aligned toggle */}
        <div className="flex-0">
          <ThemeToggle className="text-xs md:text-sm px-3 py-1 rounded border border-slate-600 bg-slate-900 text-slate-100" />
        </div>
>>>>>>> c1569ec22f02ec85a92c37cfd5c85177a6b480c9
      </div>
    </header>
  );
}
