import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import KpiCard from "../components/KpiCard";
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

// Reusable Chart Container
function ChartCard({ children }) {
  const { theme } = useTheme();
  const bgClass =
    theme === "dark"
      ? "bg-slate-800 border-slate-700 text-white"
      : "bg-white border-gray-300 text-gray-900";

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

  // Map raw run data to friendly names for non-tech users
  useEffect(() => {
    let mappedRuns = [];
    if (mock.data?.length) {
      mappedRuns = mock.data.map((r, i) => ({
        id: r.id || i + 1,
        testName: r.test_name || r.test_id || `Feature ${i + 1}`, // friendly name
        status: r.status || "passed",
        branch: r.branch || "main",
        duration: r.duration_ms || Math.floor(Math.random() * 500) + 100,
        startedAt: r.started_at || new Date().toISOString(),
        environment: r.environment || "local",
      }));
    } else {
      // fallback mock
      mappedRuns = [
        { id: 1, testName: "Login Page", status: "passed", branch: "main", duration: 120, startedAt: new Date().toISOString(), environment: "local" },
        { id: 2, testName: "Signup Page", status: "failed", branch: "dev", duration: 450, startedAt: new Date().toISOString(), environment: "staging" },
        { id: 3, testName: "Checkout Page", status: "passed", branch: "feature", duration: 300, startedAt: new Date().toISOString(), environment: "prod" },
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
    <div className={containerClasses}>
      <Header theme={theme} title="TestCraft Dashboard" />

      {/* Theme Toggle */}
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
        <KpiCard title="Tests Executed" value={runs.length} theme={theme} />
        <KpiCard title="Passing Tests" value={runs.filter(r => r.status === "passed").length} theme={theme} />
        <KpiCard title="Failed Tests" value={runs.filter(r => r.status === "failed").length} theme={theme} />
        <KpiCard
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
          <div className={`h-56 flex items-center justify-center ${theme === "dark" ? "text-slate-500" : "text-gray-500"}`}>
            Loading...
          </div>
        ) : (
          <LatestRunsTable data={runs} theme={theme} />
        )}
      </section>

      {/* MAIN CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard>
          <RunStatusChart runs={runs} theme={theme} />
        </ChartCard>
        <ChartCard>
          <RunTrendChart runs={runs} theme={theme} />
        </ChartCard>
      </div>

      {/* SECONDARY CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard>
          <RunDurationChart runs={runs} theme={theme} />
        </ChartCard>
        <ChartCard>
          <EnvironmentChart runs={runs} theme={theme} />
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
  );
}
