import BaseEntity from './baseEntity';
import { supabase } from '../../lib/railway-db';

class VehicleDocument extends BaseEntity {
  constructor() {
    super('vehicle_document');
  }

  /**
   * Get documents for a specific vehicle
   * @param {string} vehicleId - The vehicle ID
   * @returns {Promise<Array>} - Array of vehicle documents
   */
  async getByVehicle(vehicleId) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('upload_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents by vehicle:', error);
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
        .order('upload_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents by type:', error);
      return [];
    }
  }

  /**
   * Get documents that are expiring soon
   * @param {number} daysAhead - Number of days to look ahead (default 30)
   * @returns {Promise<Array>} - Array of expiring documents
   */
  async getExpiring(daysAhead = 30) {
    try {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + daysAhead);
      const futureDateString = futureDate.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          vehicle:vehicle_id(make, model, license_plate)
        `)
        .not('expiry_date', 'is', null)
        .lte('expiry_date', futureDateString)
        .order('expiry_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching expiring documents:', error);
      return [];
    }
  }

  /**
   * Get document statistics
   * @returns {Promise<object>} - Document statistics
   */
  async getStatistics() {
    try {
      const [totalCount, verifiedCount, expiringCount] = await Promise.all([
        this.count(),
        this.count({ is_verified: true }),
        this.getExpiring(30)
      ]);

      return {
        total: totalCount,
        verified: verifiedCount,
        pending: totalCount - verifiedCount,
        expiring: expiringCount.length
      };
    } catch (error) {
      console.error('Error getting document statistics:', error);
      return {
        total: 0,
        verified: 0,
        pending: 0,
        expiring: 0
      };
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
   * Search documents by name or notes
   * @param {string} query - Search query
   * @returns {Promise<Array>} - Array of matching documents
   */
  async searchDocuments(query) {
    if (!query || query.trim() === '') {
      return this.list('-upload_date');
    }

    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          vehicle:vehicle_id(make, model, license_plate)
        `)
        .or(`document_name.ilike.%${query}%,notes.ilike.%${query}%`)
        .order('upload_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching documents:', error);
      return [];
    }
  }

  /**
   * Get documents with vehicle information
   * @param {string} orderBy - Order by field (default: '-upload_date')
   * @returns {Promise<Array>} - Array of documents with vehicle data
   */
  async listWithVehicles(orderBy = '-upload_date') {
    try {
      let query = supabase
        .from(this.tableName)
        .select(`
          *,
          vehicle:vehicle_id(make, model, license_plate, year, color)
        `);

      if (orderBy) {
        const isDescending = orderBy.startsWith('-');
        const field = isDescending ? orderBy.substring(1) : orderBy;
        query = query.order(field, { ascending: !isDescending });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents with vehicles:', error);
      return [];
    }
  }

  /**
   * Delete document and its file from storage
   * @param {string} id - Document ID
   * @returns {Promise<boolean>} - Success status
   */
  async deleteWithFile(id) {
    try {
      // Get document to extract file info
      const document = await this.get(id);

      if (document && document.file_url) {
        // Extract file path from URL for deletion
        try {
          // For Railway volumes, file_url should be like "/api/files/documents/vehicle-docs/filename.pdf"
          const urlPath = document.file_url.replace('/api/files/', '');
          const storageBasePath = process.env.STORAGE_PATH || '/app/storage';
          const fs = await import('fs');
          const path = await import('path');
          const filePath = path.join(storageBasePath, urlPath);

          // Delete from local storage
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (storageError) {
          console.warn('Could not delete file from storage:', storageError);
          // Continue with database deletion even if storage deletion fails
        }
      }

      // Delete from database
      await this.delete(id);
      return true;
    } catch (error) {
      console.error('Error deleting document with file:', error);
      throw error;
    }
  }
}

export default new VehicleDocument();