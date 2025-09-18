


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."create_user_access_record"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
  BEGIN
    -- Only create access record when email is confirmed for the first time
    IF OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT
  NULL THEN
      -- Check if access record already exists
      IF NOT EXISTS (
        SELECT 1 FROM user_access WHERE user_email = NEW.email
      ) THEN
        -- Insert default access record
        INSERT INTO user_access (user_email, role, accessible_modules)
        VALUES (
          NEW.email,
          'Staff',
          '["Dashboard"]'::jsonb
        );

        -- Log the creation (will appear in Supabase logs)
        RAISE NOTICE 'Created default access record for user: %',
  NEW.email;
      END IF;
    END IF;

    RETURN NEW;
  END;
  $$;


ALTER FUNCTION "public"."create_user_access_record"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."agreement" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "agreement_number" "text" NOT NULL,
    "booking_id" "uuid" NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "vehicle_id" "uuid" NOT NULL,
    "renter_full_name" "text" NOT NULL,
    "nationality" "text",
    "passport_no" "text",
    "emirates_id_no" "text",
    "driving_license_no" "text",
    "issue_place" "text",
    "issue_date" "date",
    "expiry_date" "date",
    "email_address" "text",
    "mobile_no" "text",
    "home_landline_no" "text",
    "work_landline_no" "text",
    "home_makani_no" "text",
    "object_of_rent" "text",
    "work_address" "text",
    "home_address" "text",
    "car_make" "text",
    "car_model_specs" "text",
    "plates_no" "text",
    "made_year" "text",
    "car_color" "text",
    "daily_rate" numeric(10,2),
    "weekly_rate" numeric(10,2),
    "monthly_rate" numeric(10,2),
    "payment_method" "text",
    "discount_free_days" integer,
    "out_date_time" timestamp with time zone,
    "out_km" integer,
    "in_date_time" timestamp with time zone,
    "in_km" integer,
    "status" "text" DEFAULT 'Draft'::"text",
    "pdf_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "agreement_status_check" CHECK (("status" = ANY (ARRAY['Draft'::"text", 'Active'::"text", 'Completed'::"text", 'Cancelled'::"text"])))
);


ALTER TABLE "public"."agreement" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ai_document_processing" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "document_name" "text" NOT NULL,
    "file_url" "text" NOT NULL,
    "file_type" "text",
    "document_type" "text" NOT NULL,
    "processing_status" "text" DEFAULT 'Uploaded'::"text",
    "upload_date" timestamp with time zone DEFAULT "now"() NOT NULL,
    "processed_date" timestamp with time zone,
    "ai_extracted_data" "jsonb",
    "reviewed_data" "jsonb",
    "confidence_scores" "jsonb",
    "processing_notes" "text",
    "is_reviewed" boolean DEFAULT false,
    "error_message" "text",
    "processed_by" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "ai_document_processing_document_type_check" CHECK (("document_type" = ANY (ARRAY['Invoice'::"text", 'Contract'::"text", 'ID Document'::"text", 'License'::"text", 'Receipt'::"text", 'Insurance Document'::"text", 'Bank Statement'::"text", 'Business Card'::"text", 'Form'::"text", 'Other'::"text"]))),
    CONSTRAINT "ai_document_processing_processing_status_check" CHECK (("processing_status" = ANY (ARRAY['Uploaded'::"text", 'Processing'::"text", 'Completed'::"text", 'Error'::"text", 'Under Review'::"text"])))
);


ALTER TABLE "public"."ai_document_processing" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."asset" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "asset_name" "text" NOT NULL,
    "purchase_date" "date" NOT NULL,
    "purchase_cost" numeric(10,2) NOT NULL,
    "depreciation_method" "text" DEFAULT 'Straight-Line'::"text",
    "lifespan_years" integer NOT NULL,
    "depreciation_start_date" "date" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."asset" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."attendance" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "employee_id" "text" NOT NULL,
    "date" "date" NOT NULL,
    "check_in_time" timestamp with time zone,
    "check_out_time" timestamp with time zone,
    "shift_id" "uuid",
    "status" "text" NOT NULL,
    "working_hours" numeric(4,2),
    "overtime_hours" numeric(4,2),
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "attendance_status_check" CHECK (("status" = ANY (ARRAY['Present'::"text", 'Absent'::"text", 'On Leave'::"text", 'Holiday'::"text"])))
);


ALTER TABLE "public"."attendance" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."booking" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "vehicle_id" "uuid" NOT NULL,
    "booking_date" "date" DEFAULT CURRENT_DATE,
    "start_date" "date" NOT NULL,
    "end_date" "date" NOT NULL,
    "pickup_location" "text",
    "dropoff_location" "text",
    "total_amount" numeric(10,2) NOT NULL,
    "vat_amount" numeric(10,2),
    "final_amount" numeric(10,2),
    "status" "text" DEFAULT 'Pending'::"text",
    "payment_status" "text" DEFAULT 'Pending'::"text",
    "special_requests" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "booking_payment_status_check" CHECK (("payment_status" = ANY (ARRAY['Pending'::"text", 'Paid'::"text", 'Partial'::"text", 'Refunded'::"text"]))),
    CONSTRAINT "booking_status_check" CHECK (("status" = ANY (ARRAY['Pending'::"text", 'Confirmed'::"text", 'Active'::"text", 'Completed'::"text", 'Cancelled'::"text"])))
);


ALTER TABLE "public"."booking" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."car_image" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "image_set_id" "text" NOT NULL,
    "model_tag" "text" NOT NULL,
    "color_tag" "text" NOT NULL,
    "image_url" "text" NOT NULL,
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."car_image" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."corporate_client" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "company_name" "text" NOT NULL,
    "account_manager_id" "text",
    "billing_agreement" "text",
    "contacts" "jsonb",
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."corporate_client" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."customer" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "license_number" "text",
    "address" "text",
    "customer_type" "text" DEFAULT 'Individual'::"text",
    "status" "text" DEFAULT 'Active'::"text",
    "tags" "text"[],
    "residency_status" "text",
    "driving_license_url" "text",
    "passport_url" "text",
    "emirates_id_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "customer_customer_type_check" CHECK (("customer_type" = ANY (ARRAY['Individual'::"text", 'Corporate'::"text"]))),
    CONSTRAINT "customer_residency_status_check" CHECK (("residency_status" = ANY (ARRAY['Resident'::"text", 'Visitor'::"text"]))),
    CONSTRAINT "customer_status_check" CHECK (("status" = ANY (ARRAY['Active'::"text", 'Inactive'::"text", 'Blocked'::"text"])))
);


