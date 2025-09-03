
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  FileText,
  Wrench,
  Calendar,
  MapPin,
  Fuel,
  Edit,
  Users,
  Globe,
  Tag,
  Hash,
  Building,
  Camera // Import Camera icon
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statusColors = {
  'Available': 'bg-green-100 text-green-800 border-green-200',
  'Rented': 'bg-blue-100 text-blue-800 border-blue-200',
  'Under Maintenance': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Sold': 'bg-gray-100 text-gray-800 border-gray-200'
};

// Updated status icons to use available icons from the new import list
const statusIcons = {
  'Available': Car, // Using Car as a generic available icon
  'Rented': Car,
  'Under Maintenance': Wrench,
  'Sold': Tag // Using Tag for sold vehicles
};

// New DetailItem component for consistent display of details
const DetailItem = ({ icon: Icon, label, value, className = '' }) => (
  <div>
    <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
      {Icon && <Icon className="w-4 h-4" />} {label}
    </p>
    <p className={`text-gray-900 ${className}`}>{value || 'N/A'}</p>
  </div>
);

export default function VehicleDetails({ vehicle, onEdit, onClose }) {
  const StatusIcon = statusIcons[vehicle.status] || Car; // Fallback to Car if status icon not found

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return 'N/A';
    return `AED ${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          {vehicle.vehicle_photos && vehicle.vehicle_photos.length > 0 ? (
            <img
              src={vehicle.vehicle_photos[vehicle.vehicle_photos.length - 1]}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-16 h-16 rounded-xl object-cover shadow-md"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-r from-teal-100 to-violet-100 rounded-xl flex items-center justify-center">
              <Car className="w-8 h-8 text-teal-600" />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {vehicle.make} {vehicle.model}
            </h2>
            <p className="text-gray-600">
              {vehicle.license_plate} • {vehicle.year} • {vehicle.vehicle_class}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={statusColors[vehicle.status]}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {vehicle.status}
              </Badge>
              {vehicle.location && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {vehicle.location}
                </div>
              )}
            </div>
          </div>
        </div>
        <Button
          onClick={onEdit}
          className="bg-gradient-to-r from-teal-500 to-violet-600 hover:from-teal-600 hover:to-violet-700"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Vehicle
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="registration">Registration & Ownership</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance & Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="w-5 h-5" />
                Vehicle Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DetailItem label="Make & Model" value={`${vehicle.make} ${vehicle.model}`} />
              <DetailItem label="Year" value={vehicle.year} />
              <DetailItem label="License Plate" value={vehicle.license_plate} className="font-mono" />
              <DetailItem label="VIN" value={vehicle.vin} className="font-mono text-sm" />
              <DetailItem label="Color" value={vehicle.color} />
              <DetailItem label="Body Type" value={vehicle.body_type} />
              <DetailItem label="Transmission" value={vehicle.transmission_type} />
              <DetailItem label="Fuel Type" value={vehicle.fuel_type} />
              <DetailItem label="Seating" value={`${vehicle.seating_capacity} seats`} />
              <DetailItem label="GPS Installed" value={vehicle.gps_installed ? 'Yes' : 'No'} />
              <DetailItem label="Status" value={
                <Badge className={statusColors[vehicle.status]}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {vehicle.status}
                </Badge>
              } />
              <DetailItem label="Location" value={vehicle.location} />
              <DetailItem label="Assigned Branch" value={vehicle.assigned_branch} />
              <DetailItem label="Odometer Reading" value={`${vehicle.odometer_reading?.toLocaleString() || 0} km`} />
              <DetailItem label="Daily Rate" value={formatCurrency(vehicle.daily_rate)} className="font-semibold text-lg" />
              {vehicle.fuel_level !== undefined && (
                <div>
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <Fuel className="w-4 h-4" /> Fuel Level
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${vehicle.fuel_level}%` }}
                      />
                    </div>
                    <span className="text-sm">{vehicle.fuel_level}%</span>
                  </div>
                </div>
              )}
              {vehicle.fuel_type === 'Electric' && vehicle.battery_level !== undefined && (
                <div>
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    Battery Level
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${vehicle.battery_level}%` }}
                      />
                    </div>
                    <span className="text-sm">{vehicle.battery_level}%</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {vehicle.vehicle_photos && vehicle.vehicle_photos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Camera className="w-5 h-5" />
                  Vehicle Gallery
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {vehicle.vehicle_photos.map((photoUrl, index) => (
                  <a key={index} href={photoUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={photoUrl}
                      alt={`Vehicle photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                    />
                  </a>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="registration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5" />
                Registration & Ownership Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DetailItem icon={FileText} label="VIN" value={vehicle.vin} />
              <DetailItem icon={FileText} label="Chassis Number" value={vehicle.chassis_number} />
              <DetailItem icon={FileText} label="Engine Number" value={vehicle.engine_number} />
              <DetailItem icon={Users} label="Owner Name" value={vehicle.owner_name} />
              <DetailItem icon={Hash} label="TC Number" value={vehicle.tc_number} />
              <DetailItem icon={Building} label="Place of Issue" value={vehicle.place_of_issue} />
              <DetailItem icon={Globe} label="Country of Origin" value={vehicle.country_of_origin} />
              <DetailItem icon={Calendar} label="Purchase Date" value={formatDate(vehicle.purchase_date)} />
              <DetailItem icon={FileText} label="Purchase Price" value={formatCurrency(vehicle.purchase_price)} />
              <DetailItem icon={FileText} label="Current Market Value" value={formatCurrency(vehicle.current_market_value)} />
              <DetailItem icon={Calendar} label="Registration Date" value={formatDate(vehicle.registration_date)} />
              <DetailItem
                icon={Calendar}
                label="Registration Expiry"
                value={formatDate(vehicle.registration_expiry_date)}
                className={`${vehicle.registration_expiry_date && new Date(vehicle.registration_expiry_date) < new Date() ? 'text-red-600 font-semibold' : ''}`}
              />
              <DetailItem icon={Tag} label="Insurance Provider" value={vehicle.insurance_provider} />
              <DetailItem icon={Tag} label="Insurance Policy #" value={vehicle.insurance_policy_number} />
              <DetailItem
                icon={Calendar}
                label="Insurance Expiry"
                value={formatDate(vehicle.insurance_expiry_date)}
                className={`${vehicle.insurance_expiry_date && new Date(vehicle.insurance_expiry_date) < new Date() ? 'text-red-600 font-semibold' : ''}`}
              />
              <DetailItem icon={FileText} label="Salik/Tag Number" value={vehicle.salik_tag_number} />
              <DetailItem label="Ownership Type" value={vehicle.lease_owned} />
              <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-2">Registration Copy</p>
                  {vehicle.registration_copy ? (
                    <a
                      href={vehicle.registration_copy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View Document
                    </a>
                  ) : (
                    <p className="text-gray-400">N/A</p>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-2">Insurance Copy</p>
                  {vehicle.insurance_copy ? (
                    <a
                      href={vehicle.insurance_copy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View Document
                    </a>
                  ) : (
                    <p className="text-gray-400">N/A</p>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-2">Emission Test</p>
                  {vehicle.emission_test ? (
                    <a
                      href={vehicle.emission_test}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View Document
                    </a>
                  ) : (
                    <p className="text-gray-400">N/A</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wrench className="w-5 h-5" />
                Maintenance & Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DetailItem label="Last Service Date" value={formatDate(vehicle.last_service_date)} />
                <DetailItem
                  label="Next Service Due"
                  value={formatDate(vehicle.next_service_due_date)}
                  className={`${vehicle.next_service_due_date && new Date(vehicle.next_service_due_date) < new Date() ? 'text-red-600 font-semibold' : ''}`}
                />
                <DetailItem label="Service Provider" value={vehicle.service_provider} />
                <DetailItem label="Tyre Change Date" value={formatDate(vehicle.tyre_change_date)} />
              </div>

              {vehicle.service_notes && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-500 mb-2">Service Notes</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{vehicle.service_notes}</p>
                  </div>
                </div>
              )}

              {vehicle.damage_notes && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-500 mb-2">Damage Notes</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{vehicle.damage_notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end pt-4">
        <Button onClick={onClose} variant="outline">Close</Button>
      </div>
    </div>
  );
}
