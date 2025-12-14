// src/visualizations/RunStatusChart.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "../components/ThemeProvider";
import sampleRuns from "../mock/sampleRuns.json";

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

export default function RunStatusChart({ runs = sampleRuns.data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Count runs by status
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

  const bgClass = isDark
    ? "bg-slate-800 border-slate-700 text-slate-200"
    : "bg-white border-gray-300 text-gray-900";

  const textColor = isDark ? "#e2e8f0" : "#1e293b";

  return (
    <div className={`p-4 rounded border transition-colors duration-300 ${bgClass}`}>
      <h3 className="text-sm mb-2 font-medium">Run Status Distribution</h3>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={80}
            label={({ name }) => name}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1e293b" : "#ffffff",
              borderColor: isDark ? "#334155" : "#e2e8f0",
              color: textColor,
            }}
          />
          <Legend wrapperStyle={{ color: textColor }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
