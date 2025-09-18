#!/usr/bin/env node

/**
 * Migration script to move files from Supabase Storage to Railway Volume
 * Run this locally after setting up Railway Volume
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SUPABASE_PROJECT_URL = 'xvozdbgsvzgfnrqgngfe.supabase.co';
const LOCAL_STORAGE_PATH = './storage'; // Local storage path for testing
const RAILWAY_STORAGE_PATH = '/app/storage'; // Railway volume path

// Files to migrate from your Supabase data
const FILES_TO_MIGRATE = [
  {
    bucket: 'VehicleImages',
    path: 'uploads/1757859968841_96amrnlnsqi.pdf',
    supabaseUrl: `https://${SUPABASE_PROJECT_URL}/storage/v1/object/public/VehicleImages/uploads/1757859968841_96amrnlnsqi.pdf`
  },
  {
    bucket: 'VehicleImages',
    path: 'uploads/1757860837847_d4sylcsqx3.pdf',
    supabaseUrl: `https://${SUPABASE_PROJECT_URL}/storage/v1/object/public/VehicleImages/uploads/1757860837847_d4sylcsqx3.pdf`
  },
  {
    bucket: 'VehicleImages',
    path: 'maintenance-reports/1757860912328_1a659kdsuvy.pdf',
    supabaseUrl: `https://${SUPABASE_PROJECT_URL}/storage/v1/object/public/VehicleImages/maintenance-reports/1757860912328_1a659kdsuvy.pdf`
  }
];

// Logo files to migrate
const LOGO_FILES = [
  {
    bucket: 'base44-prod',
    path: 'public/4492b025e_AlJisrCarRentals.png',
    supabaseUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4492b025e_AlJisrCarRentals.png'
  },
  {
    bucket: 'base44-prod',
    path: 'public/2b4d1bbdc_AlJisrCarRentals.png',
    supabaseUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2b4d1bbdc_AlJisrCarRentals.png'
  },
  {
    bucket: 'base44-prod',
    path: 'public/bf4adeb3e_GeniusFleetsLogo.png',
    supabaseUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bf4adeb3e_GeniusFleetsLogo.png'
  },
  {
    bucket: 'base44-prod',
    path: 'public/b357bafe5_IAMONLINEstatic.jpg',
    supabaseUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b357bafe5_IAMONLINEstatic.jpg'
  }
];

const ALL_FILES = [...FILES_TO_MIGRATE, ...LOGO_FILES];

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    // Create directory if it doesn't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(outputPath);

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${path.basename(outputPath)}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function migrateFiles() {
  console.log('🚀 Starting Supabase to Railway storage migration...\n');

  const storagePath = process.env.NODE_ENV === 'production' ? RAILWAY_STORAGE_PATH : LOCAL_STORAGE_PATH;

  console.log(`📁 Storage path: ${storagePath}`);
  console.log(`📊 Migrating ${ALL_FILES.length} files...\n`);

  for (let i = 0; i < ALL_FILES.length; i++) {
    const file = ALL_FILES[i];
    const outputPath = path.join(storagePath, file.bucket, file.path);

    console.log(`📥 [${i + 1}/${ALL_FILES.length}] Downloading: ${file.path}`);

    try {
      await downloadFile(file.supabaseUrl, outputPath);
    } catch (error) {
      console.error(`❌ Failed to download ${file.path}:`, error.message);
    }
  }

  console.log('\n🎉 Migration completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Upload the ./storage folder to your Railway volume');
  console.log('2. Update your app to use Railway storage URLs');
  console.log('3. Test that files are accessible via /api/files/:bucket/:path');
}

// Run migration
migrateFiles().catch(console.error);