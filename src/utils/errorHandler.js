// Error handling utilities
export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'UNKNOWN_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'AppError';
  }
}

export const handleSupabaseError = (error) => {
  console.error('Supabase error:', error);
  
  if (error?.code === 'PGRST301') {
    return new AppError('Resource not found', 404, 'NOT_FOUND');
  }
  
  if (error?.code === '23505') {
    return new AppError('This record already exists', 409, 'DUPLICATE_ENTRY');
  }
  
  if (error?.code === '23503') {
    return new AppError('Cannot delete this record because it is referenced by other data', 409, 'FOREIGN_KEY_CONSTRAINT');
  }
  
  if (error?.message?.includes('JWT')) {
    return new AppError('Your session has expired. Please log in again.', 401, 'SESSION_EXPIRED');
  }
  
  if (error?.message?.includes('network')) {
    return new AppError('Network error. Please check your internet connection.', 503, 'NETWORK_ERROR');
  }
  
  return new AppError(error?.message || 'An unexpected error occurred', 500, 'SUPABASE_ERROR');
};

export const handleNetworkError = (error) => {
  console.error('Network error:', error);
  
  if (!navigator.onLine) {
    return new AppError('No internet connection. Please check your network and try again.', 503, 'NO_CONNECTION');
  }
  
  if (error?.code === 'ECONNREFUSED') {
    return new AppError('Unable to connect to the server. Please try again later.', 503, 'CONNECTION_REFUSED');
  }
  
  return new AppError('Network error occurred. Please try again.', 503, 'NETWORK_ERROR');
};

export const getErrorMessage = (error) => {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

export const isRetryableError = (error) => {
  if (error instanceof AppError) {
    return ['NETWORK_ERROR', 'NO_CONNECTION', 'CONNECTION_REFUSED'].includes(error.code);
  }
  return false;
};