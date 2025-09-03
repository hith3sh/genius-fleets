import React, { useState, useEffect } from 'react';
import { Vehicle } from '@/api/entities';
import { Booking } from '@/api/entities';
import { Customer } from '@/api/entities';
import { User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Car, Users, MapPin, Clock, DollarSign, Smartphone } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const vehicleClassInfo = {
  'Economy': { icon: '🚗', description: 'Budget-friendly, fuel efficient', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  'Hatch Back': { icon: '🚙', description: 'Compact & versatile', color: 'bg-green-50 text-green-700 border-green-200' },
  'Mid-Size Sedan': { icon: '🚘', description: 'Comfortable for families', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  'Luxury': { icon: '🏎️', description: 'Premium experience', color: 'bg-red-50 text-red-700 border-red-200' },
  'SUV': { icon: '🚙', description: 'Spacious & powerful', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  'Sports cars': { icon: '🏎️', description: 'High performance & style', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
};

export default function MobileBooking() {
  const [selectedClass, setSelectedClass] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);

  const searchAvailableVehicles = async () => {
    if (!selectedClass || !startDate || !endDate) {
      alert('Please select vehicle class and dates');
      return;
    }

    setIsLoading(true);
    try {
      const vehicles = await Vehicle.filter({
        vehicle_class: selectedClass,
        status: 'Available'
      });

      setAvailableVehicles(vehicles);
      setShowVehicles(true);
    } catch (error) {
      console.error('Error searching vehicles:', error);
      alert('Error searching for vehicles');
    }
    setIsLoading(false);
  };

  const handleBookVehicle = (vehicle) => {
    const bookingData = {
      vehicleId: vehicle.id,
      startDate,
      endDate,
      vehicleClass: selectedClass
    };

    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    window.location.href = '/CustomerDocsUpload';
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include drop-off day
  };

  const days = calculateDays();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking</h1>
          <p className="text-gray-600">Book your perfect vehicle in just a few taps</p>
        </div>

        {!showVehicles ?
        <>
            <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-col space-y-1.5 p-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Car className="w-6 h-6 text-blue-600" />
                  Choose Your Vehicle Class
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full text-lg p-3">
                    <SelectValue placeholder="Select a vehicle class..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(vehicleClassInfo).map(className => (
                      <SelectItem key={className} value={className}>{className}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="px-6 py-4 flex flex-col space-y-1.5">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  Select Your Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="text-base font-medium">Pick-up Date</Label>
                    <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-lg p-3" />

                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="text-base font-medium">Drop-off Date</Label>
                    <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="text-lg p-3" />

                  </div>
                </div>
                {days > 0 &&
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 font-medium">
                      <Clock className="inline w-4 h-4 mr-1" />
                      Rental Duration: {days} day{days > 1 ? 's' : ''}
                    </p>
                  </div>
              }
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
              onClick={searchAvailableVehicles}
              disabled={!selectedClass || !startDate || !endDate || isLoading}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg">

                {isLoading ?
              <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </> :

              <>
                    <Car className="w-5 h-5 mr-2" />
                    Search Available Vehicles
                  </>
              }
              </Button>
            </div>
          </> :

        <>
            <Card className="mb-6 shadow-lg border-0 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Your Search</h3>
                    <div className="flex flex-wrap gap-4 text-blue-100">
                      <span className="flex items-center gap-1">
                        <Car className="w-4 h-4" />
                        {selectedClass}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {days} day{days > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <Button
                  variant="outline"
                  onClick={() => setShowVehicles(false)}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30">

                    Modify Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Available Vehicles ({availableVehicles.length})
              </h3>
              
              {availableVehicles.length === 0 ?
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No vehicles available</h3>
                    <p className="text-gray-500">
                      Sorry, no {selectedClass.toLowerCase()} vehicles are available for your selected dates.
                      Try different dates or a different vehicle class.
                    </p>
                  </CardContent>
                </Card> :

            availableVehicles.map((vehicle) =>
            <Card key={vehicle.id} className="overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="col-span-1 h-48 md:h-auto bg-gray-100 flex items-center justify-center overflow-hidden">
                        {vehicle.vehicle_photos && vehicle.vehicle_photos.length > 0 ?
                  <img
                    src={vehicle.vehicle_photos[vehicle.vehicle_photos.length - 1]} // Display the last photo
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover" /> :


                  <Car className="w-16 h-16 text-gray-400" />
                  }
                      </div>
                      
                      <CardContent className="col-span-2 p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">
                              {vehicle.make} {vehicle.model}
                            </h4>
                            <p className="text-gray-600">{vehicle.year} • {vehicle.color}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {vehicle.seating_capacity} seats
                              </span>
                              <span>{vehicle.transmission_type}</span>
                              <span>{vehicle.fuel_type}</span>
                            </div>
                          </div>
                          <Badge className={vehicleClassInfo[vehicle.vehicle_class]?.color}>
                            {vehicle.vehicle_class}
                          </Badge>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-sm text-gray-600">Daily Rate</p>
                              <p className="text-lg font-bold text-blue-600">AED {vehicle.daily_rate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Monthly Rate</p>
                              <p className="text-lg font-bold text-teal-600">AED {vehicle.monthly_rate}</p>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                              <p className="text-sm text-gray-600">Your Total ({days} day{days > 1 ? 's' : ''})</p>
                              <p className="text-xl font-bold text-green-600">
                                AED {(vehicle.daily_rate * days).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                    onClick={() => handleBookVehicle(vehicle)}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 text-lg rounded-lg">

                          Book This Vehicle
                          <DollarSign className="w-5 h-5 ml-2" />
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
            )
            }
            </div>
          </>
        }
      </div>
    </div>);

}