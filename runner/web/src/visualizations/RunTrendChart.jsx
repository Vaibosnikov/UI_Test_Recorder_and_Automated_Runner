// src/visualizations/RunTrendChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import sampleRuns from "../mock/sampleRuns.json";

function aggregateByDay(runs) {
  const map = {};
  runs.forEach((r) => {
    const day = r.started_at
      ? dayjs(r.started_at).format("YYYY-MM-DD")
      : "unknown";
    if (!map[day]) {
      map[day] = { date: day, total: 0, passed: 0, failed: 0 };
    }
    map[day].total += 1;
    if (r.status === "passed") map[day].passed += 1;
    if (r.status === "failed") map[day].failed += 1;
  });
  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
}

export default function RunTrendChart() {
  const data = aggregateByDay(sampleRuns.data);

  return (
    <div className="bg-slate-800/60 rounded border border-slate-700 p-4">
      <h3 className="text-sm font-semibold mb-2">Daily Run Trend</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
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
