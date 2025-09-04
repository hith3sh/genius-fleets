import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import FeaturedCars from '../components/landing/FeaturedCars';
import Promotions from '../components/landing/Promotions';
import Contact from '../components/landing/Contact';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Al Jisr Car Rentals - Premium Car Rentals in Dubai";
  }, []);

  useEffect(() => {
    // Handle anchor scrolling when the component mounts or location changes
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <main>
        <Hero />
        <FeaturedCars />
        <Promotions />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}