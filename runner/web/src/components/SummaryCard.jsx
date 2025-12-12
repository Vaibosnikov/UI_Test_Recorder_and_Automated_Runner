import React from "react";

export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 flex-1 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="text-gray-500 dark:text-slate-400 text-sm">{title}</div>
      <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}
