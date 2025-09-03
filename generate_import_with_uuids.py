#!/usr/bin/env python3
"""
Enhanced CSV to Supabase SQL Import Generator with UUID Mapping
Handles foreign key relationships by creating proper UUID mappings
"""

import csv
import json
import os
from datetime import datetime
import re
import uuid

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

# Foreign key mappings - which fields reference other tables
FOREIGN_KEY_MAPPINGS = {
    'booking': {
        'customer_id': 'customer',
        'vehicle_id': 'vehicle'
    },
    'quotation': {
        'customer_id': 'customer',
        'lead_id': 'lead'
    },
    'interaction_log': {
        'customer_id': 'customer',
        'lead_id': 'lead'
    },
    'invoice': {
        'client_id': 'customer',
        'booking_id': 'booking'
    },
    'maintenance_log': {
        'vehicle_id': 'vehicle'
    },
    'incident_log': {
        'vehicle_id': 'vehicle'
    },
    'vehicle_contract': {
        'vehicle_id': 'vehicle',
        'booking_id': 'booking'
    },
    'fine_log': {
        'vehicle_id': 'vehicle'
    },
    'customer_document': {
        'customer_id': 'customer'
    },
    'vehicle_document': {
        'vehicle_id': 'vehicle'
    },
    'agreement': {
        'customer_id': 'customer',
        'vehicle_id': 'vehicle',
        'booking_id': 'booking'
    },
    'attendance': {
        'employee_id': 'employee',
        'shift_id': 'shift'
    },
    'payroll': {
        'employee_id': 'employee'
    },
    'leave_request': {
        'employee_id': 'employee'
    },
    'deduction': {
        'employee_id': 'employee'
    },
    'staff_document': {
        'employee_id': 'employee'
    }
}

# Store UUID mappings
uuid_mappings = {}

def generate_uuid_for_old_id(table_name, old_id):
    """Generate a consistent UUID for an old Base44 ID"""
    if not old_id:
        return None
    
    key = f"{table_name}:{old_id}"
    if key not in uuid_mappings:
        uuid_mappings[key] = str(uuid.uuid4())
    return uuid_mappings[key]

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
                return 0.0
        elif conversion_type == 'json_object':
            if value and (value.startswith('{') or value.startswith('[')):
                try:
                    return json.loads(value)
                except:
                    return {} if value.startswith('{') else []
            return {}
        elif conversion_type == 'date_iso':
            if re.match(r'^\d{4}-\d{2}-\d{2}', value):
                return value[:10]
            return None
        elif conversion_type == 'date_ddmmmyy':
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
        if not value:
            return 'ARRAY[]::TEXT[]'
        escaped_items = [f"'{str(item).replace(chr(39), chr(39)+chr(39))}'" for item in value]
        return f"ARRAY[{', '.join(escaped_items)}]"
    elif isinstance(value, dict):
        json_str = json.dumps(value).replace("'", "''")
        return f"'{json_str}'::jsonb"
    else:
        escaped = str(value).replace("'", "''")
        return f"'{escaped}'"

# Field type mappings
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

