import React from "react";

export default function KpiCard({ title, value, subValue }) {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-semibold text-white mt-1">{value}</p>
      {subValue && (
        <p className="text-xs text-green-400 mt-1">{subValue}</p>
      )}
    </div>
  );
}
