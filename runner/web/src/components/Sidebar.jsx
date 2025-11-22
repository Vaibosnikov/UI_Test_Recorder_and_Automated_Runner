import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 p-4">
      <nav className="space-y-2">
        <div className="text-slate-300 text-xs uppercase mb-2">Navigation</div>
        <a className="block p-2 rounded hover:bg-slate-700">Overview</a>
        <a className="block p-2 rounded hover:bg-slate-700">Runs</a>
        <a className="block p-2 rounded hover:bg-slate-700">Tests</a>
        <a className="block p-2 rounded hover:bg-slate-700">Reports</a>
        <a className="block p-2 rounded hover:bg-slate-700">Settings</a>
      </nav>
    </aside>
  );
}
