#!/bin/bash

# Clean Supabase dump for Railway import (data only)
# This removes all schema creation and Supabase-specific commands

echo "Cleaning Supabase dump for Railway import..."

# Create a clean data-only file
sed \
  -e '/^CREATE TABLE/,/^);$/d' \
  -e '/^CREATE UNIQUE INDEX/d' \
  -e '/^CREATE INDEX/d' \
  -e '/^CREATE POLICY/d' \
  -e '/^ALTER TABLE.*ADD CONSTRAINT/d' \
  -e '/^ALTER TABLE.*ENABLE ROW LEVEL SECURITY/d' \
  -e '/^CREATE TRIGGER/d' \
  -e '/^CREATE OR REPLACE FUNCTION/d' \
  -e '/^CREATE EXTENSION/d' \
  -e '/^ALTER DEFAULT PRIVILEGES/d' \
  -e '/^GRANT/d' \
  -e '/^REVOKE/d' \
  -e '/^SET /d' \
  -e '/^SELECT pg_catalog\.set_config/d' \
  -e '/extensions\./d' \
  -e '/auth\./d' \
  -e '/storage\./d' \
  -e '/realtime\./d' \
  -e '/^--/d' \
  -e '/^$/d' \
  supabase_data_full.sql > supabase_data_clean.sql

echo "Created clean data file: supabase_data_clean.sql"
echo "Now run: psql your-railway-connection-string < supabase_data_clean.sql"