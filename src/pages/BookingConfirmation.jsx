import React, { useState, useEffect } from 'react';
import { Booking } from '@/api/entities';
import { Customer } from '@/api/entities';
import { Vehicle } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Car, User, MapPin, Phone, Mail } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function BookingConfirmation() {
  const [booking, setBooking] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBookingDetails();
  }, []);

  const loadBookingDetails = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const bookingId = urlParams.get('bookingId');
      
      if (!bookingId) {
        setError('No booking ID provided');
        setIsLoading(false);
        return;
      }

      // Load booking details
      const bookingData = await Booking.get(bookingId);
      setBooking(bookingData);

      // Load customer and vehicle details
      const [customerData, vehicleData] = await Promise.all([
        Customer.get(bookingData.customer_id),
        Vehicle.get(bookingData.vehicle_id)
      ]);
      
      setCustomer(customerData);
      setVehicle(vehicleData);
    } catch (error) {
      console.error('Error loading booking details:', error);
      setError('Failed to load booking details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your booking confirmation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              ⚠️
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Missing Customer Information</h3>
            <p className="text-gray-600 mb-6">We couldn't find your customer details. Please go back to the booking process to provide them.</p>
            <Button onClick={() => window.location.href = createPageUrl('MobileBooking')}>
              Back to Booking Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const days = Math.ceil((new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <Card className="mb-6 border-0 shadow-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-green-100 text-lg">Thank you for choosing Genius Fleets</p>
            <div className="mt-4 bg-white/20 rounded-lg p-3 inline-block">
              <p className="text-sm">Booking ID</p>
              <p className="text-xl font-bold">{booking.id.slice(-8).toUpperCase()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Customer Information */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold">{customer.name}</p>
                <p className="text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {customer.email}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {customer.phone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Information */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-green-600" />
                Vehicle Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vehicle.vehicle_photos && vehicle.vehicle_photos.length > 0 && (
                <img
                  src={vehicle.vehicle_photos[vehicle.vehicle_photos.length - 1]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold">{vehicle.make} {vehicle.model}</h3>
              <p className="text-gray-600">License Plate: {vehicle.license_plate}</p>
              <p className="text-gray-600">Class: {vehicle.vehicle_class}</p>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Booking Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Rental Period</h4>
                <p><strong>From:</strong> {new Date(booking.start_date).toLocaleDateString()}</p>
                <p><strong>To:</strong> {new Date(booking.end_date).toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {days} day{days > 1 ? 's' : ''}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Payment Summary</h4>
                <p><strong>Daily Rate:</strong> AED {vehicle.daily_rate}</p>
                <p><strong>Subtotal:</strong> AED {booking.total_amount.toFixed(2)}</p>
                <p><strong>VAT (5%):</strong> AED {booking.vat_amount.toFixed(2)}</p>
                <p className="text-lg font-bold text-green-600"><strong>Total:</strong> AED {booking.final_amount.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            A confirmation email has been sent to {customer.email}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = createPageUrl('MobileBooking')}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
            >
              Make Another Booking
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.print()}
            >
              Print Confirmation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}