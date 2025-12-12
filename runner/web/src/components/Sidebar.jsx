// src/components/Sidebar.jsx
import React from "react";
<<<<<<< HEAD
import { useTheme } from "./ThemeProvider";

export default function Sidebar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-slate-900 border-slate-700 text-slate-200"
    : "bg-gray-100 border-gray-300 text-gray-900";

  const hoverClass = isDark ? "hover:bg-slate-700" : "hover:bg-gray-200";

  return (
    <aside
      className={`w-64 h-screen border-r p-5 transition-colors duration-300 ${bgClass}`}
    >
      <nav className="space-y-3">
        <div className="text-xs uppercase tracking-wide opacity-70">
          Navigation
        </div>

        <a className={`block p-2 rounded-md font-medium cursor-pointer transition ${hoverClass}`}>
          Overview
        </a>

        <a className={`block p-2 rounded-md font-medium cursor-pointer transition ${hoverClass}`}>
          Runs
        </a>

        <a className={`block p-2 rounded-md font-medium cursor-pointer transition ${hoverClass}`}>
          Tests
        </a>

        <a className={`block p-2 rounded-md font-medium cursor-pointer transition ${hoverClass}`}>
          Reports
        </a>

        <a className={`block p-2 rounded-md font-medium cursor-pointer transition ${hoverClass}`}>
          Settings
        </a>
=======
import {
  LayoutDashboard,
  PlayCircle,
  ListChecks,
  FileBarChart,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { label: "Overview", icon: <LayoutDashboard size={18} /> },
    { label: "Runs", icon: <PlayCircle size={18} /> },
    { label: "Tests", icon: <ListChecks size={18} /> },
    { label: "Reports", icon: <FileBarChart size={18} /> },
    { label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#020617] border-r border-slate-800 p-4">
      <nav className="space-y-2">
        <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">
          Navigation
        </div>
        {navItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
                       text-slate-300 hover:bg-slate-800 hover:text-white
                       transition-colors text-sm"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
>>>>>>> c1569ec22f02ec85a92c37cfd5c85177a6b480c9
      </nav>
    </aside>
  );
}
