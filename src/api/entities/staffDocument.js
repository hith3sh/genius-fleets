import BaseEntity from './baseEntity';
import { supabase } from '@/lib/railway-db';

class StaffDocument extends BaseEntity {
  constructor() {
    super('staff_document');
  }

  /**
   * Get documents for a specific employee
   * @param {string} employeeId - The employee ID
   * @returns {Promise<Array>} - Array of staff documents
   */
  async getByEmployee(employeeId) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents by employee:', error);
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
   * Get documents with employee information
   * @param {string} orderBy - Order by field (default: '-created_at')
   * @returns {Promise<Array>} - Array of documents with employee data
   */
  async getWithEmployee(orderBy = '-created_at') {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          employee:employee_id(name, email, employee_id, department, position)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents with employee data:', error);
      return [];
    }
  }

  /**
   * Get confidential documents (restricted access)
   * @returns {Promise<Array>} - Array of confidential documents
   */
  async getConfidential() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          employee:employee_id(name, email, employee_id, department, position)
        `)
        .eq('is_confidential', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching confidential documents:', error);
      return [];
    }
  }

  /**
   * Search documents by name or employee
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
          employee:employee_id(name, email, employee_id, department, position)
        `)
        .or(`document_name.ilike.%${query}%,document_type.ilike.%${query}%,description.ilike.%${query}%`)
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
          employee:employee_id(name, email, employee_id, department, position)
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
          employee:employee_id(name, email, employee_id, department, position)
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
   * Get document statistics
   * @returns {Promise<object>} - Document statistics
   */
  async getStats() {
    try {
      const [total, confidential, verified, pending, expired] = await Promise.all([
        this.count(),
        this.count({ is_confidential: true }),
        this.count({ is_verified: true }),
        this.count({ is_verified: false }),
        this.getExpiredDocuments()
      ]);

      return {
        total,
        confidential,
        verified,
        pending,
        expired: expired.length
      };
    } catch (error) {
      console.error('Error fetching document statistics:', error);
      return {
        total: 0,
        confidential: 0,
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

      // Try to delete file from Railway volume storage if it exists
      if (document.file_url) {
        try {
          // Extract file path from URL for Railway volume deletion
          // For Railway volumes, file_url should be like "/api/files/documents/staff-docs/filename.pdf"
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
   * Get documents by department
   * @param {string} department - Department name
   * @returns {Promise<Array>} - Array of documents for employees in department
   */
  async getByDepartment(department) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          employee:employee_id!inner(name, email, employee_id, department, position)
        `)
        .eq('employee.department', department)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents by department:', error);
      return [];
    }
  }
}

export default new StaffDocument();
