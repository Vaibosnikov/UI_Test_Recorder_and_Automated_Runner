import express from "express";

const router = express.Router();

// Simple JSON upload endpoint  no files, no Busboy, no multipart
router.post("/results/upload", express.json(), (req, res) => {
  const body = req.body || {};
  if (!body.runId) {
    return res.status(400).json({ error: "runId missing" });
  }
  res.json({ status: "ok", received: body });
});

export default router;
