import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

export default function RunStatusChart({ runs = [] }) {
  const counts = runs.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});
  const data = [
    { name: "passed", value: counts.passed || 0 },
    { name: "failed", value: counts.failed || 0 },
    { name: "skipped", value: counts.skipped || 0 }
  ];

  return (
    <div className="bg-slate-800 p-4 rounded border border-slate-700">
      <h3 className="text-sm mb-2">Run Status Distribution</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
