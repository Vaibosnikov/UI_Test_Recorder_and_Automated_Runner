// src/visualizations/RunDurationChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import sampleRuns from "../mock/sampleRuns.json";

export default function RunDurationChart() {
  const runs = sampleRuns.data;

  const data = runs.map((r) => ({
    name: r.test_id || r.id,
    duration: r.duration_ms || 0,
  }));

  return (
    <div className="bg-slate-800/60 p-4 rounded border border-slate-700">
      <h3 className="text-sm font-semibold mb-2">Execution Duration (ms)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 10 }} />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Bar dataKey="duration" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
