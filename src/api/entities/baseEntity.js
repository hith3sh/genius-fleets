import { supabase } from '../../lib/railway-db';

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
   * List records - fetch all data for client-side sorting/filtering
   * @param {object} filters - Optional filters object (applied client-side)
   * @param {number} limit - Optional limit (applied client-side)
   * @param {number} offset - Optional offset for pagination (applied client-side)
   * @returns {Promise<Array>} - Array of records
   */
  async list(filters = {}, limit = null, offset = 0) {
    console.log(`🔍 BaseEntity.list() called for table: ${this.tableName}`);

    // Simple query - just get all data, no ordering at database level
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*');

    console.log(`📊 Query result for ${this.tableName}:`, {
      success: !error,
      count: data ? data.length : 0,
      error: error?.message
    });

    if (error) {
      console.error(`❌ Database error for table ${this.tableName}:`, error);
      throw error;
    }

    let result = data || [];

    // Apply client-side filtering
    if (filters && typeof filters === 'object' && !Array.isArray(filters) && Object.keys(filters).length > 0) {
      result = result.filter(record => {
        return Object.keys(filters).every(key => {
          if (filters[key] === undefined || filters[key] === null) return true;
          return record[key] === filters[key];
        });
      });
    }

    // Apply client-side pagination
    if (limit) {
      result = result.slice(offset, offset + limit);
    } else if (offset > 0) {
      result = result.slice(offset);
    }

    return result;
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
