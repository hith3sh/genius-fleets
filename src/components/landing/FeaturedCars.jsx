import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import { Vehicle } from '@/api/entities';
import { Skeleton } from '@/components/ui/skeleton';

// Define categories based on the Vehicle entity's vehicle_class enum
const categories = ['All', 'SUV', 'Mid-Size Sedan', 'Hatch Back', 'Sports cars', 'Luxury', 'Economy'];

// Helper to assign visual styles based on vehicle class for hover effects
const categoryStyles = {
    'SUV': { hoverGradient: 'bg-gradient-to-br from-blue-400 to-purple-500', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(147,112,219,0.4)]' },
    'Mid-Size Sedan': { hoverGradient: 'bg-gradient-to-br from-gray-400 to-gray-600', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(156,163,175,0.4)]' },
    'Sports cars': { hoverGradient: 'bg-gradient-to-br from-yellow-400 to-amber-500', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(252,211,77,0.4)]' },
    'Luxury': { hoverGradient: 'bg-gradient-to-br from-zinc-700 to-gray-800', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(82,82,91,0.4)]' },
    'Hatch Back': { hoverGradient: 'bg-gradient-to-br from-sky-400 to-cyan-500', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(56,189,248,0.4)]' },
    'Economy': { hoverGradient: 'bg-gradient-to-br from-emerald-500 to-lime-600', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(34,197,94,0.4)]' },
    'default': { hoverGradient: 'bg-gradient-to-br from-stone-400 to-neutral-500', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(168,162,158,0.4)]' }
};

export default function FeaturedCars() {
  const [filter, setFilter] = useState('All');
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadVehicles() {
      setIsLoading(true);
      try {
        const allVehicles = await Vehicle.filter({ status: 'Available' });
        // Prioritize showing vehicles that have photos
        const vehiclesWithPhotos = allVehicles.filter(v => v.vehicle_photos && v.vehicle_photos.length > 0);
        setVehicles(vehiclesWithPhotos.slice(0, 8)); // Display up to 8 featured vehicles
      } catch (error) {
        console.error("Failed to load vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadVehicles();
  }, []);

  const filteredVehicles = filter === 'All' ? vehicles : vehicles.filter(car => car.vehicle_class === filter);

  return (
    <section id="featured-cars" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Our Featured Fleet</h2>
          <p className="text-gray-400 mt-2">Handpicked for performance, comfort, and style.</p>
        </div>
        <div className="flex justify-center flex-wrap mb-8 space-x-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 my-1 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat ? 'bg-red-600 text-white scale-105' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="rounded-xl bg-gray-800 p-4 space-y-4">
                <Skeleton className="h-48 w-full bg-gray-700" />
                <Skeleton className="h-5 w-3/4 bg-gray-700" />
                <Skeleton className="h-4 w-1/2 bg-gray-700" />
                <Skeleton className="h-10 w-full rounded-full bg-gray-700" />
              </div>
            ))
          ) : (
            filteredVehicles.map(vehicle => {
              const style = categoryStyles[vehicle.vehicle_class] || categoryStyles.default;
              const carData = { ...vehicle, ...style };
              return <CarCard key={vehicle.id} car={carData} />;
            })
          )}
        </div>
      </div>
    </section>
  );
}