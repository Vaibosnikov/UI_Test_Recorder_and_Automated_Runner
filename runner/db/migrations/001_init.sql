-- Migration: 001_init.sql
-- Initial schema for TestCraft
-- File: runner/db/migrations/001_init.sql

BEGIN;

CREATE TABLE IF NOT EXISTS projects (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(255) NOT NULL,
  description  TEXT,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tests (
  id           SERIAL PRIMARY KEY,
  project_id   INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name         VARCHAR(255) NOT NULL,
  description  TEXT,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS test_steps (
  id           SERIAL PRIMARY KEY,
  test_id      INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  order_index  INTEGER NOT NULL,
  action       VARCHAR(100) NOT NULL,
  selector     TEXT NOT NULL,
  value        TEXT,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS runs (
  id             SERIAL PRIMARY KEY,
  test_id        INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  status         VARCHAR(30) NOT NULL,
  environment    VARCHAR(100),
  branch         VARCHAR(100),
  commit_hash    VARCHAR(80),
  duration_ms    INTEGER,
  started_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  finished_at    TIMESTAMP WITH TIME ZONE,
  created_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS artifacts (
  id           SERIAL PRIMARY KEY,
  run_id       INTEGER NOT NULL REFERENCES runs(id) ON DELETE CASCADE,
  type         VARCHAR(50) NOT NULL,
  path         TEXT NOT NULL,
  label        VARCHAR(255),
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS baselines (
  id           SERIAL PRIMARY KEY,
  test_id      INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  image_path   TEXT NOT NULL,
  version      INTEGER NOT NULL DEFAULT 1,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tests_project_id
  ON tests (project_id);

CREATE INDEX IF NOT EXISTS idx_test_steps_test_id_order_index
  ON test_steps (test_id, order_index);

CREATE INDEX IF NOT EXISTS idx_runs_test_id_status
  ON runs (test_id, status);

CREATE INDEX IF NOT EXISTS idx_artifacts_run_id_type
  ON artifacts (run_id, type);

CREATE INDEX IF NOT EXISTS idx_baselines_test_id_version
  ON baselines (test_id, version);

COMMIT;