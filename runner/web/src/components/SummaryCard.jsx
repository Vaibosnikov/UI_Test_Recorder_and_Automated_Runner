import React from "react";

export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded p-4 flex-1">
      <div className="text-slate-400 text-sm">{title}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
