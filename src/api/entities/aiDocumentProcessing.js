import BaseEntity from './baseEntity';
import { supabase } from '../../lib/supabase';

class AIDocumentProcessing extends BaseEntity {
  constructor() {
    super('ai_document_processing');
  }

  /**
   * Get documents by processing status
   * @param {string} status - Processing status (Uploaded, Processing, Completed, Error, Under Review)
   * @returns {Promise<Array>} - Array of documents with status
   */
  async getByStatus(status) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('processing_status', status)
        .order('upload_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents by status:', error);
      return [];
    }
  }

  /**
   * Get documents by document type
   * @param {string} documentType - The document type
   * @returns {Promise<Array>} - Array of documents
   */
  async getByDocumentType(documentType) {
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
   * Get documents pending review
   * @returns {Promise<Array>} - Array of documents needing review
   */
  async getPendingReview() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('processing_status', 'Completed')
        .eq('is_reviewed', false)
        .order('processed_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents pending review:', error);
      return [];
    }
  }

  /**
   * Get documents processed by a specific user
   * @param {string} userEmail - User email
   * @returns {Promise<Array>} - Array of documents processed by user
   */
  async getByProcessor(userEmail) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('processed_by', userEmail)
        .order('processed_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching documents by processor:', error);
      return [];
    }
  }

  /**
   * Search documents by name, notes, or extracted data
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
        .select('*')
        .or(`document_name.ilike.%${query}%,processing_notes.ilike.%${query}%,error_message.ilike.%${query}%`)
        .order('upload_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching documents:', error);
      return [];
    }
  }

  /**
   * Get processing statistics
   * @returns {Promise<object>} - Processing statistics
   */
  async getStats() {
    try {
      const [total, uploaded, processing, completed, error, reviewed] = await Promise.all([
        this.count(),
        this.count({ processing_status: 'Uploaded' }),
        this.count({ processing_status: 'Processing' }),
        this.count({ processing_status: 'Completed' }),
        this.count({ processing_status: 'Error' }),
        this.count({ is_reviewed: true })
      ]);

      // Get stats by document type
      const documentTypes = ['Invoice', 'Contract', 'ID Document', 'License', 'Receipt', 'Insurance Document', 'Bank Statement'];
      const typeStats = {};
      
      for (const type of documentTypes) {
        typeStats[type] = await this.count({ document_type: type });
      }

      return {
        total,
        uploaded,
        processing,
        completed,
        error,
        reviewed,
        byType: typeStats,
        reviewPending: completed - reviewed
      };
    } catch (error) {
      console.error('Error fetching processing statistics:', error);
      return {
        total: 0,
        uploaded: 0,
        processing: 0,
        completed: 0,
        error: 0,
        reviewed: 0,
        byType: {},
        reviewPending: 0
      };
    }
  }

  /**
   * Update processing status
   * @param {string} id - Document ID
   * @param {string} status - New status
   * @param {object} additionalData - Additional data to update
   * @returns {Promise<object>} - Updated document
   */
  async updateStatus(id, status, additionalData = {}) {
    try {
      const updateData = {
        processing_status: status,
        ...additionalData
      };

      // Add timestamp based on status
      if (status === 'Processing') {
        updateData.processing_started_at = new Date().toISOString();
      } else if (status === 'Completed') {
        updateData.processed_date = new Date().toISOString();
      } else if (status === 'Error') {
        updateData.error_date = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from(this.tableName)
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating processing status:', error);
      throw error;
    }
  }

  /**
   * Mark document as reviewed
   * @param {string} id - Document ID
   * @param {object} reviewedData - Reviewed/corrected data
   * @param {string} reviewerEmail - Reviewer email
   * @returns {Promise<object>} - Updated document
   */
  async markAsReviewed(id, reviewedData, reviewerEmail) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update({
          is_reviewed: true,
          reviewed_data: reviewedData,
          reviewed_by: reviewerEmail,
          reviewed_date: new Date().toISOString(),
          processing_status: 'Completed'
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error marking document as reviewed:', error);
      throw error;
    }
  }

  /**
   * Get documents with high confidence scores (>90%)
   * @returns {Promise<Array>} - Array of high-confidence documents
   */
  async getHighConfidence() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('processing_status', 'Completed')
        .not('confidence_scores', 'is', null)
        .order('processed_date', { ascending: false });

      if (error) throw error;
      
      // Filter by confidence scores on the client side
      const highConfidenceDocuments = (data || []).filter(doc => {
        if (!doc.confidence_scores) return false;
        const scores = Object.values(doc.confidence_scores);
        const avgConfidence = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return avgConfidence > 0.9;
      });

      return highConfidenceDocuments;
    } catch (error) {
      console.error('Error fetching high confidence documents:', error);
      return [];
    }
  }

  /**
   * Get documents requiring attention (low confidence or errors)
   * @returns {Promise<Array>} - Array of documents needing attention
   */
  async getRequiringAttention() {
    try {
      const [errorDocs, lowConfidenceDocs] = await Promise.all([
        this.getByStatus('Error'),
        this.getLowConfidence()
      ]);

      return [...errorDocs, ...lowConfidenceDocs];
    } catch (error) {
      console.error('Error fetching documents requiring attention:', error);
      return [];
    }
  }

  /**
   * Get documents with low confidence scores (<70%)
   * @returns {Promise<Array>} - Array of low-confidence documents
   */
  async getLowConfidence() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('processing_status', 'Completed')
        .not('confidence_scores', 'is', null)
        .order('processed_date', { ascending: false });

      if (error) throw error;
      
      // Filter by confidence scores on the client side
      const lowConfidenceDocuments = (data || []).filter(doc => {
        if (!doc.confidence_scores) return false;
        const scores = Object.values(doc.confidence_scores);
        const avgConfidence = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return avgConfidence < 0.7;
      });

      return lowConfidenceDocuments;
    } catch (error) {
      console.error('Error fetching low confidence documents:', error);
      return [];
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

  /**
   * Batch update multiple documents
   * @param {Array} updates - Array of {id, data} objects
   * @returns {Promise<Array>} - Array of updated documents
   */
  async batchUpdate(updates) {
    try {
      const results = [];
      
      for (const update of updates) {
        const result = await this.update(update.id, update.data);
        results.push(result);
      }
      
      return results;
    } catch (error) {
      console.error('Error in batch update:', error);
      throw error;
    }
  }
}

export default new AIDocumentProcessing();
