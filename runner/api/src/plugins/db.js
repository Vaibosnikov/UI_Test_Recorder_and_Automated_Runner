// Database plugin (placeholder for future PostgreSQL integration)
// For Phase 3, we keep this as a stub.

import { config } from "../config/env.js";

// In the future, import { Pool } from "pg" and create a pool here.
export const db = {
  async query(_text, _params) {
    throw new Error("Database not connected yet. This will be implemented in the next phase.");
  },
  config
};