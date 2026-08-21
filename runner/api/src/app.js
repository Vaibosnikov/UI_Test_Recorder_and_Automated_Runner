const express = require("express");
const cors = require("cors");
const helmet = require("@fastify/helmet");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.get("/v1/health", (req, res) => res.json({ status: "ok" }));
app.get("/v1/runs", (req, res) => res.json({ status: "ok", runs: [] }));
app.post("/v1/runs", (req, res) => {
  const { events } = req.body || {};
  if (!Array.isArray(events)) {
    return res.status(400).json({ error: "events must be an array" });
  }
  res.json({ status: "ok" });
});
app.post("/v1/scripts/generate", (req, res) => {
  const { events, testName, testDescription } = req.body || {};
  if (!Array.isArray(events)) {
    return res.status(400).json({ error: "events must be an array" });
  }
  res.json({
    status: "ok",
    script: `// ${testName || "Generated Test"}\n// ${testDescription || ""}\n`,
  });
});

module.exports = app;
