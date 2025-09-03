-- Data Import Script for Supabase
-- This script imports data from Base44 CSV exports to Supabase tables

-- Create temporary staging tables to handle the CSV import
-- These will match the exact CSV structure before transforming to final tables

-- 1. UserAccess staging table
CREATE TEMP TABLE temp_user_access (
    user_email TEXT,
    accessible_modules TEXT,
    old_id TEXT,
    created_date TEXT,
    updated_date TEXT,
    created_by_id TEXT,
    created_by TEXT,
    is_sample TEXT
);

-- 2. Customer staging table  
CREATE TEMP TABLE temp_customer (
    name TEXT,
    email TEXT,
    phone TEXT,
    license_number TEXT,
    address TEXT,
    customer_type TEXT,
    status TEXT,
    old_id TEXT,
    created_date TEXT,
    updated_date TEXT,
    created_by_id TEXT,
    created_by TEXT,
    is_sample TEXT
);

-- 3. Vehicle staging table
CREATE TEMP TABLE temp_vehicle (
    license_plate TEXT,
    make TEXT,
    model TEXT,
    variant_trim TEXT,
    year TEXT,
    vin TEXT,
    engine_number TEXT,
    transmission_type TEXT,
    fuel_type TEXT,
    color TEXT,
    chassis_number TEXT,
    body_type TEXT,
    odometer_reading TEXT,
    odometer_source TEXT,
    seating_capacity TEXT,
    number_of_doors TEXT,
    vehicle_class TEXT,
    gps_installed TEXT,
    status TEXT,
    location TEXT,
    assigned_branch TEXT,
    current_renter TEXT,
    purchase_date TEXT,
    purchase_price TEXT,
    current_market_value TEXT,
    lease_owned TEXT,
    leasing_company TEXT,
    insurance_provider TEXT,
    insurance_policy_number TEXT,
    insurance_expiry_date TEXT,
    salik_tag_number TEXT,
    registration_expiry_date TEXT,
    mortgage_loan_status TEXT,
    sold_date TEXT,
    sold_value TEXT,
    estimated_present_value TEXT,
    last_service_date TEXT,
    next_service_due_km TEXT,
    next_service_due_date TEXT,
    tyre_change_date TEXT,
    battery_replacement_date TEXT,
    service_provider TEXT,
    service_notes TEXT,
    accident_history TEXT,
    damage_notes TEXT,
    registration_copy TEXT,
    insurance_copy TEXT,
    emission_test TEXT,
    image_set_id TEXT,
    vehicle_photos TEXT,
    real_time_location TEXT,
    fuel_level TEXT,
    engine_status TEXT,
    battery_level TEXT,
    daily_rate TEXT,
    monthly_rate TEXT,
    health_rating TEXT,
    live_latitude TEXT,
    live_longitude TEXT,
    registration_date TEXT,
    country_of_origin TEXT,
    owner_name TEXT,
    tc_number TEXT,
    place_of_issue TEXT,
    old_id TEXT,
    created_date TEXT,
    updated_date TEXT,
    created_by_id TEXT,
    created_by TEXT,
    is_sample TEXT
);

-- Import UserAccess data
\COPY temp_user_access FROM '/Users/hitheshjay/Downloads/aljisrcars/csv_files/UserAccess_export.csv' WITH CSV HEADER;

-- Import Customer data  
\COPY temp_customer FROM '/Users/hitheshjay/Downloads/aljisrcars/csv_files/Customer_export.csv' WITH CSV HEADER;

-- Import Vehicle data
\COPY temp_vehicle FROM '/Users/hitheshjay/Downloads/aljisrcars/csv_files/Vehicle_export.csv' WITH CSV HEADER;

-- Transform and insert UserAccess data
INSERT INTO user_access (user_email, accessible_modules, created_at, updated_at)
SELECT 
    user_email,
    CASE 
        WHEN accessible_modules ~ '^\[.*\]$' THEN 
            -- Parse JSON-like array string to PostgreSQL array
            (SELECT array_agg(trim(both '"' from value)) 
             FROM json_array_elements_text(accessible_modules::json) as value)
        ELSE ARRAY[accessible_modules]
    END,
    COALESCE(created_date::timestamp, NOW()),
    COALESCE(updated_date::timestamp, NOW())
FROM temp_user_access
WHERE user_email IS NOT NULL AND user_email != '';

-- Transform and insert Customer data
INSERT INTO customer (name, email, phone, license_number, address, customer_type, status, created_at, updated_at)
SELECT 
    name,
    email,
    phone,
    NULLIF(license_number, ''),
    NULLIF(address, ''),
    COALESCE(NULLIF(customer_type, ''), 'Individual'),
    COALESCE(NULLIF(status, ''), 'Active'),
    COALESCE(created_date::timestamp, NOW()),
    COALESCE(updated_date::timestamp, NOW())
FROM temp_customer
WHERE name IS NOT NULL AND name != '';

