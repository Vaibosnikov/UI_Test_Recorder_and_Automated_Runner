import React from "react";

export default function Header({ theme = "dark", title = "TestCraft Dashboard" }) {
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-300";

  return (
    <header className={`${bgClass} px-4 py-3 border-b transition-colors duration-300 !mt-0`}>
      <div className="max-w-7xl mx-auto w-full flex justify-center">
        {/* Navbar title centered */}
        <span className="title-pop gradient-text hover:scale-105 transform-gpu transition-transform duration-300 font-extrabold text-2xl md:text-3xl">
          {title}
        </span>
      </div>
    </header>
  );
}
