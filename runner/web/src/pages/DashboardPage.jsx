// src/pages/DashboardPage.jsx
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../components/ThemeProvider";

import KpiCard from "../components/cards/KpiCard";
import DashboardFilters from "../components/filters/DashboardFilters";
import LatestRunsTable from "../components/tables/LatestRunsTable";

import RunStatusChart from "../visualizations/RunStatusChart";
import RunDurationChart from "../visualizations/RunDurationChart";
import RunTrendChart from "../visualizations/RunTrendChart";
import EnvironmentChart from "../visualizations/EnvironmentChart";

import TestPipelineFunnel from "../components/funnels/TestPipelineFunnel";
import FlakyTestsHeatmap from "../components/charts/FlakyTestsHeatmap";
import VisualDiffViewer from "../components/visual/VisualDiffViewer";

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
  );
}
