import React, { useEffect, useState, useMemo } from "react";
import SummaryCard from "../components/SummaryCard";
import LatestRunsTable from "../components/LatestRunsTable";
import mock from "../mock/sampleRuns.json";

// New components
import DashboardFilters from "../components/filters/DashboardFilters";
import TestPipelineFunnel from "../components/funnels/TestPipelineFunnel";
import VisualDiffViewer from "../components/visual/VisualDiffViewer";
import FlakyTestsHeatmap from "../components/charts/FlakyTestsHeatmap";

// Charts
import {
  RunStatusChart,
  RunTrendChart,
  RunDurationChart,
  EnvironmentChart,
} from "../visualizations";

/**
 * DashboardPage
 * - Assumes ThemeProvider and ThemeToggle are provided at app root (no header/toggle duplication).
 * - Normalizes mock data so charts and tables receive an easy-to-use shape.
 * - Uses a responsive grid so the dashboard feels like a multi-panel layout (not stacked sections).
 */

function normalizeRun(r) {
  return {
    id: r.id,
    testId: r.testId || r.test_id || r.testID || r.name || r.id,
    status: (r.status || "").toLowerCase(),
    environment: r.environment || "-",
    branch: r.branch || "-",
    durationMs:
      r.durationMs ?? r.duration_ms ?? r.duration ?? r.durationMs ?? null,
    // also expose a simple "duration" in milliseconds and a numeric ms value for charts
    duration: r.durationMs ?? r.duration_ms ?? r.duration ?? null,
    startedAt: r.startedAt || r.started_at || r.started || null,
    displayDuration: r.displayDuration || r.displayDuration || null,
    displayStartedAt: r.displayStartedAt || r.displayStartedAt || null,
  };
}

export default function DashboardPage() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = Array.isArray(mock?.data) ? mock.data : [];
    const normalized = raw.map(normalizeRun);
    setRuns(normalized);
    setLoading(false);
  }, []);

  // KPIs
  const totalRuns = runs.length;
  const passing = runs.filter((r) => r.status === "passed").length;
  const avgDuration = useMemo(() => {
    if (!runs.length) return null;
    const sum = runs.reduce((s, r) => s + (r.duration || 0), 0);
    return Math.round(sum / runs.length);
  }, [runs]);

  return (
    <div className="p-6 min-h-screen" style={{ background: "var(--bg, #0f1720)" }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* TOP KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <SummaryCard title="Total Tests" value="--" />
          <SummaryCard title="Total Runs" value={totalRuns} />
          <SummaryCard title="Passing" value={passing} />
          <SummaryCard title="Average Duration" value={avgDuration ? `${avgDuration} ms` : "--"} />
        </div>

        {/* FILTERS */}
        <div>
          <DashboardFilters />
        </div>

        {/* Dashboard grid: Recent runs full width, then charts in columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent Runs - spans full width on small, full row (3 cols) on md+ */}
          <div className="md:col-span-3 bg-slate-800 p-5 rounded-lg border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Recent Test Runs</h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <LatestRunsTable data={runs} />
            )}
          </div>

          {/* Run Status */}
          <div className="md:col-span-1 bg-slate-800 p-5 rounded-lg border border-slate-700 min-h-[220px]">
            <h3 className="text-lg font-medium mb-3">Run Status Distribution</h3>
            <div className="h-full w-full min-h-[160px]">
              <RunStatusChart runs={runs} />
            </div>
          </div>

          {/* Run Trend (wider) */}
          <div className="md:col-span-2 bg-slate-800 p-5 rounded-lg border border-slate-700 min-h-[220px]">
            <h3 className="text-lg font-medium mb-3">Daily Run Trend</h3>
            <div className="h-full w-full min-h-[160px]">
              <RunTrendChart runs={runs} />
            </div>
          </div>

          {/* Execution Duration (wide) */}
          <div className="md:col-span-2 bg-slate-800 p-5 rounded-lg border border-slate-700 min-h-[220px]">
            <h3 className="text-lg font-medium mb-3">Execution Duration (ms)</h3>
            <div className="h-full w-full min-h-[140px]">
              <RunDurationChart runs={runs} />
            </div>
          </div>

          {/* Environment Distribution */}
          <div className="md:col-span-1 bg-slate-800 p-5 rounded-lg border border-slate-700 min-h-[220px]">
            <h3 className="text-lg font-medium mb-3">Environment Distribution</h3>
            <div className="h-full w-full min-h-[140px]">
              <EnvironmentChart runs={runs} />
            </div>
          </div>

          {/* Funnel (wide) */}
          <div className="md:col-span-2 bg-slate-800 p-5 rounded-lg border border-slate-700 min-h-[160px]">
            <h3 className="text-lg font-medium mb-3">Test Execution Funnel</h3>
            <div className="h-full w-full min-h-[120px]">
              <TestPipelineFunnel />
            </div>
          </div>

          {/* Heatmap */}
          <div className="md:col-span-1 bg-slate-800 p-5 rounded-lg border border-slate-700 min-h-[160px]">
            <h3 className="text-lg font-medium mb-3">Flaky Tests Heatmap</h3>
            <div className="h-full w-full min-h-[120px]">
              <FlakyTestsHeatmap />
            </div>
          </div>

          {/* Visual Diff Viewer (full width) */}
          <div className="md:col-span-3 bg-slate-800 p-5 rounded-lg border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Visual Diff Viewer</h2>
            <div className="w-full min-h-[260px]">
              <VisualDiffViewer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}