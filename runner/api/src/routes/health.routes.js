// Health-check routes

export function registerHealthRoutes(app) {
  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      service: "TestCraft Backend API",
      timestamp: new Date().toISOString()
    });
  });

  // Optional root route
  app.get("/", (req, res) => {
    res.send("TestCraft Backend API is live 🚀");
  });
}
