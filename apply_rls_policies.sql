-- Row Level Security (RLS) Policies for Al Jisr Car Rental System
-- Apply these policies after importing your data to Railway PostgreSQL

-- Function to set user context (call this when user logs in via Auth0)
CREATE OR REPLACE FUNCTION set_current_user_email(email TEXT)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_user_email', email, false);
END;
$$ LANGUAGE plpgsql;

-- Helper function to get current user's role
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT role FROM user_access
    WHERE user_email = current_setting('app.current_user_email', true)
  );
END;
$$ LANGUAGE plpgsql;

-- Helper function to check if user has module access
CREATE OR REPLACE FUNCTION user_has_module_access(module_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT module_name = ANY(accessible_modules) FROM user_access
    WHERE user_email = current_setting('app.current_user_email', true)
  );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- USER ACCESS POLICIES
-- ============================================================================

-- Users can only see their own access record
CREATE POLICY "users_select_own_access" ON user_access
  FOR SELECT USING (
    user_email = current_setting('app.current_user_email', true)
  );

-- Management can view all user access records
CREATE POLICY "management_select_all_access" ON user_access
  FOR SELECT USING (
    get_current_user_role() = 'Management'
  );

-- Management can insert/update user access
CREATE POLICY "management_manage_access" ON user_access
  FOR ALL USING (
    get_current_user_role() = 'Management'
  );

-- ============================================================================
-- CUSTOMER POLICIES
-- ============================================================================

-- Staff and Management can manage customers
CREATE POLICY "staff_manage_customers" ON customer
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('customers')
  );

-- ============================================================================
-- VEHICLE POLICIES
-- ============================================================================

-- Staff and Management can manage vehicles
CREATE POLICY "staff_manage_vehicles" ON vehicle
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('fleet')
  );

-- ============================================================================
-- BOOKING POLICIES
-- ============================================================================

-- Staff and Management can manage bookings
CREATE POLICY "staff_manage_bookings" ON booking
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('bookings')
  );

-- Customers can view their own bookings
CREATE POLICY "customers_view_own_bookings" ON booking
  FOR SELECT USING (
    get_current_user_role() = 'Customer'
    AND customer_id IN (
      SELECT id FROM customer
      WHERE email = current_setting('app.current_user_email', true)
    )
  );

-- ============================================================================
-- VEHICLE DOCUMENT POLICIES
-- ============================================================================

CREATE POLICY "staff_manage_vehicle_documents" ON vehicle_document
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('fleet')
  );

-- ============================================================================
-- EMPLOYEE POLICIES (HR Module)
-- ============================================================================

-- Management can manage all employees
CREATE POLICY "management_manage_employees" ON employee
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('hr')
  );

-- Employees can view their own record
CREATE POLICY "employees_view_own_record" ON employee
  FOR SELECT USING (
    email = current_setting('app.current_user_email', true)
  );

-- Employees can update their own non-sensitive fields
CREATE POLICY "employees_update_own_record" ON employee
  FOR UPDATE USING (
    email = current_setting('app.current_user_email', true)
  );

-- ============================================================================
-- ATTENDANCE POLICIES
-- ============================================================================

-- Management can manage all attendance
CREATE POLICY "management_manage_attendance" ON attendance
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('hr')
  );

-- Employees can view their own attendance
CREATE POLICY "employees_view_own_attendance" ON attendance
  FOR SELECT USING (
    employee_id IN (
      SELECT employee_id FROM employee
      WHERE email = current_setting('app.current_user_email', true)
    )
  );

-- ============================================================================
-- LEAVE REQUEST POLICIES
-- ============================================================================

-- Employees can manage their own leave requests
CREATE POLICY "employees_manage_own_leave" ON leave_request
  FOR ALL USING (
    employee_id IN (
      SELECT employee_id FROM employee
      WHERE email = current_setting('app.current_user_email', true)
    )
  );

-- Management can manage all leave requests
CREATE POLICY "management_manage_all_leave" ON leave_request
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('hr')
  );

-- ============================================================================
-- PAYROLL POLICIES
-- ============================================================================

-- Management can manage all payroll
CREATE POLICY "management_manage_payroll" ON payroll
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('hr')
  );

