import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import SummaryCard from "../components/SummaryCard";
import RunsTable from "../components/RunsTable";
import mock from "../mock/sampleRuns.json";

=======
<<<<<<< HEAD
import { fetchTests, fetchRuns } from "../services/apiClient.js";
import RunsTable from "../components/RunsTable.jsx";

function DashboardPage() {
  const [tests, setTests] = useState([]);
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [testsRes, runsRes] = await Promise.all([
          fetchTests(),
          fetchRuns()
        ]);

        setTests(testsRes?.data || []);
        setRuns(runsRes?.data || []);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError(err.message || "Failed to load data from API");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="dashboard-container">
      <section className="summary-section">
        <div className="summary-card">
          <h2>Total Tests</h2>
          <p className="summary-value">{tests.length}</p>
        </div>
        <div className="summary-card">
          <h2>Total Runs</h2>
          <p className="summary-value">{runs.length}</p>
        </div>
      </section>

      <section className="runs-section">
        <div className="runs-header">
          <h2>Recent Test Runs</h2>
        </div>

        {loading && <p>Loading data from API...</p>}
        {!loading && error && (
          <p className="error-text">Error: {error}</p>
        )}
        {!loading && !error && (
          <RunsTable runs={runs} />
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
=======
import SummaryCard from "../components/SummaryCard";
import RunsTable from "../components/RunsTable";

import mock from "../mock/sampleRuns.json";

// New components you will add
import DashboardFilters from "../components/filters/DashboardFilters";
import TestPipelineFunnel from "../components/funnels/TestPipelineFunnel";
import VisualDiffViewer from "../components/visual/VisualDiffViewer";
import FlakyTestsHeatmap from "../components/charts/FlakyTestsHeatmap";

// Your existing charts
import {
  RunStatusChart,
  RunTrendChart,
  RunDurationChart,
  EnvironmentChart,
} from "../visualizations";

>>>>>>> dev
export default function DashboardPage() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
    // Use mock data for this UI-focused branch
=======
>>>>>>> dev
    setRuns(mock.data || []);
    setLoading(false);
  }, []);

  return (
<<<<<<< HEAD
    <div className="max-w-7xl mx-auto">
      <section className="mb-6 flex gap-4">
        <SummaryCard title="Total Tests" value="--" />
        <SummaryCard title="Total Runs" value={runs.length} />
        <SummaryCard title="Passing" value={runs.filter(r=>r.status==="passed").length} />
      </section>

      <section className="bg-slate-800 p-4 rounded border border-slate-700">
        <h2 className="text-lg mb-3">Recent Test Runs</h2>
        {loading ? <div>Loading...</div> : <RunsTable runs={runs} />}
      </section>
    </div>
  );
}
=======
    <div className="p-6 bg-slate-900 min-h-screen text-white space-y-8">

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
      <section className="bg-slate-800 p-5 rounded-lg border border-slate-700">
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
>>>>>>> f836e58a1da0bdfdfc4271e740d87ea28a0a59c5
>>>>>>> dev
