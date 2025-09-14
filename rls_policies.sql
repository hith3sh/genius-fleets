-- RLS Policies for Al Jisr Car Rental System
-- Run these in your Supabase SQL editor to fix the customer access issue
-- This script handles existing policies by dropping them first if they exist

-- Customer table policies
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Management can read all customers" ON customer;
DROP POLICY IF EXISTS "Management can insert customers" ON customer;
DROP POLICY IF EXISTS "Management can update customers" ON customer;
DROP POLICY IF EXISTS "Management can delete customers" ON customer;
DROP POLICY IF EXISTS "Staff with customer access can read customers" ON customer;
DROP POLICY IF EXISTS "Staff with customer access can insert customers" ON customer;
DROP POLICY IF EXISTS "Staff with customer access can update customers" ON customer;

-- Allow Management role to read all customers
CREATE POLICY "Management can read all customers" ON customer
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to insert customers
CREATE POLICY "Management can insert customers" ON customer
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to update customers
CREATE POLICY "Management can update customers" ON customer
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to delete customers
CREATE POLICY "Management can delete customers" ON customer
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Staff with customer management access to read customers
CREATE POLICY "Staff with customer access can read customers" ON customer
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Customer Management' = ANY(accessible_modules)
    )
  );

-- Allow Staff with customer management access to insert customers
CREATE POLICY "Staff with customer access can insert customers" ON customer
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Customer Management' = ANY(accessible_modules)
    )
  );

-- Allow Staff with customer management access to update customers
CREATE POLICY "Staff with customer access can update customers" ON customer
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Customer Management' = ANY(accessible_modules)
    )
  );

-- Optional: Allow customers to read their own data (if needed for customer portal)
-- Uncomment if you want customers to see their own data
-- CREATE POLICY "Customers can read own data" ON customer
--   FOR SELECT USING (email = auth.email());

-- ===== BOOKING TABLE POLICIES =====

-- Drop existing booking policies if they exist
DROP POLICY IF EXISTS "Management can read all bookings" ON booking;
DROP POLICY IF EXISTS "Management can insert bookings" ON booking;
DROP POLICY IF EXISTS "Management can update bookings" ON booking;
DROP POLICY IF EXISTS "Management can delete bookings" ON booking;
DROP POLICY IF EXISTS "Staff with bookings access can read bookings" ON booking;
DROP POLICY IF EXISTS "Staff with bookings access can insert bookings" ON booking;
DROP POLICY IF EXISTS "Staff with bookings access can update bookings" ON booking;

-- Allow Management role to read all bookings
CREATE POLICY "Management can read all bookings" ON booking
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to insert bookings
CREATE POLICY "Management can insert bookings" ON booking
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to update bookings
CREATE POLICY "Management can update bookings" ON booking
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to delete bookings
CREATE POLICY "Management can delete bookings" ON booking
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Staff with bookings access to read bookings
CREATE POLICY "Staff with bookings access can read bookings" ON booking
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Bookings' = ANY(accessible_modules)
    )
  );

-- Allow Staff with bookings access to insert bookings
CREATE POLICY "Staff with bookings access can insert bookings" ON booking
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Bookings' = ANY(accessible_modules)
    )
  );

-- Allow Staff with bookings access to update bookings
CREATE POLICY "Staff with bookings access can update bookings" ON booking
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Bookings' = ANY(accessible_modules)
    )
  );

-- ===== QUOTATION TABLE POLICIES =====

-- Drop existing quotation policies if they exist
DROP POLICY IF EXISTS "Management can read all quotations" ON quotation;
DROP POLICY IF EXISTS "Management can insert quotations" ON quotation;
DROP POLICY IF EXISTS "Management can update quotations" ON quotation;
DROP POLICY IF EXISTS "Management can delete quotations" ON quotation;
DROP POLICY IF EXISTS "Staff with quotations access can read quotations" ON quotation;
DROP POLICY IF EXISTS "Staff with quotations access can insert quotations" ON quotation;
DROP POLICY IF EXISTS "Staff with quotations access can update quotations" ON quotation;

