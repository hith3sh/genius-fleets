import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "6891f57922e817b10a5d63fb", 
  requiresAuth: true // Ensure authentication is required for all operations
});
