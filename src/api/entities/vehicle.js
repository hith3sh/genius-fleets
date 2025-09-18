import BaseEntity from './baseEntity';
import { supabase } from '@/lib/railway-db';

class Vehicle extends BaseEntity {
  constructor() {
    super('vehicle');
  }

  /**
   * Get a vehicle with its documents
   * @param {string} id - The vehicle ID
   * @returns {Promise<object>} - The vehicle data with documents
   */
  async getWithDocuments(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        vehicle_document(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * Search vehicles by make, model, or license plate
   * @param {string} query - The search query
   * @returns {Promise<Array>} - Array of matching vehicles
   */
  async searchVehicles(query) {
    if (!query || query.trim() === '') {
      return this.list();
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .or(`make.ilike.%${query}%,model.ilike.%${query}%,license_plate.ilike.%${query}%`)
      .order('make');
    
    if (error) throw error;
    return data;
  }

  /**
   * Get available vehicles for booking
   * @param {string} startDate - Booking start date (YYYY-MM-DD)
   * @param {string} endDate - Booking end date (YYYY-MM-DD)
   * @param {string} vehicleClass - Optional vehicle class filter
   * @returns {Promise<Array>} - Array of available vehicles
   */
  async getAvailableVehicles(startDate, endDate, vehicleClass = null) {
    // First get all vehicles that are available
    let query = supabase
      .from(this.tableName)
      .select('*')
      .eq('status', 'Available');
    
    // Filter by vehicle class if provided
    if (vehicleClass) {
      query = query.eq('vehicle_class', vehicleClass);
    }
    
    const { data: allAvailableVehicles, error } = await query;
    
    if (error) throw error;
    
    // If no dates provided, return all available vehicles
    if (!startDate || !endDate) {
      return allAvailableVehicles;
    }
    
    // Get all bookings that overlap with the requested period
    const { data: bookings } = await supabase
      .from('booking')
      .select('vehicle_id')
      .or(`start_date.lte.${endDate},end_date.gte.${startDate}`)
      .in('status', ['Pending', 'Confirmed', 'Active']);
    
    // Filter out vehicles that have bookings in the requested period
    const bookedVehicleIds = bookings.map(booking => booking.vehicle_id);
    
    return allAvailableVehicles.filter(vehicle => !bookedVehicleIds.includes(vehicle.id));
  }

  /**
   * Get vehicle statistics
   * @returns {Promise<object>} - Vehicle statistics
   */
  async getStatistics() {
    const [totalCount, availableCount, rentedCount, maintenanceCount] = await Promise.all([
      this.count(),
      this.count({ status: 'Available' }),
      this.count({ status: 'Rented' }),
      this.count({ status: 'Under Maintenance' })
    ]);

    return {
      total: totalCount,
      available: availableCount,
      rented: rentedCount,
      maintenance: maintenanceCount,
      other: totalCount - availableCount - rentedCount - maintenanceCount
    };
  }

  /**
   * Get a vehicle's maintenance logs
   * @param {string} id - The vehicle ID
   * @returns {Promise<Array>} - Array of maintenance logs
   */
  async getMaintenanceLogs(id) {
    const { data, error } = await supabase
      .from('maintenance_log')
      .select('*')
      .eq('vehicle_id', id)
      .order('service_date', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  /**
   * Get a vehicle's booking history
   * @param {string} id - The vehicle ID
   * @returns {Promise<Array>} - Array of bookings
   */
  async getBookingHistory(id) {
    const { data, error } = await supabase
      .from('booking')
      .select(`
        *,
        customer:customer_id(name, email, phone)
      `)
      .eq('vehicle_id', id)
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    return data;
  }
}

export default new Vehicle();
