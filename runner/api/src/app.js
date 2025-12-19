// Builds and configures the Express app

import express from "express";
import { registerCors } from "./plugins/cors.js";

import { registerHealthRoutes } from "./routes/health.routes.js";
import { registerTestsRoutes } from "./routes/tests.routes.js";
import { registerRunsRoutes } from "./routes/runs.routes.js";

import { runRecording, runTests, openPlaywrightReport } from "./routes/recordings.js";

export function createApp() {
  const app = express();

  // ----------------------------
  // Core middleware
  // ----------------------------
  app.use(express.json());

  // ----------------------------
  // CORS (must be before routes)
  // ----------------------------
  registerCors(app);

  // ----------------------------
  // Routes
  // ----------------------------
  registerHealthRoutes(app);
  registerTestsRoutes(app);
  registerRunsRoutes(app);

  // ----------------------------
  // Recorder → Runner bridge
  // ----------------------------

  // Convert recording → Playwright spec
  app.post("/v1/recordings/run", runRecording);

  // Run generated Playwright tests
  app.post("/v1/recordings/run-tests", runTests);

  // Open Playwright HTML report
  app.post("/v1/reports/playwright", openPlaywrightReport); 

  return app;
}