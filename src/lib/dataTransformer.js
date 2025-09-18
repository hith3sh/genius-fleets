/**
 * Data transformation layer to normalize PostgreSQL data types
 * Similar to what Supabase PostgREST does automatically
 */

// Define numeric fields for each entity
const NUMERIC_FIELDS = {
  // Booking related fields
  booking: [
    'total_amount', 'vat_amount', 'final_amount', 'subtotal',
    'daily_rate', 'weekly_rate', 'monthly_rate', 'security_deposit'
  ],

  // Vehicle related fields
  vehicle: [
    'daily_rate', 'weekly_rate', 'monthly_rate', 'mileage',
    'purchase_price', 'current_value', 'insurance_value'
  ],

  // Invoice related fields
  invoice: [
    'amount', 'subtotal', 'vat_amount', 'total_amount', 'tax',
    'salik_rate', 'salik_qty', 'traffic_fines_rate', 'traffic_fines_qty',
    'other_charges_rate', 'other_charges_qty'
  ],

  // Contract related fields
  vehicleContract: [
    'contract_value', 'monthly_rate', 'security_deposit'
  ],

  // Expense related fields
  expense: [
    'amount', 'vat_amount', 'total_amount'
  ],

  // Customer related fields
  customer: [
    'credit_limit', 'outstanding_balance'
  ],

  // HR/Payroll related fields
  payroll: [
    'base_salary', 'overtime_pay', 'deductions', 'net_pay', 'bonus'
  ],

  // Incident related fields
  incident: [
    'estimated_cost', 'actual_cost', 'repair_cost'
  ]
};

/**
 * Convert string/null numeric values to JavaScript numbers
 */
function convertToNumber(value) {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

/**
 * Transform a single record's numeric fields
 */
function transformRecord(record, entityType = 'booking') {
  if (!record || typeof record !== 'object') {
    return record;
  }

  const numericFields = NUMERIC_FIELDS[entityType] || NUMERIC_FIELDS.booking;
  const transformed = { ...record };

  numericFields.forEach(field => {
    if (field in transformed) {
      transformed[field] = convertToNumber(transformed[field]);
    }
  });

  return transformed;
}

/**
 * Transform an array of records
 */
function transformRecords(records, entityType = 'booking') {
  if (!Array.isArray(records)) {
    return records;
  }

  return records.map(record => transformRecord(record, entityType));
}

/**
 * Auto-detect entity type from common patterns
 */
function detectEntityType(record) {
  if (!record || typeof record !== 'object') return 'booking';

  // Check for specific field patterns to determine entity type
  if ('contract_value' in record) return 'vehicleContract';
  if ('daily_rate' in record && 'make' in record) return 'vehicle';
  if ('invoice_number' in record) return 'invoice';
  if ('expense_date' in record) return 'expense';
  if ('base_salary' in record) return 'payroll';
  if ('incident_date' in record) return 'incident';
  if ('credit_limit' in record) return 'customer';
  if ('total_amount' in record) return 'booking';

  return 'booking'; // default
}

/**
 * Smart transform that auto-detects entity type
 */
function smartTransform(data) {
  if (Array.isArray(data)) {
    if (data.length === 0) return data;
    const entityType = detectEntityType(data[0]);
    return transformRecords(data, entityType);
  } else if (data && typeof data === 'object') {
    const entityType = detectEntityType(data);
    return transformRecord(data, entityType);
  }

  return data;
}

export {
  transformRecord,
  transformRecords,
  smartTransform,
  convertToNumber,
  NUMERIC_FIELDS
};