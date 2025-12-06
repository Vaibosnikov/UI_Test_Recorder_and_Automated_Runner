import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RunDurationChart({ runs = [] }) {
  const data = runs.map(r => ({ name: r.test_id || r.id, duration: r.duration_ms || 0 }));
  return (
    <div className="bg-slate-800 p-4 rounded border border-slate-700">
      <h3 className="text-sm mb-2">Execution Duration (ms)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="duration" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
