
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, FileText, Eye, Calendar, DollarSign, TrendingUp, Receipt, BarChart3, PieChart } from 'lucide-react';
import { generateMonthlyInvoice } from '@/api/functions';
import { Invoice } from '@/api/entities';
import { Payment } from '@/api/entities';
import { Expense } from '@/api/entities';
import { Booking } from '@/api/entities';
import { Skeleton } from '@/components/ui/skeleton';

export default function Reports() {
  const [reportData, setReportData] = useState(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeReportType, setActiveReportType] = useState('');

  // Date states for each report type
  const [monthlyInvoiceDates, setMonthlyInvoiceDates] = useState({
    startDate: new Date().toISOString().split('T')[0].substring(0, 7), // YYYY-MM format
  });
  
  const [revenueDates, setRevenueDates] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  
  const [expenseDates, setExpenseDates] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  const handleDownloadReport = async (reportType) => {
    setIsGenerating(true);
    setActiveReportType(reportType);
    
    try {
      if (reportType === 'monthly_invoice') {
        const [year, month] = monthlyInvoiceDates.startDate.split('-');
        const response = await generateMonthlyInvoice({
          month: parseInt(month) - 1, // Convert to 0-based month
          year: parseInt(year)
        });

        // Create blob and download
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `monthly-invoice-${month}-${year}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      } else if (reportType === 'revenue_report') {
        // Generate and download revenue report as CSV
        const bookings = await Booking.list();
        const payments = await Payment.list();

        const startDate = new Date(revenueDates.startDate);
        const endDate = new Date(revenueDates.endDate);
        endDate.setHours(23, 59, 59, 999);
        
        const filteredBookings = bookings.filter(booking => {
          const bookingDate = new Date(booking.booking_date);
          return bookingDate >= startDate && bookingDate <= endDate;
        });

        const filteredPayments = payments.filter(payment => {
          const paymentDate = new Date(payment.payment_date);
          return paymentDate >= startDate && paymentDate <= endDate;
        });

        // Create CSV content
        let csvContent = "Revenue Report\n";
        csvContent += `Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}\n\n`;
        
        csvContent += "BOOKINGS\n";
        csvContent += "Booking Date,Customer ID,Vehicle ID,Status,Amount\n";
        filteredBookings.forEach(booking => {
          csvContent += `${new Date(booking.booking_date).toLocaleDateString()},${booking.customer_id || ''},${booking.vehicle_id || ''},${booking.status || ''},${booking.total_amount || 0}\n`;
        });
        
        csvContent += "\nPAYMENTS\n";
        csvContent += "Payment Date,Counterpart,Method,Reference,Amount\n";
        filteredPayments.forEach(payment => {
          csvContent += `${new Date(payment.payment_date).toLocaleDateString()},${payment.counterpart || ''},${payment.method || ''},${payment.reference_no || ''},${payment.amount || 0}\n`;
        });
        
        const totalRevenue = filteredBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);
        const totalPayments = filteredPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
        
        csvContent += "\nSUMMARY\n";
        csvContent += `Total Revenue from Bookings,${totalRevenue}\n`;
        csvContent += `Total Payments Received,${totalPayments}\n`;

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `revenue-report-${startDate.toISOString().split('T')[0]}-to-${endDate.toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

      } else if (reportType === 'expense_report') {
        // Generate and download expense report as CSV
        const expenses = await Expense.list();

        const startDate = new Date(expenseDates.startDate);
        const endDate = new Date(expenseDates.endDate);
        endDate.setHours(23, 59, 59, 999);
        
        const filteredExpenses = expenses.filter(expense => {
          const expenseDate = new Date(expense.expense_date);
          return expenseDate >= startDate && expenseDate <= endDate;
        });

        // Group by category for summary
        const expensesByCategory = filteredExpenses.reduce((acc, expense) => {
          const category = expense.category || 'Other';
          if (!acc[category]) acc[category] = [];
          acc[category].push(expense);
          return acc;
        }, {});

        // Create CSV content
        let csvContent = "Expense Report\n";
        csvContent += `Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}\n\n`;
        
        csvContent += "DETAILED EXPENSES\n";
        csvContent += "Date,Category,Description,Paid To,Payment Method,Vehicle Number,Amount\n";
        filteredExpenses.forEach(expense => {
          csvContent += `${new Date(expense.expense_date).toLocaleDateString()},${expense.category || ''},${expense.description || ''},${expense.paid_to || ''},${expense.payment_method || ''},${expense.project_client || ''},${expense.amount || 0}\n`;
        });
        
        csvContent += "\nCATEGORY SUMMARY\n";
        csvContent += "Category,Number of Expenses,Total Amount\n";
        Object.entries(expensesByCategory).forEach(([category, expenses]) => {
          const categoryTotal = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
          csvContent += `${category},${expenses.length},${categoryTotal}\n`;
        });
        
        const totalExpenses = filteredExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
        csvContent += "\nOVERALL SUMMARY\n";
        csvContent += `Total Expenses,${totalExpenses}\n`;
        csvContent += `Number of Expenses,${filteredExpenses.length}\n`;

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `expense-report-${startDate.toISOString().split('T')[0]}-to-${endDate.toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report. Please try again.');
    }
    
    setIsGenerating(false);
    setActiveReportType('');
  };

  const handleViewReport = async (reportType) => {
    setIsLoadingReport(true);
    setActiveReportType(reportType);
    
    try {
      let data = {};

      if (reportType === 'monthly_invoice') {
        const [year, month] = monthlyInvoiceDates.startDate.split('-');
        const monthStart = new Date(parseInt(year), parseInt(month) - 1, 1);
        const monthEnd = new Date(parseInt(year), parseInt(month), 0);

        // Load monthly invoice data
        const [bookings, invoices, payments, expenses] = await Promise.all([
          Booking.list(),
          Invoice.list(),
          Payment.list(),
          Expense.list()
        ]);

        const completedBookings = bookings.filter(booking => {
          const bookingEndDate = new Date(booking.end_date);
          return (
            booking.status === 'Completed' &&
            bookingEndDate >= monthStart &&
            bookingEndDate <= monthEnd
          );
        });

        const monthlyInvoices = invoices.filter(invoice => {
          const invoiceDate = new Date(invoice.invoice_date);
          return invoiceDate >= monthStart && invoiceDate <= monthEnd;
        });

        const monthlyPayments = payments.filter(payment => {
          const paymentDate = new Date(payment.payment_date);
          return paymentDate >= monthStart && paymentDate <= monthEnd;
        });

        const monthlyExpenses = expenses.filter(expense => {
          const expenseDate = new Date(expense.expense_date);
          return expenseDate >= monthStart && expenseDate <= monthEnd;
        });

        data = {
          type: 'monthly_summary',
          period: `${new Date(monthStart).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
          completedBookings,
          invoices: monthlyInvoices,
          payments: monthlyPayments,
          expenses: monthlyExpenses,
          totalRevenue: completedBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0),
          totalPayments: monthlyPayments.reduce((sum, p) => sum + (p.amount || 0), 0),
          totalExpenses: monthlyExpenses.reduce((sum, e) => sum + (e.amount || 0), 0)
        };
      } else if (reportType === 'revenue_report') {
        // Load revenue data
        const bookings = await Booking.list();
        const payments = await Payment.list();

        const startDate = new Date(revenueDates.startDate);
        const endDate = new Date(revenueDates.endDate);
        endDate.setHours(23, 59, 59, 999); // Include full end date
        
        const filteredBookings = bookings.filter(booking => {
          const bookingDate = new Date(booking.booking_date);
          return bookingDate >= startDate && bookingDate <= endDate;
        });

        const filteredPayments = payments.filter(payment => {
          const paymentDate = new Date(payment.payment_date);
          return paymentDate >= startDate && paymentDate <= endDate;
        });

        data = {
          type: 'revenue_report',
          period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
          bookings: filteredBookings,
          payments: filteredPayments,
          totalRevenue: filteredBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0),
          totalPayments: filteredPayments.reduce((sum, p) => sum + (p.amount || 0), 0)
        };
      } else if (reportType === 'expense_report') {
        // Load expense data
        const expenses = await Expense.list();

        const startDate = new Date(expenseDates.startDate);
        const endDate = new Date(expenseDates.endDate);
        endDate.setHours(23, 59, 59, 999); // Include full end date
        
        const filteredExpenses = expenses.filter(expense => {
          const expenseDate = new Date(expense.expense_date);
          return expenseDate >= startDate && expenseDate <= endDate;
        });

        // Group by category
        const expensesByCategory = filteredExpenses.reduce((acc, expense) => {
          const category = expense.category || 'Other';
          if (!acc[category]) acc[category] = [];
          acc[category].push(expense);
          return acc;
        }, {});

        data = {
          type: 'expense_report',
          period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
          expenses: filteredExpenses,
          expensesByCategory,
          totalExpenses: filteredExpenses.reduce((sum, e) => sum + (e.amount || 0), 0)
        };
      }

      setReportData(data);
    } catch (error) {
      console.error('Error loading report data:', error);
      alert('Error loading report data. Please try again.');
    }
    
    setIsLoadingReport(false);
    setActiveReportType('');
  };

  const renderReportView = () => {
    if (!reportData) return null;

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {reportData.type === 'monthly_summary' && 'Monthly Summary Report'}
            {reportData.type === 'revenue_report' && 'Revenue Report'}
            {reportData.type === 'expense_report' && 'Expense Report'}
            <span className="text-base font-normal text-gray-600">- {reportData.period}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reportData.type === 'monthly_summary' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-800">
                      AED {reportData.totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">Total Revenue</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-800">
                      AED {reportData.totalPayments.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-700">Total Payments</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4 text-center">
                    <Calendar className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-800">
                      AED {reportData.totalExpenses.toLocaleString()}
                    </div>
                    <div className="text-sm text-red-700">Total Expenses</div>
                  </CardContent>
                </Card>
              </div>

              {/* Completed Bookings */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Completed Bookings ({reportData.completedBookings.length})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-2 text-left">Customer</th>
                        <th className="border border-gray-300 p-2 text-left">Vehicle</th>
                        <th className="border border-gray-300 p-2 text-left">End Date</th>
                        <th className="border border-gray-300 p-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.completedBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="border border-gray-300 p-2">{booking.customer_id}</td>
                          <td className="border border-gray-300 p-2">{booking.vehicle_id}</td>
                          <td className="border border-gray-300 p-2">{new Date(booking.end_date).toLocaleDateString()}</td>
                          <td className="border border-gray-300 p-2 text-right">AED {Number(booking.total_amount || 0).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {reportData.type === 'revenue_report' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-800">
                      AED {reportData.totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">Total Revenue from Bookings</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-800">
                      AED {reportData.totalPayments.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-700">Total Payments Received</div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Bookings ({reportData.bookings.length})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-2 text-left">Booking Date</th>
                        <th className="border border-gray-300 p-2 text-left">Customer</th>
                        <th className="border border-gray-300 p-2 text-left">Status</th>
                        <th className="border border-gray-300 p-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="border border-gray-300 p-2">{new Date(booking.booking_date).toLocaleDateString()}</td>
                          <td className="border border-gray-300 p-2">{booking.customer_id}</td>
                          <td className="border border-gray-300 p-2">{booking.status}</td>
                          <td className="border border-gray-300 p-2 text-right">AED {Number(booking.total_amount || 0).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {reportData.type === 'expense_report' && (
            <div className="space-y-6">
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-800">
                    AED {reportData.totalExpenses.toLocaleString()}
                  </div>
                  <div className="text-sm text-red-700">Total Expenses</div>
                </CardContent>
              </Card>

              {/* Expenses by Category */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Expenses by Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {Object.entries(reportData.expensesByCategory).map(([category, expenses]) => {
                    const categoryTotal = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
                    return (
                      <Card key={category}>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">{category}</h4>
                          <div className="text-2xl font-bold text-blue-600">
                            AED {categoryTotal.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">{expenses.length} expenses</div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Expenses */}
              <div>
                <h3 className="text-lg font-semibold mb-3">All Expenses ({reportData.expenses.length})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-2 text-left">Date</th>
                        <th className="border border-gray-300 p-2 text-left">Category</th>
                        <th className="border border-gray-300 p-2 text-left">Description</th>
                        <th className="border border-gray-300 p-2 text-left">Paid To</th>
                        <th className="border border-gray-300 p-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.expenses.map((expense) => (
                        <tr key={expense.id}>
                          <td className="border border-gray-300 p-2">{new Date(expense.expense_date).toLocaleDateString()}</td>
                          <td className="border border-gray-300 p-2">{expense.category}</td>
                          <td className="border border-gray-300 p-2">{expense.description}</td>
                          <td className="border border-gray-300 p-2">{expense.paid_to}</td>
                          <td className="border border-gray-300 p-2 text-right">AED {Number(expense.amount || 0).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Financial Reports</h1>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Monthly Invoice Summary Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Receipt className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-lg">Monthly Invoice Summary</CardTitle>
            <p className="text-sm text-gray-600">Generate comprehensive monthly invoice reports</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthly-date">Select Month</Label>
              <Input
                id="monthly-date"
                type="month"
                value={monthlyInvoiceDates.startDate}
                onChange={(e) => setMonthlyInvoiceDates({ startDate: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => handleViewReport('monthly_invoice')}
                disabled={isLoadingReport && activeReportType === 'monthly_invoice'}
                className="flex-1"
                variant="outline"
              >
                {isLoadingReport && activeReportType === 'monthly_invoice' ? (
                  <>
                    <Skeleton className="w-4 h-4 mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    View Below
                  </>
                )}
              </Button>
              <Button 
                onClick={() => handleDownloadReport('monthly_invoice')}
                disabled={isGenerating && activeReportType === 'monthly_invoice'}
                className="flex-1"
              >
                {isGenerating && activeReportType === 'monthly_invoice' ? (
                  <>
                    <Skeleton className="w-4 h-4 mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Report Card */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-lg">Revenue Report</CardTitle>
            <p className="text-sm text-gray-600">Analyze revenue and payments over time</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="space-y-2">
                <Label htmlFor="revenue-start">Start Date</Label>
                <Input
                  id="revenue-start"
                  type="date"
                  value={revenueDates.startDate}
                  onChange={(e) => setRevenueDates(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="revenue-end">End Date</Label>
                <Input
                  id="revenue-end"
                  type="date"
                  value={revenueDates.endDate}
                  onChange={(e) => setRevenueDates(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => handleViewReport('revenue_report')}
                disabled={isLoadingReport && activeReportType === 'revenue_report'}
                className="flex-1"
                variant="outline"
              >
                {isLoadingReport && activeReportType === 'revenue_report' ? (
                  <>
                    <Skeleton className="w-4 h-4 mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    View Below
                  </>
                )}
              </Button>
              <Button 
                onClick={() => handleDownloadReport('revenue_report')}
                disabled={isGenerating && activeReportType === 'revenue_report'}
                className="flex-1"
              >
                {isGenerating && activeReportType === 'revenue_report' ? (
                  <>
                    <Skeleton className="w-4 h-4 mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Expense Report Card */}
        <Card className="bg-gradient-to-br from-red-50 to-pink-100 border-red-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <PieChart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-lg">Expense Report</CardTitle>
            <p className="text-sm text-gray-600">Track and categorize business expenses</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="space-y-2">
                <Label htmlFor="expense-start">Start Date</Label>
                <Input
                  id="expense-start"
                  type="date"
                  value={expenseDates.startDate}
                  onChange={(e) => setExpenseDates(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-end">End Date</Label>
                <Input
                  id="expense-end"
                  type="date"
                  value={expenseDates.endDate}
                  onChange={(e) => setExpenseDates(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => handleViewReport('expense_report')}
                disabled={isLoadingReport && activeReportType === 'expense_report'}
                className="flex-1"
                variant="outline"
              >
                {isLoadingReport && activeReportType === 'expense_report' ? (
                  <>
                    <Skeleton className="w-4 h-4 mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    View Below
                  </>
                )}
              </Button>
              <Button 
                onClick={() => handleDownloadReport('expense_report')}
                disabled={isGenerating && activeReportType === 'expense_report'}
                className="flex-1"
              >
                {isGenerating && activeReportType === 'expense_report' ? (
                  <>
                    <Skeleton className="w-4 h-4 mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report View */}
      {isLoadingReport ? (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-64 w-full" />
            </div>
          </CardContent>
        </Card>
      ) : (
        renderReportView()
      )}
    </div>
  );
}
