// src/components/Sidebar.jsx
import React from "react";
import { useTheme } from "./ThemeProvider";
import {
  LayoutDashboard,
  PlayCircle,
  ListChecks,
  FileBarChart,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgClass = isDark ? "bg-slate-900 border-slate-700" : "bg-gray-100 border-gray-300";
  const textClass = isDark ? "text-slate-200" : "text-gray-900";
  const hoverClass = isDark
    ? "hover:bg-slate-700 hover:text-white"
    : "hover:bg-gray-200 hover:text-black";

  const navItems = [
    { label: "Overview", icon: <LayoutDashboard size={18} /> },
    { label: "Runs", icon: <PlayCircle size={18} /> },
    { label: "Tests", icon: <ListChecks size={18} /> },
    { label: "Reports", icon: <FileBarChart size={18} /> },
    { label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className={`w-64 min-h-screen border-r p-4 transition-colors duration-300 ${bgClass}`}>
      <nav className="space-y-2">
        <div className={`text-xs uppercase tracking-wide mb-2 opacity-70 ${textClass}`}>
          Navigation
        </div>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${textClass} ${hoverClass}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
