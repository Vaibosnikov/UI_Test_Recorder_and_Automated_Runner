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

  useEffect(() => {
    setRuns(mock.data || []);
    setLoading(false);
  }, []);

  return (
    <div className="p-6 min-h-screen space-y-8 
                    bg-white text-black 
                    dark:bg-slate-900 dark:text-white">

      {/* ------------------ TOP KPIs ------------------ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Tests" value="--" />
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
      <section className="p-5 rounded-lg border 
                          bg-gray-100 border-gray-300
                          dark:bg-slate-800 dark:border-slate-700">
        <h2 className="text-xl font-semibold mb-4">Recent Test Runs</h2>
        {loading ? <div>Loading...</div> : <RunsTable runs={runs} />}
      </section>

      {/* ------------------ MAIN CHARTS ROW ------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RunStatusChart runs={runs} />
        <RunTrendChart runs={runs} />
      </div>

      {/* ------------------ SECONDARY CHARTS ROW ------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RunDurationChart runs={runs} />
        <EnvironmentChart runs={runs} />
      </div>

      {/* ------------------ FUNNEL + HEATMAP ------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TestPipelineFunnel />
        <FlakyTestsHeatmap />
      </div>

      {/* ------------------ VISUAL REGRESSION ------------------ */}
      <VisualDiffViewer />
    </div>
  );
}
