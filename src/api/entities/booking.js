import BaseEntity from './baseEntity';
import { supabase } from '@/lib/railway-db';

class Booking extends BaseEntity {
  constructor() {
    super('booking');
  }

  /**
   * Get a booking with related customer and vehicle data
   * @param {string} id - The booking ID
   * @returns {Promise<object>} - The booking data with relations
   */
  async getWithRelations(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        customer:customer_id(*),
        vehicle:vehicle_id(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * List bookings with related customer and vehicle data
   * @param {string} orderBy - Field to order by (prefix with - for descending)
   * @param {object} filters - Optional filters object
   * @param {number} limit - Optional limit
   * @param {number} offset - Optional offset for pagination
   * @returns {Promise<Array>} - Array of bookings with relations
   */
  async listWithRelations(orderBy = '-start_date', filters = {}, limit = 100, offset = 0) {
    let query = supabase
      .from(this.tableName)
      .select(`
        *,
        customer:customer_id(name, email, phone),
        vehicle:vehicle_id(make, model, license_plate, vehicle_class)
      `);
    
    // Apply filters if provided
    if (filters && Object.keys(filters).length > 0) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null) {
          query = query.eq(key, filters[key]);
        }
      });
    }
    
    // Apply ordering
    if (orderBy) {
      const isDesc = orderBy.startsWith('-');
      const field = isDesc ? orderBy.substring(1) : orderBy;
      query = query.order(field, { ascending: !isDesc });
    }
    
    // Apply pagination
    if (limit) {
      query = query.limit(limit);
    }
    
    if (offset) {
      query = query.range(offset, offset + limit - 1);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  }

  /**
   * Get bookings by date range
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Promise<Array>} - Array of bookings
   */
  async getByDateRange(startDate, endDate) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        customer:customer_id(name, email, phone),
        vehicle:vehicle_id(make, model, license_plate, vehicle_class)
      `)
      .or(`start_date.gte.${startDate},end_date.lte.${endDate}`)
      .order('start_date');
    
    if (error) throw error;
    return data;
  }

  /**
   * Get booking statistics
   * @returns {Promise<object>} - Booking statistics
   */
  async getStatistics() {
    const [totalCount, pendingCount, confirmedCount, activeCount, completedCount, cancelledCount] = await Promise.all([
      this.count(),
      this.count({ status: 'Pending' }),
      this.count({ status: 'Confirmed' }),
      this.count({ status: 'Active' }),
      this.count({ status: 'Completed' }),
      this.count({ status: 'Cancelled' })
    ]);

    return {
      total: totalCount,
      pending: pendingCount,
      confirmed: confirmedCount,
      active: activeCount,
      completed: completedCount,
      cancelled: cancelledCount
    };
  }

  /**
   * Get active bookings
   * @returns {Promise<Array>} - Array of active bookings
   */
  async getActiveBookings() {
    return this.listWithRelations(null, { status: 'Active' });
  }

  /**
   * Get bookings by customer
   * @param {string} customerId - The customer ID
   * @returns {Promise<Array>} - Array of bookings
   */
  async getByCustomer(customerId) {
    return this.listWithRelations(null, { customer_id: customerId });
  }

  /**
   * Get bookings by vehicle
   * @param {string} vehicleId - The vehicle ID
   * @returns {Promise<Array>} - Array of bookings
   */
  async getByVehicle(vehicleId) {
    return this.listWithRelations(null, { vehicle_id: vehicleId });
  }
}

export default new Booking();
