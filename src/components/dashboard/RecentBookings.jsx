
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking } from "@/api/entities";
import { Customer } from "@/api/entities";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const statusColors = {
  'Confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
  'Active': 'bg-green-100 text-green-800 border-green-200',
  'Completed': 'bg-gray-100 text-gray-800 border-gray-200',
  'Cancelled': 'bg-red-100 text-red-800 border-red-200'
};

export default function RecentBookings({ isLoading }) {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState({});

  useEffect(() => {
    if (!isLoading) {
      loadBookings();
    }
  }, [isLoading]);

  const loadBookings = async () => {
    try {
      console.log('🔍 RecentBookings: Loading bookings and customers...');
      
      // Test direct Supabase queries like we did for customers
      const { supabase } = await import('@/lib/railway-db');
      
      // Load bookings using Entity API and sort client-side
      console.log('🔍 RecentBookings: Fetching bookings...');
      const allBookings = await Booking.list();

      // Sort by created_at descending and take first 6
      const bookingsData = allBookings
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 6);

      console.log('✅ RecentBookings: Bookings loaded:', bookingsData?.length || 0);
      
      // Load customers using Entity API
      console.log('🔍 RecentBookings: Fetching customers...');
      const customersData = await Customer.list();
      console.log('✅ RecentBookings: Customers loaded:', customersData?.length || 0);
      
      // Create customer lookup
      const customerLookup = {};
      customersData.forEach(customer => {
        customerLookup[customer.id] = customer;
      });
      
      setBookings(bookingsData || []);
      setCustomers(customerLookup);
    } catch (error) {
      console.error("❌ RecentBookings: Error loading data:", error);
      console.error("❌ RecentBookings: Error details:", error.message);
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-violet-600" />
          Recent Bookings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="p-4 rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-3 w-32 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => {
              const customer = customers[booking.customer_id];
              return (
                <div
                  key={booking.id}
                  className="p-4 rounded-xl border hover:shadow-md hover:border-violet-200 transition-all duration-200 bg-white"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">
                        {customer?.name || 'Unknown Customer'}
                      </span>
                    </div>
                    <Badge className={statusColors[booking.status] || statusColors['Confirmed']}>
                      {booking.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {format(new Date(booking.start_date), 'MMM d')} - {format(new Date(booking.end_date), 'MMM d')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {booking.pickup_location || 'Pickup location TBD'}
                      </span>
                      <span className="font-semibold text-gray-900">
                        ${(booking.total_amount || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            {bookings.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent bookings found.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
