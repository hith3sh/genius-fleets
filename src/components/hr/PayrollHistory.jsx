import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PayrollHistory({ history, employeeMap }) {
  const downloadPayslip = (payrollRecord) => {
    const employee = employeeMap[payrollRecord.employee_id];
    const content = `
      Payslip for ${employee.name}
      Month/Year: ${payrollRecord.month}/${payrollRecord.year}
      ----------------------------------
      Base Salary: ${payrollRecord.base_salary.toFixed(2)} AED
      Overtime Pay: ${payrollRecord.overtime_pay.toFixed(2)} AED
      Deductions: ${payrollRecord.deductions.toFixed(2)} AED
      ----------------------------------
      Net Pay: ${payrollRecord.net_pay.toFixed(2)} AED
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Payslip-${employee.name}-${payrollRecord.month}-${payrollRecord.year}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const downloadSummary = (payrollRecord) => {
      // For a single record, it's the same as payslip. For multiple, this logic would change.
      downloadPayslip(payrollRecord);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Period</TableHead>
          <TableHead>Net Pay (AED)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map(rec => (
          <TableRow key={rec.id}>
            <TableCell>{employeeMap[rec.employee_id]?.name || 'Unknown'}</TableCell>
            <TableCell>{rec.month}/{rec.year}</TableCell>
            <TableCell>{rec.net_pay.toFixed(2)}</TableCell>
            <TableCell><Badge>{rec.status}</Badge></TableCell>
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => downloadSummary(rec)}>
                <Download className="mr-2 h-3 w-3" /> Excel
              </Button>
               <Button variant="outline" size="sm" className="ml-2" onClick={() => downloadPayslip(rec)}>
                <Download className="mr-2 h-3 w-3" /> Payslip
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}