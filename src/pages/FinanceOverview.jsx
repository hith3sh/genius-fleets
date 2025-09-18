import React, { useState, useEffect } from 'react';
import { Invoice } from '@/api/entities';
import { Expense } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import KPICard from '../components/finance/KPICard';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function FinanceOverview() {
  const [invoices, setInvoices] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [invoicesData, expensesData] = await Promise.all([
        Invoice.list(),
        Expense.list(),
      ]);
      console.log('Invoices data:', invoicesData);
      console.log('Expenses data:', expensesData);
      setInvoices(invoicesData);
      setExpenses(expensesData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const totalIncome = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => {
    console.log('Invoice amount:', inv.amount, typeof inv.amount);
    return sum + (parseFloat(inv.amount) || 0);
  }, 0);
  const totalExpenses = expenses.reduce((sum, exp) => {
    console.log('Expense amount:', exp.amount, typeof exp.amount);
    return sum + (parseFloat(exp.amount) || 0);
  }, 0);
  const netProfit = totalIncome - totalExpenses;

  const monthlyData = invoices.reduce((acc, inv) => {
    const month = new Date(inv.invoice_date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) {
      acc[month] = { name: month, Income: 0, Expenses: 0 };
    }
    if (inv.status === 'Paid') {
      acc[month].Income += inv.amount;
    }
    return acc;
  }, {});

  expenses.forEach(exp => {
    const month = new Date(exp.expense_date).toLocaleString('default', { month: 'short' });
    if (!monthlyData[month]) {
      monthlyData[month] = { name: month, Income: 0, Expenses: 0 };
    }
    monthlyData[month].Expenses += exp.amount;
  });

  const expenseByCategory = expenses.reduce((acc, exp) => {
    if (!acc[exp.category]) {
      acc[exp.category] = { name: exp.category, value: 0 };
    }
    acc[exp.category].value += exp.amount;
    return acc;
  }, {});
  
  const chartMonthlyData = Object.values(monthlyData).sort((a,b) => new Date(a.name + ' 1, 2023') - new Date(b.name + ' 1, 2023'));
  const chartExpenseData = Object.values(expenseByCategory);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Finance Overview</h1>
         <div className="flex items-center gap-4">
            <Select defaultValue="30d">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <KPICard title="Total Income" value={`AED ${totalIncome.toLocaleString()}`} icon={TrendingUp} color="green" />
        <KPICard title="Total Expenses" value={`AED ${totalExpenses.toLocaleString()}`} icon={TrendingDown} color="red" />
        <KPICard title="Net Profit" value={`AED ${netProfit.toLocaleString()}`} icon={Wallet} color="blue" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Income vs. Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartMonthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Income" fill="#82ca9d" />
                <Bar dataKey="Expenses" fill="#ff6b6b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
             <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={chartExpenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                      {chartExpenseData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}