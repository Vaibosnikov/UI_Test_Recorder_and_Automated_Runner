// src/visualizations/EnvironmentChart.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "../components/ThemeProvider";
import sampleRuns from "../mock/sampleRuns.json";

const COLORS = ["#60a5fa", "#a78bfa", "#34d399", "#f97316"];

export default function EnvironmentChart({ runs = sampleRuns.data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const counts = runs.reduce((acc, r) => {
    const key = r.environment || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(counts).map((key) => ({
    name: key,
    value: counts[key],
  }));

  const bgClass = isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-gray-300 text-gray-900";
  const textColor = isDark ? "#e2e8f0" : "#1e2937";

  return (
    <div className={`p-4 rounded border transition-colors duration-300 ${bgClass}`}>
      <h3 className="text-sm mb-2 font-medium">Environment Distribution</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={80}
            label={({ name }) => ({ fill: textColor, value: name })}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1e293b" : "#ffffff",
              borderColor: isDark ? "#334155" : "#e5e7eb",
              color: textColor,
            }}
          />
          <Legend wrapperStyle={{ color: textColor }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
