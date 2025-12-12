import React from "react";

export default function Header({ children }) {
  return (
    <header className="w-full py-4 bg-transparent border-b border-white/10">
      
      {/* 3 Column layout for perfect centering */}
      <div className="grid grid-cols-3 items-center relative">

        {/* LEFT (Empty so that centering works) */}
        <div></div>

        {/* CENTERED TITLE */}
        <h1 className="text-2xl font-extrabold text-center tracking-wide select-none">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            TestCraft Dashboard
          </span>
        </h1>

        {/* RIGHT CONTENT (Theme Toggle etc.) */}
        <div className="flex justify-end pr-4">
          {children}
        </div>

      </div>
    </header>
  );
}
