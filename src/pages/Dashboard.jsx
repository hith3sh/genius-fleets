import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Vehicle } from "@/api/entities";
import { Customer } from "@/api/entities";
import { Booking } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock } from
"lucide-react";

import DashboardStats from "../components/dashboard/DashboardStats";
import FleetOverview from "../components/dashboard/FleetOverview";
import RecentBookings from "../components/dashboard/RecentBookings";
import StatListDialog from "../components/dashboard/StatListDialog";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    totalCustomers: 0,
    activeBookings: 0,
    monthlyRevenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dialogData, setDialogData] = useState({ isOpen: false, title: '', items: [], columns: [] });

  useEffect(() => {
    if (user && !authLoading) {
      loadDashboardData();
    }
  }, [user, authLoading]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Load stats
      const [vehicles, customers, bookings] = await Promise.all([
        Vehicle.list(),
        Customer.list(),
        Booking.list()
      ]);

      const availableVehicles = vehicles.filter((v) => v.status === 'Available').length;
      const activeBookings = bookings.filter((b) => b.status === 'Active').length;
      const monthlyRevenue = bookings.
        filter((b) => b.status === 'Completed').
        reduce((sum, b) => sum + (b.total_amount || 0), 0);

      setStats({
        totalVehicles: vehicles.length,
        availableVehicles,
        totalCustomers: customers.length,
        activeBookings,
        monthlyRevenue
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };
  
  const handleStatCardClick = async (cardType) => {
    let title = '';
    let items = [];
    let columns = [];

    setIsLoading(true);
    try {
      switch (cardType) {
        case 'totalVehicles':
          title = 'All Vehicles';
          items = await Vehicle.list();
          columns = [
            { header: 'Make', accessor: 'make' },
            { header: 'Model', accessor: 'model' },
            { header: 'Plate', accessor: 'license_plate' },
            { header: 'Status', accessor: 'status' },
          ];
          break;
        case 'availableVehicles':
          title = 'Available Vehicles';
          items = await Vehicle.filter({ status: 'Available' });
          columns = [
            { header: 'Make', accessor: 'make' },
            { header: 'Model', accessor: 'model' },
            { header: 'Plate', accessor: 'license_plate' },
            { header: 'Location', accessor: 'location' },
          ];
          break;
        case 'totalCustomers':
          title = 'All Customers';
          items = await Customer.list();
          columns = [
            { header: 'Name', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Phone', accessor: 'phone' },
            { header: 'Status', accessor: 'status' },
          ];
          break;
        case 'activeBookings':
          title = 'Active Bookings';
          items = await Booking.filter({ status: 'Active' });
          columns = [
            { header: 'Customer ID', accessor: 'customer_id' },
            { header: 'Vehicle ID', accessor: 'vehicle_id' },
            { header: 'Start Date', accessor: 'start_date' },
            { header: 'End Date', accessor: 'end_date' },
          ];
          break;
        default:
          break;
      }
      setDialogData({ isOpen: true, title, items, columns });
    } catch (error) {
      console.error(`Error fetching data for ${cardType}:`, error);
      alert(`Could not load data for ${title}.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="ml-4 text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-rose-50 via-purple-100 to-blue-100 min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl text-3xl font-bold">Management Dashboard</h1>
          <p className="text-gray-600 mt-1 font-medium">
            Welcome back, {user?.full_name}. Here's your fleet's real-time overview.
          </p>
        </div>
        <div className="text-right p-4 rounded-xl bg-white/70 backdrop-blur-sm shadow-md border border-white/30">
          <div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</div>
          <div className="text-lg font-semibold text-violet-800">
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>

      <DashboardStats stats={stats} isLoading={isLoading} onCardClick={handleStatCardClick} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FleetOverview isLoading={isLoading} />
        </div>
        <div>
          <RecentBookings isLoading={isLoading} />
        </div>
      </div>
      
      <StatListDialog
        isOpen={dialogData.isOpen}
        onOpenChange={(isOpen) => setDialogData(prev => ({ ...prev, isOpen }))}
        title={dialogData.title}
        items={dialogData.items}
        columns={dialogData.columns}
      />
    </div>
  );
}