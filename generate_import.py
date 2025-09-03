#!/usr/bin/env python3
"""
CSV to Supabase SQL Import Generator
Reads all CSV files from Base44 export and generates SQL INSERT statements
"""

import csv
import json
import os
from datetime import datetime
import re

# CSV to table name mapping
CSV_TABLE_MAPPING = {
    'UserAccess_export.csv': 'user_access',
    'Customer_export.csv': 'customer',
    'Vehicle_export.csv': 'vehicle',
    'Booking_export.csv': 'booking',
    'VehicleDocument_export.csv': 'vehicle_document',
    'Employee_export.csv': 'employee',
    'Shift_export.csv': 'shift',
    'Attendance_export.csv': 'attendance',
    'Payroll_export.csv': 'payroll',
    'LeaveRequest_export.csv': 'leave_request',
    'Deduction_export.csv': 'deduction',
    'Lead_export.csv': 'lead',
    'Quotation_export.csv': 'quotation',
    'MarketingCampaign_export.csv': 'marketing_campaign',
    'CorporateClient_export.csv': 'corporate_client',
    'InteractionLog_export.csv': 'interaction_log',
    'Invoice_export.csv': 'invoice',
    'Payment_export.csv': 'payment',
    'Expense_export.csv': 'expense',
    'Asset_export.csv': 'asset',
    'InventoryPart_export.csv': 'inventory_part',
    'MaintenanceLog_export.csv': 'maintenance_log',
    'IncidentLog_export.csv': 'incident_log',
    'VehicleContract_export.csv': 'vehicle_contract',
    'FineLog_export.csv': 'fine_log',
    'CustomerDocument_export.csv': 'customer_document',
    'CarImage_export.csv': 'car_image',
    'Agreement_export.csv': 'agreement',
    'StaffDocument_export.csv': 'staff_document',
    'LegalDocument_export.csv': 'legal_document',
    'AIDocumentProcessing_export.csv': 'ai_document_processing'
}

# Fields to exclude from Base44 exports
EXCLUDE_FIELDS = {'id', 'created_date', 'updated_date', 'created_by_id', 'created_by', 'is_sample'}

# Special field mappings and transformations
FIELD_MAPPINGS = {
    'user_access': {
        'accessible_modules': 'array_from_json'
    },
    'customer': {
        'phone': 'text_or_default',
        'tags': 'array_from_json'
    },
    'employee': {
        'other_documents': 'array_from_json'
    },
    'incident_log': {
        'photo_urls': 'array_from_json'
    },
    'corporate_client': {
        'contacts': 'json_object'
    },
    'marketing_campaign': {
        'audience_filters': 'json_object',
        'stats': 'json_object'
    },
    'vehicle': {
        'year': 'integer',
        'odometer_reading': 'integer',
        'seating_capacity': 'integer',
        'number_of_doors': 'integer',
        'fuel_level': 'integer_0_100',
        'battery_level': 'integer_0_100',
        'daily_rate': 'decimal_or_default',
        'monthly_rate': 'decimal_or_default',
        'purchase_price': 'decimal',
        'current_market_value': 'decimal',
        'sold_value': 'decimal',
        'estimated_present_value': 'decimal',
        'next_service_due_km': 'integer',
        'live_latitude': 'decimal',
        'live_longitude': 'decimal',
        'gps_installed': 'boolean',
        'vehicle_photos': 'array_from_json',
        'tags': 'array_from_json',
        'purchase_date': 'date_iso',
        'insurance_expiry_date': 'date_ddmmmyy',
        'registration_expiry_date': 'date_ddmmmyy',
        'registration_date': 'date_ddmmmyy',
        'sold_date': 'date_iso',
        'last_service_date': 'date_iso',
        'next_service_due_date': 'date_iso',
        'tyre_change_date': 'date_iso',
        'battery_replacement_date': 'date_iso'
    }
}

