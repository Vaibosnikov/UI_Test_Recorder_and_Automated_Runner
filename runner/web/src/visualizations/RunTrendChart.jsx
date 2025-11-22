import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

function aggregateByDay(runs) {
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

export default function RunTrendChart({ runs = [] }) {
  const data = aggregateByDay(runs);

  return (
    <div className="bg-slate-800 p-4 rounded border border-slate-700">
      <h3 className="text-sm mb-2">Daily Run Trend</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#60a5fa" />
          <Line type="monotone" dataKey="passed" stroke="#22c55e" />
          <Line type="monotone" dataKey="failed" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
