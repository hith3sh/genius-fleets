import React, { useState, useEffect } from 'react';
import { Booking } from '@/api/entities';
import { Customer } from '@/api/entities';
import { Vehicle } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Car, Calendar, Clock, DollarSign, Users, MapPin, ShieldCheck, Mail, Phone, UserCheck, CheckCircle } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

export default function BookingReview() {
  const [bookingData, setBookingData] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [costs, setCosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('completedBookingData');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setBookingData(parsedData);
        setVehicle(parsedData.vehicleDetails);
        setCosts(parsedData.costs);
      } catch (error) {
        console.error("Error parsing booking data:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const generateBookingConfirmationFile = (booking, customer, vehicle, costs) => {
    const vehicleImage = vehicle.vehicle_photos && vehicle.vehicle_photos.length > 0 ? vehicle.vehicle_photos[vehicle.vehicle_photos.length - 1] : '';
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation - ${booking.id.slice(-8).toUpperCase()}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
        }
        .header {
            background: linear-gradient(135deg, #0d9488, #1d4ed8);
            color: white;
            padding: 2rem;
            text-align: center;
            border-radius: 12px 12px 0 0;
            margin-bottom: 0;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5rem;
            font-weight: bold;
        }
        .header p {
            margin: 0.5rem 0 0 0;
            opacity: 0.9;
            font-size: 1.1rem;
        }
        .content {
            background: white;
            padding: 2rem;
            border: 1px solid #e5e7eb;
            border-top: none;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .section {
            margin: 2rem 0;
            padding: 1.5rem;
            border-radius: 8px;
            border-left: 4px solid;
        }
        .booking-info { 
            background: #f8fafc; 
            border-left-color: #3b82f6; 
        }
        .vehicle-info { 
            background: #f0f9ff; 
            border-left-color: #06b6d4; 
        }
        .payment-info { 
            background: #f0fdf4; 
            border-left-color: #10b981; 
        }
        .location-info { 
            background: #fefce8; 
            border-left-color: #f59e0b; 
        }
        .contact-info { 
            background: #f3f4f6; 
            border-left-color: #6b7280; 
        }
        .section h3 {
            color: #1f2937;
            margin: 0 0 1rem 0;
            font-size: 1.3rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .vehicle-image {
            width: 100%;
            max-width: 400px;
            border-radius: 8px;
            margin: 1rem 0;
            border: 2px solid #e5e7eb;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        .info-item {
            padding: 0.5rem 0;
        }
        .info-label {
            font-weight: bold;
            color: #374151;
        }
        .info-value {
            color: #6b7280;
            margin-top: 0.25rem;
        }
        .total-amount {
            font-size: 1.4rem;
            font-weight: bold;
            color: #059669;
            text-align: center;
            background: #ecfdf5;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
            border: 2px solid #10b981;
        }
        .booking-id {
            background: white;
            color: #1d4ed8;
            padding: 1rem;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.2rem;
            text-align: center;
            margin: 1rem 0;
            border: 2px solid #3b82f6;
        }
        .footer {
            background: #1f2937;
            color: white;
            padding: 1.5rem;
            text-align: center;
            border-radius: 8px;
            margin-top: 2rem;
        }
        .print-info {
            text-align: center;
            margin: 2rem 0;
            padding: 1rem;
            background: #fef3c7;
            border-radius: 8px;
            border: 1px solid #f59e0b;
        }
        @media print {
            body { background-color: white; }
            .print-info { display: none; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚗 Booking Confirmed!</h1>
        <p>Thank you for choosing Genius Fleets</p>
    </div>
    
    <div class="content">
        <div class="print-info">
            <strong>💡 Tip:</strong> Save this page (Ctrl+S) or print it (Ctrl+P) for your records
        </div>

        <div class="booking-id">
            📋 Booking ID: ${booking.id.slice(-8).toUpperCase()}
        </div>

        <p style="font-size: 1.1rem;"><strong>Dear ${customer.name},</strong></p>
        <p>Your vehicle rental booking has been successfully confirmed. Here are your complete booking details:</p>
        
        <div class="section booking-info">
            <h3>📋 Booking Information</h3>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Booking Date:</div>
                    <div class="info-value">${new Date(booking.booking_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Rental Period:</div>
                    <div class="info-value">${new Date(booking.start_date).toLocaleDateString()} to ${new Date(booking.end_date).toLocaleDateString()}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Duration:</div>
                    <div class="info-value">${costs.days} day${costs.days > 1 ? 's' : ''}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Status:</div>
                    <div class="info-value" style="color: #059669; font-weight: bold;">✅ Confirmed</div>
                </div>
            </div>
        </div>
        
        <div class="section vehicle-info">
            <h3>🚙 Vehicle Details</h3>
            ${vehicleImage ? `<img src="${vehicleImage}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-image" />` : ''}
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Vehicle:</div>
                    <div class="info-value">${vehicle.make} ${vehicle.model} (${vehicle.year})</div>
                </div>
                <div class="info-item">
                    <div class="info-label">License Plate:</div>
                    <div class="info-value">${vehicle.license_plate}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Class:</div>
                    <div class="info-value">${vehicle.vehicle_class}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Transmission:</div>
                    <div class="info-value">${vehicle.transmission_type || 'Automatic'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Fuel Type:</div>
                    <div class="info-value">${vehicle.fuel_type || 'Petrol'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Seating:</div>
                    <div class="info-value">${vehicle.seating_capacity} passengers</div>
                </div>
            </div>
        </div>
        
        <div class="section payment-info">
            <h3>💰 Payment Summary</h3>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Daily Rate:</div>
                    <div class="info-value">AED ${vehicle.daily_rate}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Duration:</div>
                    <div class="info-value">${costs.days} days</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Subtotal:</div>
                    <div class="info-value">AED ${(costs.totalAmount || 0).toFixed(2)}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">VAT (5%):</div>
                    <div class="info-value">AED ${(costs.vatAmount || 0).toFixed(2)}</div>
                </div>
            </div>
            <div class="total-amount">
                💳 Total Amount: AED ${(costs.finalAmount || 0).toFixed(2)}
            </div>
        </div>
        
        <div class="section location-info">
            <h3>📍 Pickup & Drop-off Details</h3>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Pickup Location:</div>
                    <div class="info-value">${booking.pickup_location || 'To be confirmed'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Drop-off Location:</div>
                    <div class="info-value">${booking.dropoff_location || 'To be confirmed'}</div>
                </div>
            </div>
            ${booking.special_requests ? `
            <div class="info-item">
                <div class="info-label">Special Requests:</div>
                <div class="info-value">${booking.special_requests}</div>
            </div>` : ''}
        </div>
        
        <div class="section contact-info">
            <h3>📞 Customer Information</h3>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Name:</div>
                    <div class="info-value">${customer.name}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Email:</div>
                    <div class="info-value">${customer.email}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Phone:</div>
                    <div class="info-value">${customer.phone}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Residency Status:</div>
                    <div class="info-value">${customer.residency_status}</div>
                </div>
            </div>
        </div>
        
        <div class="section contact-info">
            <h3>📞 Contact Genius Fleets</h3>
            <p>If you have any questions or need to make changes to your booking, please contact us:</p>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Phone:</div>
                    <div class="info-value">+971-XXX-XXXX</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Email:</div>
                    <div class="info-value">support@geniusfleets.com</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Website:</div>
                    <div class="info-value">www.geniusfleets.com</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Business Hours:</div>
                    <div class="info-value">24/7 Support Available</div>
                </div>
            </div>
        </div>
        
        <div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: #f0f9ff; border-radius: 8px;">
            <p style="color: #1e40af; font-weight: bold; margin: 0;">Thank you for choosing Genius Fleets!</p>
            <p style="color: #6b7280; margin: 0.5rem 0 0 0;">We look forward to providing you with excellent service.</p>
        </div>
    </div>
    
    <div class="footer">
        <p style="margin: 0; font-size: 0.9rem;">© 2024 Genius Fleets. All rights reserved.</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.8rem; opacity: 0.8;">AI-First Car Rental Management System</p>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Booking_Confirmation_${booking.id.slice(-8).toUpperCase()}_${customer.name.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleConfirmBooking = async () => {
    setIsConfirming(true);
    try {
      let customer = (await Customer.filter({ email: bookingData.customerEmail }))[0];
      const customerData = {
        name: bookingData.customerName,
        email: bookingData.customerEmail,
        phone: bookingData.customerPhone,
        residency_status: bookingData.residencyStatus,
        driving_license_url: bookingData.documents.driving_license_url,
        passport_url: bookingData.documents.passport_url,
        visa_page_url: bookingData.documents.visa_page_url,
        emirates_id_url: bookingData.documents.emirates_id_url,
      };

      if (customer) {
        customer = await Customer.update(customer.id, customerData);
      } else {
        customer = await Customer.create(customerData);
      }

      const newBookingData = {
        customer_id: customer.id,
        vehicle_id: vehicle.id,
        booking_date: new Date().toISOString().split('T')[0],
        start_date: bookingData.startDate,
        end_date: bookingData.endDate,
        pickup_location: bookingData.locationDetails.pickup_location,
        dropoff_location: bookingData.locationDetails.dropoff_location,
        total_amount: costs.totalAmount,
        vat_amount: costs.vatAmount,
        final_amount: costs.finalAmount,
        status: 'Confirmed',
        payment_status: 'Pending',
        special_requests: bookingData.locationDetails.special_requests,
      };
      const newBooking = await Booking.create(newBookingData);

      generateBookingConfirmationFile(newBooking, customer, vehicle, costs);

      localStorage.removeItem('pendingBooking');
      localStorage.removeItem('completedBookingData');
      localStorage.removeItem('customerSignupInfo'); // Clear signup info after successful booking
      window.location.href = createPageUrl(`BookingConfirmation?bookingId=${newBooking.id}`);

    } catch (error) {
      console.error('Failed to confirm booking:', error);
      alert('An error occurred while confirming your booking. Please try again.');
    } finally {
      setIsConfirming(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!bookingData || !vehicle || !costs) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-lg text-center p-8 shadow-lg">
          <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Missing Booking Information</h2>
          <p className="text-gray-600 my-4">
            We couldn't find your booking details. This may happen if the page was refreshed. Please start the booking process again.
          </p>
          <Button 
            onClick={() => window.location.href = createPageUrl('MobileBooking')}
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white"
          >
            Back to Booking Page
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="max-w-4xl mx-auto shadow-2xl">
          <CardHeader className="bg-gray-100 p-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Booking Review
            </h1>
            <p className="text-gray-600 mt-2">Please review your details below and confirm your booking.</p>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {/* Customer Details */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-3"><UserCheck className="text-blue-600"/>Customer Details</h3>
              <p><strong>Name:</strong> {bookingData.customerName}</p>
              <p><strong>Email:</strong> {bookingData.customerEmail}</p>
              <p><strong>Phone:</strong> {bookingData.customerPhone}</p>
              <p><strong>Residency:</strong> {bookingData.residencyStatus}</p>
            </div>

            {/* Vehicle Details */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-3"><Car className="text-blue-600"/>Vehicle Details</h3>
              {vehicle.vehicle_photos && vehicle.vehicle_photos.length > 0 && (
                <img src={vehicle.vehicle_photos[vehicle.vehicle_photos.length - 1]} alt="Vehicle" className="w-full max-w-sm rounded-lg mb-4 mx-auto" />
              )}
              <p><strong>Vehicle:</strong> {vehicle.make} {vehicle.model} ({vehicle.year})</p>
              <p><strong>Class:</strong> {vehicle.vehicle_class}</p>
            </div>

            {/* Booking & Cost Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-3"><Calendar className="text-blue-600"/>Booking Period</h3>
                <p><strong>Start Date:</strong> {new Date(bookingData.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(bookingData.endDate).toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {costs.days} day(s)</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-3"><DollarSign className="text-blue-600"/>Cost Summary</h3>
                <p><strong>Subtotal:</strong> AED {(costs.totalAmount || 0).toFixed(2)}</p>
                <p><strong>VAT (5%):</strong> AED {(costs.vatAmount || 0).toFixed(2)}</p>
                <p className="font-bold text-lg mt-2"><strong>Total:</strong> AED {(costs.finalAmount || 0).toFixed(2)}</p>
              </div>
            </div>
             <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-3"><MapPin className="text-blue-600"/>Location Details</h3>
                <p><strong>Pickup:</strong> {bookingData.locationDetails.pickup_location || 'Not specified'}</p>
                <p><strong>Drop-off:</strong> {bookingData.locationDetails.dropoff_location || 'Not specified'}</p>
                 {bookingData.locationDetails.special_requests && <p><strong>Requests:</strong> {bookingData.locationDetails.special_requests}</p>}
            </div>

            <Button onClick={handleConfirmBooking} className="w-full text-lg py-6 bg-gradient-to-r from-green-500 to-teal-500 text-white" disabled={isConfirming}>
                {isConfirming ? 'Confirming...' : 'Confirm & Download Receipt'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}