def clean_value(value):
    """Clean and normalize CSV values"""
    if value is None or value == '' or value == 'N/A' or str(value).strip() == '':
        return None
    return str(value).strip()

def convert_value(value, conversion_type):
    """Convert value based on type"""
    if value is None or value == '':
        return None
        
    try:
        if conversion_type == 'integer':
            return int(float(value)) if value.replace('.', '').replace('-', '').isdigit() else None
        elif conversion_type == 'integer_0_100':
            val = int(float(value)) if value.replace('.', '').replace('-', '').isdigit() else None
            return val if val is not None and 0 <= val <= 100 else None
        elif conversion_type == 'decimal':
            return float(value) if re.match(r'^-?\d+\.?\d*$', value) else None
        elif conversion_type == 'boolean':
            return value.lower() in ('true', '1', 'yes', 'on')
        elif conversion_type == 'array_from_json':
            if value.startswith('[') and value.endswith(']'):
                try:
                    parsed = json.loads(value)
                    return parsed if isinstance(parsed, list) else [value]
                except:
                    return [value]
            return [value] if value else []
        elif conversion_type == 'text_or_default':
            return value if value else 'N/A'
        elif conversion_type == 'decimal_or_default':
            if re.match(r'^-?\d+\.?\d*$', value):
                return float(value)
            else:
                return 0.0  # Default to 0 for required decimal fields
        elif conversion_type == 'json_object':
            if value and (value.startswith('{') or value.startswith('[')):
                try:
                    return json.loads(value)
                except:
                    return {}
            return {}
        elif conversion_type == 'date_iso':
            # Handle YYYY-MM-DD format
            if re.match(r'^\d{4}-\d{2}-\d{2}', value):
                return value[:10]
            return None
        elif conversion_type == 'date_ddmmmyy':
            # Handle DD-MMM-YY format (e.g., "25-JUL-26")
            if re.match(r'^\d{2}-[A-Z]{3}-\d{2}$', value):
                day, month, year = value.split('-')
                month_map = {
                    'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04',
                    'MAY': '05', 'JUN': '06', 'JUL': '07', 'AUG': '08',
                    'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
                }
                if month in month_map:
                    full_year = '20' + year
                    return f"{full_year}-{month_map[month]}-{day}"
            return None
        else:
            return value
    except:
        return None

def escape_sql_value(value):
    """Escape SQL values properly"""
    if value is None:
        return 'NULL'
    elif isinstance(value, bool):
        return 'TRUE' if value else 'FALSE'
    elif isinstance(value, (int, float)):
        return str(value)
    elif isinstance(value, list):
        # Handle PostgreSQL arrays
        if not value:
            return 'ARRAY[]::TEXT[]'  # Properly typed empty array
        escaped_items = [f"'{str(item).replace(chr(39), chr(39)+chr(39))}'" for item in value]
        return f"ARRAY[{', '.join(escaped_items)}]"
    elif isinstance(value, dict):
        # Handle JSON objects
        json_str = json.dumps(value).replace("'", "''")
        return f"'{json_str}'::jsonb"
    else:
        # Escape single quotes for strings
        escaped = str(value).replace("'", "''")
        return f"'{escaped}'"

