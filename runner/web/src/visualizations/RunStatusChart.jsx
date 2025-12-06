import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

export default function RunStatusChart({ runs = [], theme = "dark" }) {
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

  return (
    <div className={`p-4 rounded border 
                    ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-gray-100 border-gray-300"}`}>
      <h3 className="text-sm mb-2">Run Status Distribution</h3>

      {isEmpty ? (
        <div className="h-56 flex items-center justify-center text-gray-400">
          No run data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              wrapperStyle={{
                backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                borderRadius: "4px",
                color: theme === "dark" ? "#f1f5f9" : "#1f2937"
              }}
            />
            <Legend 
              wrapperStyle={{ color: theme === "dark" ? "#f1f5f9" : "#1f2937" }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
