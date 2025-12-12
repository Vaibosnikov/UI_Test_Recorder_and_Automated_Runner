// src/visualizations/EnvironmentChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import sampleRuns from "../mock/sampleRuns.json";

const COLORS = ["#60a5fa", "#a78bfa", "#34d399", "#f97316"];

export default function EnvironmentChart() {
  const runs = sampleRuns.data;

  const counts = runs.reduce((acc, r) => {
    const key = r.environment || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(counts).map((k) => ({
    name: k,
    value: counts[k],
  }));

  return (
    <div className="bg-slate-800/60 p-4 rounded border border-slate-700">
      <h3 className="text-sm font-semibold mb-2">Environment Distribution</h3>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
