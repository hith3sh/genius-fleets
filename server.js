import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Client } from 'pg';
import multer from 'multer';
import 'dotenv/config';

// Import data transformer
import { smartTransform } from './src/lib/dataTransformer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || (process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0');

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

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { bucket } = req.params;
    const storageBasePath = process.env.STORAGE_PATH || '/app/storage';
    const uploadPath = path.join(storageBasePath, bucket);

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const ext = path.extname(file.originalname);
    const filename = `${timestamp}_${randomString}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images and PDFs
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  }
});

// File upload endpoint
app.post('/api/storage/:bucket/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { bucket } = req.params;
    const filename = req.file.filename;
    const publicUrl = `/api/files/${bucket}/${filename}`;

    res.json({
      data: {
        id: filename,
        name: req.file.originalname,
        bucket: bucket,
        public_url: publicUrl,
        full_url: `${req.protocol}://${req.get('host')}${publicUrl}`,
        size: req.file.size,
        mimetype: req.file.mimetype,
        created_at: new Date().toISOString()
      },
      error: null
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Database proxy routes for Railway PostgreSQL
const dbClient = new Client({
  connectionString: process.env.DATABASE_URL
});

// Connect to database on startup
dbClient.connect().catch(err => {
  console.error('Database connection error:', err);
});

// Generic database query proxy
app.post('/api/db/query', async (req, res) => {
  try {
    const { query, params = [] } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const result = await dbClient.query(query, params);
    res.json({ data: result.rows, error: null });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

// Supabase-compatible table operations
app.get('/api/db/:table', async (req, res) => {
  try {
    const { table } = req.params;
    const { select = '*', filter, limit, offset } = req.query;

    let query = `SELECT ${select} FROM ${table}`;
    const params = [];

    if (filter) {
      const filters = JSON.parse(filter);
      const conditions = [];
      let paramIndex = 1;

      for (const [key, value] of Object.entries(filters)) {
        conditions.push(`${key} = $${paramIndex}`);
        params.push(value);
        paramIndex++;
      }

      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }
    }

    if (limit) {
      query += ` LIMIT ${parseInt(limit)}`;
    }

    if (offset) {
      query += ` OFFSET ${parseInt(offset)}`;
    }

    const result = await dbClient.query(query, params);
    const transformedData = smartTransform(result.rows);
    res.json({ data: transformedData, error: null });
  } catch (error) {
    console.error('Database select error:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

app.post('/api/db/:table', async (req, res) => {
  try {
    const { table } = req.params;
    const data = req.body;

    console.log(`🔧 POST /${table} - Original data:`, data);


    const columns = Object.keys(data);
    const values = Object.values(data).map((value, index) => {
      const columnName = Object.keys(data)[index];

      // Handle null/undefined
      if (value === null || value === undefined) {
        return null;
      }

      // Handle empty strings for date fields - convert to null
      if (typeof value === 'string' && value === '' &&
          (columnName.includes('date') || columnName.includes('_at') ||
           columnName === 'date_of_birth' || columnName === 'join_date')) {
        return null;
      }

      // If it's already a string, don't modify it
      if (typeof value === 'string') {
        return value;
      }

      // Handle arrays - check if it should be PostgreSQL array or JSON
      if (Array.isArray(value)) {
        // For known array columns that should be PostgreSQL arrays
        if (columnName === 'vehicle_photos' || columnName === 'photo_urls' || columnName.includes('_array')) {
          // Convert to PostgreSQL array format: {item1,item2}
          if (value.length === 0) {
            return '{}';
          }
          const pgArray = '{' + value.map(item => `"${item}"`).join(',') + '}';
          return pgArray;
        }
        // For other arrays, use JSON format
        return JSON.stringify(value);
      }

      // For objects, use JSON format
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }

      return value;
    });
    const placeholders = values.map((_, index) => `$${index + 1}`);


    const query = `
      INSERT INTO ${table} (${columns.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *
    `;

    console.log(`🔧 Final SQL for ${table}:`, query);
    console.log(`🔧 Final values for ${table}:`, values);

    const result = await dbClient.query(query, values);
    const transformedData = smartTransform(result.rows[0]);
    res.json({ data: transformedData, error: null });
  } catch (error) {
    console.error('Database insert error:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

app.patch('/api/db/:table/:id', async (req, res) => {
  try {
    const { table, id } = req.params;
    const data = req.body;

    const columns = Object.keys(data);
    const values = Object.values(data).map((value, index) => {
      const columnName = Object.keys(data)[index];

      // Handle null/undefined
      if (value === null || value === undefined) {
        return null;
      }

      // Handle empty strings for date fields - convert to null
      if (typeof value === 'string' && value === '' &&
          (columnName.includes('date') || columnName.includes('_at') ||
           columnName === 'date_of_birth' || columnName === 'join_date')) {
        return null;
      }

      // If it's already a string, don't modify it
      if (typeof value === 'string') {
        return value;
      }

      // Handle arrays - check if it should be PostgreSQL array or JSON
      if (Array.isArray(value)) {
        // For known array columns that should be PostgreSQL arrays
        if (columnName === 'vehicle_photos' || columnName === 'photo_urls' || columnName.includes('_array')) {
          // Convert to PostgreSQL array format: {item1,item2}
          if (value.length === 0) {
            return '{}';
          }
          return '{' + value.map(item => `"${item}"`).join(',') + '}';
        }
        // For other arrays, use JSON format
        return JSON.stringify(value);
      }

      // For objects, use JSON format
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }

      return value;
    });
    const setClause = columns.map((col, index) => `${col} = $${index + 1}`);

    const query = `
      UPDATE ${table}
      SET ${setClause.join(', ')}, updated_at = NOW()
      WHERE id = $${values.length + 1}
      RETURNING *
    `;

    const result = await dbClient.query(query, [...values, id]);
    const transformedData = smartTransform(result.rows[0]);
    res.json({ data: transformedData, error: null });
  } catch (error) {
    console.error('Database update error:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

app.delete('/api/db/:table/:id', async (req, res) => {
  try {
    const { table, id } = req.params;

    const query = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
    const result = await dbClient.query(query, [id]);

    res.json({ data: result.rows[0], error: null });
  } catch (error) {
    console.error('Database delete error:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

// RPC function calls
app.post('/api/rpc/:function', async (req, res) => {
  try {
    const { function: functionName } = req.params;
    const params = req.body;

    let query;
    let queryParams = [];

    if (functionName === 'set_current_user_email') {
      query = 'SELECT set_current_user_email($1)';
      queryParams = [params.email];
    } else {
      return res.status(400).json({ error: 'Unknown function' });
    }

    const result = await dbClient.query(query, queryParams);
    res.json({ data: result.rows, error: null });
  } catch (error) {
    console.error('RPC error:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

// Serve React app for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`📁 Storage path: ${process.env.STORAGE_PATH || '/app/storage'}`);
  console.log(`🗄️ Database: ${process.env.DATABASE_URL ? 'configured' : 'not configured'}`);
  console.log(`🔐 Auth0: ${process.env.VITE_AUTH0_DOMAIN ? 'configured' : 'not configured'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});