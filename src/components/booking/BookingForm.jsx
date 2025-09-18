
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Calendar as CalendarIcon, 
  Car, 
  User,
  CreditCard,
  Save,
  X,
  AlertTriangle,
  CheckCircle,
  Search
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Customer } from "@/api/entities";
import { SendEmail } from "@/api/integrations";

const vehicleClasses = ["Economy", "Hatch Back", "Mid-Size Sedan", "Luxury", "SUV", "Sports cars"];
const statusOptions = ["Pending", "Confirmed", "Active", "Completed", "Cancelled"];

export default function BookingForm({ booking, vehicles, customers, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(booking || {
    customer_id: '',
    vehicle_id: '',
    booking_date: new Date().toISOString().split('T')[0],
    start_date: '',
    end_date: '',
    pickup_location: '',
    dropoff_location: '',
    total_amount: 0,
    status: 'Pending',
    payment_status: 'Pending',
    special_requests: '',
    customer_name: '',
    customer_email: ''
  });

  const [selectedClass, setSelectedClass] = useState('');
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [customerSuggestions, setCustomerSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (booking) {
      const customer = customers.find(c => c.id === booking.customer_id);
      if (customer) {
        setFormData(prev => ({
          ...prev,
          customer_name: customer.name,
          customer_email: customer.email
        }));
      }
      const vehicle = vehicles.find(v => v.id === booking.vehicle_id);
      if (vehicle) {
        setSelectedClass(vehicle.vehicle_class);
      }
    }
  }, [booking, customers, vehicles]);

  useEffect(() => {
    if (selectedClass && formData.start_date && formData.end_date) {
      checkAvailability();
    }
  }, [selectedClass, formData.start_date, formData.end_date]);

  useEffect(() => {
    if (formData.vehicle_id && availableVehicles.length > 0) {
      calculateTotalAmount();
    }
  }, [formData.vehicle_id, formData.start_date, formData.end_date, availableVehicles]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }

    // Handle customer autocomplete
    if (field === 'customer_name' || field === 'customer_email') {
      if (value.length >= 2) {
        const suggestions = customers.filter(customer =>
          customer.name.toLowerCase().includes(value.toLowerCase()) ||
          customer.email.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5);
        setCustomerSuggestions(suggestions);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }

    // Update end date minimum when start date changes
    if (field === 'start_date' && formData.end_date && value > formData.end_date) {
      setFormData(prev => ({
        ...prev,
        end_date: value
      }));
    }
  };

  const selectCustomer = (customer) => {
    setFormData(prev => ({
      ...prev,
      customer_id: customer.id,
      customer_name: customer.name,
      customer_email: customer.email
    }));
    setShowSuggestions(false);
  };

  const checkAvailability = async () => {
    if (!selectedClass || !formData.start_date || !formData.end_date) return;

    setIsLoadingVehicles(true);
    try {
      // Get vehicles of selected class
      const classVehicles = vehicles.filter(v =>
        v.vehicle_class === selectedClass && v.status === 'Available'
      );

      console.log("Vehicles of selected class:", classVehicles);

      // For now, show all available vehicles of the selected class
      // TODO: Implement proper booking conflict checking with database
      setAvailableVehicles(classVehicles);
    } catch (error) {
      console.error("Error checking availability:", error);
      setAvailableVehicles([]);
    }
    setIsLoadingVehicles(false);
  };

  const calculateTotalAmount = () => {
    const vehicle = availableVehicles.find(v => v.id === formData.vehicle_id);
    if (vehicle && formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const dailyRate = vehicle.daily_rate || 100; // Default rate if not set
      const totalAmount = days * dailyRate;
      
      setFormData(prev => ({
        ...prev,
        total_amount: totalAmount
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.customer_name.trim()) {
      errors.customer_name = "Customer name is required";
    }
    if (!formData.customer_email.trim()) {
      errors.customer_email = "Customer email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.customer_email)) {
      errors.customer_email = "Please enter a valid email address";
    }
    if (!formData.start_date) {
      errors.start_date = "Start date is required";
    }
    if (!formData.end_date) {
      errors.end_date = "End date is required";
    }
    if (formData.start_date && formData.end_date) {
      if (new Date(formData.start_date) >= new Date(formData.end_date)) {
        errors.end_date = "End date must be after start date";
      }
      if (new Date(formData.start_date) < new Date().setHours(0,0,0,0)) {
        errors.start_date = "Start date cannot be in the past";
      }
    }
    if (!formData.vehicle_id) {
      errors.vehicle_id = "Please select a vehicle";
    }
    if (!formData.pickup_location.trim()) {
      errors.pickup_location = "Pickup location is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Create or find customer
      let customerId = formData.customer_id;
      
      if (!customerId) {
        // Check if customer exists by email
        const existingCustomer = customers.find(c => c.email === formData.customer_email);
        if (existingCustomer) {
          customerId = existingCustomer.id;
        } else {
          // Create new customer
          const newCustomer = await Customer.create({
            name: formData.customer_name,
            email: formData.customer_email,
            phone: '', // Could be added to form if needed
            customer_type: 'Individual',
            status: 'Active'
          });
          customerId = newCustomer.id;
        }
      }

      const bookingData = {
        customer_id: customerId,
        vehicle_id: formData.vehicle_id,
        booking_date: formData.booking_date,
        start_date: formData.start_date,
        end_date: formData.end_date,
        pickup_location: formData.pickup_location,
        dropoff_location: formData.dropoff_location || formData.pickup_location,
        total_amount: formData.total_amount,
        status: formData.status,
        payment_status: formData.payment_status,
        special_requests: formData.special_requests
      };

      await onSubmit(bookingData);

      // Send confirmation email if status is Confirmed
      if (formData.status === 'Confirmed') {
        try {
          const vehicle = availableVehicles.find(v => v.id === formData.vehicle_id);
          await SendEmail({
            to: formData.customer_email,
            subject: `Booking Confirmation - ${vehicle?.make} ${vehicle?.model}`,
            body: `
Dear ${formData.customer_name},

Your vehicle booking has been confirmed!

Booking Details:
- Vehicle: ${vehicle?.make} ${vehicle?.model} (${vehicle?.license_plate})
- Dates: ${formData.start_date} to ${formData.end_date}
- Pickup Location: ${formData.pickup_location}
- Total Amount: AED ${formData.total_amount}

Contact us at support@geniusfleets.com for any questions.

Best regards,
Genius Fleets Team
            `
          });
        } catch (emailError) {
          console.error("Failed to send confirmation email:", emailError);
        }
      }

    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Error creating booking: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 relative">
            <Label htmlFor="customer_name">Customer Name *</Label>
            <Input
              id="customer_name"
              value={formData.customer_name}
              onChange={(e) => handleInputChange('customer_name', e.target.value)}
              placeholder="Enter customer name"
              className={validationErrors.customer_name ? "border-red-500" : ""}
            />
            {validationErrors.customer_name && (
              <p className="text-red-500 text-sm">{validationErrors.customer_name}</p>
            )}
            
            {showSuggestions && customerSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                {customerSuggestions.map((customer) => (
                  <div
                    key={customer.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                    onClick={() => selectCustomer(customer)}
                  >
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.email}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customer_email">Customer Email *</Label>
            <Input
              id="customer_email"
              type="email"
              value={formData.customer_email}
              onChange={(e) => handleInputChange('customer_email', e.target.value)}
              placeholder="Enter customer email"
              className={validationErrors.customer_email ? "border-red-500" : ""}
            />
            {validationErrors.customer_email && (
              <p className="text-red-500 text-sm">{validationErrors.customer_email}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Booking Dates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Booking Dates
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start_date">Start Date *</Label>
            <Input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => handleInputChange('start_date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={validationErrors.start_date ? "border-red-500" : ""}
            />
            {validationErrors.start_date && (
              <p className="text-red-500 text-sm">{validationErrors.start_date}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="end_date">End Date *</Label>
            <Input
              id="end_date"
              type="date"
              value={formData.end_date}
              onChange={(e) => handleInputChange('end_date', e.target.value)}
              min={formData.start_date || new Date().toISOString().split('T')[0]}
              className={validationErrors.end_date ? "border-red-500" : ""}
            />
            {validationErrors.end_date && (
              <p className="text-red-500 text-sm">{validationErrors.end_date}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking_date">Booking Date</Label>
            <Input
              id="booking_date"
              type="date"
              value={formData.booking_date}
              onChange={(e) => handleInputChange('booking_date', e.target.value)}
              disabled={!!booking}
            />
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Vehicle Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicle_class">Vehicle Class *</Label>
            <Select
              value={selectedClass}
              onValueChange={setSelectedClass}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle class" />
              </SelectTrigger>
              <SelectContent>
                {vehicleClasses.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedClass && formData.start_date && formData.end_date && (
            <div className="space-y-2">
              <Label htmlFor="vehicle_id">Available Vehicles *</Label>
              {isLoadingVehicles ? (
                <div className="flex items-center gap-2 p-4 border rounded-lg">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
                  <span>Loading available vehicles...</span>
                </div>
              ) : availableVehicles.length > 0 ? (
                <Select
                  value={formData.vehicle_id}
                  onValueChange={(value) => handleInputChange('vehicle_id', value)}
                >
                  <SelectTrigger className={validationErrors.vehicle_id ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVehicles.map(vehicle => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        <div className="flex items-center gap-2">
                          <span>{vehicle.make} {vehicle.model}</span>
                          <Badge variant="outline">{vehicle.license_plate}</Badge>
                          <span className="text-sm text-gray-500">
                            AED {vehicle.daily_rate || 100}/day
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    No vehicles available for the selected class and dates. Please try different dates or vehicle class.
                    <div className="text-xs mt-2 text-gray-500">
                      Debug: Total vehicles: {vehicles.length}, Selected class: "{selectedClass}", Available vehicles: {availableVehicles.length}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              {validationErrors.vehicle_id && (
                <p className="text-red-500 text-sm">{validationErrors.vehicle_id}</p>
              )}
            </div>
          )}

          {formData.vehicle_id && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">
                  Total Amount: AED {Number(formData.total_amount || 0).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location and Additional Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickup_location">Pickup Location *</Label>
            <Input
              id="pickup_location"
              value={formData.pickup_location}
              onChange={(e) => handleInputChange('pickup_location', e.target.value)}
              placeholder="Enter pickup location"
              className={validationErrors.pickup_location ? "border-red-500" : ""}
            />
            {validationErrors.pickup_location && (
              <p className="text-red-500 text-sm">{validationErrors.pickup_location}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dropoff_location">Drop-off Location</Label>
            <Input
              id="dropoff_location"
              value={formData.dropoff_location}
              onChange={(e) => handleInputChange('dropoff_location', e.target.value)}
              placeholder="Same as pickup if empty"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_status">Payment Status</Label>
            <Select
              value={formData.payment_status}
              onValueChange={(value) => handleInputChange('payment_status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Partial">Partial</SelectItem>
                <SelectItem value="Refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="special_requests">Special Requests</Label>
            <Textarea
              id="special_requests"
              value={formData.special_requests}
              onChange={(e) => handleInputChange('special_requests', e.target.value)}
              placeholder="Any special requests or notes"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-teal-500 to-violet-600 hover:from-teal-600 hover:to-violet-700 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {booking ? 'Update Booking' : 'Create Booking'}
        </Button>
      </div>
    </form>
  );
}
