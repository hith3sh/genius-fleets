import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = ({ title, value, icon: Icon, color, trend, isLoading, onClick }) => (
  <Card 
    onClick={onClick}
    className="relative overflow-hidden bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-violet-300 border-2"
  >
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <Skeleton className="h-8 w-24" />
      ) : (
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      )}
      {trend && !isLoading && (
        <div className="flex items-center text-sm text-green-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          {trend}
        </div>
      )}
    </CardContent>
  </Card>
);

export default function DashboardStats({ stats, isLoading, onCardClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Vehicles"
        value={stats.totalVehicles}
        icon={Car}
        color="teal"
        isLoading={isLoading}
        onClick={() => onCardClick('totalVehicles')}
      />
      <StatCard
        title="Available Now"
        value={stats.availableVehicles}
        icon={Car}
        color="green"
        isLoading={isLoading}
        onClick={() => onCardClick('availableVehicles')}
      />
      <StatCard
        title="Total Customers"
        value={stats.totalCustomers}
        icon={Users}
        color="violet"
        isLoading={isLoading}
        onClick={() => onCardClick('totalCustomers')}
      />
      <StatCard
        title="Active Bookings"
        value={stats.activeBookings}
        icon={Calendar}
        color="blue"
        isLoading={isLoading}
        onClick={() => onCardClick('activeBookings')}
      />
    </div>
  );
}