-- Allow Management role to read all quotations
CREATE POLICY "Management can read all quotations" ON quotation
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to insert quotations
CREATE POLICY "Management can insert quotations" ON quotation
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to update quotations
CREATE POLICY "Management can update quotations" ON quotation
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to delete quotations
CREATE POLICY "Management can delete quotations" ON quotation
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Staff with quotations access to read quotations
CREATE POLICY "Staff with quotations access can read quotations" ON quotation
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Quotations' = ANY(accessible_modules)
    )
  );

-- Allow Staff with quotations access to insert quotations
CREATE POLICY "Staff with quotations access can insert quotations" ON quotation
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Quotations' = ANY(accessible_modules)
    )
  );

-- Allow Staff with quotations access to update quotations
CREATE POLICY "Staff with quotations access can update quotations" ON quotation
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Quotations' = ANY(accessible_modules)
    )
  );

-- ===== LEAD TABLE POLICIES =====

-- Drop existing lead policies if they exist
DROP POLICY IF EXISTS "Management can read all leads" ON lead;
DROP POLICY IF EXISTS "Management can insert leads" ON lead;
DROP POLICY IF EXISTS "Management can update leads" ON lead;
DROP POLICY IF EXISTS "Management can delete leads" ON lead;
DROP POLICY IF EXISTS "Staff with leads access can read leads" ON lead;
DROP POLICY IF EXISTS "Staff with leads access can insert leads" ON lead;
DROP POLICY IF EXISTS "Staff with leads access can update leads" ON lead;

-- Allow Management role to read all leads
CREATE POLICY "Management can read all leads" ON lead
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to insert leads
CREATE POLICY "Management can insert leads" ON lead
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to update leads
CREATE POLICY "Management can update leads" ON lead
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to delete leads
CREATE POLICY "Management can delete leads" ON lead
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Staff with leads access to read leads
CREATE POLICY "Staff with leads access can read leads" ON lead
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Leads' = ANY(accessible_modules)
    )
  );

-- Allow Staff with leads access to insert leads
CREATE POLICY "Staff with leads access can insert leads" ON lead
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Leads' = ANY(accessible_modules)
    )
  );

-- Allow Staff with leads access to update leads
CREATE POLICY "Staff with leads access can update leads" ON lead
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Leads' = ANY(accessible_modules)
    )
  );

-- ===== CORPORATE CLIENT TABLE POLICIES =====

-- Drop existing corporate client policies if they exist
DROP POLICY IF EXISTS "Management can read all corporate clients" ON corporate_client;
DROP POLICY IF EXISTS "Management can insert corporate clients" ON corporate_client;
DROP POLICY IF EXISTS "Management can update corporate clients" ON corporate_client;
DROP POLICY IF EXISTS "Management can delete corporate clients" ON corporate_client;
DROP POLICY IF EXISTS "Staff with corporate clients access can read corporate clients" ON corporate_client;
DROP POLICY IF EXISTS "Staff with corporate clients access can insert corporate clients" ON corporate_client;
DROP POLICY IF EXISTS "Staff with corporate clients access can update corporate clients" ON corporate_client;

-- Allow Management role to read all corporate clients
CREATE POLICY "Management can read all corporate clients" ON corporate_client
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to insert corporate clients
CREATE POLICY "Management can insert corporate clients" ON corporate_client
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to update corporate clients
CREATE POLICY "Management can update corporate clients" ON corporate_client
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to delete corporate clients
CREATE POLICY "Management can delete corporate clients" ON corporate_client
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Staff with corporate clients access to read corporate clients
CREATE POLICY "Staff with corporate clients access can read corporate clients" ON corporate_client
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Corporate Clients' = ANY(accessible_modules)
    )
  );

