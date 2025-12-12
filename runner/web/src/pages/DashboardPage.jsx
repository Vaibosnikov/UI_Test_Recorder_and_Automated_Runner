// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../components/ThemeProvider";

import DashboardFilters from "../components/filters/DashboardFilters";
import LatestRunsTable from "../components/tables/LatestRunsTable";

import RunStatusChart from "../visualizations/RunStatusChart";
import RunDurationChart from "../visualizations/RunDurationChart";
import RunTrendChart from "../visualizations/RunTrendChart";
import EnvironmentChart from "../visualizations/EnvironmentChart";

import TestPipelineFunnel from "../components/funnels/TestPipelineFunnel";
import FlakyTestsHeatmap from "../components/charts/FlakyTestsHeatmap";
import VisualDiffViewer from "../components/visual/VisualDiffViewer";

import SummaryCard from "../components/SummaryCard";
import ThemeToggle from "../components/ThemeToggle";
import mock from "../mock/sampleRuns.json";

// Dashboard Card wrapper
function DashboardCard({ title, children, className = "" }) {
  const { theme } = useTheme();

  return (
    <div
      className={`
        p-6 rounded-xl border shadow-lg transition duration-300
        hover:shadow-2xl
        ${theme === "dark"
          ? "bg-slate-800 border-slate-700 shadow-slate-900"
          : "bg-white border-gray-300 shadow-gray-300"}
        ${className}
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
  const { theme } = useTheme();
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-start p-6">
        {/* Header with ThemeToggle */}
        <Header theme={theme}>
          <ThemeToggle />
        </Header>

        {/* Dashboard content wrapper */}
        <main className="flex flex-col items-center justify-start w-full max-w-[1440px] space-y-8 mt-6">
          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <SummaryCard title="Total Tests" value={runs.length} theme={theme} />
            <SummaryCard title="Total Runs" value={runs.length} theme={theme} />
            <SummaryCard title="Passing" value={runs.filter(r => r.status === "passed").length} theme={theme} />
            <SummaryCard
              title="Avg Duration"
              value={runs.length ? `${Math.round(runs.reduce((a, r) => a + r.duration, 0) / runs.length)} ms` : "--"}
              theme={theme}
            />
          </div>

          {/* Filters */}
          <DashboardCard className="min-h-[120px] w-full">
            <DashboardFilters />
          </DashboardCard>

          {/* Recent Runs Table */}
          <DashboardCard className="min-h-[300px] w-full">
            <h2 className="text-xl font-semibold mb-4 opacity-80">Recent Test Runs</h2>
            {loading ? (
              <div className="h-40 flex items-center justify-center text-lg opacity-60">Loading...</div>
            ) : (
              <LatestRunsTable data={runs} theme={theme} />
            )}
          </DashboardCard>

          {/* Status + Trend Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <DashboardCard title="Run Status Distribution" className="min-h-[300px] w-full">
              <RunStatusChart runs={runs} />
            </DashboardCard>

            <DashboardCard title="Daily Run Trend" className="min-h-[300px] w-full">
              <RunTrendChart runs={runs} />
            </DashboardCard>
          </div>

          {/* Duration + Environment Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <DashboardCard title="Execution Duration" className="min-h-[300px] w-full">
              <RunDurationChart runs={runs} />
            </DashboardCard>

            <DashboardCard title="Environment Usage" className="min-h-[300px] w-full">
              <EnvironmentChart runs={runs} />
            </DashboardCard>
          </div>

          {/* Funnel + Heatmap Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <DashboardCard title="Test Execution Funnel" className="min-h-[300px] w-full">
              <TestPipelineFunnel />
            </DashboardCard>

            <DashboardCard title="Flaky Tests Heatmap" className="min-h-[300px] w-full">
              <FlakyTestsHeatmap />
            </DashboardCard>
          </div>

          {/* Visual Regression Viewer */}
          <div className="grid grid-cols-1 w-full">
            <DashboardCard title="Visual Regression Differences" className="min-h-[400px] w-full">
              <VisualDiffViewer />
            </DashboardCard>
          </div>
        </main>
      </div>
    </div>
  );
}
