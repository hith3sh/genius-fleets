# 🚀 Supabase to Railway Migration Guide

## Overview
Complete guide for migrating Genius Fleets car rental management system from Supabase to Railway with Auth0 authentication and Railway volume storage.

---

## 📋 Pre-Migration Checklist

- [ ] Export Supabase database
- [ ] Set up Railway account
- [ ] Create Auth0 application
- [ ] Plan file storage migration
- [ ] Test locally before deploying

---

## 🗄️ Database Migration

### Step 1: Export Supabase Data
```bash
# Get your Supabase connection string from dashboard
pg_dump "postgresql://[user]:[password]@[host]:[port]/[database]" > supabase_backup.sql
```

### Step 2: Set up Railway PostgreSQL
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and create project
railway login
railway new genius-fleets

# Add PostgreSQL service
railway add postgresql

# Get connection string
railway variables
```

### Step 3: Import Data to Railway
```bash
# Import your data
psql $DATABASE_URL < supabase_backup.sql
```

---

## 🔐 Authentication Migration (Supabase Auth → Auth0)

### Step 1: Install Auth0
```bash
npm install @auth0/nextjs-auth0
```

### Step 2: Create Auth0 Application
1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Create new application (Single Page Application)
3. Configure settings:
   - **Allowed Callback URLs**: `https://your-app.railway.app/api/auth/callback`
   - **Allowed Logout URLs**: `https://your-app.railway.app`
   - **Allowed Web Origins**: `https://your-app.railway.app`

### Step 3: Files to Change

#### A. Create Auth0 API Routes
**File**: `pages/api/auth/[...auth0].js` (NEW)
```javascript
import { handleAuth, handleLogin, handleLogout, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: handleLogin({
    authorizationParams: {
      scope: 'openid profile email',
      audience: process.env.AUTH0_AUDIENCE,
    },
  }),
  logout: handleLogout({
    returnTo: process.env.AUTH0_BASE_URL,
  }),
  callback: handleCallback({
    afterCallback: (req, res, session) => {
      console.log('✅ Auth0: User authenticated successfully');
      return session;
    },
  }),
});
```

