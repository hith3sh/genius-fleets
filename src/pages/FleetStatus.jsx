import React, { useState, useEffect } from 'react';
import { Vehicle } from '@/api/entities';
import { Booking } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Car, Search, MapPin, Fuel, Users, Calendar, Filter, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const statusColors = {
  'Available': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
  'Rented': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
  'Under Maintenance': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  'Sold': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
  'In Transit': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' }
};

const classColors = {
  'Economy': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Hatch Back': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'Mid-Size Sedan': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Luxury': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  'SUV': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  'Sports cars': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' }
};

export default function FleetStatus() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});
  
  useEffect(() => {
    loadVehicles();
  }, []);

  useEffect(() => {
    filterVehicles();
  }, [vehicles, searchTerm, statusFilter, classFilter, locationFilter]);

  const loadVehicles = async () => {
    setIsLoading(true);
    try {
      const vehicleData = await Vehicle.list();
      setVehicles(vehicleData);
      calculateStats(vehicleData);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    }
    setIsLoading(false);
  };

  const calculateStats = (vehicleData) => {
    const stats = {
      total: vehicleData.length,
      available: vehicleData.filter(v => v.status === 'Available').length,
      rented: vehicleData.filter(v => v.status === 'Rented').length,
      maintenance: vehicleData.filter(v => v.status === 'Under Maintenance').length,
      sold: vehicleData.filter(v => v.status === 'Sold').length,
      inTransit: vehicleData.filter(v => v.status === 'In Transit').length
    };
    setStats(stats);
  };

  const filterVehicles = () => {
    let filtered = vehicles;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.license_plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.color.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.status === statusFilter);
    }

    // Class filter
    if (classFilter !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.vehicle_class === classFilter);
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.location === locationFilter);
    }

    setFilteredVehicles(filtered);
  };

  const getUniqueLocations = () => {
    const locations = vehicles.map(v => v.location).filter(Boolean);
    return [...new Set(locations)];
  };

  const getUniqueClasses = () => {
    const classes = vehicles.map(v => v.vehicle_class).filter(Boolean);
    return [...new Set(classes)];
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setClassFilter('all');
    setLocationFilter('all');
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Fleet Status</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Fleet Status</h1>
        <Button onClick={loadVehicles} variant="outline">
          <Car className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total || 0}</div>
            <div className="text-sm text-gray-600">Total Vehicles</div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-800">{stats.available || 0}</div>
            <div className="text-sm text-green-700">Available</div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-800">{stats.rented || 0}</div>
            <div className="text-sm text-blue-700">Rented</div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-800">{stats.maintenance || 0}</div>
            <div className="text-sm text-yellow-700">Maintenance</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{stats.sold || 0}</div>
            <div className="text-sm text-gray-700">Sold</div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-800">{stats.inTransit || 0}</div>
            <div className="text-sm text-purple-700">In Transit</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Rented">Rented</SelectItem>
                <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {getUniqueClasses().map(vehicleClass => (
                  <SelectItem key={vehicleClass} value={vehicleClass}>{vehicleClass}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {getUniqueLocations().map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={clearFilters} variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredVehicles.length} of {vehicles.length} vehicles
        </p>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              {/* Vehicle Photo */}
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {vehicle.vehicle_photos && vehicle.vehicle_photos.length > 0 ? (
                  <img 
                    src={vehicle.vehicle_photos[0]} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Car className="w-16 h-16 text-gray-400" />
                )}
              </div>
              
              {/* Vehicle Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{vehicle.make} {vehicle.model}</h3>
                  <p className="text-gray-600 text-sm">{vehicle.year} • {vehicle.color}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge className={`${statusColors[vehicle.status]?.bg} ${statusColors[vehicle.status]?.text} ${statusColors[vehicle.status]?.border}`}>
                    {vehicle.status}
                  </Badge>
                  <Badge variant="outline" className={`${classColors[vehicle.vehicle_class]?.bg} ${classColors[vehicle.vehicle_class]?.text} ${classColors[vehicle.vehicle_class]?.border}`}>
                    {vehicle.vehicle_class}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Plate:</span>
                    <span>{vehicle.license_plate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{vehicle.seating_capacity} seats</span>
                  </div>
                  {vehicle.location && (
                    <div className="flex items-center gap-1 col-span-2">
                      <MapPin className="w-3 h-3" />
                      <span>{vehicle.location}</span>
                    </div>
                  )}
                  {vehicle.fuel_level && (
                    <div className="flex items-center gap-1">
                      <Fuel className="w-3 h-3" />
                      <span>{vehicle.fuel_level}%</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Rate:</span>
                    <span>AED {vehicle.daily_rate}/day</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredVehicles.length === 0 && !isLoading && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No vehicles found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}