-- Transform and insert Vehicle data
INSERT INTO vehicle (
    license_plate, make, model, variant_trim, year, vin, engine_number,
    transmission_type, fuel_type, color, chassis_number, body_type,
    odometer_reading, odometer_source, seating_capacity, number_of_doors,
    vehicle_class, gps_installed, status, location, assigned_branch,
    current_renter, purchase_date, purchase_price, current_market_value,
    lease_owned, leasing_company, insurance_provider, insurance_policy_number,
    insurance_expiry_date, salik_tag_number, registration_expiry_date,
    mortgage_loan_status, sold_date, sold_value, estimated_present_value,
    last_service_date, next_service_due_km, next_service_due_date,
    tyre_change_date, battery_replacement_date, service_provider,
    service_notes, accident_history, damage_notes, registration_copy,
    insurance_copy, emission_test, image_set_id, vehicle_photos,
    real_time_location, fuel_level, engine_status, battery_level,
    daily_rate, monthly_rate, health_rating, live_latitude, live_longitude,
    registration_date, country_of_origin, owner_name, tc_number,
    place_of_issue, created_at, updated_at
)
SELECT 
    license_plate,
    make,
    model,
    NULLIF(variant_trim, ''),
    CASE WHEN year ~ '^\d+$' THEN year::INTEGER ELSE NULL END,
    NULLIF(vin, ''),
    NULLIF(engine_number, ''),
    CASE WHEN transmission_type IN ('Automatic', 'Manual') THEN transmission_type ELSE NULL END,
    CASE WHEN fuel_type IN ('Petrol', 'Diesel', 'Electric', 'Hybrid') THEN fuel_type ELSE NULL END,
    NULLIF(color, ''),
    NULLIF(chassis_number, ''),
    CASE WHEN body_type IN ('Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van') THEN body_type ELSE NULL END,
    CASE WHEN odometer_reading ~ '^\d+$' THEN odometer_reading::INTEGER ELSE NULL END,
    CASE WHEN odometer_source IN ('Manual', 'API', 'Telematics') THEN odometer_source ELSE 'Manual' END,
    CASE WHEN seating_capacity ~ '^\d+$' THEN seating_capacity::INTEGER ELSE NULL END,
    CASE WHEN number_of_doors ~ '^\d+$' THEN number_of_doors::INTEGER ELSE NULL END,
    CASE WHEN vehicle_class IN ('Economy', 'Hatch Back', 'Mid-Size Sedan', 'Luxury', 'SUV', 'Sports cars') THEN vehicle_class ELSE 'Economy' END,
    CASE WHEN gps_installed = 'true' THEN true ELSE false END,
    CASE WHEN status IN ('Available', 'Rented', 'Under Maintenance', 'Sold', 'In Transit') THEN status ELSE 'Available' END,
    NULLIF(location, ''),
    NULLIF(assigned_branch, ''),
    NULLIF(current_renter, ''),
    CASE WHEN purchase_date ~ '^\d{4}-\d{2}-\d{2}' THEN purchase_date::DATE ELSE NULL END,
    CASE WHEN purchase_price ~ '^\d+\.?\d*$' THEN purchase_price::DECIMAL ELSE NULL END,
    CASE WHEN current_market_value ~ '^\d+\.?\d*$' THEN current_market_value::DECIMAL ELSE NULL END,
    CASE WHEN lease_owned IN ('Owned', 'Leased') THEN lease_owned ELSE NULL END,
    NULLIF(leasing_company, ''),
    NULLIF(insurance_provider, ''),
    NULLIF(insurance_policy_number, ''),
    CASE WHEN insurance_expiry_date ~ '^\d{2}-[A-Z]{3}-\d{2}$' THEN 
        TO_DATE('20' || RIGHT(insurance_expiry_date, 2) || '-' || 
                CASE SUBSTRING(insurance_expiry_date, 4, 3)
                    WHEN 'JAN' THEN '01'
                    WHEN 'FEB' THEN '02'
                    WHEN 'MAR' THEN '03'
                    WHEN 'APR' THEN '04'
                    WHEN 'MAY' THEN '05'
                    WHEN 'JUN' THEN '06'
                    WHEN 'JUL' THEN '07'
                    WHEN 'AUG' THEN '08'
                    WHEN 'SEP' THEN '09'
                    WHEN 'OCT' THEN '10'
                    WHEN 'NOV' THEN '11'
                    WHEN 'DEC' THEN '12'
                END || '-' || LEFT(insurance_expiry_date, 2), 'YYYY-MM-DD')
        ELSE NULL END,
    NULLIF(salik_tag_number, ''),
    CASE WHEN registration_expiry_date ~ '^\d{2}-[A-Z]{3}-\d{2}$' THEN 
        TO_DATE('20' || RIGHT(registration_expiry_date, 2) || '-' || 
                CASE SUBSTRING(registration_expiry_date, 4, 3)
                    WHEN 'JAN' THEN '01'
                    WHEN 'FEB' THEN '02'
                    WHEN 'MAR' THEN '03'
                    WHEN 'APR' THEN '04'
                    WHEN 'MAY' THEN '05'
                    WHEN 'JUN' THEN '06'
                    WHEN 'JUL' THEN '07'
                    WHEN 'AUG' THEN '08'
                    WHEN 'SEP' THEN '09'
                    WHEN 'OCT' THEN '10'
                    WHEN 'NOV' THEN '11'
                    WHEN 'DEC' THEN '12'
                END || '-' || LEFT(registration_expiry_date, 2), 'YYYY-MM-DD')
        ELSE NULL END,
    NULLIF(mortgage_loan_status, ''),
    CASE WHEN sold_date ~ '^\d{4}-\d{2}-\d{2}' THEN sold_date::DATE ELSE NULL END,
    CASE WHEN sold_value ~ '^\d+\.?\d*$' THEN sold_value::DECIMAL ELSE NULL END,
    CASE WHEN estimated_present_value ~ '^\d+\.?\d*$' THEN estimated_present_value::DECIMAL ELSE NULL END,
    CASE WHEN last_service_date ~ '^\d{4}-\d{2}-\d{2}' THEN last_service_date::DATE ELSE NULL END,
    CASE WHEN next_service_due_km ~ '^\d+$' THEN next_service_due_km::INTEGER ELSE NULL END,
    CASE WHEN next_service_due_date ~ '^\d{4}-\d{2}-\d{2}' THEN next_service_due_date::DATE ELSE NULL END,
    CASE WHEN tyre_change_date ~ '^\d{4}-\d{2}-\d{2}' THEN tyre_change_date::DATE ELSE NULL END,
    CASE WHEN battery_replacement_date ~ '^\d{4}-\d{2}-\d{2}' THEN battery_replacement_date::DATE ELSE NULL END,
    NULLIF(service_provider, ''),
    NULLIF(service_notes, ''),
    NULLIF(accident_history, ''),
    NULLIF(damage_notes, ''),
    NULLIF(registration_copy, ''),
    NULLIF(insurance_copy, ''),
    NULLIF(emission_test, ''),
    NULLIF(image_set_id, ''),
    CASE 
        WHEN vehicle_photos ~ '^\[.*\]$' THEN 
            (SELECT array_agg(trim(both '"' from value)) 
             FROM json_array_elements_text(vehicle_photos::json) as value)
        WHEN vehicle_photos != '' THEN ARRAY[vehicle_photos]
        ELSE NULL
    END,
    NULLIF(real_time_location, ''),
    CASE WHEN fuel_level ~ '^\d+$' AND fuel_level::INTEGER BETWEEN 0 AND 100 THEN fuel_level::INTEGER ELSE NULL END,
    CASE WHEN engine_status IN ('On', 'Off') THEN engine_status ELSE NULL END,
    CASE WHEN battery_level ~ '^\d+$' AND battery_level::INTEGER BETWEEN 0 AND 100 THEN battery_level::INTEGER ELSE NULL END,
    CASE WHEN daily_rate ~ '^\d+\.?\d*$' THEN daily_rate::DECIMAL ELSE 0 END,
    CASE WHEN monthly_rate ~ '^\d+\.?\d*$' THEN monthly_rate::DECIMAL ELSE 0 END,
    CASE WHEN health_rating IN ('Good', 'Fair', 'Critical') THEN health_rating ELSE 'Good' END,
    CASE WHEN live_latitude ~ '^-?\d+\.?\d*$' THEN live_latitude::DECIMAL ELSE NULL END,
    CASE WHEN live_longitude ~ '^-?\d+\.?\d*$' THEN live_longitude::DECIMAL ELSE NULL END,
    CASE WHEN registration_date ~ '^\d{2}-[A-Z]{3}-\d{2}$' THEN 
        TO_DATE('20' || RIGHT(registration_date, 2) || '-' || 
                CASE SUBSTRING(registration_date, 4, 3)
                    WHEN 'JAN' THEN '01'
                    WHEN 'FEB' THEN '02'
                    WHEN 'MAR' THEN '03'
                    WHEN 'APR' THEN '04'
                    WHEN 'MAY' THEN '05'
                    WHEN 'JUN' THEN '06'
                    WHEN 'JUL' THEN '07'
                    WHEN 'AUG' THEN '08'
                    WHEN 'SEP' THEN '09'
                    WHEN 'OCT' THEN '10'
                    WHEN 'NOV' THEN '11'
                    WHEN 'DEC' THEN '12'
                END || '-' || LEFT(registration_date, 2), 'YYYY-MM-DD')
        ELSE NULL END,
    NULLIF(country_of_origin, ''),
    NULLIF(owner_name, ''),
    NULLIF(tc_number, ''),
    NULLIF(place_of_issue, ''),
    COALESCE(created_date::timestamp, NOW()),
    COALESCE(updated_date::timestamp, NOW())
FROM temp_vehicle
WHERE license_plate IS NOT NULL AND license_plate != '';

-- Drop temporary tables
DROP TABLE temp_user_access;
DROP TABLE temp_customer; 
DROP TABLE temp_vehicle;

-- Display import results
SELECT 'UserAccess' as table_name, COUNT(*) as records_imported FROM user_access
UNION ALL
SELECT 'Customer' as table_name, COUNT(*) as records_imported FROM customer
UNION ALL  
SELECT 'Vehicle' as table_name, COUNT(*) as records_imported FROM vehicle
ORDER BY table_name;