import { supabase } from '../lib/supabase';
import { handleSupabaseError } from '../utils/errorHandler.js';

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
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert(item)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      // Use statically imported error handler
      throw handleSupabaseError(error);
    }
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
export const Customer = new SupabaseEntity('customer')
export const Vehicle = new SupabaseEntity('vehicle')
export const Booking = new SupabaseEntity('booking')
export const VehicleDocument = new SupabaseEntity('vehicle_document')
export const Employee = new SupabaseEntity('employee')
export const Shift = new SupabaseEntity('shift')
export const Attendance = new SupabaseEntity('attendance')
export const Payroll = new SupabaseEntity('payroll')
export const LeaveRequest = new SupabaseEntity('leave_request')
export const Deduction = new SupabaseEntity('deduction')
export const Lead = new SupabaseEntity('lead')
export const Quotation = new SupabaseEntity('quotation')
export const MarketingCampaign = new SupabaseEntity('marketing_campaign')
export const CorporateClient = new SupabaseEntity('corporate_client')
export const InteractionLog = new SupabaseEntity('interaction_log')
export const Invoice = new SupabaseEntity('invoice')
export const Payment = new SupabaseEntity('payment')
export const Expense = new SupabaseEntity('expense')
export const Asset = new SupabaseEntity('asset')
export const InventoryPart = new SupabaseEntity('inventory_part')
export const MaintenanceLog = new SupabaseEntity('maintenance_log')
export const IncidentLog = new SupabaseEntity('incident_log')
export const VehicleContract = new SupabaseEntity('vehicle_contract')
export const FineLog = new SupabaseEntity('fine_log')
export const CustomerDocument = new SupabaseEntity('customer_document')
export const CarImage = new SupabaseEntity('car_image')
export const Agreement = new SupabaseEntity('agreement')
export const StaffDocument = new SupabaseEntity('staff_document')
export const LegalDocument = new SupabaseEntity('legal_document')
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