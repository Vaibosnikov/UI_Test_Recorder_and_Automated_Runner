import React from "react";

export default function Header() {
  return (
    <header className="bg-slate-800 p-4 border-b border-slate-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">TestCraft Dashboard</h1>
          <p className="text-sm text-slate-400">UI components & styling (feature/visualizations)</p>
        </div>
        <div className="text-sm text-slate-300">Vaibhav / Dakshita</div>
      </div>
    </header>
  );
}