ALTER TABLE "public"."customer" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."customer_document" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "document_type" "text" NOT NULL,
    "document_part" "text",
    "file_name" "text",
    "file_url" "text" NOT NULL,
    "expiry_date" "date",
    "is_verified" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "customer_document_document_type_check" CHECK (("document_type" = ANY (ARRAY['Driving License'::"text", 'Emirates ID'::"text", 'Passport'::"text", 'Visa'::"text"])))
);


ALTER TABLE "public"."customer_document" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."deduction" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "employee_id" "text" NOT NULL,
    "date" "date" NOT NULL,
    "type" "text" NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "reason" "text",
    "payroll_run_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "deduction_type_check" CHECK (("type" = ANY (ARRAY['Advance'::"text", 'Loan'::"text", 'Fine'::"text", 'Other'::"text"])))
);


ALTER TABLE "public"."deduction" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."employee" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "employee_id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "date_of_birth" "date",
    "nationality" "text",
    "gender" "text",
    "address" "text",
    "department" "text" NOT NULL,
    "designation" "text" NOT NULL,
    "join_date" "date" NOT NULL,
    "employment_type" "text",
    "reporting_manager_id" "text",
    "status" "text" DEFAULT 'Active'::"text" NOT NULL,
    "base_salary" numeric(10,2) NOT NULL,
    "passport_copy_url" "text",
    "visa_page_url" "text",
    "emirates_id_url" "text",
    "other_documents" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "employee_employment_type_check" CHECK (("employment_type" = ANY (ARRAY['Full-time'::"text", 'Part-time'::"text", 'Contract'::"text"]))),
    CONSTRAINT "employee_gender_check" CHECK (("gender" = ANY (ARRAY['Male'::"text", 'Female'::"text", 'Other'::"text"]))),
    CONSTRAINT "employee_status_check" CHECK (("status" = ANY (ARRAY['Active'::"text", 'Inactive'::"text"])))
);


ALTER TABLE "public"."employee" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."expense" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "expense_date" "date" NOT NULL,
    "category" "text" NOT NULL,
    "description" "text" NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "paid_to" "text" NOT NULL,
    "payment_method" "text",
    "project_client" "text",
    "receipt_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "expense_category_check" CHECK (("category" = ANY (ARRAY['Salaries'::"text", 'Rent'::"text", 'Utilities'::"text", 'Marketing'::"text", 'Supplies'::"text", 'Maintenance'::"text", 'Travel'::"text", 'Other'::"text"]))),
    CONSTRAINT "expense_payment_method_check" CHECK (("payment_method" = ANY (ARRAY['Cash'::"text", 'Bank Transfer'::"text", 'Card'::"text", 'Company Account'::"text"])))
);


ALTER TABLE "public"."expense" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."fine_log" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "vehicle_id" "uuid" NOT NULL,
    "driver_user_id" "text",
    "fine_date" "date" NOT NULL,
    "type" "text" NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "payment_status" "text" DEFAULT 'Unpaid'::"text" NOT NULL,
    "reference_number" "text",
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "fine_log_payment_status_check" CHECK (("payment_status" = ANY (ARRAY['Paid'::"text", 'Unpaid'::"text", 'Disputed'::"text"]))),
    CONSTRAINT "fine_log_type_check" CHECK (("type" = ANY (ARRAY['Salik'::"text", 'Speeding'::"text", 'Parking'::"text", 'Miscellaneous'::"text"])))
);


ALTER TABLE "public"."fine_log" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."incident_log" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "vehicle_id" "uuid" NOT NULL,
    "incident_date" timestamp with time zone NOT NULL,
    "type" "text" NOT NULL,
    "severity" "text" NOT NULL,
    "description" "text" NOT NULL,
    "photo_urls" "text"[],
    "responsible_user_id" "text",
    "status" "text" DEFAULT 'Open'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "incident_log_severity_check" CHECK (("severity" = ANY (ARRAY['Low'::"text", 'Medium'::"text", 'High'::"text", 'Critical'::"text"]))),
    CONSTRAINT "incident_log_status_check" CHECK (("status" = ANY (ARRAY['Open'::"text", 'Under Review'::"text", 'Resolved'::"text"]))),
    CONSTRAINT "incident_log_type_check" CHECK (("type" = ANY (ARRAY['Damage'::"text", 'Theft'::"text", 'Accident'::"text", 'Mechanical Issue'::"text", 'Other'::"text"])))
);


ALTER TABLE "public"."incident_log" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."interaction_log" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "customer_id" "uuid",
    "lead_id" "uuid",
    "type" "text" NOT NULL,
    "notes" "text" NOT NULL,
    "sales_rep_id" "text" NOT NULL,
    "date" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "interaction_log_type_check" CHECK (("type" = ANY (ARRAY['Call'::"text", 'Email'::"text", 'Meeting'::"text", 'Note'::"text"])))
);


ALTER TABLE "public"."interaction_log" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."inventory_part" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "item_name" "text" NOT NULL,
    "category" "text" NOT NULL,
    "unit_cost" numeric(10,2) NOT NULL,
    "quantity_available" integer NOT NULL,
    "reorder_level" integer,
    "supplier" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "inventory_part_category_check" CHECK (("category" = ANY (ARRAY['Filters'::"text", 'Brakes'::"text", 'Tyres'::"text", 'Engine Oil'::"text", 'Batteries'::"text", 'Body Parts'::"text", 'Other'::"text"])))
);


ALTER TABLE "public"."inventory_part" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."invoice" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "invoice_number" "text" NOT NULL,
    "client_id" "uuid",
    "client_name" "text" NOT NULL,
    "client_email" "text",
    "client_phone" "text",
    "client_address" "text",
    "invoice_date" "date" NOT NULL,
    "due_date" "date" NOT NULL,
    "rental_amount" numeric(10,2) NOT NULL,
    "salik_qty" integer DEFAULT 0,
    "salik_rate" numeric(10,2) DEFAULT 0,
    "salik_amount" numeric(10,2) DEFAULT 0,
    "traffic_fines_qty" integer DEFAULT 0,
    "traffic_fines_rate" numeric(10,2) DEFAULT 0,
    "traffic_fines_amount" numeric(10,2) DEFAULT 0,
    "other_charges_qty" integer DEFAULT 0,
    "other_charges_rate" numeric(10,2) DEFAULT 0,
    "other_charges_amount" numeric(10,2) DEFAULT 0,
    "other_charges_description" "text",
    "subtotal" numeric(10,2) NOT NULL,
    "vat_enabled" boolean DEFAULT true,
    "vat_rate" numeric(5,2) DEFAULT 5,
    "vat_amount" numeric(10,2) NOT NULL,
    "total_amount" numeric(10,2) NOT NULL,
    "status" "text" DEFAULT 'Draft'::"text",
    "payment_terms" "text" DEFAULT 'Net 30'::"text",
    "notes" "text",
    "payment_id" "text",
    "booking_id" "uuid",
    "vehicle_details" "text",
    "rental_period" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "invoice_status_check" CHECK (("status" = ANY (ARRAY['Draft'::"text", 'Sent'::"text", 'Paid'::"text", 'Overdue'::"text", 'Cancelled'::"text"])))
);


