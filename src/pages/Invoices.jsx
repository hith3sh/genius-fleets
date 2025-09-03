import React, { useState, useEffect } from 'react';
import { Invoice } from '@/api/entities';
import { Booking } from '@/api/entities';
import { Customer } from '@/api/entities';
import { Vehicle } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Eye, FileText, Printer, X } from 'lucide-react';
import InvoiceForm from '../components/finance/InvoiceForm';

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

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  
  // Invoice view modal states
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [invoiceViewData, setInvoiceViewData] = useState(null);
  const [isLoadingInvoiceView, setIsLoadingInvoiceView] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  useEffect(() => {
    filterInvoices();
  }, [invoices, searchTerm, statusFilter]);

  const loadInvoices = async () => {
    setIsLoading(true);
    try {
      const data = await Invoice.list('-created_date');
      setInvoices(data);
    } catch (error) {
      console.error('Error loading invoices:', error);
    }
    setIsLoading(false);
  };

  const filterInvoices = () => {
    let filtered = invoices;

    if (searchTerm) {
      filtered = filtered.filter(invoice =>
        invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === statusFilter);
    }

    setFilteredInvoices(filtered);
  };

  const loadInvoiceViewData = async (invoice) => {
    setIsLoadingInvoiceView(true);
    try {
      let booking = null;
      let customer = null;
      let vehicle = null;

      // Try to load related data if available
      if (invoice.booking_id) {
        try {
          booking = await Booking.get(invoice.booking_id);
          if (booking) {
            if (booking.customer_id) {
              try {
                customer = await Customer.get(booking.customer_id);
              } catch (e) {
                console.warn('Customer not found:', e);
              }
            }
            if (booking.vehicle_id) {
              try {
                vehicle = await Vehicle.get(booking.vehicle_id);
              } catch (e) {
                console.warn('Vehicle not found:', e);
              }
            }
          }
        } catch (e) {
          console.warn('Booking not found:', e);
        }
      }

      // If no customer found from booking, try to find by client_id or name
      if (!customer && invoice.client_id) {
        try {
          customer = await Customer.get(invoice.client_id);
        } catch (e) {
          console.warn('Customer not found by client_id:', e);
        }
      }

      // Create fallback customer data if still not found
      if (!customer) {
        customer = {
          name: invoice.client_name || 'N/A',
          email: 'N/A'
        };
      }

      setInvoiceViewData({
        invoice,
        booking,
        customer,
        vehicle
      });
    } catch (error) {
      console.error("Failed to load invoice view data:", error);
      // Create minimal data to still show the invoice
      setInvoiceViewData({
        invoice,
        booking: null,
        customer: {
          name: invoice.client_name || 'N/A',
          email: 'N/A'
        },
        vehicle: null
      });
    } finally {
      setIsLoadingInvoiceView(false);
    }
  };

  const handleSubmit = async (invoiceData) => {
    try {
      if (editingInvoice) {
        await Invoice.update(editingInvoice.id, invoiceData);
      } else {
        // Generate invoice number
        const invoiceNumber = `INV-${Date.now()}`;
        await Invoice.create({
          ...invoiceData,
          invoice_number: invoiceNumber
        });
      }
      setShowForm(false);
      setEditingInvoice(null);
      loadInvoices();
    } catch (error) {
      console.error('Error saving invoice:', error);
      alert('Error saving invoice');
    }
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setShowForm(true);
  };

  const handleDelete = async (invoice) => {
    if (window.confirm(`Are you sure you want to delete invoice ${invoice.invoice_number}?`)) {
      try {
        await Invoice.delete(invoice.id);
        loadInvoices();
      } catch (error) {
        console.error('Error deleting invoice:', error);
        alert('Error deleting invoice');
      }
    }
  };

  const handleView = async (invoice) => {
    setViewingInvoice(invoice);
    setShowInvoiceModal(true);
    await loadInvoiceViewData(invoice);
  };

  const handlePrintInvoice = () => {
    const printContent = document.getElementById('invoice-print-content');
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${viewingInvoice?.invoice_number}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .invoice-header { display: flex; justify-content: space-between; align-items: start; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 20px; }
            .invoice-title { font-size: 24px; font-weight: bold; }
            .invoice-details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
            .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .invoice-table th { background-color: #f5f5f5; }
            .invoice-footer { display: flex; justify-content: space-between; align-items: start; margin-top: 20px; }
            .total-section { text-align: right; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Paid': 'bg-green-100 text-green-800',
      'Unpaid': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const renderInvoiceView = () => {
    if (isLoadingInvoiceView) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!invoiceViewData) {
      return (
        <div className="text-center text-red-500 p-8">
          Could not load invoice data. Please try again.
        </div>
      );
    }

    const { invoice, booking, customer, vehicle } = invoiceViewData;
    const vat = (invoice.amount || 0) * ((invoice.tax || 5) / 100);
    const total = (invoice.amount || 0) + vat;
    
    let days = 1;
    let dailyRate = invoice.amount || 0;
    
    if (booking && booking.start_date && booking.end_date) {
      days = Math.ceil((new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24)) || 1;
      dailyRate = (invoice.amount || 0) / days;
    }

    return (
      <div id="invoice-print-content" className="bg-white p-8">
        <header className="flex justify-between items-start pb-8 border-b">
          <div className="flex-1 text-left">
            <h2 className="text-lg font-bold text-gray-800">Billed to:</h2>
            <p className="text-gray-600">{customer.name}</p>
            <p className="text-gray-600">{customer.email}</p>
          </div>
          <div className="flex-1 text-center">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bf4adeb3e_GeniusFleetsLogo.png" 
              alt="Genius Fleets Logo" 
              className="w-24 mx-auto" 
            />
          </div>
          <div className="flex-1 text-right">
            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-gray-500"># {invoice.invoice_number}</p>
            <p className="text-gray-500">Date: {new Date(invoice.invoice_date).toLocaleDateString('en-GB')}</p>
          </div>
        </header>

        <main className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Invoice Details</h3>
            <div className="text-sm space-y-1 text-gray-600">
              <p><strong>Invoice #:</strong> {invoice.invoice_number}</p>
              <p><strong>Invoice Date:</strong> {new Date(invoice.invoice_date).toLocaleDateString('en-GB')}</p>
              <p><strong>Due Date:</strong> {new Date(invoice.due_date).toLocaleDateString('en-GB')}</p>
              <p><strong>Status:</strong> {invoice.status}</p>
            </div>
          </div>
          
          {booking ? (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Booking Details</h3>
              <div className="text-sm space-y-1 text-gray-600">
                <p><strong>Booking Ref #:</strong> {booking.id.slice(-8).toUpperCase()}</p>
                <p><strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleDateString('en-GB')}</p>
                <p><strong>Rental Period:</strong> {new Date(booking.start_date).toLocaleDateString('en-GB')} - {new Date(booking.end_date).toLocaleDateString('en-GB')}</p>
                <p><strong>Duration:</strong> {days} days</p>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Service Details</h3>
              <div className="text-sm space-y-1 text-gray-600">
                <p><strong>Service:</strong> Car Rental Service</p>
                <p><strong>Duration:</strong> {days} day(s)</p>
              </div>
            </div>
          )}
        </main>

        {vehicle && (
          <div className="mt-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Vehicle Information</h3>
              <div className="text-sm space-y-1 text-gray-600">
                <p><strong>Vehicle:</strong> {vehicle.make} {vehicle.model}</p>
                <p><strong>Class:</strong> {vehicle.vehicle_class}</p>
                <p><strong>License Plate:</strong> {vehicle.license_plate}</p>
                <p><strong>Year:</strong> {vehicle.year}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-sm font-semibold text-gray-600">Item</th>
                <th className="p-2 text-sm font-semibold text-gray-600 text-center">Quantity</th>
                <th className="p-2 text-sm font-semibold text-gray-600 text-right">Price (AED)</th>
                <th className="p-2 text-sm font-semibold text-gray-600 text-right">Amount (AED)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">
                  {vehicle ? `Vehicle Rental (${vehicle.make} ${vehicle.model})` : 'Car Rental Service'}
                </td>
                <td className="p-2 text-center">{`${days} days`}</td>
                <td className="p-2 text-right">{dailyRate.toFixed(2)}</td>
                <td className="p-2 text-right">{(invoice.amount || 0).toFixed(2)}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">{`VAT (${invoice.tax || 5}%)`}</td>
                <td className="p-2 text-center">-</td>
                <td className="p-2 text-right">-</td>
                <td className="p-2 text-right">{vat.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer className="mt-8 flex justify-between items-start">
          <div>
            <p className="font-semibold text-gray-700">Payment Status: <span className="font-normal text-gray-600">{invoice.status}</span></p>
            {invoice.notes && (
              <>
                <p className="font-semibold text-gray-700 mt-4">Note:</p>
                <p className="text-gray-600">{invoice.notes}</p>
              </>
            )}
            <p className="font-bold text-gray-800 mt-8">GENIUS FLEETS</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Subtotal: <span className="font-semibold text-gray-700 w-24 inline-block">{(invoice.amount || 0).toFixed(2)}</span></p>
            <p className="text-gray-500">VAT ({invoice.tax || 5}%): <span className="font-semibold text-gray-700 w-24 inline-block">{vat.toFixed(2)}</span></p>
            <p className="text-lg font-bold text-gray-800 mt-2">Total: <span className="w-24 inline-block">AED {total.toFixed(2)}</span></p>
            <p className="text-sm font-semibold text-gray-700 mt-4">Amount in Words:</p>
            <p className="text-sm text-gray-500">{numberToWordsAED(total)}</p>
          </div>
        </footer>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by invoice number or client name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>INVOICE #</TableHead>
                  <TableHead>CLIENT</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>DUE DATE</TableHead>
                  <TableHead>AMOUNT</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={7}>
                        <div className="animate-pulse bg-gray-200 h-4 rounded"></div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No invoices found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono font-medium">
                        {invoice.invoice_number}
                      </TableCell>
                      <TableCell>{invoice.client_name}</TableCell>
                      <TableCell>
                        {new Date(invoice.invoice_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.due_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        AED {invoice.amount?.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(invoice)}
                            className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                            title="View Invoice"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(invoice)}
                            className="h-8 w-8 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                            title="Edit Invoice"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(invoice)}
                            className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                            title="Delete Invoice"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
            </DialogTitle>
          </DialogHeader>
          <InvoiceForm
            initialData={editingInvoice}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingInvoice(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Invoice View Modal */}
      <Dialog open={showInvoiceModal} onOpenChange={setShowInvoiceModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Invoice {viewingInvoice?.invoice_number}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrintInvoice}
                className="ml-4"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </DialogTitle>
          </DialogHeader>
          {renderInvoiceView()}
        </DialogContent>
      </Dialog>
    </div>
  );
}