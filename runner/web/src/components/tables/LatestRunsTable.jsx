
import React from "react";
import sampleRuns from "../../mock/sampleRuns.json";

const statusColors = {
  passed: "bg-green-100 text-green-700 border-green-300",
  failed: "bg-red-100 text-red-700 border-red-300",
  skipped: "bg-yellow-100 text-yellow-700 border-yellow-300",
};

export default function LatestRunsTable() {
  const runs = sampleRuns.data; // use the data array from JSON

<<<<<<< HEAD
/** Known IDs → friendly names (extend as needed) */
const TEST_ID_MAP = {
  "AC-LOGIN-001":   { feature: "Login",     displayName: "Login – Basic", docsUrl: "/docs/tests/login-basic" },
  "AC-LOGIN-002":   { feature: "Login",     displayName: "Login – Invalid Credentials" },
  "AC-LOGIN-003":   { feature: "Login",     displayName: "Login – Lockout / Rate Limit" },
  "AC-SIGNUP-001":  { feature: "Signup",    displayName: "Signup – Basic Flow" },
  "AC-SIGNUP-002":  { feature: "Signup",    displayName: "Signup – Validation Errors" },
  "AC-PROFILE-001": { feature: "Profile",   displayName: "Profile – Load" },
  "AC-PROFILE-002": { feature: "Profile",   displayName: "Profile – Update" },
  "AC-LOGOUT-001":  { feature: "Logout",    displayName: "Logout – Basic" },
  "AC-LOGOUT-002":  { feature: "Logout",    displayName: "Logout – Token Expiry" },
  "AC-DASHBOARD-001": { feature: "Dashboard", displayName: "Dashboard – Widgets Render" },
  "AC-DASHBOARD-002": { feature: "Dashboard", displayName: "Dashboard – KPI Tiles" },
  "AC-SEARCH-001":    { feature: "Search",    displayName: "Search – Basic" },
  "AC-FILTER-001":    { feature: "Filters",   displayName: "Filters – Apply & Reset" },
  "AC-CART-001":      { feature: "Cart",      displayName: "Cart – Add / Remove Items" },
  "AC-CHECKOUT-001":  { feature: "Checkout",  displayName: "Checkout – Payment Success" },
};

/** Derive feature + display name from test_id / testId */
function parseTestId(testId) {
  if (!testId) return { feature: "Unknown", displayName: "Unknown Test" };
  const known = TEST_ID_MAP[testId];
  if (known) return known;

  const parts = String(testId).split("-"); // ["AC","LOGIN","001"]
  const rawFeature = parts[1] || "unknown";
  const feature = rawFeature.charAt(0).toUpperCase() + rawFeature.slice(1).toLowerCase();
  const displayName = `${rawFeature.toUpperCase()} ${parts[2] || ""}`.trim();
  return { feature, displayName };
}

/** Formatters */
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

/** Status badge with friendly label + tooltip */
function StatusBadge({ status, isDark }) {
  const meta =
    {
      passed: {
        label: "Passed ✅",
        tip: "All checks succeeded",
        cls: isDark ? "bg-green-700 text-green-100" : "bg-green-200 text-green-800",
      },
      failed: {
        label: "Failed ❌",
        tip: "At least one check failed",
        cls: isDark ? "bg-red-700 text-red-100" : "bg-red-200 text-red-800",
      },
      skipped: {
        label: "Skipped ⏭️",
        tip: "Test was skipped by config or filter",
        cls: isDark ? "bg-yellow-600 text-yellow-100" : "bg-yellow-200 text-yellow-800",
      },
      running: {
        label: "Running 🟡",
        tip: "Currently executing",
        cls: isDark ? "bg-amber-600 text-amber-100" : "bg-amber-200 text-amber-800",
      },
      queued: {
        label: "Queued 🕒",
        tip: "Waiting to start",
        cls: isDark ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-800",
      },
    }[status] || {
      label: "Unknown",
      tip: "Status not available",
      cls: isDark ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-800",
    };

  return (
    <span
      title={meta.tip}
      className={`px-2 py-1 rounded text-xs font-medium transition-colors duration-300 ${meta.cls}`}
      aria-label={meta.label}
    >
      {meta.label}
    </span>
  );
}

/** Tiny icon for common features (visual cue for non-tech users) */
function FeatureIcon({ name }) {
  const n = (name || "").toLowerCase();
  const icon =
    n.includes("login") ? "🔑" :
    n.includes("signup") ? "📝" :
    n.includes("checkout") ? "🛒" :
    n.includes("dashboard") ? "📋" :
    n.includes("profile") ? "👤" :
    n.includes("search") ? "🔎" :
    n.includes("filter") ? "🎛️" :
    n.includes("cart") ? "🛍️" :
    "🧪";
  return <span aria-hidden className="mr-1">{icon}</span>;
}

/** Normalize incoming `data` to rows:
 * - Accepts array OR { data: [...] }
 * - Supports both field styles: test_id/testId, duration_ms/duration, started_at/startedAt
 */
function normalizeRows(data) {
  const raw = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
  return raw.map((run) => {
    const testId = run.test_id ?? run.testId;
    const durationMs = run.duration_ms ?? run.duration ?? null;
    const startedAt = run.started_at ?? run.startedAt ?? null;
    return {
      id: run.id,
      testId,
      status: run.status,
      feature: run.feature,         // if backend provides, we use it
      application: run.application, // if backend provides, we use it
      environment: run.environment,
      branch: run.branch,
      durationMs,
      startedAt,
      detailsUrl: run.detailsUrl,   // optional
    };
  });
}

/**
 * LatestRunsTable.jsx
 * - Derives Feature/Application from testId when missing
 * - Clickable Feature/Application linking to run details
 * - Friendly test names + raw ID in tooltip
 * - Handles array or { data: [...] } inputs
 */
export default function LatestRunsTable({ data = [], theme = "dark" }) {
  const isDark = theme === "dark";
  const rows = normalizeRows(data);

  const bgClass = isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300";
  const headerText = isDark ? "text-gray-400" : "text-gray-600";
  const bodyText = isDark ? "text-gray-300" : "text-gray-800";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  const headerBg = isDark ? "bg-gray-800" : "bg-gray-100";
  const titleText = isDark ? "text-white" : "text-gray-900";

  if (!rows.length) {
    return (
      <div className={`p-4 rounded-lg border ${bgClass} transition-colors duration-300`}>
        <h2 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${titleText}`}>
          Recent Test Runs
        </h2>
        <p className={`transition-colors duration-300 ${bodyText}`}>
          No runs available. When tests execute, they’ll show up here.
        </p>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg border ${bgClass} overflow-x-auto transition-colors duration-300`}>
      <h2 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${titleText}`}>
        Recent Test Runs
      </h2>

      <table className="w-full text-left border-collapse">
        <thead className={`${headerText} text-sm sticky top-0 ${headerBg} border-b ${borderColor} transition-colors duration-300`}>
          <tr>
            <th className="p-2">Feature / Application</th>
            <th className="p-2">Test</th>
            <th className="p-2">Status</th>
            <th className="p-2">Duration</th>
            <th className="p-2">Started At</th>
          </tr>
        </thead>

        <tbody className={`transition-colors duration-300 ${bodyText}`}>
          {rows.map((run) => {
            const { feature: parsedFeature, displayName } = parseTestId(run.testId);
            const featureOrApp = run.feature || run.application || parsedFeature;
            const detailsHref = run.detailsUrl || `/runs/${run.id}`;

            return (
              <tr key={run.id} className={`border-t ${borderColor} hover:bg-gray-700/30 transition`}>
                {/* Feature / Application (clickable) */}
                <td className="p-2">
                  <a
                    href={detailsHref}
                    className={`underline underline-offset-2 ${
                      isDark ? "text-sky-300 hover:text-sky-200" : "text-sky-700 hover:text-sky-600"
                    }`}
                    title={`Open details for ${displayName}`}
                  >
                    <FeatureIcon name={featureOrApp} />
                    {featureOrApp}
                  </a>
                </td>

                {/* Test: friendly name + raw testId in tooltip */}
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <span>{displayName}</span>
                    {run.testId && (
                      <span
                        className={`${isDark ? "text-gray-400" : "text-gray-500"} text-xs`}
                        title={`Test ID: ${run.testId}`}
                      >
                        ({run.testId})
                      </span>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="p-2">
                  <StatusBadge status={run.status} isDark={isDark} />
                </td>

                {/* Duration */}
                <td className="p-2">{formatDuration(run.durationMs)}</td>

                {/* Started At */}
                <td className="p-2">{formatDate(run.startedAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Friendly legend for non-tech users */}
      <div className={`mt-3 text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Tip: Click the <span className={isDark ? "text-sky-300" : "text-sky-700"}>Feature / Application</span> to view test details (steps, screenshots, and logs).
      </div>
=======
  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/5 p-4 shadow">
      <h2 className="text-lg font-semibold mb-3">Recent Test Runs</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-white/10 text-left text-gray-300 uppercase text-xs">
              <th className="p-3">Feature / Application</th>
              <th className="p-3">Test</th>
              <th className="p-3">Status</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Started At</th>
            </tr>
          </thead>

          <tbody>
            {runs.map((run) => (
              <tr
                key={run.id}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >
                {/* Feature / Application (using test_id as placeholder name) */}
                <td className="p-3">
                  <a
                    href="#"
                    className="text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span className="text-green-400">🖋️</span>
                    {run.feature || run.test_id}
                  </a>
                </td>

                {/* Test Name */}
                <td className="p-3 text-gray-200">
                  {run.test_name || run.test_id || "Unknown Test"}
                </td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-md border text-xs font-semibold inline-flex items-center gap-1 ${
                      statusColors[run.status.toLowerCase()]
                    }`}
                  >
                    {run.status.charAt(0).toUpperCase() + run.status.slice(1)}{" "}
                    {run.status === "passed" && "✅"}
                    {run.status === "failed" && "❌"}
                    {run.status === "skipped" && "⏭️"}
                  </span>
                </td>

                {/* Duration */}
                <td className="p-3 text-gray-300">
                  {run.duration_ms >= 1000
                    ? `${(run.duration_ms / 1000).toFixed(1)} s`
                    : `${run.duration_ms} ms`}
                </td>

                {/* Started At */}
                <td className="p-3 text-gray-300">
                  {new Date(run.started_at).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs text-gray-400">
        Tip: Click the <span className="text-blue-400">Feature / Application</span> to view test details (steps, screenshots, and logs).
      </p>
>>>>>>> c1569ec22f02ec85a92c37cfd5c85177a6b480c9
    </div>
  );
}
