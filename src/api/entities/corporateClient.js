import BaseEntity from './baseEntity';
import { supabase } from '../../lib/supabase';

class CorporateClient extends BaseEntity {
  constructor() {
    super('corporate_client');
  }

  /**
   * Search corporate clients by name, email, or contact person
   * @param {string} query - The search query
   * @returns {Promise<Array>} - Array of matching corporate clients
   */
  async searchCorporateClients(query) {
    if (!query || query.trim() === '') {
      return this.list();
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .or(`company_name.ilike.%${query}%,email.ilike.%${query}%,contact_person.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Get corporate client statistics
   * @returns {Promise<object>} - Corporate client statistics
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
   * Get corporate clients by status
   * @param {string} status - The client status (Active, Inactive, etc.)
   * @returns {Promise<Array>} - Array of corporate clients
   */
  async getByStatus(status) {
    return this.list(null, { status: status });
  }

  /**
   * Get corporate clients by industry
   * @param {string} industry - The industry type
   * @returns {Promise<Array>} - Array of corporate clients
   */
  async getByIndustry(industry) {
    return this.list(null, { industry: industry });
  }

  /**
   * Get a corporate client with their contracts/bookings
   * @param {string} id - The corporate client ID
   * @returns {Promise<object>} - The corporate client data with related records
   */
  async getWithContracts(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        bookings:booking(
          id,
          start_date,
          end_date,
          status,
          total_amount,
          vehicle:vehicle_id(make, model, license_plate)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get corporate clients assigned to a specific account manager
   * @param {string} managerId - The account manager ID
   * @returns {Promise<Array>} - Array of corporate clients
   */
  async getByAccountManager(managerId) {
    return this.list(null, { account_manager_id: managerId });
  }

  /**
   * Get high-value corporate clients (based on total contract value)
   * @param {number} minValue - Minimum total contract value
   * @returns {Promise<Array>} - Array of high-value corporate clients
   */
  async getHighValueClients(minValue = 10000) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .gte('total_contract_value', minValue)
      .order('total_contract_value', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export default new CorporateClient();