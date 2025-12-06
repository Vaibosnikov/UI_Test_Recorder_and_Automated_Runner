import React from "react";

export default function DashboardFilters() {
  return (
    <div className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg border border-gray-700">
      <select className="p-2 bg-gray-700 text-white rounded">
        <option>All Branches</option>
        <option>main</option>
        <option>dev</option>
        <option>feature/demo</option>
      </select>

      <select className="p-2 bg-gray-700 text-white rounded">
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Today</option>
      </select>

      <select className="p-2 bg-gray-700 text-white rounded">
        <option>Status: All</option>
        <option>Passed</option>
        <option>Failed</option>
        <option>Skipped</option>
      </select>
    </div>
  );
}
