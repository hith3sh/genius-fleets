import BaseEntity from './baseEntity';
import { supabase } from '../../lib/supabase';

class CustomerDocument extends BaseEntity {
  constructor() {
    super('customer_document');
  }

  /**
   * Get documents for a specific customer
   * @param {string} customerId - The customer ID
   * @returns {Promise<Array>} - Array of customer documents
   */
  async getByCustomer(customerId) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents by customer:', error);
      return [];
    }
  }

  /**
   * Get documents by type
   * @param {string} documentType - The document type
   * @returns {Promise<Array>} - Array of documents
   */
  async getByType(documentType) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('document_type', documentType)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents by type:', error);
      return [];
    }
  }

  /**
   * Get documents with customer information
   * @param {string} orderBy - Order by field (default: '-created_at')
   * @returns {Promise<Array>} - Array of documents with customer data
   */
  async getWithCustomer(orderBy = '-created_at') {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          customer:customer_id(name, email, phone)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents with customer data:', error);
      return [];
    }
  }

  /**
   * Update document verification status
   * @param {string} id - Document ID
   * @param {boolean} isVerified - Verification status
   * @returns {Promise<object>} - Updated document
   */
  async updateVerification(id, isVerified) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update({ is_verified: isVerified })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating document verification:', error);
      throw error;
    }
  }

  /**
   * Search documents by name or customer
   * @param {string} query - Search query
   * @returns {Promise<Array>} - Array of matching documents
   */
  async searchDocuments(query) {
    if (!query || query.trim() === '') {
      return this.list('-created_at');
    }

    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          customer:customer_id(name, email, phone)
        `)
        .or(`file_name.ilike.%${query}%,document_type.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching documents:', error);
      return [];
    }
  }

  /**
   * Get expired documents
   * @returns {Promise<Array>} - Array of expired documents
   */
  async getExpiredDocuments() {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          customer:customer_id(name, email, phone)
        `)
        .lt('expiry_date', today)
        .not('expiry_date', 'is', null)
        .order('expiry_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching expired documents:', error);
      return [];
    }
  }

  /**
   * Get documents expiring soon (within next 30 days)
   * @param {number} days - Number of days ahead to check (default: 30)
   * @returns {Promise<Array>} - Array of documents expiring soon
   */
  async getExpiringSoon(days = 30) {
    try {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + days);
      
      const todayStr = today.toISOString().split('T')[0];
      const futureDateStr = futureDate.toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          customer:customer_id(name, email, phone)
        `)
        .gte('expiry_date', todayStr)
        .lte('expiry_date', futureDateStr)
        .order('expiry_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents expiring soon:', error);
      return [];
    }
  }

  /**
   * Get document statistics
   * @returns {Promise<object>} - Document statistics
   */
  async getStats() {
    try {
      const [total, verified, pending, expired] = await Promise.all([
        this.count(),
        this.count({ is_verified: true }),
        this.count({ is_verified: false }),
        this.getExpiredDocuments()
      ]);

      return {
        total,
        verified,
        pending,
        expired: expired.length
      };
    } catch (error) {
      console.error('Error fetching document statistics:', error);
      return {
        total: 0,
        verified: 0,
        pending: 0,
        expired: 0
      };
    }
  }

  /**
   * Delete document with file cleanup
   * @param {string} id - Document ID
   * @returns {Promise<void>}
   */
  async deleteWithFile(id) {
    try {
      // Get document first to get file URL
      const document = await this.get(id);
      if (!document) {
        throw new Error('Document not found');
      }

      // Delete from database first
      await this.delete(id);

      // Try to delete file from storage if it exists
      if (document.file_url && document.file_url.includes('supabase')) {
        try {
          // Extract file path from URL
          const urlParts = document.file_url.split('/');
          const fileName = urlParts[urlParts.length - 1];
          const bucket = 'VehicleImages'; // Updated bucket name

          const { error: storageError } = await supabase.storage
            .from(bucket)
            .remove([fileName]);

          if (storageError) {
            console.warn('Could not delete file from storage:', storageError.message);
          }
        } catch (storageError) {
          console.warn('File deletion from storage failed:', storageError);
        }
      }
    } catch (error) {
      console.error('Error deleting document with file:', error);
      throw error;
    }
  }
}

export default new CustomerDocument();
