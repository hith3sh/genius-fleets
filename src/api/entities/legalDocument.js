import BaseEntity from './baseEntity';
import { supabase } from '../../lib/supabase';

class LegalDocument extends BaseEntity {
  constructor() {
    super('legal_document');
  }

  /**
   * Get documents by category
   * @param {string} category - The document category
   * @returns {Promise<Array>} - Array of documents in category
   */
  async getByCategory(category) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents by category:', error);
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
   * Get critical documents only
   * @returns {Promise<Array>} - Array of critical documents
   */
  async getCritical() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('is_critical', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching critical documents:', error);
      return [];
    }
  }

  /**
   * Search documents by name, type, or description
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
        .select('*')
        .or(`document_name.ilike.%${query}%,document_type.ilike.%${query}%,description.ilike.%${query}%,responsible_department.ilike.%${query}%`)
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
        .select('*')
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
   * Get documents expiring soon (within renewal reminder period)
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
        .select('*')
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
   * Get documents by responsible department
   * @param {string} department - Department name
   * @returns {Promise<Array>} - Array of documents for department
   */
  async getByDepartment(department) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('responsible_department', department)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents by department:', error);
      return [];
    }
  }

  /**
   * Get documents requiring renewal within specified days
   * @param {number} days - Number of days ahead to check (default: 30)
   * @returns {Promise<Array>} - Array of documents requiring renewal
   */
  async getRenewalReminders(days = 30) {
    try {
      const today = new Date();
      const checkDate = new Date();
      checkDate.setDate(today.getDate() + days);
      
      const todayStr = today.toISOString().split('T')[0];
      const checkDateStr = checkDate.toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .gte('expiry_date', todayStr)
        .lte('expiry_date', checkDateStr)
        .not('expiry_date', 'is', null)
        .order('expiry_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching renewal reminders:', error);
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
   * Get document statistics by category
   * @returns {Promise<object>} - Document statistics
   */
  async getStats() {
    try {
      const [total, critical, verified, expired, expiringSoon] = await Promise.all([
        this.count(),
        this.count({ is_critical: true }),
        this.count({ is_verified: true }),
        this.getExpiredDocuments(),
        this.getExpiringSoon(30)
      ]);

      // Get stats by category
      const categories = ['Legal', 'Registration', 'Insurance', 'Compliance', 'Financial', 'Operational', 'HR'];
      const categoryStats = {};
      
      for (const category of categories) {
        categoryStats[category] = await this.count({ category });
      }

      return {
        total,
        critical,
        verified,
        expired: expired.length,
        expiringSoon: expiringSoon.length,
        byCategory: categoryStats
      };
    } catch (error) {
      console.error('Error fetching document statistics:', error);
      return {
        total: 0,
        critical: 0,
        verified: 0,
        expired: 0,
        expiringSoon: 0,
        byCategory: {}
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

      // Try to delete file from Railway volume storage if it exists
      if (document.file_url) {
        try {
          // Extract file path from URL for Railway volume deletion
          // For Railway volumes, file_url should be like "/api/files/documents/legal-docs/filename.pdf"
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
    } catch (error) {
      console.error('Error deleting document with file:', error);
      throw error;
    }
  }

  /**
   * Get documents by priority (based on expiry and criticality)
   * @returns {Promise<object>} - Categorized documents by priority
   */
  async getByPriority() {
    try {
      const [expired, expiringSoon, critical] = await Promise.all([
        this.getExpiredDocuments(),
        this.getExpiringSoon(30),
        this.getCritical()
      ]);

      return {
        urgent: expired.filter(doc => doc.is_critical),
        high: [...expired.filter(doc => !doc.is_critical), ...expiringSoon.filter(doc => doc.is_critical)],
        medium: expiringSoon.filter(doc => !doc.is_critical),
        normal: critical.filter(doc => {
          const isExpired = expired.some(e => e.id === doc.id);
          const isExpiringSoon = expiringSoon.some(e => e.id === doc.id);
          return !isExpired && !isExpiringSoon;
        })
      };
    } catch (error) {
      console.error('Error fetching documents by priority:', error);
      return {
        urgent: [],
        high: [],
        medium: [],
        normal: []
      };
    }
  }
}

export default new LegalDocument();
