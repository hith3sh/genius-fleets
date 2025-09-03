
import React, { useState, useEffect, useCallback } from "react";
import { Booking } from "@/api/entities";
import { Vehicle } from "@/api/entities";
import { Customer } from "@/api/entities";
import { Invoice } from "@/api/entities";
import { Agreement } from "@/api/entities"; // New import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Filter,
  Calendar as CalendarIcon,
  Car,
  User,
  Edit,
  Trash2,
  Eye,
  FileText,
  AlertCircle,
  FileCheck,
  MoreHorizontal
} from "lucide-react"; // Changed import from lucide-icon to lucide-react
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
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import BookingForm from "../components/booking/BookingForm";
import BookingDetails from "../components/booking/BookingDetails";
import BookingCalendar from "../components/booking/BookingCalendar";
import InvoiceForm from "../components/finance/InvoiceForm";
import AgreementForm from "../components/booking/AgreementForm"; // New import
import { createPageUrl } from '@/utils';

const statusColors = {
  'Pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Confirmed': 'bg-blue-50 text-blue-700 border-blue-200',
  'Active': 'bg-green-50 text-green-700 border-green-200',
  'Completed': 'bg-gray-50 text-gray-700 border-gray-200',
  'Cancelled': 'bg-red-50 text-red-700 border-red-200'
};

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentView, setCurrentView] = useState("list");
  // const [invoicingBooking, setInvoicingBooking] = useState(null); // This state is replaced by new logic
  const [showInvoiceForm, setShowInvoiceForm] = useState(false); // NEW state for invoice form visibility
  const [invoiceFormData, setInvoiceFormData] = useState(null); // NEW state for pre-filling invoice form
  const [agreementBooking, setAgreementBooking] = useState(null); // New state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingInvoiceInfo, setExistingInvoiceInfo] = useState(null);
  const [showExistingInvoiceDialog, setShowExistingInvoiceDialog] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [bookingsData, vehiclesData, customersData, invoicesData] = await Promise.all([
        Booking.list('-created_date'),
        Vehicle.list(),
        Customer.list(),
        Invoice.list()
      ]);
      setBookings(bookingsData);
      setVehicles(vehiclesData);
      setCustomers(customersData);
      setInvoices(invoicesData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const filterBookings = useCallback(() => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(booking => {
        const customer = customers.find(c => c.id === booking.customer_id);
        const vehicle = vehicles.find(v => v.id === booking.vehicle_id);
        return (
          customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle?.license_plate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.id?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    if (classFilter !== "all") {
      filtered = filtered.filter(booking => {
        const vehicle = vehicles.find(v => v.id === booking.vehicle_id);
        return vehicle?.vehicle_class === classFilter;
      });
    }

    if (dateFilter.start) {
      filtered = filtered.filter(booking =>
        new Date(booking.start_date) >= new Date(dateFilter.start)
      );
    }

    if (dateFilter.end) {
      filtered = filtered.filter(booking =>
        new Date(booking.end_date) <= new Date(dateFilter.end)
      );
    }

    setFilteredBookings(filtered);
  }, [bookings, customers, vehicles, searchTerm, statusFilter, classFilter, dateFilter]);

  useEffect(() => {
    filterBookings();
  }, [filterBookings]);

  const handleSubmit = async (bookingData) => {
    try {
      if (editingBooking) {
        await Booking.update(editingBooking.id, bookingData);
      } else {
        await Booking.create(bookingData);
      }
      setShowForm(false);
      setEditingBooking(null);
      loadData();
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Error saving booking: " + error.message);
    }
  };

  // handleInvoiceSubmit is removed as its logic is now inline in the Dialog's InvoiceForm onSubmit
  // const handleInvoiceSubmit = async (invoiceData) => { ... };

  const handleCreateInvoice = async (booking) => {
    try {
      // Get customer and vehicle details
      const customer = customers.find(c => c.id === booking.customer_id);
      const vehicle = vehicles.find(v => v.id === booking.vehicle_id);
      
      // Calculate rental period
      const startDate = new Date(booking.start_date);
      const endDate = new Date(booking.end_date);
      // Adding +1 to include both start and end days in the count
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      // Prepare invoice data from booking
      const invoiceData = {
        booking_id: booking.id,
        client_id: booking.customer_id,
        client_name: customer?.name || 'Unknown Customer',
        client_email: customer?.email || '',
        client_phone: customer?.phone || '',
        client_address: customer?.address || '',
        invoice_date: new Date().toISOString().split('T')[0],
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
        rental_amount: booking.total_amount || 0,
        salik_amount: 0,
        traffic_fines_amount: 0,
        other_charges_amount: 0,
        other_charges_description: '',
        vehicle_details: vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.license_plate})` : 'Vehicle Details Not Available',
        rental_period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()} (${days} day${days > 1 ? 's' : ''})`,
        vat_rate: 5,
        payment_terms: 'Net 30',
        notes: `Invoice for Booking #${booking.id.slice(-8).toUpperCase()}`, // Kept original formatting
        status: 'Draft'
      };
      
      setInvoiceFormData(invoiceData);
      setShowInvoiceForm(true);
    } catch (error) {
      console.error('Error preparing invoice data:', error);
      alert('Error preparing invoice. Please try again.');
    }
  };

  const handleAgreementSubmit = async (agreementData) => { // New function
    if (!agreementBooking) return;
    
    setIsSubmitting(true);
    try {
      const newAgreement = await Agreement.create(agreementData);
      alert('Agreement created successfully!');
      setAgreementBooking(null);
      // TODO: Generate PDF functionality can be added here, maybe redirect to AgreementView?
    } catch (error) {
      console.error("Error creating agreement:", error);
      alert('Failed to create agreement. Please check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  const handleDelete = async (bookingId) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      try {
        await Booking.delete(bookingId);
        loadData();
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Error deleting booking: " + error.message);
      }
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const handleStatusUpdate = async (booking, newStatus) => {
    try {
      await Booking.update(booking.id, { ...booking, status: newStatus });
      loadData();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status: " + error.message);
    }
  };

  const getCustomerInfo = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    // Include phone and address for invoice data
    return customer || { name: 'Unknown Customer', email: 'N/A', phone: 'N/A', address: 'N/A' };
  };

  const getVehicleInfo = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle || { make: 'Unknown', model: 'Vehicle', license_plate: 'N/A', vehicle_class: 'N/A' };
  };

  const handleInvoiceIconClick = (booking) => {
    const existingInvoice = invoices.find(inv => inv.booking_id === booking.id);
    if (existingInvoice) {
      setExistingInvoiceInfo(existingInvoice);
      setShowExistingInvoiceDialog(true);
    } else {
      handleCreateInvoice(booking); // Call the new function to prepare and open invoice form
    }
  };

  const handleAgreement = (booking) => { // Updated function
    setAgreementBooking(booking);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
            <CalendarIcon className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent">
              Booking Management
            </h1>
            <p className="text-gray-600 mt-1">Manage vehicle reservations and customer bookings</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-teal-500 to-violet-600 hover:from-teal-600 hover:to-violet-700 text-white shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Booking
          </Button>
        </div>
      </div>

      {/* View Tabs */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <Tabs value={currentView} onValueChange={setCurrentView} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-6 space-y-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by customer name, email, vehicle plate, or booking ID..."
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
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
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

              {/* Date Range Filter */}
              <div className="flex gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From Date</label>
                  <Input
                    type="date"
                    value={dateFilter.start}
                    onChange={(e) => setDateFilter(prev => ({...prev, start: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To Date</label>
                  <Input
                    type="date"
                    value={dateFilter.end}
                    min={dateFilter.start || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDateFilter(prev => ({...prev, end: e.target.value}))}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => setDateFilter({ start: "", end: "" })}
                    className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                  >
                    Clear Dates
                  </Button>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {['Pending', 'Confirmed', 'Active', 'Completed', 'Cancelled'].map((status) => {
                  const count = bookings.filter(b => b.status === status).length;
                  return (
                    <Card
                      key={status}
                      className={`${statusColors[status]} border cursor-pointer hover:shadow-lg hover:border-violet-400 transition-all duration-200`}
                      onClick={() => setStatusFilter(status)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{status}</p>
                            <p className="text-2xl font-bold">{count}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-white/50">
                            <CalendarIcon className="w-5 h-5" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Bookings Table */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-teal-600" />
                    Bookings ({filteredBookings.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50/50">
                          <TableHead>Booking ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Vehicle</TableHead>
                          <TableHead>Dates</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          Array(5).fill(0).map((_, i) => (
                            <TableRow key={i}>
                              <TableCell colSpan={7} className="h-16">
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
                          filteredBookings.map((booking) => {
                            const customer = getCustomerInfo(booking.customer_id);
                            const vehicle = getVehicleInfo(booking.vehicle_id);
                            return (
                              <TableRow key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                                <TableCell>
                                  <div className="font-medium text-gray-900">
                                    #{booking.id.slice(-8).toUpperCase()}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {new Date(booking.created_date).toLocaleDateString()}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-teal-100 to-violet-100 rounded-full flex items-center justify-center">
                                      <User className="w-4 h-4 text-teal-600" />
                                    </div>
                                    <div>
                                      <div className="font-semibold text-gray-900">{customer.name}</div>
                                      <div className="text-sm text-gray-500">{customer.email}</div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-green-100 rounded-full flex items-center justify-center">
                                      <Car className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <div className="font-semibold text-gray-900">
                                        {vehicle.make} {vehicle.model}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {vehicle.license_plate} • {vehicle.vehicle_class}
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="space-y-1">
                                    <div className="text-sm font-medium">
                                      {new Date(booking.start_date).toLocaleDateString()} -
                                      {new Date(booking.end_date).toLocaleDateString()}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {Math.ceil((new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24))} days
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="font-semibold text-gray-900">
                                    AED {booking.total_amount?.toFixed(2) || '0.00'}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={booking.status}
                                    onValueChange={(newStatus) => handleStatusUpdate(booking, newStatus)}
                                  >
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
                                </TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="hover:bg-gray-50">
                                        <MoreHorizontal className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleViewDetails(booking)}>
                                        <Eye className="w-4 h-4 mr-2" />
                                        View
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleEdit(booking)}>
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDelete(booking.id)}>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleInvoiceIconClick(booking)}>
                                        <FileText className="w-4 h-4 mr-2" />
                                        Invoice
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleAgreement(booking)}>
                                        <FileText className="w-4 h-4 mr-2" />
                                        Agreement
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  {!isLoading && filteredBookings.length === 0 && (
                    <div className="text-center py-12">
                      <CalendarIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                      <p className="text-gray-500 mb-4">
                        {searchTerm || statusFilter !== "all" || classFilter !== "all" || dateFilter.start || dateFilter.end
                          ? "Try adjusting your search or filters"
                          : "Get started by creating your first booking"}
                      </p>
                      <Button
                        onClick={() => setShowForm(true)}
                        className="bg-gradient-to-r from-teal-500 to-violet-600 hover:from-teal-600 hover:to-violet-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Booking
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <BookingCalendar
                bookings={bookings}
                vehicles={vehicles}
                customers={customers}
                onBookingClick={handleViewDetails}
                onCreateBooking={() => setShowForm(true)}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Booking Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="bg-teal-100 p-2 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-teal-600" />
              </div>
              {editingBooking ? 'Edit Booking' : 'Create New Booking'}
            </DialogTitle>
          </DialogHeader>
          <BookingForm
            booking={editingBooking}
            vehicles={vehicles}
            customers={customers}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingBooking(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Booking Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="bg-blue-100 p-2 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
              </div>
              Booking Details
            </DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <BookingDetails
              booking={selectedBooking}
              customer={getCustomerInfo(selectedBooking.customer_id)}
              vehicle={getVehicleInfo(selectedBooking.vehicle_id)}
              onEdit={() => {
                setSelectedBooking(null);
                handleEdit(selectedBooking);
              }}
              onClose={() => setSelectedBooking(null)}
              onStatusUpdate={handleStatusUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Invoice Form Dialog */}
      <Dialog open={showInvoiceForm} onOpenChange={setShowInvoiceForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl"> {/* Preserved original styling for consistency */}
              <div className="bg-orange-100 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              Create Invoice
            </DialogTitle>
          </DialogHeader>
          {invoiceFormData && ( // Preserved conditional rendering
            <InvoiceForm
              bookingData={invoiceFormData}
              onSubmit={async (invoiceData) => {
                try {
                  // Calculate final amounts (Preserved original calculation logic for precision)
                  const rental = parseFloat(invoiceData.rental_amount) || 0;
                  const salik = parseFloat(invoiceData.salik_amount) || 0;
                  const fines = parseFloat(invoiceData.traffic_fines_amount) || 0;
                  const others = parseFloat(invoiceData.other_charges_amount) || 0;
                  const subtotal = rental + salik + fines + others;
                  const vat_rate_decimal = (invoiceData.vat_rate || 5) / 100; // Convert percentage to decimal
                  const vat_amount = subtotal * vat_rate_decimal;
                  const total_amount = subtotal + vat_amount;

                  const finalInvoiceData = {
                    ...invoiceData,
                    invoice_number: `INV-${Date.now()}`,
                    subtotal: parseFloat(subtotal.toFixed(2)),
                    vat_amount: parseFloat(vat_amount.toFixed(2)),
                    total_amount: parseFloat(total_amount.toFixed(2))
                  };

                  const newInvoice = await Invoice.create(finalInvoiceData); // Preserved newInvoice variable
                  setShowInvoiceForm(false);
                  setInvoiceFormData(null);
                  alert('Invoice created successfully!');
                  loadData(); // Reload all data to include the new invoice
                  window.location.href = createPageUrl(`InvoiceView?id=${newInvoice.id}`); // Preserved redirection logic
                } catch (error) {
                  console.error('Error creating invoice:', error);
                  alert('Error creating invoice. Please try again.');
                }
              }}
              onCancel={() => {
                setShowInvoiceForm(false);
                setInvoiceFormData(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Existing Invoice Warning Dialog */}
      <Dialog open={showExistingInvoiceDialog} onOpenChange={setShowExistingInvoiceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="w-6 h-6" />
              Invoice Exists
            </DialogTitle>
          </DialogHeader>
          {existingInvoiceInfo && (
             <Alert variant="destructive">
               <AlertCircle className="h-4 w-4" />
               <AlertTitle>INVOICE ALREADY CREATED</AlertTitle>
               <AlertDescription className="mt-2 space-y-1">
                 <p>An invoice for this booking has already been generated.</p>
                 <p><strong>Invoice Number:</strong> {existingInvoiceInfo.invoice_number}</p>
                 <p><strong>Date Created:</strong> {new Date(existingInvoiceInfo.created_date).toLocaleDateString()}</p>
               </AlertDescription>
             </Alert>
          )}
          <DialogFooter className="mt-4">
             <Button variant="outline" onClick={() => setShowExistingInvoiceDialog(false)}>Close</Button>
             <Button onClick={() => window.location.href = createPageUrl(`InvoiceView?id=${existingInvoiceInfo.id}`)}>
                View Invoice
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Agreement Form Dialog */}
      <Dialog open={!!agreementBooking} onOpenChange={(isOpen) => !isOpen && setAgreementBooking(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              Create Agreement from Booking
            </DialogTitle>
          </DialogHeader>
          {agreementBooking && (
            <AgreementForm
              booking={agreementBooking}
              customer={getCustomerInfo(agreementBooking.customer_id)}
              vehicle={getVehicleInfo(agreementBooking.vehicle_id)}
              onSubmit={handleAgreementSubmit}
              onCancel={() => setAgreementBooking(null)}
              isLoading={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
