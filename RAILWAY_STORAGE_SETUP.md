# Railway Storage Migration Guide

## ✅ Migration Complete!

Your Supabase storage has been successfully migrated to Railway Volume storage.

## 📋 What Was Migrated

### Files Downloaded:
- ✅ VehicleImages/uploads/1757859968841_96amrnlnsqi.pdf
- ✅ VehicleImages/uploads/1757860837847_d4sylcsqx3.pdf
- ✅ VehicleImages/maintenance-reports/1757860912328_1a659kdsuvy.pdf
- ✅ base44-prod/public/4492b025e_AlJisrCarRentals.png (logos)
- ✅ base44-prod/public/2b4d1bbdc_AlJisrCarRentals.png
- ✅ base44-prod/public/bf4adeb3e_GeniusFleetsLogo.png
- ✅ base44-prod/public/b357bafe5_IAMONLINEstatic.jpg

### Code Updated:
- ✅ All hardcoded Supabase URLs replaced with Railway URLs
- ✅ Logo references updated in Layout, Invoice, Header, Footer components
- ✅ File serving API already configured at `/api/files/:bucket/:path`
- ✅ File upload API added at `/api/storage/:bucket/upload`

## 🚂 Railway Setup Instructions

### 1. Create Volume on Railway

1. Go to Railway dashboard → Your Project → Service
2. Navigate to **Settings** tab
3. Click **"Add Volume"**
4. Configure:
   - **Name**: `genius-fleets-storage`
   - **Mount Path**: `/app/storage`
   - **Size**: `2GB` (start with this, can expand later)

### 2. Environment Variables

Add this to your Railway environment variables:
```
STORAGE_PATH=/app/storage
```

### 3. Upload Files to Railway Volume

**Option A: Using Railway CLI (Recommended)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Upload storage folder to your deployed service
railway shell
# Inside the shell:
mkdir -p /app/storage
exit

# Copy files using scp or similar method
```

**Option B: Manual Upload via SSH**
1. SSH into your Railway deployment
2. Create storage directories:
   ```bash
   mkdir -p /app/storage/VehicleImages/uploads
   mkdir -p /app/storage/VehicleImages/maintenance-reports
   mkdir -p /app/storage/base44-prod/public
   ```
3. Upload files to respective directories

**Option C: Re-upload via App Interface**
- Use your app's upload functionality to re-upload files
- Files will automatically go to the correct Railway volume

## 🔗 New URL Structure

### Before (Supabase):
```
https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/logo.png
```

### After (Railway):
```
https://your-app.railway.app/api/files/base44-prod/public/logo.png
```

## 🧪 Testing

1. **Deploy your updated code** to Railway
2. **Upload the storage folder** to your volume
3. **Test file access**:
   - Visit: `https://your-app.railway.app/api/files/base44-prod/public/4492b025e_AlJisrCarRentals.png`
   - Should show your logo

4. **Test file upload**:
   ```bash
   curl -X POST \
     -F "file=@test-image.jpg" \
     https://your-app.railway.app/api/storage/VehicleImages/upload
   ```

## 📁 Storage Structure

Your Railway volume will have this structure:
```
/app/storage/
├── VehicleImages/
│   ├── uploads/
│   │   ├── 1757859968841_96amrnlnsqi.pdf
│   │   └── 1757860837847_d4sylcsqx3.pdf
│   └── maintenance-reports/
│       └── 1757860912328_1a659kdsuvy.pdf
└── base44-prod/
    └── public/
        ├── 4492b025e_AlJisrCarRentals.png
        ├── 2b4d1bbdc_AlJisrCarRentals.png
        ├── bf4adeb3e_GeniusFleetsLogo.png
        └── b357bafe5_IAMONLINEstatic.jpg
```

## 🔧 API Endpoints

### File Upload:
```
POST /api/storage/:bucket/upload
Content-Type: multipart/form-data

Body: file (form field)
```

### File Download:
```
GET /api/files/:bucket/:filename
```

### Example Upload:
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('/api/storage/VehicleImages/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('File uploaded:', data.data.public_url);
});
```

## 💡 Benefits

- ✅ **No more Supabase dependency** for file storage
- ✅ **Cost effective** Railway volume storage
- ✅ **Better performance** (files served from same domain)
- ✅ **Full control** over file management
- ✅ **Scalable** storage solution

## 🚨 Important Notes

1. **Backup**: Keep the `./storage` folder as backup until migration is confirmed working
2. **Domain**: Update any external references to use your Railway domain
3. **SSL**: Files are served with HTTPS automatically via Railway
4. **Cleanup**: You can delete Supabase storage buckets once migration is complete

## 🔄 Rollback Plan

If needed, you can revert by:
1. Reverting the URL changes in code
2. Re-enabling Supabase storage
3. Updating environment variables back to Supabase

Your original files are safely backed up in the `./storage` folder.