-- Supabase SQL Schema for Al Jisr Car Rental System
-- Generated from schema.md

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- UserAccess table
CREATE TABLE IF NOT EXISTS user_access (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email TEXT NOT NULL UNIQUE,
    role TEXT DEFAULT 'Staff' CHECK (role IN ('Management', 'Staff', 'Customer')),
    accessible_modules TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer table
CREATE TABLE IF NOT EXISTS customer (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    license_number TEXT,
    address TEXT,
    customer_type TEXT DEFAULT 'Individual' CHECK (customer_type IN ('Individual', 'Corporate')),
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Blocked')),
    tags TEXT[],
    residency_status TEXT CHECK (residency_status IN ('Resident', 'Visitor')),
    driving_license_url TEXT,
    passport_url TEXT,
    emirates_id_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicle table
CREATE TABLE IF NOT EXISTS vehicle (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_plate TEXT NOT NULL UNIQUE,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    variant_trim TEXT,
    year INTEGER NOT NULL,
    vin TEXT,
    engine_number TEXT,
    transmission_type TEXT CHECK (transmission_type IN ('Automatic', 'Manual')),
    fuel_type TEXT CHECK (fuel_type IN ('Petrol', 'Diesel', 'Electric', 'Hybrid')),
    color TEXT,
    chassis_number TEXT,
    body_type TEXT CHECK (body_type IN ('Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van')),
    odometer_reading INTEGER,
    odometer_source TEXT CHECK (odometer_source IN ('Manual', 'API', 'Telematics')),
    seating_capacity INTEGER,
    number_of_doors INTEGER,
    vehicle_class TEXT NOT NULL CHECK (vehicle_class IN ('Economy', 'Hatch Back', 'Mid-Size Sedan', 'Luxury', 'SUV', 'Sports cars')),
    gps_installed BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'Available' CHECK (status IN ('Available', 'Rented', 'Under Maintenance', 'Sold', 'In Transit')),
    location TEXT,
    assigned_branch TEXT,
    current_renter TEXT,
    purchase_date DATE,
    purchase_price DECIMAL(10,2),
    current_market_value DECIMAL(10,2),
    lease_owned TEXT CHECK (lease_owned IN ('Owned', 'Leased')),
    leasing_company TEXT,
    insurance_provider TEXT,
    insurance_policy_number TEXT,
    insurance_expiry_date DATE,
    salik_tag_number TEXT,
    registration_expiry_date DATE,
    mortgage_loan_status TEXT,
    sold_date DATE,
    sold_value DECIMAL(10,2),
    estimated_present_value DECIMAL(10,2),
    last_service_date DATE,
    next_service_due_km INTEGER,
    next_service_due_date DATE,
    tyre_change_date DATE,
    battery_replacement_date DATE,
    service_provider TEXT,
    service_notes TEXT,
    accident_history TEXT,
    damage_notes TEXT,
    registration_copy TEXT,
    insurance_copy TEXT,
    emission_test TEXT,
    image_set_id TEXT,
    vehicle_photos TEXT[],
    real_time_location TEXT,
    fuel_level INTEGER CHECK (fuel_level >= 0 AND fuel_level <= 100),
    engine_status TEXT CHECK (engine_status IN ('On', 'Off')),
    battery_level INTEGER CHECK (battery_level >= 0 AND battery_level <= 100),
    daily_rate DECIMAL(10,2) NOT NULL,
    monthly_rate DECIMAL(10,2) NOT NULL,
    health_rating TEXT DEFAULT 'Good' CHECK (health_rating IN ('Good', 'Fair', 'Critical')),
    live_latitude DECIMAL(10,8),
    live_longitude DECIMAL(11,8),
    registration_date DATE,
    country_of_origin TEXT,
    owner_name TEXT,
    tc_number TEXT,
    place_of_issue TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Booking table
CREATE TABLE IF NOT EXISTS booking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customer(id),
    vehicle_id UUID NOT NULL REFERENCES vehicle(id),
    booking_date DATE DEFAULT CURRENT_DATE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    pickup_location TEXT,
    dropoff_location TEXT,
    total_amount DECIMAL(10,2) NOT NULL,
    vat_amount DECIMAL(10,2),
    final_amount DECIMAL(10,2),
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Active', 'Completed', 'Cancelled')),
    payment_status TEXT DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Paid', 'Partial', 'Refunded')),
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicle Document table
CREATE TABLE IF NOT EXISTS vehicle_document (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID REFERENCES vehicle(id),
    document_type TEXT CHECK (document_type IN ('Insurance', 'Mulkia', 'Vehicle Pictures', 'Other')),
    document_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    upload_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    extracted_data JSONB,
    license_plate_number TEXT,
    registration_expiry_date TEXT,
    registration_date TEXT,
    insurance_expiry_date TEXT,
    insurance_policy_number TEXT,
    tc_number TEXT,
    owner_name TEXT,
    model_year TEXT,
    country_of_origin TEXT,
    vehicle_type TEXT,
    chassis_number TEXT,
    number_of_passengers TEXT,
    place_of_issue TEXT,
    notes TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employee table
CREATE TABLE IF NOT EXISTS employee (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    date_of_birth DATE,
    nationality TEXT,
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    address TEXT,
    department TEXT NOT NULL,
    designation TEXT NOT NULL,
    join_date DATE NOT NULL,
    employment_type TEXT CHECK (employment_type IN ('Full-time', 'Part-time', 'Contract')),
    reporting_manager_id TEXT,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    base_salary DECIMAL(10,2) NOT NULL,
    passport_copy_url TEXT,
    visa_page_url TEXT,
    emirates_id_url TEXT,
    other_documents TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shift table
CREATE TABLE IF NOT EXISTS shift (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    duration_hours DECIMAL(4,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id TEXT NOT NULL,
    date DATE NOT NULL,
    check_in_time TIMESTAMP WITH TIME ZONE,
    check_out_time TIMESTAMP WITH TIME ZONE,
    shift_id UUID REFERENCES shift(id),
    status TEXT NOT NULL CHECK (status IN ('Present', 'Absent', 'On Leave', 'Holiday')),
    working_hours DECIMAL(4,2),
    overtime_hours DECIMAL(4,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(employee_id, date)
);

-- Payroll table
CREATE TABLE IF NOT EXISTS payroll (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id TEXT NOT NULL,
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    year INTEGER NOT NULL,
    base_salary DECIMAL(10,2),
    overtime_pay DECIMAL(10,2),
    deductions DECIMAL(10,2),
    net_pay DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processed', 'Paid')),
    processing_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(employee_id, month, year)
);

-- Leave Request table
CREATE TABLE IF NOT EXISTS leave_request (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id TEXT NOT NULL,
    leave_type TEXT NOT NULL CHECK (leave_type IN ('Sick', 'Casual', 'Annual', 'Unpaid')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved by Manager', 'Approved', 'Rejected')),
    manager_comment TEXT,
    hr_comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deduction table
CREATE TABLE IF NOT EXISTS deduction (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id TEXT NOT NULL,
    date DATE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Advance', 'Loan', 'Fine', 'Other')),
    amount DECIMAL(10,2) NOT NULL,
    reason TEXT,
    payroll_run_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead table
CREATE TABLE IF NOT EXISTS lead (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    source TEXT,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Quoted', 'Follow-up', 'Won', 'Lost')),
    assigned_to_id TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quotation table
CREATE TABLE IF NOT EXISTS quotation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customer(id),
    lead_id UUID REFERENCES lead(id),
    vehicle_details TEXT NOT NULL,
    daily_rate DECIMAL(10,2),
    start_date DATE,
    end_date DATE,
    total_amount DECIMAL(10,2) NOT NULL,
    validity_date DATE,
    terms_and_conditions TEXT,
    status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Sent', 'Accepted', 'Rejected')),
    sales_rep_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketing Campaign table
CREATE TABLE IF NOT EXISTS marketing_campaign (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    audience_filters JSONB,
    status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Scheduled', 'Sent', 'Failed')),
    scheduled_for TIMESTAMP WITH TIME ZONE,
    sent_date TIMESTAMP WITH TIME ZONE,
    stats JSONB DEFAULT '{"sent_count": 0, "open_count": 0, "click_count": 0}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Corporate Client table
CREATE TABLE IF NOT EXISTS corporate_client (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    account_manager_id TEXT NOT NULL,
    billing_agreement TEXT,
    contacts JSONB,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Interaction Log table
CREATE TABLE IF NOT EXISTS interaction_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customer(id),
    lead_id UUID REFERENCES lead(id),
    type TEXT NOT NULL CHECK (type IN ('Call', 'Email', 'Meeting', 'Note')),
    notes TEXT NOT NULL,
    sales_rep_id TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoice table
CREATE TABLE IF NOT EXISTS invoice (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number TEXT NOT NULL UNIQUE,
    client_id UUID REFERENCES customer(id),
    client_name TEXT NOT NULL,
    client_email TEXT,
    client_phone TEXT,
    client_address TEXT,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    rental_amount DECIMAL(10,2) NOT NULL,
    salik_qty INTEGER DEFAULT 0,
    salik_rate DECIMAL(10,2) DEFAULT 0,
    salik_amount DECIMAL(10,2) DEFAULT 0,
    traffic_fines_qty INTEGER DEFAULT 0,
    traffic_fines_rate DECIMAL(10,2) DEFAULT 0,
    traffic_fines_amount DECIMAL(10,2) DEFAULT 0,
    other_charges_qty INTEGER DEFAULT 0,
    other_charges_rate DECIMAL(10,2) DEFAULT 0,
    other_charges_amount DECIMAL(10,2) DEFAULT 0,
    other_charges_description TEXT,
    subtotal DECIMAL(10,2) NOT NULL,
    vat_enabled BOOLEAN DEFAULT true,
    vat_rate DECIMAL(5,2) DEFAULT 5,
    vat_amount DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled')),
    payment_terms TEXT DEFAULT 'Net 30',
    notes TEXT,
    payment_id TEXT,
    booking_id UUID REFERENCES booking(id),
    vehicle_details TEXT,
    rental_period TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment table
CREATE TABLE IF NOT EXISTS payment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_date DATE NOT NULL,
    counterpart TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    method TEXT NOT NULL CHECK (method IN ('Cash', 'Bank Transfer', 'Card')),
    reference_no TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expense table
CREATE TABLE IF NOT EXISTS expense (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_date DATE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Salaries', 'Rent', 'Utilities', 'Marketing', 'Supplies', 'Maintenance', 'Travel', 'Other')),
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    paid_to TEXT NOT NULL,
    payment_method TEXT CHECK (payment_method IN ('Cash', 'Bank Transfer', 'Card', 'Company Account')),
    project_client TEXT,
    receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Asset table
CREATE TABLE IF NOT EXISTS asset (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_name TEXT NOT NULL,
    purchase_date DATE NOT NULL,
    purchase_cost DECIMAL(10,2) NOT NULL,
    depreciation_method TEXT DEFAULT 'Straight-Line',
    lifespan_years INTEGER NOT NULL,
    depreciation_start_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory Part table
CREATE TABLE IF NOT EXISTS inventory_part (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Filters', 'Brakes', 'Tyres', 'Engine Oil', 'Batteries', 'Body Parts', 'Other')),
    unit_cost DECIMAL(10,2) NOT NULL,
    quantity_available INTEGER NOT NULL,
    reorder_level INTEGER,
    supplier TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maintenance Log table
CREATE TABLE IF NOT EXISTS maintenance_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicle(id),
    service_date DATE NOT NULL,
    odometer_reading INTEGER,
    service_type TEXT NOT NULL CHECK (service_type IN ('Scheduled Service', 'Repair', 'Inspection', 'Oil Change', 'Tyre Change')),
    vendor TEXT,
    cost DECIMAL(10,2) NOT NULL,
    report_url TEXT,
    notes TEXT,
    next_service_due_date DATE,
    status TEXT DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Due', 'Completed', 'Overdue')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Incident Log table
CREATE TABLE IF NOT EXISTS incident_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicle(id),
    incident_date TIMESTAMP WITH TIME ZONE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Damage', 'Theft', 'Accident', 'Mechanical Issue', 'Other')),
    severity TEXT NOT NULL CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
    description TEXT NOT NULL,
    photo_urls TEXT[],
    responsible_user_id TEXT,
    status TEXT NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'Under Review', 'Resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicle Contract table
CREATE TABLE IF NOT EXISTS vehicle_contract (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicle(id),
    customer_name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    contract_value DECIMAL(10,2) NOT NULL,
    payment_terms TEXT,
    document_url TEXT,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Expired', 'Terminated')),
    booking_id UUID REFERENCES booking(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fine Log table
CREATE TABLE IF NOT EXISTS fine_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicle(id),
    driver_user_id TEXT,
    fine_date DATE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Salik', 'Speeding', 'Parking', 'Miscellaneous')),
    amount DECIMAL(10,2) NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'Unpaid' CHECK (payment_status IN ('Paid', 'Unpaid', 'Disputed')),
    reference_number TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer Document table
CREATE TABLE IF NOT EXISTS customer_document (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customer(id),
    document_type TEXT NOT NULL CHECK (document_type IN ('Driving License', 'Emirates ID', 'Passport', 'Visa')),
    document_part TEXT,
    file_name TEXT,
    file_url TEXT NOT NULL,
    expiry_date DATE,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Car Image table
CREATE TABLE IF NOT EXISTS car_image (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_set_id TEXT NOT NULL,
    model_tag TEXT NOT NULL,
    color_tag TEXT NOT NULL,
    image_url TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agreement table
CREATE TABLE IF NOT EXISTS agreement (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agreement_number TEXT NOT NULL UNIQUE,
    booking_id UUID NOT NULL REFERENCES booking(id),
    customer_id UUID NOT NULL REFERENCES customer(id),
    vehicle_id UUID NOT NULL REFERENCES vehicle(id),
    renter_full_name TEXT NOT NULL,
    nationality TEXT,
    passport_no TEXT,
    emirates_id_no TEXT,
    driving_license_no TEXT,
    issue_place TEXT,
    issue_date DATE,
    expiry_date DATE,
    email_address TEXT,
    mobile_no TEXT,
    home_landline_no TEXT,
    work_landline_no TEXT,
    home_makani_no TEXT,
    object_of_rent TEXT,
    work_address TEXT,
    home_address TEXT,
    car_make TEXT,
    car_model_specs TEXT,
    plates_no TEXT,
    made_year TEXT,
    car_color TEXT,
    daily_rate DECIMAL(10,2),
    weekly_rate DECIMAL(10,2),
    monthly_rate DECIMAL(10,2),
    payment_method TEXT,
    discount_free_days INTEGER,
    out_date_time TIMESTAMP WITH TIME ZONE,
    out_km INTEGER,
    in_date_time TIMESTAMP WITH TIME ZONE,
    in_km INTEGER,
    status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Active', 'Completed', 'Cancelled')),
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff Document table
CREATE TABLE IF NOT EXISTS staff_document (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id TEXT NOT NULL,
    document_type TEXT NOT NULL CHECK (document_type IN ('Employment Contract', 'ID Copy', 'Passport Copy', 'CV/Resume', 'Educational Certificate', 'Professional License', 'Performance Review', 'Training Record', 'Medical Certificate', 'Other')),
    document_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    upload_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    description TEXT,
    is_confidential BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Legal Document table
CREATE TABLE IF NOT EXISTS legal_document (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL CHECK (category IN ('Legal', 'Registration', 'Insurance', 'Compliance', 'Financial', 'Operational', 'HR')),
    document_type TEXT NOT NULL CHECK (document_type IN ('Business License', 'Trade License', 'Legal Contract', 'Court Document', 'Company Registration', 'VAT Registration', 'Tax Registration', 'General Insurance', 'Vehicle Fleet Insurance', 'Liability Insurance', 'Compliance Certificate', 'Audit Report', 'Regulatory Approval', 'Tax Document', 'Bank Document', 'Financial Statement', 'Company Policy', 'Procedure', 'Operational Permit', 'HR Policy', 'Employment Law Document', 'Other')),
    document_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    upload_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    description TEXT,
    is_critical BOOLEAN DEFAULT false,
    renewal_reminder_days INTEGER DEFAULT 30,
    responsible_department TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Document Processing table
CREATE TABLE IF NOT EXISTS ai_document_processing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    document_type TEXT NOT NULL CHECK (document_type IN ('Invoice', 'Contract', 'ID Document', 'License', 'Receipt', 'Insurance Document', 'Bank Statement', 'Business Card', 'Form', 'Other')),
    processing_status TEXT DEFAULT 'Uploaded' CHECK (processing_status IN ('Uploaded', 'Processing', 'Completed', 'Error', 'Under Review')),
    upload_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    processed_date TIMESTAMP WITH TIME ZONE,
    ai_extracted_data JSONB,
    reviewed_data JSONB,
    confidence_scores JSONB,
    processing_notes TEXT,
    is_reviewed BOOLEAN DEFAULT false,
    error_message TEXT,
    processed_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customer_email ON customer(email);
CREATE INDEX IF NOT EXISTS idx_vehicle_license_plate ON vehicle(license_plate);
CREATE INDEX IF NOT EXISTS idx_vehicle_status ON vehicle(status);
CREATE INDEX IF NOT EXISTS idx_booking_customer_id ON booking(customer_id);
CREATE INDEX IF NOT EXISTS idx_booking_vehicle_id ON booking(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_booking_start_date ON booking(start_date);
CREATE INDEX IF NOT EXISTS idx_employee_employee_id ON employee(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_employee_date ON attendance(employee_id, date);
CREATE INDEX IF NOT EXISTS idx_payroll_employee_month_year ON payroll(employee_id, month, year);
CREATE INDEX IF NOT EXISTS idx_invoice_number ON invoice(invoice_number);
CREATE INDEX IF NOT EXISTS idx_maintenance_log_vehicle_id ON maintenance_log(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_incident_log_vehicle_id ON incident_log(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_fine_log_vehicle_id ON fine_log(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_customer_document_customer_id ON customer_document(customer_id);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables with updated_at column
DO $$
DECLARE
    table_name text;
BEGIN
    FOR table_name IN 
        SELECT tablename FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename IN (
            'user_access', 'customer', 'vehicle', 'booking', 'vehicle_document',
            'employee', 'shift', 'attendance', 'payroll', 'leave_request',
            'deduction', 'lead', 'quotation', 'marketing_campaign',
            'corporate_client', 'interaction_log', 'invoice', 'payment',
            'expense', 'asset', 'inventory_part', 'maintenance_log',
            'incident_log', 'vehicle_contract', 'fine_log', 'customer_document',
            'car_image', 'agreement', 'staff_document', 'legal_document',
            'ai_document_processing'
        )
    LOOP
        EXECUTE 'CREATE TRIGGER update_' || table_name || '_updated_at
                 BEFORE UPDATE ON ' || table_name || '
                 FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()';
    END LOOP;
END $$;

-- Enable Row Level Security (RLS) for all tables (optional - uncomment if needed)

DO $$
DECLARE
    table_name text;
BEGIN
    FOR table_name IN 
        SELECT tablename FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename IN (
            'user_access', 'customer', 'vehicle', 'booking', 'vehicle_document',
            'employee', 'shift', 'attendance', 'payroll', 'leave_request',
            'deduction', 'lead', 'quotation', 'marketing_campaign',
            'corporate_client', 'interaction_log', 'invoice', 'payment',
            'expense', 'asset', 'inventory_part', 'maintenance_log',
            'incident_log', 'vehicle_contract', 'fine_log', 'customer_document',
            'car_image', 'agreement', 'staff_document', 'legal_document',
            'ai_document_processing'
        )
    LOOP
        EXECUTE 'ALTER TABLE ' || table_name || ' ENABLE ROW LEVEL SECURITY';
    END LOOP;
END $$;


-- Success message
SELECT 'Schema created successfully! All 22 tables have been created with appropriate constraints, indexes, and triggers.' AS result;