-- Allow Staff with corporate clients access to insert corporate clients
CREATE POLICY "Staff with corporate clients access can insert corporate clients" ON corporate_client
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Corporate Clients' = ANY(accessible_modules)
    )
  );

-- Allow Staff with corporate clients access to update corporate clients
CREATE POLICY "Staff with corporate clients access can update corporate clients" ON corporate_client
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Corporate Clients' = ANY(accessible_modules)
    )
  );

-- ===== HELPFUL QUERIES =====

-- To assign Management role to a user (replace with actual email):
-- INSERT INTO user_access (user_email, role, accessible_modules)
-- VALUES ('your-email@example.com', 'Management', ARRAY[]::text[])
-- ON CONFLICT (user_email)
-- DO UPDATE SET role = 'Management';

-- To assign Staff role with corporate clients access (replace with actual email):
-- INSERT INTO user_access (user_email, role, accessible_modules)
-- VALUES ('your-email@example.com', 'Staff', ARRAY['Corporate Clients'])
-- ON CONFLICT (user_email)
-- DO UPDATE SET accessible_modules = ARRAY['Corporate Clients'];

-- ===== CAR IMAGE TABLE POLICIES =====

-- Drop existing car image policies if they exist
DROP POLICY IF EXISTS "Management can read all car images" ON car_image;
DROP POLICY IF EXISTS "Management can insert car images" ON car_image;
DROP POLICY IF EXISTS "Management can update car images" ON car_image;
DROP POLICY IF EXISTS "Management can delete car images" ON car_image;
DROP POLICY IF EXISTS "Staff with vehicle images access can read car images" ON car_image;
DROP POLICY IF EXISTS "Staff with vehicle images access can insert car images" ON car_image;
DROP POLICY IF EXISTS "Staff with vehicle images access can update car images" ON car_image;
DROP POLICY IF EXISTS "Staff with vehicle images access can delete car images" ON car_image;

-- Allow Management role to read all car images
CREATE POLICY "Management can read all car images" ON car_image
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to insert car images
CREATE POLICY "Management can insert car images" ON car_image
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to update car images
CREATE POLICY "Management can update car images" ON car_image
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to delete car images
CREATE POLICY "Management can delete car images" ON car_image
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Staff with vehicle images access to read car images
CREATE POLICY "Staff with vehicle images access can read car images" ON car_image
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Vehicle Image Library' = ANY(accessible_modules)
    )
  );

-- Allow Staff with vehicle images access to insert car images
CREATE POLICY "Staff with vehicle images access can insert car images" ON car_image
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Vehicle Image Library' = ANY(accessible_modules)
    )
  );

-- Allow Staff with vehicle images access to update car images
CREATE POLICY "Staff with vehicle images access can update car images" ON car_image
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Vehicle Image Library' = ANY(accessible_modules)
    )
  );

-- Allow Staff with vehicle images access to delete car images
CREATE POLICY "Staff with vehicle images access can delete car images" ON car_image
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Vehicle Image Library' = ANY(accessible_modules)
    )
  );

-- ===== HELPFUL QUERIES FOR CAR IMAGES =====

-- To assign Staff role with vehicle images access (replace with actual email):
-- INSERT INTO user_access (user_email, role, accessible_modules)
-- VALUES ('your-email@example.com', 'Staff', ARRAY['Vehicle Image Library'])
-- ON CONFLICT (user_email)
-- DO UPDATE SET accessible_modules = ARRAY['Vehicle Image Library'];

-- ===== VEHICLE TABLE POLICIES =====

