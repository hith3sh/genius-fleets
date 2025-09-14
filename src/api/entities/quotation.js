import BaseEntity from './baseEntity';
import { supabase } from '../../lib/supabase';

class Quotation extends BaseEntity {
  constructor() {
    super('quotation');
  }

  /**
   * Get a quotation with customer details
   * @param {string} id - The quotation ID
   * @returns {Promise<object>} - The quotation data with customer details
   */
  async getWithCustomer(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        customer:customer_id(id, name, email, phone)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Search quotations by customer name or vehicle details
   * @param {string} query - The search query
   * @returns {Promise<Array>} - Array of matching quotations
   */
  async searchQuotations(query) {
    if (!query || query.trim() === '') {
      return this.list();
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        customer:customer_id(name)
      `)
      .or(`vehicle_details.ilike.%${query}%,customer.name.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Get quotation statistics by status
   * @returns {Promise<object>} - Quotation statistics
   */
  async getStatistics() {
    const [totalCount, draftCount, sentCount, acceptedCount, rejectedCount] = await Promise.all([
      this.count(),
      this.count({ status: 'Draft' }),
      this.count({ status: 'Sent' }),
      this.count({ status: 'Accepted' }),
      this.count({ status: 'Rejected' })
    ]);

    return {
      total: totalCount,
      draft: draftCount,
      sent: sentCount,
      accepted: acceptedCount,
      rejected: rejectedCount
    };
  }

  /**
   * Get quotations by status
   * @param {string} status - The quotation status
   * @returns {Promise<Array>} - Array of quotations
   */
  async getByStatus(status) {
    return this.list(null, { status: status });
  }

  /**
   * Get quotations assigned to a specific sales rep
   * @param {string} salesRepId - The sales rep ID
   * @returns {Promise<Array>} - Array of quotations
   */
  async getBySalesRep(salesRepId) {
    return this.list(null, { sales_rep_id: salesRepId });
  }

  /**
   * Get quotations for a specific customer
   * @param {string} customerId - The customer ID
   * @returns {Promise<Array>} - Array of quotations
   */
  async getByCustomer(customerId) {
    return this.list(null, { customer_id: customerId });
  }

  /**
   * Get expired quotations (past validity date)
   * @returns {Promise<Array>} - Array of expired quotations
   */
  async getExpired() {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .lt('validity_date', today)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export default new Quotation();