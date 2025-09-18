# Database Migration Guide: Supabase to Railway PostgreSQL

## Overview
This guide helps you migrate your Al Jisr Car Rental System from Supabase to Railway PostgreSQL, including schema, data, and RLS policies.

## Prerequisites
1. Railway PostgreSQL database set up and running
2. Supabase project access
3. `pg_dump` and `psql` tools installed locally

## Step-by-Step Migration Process

### 1. Export Data from Supabase

#### Method A: Using Supabase CLI (Recommended)
```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Export your database schema and data
supabase db dump --data-only > supabase_data.sql
supabase db dump --schema-only > supabase_schema_export.sql
```

#### Method B: Using pg_dump directly
```bash
# Get your Supabase connection string from the dashboard
# Format: postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

pg_dump "postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres" \
  --data-only \
  --no-owner \
  --no-privileges \
  --exclude-schema=auth \
  --exclude-schema=storage \
  --exclude-schema=realtime \
  --exclude-schema=supabase_functions \
  --exclude-schema=extensions \
  > supabase_data_export.sql
```

#### Method C: Export specific tables (if you have large datasets)
```bash
# Export specific tables you need
pg_dump "postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres" \
  --data-only \
  --no-owner \
  --no-privileges \
  -t customer \
  -t vehicle \
  -t booking \
  -t employee \
  -t invoice \
  -t payment \
  > critical_tables_data.sql
```

### 2. Setup Railway PostgreSQL Schema

```bash
# Connect to your Railway PostgreSQL database
# Get connection string from Railway dashboard

psql "postgresql://postgres:PASSWORD@HOST:PORT/railway" -f migrate_to_railway.sql
```

### 3. Clean and Import Data

#### Create data cleaning script:
```bash
# Create a script to clean Supabase-specific elements from your data export
sed -i.bak \
  -e '/^SET /d' \
  -e '/^SELECT pg_catalog.set_config/d' \
  -e '/^--/d' \
  -e '/auth\./d' \
  -e '/storage\./d' \
  supabase_data_export.sql
```

#### Import cleaned data:
```bash
# Import the cleaned data into Railway PostgreSQL
psql "postgresql://postgres:PASSWORD@HOST:PORT/railway" -f supabase_data_export.sql
```

### 4. Verify Migration

```sql
-- Connect to Railway database and verify table counts
SELECT schemaname,tablename,n_tup_ins FROM pg_stat_user_tables ORDER BY n_tup_ins DESC;

-- Check specific important tables
SELECT COUNT(*) FROM customer;
SELECT COUNT(*) FROM vehicle;
SELECT COUNT(*) FROM booking;
SELECT COUNT(*) FROM employee;
```

## RLS Policies Migration

### Basic RLS Policies for Al Jisr Car Rental

```sql
-- Connect to Railway PostgreSQL and run these policies

-- User Access Policies
CREATE POLICY "Users can view their own access" ON user_access
  FOR SELECT USING (user_email = current_setting('app.current_user_email', true));

-- Customer Policies
CREATE POLICY "Staff can manage customers" ON customer
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = current_setting('app.current_user_email', true)
      AND role IN ('Management', 'Staff')
    )
  );

-- Vehicle Policies
CREATE POLICY "Staff can manage vehicles" ON vehicle
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = current_setting('app.current_user_email', true)
      AND role IN ('Management', 'Staff')
    )
  );

-- Booking Policies
CREATE POLICY "Staff can manage bookings" ON booking
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = current_setting('app.current_user_email', true)
      AND role IN ('Management', 'Staff')
    )
  );

-- Employee Policies (HR Module)
CREATE POLICY "Management can manage employees" ON employee
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = current_setting('app.current_user_email', true)
      AND role = 'Management'
    )
  );

CREATE POLICY "Employees can view their own record" ON employee
  FOR SELECT USING (
    email = current_setting('app.current_user_email', true)
  );

-- Leave Request Policies
CREATE POLICY "Employees can manage their leave requests" ON leave_request
  FOR ALL USING (
    employee_id IN (
      SELECT employee_id FROM employee
      WHERE email = current_setting('app.current_user_email', true)
    )
    OR EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = current_setting('app.current_user_email', true)
      AND role = 'Management'
    )
  );

-- Financial Policies (Invoices, Payments, Expenses)
CREATE POLICY "Management can manage financial records" ON invoice
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = current_setting('app.current_user_email', true)
      AND role = 'Management'
    )
  );

CREATE POLICY "Management can manage payments" ON payment
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = current_setting('app.current_user_email', true)
      AND role = 'Management'
    )
  );

CREATE POLICY "Management can manage expenses" ON expense
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = current_setting('app.current_user_email', true)
      AND role = 'Management'
    )
  );
```

## Application Code Updates

### Update Database Configuration

Edit your application code to use Railway PostgreSQL:

```javascript
// src/api/integrations.js - Update Supabase client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.RAILWAY_DATABASE_URL; // Use Railway URL
const supabaseKey = 'your-railway-key'; // Update this

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Set User Context for RLS

```javascript
// In your Auth0 authentication flow
const setUserContext = async (userEmail) => {
  await supabase.rpc('set_config', {
    setting_name: 'app.current_user_email',
    setting_value: userEmail,
    is_local: false
  });
};
```

## Troubleshooting

### Common Issues:

1. **Permission Denied**: Ensure your Railway user has proper permissions
2. **Foreign Key Violations**: Import data in the correct order (customers before bookings, etc.)
3. **RLS Blocking Queries**: Temporarily disable RLS during data import:
   ```sql
   ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
   -- Import data
   ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
   ```

### Data Validation Queries:

```sql
-- Compare row counts between old and new database
SELECT 'customer' as table_name, COUNT(*) FROM customer
UNION ALL
SELECT 'vehicle', COUNT(*) FROM vehicle
UNION ALL
SELECT 'booking', COUNT(*) FROM booking
UNION ALL
SELECT 'employee', COUNT(*) FROM employee
UNION ALL
SELECT 'invoice', COUNT(*) FROM invoice;
```

## Post-Migration Checklist

- [ ] All tables created successfully
- [ ] Data imported without errors
- [ ] Row counts match between old and new database
- [ ] RLS policies applied and tested
- [ ] Application connects to new database
- [ ] User authentication works with RLS
- [ ] All CRUD operations function correctly
- [ ] File uploads work with Railway volumes

## Environment Variables

Update your environment variables:

```bash
# Remove Supabase variables
# VITE_SUPABASE_URL=
# VITE_SUPABASE_ANON_KEY=

# Add Railway database URL
DATABASE_URL=postgresql://postgres:password@host:port/railway
```