-- Drop existing vehicle policies if they exist
DROP POLICY IF EXISTS "Management can read all vehicles" ON vehicle;
DROP POLICY IF EXISTS "Management can insert vehicles" ON vehicle;
DROP POLICY IF EXISTS "Management can update vehicles" ON vehicle;
DROP POLICY IF EXISTS "Management can delete vehicles" ON vehicle;
DROP POLICY IF EXISTS "Staff with fleet management access can read vehicles" ON vehicle;
DROP POLICY IF EXISTS "Staff with fleet management access can insert vehicles" ON vehicle;
DROP POLICY IF EXISTS "Staff with fleet management access can update vehicles" ON vehicle;
DROP POLICY IF EXISTS "Staff with fleet management access can delete vehicles" ON vehicle;

-- Enable RLS on vehicle table
ALTER TABLE vehicle ENABLE ROW LEVEL SECURITY;

-- Allow Management role to read all vehicles
CREATE POLICY "Management can read all vehicles" ON vehicle
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to insert vehicles
CREATE POLICY "Management can insert vehicles" ON vehicle
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to update vehicles
CREATE POLICY "Management can update vehicles" ON vehicle
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Management role to delete vehicles
CREATE POLICY "Management can delete vehicles" ON vehicle
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Management'
    )
  );

-- Allow Staff with fleet management access to read vehicles
CREATE POLICY "Staff with fleet management access can read vehicles" ON vehicle
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Fleet Management' = ANY(accessible_modules)
    )
  );

-- Allow Staff with fleet management access to insert vehicles
CREATE POLICY "Staff with fleet management access can insert vehicles" ON vehicle
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Fleet Management' = ANY(accessible_modules)
    )
  );

-- Allow Staff with fleet management access to update vehicles
CREATE POLICY "Staff with fleet management access can update vehicles" ON vehicle
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Fleet Management' = ANY(accessible_modules)
    )
  );

-- Allow Staff with fleet management access to delete vehicles
CREATE POLICY "Staff with fleet management access can delete vehicles" ON vehicle
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role = 'Staff'
      AND 'Fleet Management' = ANY(accessible_modules)
    )
  );

-- ===== HELPFUL QUERIES FOR VEHICLE MANAGEMENT =====

-- To assign Staff role with fleet management access (replace with actual email):
-- INSERT INTO user_access (user_email, role, accessible_modules)
-- VALUES ('your-email@example.com', 'Staff', ARRAY['Fleet Management'])
-- ON CONFLICT (user_email)
-- DO UPDATE SET accessible_modules = ARRAY['Fleet Management'];

-- ===== VEHICLE DOCUMENT TABLE POLICIES =====

-- Drop existing vehicle_document policies if they exist
DROP POLICY IF EXISTS "Management can read all vehicle documents" ON vehicle_document;
DROP POLICY IF EXISTS "Management can insert vehicle documents" ON vehicle_document;
DROP POLICY IF EXISTS "Management can update vehicle documents" ON vehicle_document;
DROP POLICY IF EXISTS "Management can delete vehicle documents" ON vehicle_document;
DROP POLICY IF EXISTS "Staff can read vehicle documents with access" ON vehicle_document;
DROP POLICY IF EXISTS "Staff can insert vehicle documents with access" ON vehicle_document;
DROP POLICY IF EXISTS "Staff can update vehicle documents with access" ON vehicle_document;
DROP POLICY IF EXISTS "Staff can delete vehicle documents with access" ON vehicle_document;

-- Enable RLS on vehicle_document table
ALTER TABLE vehicle_document ENABLE ROW LEVEL SECURITY;

-- Management has full access to all vehicle documents
CREATE POLICY "Management can read all vehicle documents" ON vehicle_document
  FOR SELECT USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can insert vehicle documents" ON vehicle_document
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can update vehicle documents" ON vehicle_document
  FOR UPDATE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can delete vehicle documents" ON vehicle_document
  FOR DELETE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

-- Staff with 'Vehicle Documents' module access
CREATE POLICY "Staff can read vehicle documents with access" ON vehicle_document
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Vehicle Documents' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can insert vehicle documents with access" ON vehicle_document
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Vehicle Documents' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can update vehicle documents with access" ON vehicle_document
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Vehicle Documents' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can delete vehicle documents with access" ON vehicle_document
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Vehicle Documents' = ANY(accessible_modules)
    )
  );

