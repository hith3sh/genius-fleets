-- Fix NOT NULL constraints for import
-- Run this before running the import script

-- Option 1: Make phone nullable (recommended since CSV has empty values)
ALTER TABLE customer ALTER COLUMN phone DROP NOT NULL;

-- Option 2: Alternative - you could set a default value instead
-- ALTER TABLE customer ALTER COLUMN phone SET DEFAULT 'N/A';

-- Check other potential NOT NULL issues that might occur
-- Look at the schema for other required fields that might have empty values in CSV

-- Verify the change
SELECT column_name, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = 'customer' AND column_name = 'phone';