ALTER TABLE "public"."invoice" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."lead" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "source" "text",
    "status" "text" DEFAULT 'New'::"text" NOT NULL,
    "assigned_to_id" "text",
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "lead_status_check" CHECK (("status" = ANY (ARRAY['New'::"text", 'Contacted'::"text", 'Quoted'::"text", 'Follow-up'::"text", 'Won'::"text", 'Lost'::"text"])))
);


ALTER TABLE "public"."lead" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."leave_request" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "employee_id" "text" NOT NULL,
    "leave_type" "text" NOT NULL,
    "start_date" "date" NOT NULL,
    "end_date" "date" NOT NULL,
    "reason" "text" NOT NULL,
    "status" "text" DEFAULT 'Pending'::"text",
    "manager_comment" "text",
    "hr_comment" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "leave_request_leave_type_check" CHECK (("leave_type" = ANY (ARRAY['Sick'::"text", 'Casual'::"text", 'Annual'::"text", 'Unpaid'::"text"]))),
    CONSTRAINT "leave_request_status_check" CHECK (("status" = ANY (ARRAY['Pending'::"text", 'Approved by Manager'::"text", 'Approved'::"text", 'Rejected'::"text"])))
);


ALTER TABLE "public"."leave_request" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."legal_document" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "category" "text" NOT NULL,
    "document_type" "text" NOT NULL,
    "document_name" "text" NOT NULL,
    "file_url" "text" NOT NULL,
    "file_type" "text",
    "upload_date" "date" DEFAULT CURRENT_DATE,
    "expiry_date" "date",
    "description" "text",
    "is_critical" boolean DEFAULT false,
    "renewal_reminder_days" integer DEFAULT 30,
    "responsible_department" "text",
    "is_verified" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "legal_document_category_check" CHECK (("category" = ANY (ARRAY['Legal'::"text", 'Registration'::"text", 'Insurance'::"text", 'Compliance'::"text", 'Financial'::"text", 'Operational'::"text", 'HR'::"text"]))),
    CONSTRAINT "legal_document_document_type_check" CHECK (("document_type" = ANY (ARRAY['Business License'::"text", 'Trade License'::"text", 'Legal Contract'::"text", 'Court Document'::"text", 'Company Registration'::"text", 'VAT Registration'::"text", 'Tax Registration'::"text", 'General Insurance'::"text", 'Vehicle Fleet Insurance'::"text", 'Liability Insurance'::"text", 'Compliance Certificate'::"text", 'Audit Report'::"text", 'Regulatory Approval'::"text", 'Tax Document'::"text", 'Bank Document'::"text", 'Financial Statement'::"text", 'Company Policy'::"text", 'Procedure'::"text", 'Operational Permit'::"text", 'HR Policy'::"text", 'Employment Law Document'::"text", 'Other'::"text"])))
);


ALTER TABLE "public"."legal_document" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."maintenance_log" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "vehicle_id" "uuid" NOT NULL,
    "service_date" "date" NOT NULL,
    "odometer_reading" integer,
    "service_type" "text" NOT NULL,
    "vendor" "text",
    "cost" numeric(10,2) NOT NULL,
    "report_url" "text",
    "notes" "text",
    "next_service_due_date" "date",
    "status" "text" DEFAULT 'Upcoming'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "maintenance_log_service_type_check" CHECK (("service_type" = ANY (ARRAY['Scheduled Service'::"text", 'Repair'::"text", 'Inspection'::"text", 'Oil Change'::"text", 'Tyre Change'::"text"]))),
    CONSTRAINT "maintenance_log_status_check" CHECK (("status" = ANY (ARRAY['Upcoming'::"text", 'Due'::"text", 'Completed'::"text", 'Overdue'::"text"])))
);


ALTER TABLE "public"."maintenance_log" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."marketing_campaign" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "subject" "text" NOT NULL,
    "body" "text" NOT NULL,
    "audience_filters" "jsonb",
    "status" "text" DEFAULT 'Draft'::"text" NOT NULL,
    "scheduled_for" timestamp with time zone,
    "sent_date" timestamp with time zone,
    "stats" "jsonb" DEFAULT '{"open_count": 0, "sent_count": 0, "click_count": 0}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "marketing_campaign_status_check" CHECK (("status" = ANY (ARRAY['Draft'::"text", 'Scheduled'::"text", 'Sent'::"text", 'Failed'::"text"])))
);


ALTER TABLE "public"."marketing_campaign" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."payment" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "payment_date" "date" NOT NULL,
    "counterpart" "text" NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "method" "text" NOT NULL,
    "reference_no" "text",
    "remarks" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "payment_method_check" CHECK (("method" = ANY (ARRAY['Cash'::"text", 'Bank Transfer'::"text", 'Card'::"text"])))
);


ALTER TABLE "public"."payment" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."payroll" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "employee_id" "text" NOT NULL,
    "month" integer NOT NULL,
    "year" integer NOT NULL,
    "base_salary" numeric(10,2),
    "overtime_pay" numeric(10,2),
    "deductions" numeric(10,2),
    "net_pay" numeric(10,2) NOT NULL,
    "status" "text" DEFAULT 'Pending'::"text",
    "processing_date" "date",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "payroll_month_check" CHECK ((("month" >= 1) AND ("month" <= 12))),
    CONSTRAINT "payroll_status_check" CHECK (("status" = ANY (ARRAY['Pending'::"text", 'Processed'::"text", 'Paid'::"text"])))
);


ALTER TABLE "public"."payroll" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quotation" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "lead_id" "uuid",
    "vehicle_details" "text" NOT NULL,
    "daily_rate" numeric(10,2),
    "start_date" "date",
    "end_date" "date",
    "total_amount" numeric(10,2) NOT NULL,
    "validity_date" "date",
    "terms_and_conditions" "text",
    "status" "text" DEFAULT 'Draft'::"text" NOT NULL,
    "sales_rep_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "quotation_status_check" CHECK (("status" = ANY (ARRAY['Draft'::"text", 'Sent'::"text", 'Accepted'::"text", 'Rejected'::"text"])))
);


