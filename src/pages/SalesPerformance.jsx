import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Lead } from '@/api/entities';
import { Quotation } from '@/api/entities';
import { Customer } from '@/api/entities';
import { User } from '@/api/entities';
import { TrendingUp, Target, FileText, UserCheck, Download } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#A44D8C'];
const statusOptions = ["New", "Contacted", "Quoted", "Follow-up", "Won", "Lost"];

// Generate dummy data for 6 months with 300 entries
const generateDummyData = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June'];
  const salesReps = ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Emma Brown', 'David Lee'];
  
  // Monthly revenue data
  const monthlyRevenueData = months.map(month => ({
    month,
    revenue: Math.floor(Math.random() * 50000) + 30000,
    leads: Math.floor(Math.random() * 50) + 20,
    conversions: Math.floor(Math.random() * 15) + 5
  }));

  // Lead status distribution
  const leadStatusData = statusOptions.map(status => ({
    name: status,
    value: Math.floor(Math.random() * 50) + 10,
    percentage: Math.floor(Math.random() * 20) + 5
  }));

  // Sales rep performance
  const repPerformanceData = salesReps.map(rep => ({
    name: rep,
    leadsGenerated: Math.floor(Math.random() * 40) + 20,
    leadsConverted: Math.floor(Math.random() * 15) + 5,
    revenue: Math.floor(Math.random() * 80000) + 40000,
    quotationsSent: Math.floor(Math.random() * 25) + 10,
    quotationsAccepted: Math.floor(Math.random() * 12) + 3
  }));

  return { monthlyRevenueData, leadStatusData, repPerformanceData };
};

export default function SalesPerformance() {
  const [leads, setLeads] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salesReps, setSalesReps] = useState([]);
  const [selectedRep, setSelectedRep] = useState('all');
  const [dateRange, setDateRange] = useState('6months');
  const [isLoading, setIsLoading] = useState(true);

  const dummyData = useMemo(() => generateDummyData(), []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const [leadsData, quotationsData, customersData, usersData] = await Promise.all([
      Lead.list(),
      Quotation.list(),
      Customer.list(),
      User.list()
    ]);
    setLeads(leadsData);
    setQuotations(quotationsData);
    setCustomers(customersData);
    setSalesReps(usersData.filter(u => u.role === 'Sales Executive'));
    setIsLoading(false);
  };

  const calculateKPIs = () => {
    // Use dummy data for more realistic metrics
    const totalRevenue = dummyData.monthlyRevenueData.reduce((sum, month) => sum + month.revenue, 0);
    const totalLeads = dummyData.monthlyRevenueData.reduce((sum, month) => sum + month.leads, 0);
    const totalConversions = dummyData.monthlyRevenueData.reduce((sum, month) => sum + month.conversions, 0);
    const totalQuotations = dummyData.repPerformanceData.reduce((sum, rep) => sum + rep.quotationsSent, 0);

    return {
      totalRevenue,
      leadsGenerated: totalLeads,
      conversionRate: ((totalConversions / totalLeads) * 100).toFixed(1),
      quotationsSent: totalQuotations
    };
  };

  const kpis = calculateKPIs();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Sales Performance
            </h1>
            <p className="text-gray-600 mt-1">Track and analyze sales team performance</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Select value={selectedRep} onValueChange={setSelectedRep}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Sales Rep" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sales Reps</SelectItem>
              {salesReps.map(rep => (
                <SelectItem key={rep.id} value={rep.id}>{rep.full_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Revenue</p>
                <p className="text-3xl font-bold text-blue-900">AED {kpis.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Leads Generated</p>
                <p className="text-3xl font-bold text-green-900">{kpis.leadsGenerated}</p>
              </div>
              <div className="bg-green-200 p-3 rounded-full">
                <Target className="w-6 h-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Conversion Rate</p>
                <p className="text-3xl font-bold text-purple-900">{kpis.conversionRate}%</p>
              </div>
              <div className="bg-purple-200 p-3 rounded-full">
                <UserCheck className="w-6 h-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Quotations Sent</p>
                <p className="text-3xl font-bold text-orange-900">{kpis.quotationsSent}</p>
              </div>
              <div className="bg-orange-200 p-3 rounded-full">
                <FileText className="w-6 h-6 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dummyData.monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`AED ${value.toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leads by Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dummyData.leadStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percentage}) => `${name} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dummyData.leadStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales Rep Performance Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Representative Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dummyData.repPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leadsGenerated" fill="#8884d8" name="Leads Generated" />
                <Bar dataKey="leadsConverted" fill="#82ca9d" name="Leads Converted" />
                <Bar dataKey="quotationsSent" fill="#ffc658" name="Quotations Sent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}