-- To assign Staff role with vehicle documents access (replace with actual email):
-- INSERT INTO user_access (user_email, role, accessible_modules)
-- VALUES ('your-email@example.com', 'Staff', ARRAY['Vehicle Documents'])
-- ON CONFLICT (user_email)
-- DO UPDATE SET accessible_modules = ARRAY['Vehicle Documents'];

-- ===== CUSTOMER DOCUMENT TABLE POLICIES =====

-- Drop existing customer_document policies if they exist
DROP POLICY IF EXISTS "Management can read all customer documents" ON customer_document;
DROP POLICY IF EXISTS "Management can insert customer documents" ON customer_document;
DROP POLICY IF EXISTS "Management can update customer documents" ON customer_document;
DROP POLICY IF EXISTS "Management can delete customer documents" ON customer_document;
DROP POLICY IF EXISTS "Staff can read customer documents with access" ON customer_document;
DROP POLICY IF EXISTS "Staff can insert customer documents with access" ON customer_document;
DROP POLICY IF EXISTS "Staff can update customer documents with access" ON customer_document;
DROP POLICY IF EXISTS "Staff can delete customer documents with access" ON customer_document;

-- Enable RLS on customer_document table
ALTER TABLE customer_document ENABLE ROW LEVEL SECURITY;

-- Management has full access to all customer documents
CREATE POLICY "Management can read all customer documents" ON customer_document
  FOR SELECT USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can insert customer documents" ON customer_document
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can update customer documents" ON customer_document
  FOR UPDATE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can delete customer documents" ON customer_document
  FOR DELETE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

-- Staff with 'Customer Documents' module access
CREATE POLICY "Staff can read customer documents with access" ON customer_document
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Customer Documents' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can insert customer documents with access" ON customer_document
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Customer Documents' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can update customer documents with access" ON customer_document
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Customer Documents' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can delete customer documents with access" ON customer_document
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Customer Documents' = ANY(accessible_modules)
    )
  );

-- To assign Staff role with customer documents access (replace with actual email):
-- INSERT INTO user_access (user_email, role, accessible_modules)
-- VALUES ('your-email@example.com', 'Staff', ARRAY['Customer Documents'])
-- ON CONFLICT (user_email)
-- DO UPDATE SET accessible_modules = ARRAY['Customer Documents'];

-- ===== EMPLOYEE TABLE POLICIES =====

-- Drop existing employee policies if they exist
DROP POLICY IF EXISTS "Management can read all employees" ON employee;
DROP POLICY IF EXISTS "Management can insert employees" ON employee;
DROP POLICY IF EXISTS "Management can update employees" ON employee;
DROP POLICY IF EXISTS "Management can delete employees" ON employee;
DROP POLICY IF EXISTS "Staff can read employees with access" ON employee;
DROP POLICY IF EXISTS "Staff can insert employees with access" ON employee;
DROP POLICY IF EXISTS "Staff can update employees with access" ON employee;
DROP POLICY IF EXISTS "Staff can delete employees with access" ON employee;

-- Enable RLS on employee table
ALTER TABLE employee ENABLE ROW LEVEL SECURITY;

-- Management has full access to all employees
CREATE POLICY "Management can read all employees" ON employee
  FOR SELECT USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can insert employees" ON employee
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can update employees" ON employee
  FOR UPDATE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can delete employees" ON employee
  FOR DELETE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

-- Staff with 'HR Employees' module access
CREATE POLICY "Staff can read employees with access" ON employee
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'HR Employees' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can insert employees with access" ON employee
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'HR Employees' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can update employees with access" ON employee
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'HR Employees' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can delete employees with access" ON employee
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'HR Employees' = ANY(accessible_modules)
    )
  );

-- ===== STAFF DOCUMENT TABLE POLICIES =====

