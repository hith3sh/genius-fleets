import { supabase, auth } from '../../lib/supabase';
import BaseEntity from './baseEntity';

class User extends BaseEntity {
  constructor() {
    super('user_access'); // We'll use the user_access table to store user roles
  }

  /**
   * Get the current authenticated user
   * @returns {Promise<object>} - The user data
   */
  async me() {
    const { user, error } = await auth.getCurrentUser();
    
    if (error) throw error;
    
    // If user exists, get their access info from user_access table
    if (user) {
      try {
        const { data, error: accessError } = await supabase
          .from('user_access')
          .select('*')
          .eq('user_email', user.email)
          .single();
        
        if (accessError && accessError.code !== 'PGRST116') {
          // PGRST116 is "no rows returned" which is fine - user might not have explicit access yet
          console.warn('Error fetching user access:', accessError);
        }

        // Return user with access modules if available
        return {
          id: user.id,
          email: user.email,
          role: data?.role || 'User',
          accessible_modules: data?.accessible_modules || [],
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at
        };
      } catch (err) {
        console.error('Error in me() method:', err);
        // Return basic user info if access info can't be retrieved
        return {
          id: user.id,
          email: user.email,
          role: 'User',
          accessible_modules: []
        };
      }
    }
    
    return null;
  }

  /**
   * Sign up a new user
   * @param {object} userData - User data including email and password
   * @returns {Promise<object>} - The created user
   */
  async signUp(userData) {
    const { data, error } = await auth.signUp(userData.email, userData.password);
    
    if (error) throw error;
    
    // If user access data is provided, create a record in user_access
    if (userData.role || userData.accessible_modules) {
      try {
        await supabase
          .from('user_access')
          .insert([{
            user_email: userData.email,
            role: userData.role || 'User',
            accessible_modules: userData.accessible_modules || []
          }]);
      } catch (err) {
        console.error('Error creating user access record:', err);
      }
    }
    
    return data;
  }

  /**
   * Sign in a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} - The session data
   */
  async signIn(email, password) {
    const { data, error } = await auth.signIn(email, password);
    
    if (error) throw error;
    return data;
  }

  /**
   * Sign out the current user
   * @returns {Promise<void>}
   */
  async signOut() {
    const { error } = await auth.signOut();
    
    if (error) throw error;
  }

  /**
   * Update user access
   * @param {string} email - User email
   * @param {object} accessData - Access data to update
   * @returns {Promise<object>} - The updated access data
   */
  async updateAccess(email, accessData) {
    // Check if user access record exists
    const { data: existingAccess } = await supabase
      .from('user_access')
      .select('*')
      .eq('user_email', email)
      .single();
    
    if (existingAccess) {
      // Update existing record
      const { data, error } = await supabase
        .from('user_access')
        .update(accessData)
        .eq('user_email', email)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } else {
      // Create new record
      const { data, error } = await supabase
        .from('user_access')
        .insert([{ user_email: email, ...accessData }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }

  /**
   * Check if user has access to a specific module
   * @param {string} module - The module to check
   * @returns {Promise<boolean>} - Whether the user has access
   */
  async hasAccess(module) {
    const user = await this.me();
    
    if (!user) return false;
    
    // Admin role has access to everything
    if (user.role === 'Admin') return true;
    
    // Check if the module is in the user's accessible_modules
    return user.accessible_modules.includes(module);
  }
}

export default new User();
