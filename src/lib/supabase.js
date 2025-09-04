import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Configuration Check:');
console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ CRITICAL: Missing Supabase environment variables!');
  console.error('Please create a .env file with:');
  console.error('VITE_SUPABASE_URL=your_supabase_url');
  console.error('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helpers
export const auth = {
  // Sign up a new user
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined // Disable email redirect for OTP flow
      }
    });
    return { data, error };
  },

  // Sign in a user
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign out the current user
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get the current user
  getCurrentUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    return { user: data?.user, error };
  },

  // Get the current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    return { session: data?.session, error };
  },

  // Reset password
  resetPassword: async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  },

  // Update user
  updateUser: async (attributes) => {
    const { data, error } = await supabase.auth.updateUser(attributes);
    return { data, error };
  },

  // Set session
  setSession: async (access_token, refresh_token) => {
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    return { data, error };
  },

  // OAuth sign in
  signInWithOAuth: async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    return { data, error };
  },

  // Verify OTP for email confirmation
  verifyOtp: async (email, token, type = 'signup') => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type
    });
    return { data, error };
  },

  // Resend OTP
  resendOtp: async (email, type = 'signup') => {
    const { data, error } = await supabase.auth.resend({
      type,
      email
    });
    return { data, error };
  },

  // Auth state change listener
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};