-- Drop existing staff_document policies if they exist
DROP POLICY IF EXISTS "Management can read all staff documents" ON staff_document;
DROP POLICY IF EXISTS "Management can insert staff documents" ON staff_document;
DROP POLICY IF EXISTS "Management can update staff documents" ON staff_document;
DROP POLICY IF EXISTS "Management can delete staff documents" ON staff_document;
DROP POLICY IF EXISTS "Staff can read staff documents with access" ON staff_document;
DROP POLICY IF EXISTS "Staff can insert staff documents with access" ON staff_document;
DROP POLICY IF EXISTS "Staff can update staff documents with access" ON staff_document;
DROP POLICY IF EXISTS "Staff can delete staff documents with access" ON staff_document;

-- Enable RLS on staff_document table
ALTER TABLE staff_document ENABLE ROW LEVEL SECURITY;

-- Management has full access to all staff documents
CREATE POLICY "Management can read all staff documents" ON staff_document
  FOR SELECT USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can insert staff documents" ON staff_document
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can update staff documents" ON staff_document
  FOR UPDATE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can delete staff documents" ON staff_document
  FOR DELETE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

-- Staff with 'Staff Documents' module access
CREATE POLICY "Staff can read staff documents with access" ON staff_document
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Staff Documents' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can insert staff documents with access" ON staff_document
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Staff Documents' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can update staff documents with access" ON staff_document
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Staff Documents' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can delete staff documents with access" ON staff_document
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Staff Documents' = ANY(accessible_modules)
    )
  );

-- To assign Staff role with employee and staff documents access (replace with actual email):
-- INSERT INTO user_access (user_email, role, accessible_modules)
-- VALUES ('your-email@example.com', 'Staff', ARRAY['HR Employees', 'Staff Documents'])
-- ON CONFLICT (user_email)
-- DO UPDATE SET accessible_modules = ARRAY['HR Employees', 'Staff Documents'];

-- ===== LEGAL DOCUMENT TABLE POLICIES =====

-- Drop existing legal_document policies if they exist
DROP POLICY IF EXISTS "Management can read all legal documents" ON legal_document;
DROP POLICY IF EXISTS "Management can insert legal documents" ON legal_document;
DROP POLICY IF EXISTS "Management can update legal documents" ON legal_document;
DROP POLICY IF EXISTS "Management can delete legal documents" ON legal_document;
DROP POLICY IF EXISTS "Staff can read legal documents with access" ON legal_document;
DROP POLICY IF EXISTS "Staff can insert legal documents with access" ON legal_document;
DROP POLICY IF EXISTS "Staff can update legal documents with access" ON legal_document;
DROP POLICY IF EXISTS "Staff can delete legal documents with access" ON legal_document;

-- Enable RLS on legal_document table
ALTER TABLE legal_document ENABLE ROW LEVEL SECURITY;

-- Management has full access to all legal documents
CREATE POLICY "Management can read all legal documents" ON legal_document
  FOR SELECT USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can insert legal documents" ON legal_document
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can update legal documents" ON legal_document
  FOR UPDATE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can delete legal documents" ON legal_document
  FOR DELETE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

-- Staff with 'Legal Documents' module access
CREATE POLICY "Staff can read legal documents with access" ON legal_document
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Legal Documents' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can insert legal documents with access" ON legal_document
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Legal Documents' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can update legal documents with access" ON legal_document
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Legal Documents' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can delete legal documents with access" ON legal_document
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Legal Documents' = ANY(accessible_modules)
    )
  );

-- To assign Staff role with legal documents access (replace with actual email):
-- INSERT INTO user_access (user_email, role, accessible_modules)
-- VALUES ('your-email@example.com', 'Staff', ARRAY['Legal Documents'])
-- ON CONFLICT (user_email)
-- DO UPDATE SET accessible_modules = ARRAY['Legal Documents'];

