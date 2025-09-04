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