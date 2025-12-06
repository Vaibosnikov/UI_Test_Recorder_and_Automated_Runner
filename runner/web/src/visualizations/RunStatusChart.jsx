import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useTheme } from "./ThemeProvider";

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

export default function RunStatusChart({ runs = [] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const counts = runs.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: "passed", value: counts.passed || 0 },
    { name: "failed", value: counts.failed || 0 },
    { name: "skipped", value: counts.skipped || 0 },
  ];

  const isEmpty = runs.length === 0;

  const bgClass = isDark
    ? "bg-slate-800 border-slate-700 text-slate-200"
    : "bg-white border-gray-300 text-gray-900";

  const textColor = isDark ? "#e2e8f0" : "#1e293b";

  return (
    <div className={`p-4 rounded border transition-colors duration-300 ${bgClass}`}>
      <h3 className="text-sm mb-2">Run Status Distribution</h3>

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
              label={{ fill: textColor }}
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

            <Legend
              wrapperStyle={{
                color: textColor,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
