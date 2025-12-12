// src/components/Header.jsx
import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
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
      </div>
    </header>
  );
}
