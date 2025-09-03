import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const heroImageUrl = "https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center">
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <img src={heroImageUrl} alt="Dubai skyline at sunset" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-20 p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          Premium Car Rentals <br /> <span className="text-yellow-400">in Dubai</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
          Experience luxury and comfort with our premium fleet of vehicles. From economy to luxury cars, we have the perfect ride for every occasion.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to={createPageUrl('MobileBooking')}>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full text-lg px-8 py-6">
              Rent Now
            </Button>
          </Link>
          <a href="#services">
            <Button size="lg" variant="outline" className="bg-white/90 hover:bg-white text-gray-900 border-gray-200 hover:border-white rounded-full text-lg px-8 py-6">
              Learn More
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}