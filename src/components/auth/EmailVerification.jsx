import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { auth } from '../../lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Shield, AlertCircle } from 'lucide-react';

export default function EmailVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);
  
  // Get email from location state (passed from signup)
  const email = location.state?.email;

  useEffect(() => {
    // If no email provided, redirect to signup
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  const handleOtpChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus on the next empty field or the last field
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await auth.verifyOtp(email, otpCode, 'signup');
      
      if (error) {
        setError(error.message || 'Invalid verification code');
      } else {
        // Verification successful, redirect to login
        navigate('/login', {
          state: {
            message: 'Email verified successfully! You can now sign in.'
          }
        });
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    }
    
    setLoading(false);
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    setError('');
    
    try {
      const { error } = await auth.resendOtp(email, 'signup');
      
      if (error) {
        setError(error.message || 'Failed to resend code');
      } else {
        setResendSuccess(true);
        // Clear the OTP fields
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    }
    
    setResendLoading(false);
  };

  if (!email) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white shadow-lg border-0 rounded-2xl">
        <CardContent className="p-8">
          {/* Back Button */}
          <Link to="/signup" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to sign up
          </Link>

          {/* Shield Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Verify your email</h1>
            <p className="text-gray-600">
              We've sent a 6-digit code to
            </p>
            <p className="font-medium text-gray-900">{email}</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {resendSuccess && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
              <AlertDescription>Verification code sent successfully!</AlertDescription>
            </Alert>
          )}

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit}>
            {/* 6-digit OTP inputs */}
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-lg font-semibold border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={loading}
                />
              ))}
            </div>

            <p className="text-center text-sm text-gray-600 mb-6">
              Enter the verification code sent to your email
            </p>

            {/* Verify Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-lg mb-4"
              disabled={loading || otp.join('').length !== 6}
            >
              {loading ? 'Verifying...' : 'Verify email'}
            </Button>
          </form>

          {/* Resend Code */}
          <div className="text-center">
            <span className="text-sm text-gray-600">Didn't receive the code? </span>
            <button
              onClick={handleResendCode}
              disabled={resendLoading}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
            >
              {resendLoading ? 'Sending...' : 'Resend'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}