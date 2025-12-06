import React, { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import LatestRunsTable from "../components/LatestRunsTable";
import DashboardFilters from "../components/filters/DashboardFilters";
import TestPipelineFunnel from "../components/funnels/TestPipelineFunnel";
import VisualDiffViewer from "../components/visual/VisualDiffViewer";
import FlakyTestsHeatmap from "../components/charts/FlakyTestsHeatmap";

import {
  RunStatusChart,
  RunTrendChart,
  RunDurationChart,
  EnvironmentChart,
} from "../visualizations";

import mock from "../mock/sampleRuns.json";
import { useTheme } from "../components/ThemeProvider.jsx";

export default function DashboardPage() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme, toggle } = useTheme(); // ✅ use global theme

  useEffect(() => {
    if (mock.data && mock.data.length) {
      const mappedRuns = mock.data.map((r, i) => ({
        id: r.id || i + 1,
        testId: r.test_id || `T0${i + 1}`,
        status: r.status || "passed",
        branch: r.branch || "main",
        duration: r.duration_ms || Math.floor(Math.random() * 500) + 100,
        startedAt: r.started_at || new Date().toISOString(),
        environment: r.environment || "local",
      }));
      setRuns(mappedRuns);
    } else {
      setRuns([
        { id: 1, testId: "T01", status: "passed", branch: "main", duration: 120, startedAt: new Date().toISOString(), environment: "local" },
        { id: 2, testId: "T02", status: "failed", branch: "dev", duration: 450, startedAt: new Date().toISOString(), environment: "staging" },
        { id: 3, testId: "T03", status: "passed", branch: "feature", duration: 300, startedAt: new Date().toISOString(), environment: "prod" },
      ]);
    }
    setLoading(false);
  }, []);

  const containerClasses = theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black";
  const sectionClasses = theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-gray-100 border-gray-300";

  return (
    <div className={`${containerClasses} p-6 min-h-screen space-y-8 transition-colors duration-300`}>

      {/* THEME TOGGLE */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggle}
          className="px-4 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>

      {/* TOP KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Tests" value={runs.length} theme={theme} />
        <SummaryCard title="Total Runs" value={runs.length} theme={theme} />
        <SummaryCard title="Passing" value={runs.filter(r => r.status === "passed").length} theme={theme} />
        <SummaryCard
          title="Average Duration"
          value={runs.length
            ? Math.round(runs.reduce((acc, r) => acc + r.duration, 0) / runs.length) + " ms"
            : "--"}
          theme={theme}
        />
      </div>

      {/* FILTER BAR */}
      <DashboardFilters theme={theme} />

      {/* RECENT RUNS TABLE */}
      <section className={`${sectionClasses} p-5 rounded-lg border`}>
        {loading ? <div>Loading...</div> : <LatestRunsTable data={runs} theme={theme} />}
      </section>

      {/* MAIN CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RunStatusChart runs={runs} theme={theme} />
        <RunTrendChart runs={runs} theme={theme} />
      </div>

      {/* SECONDARY CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RunDurationChart runs={runs} theme={theme} />
        <EnvironmentChart runs={runs} theme={theme} />
      </div>

      {/* FUNNEL + HEATMAP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TestPipelineFunnel theme={theme} />
        <FlakyTestsHeatmap theme={theme} />
      </div>

      {/* VISUAL REGRESSION */}
      <VisualDiffViewer theme={theme} />
    </div>
  );
}
