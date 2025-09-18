import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const { user: auth0User, error: auth0Error, isLoading } = useUser();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Transform Auth0 user to our format
  useEffect(() => {
    if (auth0User) {
      const transformedUser = {
        id: auth0User.sub,
        email: auth0User.email,
        name: auth0User.name,
        picture: auth0User.picture,
        role: auth0User['https://genius-fleets.com/roles']?.[0] || 'Staff',
        accessible_modules: auth0User['https://genius-fleets.com/modules'] || ['Fleet Health', 'Bookings'],
        email_verified: auth0User.email_verified,
        created_at: auth0User.created_at,
        updated_at: auth0User.updated_at,
      };
      setUser(transformedUser);
    } else {
      setUser(null);
    }
    setLoading(isLoading);
    setError(auth0Error?.message || null);
  }, [auth0User, auth0Error, isLoading]);

  // Auth functions now redirect to Auth0
  const signIn = async (email, password) => {
    window.location.href = '/api/auth/login';
    return { success: true };
  };

  const signUp = async (userData) => {
    window.location.href = '/api/auth/login?screen_hint=signup';
    return { success: true };
  };

  const signOut = async () => {
    window.location.href = '/api/auth/logout';
    return { success: true };
  };

  const resetPassword = async (email) => {
    window.location.href = '/api/auth/login?screen_hint=forgot_password';
    return { success: true };
  };

  const hasAccess = async (module) => {
    if (!user) return false;
    return user.accessible_modules?.includes(module) || false;
  };

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
