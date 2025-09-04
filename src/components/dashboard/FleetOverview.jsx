
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vehicle } from "@/api/entities";
import { Badge } from "@/components/ui/badge";
import { Car, Fuel, MapPin, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  'Available': 'bg-green-100 text-green-800 border-green-200',
  'Rented': 'bg-blue-100 text-blue-800 border-blue-200',
  'Maintenance': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Out of Service': 'bg-red-100 text-red-800 border-red-200'
};

export default function FleetOverview({ isLoading }) {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      loadVehicles();
    }
  }, [isLoading]);

  const loadVehicles = async () => {
    try {
      // Use default parameters to avoid any parameter parsing issues
      const data = await Vehicle.list();
      // Limit to 8 and sort manually for now
      const sortedData = data.sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)).slice(0, 8);
      setVehicles(sortedData);
    } catch (error) {
      console.error("Error loading vehicles:", error);
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="w-5 h-5 text-violet-600" />
          Fleet Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between p-3 rounded-xl border hover:shadow-md hover:border-violet-200 transition-all duration-200 bg-white"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {vehicle.make} {vehicle.model}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <span>{vehicle.license_plate}</span>
                      </span>
                      {vehicle.fuel_level && (
                        <span className="flex items-center gap-1">
                          <Fuel className="w-3 h-3" />
                          {vehicle.fuel_level}%
                        </span>
                      )}
                      {vehicle.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {vehicle.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={statusColors[vehicle.status] || statusColors['Available']}>
                    {vehicle.status}
                  </Badge>
                  {vehicle.status === 'Maintenance' && (
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
              </div>
            ))}
            {vehicles.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Car className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No vehicles found. Add your first vehicle to get started.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
