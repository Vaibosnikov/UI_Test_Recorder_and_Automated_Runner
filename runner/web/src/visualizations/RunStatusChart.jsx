// src/visualizations/RunStatusChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import sampleRuns from "../mock/sampleRuns.json";

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

export default function RunStatusChart() {
  const runs = sampleRuns.data;

  const counts = runs.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    },
    { passed: 0, failed: 0, skipped: 0 }
  );

  const data = [
    { name: "passed", value: counts.passed },
    { name: "failed", value: counts.failed },
    { name: "skipped", value: counts.skipped },
  ];

  return (
    <div className="bg-slate-800/60 p-4 rounded border border-slate-700">
      <h3 className="text-sm font-semibold mb-2">Run Status Distribution</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
