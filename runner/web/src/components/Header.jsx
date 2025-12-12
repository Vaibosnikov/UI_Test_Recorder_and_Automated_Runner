import React from "react";

export default function Header({ children }) {
  return (
    <header className="bg-slate-800 p-4 border-b border-slate-700 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <h1 className="text-xl font-semibold">TestCraft Dashboard</h1>
      </div>

      {/* optional children (e.g. ThemeToggle) can be positioned by the caller */}
      {children}
    </header>
  );
}