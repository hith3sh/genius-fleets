import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export default function ErrorPage({ 
  title = "Something went wrong", 
  message = "We encountered an unexpected error. Please try again.",
  showHomeButton = true,
  showRefreshButton = true,
  errorCode = null 
}) {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  const handleRefresh = () => {
    window.location.reload();
  };

  const logoUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4492b025e_AlJisrCarRentals.png";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white shadow-lg border-0 rounded-2xl">
        <CardContent className="p-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src={logoUrl}
              alt="Al Jisr Car Rentals"
              className="w-20 h-20 rounded-full object-cover shadow"
            />
          </div>

          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          {/* Error Code */}
          {errorCode && (
            <div className="mb-4">
              <span className="inline-block bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">
                Error {errorCode}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h1>

          {/* Message */}
          <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {showRefreshButton && (
              <Button
                onClick={handleRefresh}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            )}
            
            {showHomeButton && (
              <Button
                onClick={handleGoHome}
                variant="outline"
                className="w-full h-12 border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}