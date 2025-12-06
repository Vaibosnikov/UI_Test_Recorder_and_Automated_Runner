import React, { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import RunsTable from "../components/RunsTable";

import mock from "../mock/sampleRuns.json";

// New components
import DashboardFilters from "../components/filters/DashboardFilters";
import TestPipelineFunnel from "../components/funnels/TestPipelineFunnel";
import VisualDiffViewer from "../components/visual/VisualDiffViewer";
import FlakyTestsHeatmap from "../components/charts/FlakyTestsHeatmap";

// Existing charts
import {
  RunStatusChart,
  RunTrendChart,
  RunDurationChart,
  EnvironmentChart,
} from "../visualizations";

export default function DashboardPage() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark"); // Theme toggle state

  // Load mock data
  useEffect(() => {
    setRuns(mock.data && mock.data.length ? mock.data : [
      { id: 1, testId: "T01", status: "passed", branch: "main", duration: 120, startedAt: "2025-12-06 12:00" },
      { id: 2, testId: "T02", status: "failed", branch: "dev", duration: 450, startedAt: "2025-12-06 12:05" },
      { id: 3, testId: "T03", status: "passed", branch: "feature", duration: 300, startedAt: "2025-12-06 12:10" },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className={`${theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"} 
                    p-6 min-h-screen space-y-8 transition-colors duration-300`}>

      {/* ------------------ THEME TOGGLE ------------------ */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-4 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* ------------------ TOP KPIs ------------------ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Tests" value={runs.length} />
        <SummaryCard title="Total Runs" value={runs.length} />
        <SummaryCard
          title="Passing"
          value={runs.filter((r) => r.status === "passed").length}
        />
        <SummaryCard
          title="Average Duration"
          value={
            runs.length
              ? Math.round(
                  runs.reduce((acc, r) => acc + r.duration, 0) / runs.length
                ) + " ms"
              : "--"
          }
        />
      </div>

      {/* ------------------ FILTER BAR ------------------ */}
      <DashboardFilters />

      {/* ------------------ RECENT RUNS TABLE ------------------ */}
      <section className={`${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-gray-100 border-gray-300"} 
                          p-5 rounded-lg border`}>
        <h2 className="text-xl font-semibold mb-4">Recent Test Runs</h2>
        {loading ? <div>Loading...</div> : <RunsTable runs={runs} />}
      </section>

      {/* ------------------ MAIN CHARTS ROW ------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RunStatusChart runs={runs} theme={theme} />
        <RunTrendChart runs={runs} theme={theme} />
      </div>

      {/* ------------------ SECONDARY CHARTS ROW ------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RunDurationChart runs={runs} theme={theme} />
        <EnvironmentChart runs={runs} theme={theme} />
      </div>

      {/* ------------------ FUNNEL + HEATMAP ------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TestPipelineFunnel theme={theme} />
        <FlakyTestsHeatmap theme={theme} />
      </div>

      {/* ------------------ VISUAL REGRESSION ------------------ */}
      <VisualDiffViewer theme={theme} />
    </div>
  );
}
