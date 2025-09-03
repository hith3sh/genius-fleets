import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Payroll } from '@/api/entities';
import { Employee } from '@/api/entities';
import { Attendance } from '@/api/entities';
import { Deduction } from '@/api/entities';
import { Shift } from '@/api/entities';

import RunPayrollDialog from '../components/hr/RunPayrollDialog';
import PayrollHistory from '../components/hr/PayrollHistory';

export default function HRPayroll() {
  const [showRunDialog, setShowRunDialog] = useState(false);
  const [payrollHistory, setPayrollHistory] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [history, emps] = await Promise.all([
      Payroll.list('-processing_date'),
      Employee.list()
    ]);
    setPayrollHistory(history);
    setEmployees(emps);
  };

  const handleRunPayroll = async ({ month, year }) => {
    setShowRunDialog(false);
    alert(`Processing payroll for ${month}/${year}. This may take a moment...`);
    
    // 1. Check if payroll for this period already exists
    const existingPayroll = await Payroll.filter({ month, year });
    if (existingPayroll.length > 0) {
      alert(`Payroll for ${month}/${year} has already been processed.`);
      return;
    }

    // 2. Fetch all necessary data
    const [activeEmployees, allAttendance, allDeductions, allShifts] = await Promise.all([
      Employee.filter({ status: 'Active' }),
      Attendance.list(), // In a real app, filter by month/year
      Deduction.list(),   // In a real app, filter by month/year
      Shift.list()
    ]);
    
    const shiftsMap = allShifts.reduce((acc, s) => ({...acc, [s.id]: s}), {});
    const employeeDeductionsMap = allDeductions.reduce((acc, d) => {
      if (!acc[d.employee_id]) acc[d.employee_id] = [];
      acc[d.employee_id].push(d);
      return acc;
    }, {});
    
    const employeeAttendanceMap = allAttendance.reduce((acc, a) => {
      const attYear = new Date(a.date).getFullYear();
      const attMonth = new Date(a.date).getMonth() + 1;
      if (attYear === year && attMonth === month) {
        if (!acc[a.employee_id]) acc[a.employee_id] = [];
        acc[a.employee_id].push(a);
      }
      return acc;
    }, {});


    // 3. Process payroll for each employee
    const payrollsToCreate = [];
    for (const emp of activeEmployees) {
      const base_salary = emp.base_salary || 0;
      
      // Calculate overtime pay
      const empShift = shiftsMap[emp.shift_id];
      const hourlyRate = empShift ? base_salary / 30 / empShift.duration_hours : base_salary / 30 / 8;
      const empAttendance = employeeAttendanceMap[emp.id] || [];
      const totalOvertimeHours = empAttendance.reduce((sum, att) => {
          const workHours = att.working_hours || 0;
          return sum + (workHours > 10 ? workHours - 10 : 0);
      }, 0);
      const overtime_pay = totalOvertimeHours * hourlyRate * 1.25;

      // Calculate deductions
      const empDeductions = employeeDeductionsMap[emp.id] || [];
      const deductions = empDeductions.reduce((sum, d) => sum + d.amount, 0);

      const net_pay = base_salary + overtime_pay - deductions;

      payrollsToCreate.push({
        employee_id: emp.id,
        month,
        year,
        base_salary,
        overtime_pay: parseFloat(overtime_pay.toFixed(2)),
        deductions,
        net_pay: parseFloat(net_pay.toFixed(2)),
        status: 'Processed',
        processing_date: new Date().toISOString().split('T')[0]
      });
    }

    // 4. Bulk create payroll records
    if (payrollsToCreate.length > 0) {
      await Payroll.bulkCreate(payrollsToCreate);
      alert(`Payroll processed successfully for ${payrollsToCreate.length} employees.`);
    } else {
      alert("No active employees found to process payroll.");
    }

    fetchData(); // Refresh history
  };

  const employeeMap = employees.reduce((acc, emp) => {
    acc[emp.id] = emp;
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payroll Processing</h1>
        <Button onClick={() => setShowRunDialog(true)}>
          <PlayCircle className="mr-2 h-4 w-4" /> Run Monthly Payroll
        </Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Payroll History</CardTitle></CardHeader>
        <CardContent>
          <PayrollHistory history={payrollHistory} employeeMap={employeeMap} />
        </CardContent>
      </Card>
      
      <Dialog open={showRunDialog} onOpenChange={setShowRunDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Run Monthly Payroll</DialogTitle></DialogHeader>
          <RunPayrollDialog onSubmit={handleRunPayroll} onCancel={() => setShowRunDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}