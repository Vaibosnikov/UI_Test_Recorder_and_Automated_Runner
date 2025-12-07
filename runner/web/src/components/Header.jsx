import React from "react";

export default function Header({ theme = "dark", title = "TestCraft Dashboard", children }) {
  const isDark = theme === "dark";

  // Background based on theme
  const bgClass = isDark
    ? "bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 border-slate-700"
    : "bg-gradient-to-r from-white via-gray-100 to-white border-gray-300";

  return (
    <header className={`${bgClass} px-6 py-4 border-b transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Title centered with gradient and hover effect */}
        <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transform-gpu transition-transform duration-300">
          {title}
        </h1>

        {/* Theme toggle or other right-side elements */}
        {children && <div>{children}</div>}
      </div>
    </header>
  );
}
