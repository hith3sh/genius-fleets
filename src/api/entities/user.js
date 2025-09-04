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
    console.log('🔍 User.me(): Getting current user...');
    const { user, error } = await auth.getCurrentUser();
    
    if (error) {
      console.error('❌ User.me(): Error getting current user:', error);
      throw error;
    }
    
    console.log('👤 User.me(): Current user from auth:', user ? 'Found' : 'None');
    
    // If user exists but email not confirmed, return null to keep them unauth
    if (user && !user.email_confirmed_at) {
      console.log('User exists in Supabase auth but email not confirmed - keeping unauthenticated for verification flow');
      return null;
    }
    
    // If user exists and email confirmed, get their access info from user_access table
    if (user) {
      try {
        const { data, error: accessError } = await supabase
          .from('user_access')
          .select('user_email, accessible_modules, role')
          .eq('user_email', user.email)
          .maybeSingle();
        
        if (accessError) {
          console.warn('Error fetching user access:', accessError);
          // Still need to check email confirmation even if access error
          if (!user.email_confirmed_at) {
            console.log('User exists in auth but email not confirmed (access error case)');
            return null;
          }
          // Return basic user info if access info can't be retrieved but email confirmed
          return {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
            role: 'Staff', // Default role when no access record found
            accessible_modules: [],
            created_at: user.created_at,
            last_sign_in_at: user.last_sign_in_at
          };
        }

        // Return user with access modules if available
        return {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
          role: data?.role || 'Staff', // Use role from database or default to Staff
          accessible_modules: data?.accessible_modules || [],
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at,
          email_confirmed: !!user.email_confirmed_at
        };
      } catch (err) {
        console.error('Error in me() method:', err);
        // Still need to check email confirmation even in catch case
        if (!user.email_confirmed_at) {
          console.log('User exists in auth but email not confirmed (catch case)');
          return null;
        }
        // Return basic user info if access info can't be retrieved but email confirmed
        return {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
          role: 'Staff', // Default role when no access record found
          accessible_modules: [],
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at
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
    if (userData.accessible_modules) {
      try {
        await supabase
          .from('user_access')
          .insert([{
            user_email: userData.email,
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
    
    if (error) {
      // Create a more descriptive error message based on Supabase error
      const supabaseError = error.message || error.toString();
      
      // Map common Supabase auth errors to user-friendly messages
      if (supabaseError.includes('Invalid login credentials')) {
        throw new Error('Invalid login credentials');
      } else if (supabaseError.includes('Email not confirmed')) {
        throw new Error('Email not confirmed');
      } else if (supabaseError.includes('Too many requests')) {
        throw new Error('Too many requests');
      } else if (supabaseError.includes('User not found')) {
        throw new Error('User not found');
      } else {
        // Pass through the original error message
        throw error;
      }
    }
    
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
   * Update user access and role
   * @param {string} email - User email
   * @param {object} accessData - Access data to update (includes role and accessible_modules)
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
      // Create new record with default role if not provided
      const recordData = {
        user_email: email,
        role: accessData.role || 'Staff',
        accessible_modules: accessData.accessible_modules || [],
        ...accessData
      };
      
      const { data, error } = await supabase
        .from('user_access')
        .insert([recordData])
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
    
    // Management role has access to everything
    if (user.role === 'Management') return true;
    
    // Check if the module is in the user's accessible_modules
    return user.accessible_modules.includes(module);
  }

  /**
   * Get all users for user management (excluding Management role users)
   * @returns {Promise<Array>} - Array of users
   */
  async getAllUsers() {
    const { data, error } = await supabase
      .from('user_access')
      .select('user_email, role, accessible_modules, created_at, updated_at')
      .neq('role', 'Management')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
}

export default new User();
