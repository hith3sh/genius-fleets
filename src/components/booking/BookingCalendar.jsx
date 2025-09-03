
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Plus,
  FileText
} from "lucide-react";
import { generateMonthlyInvoice } from "@/api/functions";

const statusColors = {
  'Pending': 'bg-yellow-500',
  'Confirmed': 'bg-blue-500',
  'Active': 'bg-green-500',
  'Completed': 'bg-gray-500',
  'Cancelled': 'bg-red-500'
};

export default function BookingCalendar({ bookings, vehicles, customers, onBookingClick, onCreateBooking }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + direction);
    setCurrentDate(newDate);
  };
  
  const handleGenerateInvoice = async () => {
    setIsGeneratingInvoice(true);
    try {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        
        const { data, status } = await generateMonthlyInvoice({ month, year });

        if (status === 200) {
             const blob = new Blob([data], { type: 'application/pdf' });
             const url = window.URL.createObjectURL(blob);
             const a = document.createElement('a');
             a.href = url;
             a.download = `invoice-${year}-${String(month + 1).padStart(2, '0')}.pdf`;
             document.body.appendChild(a);
             a.click();
             window.URL.revokeObjectURL(url);
             a.remove();
        } else {
             const errorData = JSON.parse(new TextDecoder().decode(data));
             alert(errorData.message || 'An error occurred generating the invoice.');
        }

    } catch (error) {
        console.error("Error generating invoice:", error);
        alert("Failed to generate invoice. Please check the console for details.");
    }
    setIsGeneratingInvoice(false);
  };

  const getBookingsForDate = (date) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return bookings.filter(booking => {
      const startDate = new Date(booking.start_date);
      const endDate = new Date(booking.end_date);
      const checkDate = new Date(dateString);
      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer?.name || 'Unknown';
  };

  const getVehicleInfo = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle';
  };

  const renderCalendarGrid = () => {
    const days = [];
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-[120px] border border-gray-200"></div>);
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const dayBookings = getBookingsForDate(date);
      const isToday = isCurrentMonth && today.getDate() === date;

      days.push(
        <div
          key={date}
          className={`min-h-[120px] border border-gray-200 p-2 ${
            isToday ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
          } transition-colors`}
        >
          <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {date}
            {isToday && <span className="ml-1 text-xs">(Today)</span>}
          </div>
          
          <div className="space-y-1 overflow-y-auto max-h-20">
            {dayBookings.slice(0, 3).map((booking) => (
              <div
                key={booking.id}
                onClick={() => onBookingClick(booking)}
                className="cursor-pointer p-1 rounded text-xs text-white truncate"
                style={{ backgroundColor: statusColors[booking.status] }}
                title={`${getCustomerName(booking.customer_id)} - ${getVehicleInfo(booking.vehicle_id)}`}
              >
                {getCustomerName(booking.customer_id).split(' ')[0]} - {getVehicleInfo(booking.vehicle_id).split(' ')[0]}
              </div>
            ))}
            {dayBookings.length > 3 && (
              <div className="text-xs text-gray-500 text-center">
                +{dayBookings.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const monthlyStats = useMemo(() => {
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0);
    
    const monthBookings = bookings.filter(booking => {
      const bookingStart = new Date(booking.start_date);
      const bookingEnd = new Date(booking.end_date);
      return (bookingStart <= monthEnd && bookingEnd >= monthStart);
    });

    const stats = {
      total: monthBookings.length,
      pending: monthBookings.filter(b => b.status === 'Pending').length,
      confirmed: monthBookings.filter(b => b.status === 'Confirmed').length,
      active: monthBookings.filter(b => b.status === 'Active').length,
      completed: monthBookings.filter(b => b.status === 'Completed').length,
      cancelled: monthBookings.filter(b => b.status === 'Cancelled').length
    };

    return stats;
  }, [bookings, currentMonth, currentYear]);

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">
                {monthNames[currentMonth]} {currentYear}
              </CardTitle>
              <p className="text-gray-600">{monthlyStats.total} bookings this month</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}> <ChevronLeft className="w-4 h-4" /> </Button>
              <Button variant="outline" onClick={() => setCurrentDate(new Date())}> Today </Button>
              <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}> <ChevronRight className="w-4 h-4" /> </Button>
              <Button onClick={onCreateBooking} className="bg-gradient-to-r from-teal-500 to-violet-600 hover:from-teal-600 hover:to-violet-700"> <Plus className="w-4 h-4 mr-2" /> Create New Booking </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Monthly Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{monthlyStats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{monthlyStats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{monthlyStats.confirmed}</div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{monthlyStats.active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{monthlyStats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{monthlyStats.cancelled}</div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </CardContent>
        </Card>
      </div>

      {/* Status Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium text-gray-700">Status Legend:</span>
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded`} style={{ backgroundColor: color }}></div>
                <span className="text-sm text-gray-600">{status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-0">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-3 text-center font-medium text-gray-600 border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {renderCalendarGrid()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
