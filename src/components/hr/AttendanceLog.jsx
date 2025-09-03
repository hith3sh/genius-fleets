import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export default function AttendanceLog({ records, employees, shifts, onEdit }) {
  const employeeMap = employees.reduce((acc, emp) => ({...acc, [emp.id]: emp}), {});
  const shiftMap = shifts.reduce((acc, s) => ({...acc, [s.id]: s}), {});
  
  const formatTime = (datetime) => {
      if(!datetime) return 'N/A';
      return new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Check-in</TableHead>
          <TableHead>Check-out</TableHead>
          <TableHead>Hours</TableHead>
          <TableHead>OT Hours</TableHead>
          <TableHead>Shift</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map(rec => (
          <TableRow key={rec.id}>
            <TableCell>{new Date(rec.date).toLocaleDateString()}</TableCell>
            <TableCell>{employeeMap[rec.employee_id]?.name || 'Unknown'}</TableCell>
            <TableCell>{formatTime(rec.check_in_time)}</TableCell>
            <TableCell>{formatTime(rec.check_out_time)}</TableCell>
            <TableCell>{rec.working_hours}</TableCell>
            <TableCell>{rec.overtime_hours}</TableCell>
            <TableCell>{shiftMap[rec.shift_id]?.name || 'N/A'}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => onEdit(rec)}><Edit className="w-4 h-4" /></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}