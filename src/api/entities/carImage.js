import BaseEntity from './baseEntity';
import { supabase } from '../../lib/supabase';

class CarImage extends BaseEntity {
  constructor() {
    super('car_image');
  }

  /**
   * Get images by set ID
   * @param {string} setId - The image set ID
   * @returns {Promise<Array>} - Array of images in the set
   */
  async getBySetId(setId) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('image_set_id', setId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error getting images by set ID ${setId}:`, error);
      throw error;
    }
  }

  /**
   * Get images by model tag
   * @param {string} modelTag - The model tag
   * @returns {Promise<Array>} - Array of images for the model
   */
  async getByModel(modelTag) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('model_tag', modelTag)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error getting images by model ${modelTag}:`, error);
      throw error;
    }
  }

  /**
   * Get images by color tag
   * @param {string} colorTag - The color tag
   * @returns {Promise<Array>} - Array of images for the color
   */
  async getByColor(colorTag) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('color_tag', colorTag)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error getting images by color ${colorTag}:`, error);
      throw error;
    }
  }

  /**
   * Search images by multiple criteria
   * @param {Object} criteria - Search criteria
   * @param {string} [criteria.model_tag] - Model tag filter
   * @param {string} [criteria.color_tag] - Color tag filter
   * @param {string} [criteria.image_set_id] - Set ID filter
   * @returns {Promise<Array>} - Array of matching images
   */
  async search(criteria = {}) {
    try {
      let query = supabase.from(this.tableName).select('*');

      if (criteria.model_tag) {
        query = query.eq('model_tag', criteria.model_tag);
      }
      if (criteria.color_tag) {
        query = query.eq('color_tag', criteria.color_tag);
      }
      if (criteria.image_set_id) {
        query = query.eq('image_set_id', criteria.image_set_id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error searching car images:', error);
      throw error;
    }
  }

  /**
   * Bulk create multiple image records
   * @param {Array} imageRecords - Array of image record objects
   * @returns {Promise<Array>} - Array of created records
   */
  async bulkCreate(imageRecords) {
    try {
      console.log('CarImage.bulkCreate called with:', imageRecords);
      console.log('this.tableName:', this.tableName);
      console.log('supabase object:', supabase);
      
      const { data, error } = await supabase
        .from(this.tableName)
        .insert(imageRecords)
        .select();

      if (error) {
        console.error('Supabase error in bulkCreate:', error);
        throw error;
      }
      
      console.log('bulkCreate successful, data:', data);
      return data;
    } catch (error) {
      console.error('Error bulk creating car images:', error);
      throw error;
    }
  }

  /**
   * Get unique image set IDs
   * @returns {Promise<Array>} - Array of unique set IDs
   */
  async getUniqueSetIds() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('image_set_id')
        .order('image_set_id');

      if (error) throw error;
      
      // Extract unique set IDs
      const uniqueSetIds = [...new Set(data.map(item => item.image_set_id))];
      return uniqueSetIds;
    } catch (error) {
      console.error('Error getting unique set IDs:', error);
      throw error;
    }
  }

  /**
   * Get image statistics
   * @returns {Promise<Object>} - Statistics object
   */
  async getStats() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*');

      if (error) throw error;

      const stats = {
        totalImages: data.length,
        uniqueSets: [...new Set(data.map(img => img.image_set_id))].length,
        uniqueModels: [...new Set(data.map(img => img.model_tag))].length,
        uniqueColors: [...new Set(data.map(img => img.color_tag))].length
      };

      return stats;
    } catch (error) {
      console.error('Error getting car image stats:', error);
      throw error;
    }
  }
}

export default new CarImage();
