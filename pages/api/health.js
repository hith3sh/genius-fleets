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