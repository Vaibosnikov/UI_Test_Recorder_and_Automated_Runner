import React from "react";
import { LayoutDashboard, PlayCircle, ListChecks, FileBarChart, Settings } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { label: "Overview", icon: <LayoutDashboard size={18} /> },
    { label: "Runs", icon: <PlayCircle size={18} /> },
    { label: "Tests", icon: <ListChecks size={18} /> },
    { label: "Reports", icon: <FileBarChart size={18} /> },
    { label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4">
      <nav className="space-y-3">
        <div className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide mb-1">
          Navigation
        </div>

        {navItems.map((item) => (
          <button
            key={item.label}
            className="
              w-full flex items-center gap-3 px-3 py-2 rounded-lg
              text-slate-700 dark:text-slate-300
              hover:bg-slate-100 dark:hover:bg-slate-800
              transition-colors
            "
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
