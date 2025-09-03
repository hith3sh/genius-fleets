import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Users, Droplet, Star, Car as CarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CarCard({ car }) {
  const imageSrc = car.vehicle_photos && car.vehicle_photos.length > 0 ? car.vehicle_photos[0] : null;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-white text-black shadow-lg transition-all duration-300 hover:-translate-y-2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      style={{ '--shadow-color': car.hoverShadow }}
    >
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${car.hoverGradient}`} />
      
      <div className="absolute top-0 left-[-100%] h-full w-1/2 -skew-x-45 transform bg-white/20 opacity-0 transition-all duration-700 group-hover:left-[150%] group-hover:opacity-50"></div>
      
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: car.hoverShadow }}
      />
      
      <div className="relative z-10 transition-colors duration-500 group-hover:text-white">
        <div className="h-48 w-full overflow-hidden bg-gray-200">
          {imageSrc ? (
            <img src={imageSrc} alt={`${car.make} ${car.model}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-100">
              <CarIcon className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-baseline justify-between">
            <h3 className="text-lg font-bold">{car.make} {car.model}</h3>
            <p className="text-sm text-gray-500 group-hover:text-gray-300">{car.year}</p>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-gray-600 group-hover:text-gray-200">
            <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {car.seating_capacity || 'N/A'} Seats</span>
            <span className="flex items-center gap-1"><Droplet className="h-4 w-4" /> {car.fuel_type || 'N/A'}</span>
            <span>{car.transmission_type || 'N/A'}</span>
          </div>

          <Link to={createPageUrl('MobileBooking')}>
            <Button className={`mt-4 w-full rounded-full bg-gray-800 text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-black`}>
              Rent Now for AED {car.daily_rate}/day
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}