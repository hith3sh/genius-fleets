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
        setLoading(true);
        const { session } = await auth.getSession();
        
        if (session) {
          const currentUser = await User.me();
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error loading user:', err);
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Set up auth state change listener
    const { data: authListener } = auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const currentUser = await User.me();
        setUser(currentUser);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
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
      setLoading(true);
      setError(null);
      await User.signIn(email, password);
      const currentUser = await User.me();
      setUser(currentUser);
      return { success: true };
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
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
