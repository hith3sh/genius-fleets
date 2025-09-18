import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const { signIn } = useAuth();

  useEffect(() => {
    // Automatically trigger Auth0 login when component mounts
    const initiateLogin = async () => {
      await signIn();
    };

    initiateLogin();
  }, [signIn]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <img
              src="/images/genius-fleets.png"
              alt="Genius Fleets Logo"
              className="h-20 w-20 mx-auto mb-4 rounded-full"
            />
            <h2 className="text-2xl font-bold mb-2">Al Jisr Car Rentals</h2>
            <p className="text-gray-600 mb-6">Redirecting to secure login...</p>
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}