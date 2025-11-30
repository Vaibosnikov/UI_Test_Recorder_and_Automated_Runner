-- Seed data for local development
-- File: runner/db/seed.sql

-- Insert one demo project
INSERT INTO projects (name, description)
VALUES ('Demo Project', 'Sample project for TestCraft demo')
ON CONFLICT DO NOTHING;

-- Insert one demo test
INSERT INTO tests (project_id, name, description)
VALUES (
  (SELECT id FROM projects WHERE name = 'Demo Project' LIMIT 1),
  'Login Page Smoke Test',
  'Basic smoke test for login page UI'
);

-- Insert some demo steps
INSERT INTO test_steps (test_id, order_index, action, selector, value)
VALUES
(
  (SELECT id FROM tests WHERE name = 'Login Page Smoke Test' LIMIT 1),
  1,
  'navigate',
  'https://example.com/login',
  NULL
),
(
  (SELECT id FROM tests WHERE name = 'Login Page Smoke Test' LIMIT 1),
  2,
  'input',
  '#email',
  'user@example.com'
),
(
  (SELECT id FROM tests WHERE name = 'Login Page Smoke Test' LIMIT 1),
  3,
  'input',
  '#password',
  'password123'
),
(
  (SELECT id FROM tests WHERE name = 'Login Page Smoke Test' LIMIT 1),
  4,
  'click',
  'button[type="submit"]',
  NULL
);

-- Insert a demo run
INSERT INTO runs (test_id, status, environment, branch, duration_ms)
VALUES (
  (SELECT id FROM tests WHERE name = 'Login Page Smoke Test' LIMIT 1),
  'passed',
  'local',
  'dev',
  1500
);

-- Insert a demo artifact
INSERT INTO artifacts (run_id, type, path, label)
VALUES (
  (SELECT id FROM runs ORDER BY id DESC LIMIT 1),
  'screenshot',
  '/artifacts/screenshots/login-success.png',
  'Login success screenshot'
);
