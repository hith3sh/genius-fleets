import { supabase } from '../lib/supabase'

// Generic CRUD operations for Supabase
class SupabaseEntity {
  constructor(tableName) {
    this.tableName = tableName
  }

  async list(filters = {}) {
    let query = supabase.from(this.tableName).select('*')
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })

    const { data, error } = await query
    if (error) throw error
    return data
  }

  async get(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  async create(item) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(item)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async update(id, updates) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async delete(id) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }

  async filter(filters) {
    return this.list(filters)
  }
}

// Export all entities
export const UserAccess = new SupabaseEntity('user_access')
export const Customer = new SupabaseEntity('customers')
export const Vehicle = new SupabaseEntity('vehicles')
export const Booking = new SupabaseEntity('bookings')
export const VehicleDocument = new SupabaseEntity('vehicle_documents')
export const Employee = new SupabaseEntity('employees')
export const Shift = new SupabaseEntity('shifts')
export const Attendance = new SupabaseEntity('attendance')
export const Payroll = new SupabaseEntity('payroll')
export const LeaveRequest = new SupabaseEntity('leave_requests')
export const Deduction = new SupabaseEntity('deductions')
export const Lead = new SupabaseEntity('leads')
export const Quotation = new SupabaseEntity('quotations')
export const MarketingCampaign = new SupabaseEntity('marketing_campaigns')
export const CorporateClient = new SupabaseEntity('corporate_clients')
export const InteractionLog = new SupabaseEntity('interaction_logs')
export const Invoice = new SupabaseEntity('invoices')
export const Payment = new SupabaseEntity('payments')
export const Expense = new SupabaseEntity('expenses')
export const Asset = new SupabaseEntity('assets')
export const InventoryPart = new SupabaseEntity('inventory_parts')
export const MaintenanceLog = new SupabaseEntity('maintenance_logs')
export const IncidentLog = new SupabaseEntity('incident_logs')
export const VehicleContract = new SupabaseEntity('vehicle_contracts')
export const FineLog = new SupabaseEntity('fine_logs')
export const CustomerDocument = new SupabaseEntity('customer_documents')
export const CarImage = new SupabaseEntity('car_images')
export const Agreement = new SupabaseEntity('agreements')
export const StaffDocument = new SupabaseEntity('staff_documents')
export const LegalDocument = new SupabaseEntity('legal_documents')
export const AIDocumentProcessing = new SupabaseEntity('ai_document_processing')

// Authentication helper
export const User = {
  async me() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async login() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (error) throw error
    return data
  },

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async list() {
    // This would typically require admin access
    // For now, return current user
    const user = await this.me()
    return user ? [user] : []
  }
}