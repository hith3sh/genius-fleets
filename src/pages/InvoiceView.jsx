
import React, { useState, useEffect } from 'react';
import { Invoice } from '@/api/entities';
import { Booking } from '@/api/entities';
import { Customer } from '@/api/entities';
import { Vehicle } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Loader2, Printer } from 'lucide-react';
import { createPageUrl } from '@/utils';

// Helper function to convert number to words for AED
function numberToWordsAED(amount) {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Million', 'Billion'];

    function convertChunk(num) {
        if (num === 0) return '';
        if (num < 10) return ones[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
        if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' and ' + convertChunk(num % 100) : '');
        return '';
    }
    
    if (amount === null || typeof amount === 'undefined' || amount === 0) return 'Zero Dirhams Only';

    const amountStr = amount.toFixed(2);
    const [dirhamsStr, filsStr] = amountStr.split('.');
    let dirhamsNum = parseInt(dirhamsStr, 10);
    const filsNum = parseInt(filsStr, 10);

    let words = '';
    if (dirhamsNum === 0) {
         words = 'Zero Dirhams';
    } else {
        let scaleIndex = 0;
        let dirhamWords = '';
        while (dirhamsNum > 0) {
            if (dirhamsNum % 1000 !== 0) {
                dirhamWords = convertChunk(dirhamsNum % 1000) + ' ' + scales[scaleIndex] + ' ' + dirhamWords;
            }
            dirhamsNum = Math.floor(dirhamsNum / 1000);
            scaleIndex++;
        }
        words = dirhamWords.trim() + ' Dirhams';
    }

    if (filsNum > 0) {
        words += ' and ' + convertChunk(filsNum) + ' Fils';
    }
    
    return (words.trim() + ' Only').replace(/\s\s+/g, ' ');
}

