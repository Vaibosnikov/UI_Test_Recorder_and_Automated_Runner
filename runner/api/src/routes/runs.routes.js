// Mock routes for runs

const mockRuns = [
  {
    id: 1,
    test_id: 1,
    status: "passed",
    environment: "local",
    branch: "dev",
    commit_hash: "abc123",
    duration_ms: 1500,
    started_at: new Date().toISOString(),
    finished_at: new Date().toISOString()
  },
  {
    id: 2,
    test_id: 1,
    status: "failed",
    environment: "local",
    branch: "dev",
    commit_hash: "def456",
    duration_ms: 1800,
    started_at: new Date().toISOString(),
    finished_at: new Date().toISOString()
  }
];

export function registerRunsRoutes(app) {
  // GET /v1/runs - list runs (mock)
  app.get("/v1/runs", (req, res) => {
    res.json({
      data: mockRuns
    });
  });

  // POST /v1/runs - create new run (in-memory for now)
  app.post("/v1/runs", (req, res) => {
    const { test_id, status, environment, branch, commit_hash, duration_ms } = req.body || {};
    if (!test_id || !status) {
      return res
        .status(400)
        .json({ error: "test_id and status are required" });
    }

    const newRun = {
      id: mockRuns.length + 1,
      test_id,
      status,
      environment: environment || "local",
      branch: branch || "dev",
      commit_hash: commit_hash || null,
      duration_ms: duration_ms || null,
      started_at: new Date().toISOString(),
      finished_at: new Date().toISOString()
    };

    mockRuns.push(newRun);

    res.status(201).json({
      message: "Run created (mock only)",
      data: newRun
    });
  });
}