import React from "react";

export default function DashboardFilters() {
  return (
    <div
      className="
        flex items-center gap-4 p-3 rounded-lg border
        bg-gray-100 border-gray-300
        dark:bg-slate-800 dark:border-slate-700
        transition-colors duration-300
      "
    >
      {/* Branch Filter */}
      <select
        className="
          p-2 rounded 
          bg-white text-gray-800 border border-gray-300
          dark:bg-slate-700 dark:text-white dark:border-slate-600
          focus:outline-none focus:ring-2 focus:ring-blue-400
          transition-colors
        "
      >
        <option>All Branches</option>
        <option>main</option>
        <option>dev</option>
        <option>feature/demo</option>
      </select>

      {/* Date Range Filter */}
      <select
        className="
          p-2 rounded 
          bg-white text-gray-800 border border-gray-300
          dark:bg-slate-700 dark:text-white dark:border-slate-600
          focus:outline-none focus:ring-2 focus:ring-blue-400
          transition-colors
        "
      >
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Today</option>
      </select>

      {/* Status Filter */}
      <select
        className="
          p-2 rounded 
          bg-white text-gray-800 border border-gray-300
          dark:bg-slate-700 dark:text-white dark:border-slate-600
          focus:outline-none focus:ring-2 focus:ring-blue-400
          transition-colors
        "
      >
        <option>Status: All</option>
        <option>Passed</option>
        <option>Failed</option>
        <option>Skipped</option>
      </select>
    </div>
  );
}
