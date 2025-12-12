import React from "react";

export default function DashboardFilters({ theme = "dark" }) {
  const isDark = theme === "dark";

  const containerClasses = `flex items-center gap-4 p-3 rounded-lg border transition-colors duration-300 ${
    isDark ? "bg-slate-800 border-slate-700" : "bg-gray-100 border-gray-300"
  }`;

  const selectClasses = `p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
    isDark
      ? "bg-slate-700 text-white border-slate-600"
      : "bg-white text-gray-800 border-gray-300"
  }`;

  return (
    <div className={containerClasses}>
      {/* Branch Filter */}
      <select className={selectClasses}>
        <option>All Branches</option>
        <option>main</option>
        <option>dev</option>
        <option>feature/demo</option>
      </select>

      {/* Date Range Filter */}
      <select className={selectClasses}>
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Today</option>
      </select>

      {/* Status Filter */}
      <select className={selectClasses}>
        <option>Status: All</option>
        <option>Passed</option>
        <option>Failed</option>
        <option>Skipped</option>
      </select>
    </div>
  );
}