def generate_insert_statement(table_name, rows, field_mappings):
    """Generate SQL INSERT statement for a table"""
    if not rows:
        return ""
    
    # Get column names (excluding Base44 system fields)
    columns = [col for col in rows[0].keys() if col not in EXCLUDE_FIELDS]
    
    if not columns:
        return ""
    
    sql_parts = [f"-- Import data for {table_name}"]
    sql_parts.append(f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES")
    
    value_rows = []
    for row in rows:
        values = []
        for col in columns:
            raw_value = clean_value(row.get(col, ''))
            
            # Apply field-specific conversion
            if table_name in field_mappings and col in field_mappings[table_name]:
                conversion_type = field_mappings[table_name][col]
                converted_value = convert_value(raw_value, conversion_type)
            else:
                converted_value = raw_value
            
            values.append(escape_sql_value(converted_value))
        
        value_rows.append(f"  ({', '.join(values)})")
    
    sql_parts.append(',\n'.join(value_rows))
    sql_parts.append("ON CONFLICT DO NOTHING;\n")
    
    return '\n'.join(sql_parts)

def main():
    csv_dir = '/Users/hitheshjay/Downloads/aljisrcars/csv_files'
    output_file = '/Users/hitheshjay/Downloads/aljisrcars/import_all_data.sql'
    
    # Import order to respect foreign key constraints
    import_order = [
        'UserAccess_export.csv',
        'Customer_export.csv', 
        'Vehicle_export.csv',
        'Employee_export.csv',
        'Shift_export.csv',
        'Lead_export.csv',
        'Booking_export.csv',
        'VehicleDocument_export.csv',
        'CustomerDocument_export.csv',
        'Attendance_export.csv',
        'Payroll_export.csv',
        'LeaveRequest_export.csv',
        'Deduction_export.csv',
        'Quotation_export.csv',
        'MarketingCampaign_export.csv',
        'CorporateClient_export.csv',
        'InteractionLog_export.csv',
        'Invoice_export.csv',
        'Payment_export.csv',
        'Expense_export.csv',
        'Asset_export.csv',
        'InventoryPart_export.csv',
        'MaintenanceLog_export.csv',
        'IncidentLog_export.csv',
        'VehicleContract_export.csv',
        'FineLog_export.csv',
        'CarImage_export.csv',
        'Agreement_export.csv',
        'StaffDocument_export.csv',
        'LegalDocument_export.csv',
        'AIDocumentProcessing_export.csv'
    ]
    
    with open(output_file, 'w') as f:
        f.write("-- Generated Import Script for Supabase\n")
        f.write("-- Run this script in your Supabase SQL Editor\n\n")
        f.write("BEGIN;\n\n")
        
        total_records = 0
        
        for csv_file in import_order:
            csv_path = os.path.join(csv_dir, csv_file)
            
            if not os.path.exists(csv_path):
                print(f"Warning: {csv_file} not found, skipping...")
                continue
                
            table_name = CSV_TABLE_MAPPING.get(csv_file)
            if not table_name:
                print(f"Warning: No table mapping for {csv_file}, skipping...")
                continue
            
            print(f"Processing {csv_file} -> {table_name}")
            
            try:
                with open(csv_path, 'r', encoding='utf-8') as csvfile:
                    reader = csv.DictReader(csvfile)
                    rows = list(reader)
                    
                    if rows:
                        sql = generate_insert_statement(table_name, rows, FIELD_MAPPINGS)
                        f.write(sql + '\n\n')
                        total_records += len(rows)
                        print(f"  -> {len(rows)} records")
                    else:
                        print(f"  -> No data found")
                        
            except Exception as e:
                print(f"Error processing {csv_file}: {str(e)}")
                continue
        
        f.write("COMMIT;\n\n")
        f.write("-- Import Summary\n")
        f.write("SELECT 'Import completed successfully!' as status;\n")
        f.write("SELECT table_name, COUNT(*) as record_count FROM (\n")
        
        summary_unions = []
        for csv_file in import_order:
            table_name = CSV_TABLE_MAPPING.get(csv_file)
            if table_name:
                summary_unions.append(f"  SELECT '{table_name}' as table_name, COUNT(*) FROM {table_name}")
        
        f.write(' UNION ALL\n'.join(summary_unions))
        f.write("\n) counts GROUP BY table_name ORDER BY table_name;")
        
    print(f"\n✅ Import script generated: {output_file}")
    print(f"📊 Total records to import: {total_records}")
    print("\n🚀 Next steps:")
    print("1. Open your Supabase project dashboard")
    print("2. Go to SQL Editor")
    print("3. Copy and paste the contents of import_all_data.sql")
    print("4. Run the script")

if __name__ == '__main__':
    main()