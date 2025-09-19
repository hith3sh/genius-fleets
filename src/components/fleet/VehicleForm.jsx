
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CarFront, Loader2, UploadCloud, Images, Trash2, CheckCircle, Car, Upload, Calendar, DollarSign, Settings, FileText, MapPin, X } from 'lucide-react';
import { CarImage } from '@/api/entities';
import DocumentUploadForm from '../documents/DocumentUploadForm';

export default function VehicleForm({ vehicle, onSave, onCancel, onOpenImageSelector }) {
  // Add state to store vehicles for the DocumentUploadForm
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    license_plate: '',
    make: '',
    model: '',
    variant_trim: '',
    year: new Date().getFullYear(),
    vin: '',
    engine_number: '',
    transmission_type: 'Automatic',
    fuel_type: 'Petrol',
    color: '',
    chassis_number: '',
    body_type: 'Sedan',
    odometer_reading: 0,
    odometer_source: 'Manual',
    seating_capacity: 5,
    number_of_doors: 4,
    vehicle_class: 'Economy',
    gps_installed: false,
    status: 'Available',
    location: '',
    assigned_branch: '',
    current_renter: '',
    purchase_date: '',
    purchase_price: 0,
    current_market_value: 0,
    lease_owned: 'Owned',
    leasing_company: '',
    insurance_provider: '',
    insurance_policy_number: '',
    insurance_expiry_date: '',
    salik_tag_number: '',
    registration_expiry_date: '',
    mortgage_loan_status: '',
    estimated_present_value: 0,
    last_service_date: '',
    next_service_due_km: 0,
    next_service_due_date: '',
    tyre_change_date: '',
    battery_replacement_date: '',
    service_provider: '',
    service_notes: '',
    accident_history: '',
    damage_notes: '',
    daily_rate: 0,
    monthly_rate: 0,
    health_rating: 'Good',
    registration_date: '',
    country_of_origin: '',
    owner_name: '',
    tc_number: '',
    place_of_issue: '',
    image_set_id: '',
    vehicle_photos: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [imageSetOptions, setImageSetOptions] = useState([]);

  // Document upload modal states
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [documentUploading, setDocumentUploading] = useState(false);
  // State to control visibility of success message after document extraction
  const [documentExtractedSuccess, setDocumentExtractedSuccess] = useState(false);

  // Effect to fetch image set options and vehicles
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch image sets
        const images = await CarImage.list();
        const uniqueSets = [...new Set(images.map(img => img.image_set_id).filter(id => id))];
        setImageSetOptions(uniqueSets);

        // Fetch vehicles for DocumentUploadForm
        const { Vehicle } = await import('@/api/entities');
        const vehiclesList = await Vehicle.list();
        setVehicles(vehiclesList || []);
      } catch (error) {
        console.error("Failed to load data:", error);
        setVehicles([]); // Set empty array on error
      }
    }
    fetchData();
  }, []);

  // Effect to populate form data when vehicle is provided or reset for a new vehicle
  useEffect(() => {
    if (vehicle) {
      // Ensure all fields have a value to prevent uncontrolled component warnings
      const initialFormState = { ...formData }; // Start with current default formData to ensure all keys exist
      for (const key in initialFormState) {
        // Use vehicle's value if it exists, otherwise use the default from formData initial state
        initialFormState[key] = vehicle[key] !== undefined && vehicle[key] !== null ? vehicle[key] : formData[key];
      }
      setFormData(initialFormState);
    } else {
      // Reset to default for new vehicle form using the new default structure
      setFormData({
        license_plate: '', make: '', model: '', variant_trim: '',
        year: new Date().getFullYear(), vin: '', engine_number: '',
        transmission_type: 'Automatic', fuel_type: 'Petrol', color: '',
        chassis_number: '', body_type: 'Sedan', odometer_reading: 0,
        odometer_source: 'Manual', seating_capacity: 5, number_of_doors: 4,
        vehicle_class: 'Economy', gps_installed: false, status: 'Available',
        location: '', assigned_branch: '', current_renter: '',
        purchase_date: '', purchase_price: 0, current_market_value: 0,
        lease_owned: 'Owned', leasing_company: '', insurance_provider: '',
        insurance_policy_number: '', insurance_expiry_date: '', salik_tag_number: '',
        registration_expiry_date: '', mortgage_loan_status: '', estimated_present_value: 0,
        last_service_date: '', next_service_due_km: 0, next_service_due_date: '',
        tyre_change_date: '', battery_replacement_date: '', service_provider: '',
        service_notes: '', accident_history: '', damage_notes: '',
        daily_rate: 0, monthly_rate: 0, health_rating: 'Good',
        registration_date: '', country_of_origin: '', owner_name: '',
        tc_number: '', place_of_issue: '',
        image_set_id: '', vehicle_photos: [],
      });
    }
  }, [vehicle]);

  // Effect to hide the success message after a few seconds
  useEffect(() => {
    if (documentExtractedSuccess) {
      const timer = setTimeout(() => {
        setDocumentExtractedSuccess(false);
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [documentExtractedSuccess]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Convert numerical inputs to numbers if type is 'number'
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRemovePhoto = (urlToRemove) => {
    setFormData(prev => ({
      ...prev,
      vehicle_photos: prev.vehicle_photos.filter(url => url !== urlToRemove)
    }));
  };

  // Handle document upload for Mulkia extraction
  const handleDocumentUpload = async (vehicleId, documentType, file, documentName, expiryDate, notes) => {
    setDocumentUploading(true);
    try {
      console.log('Processing Mulkia document upload...');

      // For Mulkia extraction in VehicleForm, we don't actually save the document
      // We just extract the data and populate the form
      if (documentType === 'Mulkia') {
        console.log('Uploading and extracting Mulkia data from file:', file.name);

        // Step 1: Upload the file to storage
        const { UploadFile } = await import('@/api/integrations');
        const uploadResult = await UploadFile({ file });

        if (!uploadResult.file_url) {
          throw new Error('File upload failed - no URL returned');
        }

        console.log('File uploaded successfully:', uploadResult.file_url);

        // Step 2: Extract data from the uploaded Mulkia document
        const { extractMulkiaData } = await import('@/api/functions');
        const extractionResult = await extractMulkiaData({ file_url: uploadResult.file_url });

        console.log('Mulkia extraction result:', extractionResult);

        // Step 3: If extraction was successful, populate the form
        if (extractionResult.data?.success && extractionResult.data?.extracted_data) {
          console.log('Mulkia data extracted successfully:', extractionResult.data.extracted_data);
          handleDocumentExtracted(extractionResult.data.extracted_data);
        } else {
          console.warn('Mulkia extraction failed or returned no data');
          // Still show success for upload, but inform user about extraction
          alert('Document uploaded successfully, but data extraction failed. You can manually fill the form.');
        }

        // Close the upload dialog
        setShowDocumentUpload(false);

        // Show success message
        setDocumentExtractedSuccess(true);

      } else {
        // For non-Mulkia documents, just upload
        const { UploadFile } = await import('@/api/integrations');
        const uploadResult = await UploadFile({ file });

        console.log('Document uploaded:', uploadResult);
        setShowDocumentUpload(false);
        alert('Document uploaded successfully!');
      }

    } catch (error) {
      console.error('Error processing document:', error);
      let errorMsg = 'Error processing document. Please try again.';

      if (error.message?.includes('File upload failed')) {
        errorMsg = 'File upload failed. Please check your internet connection and file size.';
      } else if (error.message?.includes('Bucket not found')) {
        errorMsg = 'Storage configuration issue. Please contact your administrator.';
      } else if (error.message) {
        errorMsg = `Upload error: ${error.message}`;
      }

      alert(errorMsg);
    }
    setDocumentUploading(false);
  };

  // Handle document extraction completion
  const handleDocumentExtracted = (data) => {
    console.log('Document data received in VehicleForm:', data);

    // Parse vehicle make and model from vehicle_type
    let make = '';
    let model = '';
    if (data.vehicle_type) {
      const parts = data.vehicle_type.trim().split(' ');
      make = parts[0] || '';
      model = parts.slice(1).join(' ') || '';
    }

    // Parse numeric values
    const year = data.model_year ? parseInt(data.model_year) : null;
    const seatingCapacity = data.number_of_passengers ? parseInt(data.number_of_passengers) : null;

    // Update form data with extracted information
    setFormData(prev => ({
      ...prev,
      license_plate: data.license_plate_number || prev.license_plate,
      make: make || prev.make,
      model: model || prev.model,
      year: year || prev.year,
      color: data.color || prev.color,
      vin: data.chassis_number || prev.vin,
      chassis_number: data.chassis_number || prev.chassis_number,
      seating_capacity: seatingCapacity || prev.seating_capacity,
      owner_name: data.owner_name || prev.owner_name,
      tc_number: data.tc_number || prev.tc_number,
      registration_date: data.registration_date || prev.registration_date,
      registration_expiry_date: data.registration_expiry_date || prev.registration_expiry_date,
      insurance_policy_number: data.insurance_policy_number || prev.insurance_policy_number,
      insurance_expiry_date: data.insurance_expiry_date || prev.insurance_expiry_date,
      country_of_origin: data.country_of_origin || prev.country_of_origin,
      place_of_issue: data.place_of_issue || prev.place_of_issue
    }));

    setShowDocumentUpload(false);
    setDocumentExtractedSuccess(true); // Show success message
    console.log('Form populated with extracted data successfully');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Create submission data with all fields properly formatted
      const submissionData = {
        ...formData,
        // Ensure VIN field value is also stored in chassis_number field
        chassis_number: formData.vin || formData.chassis_number,
        // Convert numeric fields to proper types
        year: parseInt(formData.year) || new Date().getFullYear(),
        seating_capacity: parseInt(formData.seating_capacity) || 5,
        number_of_doors: parseInt(formData.number_of_doors) || 4,
        daily_rate: parseFloat(formData.daily_rate) || 0,
        monthly_rate: parseFloat(formData.monthly_rate) || 0,
        odometer_reading: parseFloat(formData.odometer_reading) || 0,
        next_service_due_km: parseFloat(formData.next_service_due_km) || 0,
        purchase_price: parseFloat(formData.purchase_price) || 0,
        current_market_value: parseFloat(formData.current_market_value) || 0,
        estimated_present_value: parseFloat(formData.estimated_present_value) || 0,
        // Handle date fields - convert empty strings to null
        purchase_date: formData.purchase_date?.trim() || null,
        insurance_expiry_date: formData.insurance_expiry_date?.trim() || null,
        registration_expiry_date: formData.registration_expiry_date?.trim() || null,
        last_service_date: formData.last_service_date?.trim() || null,
        next_service_due_date: formData.next_service_due_date?.trim() || null,
        tyre_change_date: formData.tyre_change_date?.trim() || null,
        battery_replacement_date: formData.battery_replacement_date?.trim() || null,
        registration_date: formData.registration_date?.trim() || null,
        // Handle image data
        vehicle_photos: formData.vehicle_photos,
        image_set_id: formData.image_set_id === 'none' ? null : formData.image_set_id
      };

      // Remove any remaining empty string fields that should be null
      Object.keys(submissionData).forEach(key => {
        if (submissionData[key] === '') {
          submissionData[key] = null;
        }
      });

      console.log('Submitting vehicle data:', submissionData);
      await onSave(submissionData);
    } catch (error) {
      console.error('Error saving vehicle:', error);

      // Handle specific database constraint errors
      if (error.message.includes('duplicate key value violates unique constraint "vehicle_license_plate_key"')) {
        alert('Error: A vehicle with this license plate already exists. Please use a different license plate number.');
      } else if (error.message.includes('duplicate key value') && error.message.includes('license_plate')) {
        alert('Error: This license plate is already registered. Please check the license plate and try again.');
      } else {
        alert(`Error saving vehicle: ${error.message}`);
      }
    }

    setIsSaving(false);
  };

  return (
    <div className="p-6">
      {/* Header with Title/Icon on left and Upload Button on right */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-teal-100 p-2 rounded-lg">
            <Car className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
        </div>
        <Button
          type="button"
          onClick={() => setShowDocumentUpload(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <UploadCloud className="w-5 h-5 mr-2" />
          Click here to upload document
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Mulkia Data Success Message */}
        {documentExtractedSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">
              ✅ Vehicle data has been automatically filled from your uploaded Mulkia document.
            </p>
          </div>
        )}

        {/* Vehicle Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          <div className="space-y-2">
            <Label htmlFor="license_plate" className="font-semibold text-gray-700">License Plate</Label>
            <Input id="license_plate" name="license_plate" value={formData.license_plate} onChange={handleChange} placeholder="e.g., ABC-123" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="make" className="font-semibold text-gray-700">Make</Label>
            <Input id="make" name="make" value={formData.make} onChange={handleChange} placeholder="e.g., Toyota" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model" className="font-semibold text-gray-700">Model</Label>
            <Input id="model" name="model" value={formData.model} onChange={handleChange} placeholder="e.g., Camry" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year" className="font-semibold text-gray-700">Year</Label>
            <Input id="year" name="year" type="number" value={formData.year} onChange={handleChange} placeholder="e.g., 2023" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color" className="font-semibold text-gray-700">Color</Label>
            <Input id="color" name="color" value={formData.color} onChange={handleChange} placeholder="e.g., Black" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vin" className="font-semibold text-gray-700">VIN</Label>
            <Input id="vin" name="vin" value={formData.vin} onChange={handleChange} placeholder="e.g., 123ABC..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="daily_rate" className="font-semibold text-gray-700">Daily Rate (AED)</Label>
            <Input id="daily_rate" name="daily_rate" type="number" value={formData.daily_rate} onChange={handleChange} placeholder="e.g., 150" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthly_rate" className="font-semibold text-gray-700">Monthly Rate (AED)</Label>
            <Input id="monthly_rate" name="monthly_rate" type="number" value={formData.monthly_rate} onChange={handleChange} placeholder="e.g., 3000" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status" className="font-semibold text-gray-700">Status</Label>
            <Select name="status" onValueChange={(value) => handleSelectChange('status', value)} value={formData.status}>
              <SelectTrigger><SelectValue placeholder="Select status..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Rented">Rented</SelectItem>
                <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicle_class" className="font-semibold text-gray-700">Vehicle Class</Label>
            <Select name="vehicle_class" onValueChange={(value) => handleSelectChange('vehicle_class', value)} value={formData.vehicle_class}>
              <SelectTrigger><SelectValue placeholder="Select class..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Economy">Economy</SelectItem>
                <SelectItem value="Hatch Back">Hatch Back</SelectItem>
                <SelectItem value="Mid-Size Sedan">Mid-Size Sedan</SelectItem>
                <SelectItem value="Luxury">Luxury</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Sports cars">Sports cars</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="variant_trim" className="font-semibold text-gray-700">Variant/Trim</Label>
            <Input id="variant_trim" name="variant_trim" value={formData.variant_trim} onChange={handleChange} placeholder="e.g., LE, XLE" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="engine_number" className="font-semibold text-gray-700">Engine Number</Label>
            <Input id="engine_number" name="engine_number" value={formData.engine_number} onChange={handleChange} placeholder="e.g., ENG12345" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transmission_type" className="font-semibold text-gray-700">Transmission</Label>
            <Select name="transmission_type" onValueChange={(value) => handleSelectChange('transmission_type', value)} value={formData.transmission_type}>
              <SelectTrigger><SelectValue placeholder="Select transmission..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Automatic">Automatic</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fuel_type" className="font-semibold text-gray-700">Fuel Type</Label>
            <Select name="fuel_type" onValueChange={(value) => handleSelectChange('fuel_type', value)} value={formData.fuel_type}>
              <SelectTrigger><SelectValue placeholder="Select fuel type..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Petrol">Petrol</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="chassis_number" className="font-semibold text-gray-700">Chassis Number</Label>
            <Input id="chassis_number" name="chassis_number" value={formData.chassis_number} onChange={handleChange} placeholder="e.g., CHS12345" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body_type" className="font-semibold text-gray-700">Body Type</Label>
            <Select name="body_type" onValueChange={(value) => handleSelectChange('body_type', value)} value={formData.body_type}>
              <SelectTrigger><SelectValue placeholder="Select body type..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Sedan">Sedan</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Hatchback">Hatchback</SelectItem>
                <SelectItem value="Coupe">Coupe</SelectItem>
                <SelectItem value="Convertible">Convertible</SelectItem>
                <SelectItem value="Truck">Truck</SelectItem>
                <SelectItem value="Van">Van</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="odometer_reading" className="font-semibold text-gray-700">Odometer Reading</Label>
            <Input id="odometer_reading" name="odometer_reading" type="number" value={formData.odometer_reading} onChange={handleChange} placeholder="e.g., 50000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="odometer_source" className="font-semibold text-gray-700">Odometer Source</Label>
            <Select name="odometer_source" onValueChange={(value) => handleSelectChange('odometer_source', value)} value={formData.odometer_source}>
              <SelectTrigger><SelectValue placeholder="Select source..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="API">API</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="seating_capacity" className="font-semibold text-gray-700">Seating Capacity</Label>
            <Input id="seating_capacity" name="seating_capacity" type="number" value={formData.seating_capacity} onChange={handleChange} placeholder="e.g., 5" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="number_of_doors" className="font-semibold text-gray-700">Number of Doors</Label>
            <Input id="number_of_doors" name="number_of_doors" type="number" value={formData.number_of_doors} onChange={handleChange} placeholder="e.g., 4" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gps_installed" className="font-semibold text-gray-700">GPS Installed</Label>
            <Select name="gps_installed" onValueChange={(value) => handleSelectChange('gps_installed', value === 'true')} value={String(formData.gps_installed)}>
              <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="font-semibold text-gray-700">Location</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Dubai" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assigned_branch" className="font-semibold text-gray-700">Assigned Branch</Label>
            <Input id="assigned_branch" name="assigned_branch" value={formData.assigned_branch} onChange={handleChange} placeholder="e.g., Downtown Branch" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current_renter" className="font-semibold text-gray-700">Current Renter</Label>
            <Input id="current_renter" name="current_renter" value={formData.current_renter} onChange={handleChange} placeholder="e.g., John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchase_date" className="font-semibold text-gray-700">Purchase Date</Label>
            <Input id="purchase_date" name="purchase_date" type="date" value={formData.purchase_date} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchase_price" className="font-semibold text-gray-700">Purchase Price</Label>
            <Input id="purchase_price" name="purchase_price" type="number" value={formData.purchase_price} onChange={handleChange} placeholder="e.g., 50000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current_market_value" className="font-semibold text-gray-700">Current Market Value</Label>
            <Input id="current_market_value" name="current_market_value" type="number" value={formData.current_market_value} onChange={handleChange} placeholder="e.g., 45000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lease_owned" className="font-semibold text-gray-700">Lease/Owned</Label>
            <Select name="lease_owned" onValueChange={(value) => handleSelectChange('lease_owned', value)} value={formData.lease_owned}>
              <SelectTrigger><SelectValue placeholder="Select status..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Owned">Owned</SelectItem>
                <SelectItem value="Leased">Leased</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="leasing_company" className="font-semibold text-gray-700">Leasing Company</Label>
            <Input id="leasing_company" name="leasing_company" value={formData.leasing_company} onChange={handleChange} placeholder="e.g., ABC Leasing" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurance_provider" className="font-semibold text-gray-700">Insurance Provider</Label>
            <Input id="insurance_provider" name="insurance_provider" value={formData.insurance_provider} onChange={handleChange} placeholder="e.g., XYZ Insurance" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurance_policy_number" className="font-semibold text-gray-700">Insurance Policy Number</Label>
            <Input id="insurance_policy_number" name="insurance_policy_number" value={formData.insurance_policy_number} onChange={handleChange} placeholder="e.g., P123456789" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurance_expiry_date" className="font-semibold text-gray-700">Insurance Expiry Date</Label>
            <Input id="insurance_expiry_date" name="insurance_expiry_date" type="date" value={formData.insurance_expiry_date} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salik_tag_number" className="font-semibold text-gray-700">Salik Tag Number</Label>
            <Input id="salik_tag_number" name="salik_tag_number" value={formData.salik_tag_number} onChange={handleChange} placeholder="e.g., S123456" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="registration_expiry_date" className="font-semibold text-gray-700">Registration Expiry Date</Label>
            <Input id="registration_expiry_date" name="registration_expiry_date" type="date" value={formData.registration_expiry_date} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mortgage_loan_status" className="font-semibold text-gray-700">Mortgage/Loan Status</Label>
            <Input id="mortgage_loan_status" name="mortgage_loan_status" value={formData.mortgage_loan_status} onChange={handleChange} placeholder="e.g., Active, Paid Off" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimated_present_value" className="font-semibold text-gray-700">Estimated Present Value</Label>
            <Input id="estimated_present_value" name="estimated_present_value" type="number" value={formData.estimated_present_value} onChange={handleChange} placeholder="e.g., 40000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_service_date" className="font-semibold text-gray-700">Last Service Date</Label>
            <Input id="last_service_date" name="last_service_date" type="date" value={formData.last_service_date} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="next_service_due_km" className="font-semibold text-gray-700">Next Service Due (KM)</Label>
            <Input id="next_service_due_km" name="next_service_due_km" type="number" value={formData.next_service_due_km} onChange={handleChange} placeholder="e.g., 60000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="next_service_due_date" className="font-semibold text-gray-700">Next Service Due Date</Label>
            <Input id="next_service_due_date" name="next_service_due_date" type="date" value={formData.next_service_due_date} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tyre_change_date" className="font-semibold text-gray-700">Tyre Change Date</Label>
            <Input id="tyre_change_date" name="tyre_change_date" type="date" value={formData.tyre_change_date} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="battery_replacement_date" className="font-semibold text-gray-700">Battery Replacement Date</Label>
            <Input id="battery_replacement_date" name="battery_replacement_date" type="date" value={formData.battery_replacement_date} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service_provider" className="font-semibold text-gray-700">Service Provider</Label>
            <Input id="service_provider" name="service_provider" value={formData.service_provider} onChange={handleChange} placeholder="e.g., Auto Garage" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service_notes" className="font-semibold text-gray-700">Service Notes</Label>
            <Textarea id="service_notes" name="service_notes" value={formData.service_notes} onChange={handleChange} placeholder="Any notes on service history..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accident_history" className="font-semibold text-gray-700">Accident History</Label>
            <Textarea id="accident_history" name="accident_history" value={formData.accident_history} onChange={handleChange} placeholder="Details of any accidents..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="damage_notes" className="font-semibold text-gray-700">Damage Notes</Label>
            <Textarea id="damage_notes" name="damage_notes" value={formData.damage_notes} onChange={handleChange} placeholder="Notes on existing damages..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="health_rating" className="font-semibold text-gray-700">Health Rating</Label>
            <Select name="health_rating" onValueChange={(value) => handleSelectChange('health_rating', value)} value={formData.health_rating}>
              <SelectTrigger><SelectValue placeholder="Select rating..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
                <SelectItem value="Poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="registration_date" className="font-semibold text-gray-700">Registration Date</Label>
            <Input id="registration_date" name="registration_date" type="date" value={formData.registration_date} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country_of_origin" className="font-semibold text-gray-700">Country of Origin</Label>
            <Input id="country_of_origin" name="country_of_origin" value={formData.country_of_origin} onChange={handleChange} placeholder="e.g., Japan" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner_name" className="font-semibold text-gray-700">Owner Name</Label>
            <Input id="owner_name" name="owner_name" value={formData.owner_name} onChange={handleChange} placeholder="e.g., Company Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tc_number" className="font-semibold text-gray-700">TC Number</Label>
            <Input id="tc_number" name="tc_number" value={formData.tc_number} onChange={handleChange} placeholder="e.g., TC12345" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="place_of_issue" className="font-semibold text-gray-700">Place of Issue</Label>
            <Input id="place_of_issue" name="place_of_issue" value={formData.place_of_issue} onChange={handleChange} placeholder="e.g., Dubai" />
          </div>
        </div>

        {/* Image Selection Section */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <Label className="font-semibold text-base mb-2 block">Vehicle Images</Label>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Button
              type="button"
              onClick={() => onOpenImageSelector(formData.make, formData.color, formData.vehicle_photos)}
              className="flex-1 min-w-[200px]"
            >
              <Images className="w-4 h-4 mr-2" />
              Select from Library
            </Button>
            <Select
              value={formData.image_set_id || ''}
              onValueChange={(value) => handleSelectChange('image_set_id', value)}
            >
              <SelectTrigger className="flex-1 min-w-[200px]">
                <SelectValue placeholder="Or select an Image Set ID" />
              </SelectTrigger>
              <SelectContent>
                {imageSetOptions.map(id => <SelectItem key={id} value={id}>{id}</SelectItem>)}
                {/* Option to clear selection if desired */}
                <SelectItem value="none">Clear Selection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.vehicle_photos && formData.vehicle_photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {formData.vehicle_photos.map(url => (
                <div key={url} className="relative group aspect-w-16 aspect-h-9">
                  <img src={url} alt="Vehicle" className="w-full h-full object-cover rounded-md" />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemovePhoto(url)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
            {vehicle ? 'Update Vehicle' : 'Save Vehicle'}
          </Button>
        </div>
      </form>

      {/* Document Upload Dialog */}
      <Dialog open={showDocumentUpload} onOpenChange={setShowDocumentUpload}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Mulkia Document</DialogTitle>
          </DialogHeader>
          <DocumentUploadForm
            vehicles={vehicles}
            onUpload={handleDocumentUpload}
            onCancel={() => setShowDocumentUpload(false)}
            isUploading={documentUploading}
            documentTypes={['Mulkia', 'Insurance', 'Vehicle Pictures', 'Other']}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
