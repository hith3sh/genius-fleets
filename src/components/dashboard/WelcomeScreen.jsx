
import React from 'react';
import { Car } from 'lucide-react';

export default function WelcomeScreen({ user }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center bg-gradient-to-br from-violet-50 via-white to-blue-50">
      <img
        src="/4492b025e_AlJisrCarRentals.png"
        alt="Al Jisr Car Rentals Logo"
        className="h-24 object-contain mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome, {user?.full_name || 'User'}!
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Your personalized workspace is ready.
      </p>
      <p className="mt-2 text-md text-gray-500">
        Please select a module from the sidebar to begin.
      </p>
      <div className="mt-8">
        <Car className="w-16 h-16 text-violet-200" />
      </div>
    </div>
  );
}
