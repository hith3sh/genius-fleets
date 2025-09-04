import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/supabase';
import User from '../api/entities/user';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log('🔄 AuthContext: Starting user load...');
        setLoading(true);
        
        console.log('👤 AuthContext: Getting user details...');
        const currentUser = await User.me();
        console.log('✅ AuthContext: User loaded:', currentUser ? 'Success' : 'Failed');
        setUser(currentUser);
      } catch (err) {
        console.error('❌ AuthContext: Error loading user:', err);
        setError(err.message);
        setUser(null);
      } finally {
        console.log('🏁 AuthContext: User load complete, setting loading to false');
        setLoading(false);
      }
    };

    loadUser();

    // Set up auth state change listener
    const { data: authListener } = auth.onAuthStateChange(async (event, session) => {
      console.log(`🔄 AuthContext: Auth state changed: ${event}`);
      
      if (event === 'SIGNED_OUT') {
        console.log('🚪 AuthContext: User signed out, clearing user state');
        setUser(null);
      }
      // Note: SIGNED_IN events are handled by explicit signIn() calls
      // Initial session loading is handled by loadUser() on mount
    });

    // Clean up subscription
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Sign in function
  const signIn = async (email, password) => {
    try {
      console.log('🔐 AuthContext: Starting sign in process for:', email);
      setLoading(true);
      setError(null);
      
      await User.signIn(email, password);
      console.log('✅ AuthContext: Sign in successful, getting user data...');
      
      const currentUser = await User.me();
      console.log('👤 AuthContext: User data retrieved:', currentUser ? 'Success' : 'Failed');
      setUser(currentUser);
      
      return { success: true };
    } catch (err) {
      console.error('❌ AuthContext: Sign in error:', err);
      
      // Provide more specific error messages
      let errorMessage = err.message;
      
      if (err.message?.includes('Invalid login credentials')) {
        errorMessage = 'Invalid login credentials';
      } else if (err.message?.includes('Email not confirmed')) {
        errorMessage = 'Email not confirmed';
      } else if (err.message?.includes('Too many requests')) {
        errorMessage = 'Too many requests';
      } else if (err.message?.includes('User not found')) {
        errorMessage = 'User not found';
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      console.log('🏁 AuthContext: Sign in process complete');
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      await User.signUp(userData);
      return { success: true };
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await User.signOut();
      setUser(null);
      return { success: true };
    } catch (err) {
      console.error('Sign out error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await auth.resetPassword(email);
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Check if user has access to a module
  const hasAccess = async (module) => {
    if (!user) return false;
    return await User.hasAccess(module);
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    hasAccess
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
