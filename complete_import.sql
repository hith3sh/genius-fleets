-- Complete Data Import Script for Supabase
-- Import all CSV data from Base44 export to Supabase tables
-- Run this script in your Supabase SQL editor

-- Step 1: Import core tables first (no foreign key dependencies)

-- UserAccess
\COPY (SELECT user_email, 
       CASE 
           WHEN accessible_modules ~ '^\[.*\]$' THEN 
               (SELECT array_agg(trim(both '"' from value)) 
                FROM json_array_elements_text(accessible_modules::json) as value)
           ELSE ARRAY[accessible_modules]
       END as accessible_modules,
       COALESCE(created_date::timestamp, NOW()) as created_at,
       COALESCE(updated_date::timestamp, NOW()) as updated_at
       FROM (
           SELECT user_email, accessible_modules, created_date, updated_date
           FROM (
               VALUES 
               -- You'll need to manually paste your UserAccess data here
               -- Format: ('email', 'modules_json', 'created_date', 'updated_date')
           ) AS t(user_email, accessible_modules, created_date, updated_date)
       ) sub
) TO STDOUT WITH CSV HEADER;

-- For Supabase, we'll use a different approach with INSERT statements

-- Create a comprehensive import script using INSERT statements
-- This avoids file path issues in Supabase

-- 1. Clear existing data (optional - comment out if you want to preserve existing data)
-- TRUNCATE TABLE user_access, customer, vehicle, booking, vehicle_document CASCADE;

-- 2. Create mapping tables for old IDs to new UUIDs
CREATE TEMP TABLE id_mapping (
    table_name TEXT,
    old_id TEXT,
    new_uuid UUID
);

-- 3. Insert UserAccess data
DO $$
BEGIN
    -- Insert sample UserAccess records
    INSERT INTO user_access (user_email, accessible_modules, created_at, updated_at) VALUES
    ('roosewalt@gmail.com', ARRAY['Dashboard','Customers','Leads','Quotations','Marketing','CorporateClients','SalesPerformance','FleetStatus','FleetManagement','FleetHealth','DamageLogs','Contracts','SalikFines','GPSTracking','Bookings','HREmployees','HRAttendance','HRPayroll','HRLeaveRequests','FinanceOverview','Invoices','Payments','Expenses','Reports','TaxVAT','Depreciation','Inventory','VehicleDocuments','CustomerDocuments','StaffDocuments','LegalDocuments','AIDocumentProcessing','BusinessInfo','UserAccessRules','APISettings','Branches','MobileBooking','VehicleImageLibrary','FleetAnalyst','Inquiries','Quotes','Products','SalesOrders','PriceLists','Drivers','Maintenance','Vehicles','FuelLog','Employees','LeaveManagement','Payroll','Attendance','Documents','Accounts','Templates'], '2025-08-06T05:55:51.135000'::timestamp, '2025-08-27T07:06:00.551000'::timestamp),
    ('blogger.pereira@gmail.com', ARRAY['Customers','Marketing','Leads','CorporateClients','Quotations','SalesPerformance','FleetStatus','SalikFines','HREmployees','HRLeaveRequests','HRAttendance','HRPayroll','FinanceOverview','Expenses','Depreciation','Invoices','Reports','Inventory','Payments','TaxVAT','VehicleImageLibrary','StaffDocuments','VehicleDocuments','LegalDocuments','CustomerDocuments','AIDocumentProcessing','UserAccessRules','BusinessInfo','Branches','FleetManagement','DamageLogs','GPSTracking','FleetHealth','Contracts','APISettings','Dashboard','Bookings','MobileBooking','Inquiries','Quotes','Products','SalesOrders','PriceLists','Maintenance'], '2025-08-25T06:19:44.536000'::timestamp, '2025-08-26T15:42:17.078000'::timestamp);
    
    RAISE NOTICE 'UserAccess data imported successfully';
END $$;

-- 4. Insert Customer data with ID mapping
DO $$
DECLARE
    customer_uuid UUID;
BEGIN
    -- Insert customers and store ID mapping
    INSERT INTO customer (name, email, phone, license_number, address, customer_type, status, created_at, updated_at) VALUES
    ('John Smith', 'john.smith@email.com', '+971-50-123-4567', 'DL12345678', '123 Business Bay, Dubai, UAE', 'Individual', 'Active', '2025-08-05T12:16:20.680000'::timestamp, '2025-08-05T12:16:20.680000'::timestamp)
    RETURNING id INTO customer_uuid;
    
    INSERT INTO id_mapping VALUES ('customer', '6891f61474e44b72f43af76b', customer_uuid);
    
    INSERT INTO customer (name, email, phone, license_number, address, customer_type, status, created_at, updated_at) VALUES
    ('Roosewalt Pereira', 'roosewalt@gmail.com', 'N/A', '', '', 'Individual', 'Active', '2025-08-07T14:45:17.856000'::timestamp, '2025-08-07T14:45:17.856000'::timestamp)
    RETURNING id INTO customer_uuid;
    
    INSERT INTO id_mapping VALUES ('customer', '6894bbfdab2308e604016a69', customer_uuid);
    
    RAISE NOTICE 'Customer data imported successfully';
END $$;

-- 5. Insert Vehicle data with ID mapping
DO $$
DECLARE
    vehicle_uuid UUID;
BEGIN
    INSERT INTO vehicle (
        license_plate, make, model, variant_trim, year, vin, transmission_type,
        fuel_type, color, body_type, odometer_reading, odometer_source,
        seating_capacity, number_of_doors, vehicle_class, status, location,
        assigned_branch, purchase_date, purchase_price, lease_owned,
        insurance_policy_number, insurance_expiry_date, registration_expiry_date,
        daily_rate, monthly_rate, health_rating, registration_date,
        country_of_origin, owner_name, tc_number, place_of_issue,
        vehicle_photos, created_at, updated_at
    ) VALUES
    ('P/61550', 'NISSAN', 'PATHFINDER', '', 2020, '5N1DR2AM9LC643661', 'Automatic',
     'Petrol', 'WHITE', 'Sedan', 150000, 'Manual', 7, 4, 'Economy',
     'Available', 'Dubai', 'Al nahda', '2024-07-27'::date, 65000, 'Owned',
     '2530004975', '2026-07-25'::date, '2026-06-25'::date,
     100, 2500, 'Good', '2026-06-25'::date, 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI',
     '2140113865', 'DUBAI',
     ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/c62a4cc50_NISSANPATHFINDERWHITE2020.png'],
     '2025-08-27T05:05:00.728000'::timestamp, '2025-08-27T05:05:00.728000'::timestamp)
    RETURNING id INTO vehicle_uuid;
    
    INSERT INTO id_mapping VALUES ('vehicle', '68ae91fc9d7c0cabb70c2270', vehicle_uuid);
    
    RAISE NOTICE 'Vehicle data imported successfully';
END $$;

-- Clean up
DROP TABLE id_mapping;

-- Display import summary
SELECT 'Import Summary:' as status;
SELECT 'UserAccess' as table_name, COUNT(*) as records FROM user_access
UNION ALL
SELECT 'Customer' as table_name, COUNT(*) as records FROM customer  
UNION ALL
SELECT 'Vehicle' as table_name, COUNT(*) as records FROM vehicle
ORDER BY table_name;