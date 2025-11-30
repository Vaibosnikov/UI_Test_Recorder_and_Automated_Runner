// Builds and configures the Express app

import express from "express";
import { registerCors } from "./plugins/cors.js";
import { registerHealthRoutes } from "./routes/health.routes.js";
import { registerTestsRoutes } from "./routes/tests.routes.js";
import { registerRunsRoutes } from "./routes/runs.routes.js";

export function createApp() {
  const app = express();

  // Core middleware
  app.use(express.json());

  // CORS setup
  registerCors(app);

  // Routes
  registerHealthRoutes(app);
  registerTestsRoutes(app);
  registerRunsRoutes(app);

  return app;
}