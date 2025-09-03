import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RunPayrollDialog({ onSubmit, onCancel }) {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const months = Array.from({length: 12}, (_, i) => ({ value: i + 1, label: new Date(0, i).toLocaleString('default', { month: 'long' }) }));
  const years = Array.from({length: 5}, (_, i) => new Date().getFullYear() - i);

  const handleSubmit = () => {
    onSubmit({ month, year });
  };

  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Month</Label>
          <Select value={month.toString()} onValueChange={v => setMonth(parseInt(v))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {months.map(m => <SelectItem key={m.value} value={m.value.toString()}>{m.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Year</Label>
          <Select value={year.toString()} onValueChange={v => setYear(parseInt(v))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        This will process payroll for all active employees for the selected period. This action cannot be undone.
      </p>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Process Payroll</Button>
      </div>
    </div>
  );
}