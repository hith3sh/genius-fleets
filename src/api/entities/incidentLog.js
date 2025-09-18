import BaseEntity from './baseEntity';
import { supabase } from '../../lib/railway-db';

class IncidentLog extends BaseEntity {
  constructor() {
    super('incident_log');
  }

  /**
   * Get incidents by vehicle ID
   * @param {string} vehicleId - Vehicle ID
   * @returns {Promise<Array>} - Array of incidents for the vehicle
   */
  async getByVehicle(vehicleId) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('incident_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching incidents by vehicle:', error);
      return [];
    }
  }

  /**
   * Get incidents by type
   * @param {string} type - Incident type (Damage, Theft, Accident, Mechanical Issue, Other)
   * @returns {Promise<Array>} - Array of incidents by type
   */
  async getByType(type) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('type', type)
        .order('incident_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching incidents by type:', error);
      return [];
    }
  }

  /**
   * Get incidents by severity
   * @param {string} severity - Severity level (Low, Medium, High, Critical)
   * @returns {Promise<Array>} - Array of incidents by severity
   */
  async getBySeverity(severity) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('severity', severity)
        .order('incident_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching incidents by severity:', error);
      return [];
    }
  }

  /**
   * Get incidents by status
   * @param {string} status - Status (Open, Under Review, Resolved)
   * @returns {Promise<Array>} - Array of incidents by status
   */
  async getByStatus(status) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('status', status)
        .order('incident_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching incidents by status:', error);
      return [];
    }
  }

  /**
   * Get open incidents (not resolved)
   * @returns {Promise<Array>} - Array of open incidents
   */
  async getOpenIncidents() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .neq('status', 'Resolved')
        .order('incident_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching open incidents:', error);
      return [];
    }
  }

  /**
   * Get critical incidents
   * @returns {Promise<Array>} - Array of critical severity incidents
   */
  async getCriticalIncidents() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('severity', 'Critical')
        .order('incident_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching critical incidents:', error);
      return [];
    }
  }

  /**
   * Get incidents within date range
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Promise<Array>} - Array of incidents within date range
   */
  async getByDateRange(startDate, endDate) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .gte('incident_date', startDate)
        .lte('incident_date', endDate)
        .order('incident_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching incidents by date range:', error);
      return [];
    }
  }

  /**
   * Search incidents by description
   * @param {string} query - Search query
   * @returns {Promise<Array>} - Array of matching incidents
   */
  async searchIncidents(query) {
    if (!query || query.trim() === '') {
      return this.list('-incident_date');
    }

    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .ilike('description', `%${query}%`)
        .order('incident_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching incidents:', error);
      return [];
    }
  }

  /**
   * Get incident statistics
   * @returns {Promise<object>} - Incident statistics
   */
  async getStats() {
    try {
      const [total, open, resolved, critical, high, medium, low] = await Promise.all([
        this.count(),
        this.count({ status: 'Open' }),
        this.count({ status: 'Resolved' }),
        this.count({ severity: 'Critical' }),
        this.count({ severity: 'High' }),
        this.count({ severity: 'Medium' }),
        this.count({ severity: 'Low' })
      ]);

      // Get stats by type
      const types = ['Damage', 'Theft', 'Accident', 'Mechanical Issue', 'Other'];
      const typeStats = {};
      
      for (const type of types) {
        typeStats[type] = await this.count({ type });
      }

      return {
        total,
        open,
        resolved,
        underReview: total - open - resolved,
        severity: {
          critical,
          high,
          medium,
          low
        },
        byType: typeStats
      };
    } catch (error) {
      console.error('Error fetching incident statistics:', error);
      return {
        total: 0,
        open: 0,
        resolved: 0,
        underReview: 0,
        severity: {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0
        },
        byType: {}
      };
    }
  }

  /**
   * Update incident status
   * @param {string} id - Incident ID
   * @param {string} status - New status
   * @returns {Promise<object>} - Updated incident
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
      console.error('Error updating incident status:', error);
      throw error;
    }
  }

  /**
   * Get incidents with vehicle details
   * @param {string} orderBy - Ordering field (default: '-incident_date')
   * @returns {Promise<Array>} - Array of incidents with vehicle information
   */
  async getWithVehicleDetails(orderBy = '-incident_date') {
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
            year
          )
        `)
        .order('incident_date', { ascending: orderBy.startsWith('-') ? false : true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching incidents with vehicle details:', error);
      return [];
    }
  }
}

export default new IncidentLog();
