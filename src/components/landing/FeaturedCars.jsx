import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import { Vehicle } from '@/api/entities';
import { Skeleton } from '@/components/ui/skeleton';

// Define categories based on the Vehicle entity's vehicle_class enum
// Using lowercase for consistent comparison
const categories = ['All', 'suv', 'mid-size sedan', 'hatch back', 'sports cars', 'luxury', 'economy'];

// Helper to assign visual styles based on vehicle class for hover effects
const categoryStyles = {
    'suv': { hoverGradient: 'bg-gradient-to-br from-blue-400 to-purple-500', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(147,112,219,0.4)]' },
    'mid-size sedan': { hoverGradient: 'bg-gradient-to-br from-gray-400 to-gray-600', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(156,163,175,0.4)]' },
    'sports cars': { hoverGradient: 'bg-gradient-to-br from-yellow-400 to-amber-500', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(252,211,77,0.4)]' },
    'luxury': { hoverGradient: 'bg-gradient-to-br from-zinc-700 to-gray-800', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(82,82,91,0.4)]' },
    'hatch back': { hoverGradient: 'bg-gradient-to-br from-sky-400 to-cyan-500', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(56,189,248,0.4)]' },
    'economy': { hoverGradient: 'bg-gradient-to-br from-emerald-500 to-lime-600', hoverShadow: 'shadow-[0_25px_50px_-12px_rgba(34,197,94,0.4)]' },
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
        console.log("=== Loading Vehicles for Landing Page ===");

        // Use Entity API which should handle the database connection properly
        const allVehicles = await Vehicle.list();
        console.log("Vehicle.list() result:", allVehicles);

        if (allVehicles && allVehicles.length > 0) {
          // Take first 8 vehicles for featured section
          setVehicles(allVehicles.slice(0, 8));
          console.log("Successfully loaded", allVehicles.length, "vehicles");
        } else {
          console.log("No vehicles returned from API");
          setVehicles([]);
        }
        
      } catch (error) {
        console.error("General error:", error);
        setVehicles([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadVehicles();
  }, []);

  // Add console logging to debug filter functionality
  useEffect(() => {
    console.log("Current filter:", filter);
    console.log("Available vehicles:", vehicles);
    console.log("Vehicle classes:", vehicles.map(v => v.vehicle_class));
  }, [filter, vehicles]);

  // Normalize case for more reliable filtering
  const normalizedFilter = filter.toLowerCase();
  
  const filteredVehicles = filter === 'All' 
    ? vehicles 
    : vehicles.filter(car => {
        // Handle both null/undefined and case sensitivity
        if (!car.vehicle_class) return false;
        return car.vehicle_class.toLowerCase() === normalizedFilter;
      });

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
          ) : filteredVehicles.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No vehicles available at the moment.</p>
            </div>
          ) : (
            filteredVehicles.map(vehicle => {
              // Normalize vehicle_class to lowercase for consistent style matching
              const vehicleClass = vehicle.vehicle_class ? vehicle.vehicle_class.toLowerCase() : 'default';
              const style = categoryStyles[vehicleClass] || categoryStyles.default;
              const carData = { ...vehicle, ...style };
              return <CarCard key={vehicle.id} car={carData} />;
            })
          )}
        </div>
      </div>
    </section>
  );
}