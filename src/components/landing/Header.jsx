import React, { useEffect } from 'react';
import { User } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { createPageUrl } from '@/utils';

const logoUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4492b025e_AlJisrCarRentals.png";

export default function Header() {
  // Set browser title for landing page
  useEffect(() => {
    document.title = "Al Jisr Car Rentals - Premium Car Rentals in Dubai";
  }, []);

  const handleLogin = async () => {
    try {
      // Flag that a login process is starting.
      sessionStorage.setItem('login_in_progress', 'true');
      await User.login();
    } catch (error) {
      console.error("Login failed:", error);
      // Clear the flag on failure
      sessionStorage.removeItem('login_in_progress');
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Rent Cars', href: createPageUrl('RentCars') },
    { name: 'Cars for Sale', href: '#contact' },
    { name: 'Promotions', href: '#promotions' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-2">
            <img
              src={logoUrl}
              alt="Al Jisr Car Rentals"
              className="h-16 w-auto object-contain"
            />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
          </nav>
          <Button onClick={handleLogin} className="bg-red-600 hover:bg-red-700 text-white rounded-full">
            <LogIn className="w-4 h-4 mr-2" />
            Sign In / Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}