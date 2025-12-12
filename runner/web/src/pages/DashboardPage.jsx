import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

// Theme Provider
import { useTheme } from "../components/Themeprovider";

// KPI Cards
import KpiCard from "../components/cards/KpiCard";

// Filters
import DashboardFilters from "../components/filters/DashboardFilters";

// Tables
import LatestRunsTable from "../components/tables/LatestRunsTable";

// Charts you have
import RunStatusChart from "../visualizations/RunStatusChart";
import RunDurationChart from "../visualizations/RunDurationChart";
import RunTrendChart from "../visualizations/RunTrendChart";
import EnvironmentChart from "../visualizations/EnvironmentChart";

// Funnel
import TestPipelineFunnel from "../components/funnels/TestPipelineFunnel";

// Heatmap
import FlakyTestsHeatmap from "../components/charts/FlakyTestsHeatmap";

// Visual Diff Viewer
import VisualDiffViewer from "../components/visual/VisualDiffViewer";

export default function DashboardPage() {
  const { theme } = useTheme();

  const bgClass =
    theme === "dark"
      ? "bg-[#0e1a2b] text-white"
      : "bg-gray-100 text-black";

  const cardClass =
    theme === "dark"
      ? "bg-[#132235] text-white"
      : "bg-white text-black shadow border border-gray-300";

  return (
    <div className={`flex h-screen ${bgClass}`}>

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* HEADER */}
        <Header />

        {/* CONTENT WRAPPER */}
        <div className="p-6 space-y-6">

          {/* KPI ROW */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KpiCard title="Tests Executed" value="15" />
            <KpiCard title="Passing Tests" value="9" />
            <KpiCard title="Failed Tests" value="4" />
            <KpiCard title="Average Duration" value="1240 ms" />
          </div>

          {/* FILTERS */}
          <DashboardFilters />

          {/* RECENT RUNS TABLE */}
          <div className={cardClass + " p-4 rounded-xl"}>
            <LatestRunsTable />
          </div>

          {/* CHART GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={cardClass + " p-4 rounded-xl"}>
              <RunStatusChart />
            </div>

            <div className={cardClass + " p-4 rounded-xl"}>
              <RunTrendChart />
            </div>

            <div className={cardClass + " p-4 rounded-xl"}>
              <RunDurationChart />
            </div>
          </div>

          {/* ENVIRONMENT CHART */}
          <div className={cardClass + " p-4 rounded-xl"}>
            <EnvironmentChart />
          </div>

          {/* FUNNEL */}
          <div className={cardClass + " p-4 rounded-xl"}>
            <TestPipelineFunnel />
          </div>

          {/* HEATMAP */}
          <div className={cardClass + " p-4 rounded-xl"}>
            <FlakyTestsHeatmap />
          </div>

          {/* VISUAL DIFF */}
          <div className={cardClass + " p-4 rounded-xl"}>
            <VisualDiffViewer />
          </div>

        </div>
      </div>
    </div>
  );
}