-- ===== AI DOCUMENT PROCESSING TABLE POLICIES =====

-- Drop existing ai_document_processing policies if they exist
DROP POLICY IF EXISTS "Management can read all ai document processing" ON ai_document_processing;
DROP POLICY IF EXISTS "Management can insert ai document processing" ON ai_document_processing;
DROP POLICY IF EXISTS "Management can update ai document processing" ON ai_document_processing;
DROP POLICY IF EXISTS "Management can delete ai document processing" ON ai_document_processing;
DROP POLICY IF EXISTS "Staff can read ai document processing with access" ON ai_document_processing;
DROP POLICY IF EXISTS "Staff can insert ai document processing with access" ON ai_document_processing;
DROP POLICY IF EXISTS "Staff can update ai document processing with access" ON ai_document_processing;
DROP POLICY IF EXISTS "Staff can delete ai document processing with access" ON ai_document_processing;

-- Enable RLS on ai_document_processing table
ALTER TABLE ai_document_processing ENABLE ROW LEVEL SECURITY;

-- Management has full access to all AI document processing records
CREATE POLICY "Management can read all ai document processing" ON ai_document_processing
  FOR SELECT USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can insert ai document processing" ON ai_document_processing
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can update ai document processing" ON ai_document_processing
  FOR UPDATE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can delete ai document processing" ON ai_document_processing
  FOR DELETE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

-- Staff with 'AI Document Processing' module access
CREATE POLICY "Staff can read ai document processing with access" ON ai_document_processing
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'AI Document Processing' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can insert ai document processing with access" ON ai_document_processing
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'AI Document Processing' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can update ai document processing with access" ON ai_document_processing
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'AI Document Processing' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can delete ai document processing with access" ON ai_document_processing
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'AI Document Processing' = ANY(accessible_modules)
    )
  );

-- ===== INCIDENT LOG TABLE POLICIES =====

-- Drop existing incident_log policies if they exist
DROP POLICY IF EXISTS "Management can read all incident logs" ON incident_log;
DROP POLICY IF EXISTS "Management can insert incident logs" ON incident_log;
DROP POLICY IF EXISTS "Management can update incident logs" ON incident_log;
DROP POLICY IF EXISTS "Management can delete incident logs" ON incident_log;
DROP POLICY IF EXISTS "Staff can read incident logs with access" ON incident_log;
DROP POLICY IF EXISTS "Staff can insert incident logs with access" ON incident_log;
DROP POLICY IF EXISTS "Staff can update incident logs with access" ON incident_log;
DROP POLICY IF EXISTS "Staff can delete incident logs with access" ON incident_log;

-- Enable RLS on incident_log table
ALTER TABLE incident_log ENABLE ROW LEVEL SECURITY;

-- Management has full access to all incident logs
CREATE POLICY "Management can read all incident logs" ON incident_log
  FOR SELECT USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can insert incident logs" ON incident_log
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can update incident logs" ON incident_log
  FOR UPDATE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can delete incident logs" ON incident_log
  FOR DELETE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

-- Staff with 'Damage Logs' module access
CREATE POLICY "Staff can read incident logs with access" ON incident_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Damage Logs' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can insert incident logs with access" ON incident_log
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Damage Logs' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can update incident logs with access" ON incident_log
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Damage Logs' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can delete incident logs with access" ON incident_log
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Damage Logs' = ANY(accessible_modules)
    )
  );

-- ===== MAINTENANCE LOG TABLE POLICIES =====

-- Drop existing maintenance_log policies if they exist
DROP POLICY IF EXISTS "Management can read all maintenance logs" ON maintenance_log;
DROP POLICY IF EXISTS "Management can insert maintenance logs" ON maintenance_log;
DROP POLICY IF EXISTS "Management can update maintenance logs" ON maintenance_log;
DROP POLICY IF EXISTS "Management can delete maintenance logs" ON maintenance_log;
DROP POLICY IF EXISTS "Staff can read maintenance logs with access" ON maintenance_log;
DROP POLICY IF EXISTS "Staff can insert maintenance logs with access" ON maintenance_log;
DROP POLICY IF EXISTS "Staff can update maintenance logs with access" ON maintenance_log;
DROP POLICY IF EXISTS "Staff can delete maintenance logs with access" ON maintenance_log;

