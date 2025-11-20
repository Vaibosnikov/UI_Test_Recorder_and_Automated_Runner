# TestCraft Database Schema

This folder contains the PostgreSQL schema, migrations, and seed data
for the TestCraft backend.

## Files

- `schema.sql`  
  Full schema for:
  - `projects`
  - `tests`
  - `test_steps`
  - `runs`
  - `artifacts`
  - `baselines`

- `migrations/001_init.sql`  
  Initial migration script to create all tables and indexes.

- `seed.sql`  
  Demo data:
  - One sample project
  - One sample test with steps
  - One sample run
  - One sample artifact

## Usage (to be used later)

Once PostgreSQL is ready and configured:

```bash
psql -U <user> -d testcraft_db -f runner/db/schema.sql
psql -U <user> -d testcraft_db -f runner/db/seed.sql
```