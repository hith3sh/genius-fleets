-- RLS Policies for Al Jisr Car Rental System
-- Run these in your Supabase SQL editor to fix the customer access issue

-- Customer table policies
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
      AND 'Customers' = ANY(accessible_modules)
    )
  );

-- Allow Staff with customer management access to insert customers
CREATE POLICY "Staff with customer access can insert customers" ON customer
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role = 'Staff'
      AND 'Customers' = ANY(accessible_modules)
    )
  );

-- Allow Staff with customer management access to update customers
CREATE POLICY "Staff with customer access can update customers" ON customer
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_access 
      WHERE user_email = auth.email() 
      AND role = 'Staff'
      AND 'Customers' = ANY(accessible_modules)
    )
  );

-- Optional: Allow customers to read their own data (if needed for customer portal)
-- Uncomment if you want customers to see their own data
-- CREATE POLICY "Customers can read own data" ON customer
--   FOR SELECT USING (email = auth.email());

-- ===== BOOKING TABLE POLICIES =====

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