-- Enable RLS on maintenance_log table
ALTER TABLE maintenance_log ENABLE ROW LEVEL SECURITY;

-- Management has full access to all maintenance logs
CREATE POLICY "Management can read all maintenance logs" ON maintenance_log
  FOR SELECT USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can insert maintenance logs" ON maintenance_log
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can update maintenance logs" ON maintenance_log
  FOR UPDATE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can delete maintenance logs" ON maintenance_log
  FOR DELETE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

-- Staff with 'Fleet Health' module access
CREATE POLICY "Staff can read maintenance logs with access" ON maintenance_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role != 'Management'
      AND 'Fleet Health' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can insert maintenance logs with access" ON maintenance_log
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role != 'Management'
      AND 'Fleet Health' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can update maintenance logs with access" ON maintenance_log
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role != 'Management'
      AND 'Fleet Health' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can delete maintenance logs with access" ON maintenance_log
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access
      WHERE user_email = auth.email()
      AND role != 'Management'
      AND 'Fleet Health' = ANY(accessible_modules)
    )
  );

-- ===== VEHICLE CONTRACT TABLE POLICIES =====

-- Drop existing vehicle_contract policies if they exist
DROP POLICY IF EXISTS "Management can read all vehicle contracts" ON vehicle_contract;
DROP POLICY IF EXISTS "Management can insert vehicle contracts" ON vehicle_contract;
DROP POLICY IF EXISTS "Management can update vehicle contracts" ON vehicle_contract;
DROP POLICY IF EXISTS "Management can delete vehicle contracts" ON vehicle_contract;
DROP POLICY IF EXISTS "Staff can read vehicle contracts with access" ON vehicle_contract;
DROP POLICY IF EXISTS "Staff can insert vehicle contracts with access" ON vehicle_contract;
DROP POLICY IF EXISTS "Staff can update vehicle contracts with access" ON vehicle_contract;
DROP POLICY IF EXISTS "Staff can delete vehicle contracts with access" ON vehicle_contract;

-- Enable RLS on vehicle_contract table
ALTER TABLE vehicle_contract ENABLE ROW LEVEL SECURITY;

-- Management has full access to all vehicle contracts
CREATE POLICY "Management can read all vehicle contracts" ON vehicle_contract
  FOR SELECT USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can insert vehicle contracts" ON vehicle_contract
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can update vehicle contracts" ON vehicle_contract
  FOR UPDATE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

CREATE POLICY "Management can delete vehicle contracts" ON vehicle_contract
  FOR DELETE USING (EXISTS (SELECT 1 FROM user_access WHERE user_email = auth.email() AND role = 'Management'));

-- Staff with 'Contracts' module access
CREATE POLICY "Staff can read vehicle contracts with access" ON vehicle_contract
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Contracts' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can insert vehicle contracts with access" ON vehicle_contract
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Contracts' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can update vehicle contracts with access" ON vehicle_contract
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Contracts' = ANY(accessible_modules)
    )
  );

CREATE POLICY "Staff can delete vehicle contracts with access" ON vehicle_contract
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role != 'Management' 
      AND 'Contracts' = ANY(accessible_modules)
    )
  );

-- To assign Staff role with AI document processing access (replace with actual email):
-- INSERT INTO user_access (user_email, role, accessible_modules)
-- VALUES ('your-email@example.com', 'Staff', ARRAY['AI Document Processing'])
-- ON CONFLICT (user_email)
-- DO UPDATE SET accessible_modules = ARRAY['AI Document Processing'];