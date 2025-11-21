import React, { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import RunsTable from "../components/RunsTable";
import mock from "../mock/sampleRuns.json";

export default function DashboardPage() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use mock data for this UI-focused branch
    setRuns(mock.data || []);
    setLoading(false);
  }, []);

  return (
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
