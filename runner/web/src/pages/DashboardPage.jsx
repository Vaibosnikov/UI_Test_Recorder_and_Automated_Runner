// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import LatestRunsTable from "../components/tables/LatestRunsTable";
import mock from "../mock/sampleRuns.json";

export default function DashboardPage() {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    if (mock.data && mock.data.length) {
      setRuns(mock.data);
      console.log("Loaded runs:", mock.data);
    } else {
      console.warn("No runs data found in mock JSON");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header theme="dark" />

      <div className="p-4 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard title="Total Tests" value={runs.length} />
          <SummaryCard
            title="Passed"
            value={runs.filter((r) => r.status === "passed").length}
          />
          <SummaryCard
            title="Failed"
            value={runs.filter((r) => r.status === "failed").length}
          />
          <SummaryCard
            title="Skipped"
            value={runs.filter((r) => r.status === "skipped").length}
          />
        </div>

        {/* Latest Runs Table */}
        <div className="bg-slate-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2 text-white">
            Latest Test Runs
          </h2>
          <LatestRunsTable runs={runs} />
        </div>
      </div>
    </div>
  );
}
