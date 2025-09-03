import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Car, 
  User, 
  MapPin, 
  CreditCard, 
  Phone, 
  Mail,
  Edit,
  X
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
  'Active': 'bg-green-100 text-green-800 border-green-200',
  'Completed': 'bg-gray-100 text-gray-800 border-gray-200',
  'Cancelled': 'bg-red-100 text-red-800 border-red-200'
};

const paymentStatusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Paid': 'bg-green-100 text-green-800',
  'Partial': 'bg-orange-100 text-orange-800',
  'Refunded': 'bg-gray-100 text-gray-800'
};

export default function BookingDetails({ booking, customer, vehicle, onEdit, onClose, onStatusUpdate }) {
  const calculateDays = () => {
    const startDate = new Date(booking.start_date);
    const endDate = new Date(booking.end_date);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  const handleStatusChange = (newStatus) => {
    onStatusUpdate(booking, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Booking #{booking.id.slice(-8).toUpperCase()}
          </h2>
          <p className="text-gray-600">
            Created on {new Date(booking.created_date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onEdit} variant="outline" className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Status and Payment */}
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Status</span>
              <Select value={booking.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-32">
                  <Badge className={statusColors[booking.status]}>
                    {booking.status}
                  </Badge>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Payment</span>
              <Badge className={paymentStatusColors[booking.payment_status]}>
                {booking.payment_status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-violet-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {customer.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                <p className="text-sm text-gray-600">{customer.customer_type || 'Individual'}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{customer.email}</span>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{customer.phone}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-500 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-sm text-gray-600">{vehicle.vehicle_class}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">License Plate</span>
                <span className="text-sm font-medium">{vehicle.license_plate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Year</span>
                <span className="text-sm font-medium">{vehicle.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Color</span>
                <span className="text-sm font-medium">{vehicle.color || 'N/A'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Rental Period</label>
                <div className="mt-1">
                  <p className="text-lg font-semibold">
                    {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">{calculateDays()} days</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Pickup Location</p>
                    <p className="text-sm text-gray-600">{booking.pickup_location}</p>
                  </div>
                </div>
                {booking.dropoff_location && booking.dropoff_location !== booking.pickup_location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Drop-off Location</p>
                      <p className="text-sm text-gray-600">{booking.dropoff_location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Total Amount</label>
                <div className="mt-1">
                  <p className="text-2xl font-bold text-gray-900">
                    AED {booking.total_amount?.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-sm text-gray-600">
                    AED {(booking.total_amount / calculateDays()).toFixed(2)} per day
                  </p>
                </div>
              </div>

              {booking.special_requests && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Special Requests</label>
                  <p className="mt-1 text-sm text-gray-900 p-3 bg-gray-50 rounded-md">
                    {booking.special_requests}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Rental ({calculateDays()} days)</span>
              <span>AED {booking.total_amount?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Security Deposit</span>
              <span>AED 0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Additional Fees</span>
              <span>AED 0.00</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount</span>
                <span>AED {booking.total_amount?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}