def process_csv_data(csv_path, table_name):
    """Process CSV file and return cleaned data with UUID mappings"""
    if not os.path.exists(csv_path):
        return []
        
    rows = []
    with open(csv_path, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            processed_row = {}
            old_id = row.get('id')
            
            # Generate UUID for this record
            if old_id:
                new_uuid = generate_uuid_for_old_id(table_name, old_id)
                processed_row['uuid'] = new_uuid
            
            # Process each field
            for col, value in row.items():
                if col in EXCLUDE_FIELDS:
                    continue
                    
                cleaned_value = clean_value(value)
                
                # Handle foreign key references
                if table_name in FOREIGN_KEY_MAPPINGS and col in FOREIGN_KEY_MAPPINGS[table_name]:
                    referenced_table = FOREIGN_KEY_MAPPINGS[table_name][col]
                    if cleaned_value:
                        # Convert old ID to new UUID
                        processed_row[col] = generate_uuid_for_old_id(referenced_table, cleaned_value)
                    else:
                        processed_row[col] = None
                else:
                    # Apply field-specific conversion
                    if table_name in FIELD_MAPPINGS and col in FIELD_MAPPINGS[table_name]:
                        conversion_type = FIELD_MAPPINGS[table_name][col]
                        converted_value = convert_value(cleaned_value, conversion_type)
                    else:
                        converted_value = cleaned_value
                    
                    processed_row[col] = converted_value
            
            rows.append(processed_row)
    
    return rows

def generate_insert_statement(table_name, rows):
    """Generate SQL INSERT statement for a table"""
    if not rows:
        return ""
    
    # Get column names - include id (UUID) for primary tables
    columns = [col for col in rows[0].keys() if col != 'uuid']
    
    # For primary tables (customer, vehicle, etc.), we need to include the id column
    has_foreign_keys = table_name in FOREIGN_KEY_MAPPINGS and FOREIGN_KEY_MAPPINGS[table_name]
    is_primary_table = table_name in ['customer', 'vehicle', 'employee', 'lead', 'shift', 'user_access']
    
    if is_primary_table:
        columns = ['id'] + columns
    
    if not columns:
        return ""
    
    sql_parts = [f"-- Import data for {table_name}"]
    sql_parts.append(f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES")
    
    value_rows = []
    for row in rows:
        values = []
        for col in columns:
            if col == 'id':
                # Use the generated UUID for this record
                values.append(f"'{row['uuid']}'")
            else:
                values.append(escape_sql_value(row.get(col)))
        value_rows.append(f"  ({', '.join(values)})")
    
    sql_parts.append(',\n'.join(value_rows))
    sql_parts.append("ON CONFLICT DO NOTHING;\n")
    
    return '\n'.join(sql_parts)

def main():
    csv_dir = '/Users/hitheshjay/Downloads/aljisrcars/csv_files'
    output_file = '/Users/hitheshjay/Downloads/aljisrcars/import_all_data_with_uuids.sql'
    
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
    
    # First pass: process all CSV files to build UUID mappings
    print("🔄 Building UUID mappings...")
    all_data = {}
    for csv_file in import_order:
        csv_path = os.path.join(csv_dir, csv_file)
        table_name = CSV_TABLE_MAPPING.get(csv_file)
        if table_name:
            data = process_csv_data(csv_path, table_name)
            all_data[table_name] = data
            if data:
                print(f"  📊 {table_name}: {len(data)} records")
    
    # Second pass: generate SQL with proper UUID references
    print("\n🛠️  Generating SQL import script...")
    with open(output_file, 'w') as f:
        f.write("-- Generated Import Script for Supabase with UUID Mapping\n")
        f.write("-- All foreign key relationships use proper UUIDs\n\n")
        f.write("BEGIN;\n\n")
        
        total_records = 0
        
        for csv_file in import_order:
            table_name = CSV_TABLE_MAPPING.get(csv_file)
            if table_name and table_name in all_data:
                data = all_data[table_name]
                if data:
                    sql = generate_insert_statement(table_name, data)
                    f.write(sql + '\n\n')
                    total_records += len(data)
        
        f.write("COMMIT;\n\n")
        f.write("-- Import Summary\n")
        f.write("SELECT 'Import completed successfully!' as status;\n")
        f.write("SELECT table_name, COUNT(*) as record_count FROM (\n")
        
        summary_unions = []
        for csv_file in import_order:
            table_name = CSV_TABLE_MAPPING.get(csv_file)
            if table_name and table_name in all_data and all_data[table_name]:
                summary_unions.append(f"  SELECT '{table_name}' as table_name, COUNT(*) FROM {table_name}")
        
        if summary_unions:
            f.write(' UNION ALL\n'.join(summary_unions))
            f.write("\n) counts GROUP BY table_name ORDER BY table_name;")
        
    print(f"\n✅ Import script generated: {output_file}")
    print(f"📊 Total records to import: {total_records}")
    print(f"🔗 UUID mappings created: {len(uuid_mappings)}")
    print("\n🚀 Next steps:")
    print("1. Run the constraint fixes first")
    print("2. Copy and paste the contents of import_all_data_with_uuids.sql")
    print("3. Run the script in Supabase SQL Editor")

if __name__ == '__main__':
    main()