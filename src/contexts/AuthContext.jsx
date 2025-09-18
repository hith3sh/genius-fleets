import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { supabase } from '@/lib/railway-db';

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

  // Transform Auth0 user to our format and set RLS context
  useEffect(() => {
    const setupUser = async () => {
      if (auth0User) {
        // Set user context for RLS
        try {
          await supabase.rpc('set_current_user_email', {
            email: auth0User.email
          });
        } catch (error) {
          console.warn('Could not set user context for RLS:', error);
        }

        // Ensure user_access record exists (for new Auth0 users)
        try {
          // DEBUG: Check what supabase client looks like
          console.log('🔍 DEBUG: Supabase client:', supabase);
          console.log('🔍 DEBUG: Supabase methods:', Object.keys(supabase));
          console.log('🔍 DEBUG: From method exists?', typeof supabase.from);
          console.log('🔍 DEBUG: Environment check:', {
            NODE_ENV: process.env.NODE_ENV,
            // Don't log actual URLs for security
            hasRailwayURL: !!process.env.VITE_RAILWAY_DATABASE_URL,
            hasSupabaseURL: !!process.env.VITE_SUPABASE_URL
          });

          // Fixed method chaining - eq() must come before select()
          const { data: existingUser } = await supabase
            .from('user_access')
            .eq('user_email', auth0User.email)
            .select('id')
            .single();

          if (!existingUser) {
            // Create new user_access record with default permissions
            await supabase.from('user_access').insert({
              user_email: auth0User.email,
              role: 'Staff',
              accessible_modules: ['Fleet Health', 'Bookings']
            });
            console.log('Created user_access record for new user:', auth0User.email);
          }
        } catch (error) {
          console.warn('Could not ensure user_access record:', error);
        }

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
    };

    setupUser();
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
