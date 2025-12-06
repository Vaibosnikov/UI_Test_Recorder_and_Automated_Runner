import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import LatestRunsTable from "../components/tables/LatestRunsTable";
import DashboardFilters from "../components/filters/DashboardFilters";
import TestPipelineFunnel from "../components/funnels/TestPipelineFunnel";
import VisualDiffViewer from "../components/visual/VisualDiffViewer";
import FlakyTestsHeatmap from "../components/charts/FlakyTestsHeatmap";

import RunStatusChart from "../visualizations/RunStatusChart";
import RunTrendChart from "../visualizations/RunTrendChart";
import RunDurationChart from "../visualizations/RunDurationChart";
import EnvironmentChart from "../visualizations/EnvironmentChart";

import mock from "../mock/sampleRuns.json";
import { useTheme } from "../components/ThemeProvider";

// Reusable chart container
function ChartCard({ children }) {
  const { theme } = useTheme();
  const bgClass =
    theme === "dark"
      ? "bg-slate-800 border-slate-700 text-slate-200"
      : "bg-gray-100 border-gray-300 text-gray-900";

  return (
    <div className={`p-4 rounded border transition-colors duration-300 ${bgClass}`}>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    let mappedRuns = [];
    if (mock.data?.length) {
      mappedRuns = mock.data.map((r, i) => ({
        id: r.id || i + 1,
        testId: r.test_id || `T0${i + 1}`,
        status: r.status || "passed",
        branch: r.branch || "main",
        duration: r.duration_ms || Math.floor(Math.random() * 500) + 100,
        startedAt: r.started_at || new Date().toISOString(),
        environment: r.environment || "local",
      }));
    } else {
      mappedRuns = [
        { id: 1, testId: "T01", status: "passed", branch: "main", duration: 120, startedAt: new Date().toISOString(), environment: "local" },
        { id: 2, testId: "T02", status: "failed", branch: "dev", duration: 450, startedAt: new Date().toISOString(), environment: "staging" },
        { id: 3, testId: "T03", status: "passed", branch: "feature", duration: 300, startedAt: new Date().toISOString(), environment: "prod" },
      ];
    }
    setRuns(mappedRuns);
    setLoading(false);
  }, []);

  const containerClasses = `p-6 min-h-0 space-y-8 transition-colors duration-300 ${
    theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"
  }`;

  const sectionClasses = `p-5 rounded-lg border transition-colors duration-300 ${
    theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-gray-100 border-gray-300"
  }`;

  return (
    <>
      <div className={containerClasses}>
        {/* Theme toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggle}
            className={`px-4 py-2 border rounded focus:outline-none focus:ring transition ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
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
            value={
              runs.length
                ? `${Math.round(runs.reduce((acc, r) => acc + r.duration, 0) / runs.length)} ms`
                : "--"
            }
            theme={theme}
          />
        </div>

        {/* FILTER BAR */}
        <DashboardFilters theme={theme} />

        {/* RECENT RUNS TABLE */}
        <section className={sectionClasses}>
          {loading ? (
            <div className="h-56 flex items-center justify-center text-gray-500 dark:text-slate-500">
              Loading...
            </div>
          ) : (
            <LatestRunsTable data={runs} theme={theme} />
          )}
        </section>

        {/* MAIN CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard>
            <RunStatusChart runs={runs} />
          </ChartCard>
          <ChartCard>
            <RunTrendChart runs={runs} />
          </ChartCard>
        </div>

        {/* SECONDARY CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard>
            <RunDurationChart runs={runs} />
          </ChartCard>
          <ChartCard>
            <EnvironmentChart runs={runs} />
          </ChartCard>
        </div>

        {/* FUNNEL + HEATMAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard>
            <TestPipelineFunnel theme={theme} />
          </ChartCard>
          <ChartCard>
            <FlakyTestsHeatmap theme={theme} />
          </ChartCard>
        </div>

        {/* VISUAL REGRESSION */}
        <ChartCard>
          <VisualDiffViewer theme={theme} />
        </ChartCard>
      </div>
    </>
  );
}
