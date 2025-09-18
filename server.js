import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes
// Health check endpoint
app.get('/api/health', (req, res) => {
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
        configured: !!(process.env.VITE_AUTH0_DOMAIN && process.env.VITE_AUTH0_CLIENT_ID)
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
});

// File serving endpoint
app.get('/api/files/:bucket/*', (req, res) => {
  const { bucket } = req.params;
  const filename = req.params[0];

  if (!bucket || !filename) {
    return res.status(400).json({ error: 'Missing bucket or filename parameter' });
  }

  try {
    // Construct file path
    const storageBasePath = process.env.STORAGE_PATH || '/app/storage';
    const filePath = path.join(storageBasePath, bucket, filename);

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
});

// Serve React app for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📁 Storage path: ${process.env.STORAGE_PATH || '/app/storage'}`);
  console.log(`🗄️ Database: ${process.env.DATABASE_URL ? 'configured' : 'not configured'}`);
  console.log(`🔐 Auth0: ${process.env.VITE_AUTH0_DOMAIN ? 'configured' : 'not configured'}`);
});