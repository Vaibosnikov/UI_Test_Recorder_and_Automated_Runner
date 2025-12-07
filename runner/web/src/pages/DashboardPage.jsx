// src/pages/DashboardPage.jsx
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
import ThemeToggle from "../components/ThemeToggle"; // ✅ Import ThemeToggle

// Classic dashboard card container (no blur)
function DashboardCard({ title, children }) {
  const { theme } = useTheme();

  return (
    <div
      className={`
        p-6 rounded-xl border shadow-lg transition duration-300
        ${theme === "dark"
          ? "bg-slate-800 border-slate-700 shadow-slate-900"
          : "bg-white border-gray-300 shadow-gray-300"}
      `}
    >
      {title && (
        <h2 className="text-xl font-semibold mb-4 opacity-80">{title}</h2>
      )}
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    if (mock.data?.length) {
      const mapped = mock.data.map((r, i) => ({
        id: r.id || i + 1,
        testId: r.test_id || `T0${i + 1}`,
        status: r.status || "passed",
        branch: r.branch || "main",
        duration: r.duration_ms || Math.floor(Math.random() * 500) + 100,
        startedAt: r.started_at || new Date().toISOString(),
        environment: r.environment || "local",
      }));

      setRuns(mapped);
    }
    setLoading(false);
  }, []);

  return (
    <>
      {/* HEADER + THEME TOGGLE */}
      <div className="px-8 pt-5 flex items-center justify-between">
        <Header />
        <ThemeToggle /> {/* ✅ Replaced old button */}
      </div>

      {/* MAIN PAGE */}
      <div
        className={`
          px-8 py-6 space-y-10 min-h-screen transition duration-300
          ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-100 text-black"}
        `}
      >
        {/* FILTER SECTION */}
        <DashboardCard>
          <DashboardFilters />
        </DashboardCard>

        {/* KPI ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard title="Total Tests" value={runs.length} theme={theme} />
          <SummaryCard title="Total Runs" value={runs.length} theme={theme} />
          <SummaryCard
            title="Passing"
            value={runs.filter(r => r.status === "passed").length}
            theme={theme}
          />
          <SummaryCard
            title="Avg Duration"
            value={
              runs.length
                ? `${Math.round(
                    runs.reduce((a, r) => a + r.duration, 0) / runs.length
                  )} ms`
                : "--"
            }
            theme={theme}
          />
        </div>

        {/* RECENT RUNS TABLE */}
        <DashboardCard title="Recent Test Runs">
          {loading ? (
            <div className="h-40 flex items-center justify-center text-lg opacity-60">
              Loading...
            </div>
          ) : (
            <LatestRunsTable data={runs} theme={theme} />
          )}
        </DashboardCard>

        {/* STATUS + TREND ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DashboardCard title="Run Status Distribution">
            <RunStatusChart runs={runs} />
          </DashboardCard>

          <DashboardCard title="Daily Run Trend">
            <RunTrendChart runs={runs} />
          </DashboardCard>
        </div>

        {/* DURATION + ENVIRONMENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DashboardCard title="Execution Duration">
            <RunDurationChart runs={runs} />
          </DashboardCard>

          <DashboardCard title="Environment Usage">
            <EnvironmentChart runs={runs} />
          </DashboardCard>
        </div>

        {/* FUNNEL + HEATMAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DashboardCard title="Test Execution Funnel">
            <TestPipelineFunnel />
          </DashboardCard>

          <DashboardCard title="Flaky Tests Heatmap">
            <FlakyTestsHeatmap />
          </DashboardCard>
        </div>

        {/* VISUAL DIFF VIEWER */}
        <DashboardCard title="Visual Regression Differences">
          <VisualDiffViewer />
        </DashboardCard>
      </div>
    </>
  );
}
