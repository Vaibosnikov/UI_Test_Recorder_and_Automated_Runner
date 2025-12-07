// Mock routes for tests

const mockTests = [
  {
    id: 1,
    project_id: 1,
    name: "Login Page Smoke Test",
    description: "Basic smoke test for login UI",
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    project_id: 1,
    name: "Signup Flow Test",
    description: "Covers signup form and validation",
    is_active: true,
    created_at: new Date().toISOString()
  }
];

export function registerTestsRoutes(app) {
  // GET /v1/tests - list tests (mock)
  app.get("/v1/tests", (req, res) => {
    res.json({
      data: mockTests
    });
  });

  // POST /v1/tests - create a new test (in-memory for now)
  app.post("/v1/tests", (req, res) => {
    const { name, description, project_id } = req.body || {};
    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }

    const newTest = {
      id: mockTests.length + 1,
      project_id: project_id || 1,
      name,
      description: description || "",
      is_active: true,
      created_at: new Date().toISOString()
    };

    mockTests.push(newTest);

    res.status(201).json({
      message: "Test created (mock only)",
      data: newTest
    });
  });
}