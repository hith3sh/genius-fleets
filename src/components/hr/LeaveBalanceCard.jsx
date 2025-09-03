import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Heart, Briefcase, BarChart2 } from 'lucide-react';

const Stat = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-4">
    <div className={`p-3 rounded-full bg-${color}-100`}>
      <Icon className={`w-6 h-6 text-${color}-600`} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value} <span className="text-base font-medium">days</span></p>
    </div>
  </div>
);

export default function LeaveBalanceCard({ employee }) {
  if (!employee) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BarChart2 /> My Leave Balances</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat
          icon={Calendar}
          label="Annual Leave"
          value={employee.annual_leave_balance || 0}
          color="blue"
        />
        <Stat
          icon={Heart}
          label="Sick Leave"
          value={employee.sick_leave_balance || 0}
          color="red"
        />
        <Stat
          icon={Briefcase}
          label="Carried Over"
          value={employee.carry_over_annual_leave || 0}
          color="purple"
        />
      </CardContent>
    </Card>
  );
}