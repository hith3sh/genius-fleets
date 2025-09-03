import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AttendanceForm({ employees, shifts, attendance, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(attendance || {
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    check_in_time: '',
    check_out_time: '',
    shift_id: '',
    status: 'Present'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const withHours = {
        ...formData,
        check_in_time: formData.check_in_time ? `${formData.date}T${formData.check_in_time}:00` : null,
        check_out_time: formData.check_out_time ? `${formData.date}T${formData.check_out_time}:00` : null,
    }
    onSubmit(withHours);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="employee_id">Employee</Label>
        <Select value={formData.employee_id} onValueChange={v => handleChange('employee_id', v)} required>
          <SelectTrigger><SelectValue placeholder="Select employee..." /></SelectTrigger>
          <SelectContent>
            {employees.map(emp => (
              <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" value={formData.date} onChange={e => handleChange('date', e.target.value)} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="check_in_time">Check-in</Label>
          <Input id="check_in_time" type="time" value={formData.check_in_time} onChange={e => handleChange('check_in_time', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="check_out_time">Check-out</Label>
          <Input id="check_out_time" type="time" value={formData.check_out_time} onChange={e => handleChange('check_out_time', e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="shift_id">Shift</Label>
        <Select value={formData.shift_id} onValueChange={v => handleChange('shift_id', v)}>
          <SelectTrigger><SelectValue placeholder="Select shift..." /></SelectTrigger>
          <SelectContent>
            {shifts.map(shift => (
              <SelectItem key={shift.id} value={shift.id}>{shift.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Record</Button>
      </div>
    </form>
  );
}