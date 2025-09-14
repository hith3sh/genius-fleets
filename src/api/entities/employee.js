import BaseEntity from './baseEntity';
import { supabase } from '../../lib/supabase';

class Employee extends BaseEntity {
  constructor() {
    super('employee');
  }

  /**
   * Get an employee with their documents
   * @param {string} id - The employee ID
   * @returns {Promise<object>} - The employee data with documents
   */
  async getWithDocuments(id) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          staff_document(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching employee with documents:', error);
      throw error;
    }
  }

  /**
   * Search employees by name, email, or employee ID
   * @param {string} query - The search query
   * @returns {Promise<Array>} - Array of matching employees
   */
  async search(query) {
    if (!query || query.trim() === '') {
      return this.list();
    }

    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .or(`name.ilike.%${query}%,email.ilike.%${query}%,employee_id.ilike.%${query}%`)
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching employees:', error);
      return [];
    }
  }

  /**
   * Get employees by department
   * @param {string} department - Department name
   * @returns {Promise<Array>} - Array of employees in department
   */
  async getByDepartment(department) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('department', department)
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching employees by department:', error);
      return [];
    }
  }

  /**
   * Get employees by status (active, inactive, terminated)
   * @param {string} status - Employee status
   * @returns {Promise<Array>} - Array of employees with status
   */
  async getByStatus(status) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('status', status)
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching employees by status:', error);
      return [];
    }
  }

  /**
   * Get active employees only
   * @returns {Promise<Array>} - Array of active employees
   */
  async getActive() {
    return this.getByStatus('Active');
  }

  /**
   * Get employee statistics
   * @returns {Promise<object>} - Employee statistics
   */
  async getStats() {
    try {
      const [total, active, inactive, terminated] = await Promise.all([
        this.count(),
        this.count({ status: 'Active' }),
        this.count({ status: 'Inactive' }),
        this.count({ status: 'Terminated' })
      ]);

      return {
        total,
        active,
        inactive,
        terminated
      };
    } catch (error) {
      console.error('Error fetching employee statistics:', error);
      return {
        total: 0,
        active: 0,
        inactive: 0,
        terminated: 0
      };
    }
  }

  /**
   * Get employees with upcoming contract renewals
   * @param {number} days - Number of days ahead to check (default: 30)
   * @returns {Promise<Array>} - Array of employees with contracts expiring soon
   */
  async getContractRenewals(days = 30) {
    try {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + days);
      
      const todayStr = today.toISOString().split('T')[0];
      const futureDateStr = futureDate.toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .gte('contract_end_date', todayStr)
        .lte('contract_end_date', futureDateStr)
        .eq('status', 'Active')
        .order('contract_end_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching contract renewals:', error);
      return [];
    }
  }

  /**
   * Get employees by position/role
   * @param {string} position - Position/role name
   * @returns {Promise<Array>} - Array of employees in position
   */
  async getByPosition(position) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('position', position)
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching employees by position:', error);
      return [];
    }
  }
}

export default new Employee();
