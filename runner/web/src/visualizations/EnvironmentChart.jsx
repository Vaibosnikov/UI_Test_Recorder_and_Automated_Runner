import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "./ThemeProvider";

const COLORS = ["#60a5fa", "#a78bfa", "#34d399", "#f97316"];

export default function EnvironmentChart({ runs = [] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-slate-800 border-slate-700 text-slate-200"
    : "bg-white border-gray-300 text-gray-900";

  const labelColor = isDark ? "#cbd5e1" : "#334155";

  const counts = runs.reduce((acc, r) => {
    const key = r.environment || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(counts).map((k) => ({ name: k, value: counts[k] }));

  return (
    <div className={`p-4 rounded border transition-colors duration-300 ${bgClass}`}>
      <h3 className="text-sm mb-2">Environment Distribution</h3>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={80}
            label={{ fill: labelColor }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          {/* Tooltip theme fix */}
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1e293b" : "#ffffff",
              borderColor: isDark ? "#334155" : "#e2e8f0",
              color: isDark ? "#e2e8f0" : "#1e293b",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
