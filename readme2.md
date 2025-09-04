Table Dependencies (Foreign Key Relationships)

  Primary dependency chain:
  - customer ← booking ← agreement, invoice, vehicle_contract
  - customer ← customer_document, quotation
  - vehicle ← booking, vehicle_document, maintenance_log,
  incident_log, vehicle_contract, fine_log
  - lead ← quotation, interaction_log
  - booking ← invoice, agreement, vehicle_contract
  - employee (referenced by employee_id TEXT fields in multiple
  tables)

  Tables that reference users/employees:
  - user_access - stores user_email (your auth table)
  - employee - stores employee_id as TEXT
  - lead - assigned_to_id (TEXT)
  - quotation - sales_rep_id (TEXT)
  - corporate_client - account_manager_id (TEXT)
  - interaction_log - sales_rep_id (TEXT)
  - incident_log - responsible_user_id (TEXT)
  - fine_log - driver_user_id (TEXT)
  - ai_document_processing - processed_by (TEXT)

  Authentication Migration Problem

  Current Situation:
  Your user_access table uses user_email as the primary identifier,
   while other tables reference users through various TEXT fields
  (employee_id, sales_rep_id, etc.). Base44 likely had its own user
   ID system.

  Data Matching Possibilities:

  1. If you have email consistency: If the same emails were used in
   Base44 and will be used in Supabase, you can match users via
  email in the user_access table.
  2. If employee IDs are consistent: If employee_id values in your
  employee table correspond to Base44 user IDs, you could
  potentially map them.

  Data Loss Assessment

  Data that will be lost if users re-register:
  1. HR Data: All employee records, attendance, payroll, leave
  requests tied to employee_id
  2. Sales Data: Lead assignments, quotations, interaction logs
  tied to sales reps
  3. Operational Data: Incident logs, fine logs with responsible
  users
  4. User Access: Role assignments and module permissions in
  user_access

  Data that will be preserved:
  - Customer data (not user-dependent)
  - Vehicle data (not user-dependent)
  - Bookings (customer-vehicle relationships)
  - Financial records (invoices, payments, expenses)
  - Documents (unless tied to specific processors)

  Recommended Migration Strategy

  Option 1 - Email Matching (Best if possible):
  - Export user emails from Base44
  - Match them with existing user_access.user_email
  - Update Supabase auth with same emails
  - Users keep their data if they use same email

  Option 2 - Manual Mapping:
  - Create a mapping table: old_user_id → new_supabase_user_id → 
  email
  - Update all TEXT user reference fields
  - Preserve historical data relationships

  Option 3 - Fresh Start (Simplest but lossy):
  - Keep historical data as "legacy"
  - New users start fresh
  - Lose user-specific assignments and permissions

  The key issue is that your schema uses TEXT fields instead of
  proper foreign keys to Supabase's auth.users table, making user
  migration complex but not impossible if you have email
  consistency.