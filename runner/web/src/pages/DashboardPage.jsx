// src/pages/DashboardPage.jsx
<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import LatestRunsTable from "../components/tables/LatestRunsTable";
=======
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../components/ThemeProvider";

import KpiCard from "../components/cards/KpiCard";
>>>>>>> c1569ec22f02ec85a92c37cfd5c85177a6b480c9
import DashboardFilters from "../components/filters/DashboardFilters";
import LatestRunsTable from "../components/tables/LatestRunsTable";

import RunStatusChart from "../visualizations/RunStatusChart";
import RunDurationChart from "../visualizations/RunDurationChart";
import RunTrendChart from "../visualizations/RunTrendChart";
import EnvironmentChart from "../visualizations/EnvironmentChart";

import TestPipelineFunnel from "../components/funnels/TestPipelineFunnel";
import FlakyTestsHeatmap from "../components/charts/FlakyTestsHeatmap";
import VisualDiffViewer from "../components/visual/VisualDiffViewer";

<<<<<<< HEAD
import RunStatusChart from "../visualizations/RunStatusChart";
import RunTrendChart from "../visualizations/RunTrendChart";
import RunDurationChart from "../visualizations/RunDurationChart";
import EnvironmentChart from "../visualizations/EnvironmentChart";

import mock from "../mock/sampleRuns.json";
import { useTheme } from "../components/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";

// Dashboard Card container
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
      <Header theme={theme}>
        <ThemeToggle />
      </Header>

      {/* MAIN PAGE */}
      <main
        className={`
          w-full max-w-[1440px] mx-auto px-8 py-6 space-y-10 min-h-screen
          transition-colors duration-300
          ${theme === "dark" ? "bg-slate-900 text-white" : "bg-gray-100 text-black"}
        `}
      >
        {/* FILTER SECTION */}
        <DashboardCard className="min-h-[120px]">
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
        <DashboardCard className="min-h-[300px]">
          <h2 className="text-xl font-semibold mb-4 opacity-80">Recent Test Runs</h2>
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
          <DashboardCard title="Run Status Distribution" className="min-h-[300px]">
            <RunStatusChart runs={runs} />
          </DashboardCard>

          <DashboardCard title="Daily Run Trend" className="min-h-[300px]">
            <RunTrendChart runs={runs} />
          </DashboardCard>
        </div>

        {/* DURATION + ENVIRONMENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DashboardCard title="Execution Duration" className="min-h-[300px]">
            <RunDurationChart runs={runs} />
          </DashboardCard>

          <DashboardCard title="Environment Usage" className="min-h-[300px]">
            <EnvironmentChart runs={runs} />
          </DashboardCard>
        </div>

        {/* FUNNEL + HEATMAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DashboardCard title="Test Execution Funnel" className="min-h-[300px]">
            <TestPipelineFunnel />
          </DashboardCard>

          <DashboardCard title="Flaky Tests Heatmap" className="min-h-[300px]">
            <FlakyTestsHeatmap />
          </DashboardCard>
        </div>

        {/* VISUAL DIFF VIEWER */}
        <div className="grid grid-cols-1">
          <DashboardCard title="Visual Regression Differences" className="min-h-[400px]">
            <VisualDiffViewer />
          </DashboardCard>
        </div>
      </main>
    </>
=======
export default function DashboardPage() {
  const { theme } = useTheme();

  const bgClass =
    theme === "dark"
      ? "bg-[#020617] text-slate-100"
      : "bg-gray-100 text-slate-900";

  const cardClass =
    theme === "dark"
      ? "bg-[#0b1727] text-slate-100 border border-slate-800"
      : "bg-white text-slate-900 shadow-sm border border-gray-200";

  return (
    <div className={`min-h-screen flex ${bgClass}`}>
      {/* Left sidebar column */}
      <Sidebar />

      {/* Right: header + content */}
      <div className="flex-1 flex flex-col">
        <Header />

        {/* Scrollable dashboard area */}
        <main className="flex-1 overflow-y-auto">
          {/* Centered dashboard content with max width like reference */}
          <div className="w-full max-w-7xl mx-auto px-6 py-6 space-y-6">
            {/* KPI row */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <KpiCard title="Tests Executed" value="15" />
              <KpiCard title="Passing Tests" value="9" />
              <KpiCard title="Failed Tests" value="4" />
              <KpiCard title="Average Duration" value="1240 ms" />
            </section>

            {/* Filters */}
            <section className={`${cardClass} p-4 rounded-xl`}>
              <DashboardFilters />
            </section>

            {/* Recent runs table */}
            <section className={`${cardClass} p-4 rounded-xl`}>
              <LatestRunsTable />
            </section>

            {/* Status + trends row */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className={`${cardClass} p-4 rounded-xl flex items-center justify-center`}>
                <RunStatusChart />
              </div>
              <div className={`${cardClass} p-4 rounded-xl`}>
                <RunTrendChart />
              </div>
              <div className={`${cardClass} p-4 rounded-xl`}>
                <RunDurationChart />
              </div>
            </section>

            {/* Environment */}
            <section className={`${cardClass} p-4 rounded-xl`}>
              <EnvironmentChart />
            </section>

            {/* Funnel */}
            <section className={`${cardClass} p-4 rounded-xl`}>
              <TestPipelineFunnel />
            </section>

            {/* Heatmap */}
            <section className={`${cardClass} p-4 rounded-xl`}>
              <FlakyTestsHeatmap />
            </section>

            {/* Visual regression */}
            <section className={`${cardClass} p-4 rounded-xl`}>
              <VisualDiffViewer />
            </section>
          </div>
        </main>
      </div>
    </div>
>>>>>>> c1569ec22f02ec85a92c37cfd5c85177a6b480c9
  );
}
