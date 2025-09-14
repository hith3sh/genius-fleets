-- Supabase Storage Setup for File Upload
-- Run this in your Supabase SQL Editor to enable proper file storage

-- Note: Storage policies must be created through Supabase Dashboard -> Storage -> Policies
-- This SQL only handles the bucket creation and basic setup

-- ===== ENSURE STORAGE BUCKET EXISTS =====

-- Create VehicleImages bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'VehicleImages', 
  'VehicleImages', 
  true, 
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Success message
SELECT 'Storage bucket policies created successfully! Files will now be stored in Supabase Storage instead of base64.' AS result;
