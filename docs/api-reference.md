# API Reference

Base URL: `http://localhost:3000/api`

## Health

### GET /health

Check API server status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-08-18T00:00:00.000Z"
}
```

## Tests

### POST /tests

Create a new test definition.

**Request Body:**
```json
{
  "name": "Login Test",
  "description": "Tests user login flow",
  "script": "path/to/test.spec.js",
  "recordingId": "rec_123"
}
```

**Response:**
```json
{
  "id": "test_456",
  "name": "Login Test",
  "createdAt": "2025-08-18T00:00:00.000Z"
}
```

### GET /tests

List all tests.

**Query Parameters:**
- `limit` (optional) - Number of results (default: 10)
- `offset` (optional) - Pagination offset

### GET /tests/:id

Get a specific test by ID.

### DELETE /tests/:id

Delete a test.

## Runs

### POST /runs

Execute a test run.

**Request Body:**
```json
{
  "testId": "test_456",
  "environment": "staging"
}
```

**Response:**
```json
{
  "id": "run_789",
  "testId": "test_456",
  "status": "running",
  "startedAt": "2025-08-18T00:00:00.000Z"
}
```

### GET /runs

List all test runs.

### GET /runs/:id

Get run details including results.

### POST /runs/:id/results

Upload test results (called by runner after execution).

## Recordings

### POST /recordings

Upload a recorded JSON file from the recorder.

### GET /recordings/:id

Retrieve a recording by ID.
