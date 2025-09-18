import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const logoUrl = "/4492b025e_AlJisrCarRentals.png";

export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <img src={logoUrl} alt="Al Jisr Car Rentals" className="h-20 mx-auto mb-4" />
        <p>&copy; {new Date().getFullYear()} Al Jisr Car Rentals. All Rights Reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-white"><Facebook /></a>
          <a href="#" className="hover:text-white"><Twitter /></a>
          <a href="#" className="hover:text-white"><Instagram /></a>
        </div>
      </div>
    </footer>
  );
}