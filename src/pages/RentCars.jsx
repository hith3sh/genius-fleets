import React, { useState, useEffect } from 'react';
import { Vehicle } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Car, Users, Calendar, DollarSign, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';

const vehicleClassInfo = {
  'Economy': { icon: '🚗', description: 'Budget-friendly, fuel efficient', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  'Hatch Back': { icon: '🚙', description: 'Compact & versatile', color: 'bg-green-50 text-green-700 border-green-200' },
  'Mid-Size Sedan': { icon: '🚘', description: 'Comfortable for families', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  'Luxury': { icon: '🏎️', description: 'Premium experience', color: 'bg-red-50 text-red-700 border-red-200' },
  'SUV': { icon: '🚙', description: 'Spacious & powerful', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  'Sports cars': { icon: '🏎️', description: 'High performance & style', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
};

const statusColors = {
  'Available': 'bg-green-100 text-green-800',
  'Rented': 'bg-blue-100 text-blue-800',
  'Maintenance': 'bg-yellow-100 text-yellow-800',
  'Out of Service': 'bg-red-100 text-red-800'
};

export default function RentCars() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    document.title = "Rent Cars - Al Jisr Car Rentals";
    loadVehicles();
  }, []);

  useEffect(() => {
    filterAndSortVehicles();
  }, [vehicles, searchTerm, selectedClass, sortBy]);

  const loadVehicles = async () => {
    setIsLoading(true);
    try {
      const data = await Vehicle.filter({ status: 'Available' });
      setVehicles(data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortVehicles = () => {
    let filtered = vehicles.filter(vehicle => {
      const matchesSearch = vehicle.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.license_plate?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesClass = selectedClass === 'All' || vehicle.vehicle_class === selectedClass;
      
      return matchesSearch && matchesClass;
    });

    // Sort vehicles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.daily_rate || 0) - (b.daily_rate || 0);
        case 'price-high':
          return (b.daily_rate || 0) - (a.daily_rate || 0);
        case 'year':
          return (b.year || 0) - (a.year || 0);
        case 'name':
        default:
          return `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`);
      }
    });

    setFilteredVehicles(filtered);
  };

  const handleRentNow = (vehicle) => {
    // Store selected vehicle in localStorage and redirect to booking
    localStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
    window.location.href = createPageUrl('MobileBooking');
  };

  const VehicleCard = ({ vehicle }) => {
    const classInfo = vehicleClassInfo[vehicle.vehicle_class] || vehicleClassInfo['Economy'];
    
    return (
      <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
        <div className="relative">
          {/* Vehicle Image */}
          <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
            {vehicle.vehicle_photos && vehicle.vehicle_photos.length > 0 ? (
              <img 
                src={vehicle.vehicle_photos[vehicle.vehicle_photos.length - 1]} 
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <Car className="w-16 h-16 text-gray-400" />
            )}
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge className={statusColors[vehicle.status]}>
              {vehicle.status}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          {/* Vehicle Info */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-gray-600">{vehicle.year} • {vehicle.color}</p>
            
            <div className="flex items-center gap-2 mt-2">
              <Badge className={classInfo.color}>
                {classInfo.icon} {vehicle.vehicle_class}
              </Badge>
            </div>
          </div>
          
          {/* Vehicle Details */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{vehicle.seating_capacity || 4} seats</span>
            </div>
            <div>
              <span>{vehicle.transmission_type || 'Auto'}</span>
            </div>
            <div>
              <span>{vehicle.fuel_type || 'Petrol'}</span>
            </div>
            <div>
              <span>{vehicle.number_of_doors || 4} doors</span>
            </div>
          </div>
          
          {/* Pricing */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Daily Rate</p>
                <p className="text-lg font-bold text-blue-600">
                  AED {vehicle.daily_rate ? vehicle.daily_rate.toLocaleString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Rate</p>
                <p className="text-lg font-bold text-green-600">
                  AED {vehicle.monthly_rate ? vehicle.monthly_rate.toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Rent Button */}
          <Button 
            onClick={() => handleRentNow(vehicle)}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Rent This Car
            <Calendar className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Link to={createPageUrl('LandingPage')} className="inline-flex items-center text-gray-300 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Rent Your Perfect Car
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose from our premium fleet of vehicles. From economy to luxury, we have the perfect car for every journey.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="bg-white py-8 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by make, model, or license plate..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300"
              />
            </div>
            
            {/* Class Filter */}
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Classes</SelectItem>
                {Object.keys(vehicleClassInfo).map(className => (
                  <SelectItem key={className} value={className}>
                    {vehicleClassInfo[className].icon} {className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="year">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Results Count */}
          <div className="mt-4 text-center text-gray-600">
            {isLoading ? (
              <p>Loading vehicles...</p>
            ) : (
              <p>{filteredVehicles.length} of {vehicles.length} vehicles available</p>
            )}
          </div>
        </div>
      </section>
      
      {/* Vehicles Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredVehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No vehicles found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || selectedClass !== 'All' 
                  ? "Try adjusting your search filters" 
                  : "No vehicles are currently available for rent"}
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedClass('All'); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}