ALTER TABLE "public"."quotation" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."shift" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "start_time" "text" NOT NULL,
    "end_time" "text" NOT NULL,
    "duration_hours" numeric(4,2) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."shift" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."staff_document" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "employee_id" "text" NOT NULL,
    "document_type" "text" NOT NULL,
    "document_name" "text" NOT NULL,
    "file_url" "text" NOT NULL,
    "file_type" "text",
    "upload_date" "date" DEFAULT CURRENT_DATE,
    "expiry_date" "date",
    "description" "text",
    "is_confidential" boolean DEFAULT false,
    "is_verified" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "staff_document_document_type_check" CHECK (("document_type" = ANY (ARRAY['Employment Contract'::"text", 'ID Copy'::"text", 'Passport Copy'::"text", 'CV/Resume'::"text", 'Educational Certificate'::"text", 'Professional License'::"text", 'Performance Review'::"text", 'Training Record'::"text", 'Medical Certificate'::"text", 'Other'::"text"])))
);


ALTER TABLE "public"."staff_document" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_access" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_email" "text" NOT NULL,
    "accessible_modules" "text"[] NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "role" character varying(50) DEFAULT 'Staff'::character varying
);


ALTER TABLE "public"."user_access" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."vehicle" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "license_plate" "text" NOT NULL,
    "make" "text" NOT NULL,
    "model" "text" NOT NULL,
    "variant_trim" "text",
    "year" integer NOT NULL,
    "vin" "text",
    "engine_number" "text",
    "transmission_type" "text",
    "fuel_type" "text",
    "color" "text",
    "chassis_number" "text",
    "body_type" "text",
    "odometer_reading" integer,
    "odometer_source" "text",
    "seating_capacity" integer,
    "number_of_doors" integer,
    "vehicle_class" "text" NOT NULL,
    "gps_installed" boolean DEFAULT false,
    "status" "text" DEFAULT 'Available'::"text",
    "location" "text",
    "assigned_branch" "text",
    "current_renter" "text",
    "purchase_date" "date",
    "purchase_price" numeric(10,2),
    "current_market_value" numeric(10,2),
    "lease_owned" "text",
    "leasing_company" "text",
    "insurance_provider" "text",
    "insurance_policy_number" "text",
    "insurance_expiry_date" "date",
    "salik_tag_number" "text",
    "registration_expiry_date" "date",
    "mortgage_loan_status" "text",
    "sold_date" "date",
    "sold_value" numeric(10,2),
    "estimated_present_value" numeric(10,2),
    "last_service_date" "date",
    "next_service_due_km" integer,
    "next_service_due_date" "date",
    "tyre_change_date" "date",
    "battery_replacement_date" "date",
    "service_provider" "text",
    "service_notes" "text",
    "accident_history" "text",
    "damage_notes" "text",
    "registration_copy" "text",
    "insurance_copy" "text",
    "emission_test" "text",
    "image_set_id" "text",
    "vehicle_photos" "text"[],
    "real_time_location" "text",
    "fuel_level" integer,
    "engine_status" "text",
    "battery_level" integer,
    "daily_rate" numeric(10,2) DEFAULT 0,
    "monthly_rate" numeric(10,2) DEFAULT 0,
    "health_rating" "text" DEFAULT 'Good'::"text",
    "live_latitude" numeric(10,8),
    "live_longitude" numeric(11,8),
    "registration_date" "date",
    "country_of_origin" "text",
    "owner_name" "text",
    "tc_number" "text",
    "place_of_issue" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "vehicle_battery_level_check" CHECK ((("battery_level" >= 0) AND ("battery_level" <= 100))),
    CONSTRAINT "vehicle_body_type_check" CHECK (("body_type" = ANY (ARRAY['Sedan'::"text", 'SUV'::"text", 'Hatchback'::"text", 'Coupe'::"text", 'Convertible'::"text", 'Wagon'::"text", 'Pickup'::"text", 'Van'::"text"]))),
    CONSTRAINT "vehicle_engine_status_check" CHECK (("engine_status" = ANY (ARRAY['On'::"text", 'Off'::"text"]))),
    CONSTRAINT "vehicle_fuel_level_check" CHECK ((("fuel_level" >= 0) AND ("fuel_level" <= 100))),
    CONSTRAINT "vehicle_fuel_type_check" CHECK (("fuel_type" = ANY (ARRAY['Petrol'::"text", 'Diesel'::"text", 'Electric'::"text", 'Hybrid'::"text"]))),
    CONSTRAINT "vehicle_health_rating_check" CHECK (("health_rating" = ANY (ARRAY['Good'::"text", 'Fair'::"text", 'Critical'::"text"]))),
    CONSTRAINT "vehicle_lease_owned_check" CHECK (("lease_owned" = ANY (ARRAY['Owned'::"text", 'Leased'::"text"]))),
    CONSTRAINT "vehicle_odometer_source_check" CHECK (("odometer_source" = ANY (ARRAY['Manual'::"text", 'API'::"text", 'Telematics'::"text"]))),
    CONSTRAINT "vehicle_status_check" CHECK (("status" = ANY (ARRAY['Available'::"text", 'Rented'::"text", 'Under Maintenance'::"text", 'Sold'::"text", 'In Transit'::"text"]))),
    CONSTRAINT "vehicle_transmission_type_check" CHECK (("transmission_type" = ANY (ARRAY['Automatic'::"text", 'Manual'::"text"]))),
    CONSTRAINT "vehicle_vehicle_class_check" CHECK (("vehicle_class" = ANY (ARRAY['Economy'::"text", 'Hatch Back'::"text", 'Mid-Size Sedan'::"text", 'Luxury'::"text", 'SUV'::"text", 'Sports cars'::"text"])))
);


ALTER TABLE "public"."vehicle" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."vehicle_contract" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "vehicle_id" "uuid" NOT NULL,
    "customer_name" "text" NOT NULL,
    "start_date" "date" NOT NULL,
    "end_date" "date" NOT NULL,
    "contract_value" numeric(10,2) NOT NULL,
    "payment_terms" "text",
    "document_url" "text",
    "status" "text" DEFAULT 'Active'::"text" NOT NULL,
    "booking_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "vehicle_contract_status_check" CHECK (("status" = ANY (ARRAY['Active'::"text", 'Expired'::"text", 'Terminated'::"text"])))
);


