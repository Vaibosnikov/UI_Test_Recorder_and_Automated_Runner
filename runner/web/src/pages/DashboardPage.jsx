import React, { useEffect, useState } from "react";
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
