# Supabase Storage Setup for Vehicle Images

## Quick Fix for "Bucket not found" Error

The Vehicle Image Library requires a Supabase Storage bucket to store uploaded images. Here's how to set it up:

### Method 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase Dashboard**
   - Navigate to https://supabase.com/dashboard
   - Select your project

2. **Create Storage Bucket**
   - Go to **Storage** in the left sidebar
   - Click **"New bucket"**
   - Name: `VehicleImages` (note the capitalization)
   - Make it **Public** (so images can be accessed via URL)
   - Click **"Create bucket"**

3. **Set Bucket Policies**
   - Go to **Storage** → **Policies**
   - Click **"New Policy"** for the `VehicleImages` bucket
   - Add these policies:

   ```sql
   -- Allow authenticated users to upload files
   CREATE POLICY "Authenticated users can upload files" ON storage.objects
   FOR INSERT WITH CHECK (auth.role() = 'authenticated');

   -- Allow public access to view files
   CREATE POLICY "Public access to view files" ON storage.objects
   FOR SELECT USING (true);
   ```

### Method 2: Using SQL (Alternative)

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('VehicleImages', 'VehicleImages', true);

-- Create policies for the bucket
CREATE POLICY "Authenticated users can upload files" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public access to view files" ON storage.objects
FOR SELECT USING (true);
```

### Method 3: Automatic Setup (Current Implementation)

The application will now automatically:
1. Check if the `vehicle-images` bucket exists
2. Try to create it if it doesn't exist
3. Fall back to base64 storage if bucket creation fails

## Verification

After setting up the bucket:

1. **Test Upload**: Try uploading an image in the Vehicle Image Library
2. **Check Console**: Look for success messages in browser console
3. **Verify Storage**: Check the Storage section in Supabase Dashboard

## Troubleshooting

- **"Bucket not found"**: The bucket doesn't exist - follow Method 1 or 2 above
- **"Permission denied"**: RLS policies need to be set - follow the policy setup above
- **Images not displaying**: Check if the bucket is set to public
- **Upload still fails**: The app will use base64 fallback (temporary storage)

## Current Status

✅ **Fixed**: Upload function with automatic bucket creation
✅ **Fixed**: Base64 fallback for when storage is unavailable  
✅ **Fixed**: Better error messages and user feedback
✅ **Fixed**: Query issues with car_image table

The Vehicle Image Library should now work with either proper Supabase Storage or temporary base64 storage!
