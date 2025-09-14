import BaseEntity from './baseEntity';
import { supabase } from '../../lib/supabase';

class Lead extends BaseEntity {
  constructor() {
    super('lead');
  }

  /**
   * Search leads by name, email, or phone
   * @param {string} query - The search query
   * @returns {Promise<Array>} - Array of matching leads
   */
  async searchLeads(query) {
    if (!query || query.trim() === '') {
      return this.list();
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Get lead statistics by status
   * @returns {Promise<object>} - Lead statistics
   */
  async getStatistics() {
    const [totalCount, newCount, contactedCount, quotedCount, followUpCount, wonCount, lostCount] = await Promise.all([
      this.count(),
      this.count({ status: 'New' }),
      this.count({ status: 'Contacted' }),
      this.count({ status: 'Quoted' }),
      this.count({ status: 'Follow-up' }),
      this.count({ status: 'Won' }),
      this.count({ status: 'Lost' })
    ]);

    return {
      total: totalCount,
      new: newCount,
      contacted: contactedCount,
      quoted: quotedCount,
      followUp: followUpCount,
      won: wonCount,
      lost: lostCount
    };
  }

  /**
   * Get leads by status
   * @param {string} status - The lead status
   * @returns {Promise<Array>} - Array of leads
   */
  async getByStatus(status) {
    return this.list(null, { status: status });
  }

  /**
   * Get leads assigned to a specific user
   * @param {string} userId - The user ID
   * @returns {Promise<Array>} - Array of leads
   */
  async getAssignedTo(userId) {
    return this.list(null, { assigned_to_id: userId });
  }

  /**
   * Get unassigned leads
   * @returns {Promise<Array>} - Array of unassigned leads
   */
  async getUnassigned() {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .is('assigned_to_id', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export default new Lead();