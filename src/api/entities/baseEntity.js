import { supabase } from '../../lib/supabase';

/**
 * Base entity class that provides common CRUD operations for all entities
 */
class BaseEntity {
  constructor(tableName) {
    this.tableName = tableName;
  }

  /**
   * Get a record by ID
   * @param {string} id - The UUID of the record
   * @returns {Promise<object>} - The record data or error
   */
  async get(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * List records with optional sorting
   * @param {string} orderBy - Field to order by (prefix with - for descending)
   * @param {object} filters - Optional filters object
   * @param {number} limit - Optional limit
   * @param {number} offset - Optional offset for pagination
   * @returns {Promise<Array>} - Array of records
   */
  async list(orderBy = 'created_at', filters = {}, limit = 100, offset = 0) {
    console.log(`🔍 BaseEntity.list(): Table: ${this.tableName}, OrderBy: ${orderBy}, Filters:`, filters);
    let query = supabase
      .from(this.tableName)
      .select('*');
    
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
    
    if (error) {
      console.error(`❌ BaseEntity.list(): Query failed for table ${this.tableName}:`, error);
      console.error(`❌ Query details: OrderBy: ${orderBy}, Filters:`, filters);
      throw error;
    }
    console.log(`✅ BaseEntity.list(): Successfully fetched ${data?.length || 0} records from ${this.tableName}`);
    return data;
  }

  /**
   * Create a new record
   * @param {object} data - The data to create
   * @returns {Promise<object>} - The created record
   */
  async create(data) {
    const { data: record, error } = await supabase
      .from(this.tableName)
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return record;
  }

  /**
   * Update a record
   * @param {string} id - The UUID of the record to update
   * @param {object} data - The data to update
   * @returns {Promise<object>} - The updated record
   */
  async update(id, data) {
    const { data: record, error } = await supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return record;
  }

  /**
   * Delete a record
   * @param {string} id - The UUID of the record to delete
   * @returns {Promise<boolean>} - Success status
   */
  async delete(id) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }

  /**
   * Search records by a field
   * @param {string} field - The field to search
   * @param {string} query - The search query
   * @returns {Promise<Array>} - Array of matching records
   */
  async search(field, query) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .ilike(field, `%${query}%`);
    
    if (error) throw error;
    return data;
  }

  /**
   * Count records with optional filters
   * @param {object} filters - Optional filters object
   * @returns {Promise<number>} - Count of records
   */
  async count(filters = {}) {
    let query = supabase
      .from(this.tableName)
      .select('*', { count: 'exact', head: true });
    
    // Apply filters if provided
    if (filters && Object.keys(filters).length > 0) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null) {
          query = query.eq(key, filters[key]);
        }
      });
    }
    
    const { count, error } = await query;
    
    if (error) throw error;
    return count;
  }
}

export default BaseEntity;