ALTER TABLE "public"."vehicle_contract" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."vehicle_document" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "vehicle_id" "uuid",
    "document_type" "text",
    "document_name" "text" NOT NULL,
    "file_url" "text" NOT NULL,
    "file_type" "text",
    "upload_date" "date" DEFAULT CURRENT_DATE,
    "expiry_date" "date",
    "extracted_data" "jsonb",
    "license_plate_number" "text",
    "registration_expiry_date" "text",
    "registration_date" "text",
    "insurance_expiry_date" "text",
    "insurance_policy_number" "text",
    "tc_number" "text",
    "owner_name" "text",
    "model_year" "text",
    "country_of_origin" "text",
    "vehicle_type" "text",
    "chassis_number" "text",
    "number_of_passengers" "text",
    "place_of_issue" "text",
    "notes" "text",
    "is_verified" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "vehicle_document_document_type_check" CHECK (("document_type" = ANY (ARRAY['Insurance'::"text", 'Mulkia'::"text", 'Vehicle Pictures'::"text", 'Other'::"text"])))
);


ALTER TABLE "public"."vehicle_document" OWNER TO "postgres";


ALTER TABLE ONLY "public"."agreement"
    ADD CONSTRAINT "agreement_agreement_number_key" UNIQUE ("agreement_number");



ALTER TABLE ONLY "public"."agreement"
    ADD CONSTRAINT "agreement_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ai_document_processing"
    ADD CONSTRAINT "ai_document_processing_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."asset"
    ADD CONSTRAINT "asset_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."attendance"
    ADD CONSTRAINT "attendance_employee_id_date_key" UNIQUE ("employee_id", "date");



ALTER TABLE ONLY "public"."attendance"
    ADD CONSTRAINT "attendance_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."booking"
    ADD CONSTRAINT "booking_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."car_image"
    ADD CONSTRAINT "car_image_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."corporate_client"
    ADD CONSTRAINT "corporate_client_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."customer_document"
    ADD CONSTRAINT "customer_document_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."customer"
    ADD CONSTRAINT "customer_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."deduction"
    ADD CONSTRAINT "deduction_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."employee"
    ADD CONSTRAINT "employee_employee_id_key" UNIQUE ("employee_id");



ALTER TABLE ONLY "public"."employee"
    ADD CONSTRAINT "employee_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."expense"
    ADD CONSTRAINT "expense_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."fine_log"
    ADD CONSTRAINT "fine_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."incident_log"
    ADD CONSTRAINT "incident_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."interaction_log"
    ADD CONSTRAINT "interaction_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."inventory_part"
    ADD CONSTRAINT "inventory_part_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."invoice"
    ADD CONSTRAINT "invoice_invoice_number_key" UNIQUE ("invoice_number");



ALTER TABLE ONLY "public"."invoice"
    ADD CONSTRAINT "invoice_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."lead"
    ADD CONSTRAINT "lead_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."leave_request"
    ADD CONSTRAINT "leave_request_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."legal_document"
    ADD CONSTRAINT "legal_document_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."maintenance_log"
    ADD CONSTRAINT "maintenance_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."marketing_campaign"
    ADD CONSTRAINT "marketing_campaign_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payment"
    ADD CONSTRAINT "payment_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payroll"
    ADD CONSTRAINT "payroll_employee_id_month_year_key" UNIQUE ("employee_id", "month", "year");



ALTER TABLE ONLY "public"."payroll"
    ADD CONSTRAINT "payroll_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quotation"
    ADD CONSTRAINT "quotation_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."shift"
    ADD CONSTRAINT "shift_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."staff_document"
    ADD CONSTRAINT "staff_document_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_access"
    ADD CONSTRAINT "user_access_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."vehicle_contract"
    ADD CONSTRAINT "vehicle_contract_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."vehicle_document"
    ADD CONSTRAINT "vehicle_document_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."vehicle"
    ADD CONSTRAINT "vehicle_license_plate_key" UNIQUE ("license_plate");



ALTER TABLE ONLY "public"."vehicle"
    ADD CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_attendance_employee_date" ON "public"."attendance" USING "btree" ("employee_id", "date");



CREATE INDEX "idx_booking_customer_id" ON "public"."booking" USING "btree" ("customer_id");



CREATE INDEX "idx_booking_start_date" ON "public"."booking" USING "btree" ("start_date");



CREATE INDEX "idx_booking_vehicle_id" ON "public"."booking" USING "btree" ("vehicle_id");



CREATE INDEX "idx_customer_document_customer_id" ON "public"."customer_document" USING "btree" ("customer_id");



CREATE INDEX "idx_customer_email" ON "public"."customer" USING "btree" ("email");



CREATE INDEX "idx_employee_employee_id" ON "public"."employee" USING "btree" ("employee_id");



CREATE INDEX "idx_fine_log_vehicle_id" ON "public"."fine_log" USING "btree" ("vehicle_id");



CREATE INDEX "idx_incident_log_vehicle_id" ON "public"."incident_log" USING "btree" ("vehicle_id");



CREATE INDEX "idx_invoice_number" ON "public"."invoice" USING "btree" ("invoice_number");



CREATE INDEX "idx_maintenance_log_vehicle_id" ON "public"."maintenance_log" USING "btree" ("vehicle_id");



CREATE INDEX "idx_payroll_employee_month_year" ON "public"."payroll" USING "btree" ("employee_id", "month", "year");



CREATE INDEX "idx_vehicle_license_plate" ON "public"."vehicle" USING "btree" ("license_plate");



CREATE INDEX "idx_vehicle_status" ON "public"."vehicle" USING "btree" ("status");



CREATE OR REPLACE TRIGGER "update_agreement_updated_at" BEFORE UPDATE ON "public"."agreement" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_ai_document_processing_updated_at" BEFORE UPDATE ON "public"."ai_document_processing" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_asset_updated_at" BEFORE UPDATE ON "public"."asset" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_attendance_updated_at" BEFORE UPDATE ON "public"."attendance" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_booking_updated_at" BEFORE UPDATE ON "public"."booking" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_car_image_updated_at" BEFORE UPDATE ON "public"."car_image" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_corporate_client_updated_at" BEFORE UPDATE ON "public"."corporate_client" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_customer_document_updated_at" BEFORE UPDATE ON "public"."customer_document" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_customer_updated_at" BEFORE UPDATE ON "public"."customer" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_deduction_updated_at" BEFORE UPDATE ON "public"."deduction" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_employee_updated_at" BEFORE UPDATE ON "public"."employee" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_expense_updated_at" BEFORE UPDATE ON "public"."expense" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_fine_log_updated_at" BEFORE UPDATE ON "public"."fine_log" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_incident_log_updated_at" BEFORE UPDATE ON "public"."incident_log" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_interaction_log_updated_at" BEFORE UPDATE ON "public"."interaction_log" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_inventory_part_updated_at" BEFORE UPDATE ON "public"."inventory_part" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_invoice_updated_at" BEFORE UPDATE ON "public"."invoice" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_lead_updated_at" BEFORE UPDATE ON "public"."lead" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_leave_request_updated_at" BEFORE UPDATE ON "public"."leave_request" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_legal_document_updated_at" BEFORE UPDATE ON "public"."legal_document" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_maintenance_log_updated_at" BEFORE UPDATE ON "public"."maintenance_log" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_marketing_campaign_updated_at" BEFORE UPDATE ON "public"."marketing_campaign" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_payment_updated_at" BEFORE UPDATE ON "public"."payment" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_payroll_updated_at" BEFORE UPDATE ON "public"."payroll" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_quotation_updated_at" BEFORE UPDATE ON "public"."quotation" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_shift_updated_at" BEFORE UPDATE ON "public"."shift" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_staff_document_updated_at" BEFORE UPDATE ON "public"."staff_document" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_user_access_updated_at" BEFORE UPDATE ON "public"."user_access" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_vehicle_contract_updated_at" BEFORE UPDATE ON "public"."vehicle_contract" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_vehicle_document_updated_at" BEFORE UPDATE ON "public"."vehicle_document" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_vehicle_updated_at" BEFORE UPDATE ON "public"."vehicle" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."agreement"
    ADD CONSTRAINT "agreement_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id");



