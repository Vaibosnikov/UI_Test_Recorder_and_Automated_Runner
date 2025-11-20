-- TestCraft PostgreSQL Schema
-- File: runner/db/schema.sql

-- Drop tables if they exist (for local dev only)
DROP TABLE IF EXISTS artifacts CASCADE;
DROP TABLE IF EXISTS baselines CASCADE;
DROP TABLE IF EXISTS runs CASCADE;
DROP TABLE IF EXISTS test_steps CASCADE;
DROP TABLE IF EXISTS tests CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- Projects: high-level grouping of tests
CREATE TABLE projects (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(255) NOT NULL,
  description  TEXT,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tests: a single recorded or authored test case
CREATE TABLE tests (
  id           SERIAL PRIMARY KEY,
  project_id   INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name         VARCHAR(255) NOT NULL,
  description  TEXT,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Steps: atomic actions inside a test
CREATE TABLE test_steps (
  id           SERIAL PRIMARY KEY,
  test_id      INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  order_index  INTEGER NOT NULL,
  action       VARCHAR(100) NOT NULL,  -- click, input, navigate etc.
  selector     TEXT NOT NULL,          -- CSS/XPath selector
  value        TEXT,                   -- value for input, etc.
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Runs: execution instances of a test
CREATE TABLE runs (
  id             SERIAL PRIMARY KEY,
  test_id        INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  status         VARCHAR(30) NOT NULL,   -- queued, running, passed, failed
  environment    VARCHAR(100),           -- local, ci, staging
  branch         VARCHAR(100),           -- git branch
  commit_hash    VARCHAR(80),            -- git commit hash
  duration_ms    INTEGER,
  started_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  finished_at    TIMESTAMP WITH TIME ZONE,
  created_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Artifacts: screenshots, reports, traces etc.
CREATE TABLE artifacts (
  id           SERIAL PRIMARY KEY,
  run_id       INTEGER NOT NULL REFERENCES runs(id) ON DELETE CASCADE,
  type         VARCHAR(50) NOT NULL,     -- screenshot, html-report, trace, etc.
  path         TEXT NOT NULL,            -- file path or URL
  label        VARCHAR(255),
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Baselines: visual comparison checkpoints per test
CREATE TABLE baselines (
  id           SERIAL PRIMARY KEY,
  test_id      INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  image_path   TEXT NOT NULL,
  version      INTEGER NOT NULL DEFAULT 1,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes

CREATE INDEX idx_tests_project_id
  ON tests (project_id);

CREATE INDEX idx_test_steps_test_id_order_index
  ON test_steps (test_id, order_index);

CREATE INDEX idx_runs_test_id_status
  ON runs (test_id, status);

CREATE INDEX idx_artifacts_run_id_type
  ON artifacts (run_id, type);

CREATE INDEX idx_baselines_test_id_version
  ON baselines (test_id, version);