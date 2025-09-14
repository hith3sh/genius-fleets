
import React, { useState, useEffect } from "react";
import { Vehicle } from "@/api/entities";
import { VehicleDocument } from "@/api/entities"; // Keeping this import in case VehicleForm still uses it internally
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Car,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Eye,
  Pencil,
  UploadCloud
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import VehicleForm from "../components/fleet/VehicleForm";
import VehicleDetails from "../components/fleet/VehicleDetails";
// DocumentUploadForm is no longer directly used by FleetManagement for Mulkia extraction,
// but it might be used internally by VehicleForm.
import DocumentUploadForm from '../components/documents/DocumentUploadForm'; 
import ImageSelectorDialog from '../components/fleet/ImageSelectorDialog';

const statusColors = {
  'Available': 'bg-green-100 text-green-800 border-green-200',
  'Rented': 'bg-blue-100 text-blue-800 border-blue-200',
  'Under Maintenance': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Sold': 'bg-gray-100 text-gray-800 border-gray-200'
};

const statusIcons = {
  'Available': CheckCircle,
  'Rented': Car,
  'Under Maintenance': AlertTriangle,
  'Sold': Clock
};

export default function FleetManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  // Renamed states as per outline suggestions, and added new ones
  const [showForm, setShowForm] = useState(false); // Replaces isFormOpen
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [viewingVehicle, setViewingVehicle] = useState(null);

  // Removed states for document management (specifically Mulkia extraction for new vehicle)
  // as this functionality is now expected to be handled within VehicleForm directly.
  // const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  // const [extractedMulkiaData, setExtractedMulkiaData] = useState(null);

  // New states for image selection
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  const [imageSelectorFilters, setImageSelectorFilters] = useState({ make: '', color: '', currentSelection: [] });

  useEffect(() => {
    loadVehicles();
  }, []);

  useEffect(() => {
    filterVehicles();
  }, [vehicles, searchTerm, statusFilter, classFilter]);

  const loadVehicles = async () => {
    setIsLoading(true);
    try {
      console.log('🔄 Loading fleet vehicles data...');

      // Multi-level fallback loading strategy
      let vehiclesData = [];

      try {
        // First try with updated_date ordering
        vehiclesData = await Vehicle.list('-updated_date');
        console.log('✅ Vehicles loaded with updated_date ordering:', vehiclesData?.length || 0);
      } catch (orderError) {
        console.warn('⚠️ updated_date ordering failed, trying created_at:', orderError.message);
        try {
          // Try with created_at ordering instead
          vehiclesData = await Vehicle.list('-created_at');
          console.log('✅ Vehicles loaded with created_at ordering:', vehiclesData?.length || 0);
        } catch (createdAtError) {
          console.warn('⚠️ created_at ordering failed, trying without ordering:', createdAtError.message);
          try {
            // Try without any ordering
            vehiclesData = await Vehicle.list();
            console.log('✅ Vehicles loaded without ordering:', vehiclesData?.length || 0);
          } catch (basicError) {
            console.warn('⚠️ Basic vehicle list failed, trying direct query:', basicError.message);
            // Direct Supabase query as last resort
            const { supabase } = await import('@/lib/supabase');
            const result = await supabase.from('vehicle').select('*');
            if (result.error) throw result.error;
            vehiclesData = result.data || [];
            console.log('✅ Vehicles loaded via direct query:', vehiclesData.length);
          }
        }
      }

      setVehicles(vehiclesData || []);
      console.log('🏁 Final vehicle count:', vehiclesData?.length || 0);

    } catch (error) {
      console.error('❌ Error loading vehicles:', error);
      setVehicles([]);

      let errorMsg = 'Error loading vehicles. Please try again.';
      if (error.message?.includes('row-level security policy')) {
        errorMsg = 'Permission denied: You don\'t have access to view vehicles. Please contact your administrator to ensure you have the right role and permissions.';
      } else if (error.message) {
        errorMsg = `Error: ${error.message}`;
      }

      alert(errorMsg);
    }
    setIsLoading(false);
  };

  const filterVehicles = () => {
    let filtered = vehicles;

    if (searchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.license_plate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.vin?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(vehicle => vehicle.status === statusFilter);
    }

    if (classFilter !== "all") {
      filtered = filtered.filter(vehicle => vehicle.vehicle_class === classFilter);
    }

    setFilteredVehicles(filtered);
  };

  const handleFormSubmit = async (vehicleData) => {
    try {
      // Create a clean payload to send to the server
      const payload = { ...vehicleData };

      // --- DATA TYPE CORRECTION ---
      // Define all fields that should be numbers based on the entity schema
      const numericFields = [
        'year', 'odometer_reading', 'seating_capacity', 'number_of_doors',
        'purchase_price', 'current_market_value', 'sold_value', 
        'estimated_present_value', 'next_service_due_km', 'fuel_level', 
        'battery_level', 'daily_rate', 'monthly_rate'
      ];

      // Loop through and convert any string numbers to actual numbers
      numericFields.forEach(field => {
        if (payload[field] !== null && payload[field] !== undefined && payload[field] !== '') {
          const parsedValue = parseFloat(payload[field]);
          payload[field] = isNaN(parsedValue) ? null : parsedValue; // If parsing fails, set to null
        } else if (payload[field] === '') {
           // Ensure empty strings for number fields become null
          payload[field] = null;
        }
      });
      // --- END OF FIX ---

      // Address obsolete 'category' field if it exists
      if (!payload.vehicle_class && payload.category) {
        payload.vehicle_class = payload.category;
      }
      delete payload.category;

      // Ensure required rate fields have a default value if missing or null/empty string
      if (payload.daily_rate === null || typeof payload.daily_rate === 'undefined' || payload.daily_rate === '') {
        payload.daily_rate = 0;
      }
      if (payload.monthly_rate === null || typeof payload.monthly_rate === 'undefined' || payload.monthly_rate === '') {
        payload.monthly_rate = 0;
      }
      
      if (editingVehicle && editingVehicle.id) {
        await Vehicle.update(editingVehicle.id, payload);
      } else {
        await Vehicle.create(payload);
      }

      setShowForm(false); // Close form using new state
      setEditingVehicle(null);
      // setExtractedMulkiaData(null); // No longer needed as Mulkia extraction handled within VehicleForm
      loadVehicles();
      alert('Vehicle saved successfully!');
    } catch (error) {
      console.error("Failed to save vehicle:", error);
      const errorMessage = error.message || "An unknown error occurred. Check console for details.";
      alert(`Error saving vehicle: ${errorMessage}`);
    }
  };

  const handleOpenForm = (vehicle = null) => {
    setEditingVehicle(vehicle);
    setShowForm(true); // Open form using new state
    // setExtractedMulkiaData(null); // No longer needed
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingVehicle(null);
    // setExtractedMulkiaData(null); // No longer needed
  };

  const handleDelete = async (vehicleId) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await Vehicle.delete(vehicleId);
        loadVehicles();
      } catch (error) {
          console.error("Error deleting vehicle:", error);
      }
    }
  };

  // Simplified handleViewDetails to directly set viewingVehicle
  const handleViewDetails = (vehicle) => {
    setViewingVehicle(vehicle);
  };

  // Removed handleDocumentExtracted and handleOpenMulkiaUpload functions
  // as the Mulkia upload functionality is now integrated directly into VehicleForm.

  const handleOpenImageSelector = (make, color, currentSelection) => {
    setImageSelectorFilters({ make, color, currentSelection });
    setIsImageSelectorOpen(true);
  };

  const handleImageSelection = (selectedUrls) => {
    setEditingVehicle(prev => ({ ...(prev || {}), vehicle_photos: selectedUrls }));
    setIsImageSelectorOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center">
            <Car className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent">
              Fleet Management
            </h1>
            <p className="text-gray-600 mt-1">Manage your vehicle fleet with comprehensive tracking</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Removed Upload Mulkia button */}
          <Button
            onClick={() => handleOpenForm(null)}
            className="bg-gradient-to-r from-teal-500 to-violet-600 hover:from-teal-600 hover:to-violet-700 text-white shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Vehicle
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by license plate, make, model, or VIN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                  <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                </SelectContent>
              </Select>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Hatch Back">Hatch Back</SelectItem>
                  <SelectItem value="Mid-Size Sedan">Mid-Size Sedan</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Sports cars">Sports cars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fleet Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Available', 'Rented', 'Under Maintenance', 'Sold'].map((status) => {
          const count = vehicles.filter(v => v.status === status).length;
          const Icon = statusIcons[status];
          return (
            <Card key={status} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{status}</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${statusColors[status]} bg-opacity-20`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Vehicles Table */}
      {!isLoading && (
        <div className="bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5 text-teal-600" />
              Fleet Vehicles ({filteredVehicles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50">
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Maintenance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={6} className="h-16">
                          <div className="animate-pulse flex items-center space-x-4">
                            <div className="rounded-lg bg-gray-200 h-12 w-16"></div>
                            <div className="space-y-2 flex-1">
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {vehicle.make} {vehicle.model}
                            </div>
                            <div className="text-sm text-gray-500">
                              {vehicle.license_plate} • {vehicle.year}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="font-medium">{vehicle.vehicle_class}</span>
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                              <span>{vehicle.fuel_type}</span>
                              <span>•</span>
                              <span>{vehicle.transmission_type}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[vehicle.status] || statusColors['Available']}>
                            {vehicle.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{vehicle.location || 'Not set'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {vehicle.last_service_date && (
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Last: {new Date(vehicle.last_service_date).toLocaleDateString()}
                              </div>
                            )}
                            {vehicle.next_service_due_date && (
                              <div className="text-xs text-orange-600 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Due: {new Date(vehicle.next_service_due_date).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewDetails(vehicle)}
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {/* The old FileText button that opened a document upload modal for existing vehicles is removed,
                                as the new document flow is focused on Mulkia extraction for new vehicles
                                and the outline does not provide an alternative for general document upload to existing vehicles.*/}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenForm(vehicle)}
                              className="hover:bg-yellow-50 hover:text-yellow-600"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(vehicle.id)}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            {!isLoading && filteredVehicles.length === 0 && (
              <div className="text-center py-12">
                <Car className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || statusFilter !== "all" || classFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Get started by adding your first vehicle to the fleet"}
                </p>
                <div className="flex justify-center gap-3">
                  {/* Removed Upload Mulkia button from here too */}
                  <Button
                    onClick={() => handleOpenForm(null)}
                    className="bg-gradient-to-r from-teal-500 to-violet-600 hover:from-teal-600 hover:to-violet-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Vehicle
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </div>
      )}
      {isLoading && (
          <div className="bg-white rounded-lg shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-teal-600" />
                Fleet Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Maintenance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array(5).fill(0).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={6} className="h-16">
                          <div className="animate-pulse flex items-center space-x-4">
                            <div className="rounded-lg bg-gray-200 h-12 w-16"></div>
                            <div className="space-y-2 flex-1">
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </div>
        )}

      {/* Vehicle Form Dialog (uses new showForm state) */}
      <Dialog open={showForm} onOpenChange={setShowForm}> 
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          {/* Remove DialogHeader since title is now in VehicleForm */}
          <VehicleForm
            vehicle={editingVehicle}
            onSave={handleFormSubmit} 
            onCancel={handleFormCancel}
            onOpenImageSelector={handleOpenImageSelector}
          />
        </DialogContent>
      </Dialog>
      
      {/* Removed Document Upload Dialog for Mulkia Extraction. 
          This functionality is now expected to be integrated within the VehicleForm. */}

      {/* Image Selector Dialog */}
      <ImageSelectorDialog
        isOpen={isImageSelectorOpen}
        onClose={() => setIsImageSelectorOpen(false)}
        make={imageSelectorFilters.make}
        color={imageSelectorFilters.color}
        currentSelection={imageSelectorFilters.currentSelection}
        onSelectImages={handleImageSelection}
      />
      
      {/* Vehicle Details Component (Now handles its own dialog internally) */}
      {viewingVehicle && (
        <VehicleDetails
          vehicle={viewingVehicle}
          isOpen={!!viewingVehicle}
          onOpenChange={() => {
            setViewingVehicle(null);
            // Optionally, if VehicleDetails has an "Edit" button that calls back,
            // you might need to handle it here or within VehicleDetails itself.
            // Original `onEdit` prop allowed passing `handleOpenForm(viewingVehicle)`
            // This logic would now need to be embedded in VehicleDetails component if desired.
          }}
        />
      )}
    </div>
  );
}
