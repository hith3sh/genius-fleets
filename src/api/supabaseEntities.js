import { supabase } from '@/lib/railway-db';
import { handleSupabaseError } from '../utils/errorHandler.js';

// Generic CRUD operations for Supabase
class SupabaseEntity {
  constructor(tableName) {
    this.tableName = tableName
  }

  async list(filtersOrOrder = {}) {
    try {
      // Handle ordering parameter (string starting with - or just column name)
      if (typeof filtersOrOrder === 'string') {
        console.log(`Loading ${this.tableName} with ordering: ${filtersOrOrder}`)
        // For now, ignore ordering and just do simple select
        // TODO: Add proper ordering support to the API
        const { data, error } = await supabase.from(this.tableName).select('*')
        if (error) throw error
        return data
      }

      // Handle filters object
      const filters = filtersOrOrder || {}

      // If no filters, do a simple select
      if (Object.keys(filters).length === 0) {
        const { data, error } = await supabase.from(this.tableName).select('*')
        if (error) throw error
        return data
      }

      // If there are filters, use the API directly to avoid method chaining issues
      const filterQuery = encodeURIComponent(JSON.stringify(filters))
      const response = await fetch(`/api/db/${this.tableName}?select=*&filter=${filterQuery}`)
      const result = await response.json()

      if (result.error) throw new Error(result.error)
      return result.data || []
    } catch (error) {
      console.error(`Error in ${this.tableName} list:`, error)
      throw error
    }
  }

  async get(id) {
    try {
      // Use direct API call to avoid method chaining issues
      const response = await fetch(`/api/db/${this.tableName}/${id}?select=*`)
      const result = await response.json()

      if (result.error) throw new Error(result.error)
      return result.data
    } catch (error) {
      console.error(`Error in ${this.tableName} get:`, error)
      throw error
    }
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