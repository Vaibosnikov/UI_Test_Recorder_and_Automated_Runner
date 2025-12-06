import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "../components/ThemeProvider";

const COLORS = ["#60a5fa", "#a78bfa", "#34d399", "#f97316"];

export default function EnvironmentChart({ runs = [] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-slate-800 border-slate-700 text-slate-200"
    : "bg-white border-gray-300 text-gray-900";

  const textColor = isDark ? "#e2e8f0" : "#1e2937";
  const labelColor = isDark ? "#cbd5e1" : "#334155";

  const counts = runs.reduce((acc, r) => {
    const key = r.environment || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(counts).map((key) => ({
    name: key,
    value: counts[key],
  }));

  const isEmpty = runs.length === 0;

  return (
    <div className={`p-4 rounded border transition-colors duration-300 ${bgClass}`}>
      <h3 className="text-sm mb-2 font-medium">Environment Distribution</h3>

      {isEmpty ? (
        <div className={`${isDark ? "text-slate-500" : "text-gray-500"} h-56 flex items-center justify-center`}>
          No run data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={40}
              outerRadius={80}
              label={({ name }) => <span style={{ fill: labelColor }}>{name}</span>}
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
      )}
    </div>
  );
}
