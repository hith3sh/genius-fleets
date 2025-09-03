import React, { useState, useEffect } from 'react';
import { Customer } from '@/api/entities';
import { Booking } from '@/api/entities';
import { Vehicle } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calculator, Eye, Save, Send } from 'lucide-react';

export default function InvoiceForm({ onSubmit, onCancel, editingInvoice = null, bookingData = null }) {
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    client_id: '',
    client_name: '',
    client_email: '',
    client_phone: '',
    client_address: '',
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: '',
    booking_id: '',
    vehicle_details: '',
    rental_period: '',
    rental_amount: 0,
    salik_qty: 0,
    salik_rate: 0,
    salik_amount: 0,
    traffic_fines_qty: 0,
    traffic_fines_rate: 0,
    traffic_fines_amount: 0,
    other_charges_qty: 0,
    other_charges_rate: 0,
    other_charges_amount: 0,
    other_charges_description: '',
    vat_enabled: true,
    vat_rate: 5,
    payment_terms: 'Net 30',
    notes: '',
    status: 'Draft'
  });
  
  const [calculatedAmounts, setCalculatedAmounts] = useState({
    subtotal: 0,
    vat_amount: 0,
    total_amount: 0
  });

  useEffect(() => {
    fetchData();
    
    // Auto-fill from booking data if provided
    if (bookingData) {
      setFormData(prevData => ({
        ...prevData,
        ...bookingData
      }));
    } else if (editingInvoice) {
      setFormData({ ...editingInvoice });
    }
  }, [editingInvoice, bookingData]);

  const fetchData = async () => {
    try {
      const [customersData, bookingsData, vehiclesData] = await Promise.all([
        Customer.list(),
        Booking.list(),
        Vehicle.list()
      ]);
      setCustomers(customersData);
      setBookings(bookingsData);
      setVehicles(vehiclesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateLineAmount = (qty, rate) => {
    return (parseFloat(qty) || 0) * (parseFloat(rate) || 0);
  };

  const calculateAmounts = React.useCallback(() => {
    const rental = parseFloat(formData.rental_amount) || 0;
    const salik = calculateLineAmount(formData.salik_qty, formData.salik_rate);
    const fines = calculateLineAmount(formData.traffic_fines_qty, formData.traffic_fines_rate);
    const others = calculateLineAmount(formData.other_charges_qty, formData.other_charges_rate);

    const subtotal = rental + salik + fines + others;
    const vat_amount = formData.vat_enabled ? (subtotal * 5) / 100 : 0;
    const total_amount = subtotal + vat_amount;

    setCalculatedAmounts({
      subtotal: subtotal.toFixed(2),
      vat_amount: vat_amount.toFixed(2),
      total_amount: total_amount.toFixed(2)
    });

    // Update line amounts in form data
    setFormData(prev => ({
      ...prev,
      salik_amount: salik,
      traffic_fines_amount: fines,
      other_charges_amount: others
    }));
  }, [formData.rental_amount, formData.salik_qty, formData.salik_rate, formData.traffic_fines_qty, formData.traffic_fines_rate, formData.other_charges_qty, formData.other_charges_rate, formData.vat_enabled]);

  useEffect(() => {
    calculateAmounts();
  }, [calculateAmounts]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCustomerChange = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setFormData(prev => ({
        ...prev,
        client_id: customerId,
        client_name: customer.name,
        client_email: customer.email,
        client_phone: customer.phone,
        client_address: customer.address
      }));
    }
  };

  const handleBookingChange = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    const vehicle = vehicles.find(v => v.id === booking?.vehicle_id);
    if (booking) {
      const startDate = new Date(booking.start_date);
      const endDate = new Date(booking.end_date);
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      
      setFormData(prev => ({
        ...prev,
        booking_id: bookingId,
        vehicle_details: vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.license_plate})` : '',
        rental_period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()} (${days} day${days > 1 ? 's' : ''})`,
        rental_amount: booking.total_amount || 0
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      subtotal: parseFloat(calculatedAmounts.subtotal),
      vat_amount: parseFloat(calculatedAmounts.vat_amount),
      total_amount: parseFloat(calculatedAmounts.total_amount),
      due_date: formData.due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    onSubmit(finalData);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer-select">Select Customer</Label>
              <Select value={formData.client_id} onValueChange={handleCustomerChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer..." />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} - {customer.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => handleInputChange('client_name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client_email">Email</Label>
              <Input
                id="client_email"
                type="email"
                value={formData.client_email}
                onChange={(e) => handleInputChange('client_email', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client_phone">Phone</Label>
              <Input
                id="client_phone"
                value={formData.client_phone}
                onChange={(e) => handleInputChange('client_phone', e.target.value)}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="client_address">Address</Label>
              <Textarea
                id="client_address"
                value={formData.client_address}
                onChange={(e) => handleInputChange('client_address', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Invoice Details */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoice_date">Invoice Date</Label>
              <Input
                id="invoice_date"
                type="date"
                value={formData.invoice_date}
                onChange={(e) => handleInputChange('invoice_date', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Input
                id="due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => handleInputChange('due_date', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="booking-select">Select Booking (Optional)</Label>
              <Select value={formData.booking_id} onValueChange={handleBookingChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a booking..." />
                </SelectTrigger>
                <SelectContent>
                  {bookings.map(booking => (
                    <SelectItem key={booking.id} value={booking.id}>
                      Booking #{booking.id.slice(-8).toUpperCase()} - {new Date(booking.start_date).toLocaleDateString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Sent">Sent</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="vehicle_details">Vehicle Details</Label>
              <Input
                id="vehicle_details"
                value={formData.vehicle_details}
                onChange={(e) => handleInputChange('vehicle_details', e.target.value)}
                placeholder="e.g., Toyota Camry (ABC123)"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="rental_period">Rental Period</Label>
              <Input
                id="rental_period"
                value={formData.rental_period}
                onChange={(e) => handleInputChange('rental_period', e.target.value)}
                placeholder="e.g., 01/01/2024 - 31/01/2024 (30 days)"
              />
            </div>
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Vehicle Rental */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Vehicle Rental</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="rental_amount">Amount (AED)</Label>
                  <Input
                    id="rental_amount"
                    type="number"
                    step="0.01"
                    value={formData.rental_amount}
                    onChange={(e) => handleInputChange('rental_amount', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Salik */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Salik</Label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="salik_qty">Quantity</Label>
                  <Input
                    id="salik_qty"
                    type="number"
                    value={formData.salik_qty}
                    onChange={(e) => handleInputChange('salik_qty', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="salik_rate">Rate (AED)</Label>
                  <Input
                    id="salik_rate"
                    type="number"
                    step="0.01"
                    value={formData.salik_rate}
                    onChange={(e) => handleInputChange('salik_rate', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Amount (AED)</Label>
                  <Input
                    value={calculateLineAmount(formData.salik_qty, formData.salik_rate).toFixed(2)}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Traffic Violation Fines */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Traffic Violation Fines</Label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="traffic_fines_qty">Quantity</Label>
                  <Input
                    id="traffic_fines_qty"
                    type="number"
                    value={formData.traffic_fines_qty}
                    onChange={(e) => handleInputChange('traffic_fines_qty', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="traffic_fines_rate">Rate (AED)</Label>
                  <Input
                    id="traffic_fines_rate"
                    type="number"
                    step="0.01"
                    value={formData.traffic_fines_rate}
                    onChange={(e) => handleInputChange('traffic_fines_rate', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Amount (AED)</Label>
                  <Input
                    value={calculateLineAmount(formData.traffic_fines_qty, formData.traffic_fines_rate).toFixed(2)}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Other Charges */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Other Charges</Label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="other_charges_qty">Quantity</Label>
                  <Input
                    id="other_charges_qty"
                    type="number"
                    value={formData.other_charges_qty}
                    onChange={(e) => handleInputChange('other_charges_qty', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label htmlFor="other_charges_rate">Rate (AED)</Label>
                  <Input
                    id="other_charges_rate"
                    type="number"
                    step="0.01"
                    value={formData.other_charges_rate}
                    onChange={(e) => handleInputChange('other_charges_rate', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Amount (AED)</Label>
                  <Input
                    value={calculateLineAmount(formData.other_charges_qty, formData.other_charges_rate).toFixed(2)}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="other_charges_description">Description</Label>
                <Input
                  id="other_charges_description"
                  value={formData.other_charges_description}
                  onChange={(e) => handleInputChange('other_charges_description', e.target.value)}
                  placeholder="Describe the other charges..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* VAT and Totals */}
        <Card>
          <CardHeader>
            <CardTitle>VAT & Totals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* VAT Toggle */}
            <div className="space-y-3">
              <Label className="text-base font-medium">VAT (5%)</Label>
              <RadioGroup
                value={formData.vat_enabled.toString()}
                onValueChange={(value) => handleInputChange('vat_enabled', value === 'true')}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="vat-on" />
                  <Label htmlFor="vat-on">VAT ON</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="vat-off" />
                  <Label htmlFor="vat-off">VAT OFF</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Calculated Totals */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal:</span>
                <span className="font-semibold">AED {calculatedAmounts.subtotal}</span>
              </div>
              {formData.vat_enabled && (
                <div className="flex justify-between items-center">
                  <span className="font-medium">VAT (5%):</span>
                  <span className="font-semibold">AED {calculatedAmounts.vat_amount}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold">Total Amount:</span>
                <span className="font-bold text-green-600">AED {calculatedAmounts.total_amount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payment_terms">Payment Terms</Label>
              <Select value={formData.payment_terms} onValueChange={(value) => handleInputChange('payment_terms', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Net 15">Net 15</SelectItem>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                  <SelectItem value="Net 45">Net 45</SelectItem>
                  <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Additional notes or terms..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            <Save className="mr-2 h-4 w-4" />
            Save Invoice
          </Button>
        </div>
      </form>
    </div>
  );
}