import BaseEntity from './baseEntity';
import { supabase } from '../../lib/railway-db';

class VehicleContract extends BaseEntity {
  constructor() {
    super('vehicle_contract');
  }

  /**
   * Get contracts by vehicle ID
   * @param {string} vehicleId - Vehicle ID
   * @returns {Promise<Array>} - Array of contracts for the vehicle
   */
  async getByVehicle(vehicleId) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching contracts by vehicle:', error);
      return [];
    }
  }

  /**
   * Get contracts by status
   * @param {string} status - Contract status (Active, Expired, Terminated)
   * @returns {Promise<Array>} - Array of contracts by status
   */
  async getByStatus(status) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching contracts by status:', error);
      return [];
    }
  }

  /**
   * Get active contracts
   * @returns {Promise<Array>} - Array of active contracts
   */
  async getActiveContracts() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('status', 'Active')
        .order('start_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching active contracts:', error);
      return [];
    }
  }

  /**
   * Get expired contracts
   * @returns {Promise<Array>} - Array of expired contracts
   */
  async getExpiredContracts() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .lt('end_date', today)
        .order('end_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching expired contracts:', error);
      return [];
    }
  }

  /**
   * Get contracts expiring soon (within specified days)
   * @param {number} days - Number of days to look ahead (default: 30)
   * @returns {Promise<Array>} - Array of contracts expiring soon
   */
  async getExpiringSoon(days = 30) {
    try {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + days);

      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .gte('end_date', today.toISOString().split('T')[0])
        .lte('end_date', futureDate.toISOString().split('T')[0])
        .eq('status', 'Active')
        .order('end_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching contracts expiring soon:', error);
      return [];
    }
  }

  /**
   * Get contracts by customer name
   * @param {string} customerName - Customer name
   * @returns {Promise<Array>} - Array of contracts for the customer
   */
  async getByCustomer(customerName) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .ilike('customer_name', `%${customerName}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching contracts by customer:', error);
      return [];
    }
  }

  /**
   * Get contracts within date range
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Promise<Array>} - Array of contracts within date range
   */
  async getByDateRange(startDate, endDate) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .gte('start_date', startDate)
        .lte('end_date', endDate)
        .order('start_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching contracts by date range:', error);
      return [];
    }
  }

  /**
   * Search contracts by customer name or vehicle info
   * @param {string} query - Search query
   * @returns {Promise<Array>} - Array of matching contracts
   */
  async searchContracts(query) {
    if (!query || query.trim() === '') {
      return this.list('-created_at');
    }

    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .or(`customer_name.ilike.%${query}%,payment_terms.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching contracts:', error);
      return [];
    }
  }

  /**
   * Get contract statistics
   * @returns {Promise<object>} - Contract statistics
   */
  async getStats() {
    try {
      const [total, active, expired, terminated, expiringSoon] = await Promise.all([
        this.count(),
        this.count({ status: 'Active' }),
        this.count({ status: 'Expired' }),
        this.count({ status: 'Terminated' }),
        this.getExpiringSoon(30).then(contracts => contracts.length)
      ]);

      // Calculate total contract value
      const { data: allContracts } = await supabase
        .from(this.tableName)
        .select('contract_value');

      const totalValue = allContracts?.reduce((sum, contract) => {
        return sum + (parseFloat(contract.contract_value) || 0);
      }, 0) || 0;

      return {
        total,
        active,
        expired,
        terminated,
        expiringSoon,
        totalValue
      };
    } catch (error) {
      console.error('Error fetching contract statistics:', error);
      return {
        total: 0,
        active: 0,
        expired: 0,
        terminated: 0,
        expiringSoon: 0,
        totalValue: 0
      };
    }
  }

  /**
   * Update contract status
   * @param {string} id - Contract ID
   * @param {string} status - New status
   * @returns {Promise<object>} - Updated contract
   */
  async updateStatus(id, status) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating contract status:', error);
      throw error;
    }
  }

  /**
   * Get contracts with vehicle details
   * @param {string} orderBy - Ordering field (default: '-created_at')
   * @returns {Promise<Array>} - Array of contracts with vehicle information
   */
  async getWithVehicleDetails(orderBy = '-created_at') {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          vehicle:vehicle_id (
            id,
            make,
            model,
            license_plate,
            year,
            color
          )
        `)
        .order('created_at', { ascending: orderBy.startsWith('-') ? false : true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching contracts with vehicle details:', error);
      return [];
    }
  }

  /**
   * Terminate contract
   * @param {string} id - Contract ID
   * @param {string} reason - Termination reason
   * @returns {Promise<object>} - Updated contract
   */
  async terminateContract(id, reason = '') {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update({ 
          status: 'Terminated',
          payment_terms: reason ? `${data?.payment_terms || ''} - Terminated: ${reason}` : data?.payment_terms
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error terminating contract:', error);
      throw error;
    }
  }

  /**
   * Extend contract
   * @param {string} id - Contract ID
   * @param {string} newEndDate - New end date
   * @returns {Promise<object>} - Updated contract
   */
  async extendContract(id, newEndDate) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update({ 
          end_date: newEndDate,
          status: 'Active'
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error extending contract:', error);
      throw error;
    }
  }
}

export default new VehicleContract();
