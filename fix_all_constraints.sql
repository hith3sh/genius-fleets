-- Fix all NOT NULL constraints that have empty values in CSV data
-- Run this before the import script

BEGIN;

-- Fix customer table
ALTER TABLE customer ALTER COLUMN phone DROP NOT NULL;

-- Fix vehicle table - these fields are required in schema but have empty values in CSV
ALTER TABLE vehicle ALTER COLUMN daily_rate DROP NOT NULL;
ALTER TABLE vehicle ALTER COLUMN monthly_rate DROP NOT NULL;

-- Set default values for better data integrity (optional)
ALTER TABLE vehicle ALTER COLUMN daily_rate SET DEFAULT 0;
ALTER TABLE vehicle ALTER COLUMN monthly_rate SET DEFAULT 0;

-- Check for other potential NOT NULL issues by examining the schema
-- Let's also handle any other required fields that might be empty

COMMIT;

-- Verify the changes
SELECT table_name, column_name, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name IN ('customer', 'vehicle') 
AND column_name IN ('phone', 'daily_rate', 'monthly_rate')
ORDER BY table_name, column_name;