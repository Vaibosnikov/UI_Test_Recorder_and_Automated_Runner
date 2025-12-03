import { createApp } from "./app.js";
import { config } from "./config/env.js";
import resultsRoutes from "./routes/results.routes.js";

const app = createApp();

// Register results upload route
app.use("/", resultsRoutes);

// Health route for health-check.js
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = (config && config.port) || process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` API server running at http://localhost:${PORT}`);
});
