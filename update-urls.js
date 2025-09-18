#!/usr/bin/env node

/**
 * Script to update Supabase storage URLs to Railway storage URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL mappings from Supabase to Railway
const URL_MAPPINGS = {
  // Logo files
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4492b025e_AlJisrCarRentals.png': '/api/files/base44-prod/public/4492b025e_AlJisrCarRentals.png',
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2b4d1bbdc_AlJisrCarRentals.png': '/api/files/base44-prod/public/2b4d1bbdc_AlJisrCarRentals.png',
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bf4adeb3e_GeniusFleetsLogo.png': '/api/files/base44-prod/public/bf4adeb3e_GeniusFleetsLogo.png',
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b357bafe5_IAMONLINEstatic.jpg': '/api/files/base44-prod/public/b357bafe5_IAMONLINEstatic.jpg',

  // VehicleImages patterns
  'https://xvozdbgsvzgfnrqgngfe.supabase.co/storage/v1/object/public/VehicleImages/': '/api/files/VehicleImages/'
};

// Files to update
const FILES_TO_UPDATE = [
  'src/pages/Layout.jsx',
  'src/pages/InvoiceView.jsx',
  'src/pages/Invoices.jsx',
  'src/components/landing/Footer.jsx',
  'src/components/errors/ErrorPage.jsx',
  'src/components/landing/Header.jsx',
  'src/components/common/ChatbotWidget.jsx',
  'src/components/dashboard/WelcomeScreen.jsx'
];

function updateFile(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let changed = false;

    // Apply URL mappings
    for (const [oldUrl, newUrl] of Object.entries(URL_MAPPINGS)) {
      if (content.includes(oldUrl)) {
        content = content.replaceAll(oldUrl, newUrl);
        changed = true;
        console.log(`✅ Updated URL in ${filePath}: ${path.basename(oldUrl)}`);
      }
    }

    // Write back if changed
    if (changed) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`💾 Saved: ${filePath}`);
    } else {
      console.log(`➖ No changes needed: ${filePath}`);
    }

  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

function updateURLs() {
  console.log('🔄 Updating Supabase URLs to Railway storage URLs...\n');

  FILES_TO_UPDATE.forEach(filePath => {
    updateFile(filePath);
  });

  console.log('\n🎉 URL update completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Deploy your app to Railway');
  console.log('2. Upload the ./storage folder to Railway volume');
  console.log('3. Test that images load correctly');
}

updateURLs();