ALTER TABLE ONLY "public"."agreement"
    ADD CONSTRAINT "agreement_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id");



ALTER TABLE ONLY "public"."agreement"
    ADD CONSTRAINT "agreement_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id");



ALTER TABLE ONLY "public"."attendance"
    ADD CONSTRAINT "attendance_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "public"."shift"("id");



ALTER TABLE ONLY "public"."booking"
    ADD CONSTRAINT "booking_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id");



ALTER TABLE ONLY "public"."booking"
    ADD CONSTRAINT "booking_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id");



ALTER TABLE ONLY "public"."customer_document"
    ADD CONSTRAINT "customer_document_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id");



ALTER TABLE ONLY "public"."fine_log"
    ADD CONSTRAINT "fine_log_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id");



ALTER TABLE ONLY "public"."incident_log"
    ADD CONSTRAINT "incident_log_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id");



ALTER TABLE ONLY "public"."interaction_log"
    ADD CONSTRAINT "interaction_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id");



ALTER TABLE ONLY "public"."interaction_log"
    ADD CONSTRAINT "interaction_log_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."lead"("id");



ALTER TABLE ONLY "public"."invoice"
    ADD CONSTRAINT "invoice_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id");



ALTER TABLE ONLY "public"."invoice"
    ADD CONSTRAINT "invoice_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."customer"("id");



ALTER TABLE ONLY "public"."maintenance_log"
    ADD CONSTRAINT "maintenance_log_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id");



ALTER TABLE ONLY "public"."quotation"
    ADD CONSTRAINT "quotation_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id");



ALTER TABLE ONLY "public"."quotation"
    ADD CONSTRAINT "quotation_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "public"."lead"("id");



ALTER TABLE ONLY "public"."vehicle_contract"
    ADD CONSTRAINT "vehicle_contract_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id");



ALTER TABLE ONLY "public"."vehicle_contract"
    ADD CONSTRAINT "vehicle_contract_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id");



ALTER TABLE ONLY "public"."vehicle_document"
    ADD CONSTRAINT "vehicle_document_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id");



CREATE POLICY "Allow anonymous read for debugging" ON "public"."user_access" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Allow authenticated users to access assets" ON "public"."asset" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Allow authenticated users to access attendance" ON "public"."attendance" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Allow authenticated users to access expenses" ON "public"."expense" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Allow authenticated users to access inventory_part" ON "public"."inventory_part" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Allow authenticated users to access invoices" ON "public"."invoice" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Allow authenticated users to access leave_request" ON "public"."leave_request" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Allow authenticated users to access payments" ON "public"."payment" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Allow authenticated users to access payroll" ON "public"."payroll" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Allow authenticated users to delete employees" ON "public"."employee" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "Allow authenticated users to insert employees" ON "public"."employee" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Allow authenticated users to read employees" ON "public"."employee" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Allow authenticated users to update employees" ON "public"."employee" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Enable read access for all users" ON "public"."vehicle" FOR SELECT USING (true);



CREATE POLICY "Management can delete ai document processing" ON "public"."ai_document_processing" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete bookings" ON "public"."booking" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete car images" ON "public"."car_image" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete corporate clients" ON "public"."corporate_client" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete customer documents" ON "public"."customer_document" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete customers" ON "public"."customer" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete employees" ON "public"."employee" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete incident logs" ON "public"."incident_log" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete leads" ON "public"."lead" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete legal documents" ON "public"."legal_document" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete maintenance logs" ON "public"."maintenance_log" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete quotations" ON "public"."quotation" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete staff documents" ON "public"."staff_document" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete vehicle contracts" ON "public"."vehicle_contract" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete vehicle documents" ON "public"."vehicle_document" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can delete vehicles" ON "public"."vehicle" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert ai document processing" ON "public"."ai_document_processing" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert bookings" ON "public"."booking" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert car images" ON "public"."car_image" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert corporate clients" ON "public"."corporate_client" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert customer documents" ON "public"."customer_document" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert customers" ON "public"."customer" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert employees" ON "public"."employee" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert incident logs" ON "public"."incident_log" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert leads" ON "public"."lead" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert legal documents" ON "public"."legal_document" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert maintenance logs" ON "public"."maintenance_log" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert quotations" ON "public"."quotation" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert staff documents" ON "public"."staff_document" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert vehicle contracts" ON "public"."vehicle_contract" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert vehicle documents" ON "public"."vehicle_document" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can insert vehicles" ON "public"."vehicle" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all ai document processing" ON "public"."ai_document_processing" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all bookings" ON "public"."booking" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all car images" ON "public"."car_image" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all corporate clients" ON "public"."corporate_client" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all customer documents" ON "public"."customer_document" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all customers" ON "public"."customer" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all employees" ON "public"."employee" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all incident logs" ON "public"."incident_log" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all leads" ON "public"."lead" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all legal documents" ON "public"."legal_document" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all maintenance logs" ON "public"."maintenance_log" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all quotations" ON "public"."quotation" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all staff documents" ON "public"."staff_document" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all vehicle contracts" ON "public"."vehicle_contract" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all vehicle documents" ON "public"."vehicle_document" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can read all vehicles" ON "public"."vehicle" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update ai document processing" ON "public"."ai_document_processing" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update bookings" ON "public"."booking" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update car images" ON "public"."car_image" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update corporate clients" ON "public"."corporate_client" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update customer documents" ON "public"."customer_document" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update customers" ON "public"."customer" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update employees" ON "public"."employee" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update incident logs" ON "public"."incident_log" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update leads" ON "public"."lead" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update legal documents" ON "public"."legal_document" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update maintenance logs" ON "public"."maintenance_log" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update quotations" ON "public"."quotation" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update staff documents" ON "public"."staff_document" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update vehicle contracts" ON "public"."vehicle_contract" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update vehicle documents" ON "public"."vehicle_document" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management can update vehicles" ON "public"."vehicle" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Management users have full access" ON "public"."user_access" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."user_access" "ua"
  WHERE (("ua"."user_email" = "auth"."email"()) AND (("ua"."role")::"text" = 'Management'::"text")))));