#### B. Update AuthContext
**File**: `src/contexts/AuthContext.jsx`
```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export function AuthProvider({ children }) {
  const { user: auth0User, error: auth0Error, isLoading } = useUser();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Transform Auth0 user to our format
  useEffect(() => {
    if (auth0User) {
      const transformedUser = {
        id: auth0User.sub,
        email: auth0User.email,
        name: auth0User.name,
        picture: auth0User.picture,
        role: auth0User['https://genius-fleets.com/roles']?.[0] || 'Staff',
        accessible_modules: auth0User['https://genius-fleets.com/modules'] || ['Fleet Health', 'Bookings'],
        email_verified: auth0User.email_verified,
        created_at: auth0User.created_at,
        updated_at: auth0User.updated_at,
      };
      setUser(transformedUser);
    } else {
      setUser(null);
    }
    setLoading(isLoading);
    setError(auth0Error?.message || null);
  }, [auth0User, auth0Error, isLoading]);

  // Auth functions now redirect to Auth0
  const signIn = async (email, password) => {
    window.location.href = '/api/auth/login';
    return { success: true };
  };

  const signUp = async (userData) => {
    window.location.href = '/api/auth/login?screen_hint=signup';
    return { success: true };
  };

  const signOut = async () => {
    window.location.href = '/api/auth/logout';
    return { success: true };
  };

  const resetPassword = async (email) => {
    window.location.href = '/api/auth/login?screen_hint=forgot_password';
    return { success: true };
  };

  const hasAccess = async (module) => {
    if (!user) return false;
    return user.accessible_modules?.includes(module) || false;
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    hasAccess
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

#### C. Update Login Components
**File**: `src/components/auth/Login.jsx`
```javascript
// Replace Supabase auth calls with Auth0 redirects
const handleSubmit = async (e) => {
  e.preventDefault();
  // Redirect to Auth0 login
  window.location.href = '/api/auth/login';
};
```

---

## 📁 Storage Migration (Supabase Storage → Railway Volumes)

### Step 1: Set up Railway Volume
```bash
# Add volume to Railway project
railway add volume --name fleet-storage
```

### Step 2: Files to Change

#### A. Update File Upload Logic
**File**: `src/api/integrations.js`
```javascript
// Replace Supabase Storage with Railway volume storage
export const Core = {
  UploadFile: async ({ file, bucket = 'images', folder = 'uploads' }) => {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = file.name.split('.').pop();
      const fileName = `${folder}/${timestamp}_${randomString}.${fileExtension}`;

      // Create storage directory structure
      const storageBasePath = process.env.STORAGE_PATH || '/app/storage';
      const bucketPath = path.join(storageBasePath, bucket);
      const filePath = path.join(bucketPath, fileName);

      // Ensure directory exists
      if (!fs.existsSync(bucketPath)) {
        fs.mkdirSync(bucketPath, { recursive: true });
      }

      // Convert file to buffer
      let fileBuffer;
      if (file instanceof File) {
        fileBuffer = Buffer.from(await file.arrayBuffer());
      } else if (file.buffer) {
        fileBuffer = file.buffer;
      } else {
        fileBuffer = Buffer.from(file);
      }

      // Write file to storage
      fs.writeFileSync(filePath, fileBuffer);

      // Generate public URL
      const publicUrl = `/api/files/${bucket}/${fileName}`;

      return {
        file_url: publicUrl,
        file_name: fileName,
        file_size: fileBuffer.length,
        file_type: file.type,
        bucket: bucket,
        path: filePath
      };
    } catch (error) {
      console.error('Railway volume upload error:', error);
      throw new Error(`File upload failed: ${error.message}`);
    }
  }
};
```

#### B. Create File Serving API
**File**: `pages/api/files/[bucket]/[...filename].js` (NEW)
```javascript
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { bucket, filename } = req.query;
  
  if (!bucket || !filename) {
    return res.status(400).json({ error: 'Missing bucket or filename parameter' });
  }

  try {
    // Construct file path
    const storageBasePath = process.env.STORAGE_PATH || '/app/storage';
    const filePath = path.join(storageBasePath, bucket, ...filename);

    // Security check
    const resolvedPath = path.resolve(filePath);
    const resolvedStoragePath = path.resolve(storageBasePath);
    
    if (!resolvedPath.startsWith(resolvedStoragePath)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Get file stats and content type
    const stats = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.txt': 'text/plain',
      '.csv': 'text/csv',
      '.json': 'application/json',
      '.zip': 'application/zip',
      '.mp4': 'video/mp4',
      '.mp3': 'audio/mpeg',
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Set headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.setHeader('Last-Modified', stats.mtime.toUTCString());

    // Stream the file
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);

  } catch (error) {
    console.error('File serving error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

#### C. Update All File Upload Components
**Files to update**:
- `src/pages/VehicleImageLibrary.jsx`
- `src/pages/VehicleDocuments.jsx`
- `src/pages/CustomerDocuments.jsx`
- `src/pages/StaffDocuments.jsx`
- `src/pages/LegalDocuments.jsx`
- `src/pages/AIDocumentProcessing.jsx`

**Change**: Replace Supabase Storage URLs with `/api/files/` URLs
```javascript
// Before
const { data, error } = await supabase.storage
  .from('VehicleImages')
  .upload(fileName, file);

// After
const result = await UploadFile({ 
  file, 
  bucket: 'images', 
  folder: 'vehicles' 
});
// result.file_url = '/api/files/images/vehicles/filename.jpg'
```

---

## ⚙️ Railway Configuration

### Step 1: Create Railway Config
**File**: `railway.toml` (NEW)
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm run start"
healthcheckPath = "/api/health"
healthcheckTimeout = 300

# Volume mounts for file storage
[[mounts]]
source = "fleet-storage"
target = "/app/storage"

# Environment variables
[env]
NODE_ENV = "production"
STORAGE_PATH = "/app/storage"
```

### Step 2: Update Package.json
**File**: `package.json`
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "start": "vite preview --port $PORT --host 0.0.0.0",
    "start:railway": "npm run build && npm run start",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@auth0/nextjs-auth0": "^4.10.0",
    // ... other dependencies
  }
}
```

### Step 3: Create Health Check
**File**: `pages/api/health.js` (NEW)
```javascript
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      storage: {
        available: false,
        path: process.env.STORAGE_PATH || '/app/storage',
        writable: false
      },
      database: {
        connected: false,
        url: process.env.DATABASE_URL ? 'configured' : 'not configured'
      },
      auth: {
        provider: 'Auth0',
        configured: !!(process.env.AUTH0_SECRET && process.env.AUTH0_BASE_URL)
      }
    };

    // Check storage availability
    const storagePath = process.env.STORAGE_PATH || '/app/storage';
    try {
      if (fs.existsSync(storagePath)) {
        health.storage.available = true;
        
        // Test write access
        const testFile = path.join(storagePath, '.health-check');
        fs.writeFileSync(testFile, 'health check');
        fs.unlinkSync(testFile);
        health.storage.writable = true;
      }
    } catch (error) {
      console.error('Storage health check failed:', error);
    }

    const statusCode = health.storage.available && health.storage.writable ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
}
```

---

## 🔧 Environment Variables

### Railway Environment Variables
Set these in Railway Dashboard:

```bash
# Database (auto-generated by Railway)
DATABASE_URL=postgresql://username:password@host:port/database

# Auth0 Configuration
AUTH0_SECRET=your-auth0-secret-here
AUTH0_BASE_URL=https://your-app.railway.app
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
AUTH0_AUDIENCE=your-api-audience

# Storage Configuration
STORAGE_PATH=/app/storage

# JWT Configuration
JWT_SECRET=your-jwt-secret-here

# Application
NODE_ENV=production
PORT=3000
```

### Auth0 User Metadata
Configure in Auth0 Dashboard → Users → User Metadata:

```json
{
  "https://genius-fleets.com/roles": ["Management"],
  "https://genius-fleets.com/modules": [
    "Fleet Health",
    "Bookings", 
    "Finance",
    "HR",
    "Settings"
  ]
}
```

---

## 📁 Volume Structure

Your Railway volume will be mounted at `/app/storage`:

```
/app/storage/
├── images/
│   ├── vehicles/          # Vehicle images (was VehicleImages bucket)
│   ├── customers/         # Customer photos
│   └── staff/            # Staff photos
├── documents/
│   ├── vehicle-docs/     # Vehicle documents
│   ├── customer-docs/    # Customer documents
│   ├── staff-docs/       # Staff documents
│   ├── legal-docs/       # Legal documents
│   └── ai-processed/     # AI processed documents
├── reports/              # Generated reports (CSV exports)
└── temp/                 # Temporary uploads
```

---

## 🚀 Deployment Steps

### Step 1: Deploy to Railway
```bash
# Login to Railway
railway login

# Create project
railway new genius-fleets

# Add services
railway add postgresql
railway add volume --name fleet-storage

# Deploy
railway up
```

### Step 2: Configure Environment Variables
1. Go to Railway Dashboard
2. Select your project
3. Go to Variables tab
4. Add all environment variables from the list above

### Step 3: Test Deployment
```bash
# Check health
curl https://your-app.railway.app/api/health

# Check logs
railway logs

# Test file serving
curl https://your-app.railway.app/api/files/images/test.jpg
```

---

## 🔄 Code Changes Summary

### Files to Create (NEW)
- `pages/api/auth/[...auth0].js`
- `pages/api/files/[bucket]/[...filename].js`
- `pages/api/health.js`
- `railway.toml`

### Files to Modify
- `src/contexts/AuthContext.jsx` - Replace Supabase Auth with Auth0
- `src/api/integrations.js` - Replace Supabase Storage with Railway volumes
- `package.json` - Add Auth0 dependency and Railway scripts
- All file upload components - Update to use new file URLs

### Files to Remove
- `src/lib/railway-db.js` (if only used for auth/storage)
- Supabase-specific auth components

---

## 🧪 Testing Checklist

- [ ] Auth0 login/logout works
- [ ] File uploads work with Railway volumes
- [ ] File serving API works
- [ ] Database queries work
- [ ] All CRUD operations work
- [ ] Health check endpoint works
- [ ] User roles and permissions work
- [ ] All pages load correctly

---

## 🚨 Important Notes

1. **File URLs**: All file URLs change from Supabase Storage URLs to `/api/files/` endpoints
2. **Authentication**: Users will be redirected to Auth0 for login/signup
3. **Storage**: Files are stored locally on Railway volumes (persistent)
4. **Backup**: Implement regular backups of both database and volume
5. **Scaling**: Consider external storage (S3) for high-traffic production

---

## 🔧 Troubleshooting

### File Upload Issues
```bash
# Check volume mount
railway run ls -la /app/storage

# Check file permissions
railway run ls -la /app/storage/images/
```

### Database Connection
```bash
# Test database connection
railway run psql $DATABASE_URL -c "SELECT 1;"
```

### Auth0 Issues
- Check callback URLs in Auth0 dashboard
- Verify environment variables are set
- Check browser console for Auth0 errors

---

## 📈 Post-Migration

1. **Monitor**: Set up monitoring and alerts
2. **Backup**: Implement backup strategy for volume
3. **CDN**: Consider CDN for static files
4. **Staging**: Set up staging environment
5. **Documentation**: Update team documentation

---

## 🆘 Support Resources

- [Railway Docs](https://docs.railway.app/)
- [Auth0 Docs](https://auth0.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- Health Check: `https://your-app.railway.app/api/health`

---

**Migration Complete!** 🎉

Your Genius Fleets application is now running on Railway with Auth0 authentication and Railway volume storage.
