import React from "react";

export default function SummaryCard({ title, value }) {
  return (
    <div
      className="
        p-4 rounded flex-1 border 
        bg-white border-gray-300 text-black
        dark:bg-slate-800 dark:border-slate-700 dark:text-white
      "
    >
      <div className="text-gray-600 dark:text-slate-400 text-sm">
        {title}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>
    </div>
  );
}
