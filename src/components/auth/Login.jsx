import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Mail, Lock } from 'lucide-react';

// Global error state that persists across component remounts
let globalLoginError = '';
let globalErrorListeners = [];

const setGlobalLoginError = (error) => {
  globalLoginError = error;
  globalErrorListeners.forEach(listener => listener(error));
};

const addGlobalErrorListener = (listener) => {
  globalErrorListeners.push(listener);
  return () => {
    globalErrorListeners = globalErrorListeners.filter(l => l !== listener);
  };
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [displayError, setDisplayError] = useState(globalLoginError);
  
  // Listen to global error changes
  React.useEffect(() => {
    const unsubscribe = addGlobalErrorListener((error) => {
      setDisplayError(error);
    });
    
    // Set initial display error
    setDisplayError(globalLoginError);
    
    return () => {
      unsubscribe();
    };
  }, []);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const logoUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4492b025e_AlJisrCarRentals.png";

  // Check for success message from email verification
  React.useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalLoginError('');
    setFormError('');
    setLoading(true);

    // Client-side validation
    if (!email || !password) {
      setFormError('Please enter both email and password');
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address');
      setLoading(false);
      return;
    }


    try {
      const { success, error } = await signIn(email, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        // Handle specific error messages from Supabase
        const errorMessage = error?.toLowerCase() || '';
        let finalErrorMessage = '';
        
        if (errorMessage.includes('email not confirmed')) {
          finalErrorMessage = 'Please check your email and click the confirmation link before signing in.';
        } else if (errorMessage.includes('invalid login credentials') || errorMessage.includes('invalid email or password')) {
          finalErrorMessage = 'The email or password you entered is incorrect. Please check your credentials and try again. ';
        } else if (errorMessage.includes('email not found') || errorMessage.includes('user not found')) {
          finalErrorMessage = 'No account found with this email address. ';
        } else if (errorMessage.includes('too many requests')) {
          finalErrorMessage = 'Too many sign-in attempts. Please wait a few minutes before trying again. ';
        } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
          finalErrorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (errorMessage.includes('signup disabled')) {
          finalErrorMessage = 'New account registrations are currently disabled. Please contact support for assistance.';
        } else if (errorMessage.includes('account disabled') || errorMessage.includes('user disabled')) {
          finalErrorMessage = 'Your account has been disabled. Please contact support for assistance.';
        } else if (errorMessage.includes('password')) {
          finalErrorMessage = 'Password error. Please check your password and try again.';
        } else {
          // Generic error message for any other cases
          finalErrorMessage = error || 'Unable to sign in. Please check your credentials and try again.';
        }
        
        // Set the global error which will persist across component remounts
        setGlobalLoginError(finalErrorMessage);
      }
    } catch (err) {
      console.error('Login error:', err);
      setGlobalLoginError('An unexpected error occurred. Please try again. If the problem persists, please contact support.');
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setFormError('');
      const { data, error } = await auth.signInWithOAuth('google');
      
      if (error) {
        setFormError('Google sign-in failed: ' + error.message);
      }
    } catch (err) {
      setFormError('Google sign-in failed. Please try again.');
    }
    setLoading(false);
  };

  // Debug log for formError state
  console.log('🎨 Login: Rendering with formError:', formError);
  console.log('🎨 Login: formError type:', typeof formError);
  console.log('🎨 Login: formError truthy:', !!formError);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white shadow-lg border-0 rounded-2xl">
        <CardContent className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-28 h-28 flex items-center justify-center">
              <img
                src={logoUrl}
                alt="Al Jisr Car Rentals"
                className="w-28 h-28 rounded-full object-cover shadow"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Genius Fleets</h1>
            <p className="text-gray-600">Sign in to continue</p>
          </div>


          {/* Error Alert */}
          {(displayError || formError) && (
            <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-medium">{displayError || formError}</AlertDescription>
              {/* Helpful suggestions based on error type */}
              {(displayError || formError).includes('incorrect') && (
                <div className="mt-2 text-sm text-red-700">
                </div>
              )}
              {(displayError || formError).includes('No account found') && (
                <div className="mt-2 text-sm text-red-700">
                  <div className="font-medium">💡 Next steps:</div>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Double-check your email address</li>
                    <li>Create a new account using the "Sign up" link below</li>
                    <li>Contact support if you believe this is an error</li>
                  </ul>
                </div>
              )}
            </Alert>
          )}

          {/* Success Alert */}
          {successMessage && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          {/* Google Sign In Button - Commented out until OAuth is configured */}
          
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full mb-6 h-12 border-gray-300 hover:bg-gray-50"
            disabled={loading}
          >
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>
         

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (displayError) setGlobalLoginError(''); // Clear global error
                    if (formError) setFormError(''); // Clear form error
                  }}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (displayError) setGlobalLoginError(''); // Clear global error
                    if (formError) setFormError(''); // Clear form error
                  }}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="flex justify-between items-center mt-6 text-sm">
            <Link to="/forgot-password" className="text-gray-600 hover:text-gray-900">
              Forgot password?
            </Link>
            <div>
              <span className="text-gray-600">Need an account? </span>
              <Link to="/signup" className="text-black hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
