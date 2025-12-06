import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

function aggregateByDay(runs) {
  if (!runs || runs.length === 0) return [];
  const map = {};
  runs.forEach(r => {
    const day = r.started_at ? dayjs(r.started_at).format("YYYY-MM-DD") : "unknown";
    map[day] = map[day] || { date: day, total: 0, passed: 0, failed: 0 };
    map[day].total += 1;
    if (r.status === "passed") map[day].passed += 1;
    if (r.status === "failed") map[day].failed += 1;
  });
  return Object.values(map).sort((a,b)=>a.date.localeCompare(b.date));
}

export default function RunTrendChart({ runs = [], theme = "dark" }) {
  const data = aggregateByDay(runs);
  const isEmpty = data.length === 0;

  return (
    <div className={`p-4 rounded border 
                    ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-gray-100 border-gray-300"}`}>
      <h3 className="text-sm mb-2">Daily Run Trend</h3>

      {isEmpty ? (
        <div className="h-56 flex items-center justify-center text-gray-400">
          No run data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#334155" : "#d1d5db"} />
            <XAxis dataKey="date" stroke={theme === "dark" ? "#f1f5f9" : "#1f2937"} />
            <YAxis stroke={theme === "dark" ? "#f1f5f9" : "#1f2937"} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#60a5fa" />
            <Line type="monotone" dataKey="passed" stroke="#22c55e" />
            <Line type="monotone" dataKey="failed" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
