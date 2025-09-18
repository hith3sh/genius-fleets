import BaseEntity from './baseEntity';
import { supabase } from '../../lib/railway-db';

class Customer extends BaseEntity {
  constructor() {
    super('customer');
  }

  /**
   * Get a customer with their documents
   * @param {string} id - The customer ID
   * @returns {Promise<object>} - The customer data with documents
   */
  async getWithDocuments(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        customer_document(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * Search customers by name, email, or phone
   * @param {string} query - The search query
   * @returns {Promise<Array>} - Array of matching customers
   */
  async searchCustomers(query) {
    if (!query || query.trim() === '') {
      return this.list();
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
      .order('name');
    
    if (error) throw error;
    return data;
  }

  /**
   * Get customer statistics
   * @returns {Promise<object>} - Customer statistics
   */
  async getStatistics() {
    const [totalCount, activeCount, inactiveCount] = await Promise.all([
      this.count(),
      this.count({ status: 'Active' }),
      this.count({ status: 'Inactive' })
    ]);

    return {
      total: totalCount,
      active: activeCount,
      inactive: inactiveCount,
      blocked: totalCount - activeCount - inactiveCount
    };
  }

  /**
   * Get customers by type
   * @param {string} type - The customer type (Individual or Corporate)
   * @returns {Promise<Array>} - Array of customers
   */
  async getByType(type) {
    return this.list(null, { customer_type: type });
  }

  /**
   * Get a customer's bookings
   * @param {string} id - The customer ID
   * @returns {Promise<Array>} - Array of bookings
   */
  async getBookings(id) {
    const { data, error } = await supabase
      .from('booking')
      .select(`
        *,
        vehicle:vehicle_id(make, model, license_plate, vehicle_class)
      `)
      .eq('customer_id', id)
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    return data;
  }
}

export default new Customer();