CREATE POLICY "Staff can delete ai document processing with access" ON "public"."ai_document_processing" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('AI Document Processing'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can delete customer documents with access" ON "public"."customer_document" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Customer Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can delete employees with access" ON "public"."employee" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('HR Employees'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can delete incident logs with access" ON "public"."incident_log" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Damage Logs'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can delete legal documents with access" ON "public"."legal_document" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Legal Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can delete maintenance logs with access" ON "public"."maintenance_log" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Fleet Health'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can delete staff documents with access" ON "public"."staff_document" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Staff Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can delete vehicle contracts with access" ON "public"."vehicle_contract" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Contracts'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can delete vehicle documents with access" ON "public"."vehicle_document" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Vehicle Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can insert ai document processing with access" ON "public"."ai_document_processing" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('AI Document Processing'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can insert customer documents with access" ON "public"."customer_document" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Customer Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can insert employees with access" ON "public"."employee" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('HR Employees'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can insert incident logs with access" ON "public"."incident_log" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Damage Logs'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can insert legal documents with access" ON "public"."legal_document" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Legal Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can insert maintenance logs with access" ON "public"."maintenance_log" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Fleet Health'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can insert staff documents with access" ON "public"."staff_document" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Staff Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can insert vehicle contracts with access" ON "public"."vehicle_contract" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Contracts'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can insert vehicle documents with access" ON "public"."vehicle_document" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Vehicle Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can read ai document processing with access" ON "public"."ai_document_processing" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('AI Document Processing'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can read customer documents with access" ON "public"."customer_document" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Customer Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can read employees with access" ON "public"."employee" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('HR Employees'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can read incident logs with access" ON "public"."incident_log" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Damage Logs'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can read legal documents with access" ON "public"."legal_document" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Legal Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can read maintenance logs with access" ON "public"."maintenance_log" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Fleet Health'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can read staff documents with access" ON "public"."staff_document" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Staff Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can read vehicle contracts with access" ON "public"."vehicle_contract" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Contracts'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can read vehicle documents with access" ON "public"."vehicle_document" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Vehicle Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can update ai document processing with access" ON "public"."ai_document_processing" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('AI Document Processing'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can update customer documents with access" ON "public"."customer_document" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Customer Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can update employees with access" ON "public"."employee" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('HR Employees'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can update incident logs with access" ON "public"."incident_log" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Damage Logs'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can update legal documents with access" ON "public"."legal_document" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Legal Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can update maintenance logs with access" ON "public"."maintenance_log" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Fleet Health'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can update staff documents with access" ON "public"."staff_document" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Staff Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can update vehicle contracts with access" ON "public"."vehicle_contract" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Contracts'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff can update vehicle documents with access" ON "public"."vehicle_document" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" <> 'Management'::"text") AND ('Vehicle Documents'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with bookings access can insert bookings" ON "public"."booking" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Bookings'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with bookings access can read bookings" ON "public"."booking" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Bookings'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with bookings access can update bookings" ON "public"."booking" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Bookings'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with corporate clients access can insert corporate client" ON "public"."corporate_client" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Corporate Clients'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with corporate clients access can read corporate clients" ON "public"."corporate_client" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Corporate Clients'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with corporate clients access can update corporate client" ON "public"."corporate_client" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Corporate Clients'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with customer access can insert customers" ON "public"."customer" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Customer Management'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with customer access can read customers" ON "public"."customer" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Customer Management'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with customer access can update customers" ON "public"."customer" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Customer Management'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with fleet management access can delete vehicles" ON "public"."vehicle" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Fleet Management'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with fleet management access can insert vehicles" ON "public"."vehicle" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Fleet Management'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with fleet management access can read vehicles" ON "public"."vehicle" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Fleet Management'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with fleet management access can update vehicles" ON "public"."vehicle" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Fleet Management'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with leads access can insert leads" ON "public"."lead" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Leads'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with leads access can read leads" ON "public"."lead" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Leads'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with leads access can update leads" ON "public"."lead" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Leads'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with quotations access can insert quotations" ON "public"."quotation" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Quotations'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with quotations access can read quotations" ON "public"."quotation" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Quotations'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with quotations access can update quotations" ON "public"."quotation" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Quotations'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with vehicle images access can delete car images" ON "public"."car_image" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Vehicle Image Library'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with vehicle images access can insert car images" ON "public"."car_image" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Vehicle Image Library'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with vehicle images access can read car images" ON "public"."car_image" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Vehicle Image Library'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Staff with vehicle images access can update car images" ON "public"."car_image" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."user_access"
  WHERE (("user_access"."user_email" = "auth"."email"()) AND (("user_access"."role")::"text" = 'Staff'::"text") AND ('Vehicle Image Library'::"text" = ANY ("user_access"."accessible_modules"))))));



CREATE POLICY "Users can create their own access record" ON "public"."user_access" FOR INSERT TO "authenticated" WITH CHECK (("auth"."email"() = "user_email"));



CREATE POLICY "Users can read their own access record" ON "public"."user_access" FOR SELECT TO "authenticated" USING (("auth"."email"() = "user_email"));



ALTER TABLE "public"."agreement" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."ai_document_processing" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."asset" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."attendance" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."booking" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."car_image" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."corporate_client" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."customer" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."customer_document" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."deduction" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."employee" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."expense" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."fine_log" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."incident_log" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."interaction_log" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."inventory_part" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."invoice" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."lead" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."leave_request" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."legal_document" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."maintenance_log" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."marketing_campaign" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."payment" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."payroll" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."quotation" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."shift" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."staff_document" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."vehicle" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."vehicle_contract" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."vehicle_document" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."create_user_access_record"() TO "anon";
GRANT ALL ON FUNCTION "public"."create_user_access_record"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_user_access_record"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";


















GRANT ALL ON TABLE "public"."agreement" TO "anon";
GRANT ALL ON TABLE "public"."agreement" TO "authenticated";
GRANT ALL ON TABLE "public"."agreement" TO "service_role";



GRANT ALL ON TABLE "public"."ai_document_processing" TO "anon";
GRANT ALL ON TABLE "public"."ai_document_processing" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_document_processing" TO "service_role";



GRANT ALL ON TABLE "public"."asset" TO "anon";
GRANT ALL ON TABLE "public"."asset" TO "authenticated";
GRANT ALL ON TABLE "public"."asset" TO "service_role";



GRANT ALL ON TABLE "public"."attendance" TO "anon";
GRANT ALL ON TABLE "public"."attendance" TO "authenticated";
GRANT ALL ON TABLE "public"."attendance" TO "service_role";



GRANT ALL ON TABLE "public"."booking" TO "anon";
GRANT ALL ON TABLE "public"."booking" TO "authenticated";
GRANT ALL ON TABLE "public"."booking" TO "service_role";



GRANT ALL ON TABLE "public"."car_image" TO "anon";
GRANT ALL ON TABLE "public"."car_image" TO "authenticated";
GRANT ALL ON TABLE "public"."car_image" TO "service_role";



GRANT ALL ON TABLE "public"."corporate_client" TO "anon";
GRANT ALL ON TABLE "public"."corporate_client" TO "authenticated";
GRANT ALL ON TABLE "public"."corporate_client" TO "service_role";



GRANT ALL ON TABLE "public"."customer" TO "anon";
GRANT ALL ON TABLE "public"."customer" TO "authenticated";
GRANT ALL ON TABLE "public"."customer" TO "service_role";



GRANT ALL ON TABLE "public"."customer_document" TO "anon";
GRANT ALL ON TABLE "public"."customer_document" TO "authenticated";
GRANT ALL ON TABLE "public"."customer_document" TO "service_role";



GRANT ALL ON TABLE "public"."deduction" TO "anon";
GRANT ALL ON TABLE "public"."deduction" TO "authenticated";
GRANT ALL ON TABLE "public"."deduction" TO "service_role";



GRANT ALL ON TABLE "public"."employee" TO "anon";
GRANT ALL ON TABLE "public"."employee" TO "authenticated";
GRANT ALL ON TABLE "public"."employee" TO "service_role";



GRANT ALL ON TABLE "public"."expense" TO "anon";
GRANT ALL ON TABLE "public"."expense" TO "authenticated";
GRANT ALL ON TABLE "public"."expense" TO "service_role";



GRANT ALL ON TABLE "public"."fine_log" TO "anon";
GRANT ALL ON TABLE "public"."fine_log" TO "authenticated";
GRANT ALL ON TABLE "public"."fine_log" TO "service_role";



GRANT ALL ON TABLE "public"."incident_log" TO "anon";
GRANT ALL ON TABLE "public"."incident_log" TO "authenticated";
GRANT ALL ON TABLE "public"."incident_log" TO "service_role";



GRANT ALL ON TABLE "public"."interaction_log" TO "anon";
GRANT ALL ON TABLE "public"."interaction_log" TO "authenticated";
GRANT ALL ON TABLE "public"."interaction_log" TO "service_role";



GRANT ALL ON TABLE "public"."inventory_part" TO "anon";
GRANT ALL ON TABLE "public"."inventory_part" TO "authenticated";
GRANT ALL ON TABLE "public"."inventory_part" TO "service_role";



GRANT ALL ON TABLE "public"."invoice" TO "anon";
GRANT ALL ON TABLE "public"."invoice" TO "authenticated";
GRANT ALL ON TABLE "public"."invoice" TO "service_role";



GRANT ALL ON TABLE "public"."lead" TO "anon";
GRANT ALL ON TABLE "public"."lead" TO "authenticated";
GRANT ALL ON TABLE "public"."lead" TO "service_role";



GRANT ALL ON TABLE "public"."leave_request" TO "anon";
GRANT ALL ON TABLE "public"."leave_request" TO "authenticated";
GRANT ALL ON TABLE "public"."leave_request" TO "service_role";



GRANT ALL ON TABLE "public"."legal_document" TO "anon";
GRANT ALL ON TABLE "public"."legal_document" TO "authenticated";
GRANT ALL ON TABLE "public"."legal_document" TO "service_role";



GRANT ALL ON TABLE "public"."maintenance_log" TO "anon";
GRANT ALL ON TABLE "public"."maintenance_log" TO "authenticated";
GRANT ALL ON TABLE "public"."maintenance_log" TO "service_role";



GRANT ALL ON TABLE "public"."marketing_campaign" TO "anon";
GRANT ALL ON TABLE "public"."marketing_campaign" TO "authenticated";
GRANT ALL ON TABLE "public"."marketing_campaign" TO "service_role";



GRANT ALL ON TABLE "public"."payment" TO "anon";
GRANT ALL ON TABLE "public"."payment" TO "authenticated";
GRANT ALL ON TABLE "public"."payment" TO "service_role";



GRANT ALL ON TABLE "public"."payroll" TO "anon";
GRANT ALL ON TABLE "public"."payroll" TO "authenticated";
GRANT ALL ON TABLE "public"."payroll" TO "service_role";



GRANT ALL ON TABLE "public"."quotation" TO "anon";
GRANT ALL ON TABLE "public"."quotation" TO "authenticated";
GRANT ALL ON TABLE "public"."quotation" TO "service_role";



GRANT ALL ON TABLE "public"."shift" TO "anon";
GRANT ALL ON TABLE "public"."shift" TO "authenticated";
GRANT ALL ON TABLE "public"."shift" TO "service_role";



GRANT ALL ON TABLE "public"."staff_document" TO "anon";
GRANT ALL ON TABLE "public"."staff_document" TO "authenticated";
GRANT ALL ON TABLE "public"."staff_document" TO "service_role";



GRANT ALL ON TABLE "public"."user_access" TO "anon";
GRANT ALL ON TABLE "public"."user_access" TO "authenticated";
GRANT ALL ON TABLE "public"."user_access" TO "service_role";



GRANT ALL ON TABLE "public"."vehicle" TO "anon";
GRANT ALL ON TABLE "public"."vehicle" TO "authenticated";
GRANT ALL ON TABLE "public"."vehicle" TO "service_role";



GRANT ALL ON TABLE "public"."vehicle_contract" TO "anon";
GRANT ALL ON TABLE "public"."vehicle_contract" TO "authenticated";
GRANT ALL ON TABLE "public"."vehicle_contract" TO "service_role";



GRANT ALL ON TABLE "public"."vehicle_document" TO "anon";
GRANT ALL ON TABLE "public"."vehicle_document" TO "authenticated";
GRANT ALL ON TABLE "public"."vehicle_document" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