-- Employees can view their own payroll
CREATE POLICY "employees_view_own_payroll" ON payroll
  FOR SELECT USING (
    employee_id IN (
      SELECT employee_id FROM employee
      WHERE email = current_setting('app.current_user_email', true)
    )
  );

-- ============================================================================
-- SHIFT POLICIES
-- ============================================================================

CREATE POLICY "management_manage_shifts" ON shift
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('hr')
  );

-- Staff can view shifts
CREATE POLICY "staff_view_shifts" ON shift
  FOR SELECT USING (
    get_current_user_role() IN ('Management', 'Staff')
  );

-- ============================================================================
-- DEDUCTION POLICIES
-- ============================================================================

CREATE POLICY "management_manage_deductions" ON deduction
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('hr')
  );

-- ============================================================================
-- SALES & MARKETING POLICIES
-- ============================================================================

-- Leads
CREATE POLICY "staff_manage_leads" ON lead
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('sales')
  );

-- Quotations
CREATE POLICY "staff_manage_quotations" ON quotation
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('sales')
  );

-- Marketing Campaigns
CREATE POLICY "management_manage_campaigns" ON marketing_campaign
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('marketing')
  );

-- Corporate Clients
CREATE POLICY "staff_manage_corporate_clients" ON corporate_client
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('sales')
  );

-- Interaction Logs
CREATE POLICY "staff_manage_interaction_logs" ON interaction_log
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('sales')
  );

-- ============================================================================
-- FINANCIAL POLICIES
-- ============================================================================

-- Invoices
CREATE POLICY "management_manage_invoices" ON invoice
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('financial')
  );

-- Staff can view invoices
CREATE POLICY "staff_view_invoices" ON invoice
  FOR SELECT USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('financial')
  );

-- Payments
CREATE POLICY "management_manage_payments" ON payment
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('financial')
  );

-- Expenses
CREATE POLICY "management_manage_expenses" ON expense
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('financial')
  );

-- Assets
CREATE POLICY "management_manage_assets" ON asset
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('financial')
  );

-- ============================================================================
-- MAINTENANCE & FLEET POLICIES
-- ============================================================================

-- Inventory Parts
CREATE POLICY "staff_manage_inventory" ON inventory_part
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('fleet')
  );

-- Maintenance Logs
CREATE POLICY "staff_manage_maintenance" ON maintenance_log
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('fleet')
  );

-- Incident Logs
CREATE POLICY "staff_manage_incidents" ON incident_log
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('fleet')
  );

-- Vehicle Contracts
CREATE POLICY "management_manage_vehicle_contracts" ON vehicle_contract
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('fleet')
  );

-- Fine Logs
CREATE POLICY "staff_manage_fines" ON fine_log
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('fleet')
  );

-- ============================================================================
-- DOCUMENT POLICIES
-- ============================================================================

-- Customer Documents
CREATE POLICY "staff_manage_customer_docs" ON customer_document
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('customers')
  );

-- Car Images
CREATE POLICY "staff_manage_car_images" ON car_image
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('fleet')
  );

-- Agreements
CREATE POLICY "staff_manage_agreements" ON agreement
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
    AND user_has_module_access('bookings')
  );

-- Staff Documents
CREATE POLICY "management_manage_staff_docs" ON staff_document
  FOR ALL USING (
    get_current_user_role() = 'Management'
    AND user_has_module_access('hr')
  );

-- Employees can view their own documents
CREATE POLICY "employees_view_own_docs" ON staff_document
  FOR SELECT USING (
    employee_id IN (
      SELECT employee_id FROM employee
      WHERE email = current_setting('app.current_user_email', true)
    )
    AND is_confidential = false
  );

-- Legal Documents
CREATE POLICY "management_manage_legal_docs" ON legal_document
  FOR ALL USING (
    get_current_user_role() = 'Management'
  );

-- AI Document Processing
CREATE POLICY "staff_manage_ai_processing" ON ai_document_processing
  FOR ALL USING (
    get_current_user_role() IN ('Management', 'Staff')
  );

SELECT 'RLS policies applied successfully!' as result;