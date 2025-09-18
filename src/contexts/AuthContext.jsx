import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const {
    user: auth0User,
    error: auth0Error,
    isLoading,
    loginWithRedirect,
    logout
  } = useAuth0();
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

  // Auth functions using Auth0 React SDK
  const signIn = async (email, password) => {
    try {
      await loginWithRedirect();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const signUp = async (userData) => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup'
        }
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const signOut = async () => {
    try {
      logout({ logoutParams: { returnTo: window.location.origin } });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const resetPassword = async (email) => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: 'forgot_password'
        }
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
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
