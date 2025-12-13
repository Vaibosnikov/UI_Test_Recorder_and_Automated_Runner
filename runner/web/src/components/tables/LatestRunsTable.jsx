import React, { useState, useMemo } from "react";
import sampleRuns from "../../mock/sampleRuns.json";

/** Known IDs → friendly names */
const TEST_ID_MAP = {
  "AC-LOGIN-001": { feature: "Login", displayName: "Login – Basic" },
  "AC-LOGIN-002": { feature: "Login", displayName: "Login – Invalid Credentials" },
  "AC-LOGIN-003": { feature: "Login", displayName: "Login – Lockout / Rate Limit" },
  "AC-SIGNUP-001": { feature: "Signup", displayName: "Signup – Basic Flow" },
  "AC-SIGNUP-002": { feature: "Signup", displayName: "Signup – Validation Errors" },
  "AC-PROFILE-001": { feature: "Profile", displayName: "Profile – Load" },
  "AC-PROFILE-002": { feature: "Profile", displayName: "Profile – Update" },
  "AC-LOGOUT-001": { feature: "Logout", displayName: "Logout – Basic" },
  "AC-LOGOUT-002": { feature: "Logout", displayName: "Logout – Token Expiry" },
  "AC-DASHBOARD-001": { feature: "Dashboard", displayName: "Dashboard – Widgets Render" },
  "AC-DASHBOARD-002": { feature: "Dashboard", displayName: "Dashboard – KPI Tiles" },
  "AC-SEARCH-001": { feature: "Search", displayName: "Search – Basic" },
  "AC-FILTER-001": { feature: "Filters", displayName: "Filters – Apply & Reset" },
  "AC-CART-001": { feature: "Cart", displayName: "Cart – Add / Remove Items" },
  "AC-CHECKOUT-001": { feature: "Checkout", displayName: "Checkout – Payment Success" },
};

function parseTestId(testId) {
  if (!testId) return { feature: "Unknown", displayName: "Unknown Test" };
  return TEST_ID_MAP[testId] || { feature: "Unknown", displayName: testId };
}

const formatDuration = (ms) =>
  ms == null ? "—" : ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} s`;

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function StatusBadge({ status, isDark }) {
  const map = {
    passed: isDark ? "bg-green-700/80 text-green-100" : "bg-green-100 text-green-800",
    failed: isDark ? "bg-red-700/80 text-red-100" : "bg-red-100 text-red-800",
    skipped: isDark ? "bg-yellow-600/80 text-yellow-100" : "bg-yellow-100 text-yellow-800",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${map[status]}`}>
      {status}
    </span>
  );
}

function FeatureIcon({ name }) {
  const n = (name || "").toLowerCase();
  return (
    <span className="mr-2">
      {n.includes("login") ? "🔑" :
       n.includes("signup") ? "📝" :
       n.includes("checkout") ? "🛒" :
       n.includes("dashboard") ? "📋" :
       n.includes("profile") ? "👤" :
       n.includes("search") ? "🔎" :
       n.includes("filter") ? "🎛️" :
       n.includes("cart") ? "🛍️" : "🧪"}
    </span>
  );
}

function normalizeRows(data) {
  const raw = Array.isArray(data) ? data : data?.data || [];
  return raw.map((run) => ({
    id: run.id,
    testId: run.test_id ?? run.testId,
    status: run.status,
    feature: run.feature,
    application: run.application,
    durationMs: run.duration_ms ?? run.duration,
    startedAt: run.started_at ?? run.startedAt,
    detailsUrl: run.detailsUrl,
  }));
}

export default function LatestRunsTable({ data = sampleRuns.data, theme = "dark" }) {
  const isDark = theme === "dark";
  const rows = normalizeRows(data);

  const [sortKey, setSortKey] = useState("startedAt");
  const [sortDir, setSortDir] = useState("desc");
  const [expandedRow, setExpandedRow] = useState(null);

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const v1 = a[sortKey];
      const v2 = b[sortKey];
      if (v1 == null) return 1;
      if (v2 == null) return -1;
      if (sortDir === "asc") return v1 > v2 ? 1 : -1;
      return v1 < v2 ? 1 : -1;
    });
  }, [rows, sortKey, sortDir]);

  const bg = isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200";
  const headerBg = isDark ? "bg-gray-800" : "bg-gray-50";
  const text = isDark ? "text-gray-200" : "text-gray-800";
  const border = isDark ? "border-gray-600/40" : "border-gray-300/40";

  const onSort = (key) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className={`p-6 rounded-xl border ${bg} overflow-x-auto`}>
      <h2 className={`text-xl font-semibold mb-5 ${isDark ? "text-white" : "text-gray-900"}`}>
        Recent Test Runs
      </h2>

      <table className="w-full border-separate border-spacing-0 text-base">
        <thead className={`${headerBg} ${text}`}>
          <tr>
            <th className={`p-4 border-r ${border}`}>Feature</th>
            <th
              className={`p-4 border-r ${border} cursor-pointer`}
              onClick={() => onSort("testId")}
            >
              Test {sortKey === "testId" && (sortDir === "asc" ? "▲" : "▼")}
            </th>
            <th
              className={`p-4 border-r ${border} text-center cursor-pointer`}
              onClick={() => onSort("status")}
            >
              Status {sortKey === "status" && (sortDir === "asc" ? "▲" : "▼")}
            </th>
            <th
              className={`p-4 border-r ${border} text-right cursor-pointer`}
              onClick={() => onSort("durationMs")}
            >
              Duration {sortKey === "durationMs" && (sortDir === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="p-4 text-right cursor-pointer"
              onClick={() => onSort("startedAt")}
            >
              Started {sortKey === "startedAt" && (sortDir === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>

        <tbody className={text}>
          {sortedRows.map((run) => {
            const { feature, displayName } = parseTestId(run.testId);
            const featureName = run.feature || run.application || feature;
            const isOpen = expandedRow === run.id;

            return (
              <React.Fragment key={run.id}>
                <tr
                  onClick={() => setExpandedRow(isOpen ? null : run.id)}
                  className={`
                    cursor-pointer
                    ${isDark ? "odd:bg-gray-900 even:bg-gray-800/40" : "odd:bg-white even:bg-gray-50"}
                    ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}
                  `}
                >
                  <td className={`p-4 border-t border-r ${border}`}>
                    <FeatureIcon name={featureName} />
                    {featureName}
                  </td>

                  <td className={`p-4 border-t border-r ${border}`}>
                    {displayName}
                    <div className="text-sm text-gray-500">{run.testId}</div>
                  </td>

                  <td className={`p-4 border-t border-r ${border} text-center`}>
                    <StatusBadge status={run.status} isDark={isDark} />
                  </td>

                  <td className={`p-4 border-t border-r ${border} text-right font-mono`}>
                    {formatDuration(run.durationMs)}
                  </td>

                  <td className="p-4 border-t text-right font-mono">
                    {formatDate(run.startedAt)}
                  </td>
                </tr>

                {isOpen && (
                  <tr className={isDark ? "bg-gray-800/60" : "bg-gray-50"}>
                    <td colSpan={5} className={`p-4 border-t ${border} text-sm`}>
                      <div className="flex flex-wrap gap-6">
                        <div><strong>Test ID:</strong> {run.testId}</div>
                        <div><strong>Status:</strong> {run.status}</div>
                        <div><strong>Duration:</strong> {formatDuration(run.durationMs)}</div>
                        <div>
                          <a
                            href={run.detailsUrl || `/runs/${run.id}`}
                            className="text-sky-400 underline underline-offset-2"
                          >
                            View Details →
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
