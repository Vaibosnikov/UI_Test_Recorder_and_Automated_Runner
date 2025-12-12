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
import { useTheme } from "../components/ThemeProvider";
import sampleRuns from "../mock/sampleRuns.json";

export default function RunDurationChart({ runs = sampleRuns.data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgClass = isDark
    ? "bg-slate-800 border-slate-700 text-slate-200"
    : "bg-white border-gray-300 text-gray-900";

  const axisColor = isDark ? "#cbd5e1" : "#334155";
  const gridColor = isDark ? "#475569" : "#e2e8f0";

  const data = runs.map((r) => ({
    name: r.test_id || r.id,
    duration: r.duration_ms || r.duration || 0,
  }));

  return (
    <div className={`p-4 rounded border transition-colors duration-300 ${bgClass}`}>
      <h3 className="text-sm mb-2 font-medium">Execution Duration (ms)</h3>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke={axisColor} tick={{ fill: axisColor, fontSize: 12 }} />
          <YAxis stroke={axisColor} tick={{ fill: axisColor, fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1e293b" : "#ffffff",
              borderColor: isDark ? "#334155" : "#e2e8f0",
              color: axisColor,
            }}
          />
          <Bar dataKey="duration" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
