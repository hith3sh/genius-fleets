// Railway PostgreSQL integrations via server-side API proxy
// Database operations are handled through Express server endpoints

export const Core = {
  InvokeLLM: async (...args) => {
    console.warn('InvokeLLM integration needs to be implemented with OpenAI API or similar');
    throw new Error('Integration not yet migrated to Supabase');
  },
  
  SendEmail: async (...args) => {
    console.warn('SendEmail integration needs to be implemented with email service (e.g., Resend, SendGrid)');
    throw new Error('Integration not yet migrated to Supabase');
  },
  
  UploadFile: async ({ file, bucket = 'images', folder = 'uploads' }) => {
    try {
      // Use the server's upload endpoint
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/api/storage/${bucket}/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      return {
        file_url: result.data.public_url,
        file_name: result.data.name,
        file_size: result.data.size,
        file_type: result.data.mimetype,
        bucket: result.data.bucket,
        full_url: result.data.full_url
      };
    } catch (error) {
      console.error('Railway volume upload error:', error);
      throw new Error(`File upload failed: ${error.message}`);
    }
  },
  
  GenerateImage: async (...args) => {
    console.warn('GenerateImage integration needs to be implemented with image generation API');
    throw new Error('Integration not yet migrated to Supabase');
  },
  
  ExtractDataFromUploadedFile: async (...args) => {
    console.warn('ExtractDataFromUploadedFile integration needs to be implemented with document processing API');
    throw new Error('Integration not yet migrated to Supabase');
  }
};

// File upload now uses Supabase Storage exclusively
// No more base64 fallback - proper storage policies ensure reliable uploads

export const InvokeLLM = Core.InvokeLLM;
export const SendEmail = Core.SendEmail;
export const UploadFile = Core.UploadFile;
export const GenerateImage = Core.GenerateImage;
export const ExtractDataFromUploadedFile = Core.ExtractDataFromUploadedFile;