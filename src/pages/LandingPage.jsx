import React, { useEffect } from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import FeaturedCars from '../components/landing/FeaturedCars';
import Promotions from '../components/landing/Promotions';
import Contact from '../components/landing/Contact';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  useEffect(() => {
    document.title = "Al Jisr Car Rentals - Premium Car Rentals in Dubai";
  }, []);

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