export default function InvoiceView() {
  const [invoice, setInvoice] = useState(null);
  const [booking, setBooking] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const invoiceId = urlParams.get('id');
    if (invoiceId) {
      loadInvoiceData(invoiceId);
    }
  }, []);

  const loadInvoiceData = async (invoiceId) => {
    setIsLoading(true);
    try {
      const inv = await Invoice.get(invoiceId);
      if (!inv) throw new Error("Invoice not found");

      const [book, cust, veh] = await Promise.all([
        Booking.get(inv.booking_id),
        Customer.get(inv.client_id),
        Vehicle.get(inv.booking_id ? (await Booking.get(inv.booking_id)).vehicle_id : null)
      ]);
      
      setInvoice(inv);
      setBooking(book);
      setCustomer(cust);
      setVehicle(veh);

    } catch (error) {
      console.error("Failed to load invoice data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!invoice || !booking || !customer || !vehicle) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Could not load invoice data. Please try again.
      </div>
    );
  }

  // Safe calculations with default values
  const rentalAmount = parseFloat(invoice.rental_amount) || 0;
  const salikQty = parseFloat(invoice.salik_qty) || 0;
  const salikRate = parseFloat(invoice.salik_rate) || 0;
  const salikAmount = salikQty * salikRate;
  
  const finesQty = parseFloat(invoice.traffic_fines_qty) || 0;
  const finesRate = parseFloat(invoice.traffic_fines_rate) || 0;
  const finesAmount = finesQty * finesRate;
  
  const otherQty = parseFloat(invoice.other_charges_qty) || 0;
  const otherRate = parseFloat(invoice.other_charges_rate) || 0;
  const otherAmount = otherQty * otherRate;
  
  const subtotal = rentalAmount + salikAmount + finesAmount + otherAmount;
  const vatEnabled = invoice.vat_enabled !== false;
  const vatRate = vatEnabled ? (parseFloat(invoice.vat_rate) || 5) : 0;
  const vat = vatEnabled ? (subtotal * vatRate) / 100 : 0;
  const total = subtotal + vat;
  
  const days = booking?.start_date && booking?.end_date ? 
    Math.ceil((new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24)) || 1 : 1;

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-section, #invoice-section * {
            visibility: visible;
          }
          #invoice-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          
          /* Compact print styles */
          @media print {
            .compact-text {
              line-height: 1.2 !important;
              margin: 0 !important;
            }
            .compact-section {
              margin-bottom: 0.5rem !important;
            }
            .compact-table td, .compact-table th {
              padding: 0.25rem !important;
              line-height: 1.1 !important;
            }
          }
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <div className="no-print flex justify-end mb-4 gap-2">
            <Button variant="outline" onClick={() => window.location.href = createPageUrl('Invoices')}>Back to Invoices</Button>
            <Button onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" />
                Print / Save as PDF
            </Button>
        </div>

        <div id="invoice-section" className="bg-white shadow-lg">
          {/* Header Section */}
          <div className="p-4 text-center">
            <div className="flex justify-center mb-2">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2b4d1bbdc_AlJisrCarRentals.png" 
                alt="Al Jisr Car Rentals Logo" 
                className="h-16 w-auto object-contain" 
              />
            </div>
            <div className="text-gray-600 text-xs mb-1 compact-text">
              <p>Al Jisr Car Rental Management</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-left">
                <p className="text-xs text-gray-500 compact-text">{new Date().toLocaleDateString('en-US')} {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                <div className="mt-1">
                  <p className="text-xs font-medium compact-text">Billed to:</p>
                  <p className="text-sm font-bold text-gray-800 compact-text">{customer.name || 'Unknown Customer'}</p>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold text-gray-800 compact-text">INVOICE</h1>
                <div className="mt-1">
                  <p className="text-sm text-gray-600 compact-text">#{invoice.invoice_number || 'INV-2025-####'}</p>
                  <p className="text-xs text-gray-500 compact-text">Date: {invoice.invoice_date ? new Date(invoice.invoice_date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Details Section */}
          <div className="px-4 pb-4">
            {/* Booking and Vehicle Information - Side by Side */}
            <div className="flex gap-2 mb-3 compact-section">
              {/* Booking Details */}
              <div className="flex-1 bg-gray-50 p-2 rounded">
                <h3 className="text-xs font-bold text-gray-800 mb-1 compact-text">Booking Details</h3>
                <div className="space-y-0 text-xs compact-text">
                  <p><strong>Booking Ref #:</strong> {booking.id ? booking.id.slice(-8).toUpperCase() : 'N/A'}</p>
                  <p><strong>Booking Date:</strong> {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString('en-GB') : new Date(booking.created_date).toLocaleDateString('en-GB')}</p>
                  <p><strong>Rental Period:</strong> {booking.start_date && booking.end_date ? `${new Date(booking.start_date).toLocaleDateString('en-GB')} - ${new Date(booking.end_date).toLocaleDateString('en-GB')}` : 'N/A'}</p>
                  <p><strong>Duration:</strong> {days} day{days > 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="flex-1 bg-gray-50 p-2 rounded">
                <h3 className="text-xs font-bold text-gray-800 mb-1 compact-text">Vehicle Information</h3>
                <div className="space-y-0 text-xs compact-text">
                  <p><strong>Vehicle:</strong> {vehicle.make || 'N/A'} {vehicle.model || ''}</p>
                  <p><strong>Class:</strong> {vehicle.vehicle_class || 'N/A'}</p>
                  <p><strong>License Plate:</strong> {vehicle.license_plate || 'N/A'}</p>
                  <p><strong>Year:</strong> {vehicle.year || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Invoice Items Table */}
            <div className="mb-4 compact-section">
              <table className="w-full border-collapse border border-gray-300 compact-table">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left text-xs">DESCRIPTION</th>
                    <th className="border border-gray-300 p-2 text-center text-xs">QTY</th>
                    <th className="border border-gray-300 p-2 text-right text-xs">RATE (AED)</th>
                    <th className="border border-gray-300 p-2 text-right text-xs">AMOUNT (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 text-xs">Vehicle Rental: {vehicle.make} {vehicle.model}</td>
                    <td className="border border-gray-300 p-2 text-center text-xs">{days}</td>
                    <td className="border border-gray-300 p-2 text-right text-xs">{(rentalAmount / days).toFixed(2)}</td>
                    <td className="border border-gray-300 p-2 text-right text-xs font-medium">{rentalAmount.toFixed(2)}</td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 p-2 text-xs">Salik</td>
                    <td className="border border-gray-300 p-2 text-center text-xs">{salikQty || 1}</td>
                    <td className="border border-gray-300 p-2 text-right text-xs">{salikRate.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2 text-right text-xs font-medium">{salikAmount.toFixed(2)}</td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 p-2 text-xs">Traffic Violation Fines</td>
                    <td className="border border-gray-300 p-2 text-center text-xs">{finesQty || 1}</td>
                    <td className="border border-gray-300 p-2 text-right text-xs">{finesRate.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2 text-right text-xs font-medium">{finesAmount.toFixed(2)}</td>
                  </tr>
                  
                  <tr>
                    <td className="border border-gray-300 p-2 text-xs">Other Charges</td>
                    <td className="border border-gray-300 p-2 text-center text-xs">{otherQty || 1}</td>
                    <td className="border border-gray-300 p-2 text-right text-xs">{otherRate.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2 text-right text-xs font-medium">{otherAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Notes */}
            <div className="mb-3 compact-section">
              <h4 className="text-xs font-bold text-gray-800 mb-1 compact-text">Notes:</h4>
              <p className="text-xs text-gray-600 compact-text">{invoice.notes || `Invoice for Booking #${booking.id ? booking.id.slice(-8).toUpperCase() : 'N/A'}`}</p>
            </div>

            {/* Bank Details */}
            <div className="mb-3 compact-section">
              <h4 className="text-xs font-bold text-gray-800 mb-1 compact-text">Bank Details:</h4>
              <p className="text-xs text-gray-600 compact-text">Bank Name: Al Jisr Bank | Account Name: Al Jisr Car Rentals | IBAN: AE123456789012345678901</p>
            </div>

            {/* Totals Section */}
            <div className="space-y-1 mb-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium compact-text">Subtotal:</span>
                <span className="text-xs font-medium compact-text">{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium compact-text">Discount:</span>
                <span className="text-xs font-medium compact-text">0</span>
              </div>
              {vatEnabled && (
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium flex items-center compact-text">
                    <input type="checkbox" checked readOnly className="mr-1" />
                    VAT ({vatRate}%):
                  </span>
                  <span className="text-xs font-medium compact-text">{vat.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm font-bold pt-1 border-t">
                <span className="compact-text">Grand Total:</span>
                <span className="compact-text">AED {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Amount in Words */}
            <div className="text-center mb-3">
              <p className="text-xs font-medium compact-text">Amount in Words: {numberToWordsAED(total)}</p>
            </div>

            {/* Company Footer */}
            <div className="text-center">
              <p className="text-sm font-bold text-gray-800 compact-text">AL JISR CAR RENTALS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
