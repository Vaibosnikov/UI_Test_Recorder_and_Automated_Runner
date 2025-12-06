import React from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import dayjs from "dayjs";
import { useTheme } from "../components/ThemeProvider";

function aggregateByDay(runs = []) {
  if (!Array.isArray(runs) || runs.length === 0) return [];

  const map = {};

  runs.forEach(r => {
    const rawDate = r?.started_at;
    const day = rawDate ? dayjs(rawDate).format("YYYY-MM-DD") : "unknown";

    if (!map[day]) {
      map[day] = { date: day, total: 0, passed: 0, failed: 0 };
    }

    map[day].total++;
    if (r?.status === "passed") map[day].passed++;
    if (r?.status === "failed") map[day].failed++;
  });

  return Object.values(map).sort((a, b) => {
    if (a.date === "unknown") return 1;
    if (b.date === "unknown") return -1;
    return a.date.localeCompare(b.date);
  });
}

export default function RunTrendChart({ runs = [] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const data = aggregateByDay(runs);
  const isEmpty = data.length === 0;

  // Theme-aware container
  const containerClasses = `p-4 rounded border transition-colors duration-300 ${
    isDark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-gray-300 text-gray-900"
  }`;

  const headingClasses = `text-sm mb-2 font-medium transition-colors duration-300 ${
    isDark ? "text-white" : "text-gray-900"
  }`;

  const emptyStateClasses = `h-56 flex items-center justify-center transition-colors duration-300 ${
    isDark ? "text-slate-500" : "text-gray-500"
  }`;

  return (
    <div className={containerClasses}>
      <h3 className={headingClasses}>Daily Run Trend</h3>

      {isEmpty ? (
        <div className={emptyStateClasses}>No run data available</div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#d1d5db"} />
            <XAxis
              dataKey="date"
              stroke={isDark ? "#f1f5f9" : "#1f2937"}
              tick={{ fill: isDark ? "#cbd5e1" : "#374151" }}
            />
            <YAxis
              stroke={isDark ? "#f1f5f9" : "#1f2937"}
              tick={{ fill: isDark ? "#cbd5e1" : "#374151" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1e293b" : "#ffffff",
                border: isDark ? "1px solid #334155" : "1px solid #e5e7eb",
                color: isDark ? "#f1f5f9" : "#1f2937",
              }}
            />
            <Legend wrapperStyle={{ color: isDark ? "#e2e8f0" : "#1f2937" }} />
            <Line type="monotone" dataKey="total" stroke={isDark ? "#60a5fa" : "#3b82f6"} dot={false} />
            <Line type="monotone" dataKey="passed" stroke={isDark ? "#22c55e" : "#16a34a"} dot={false} />
            <Line type="monotone" dataKey="failed" stroke={isDark ? "#ef4444" : "#b91c1c"} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
