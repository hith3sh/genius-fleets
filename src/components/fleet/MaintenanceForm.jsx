import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function MaintenanceForm({ vehicles, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    vehicle_id: '',
    service_date: '',
    odometer_reading: '',
    service_type: 'Scheduled Service',
    vendor: '',
    cost: '',
    notes: '',
    next_service_due_date: ''
  });

  const handleChange = (field, value) => setFormData(p => ({ ...p, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
        ...formData,
        cost: parseFloat(formData.cost),
        odometer_reading: parseInt(formData.odometer_reading)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2"><Label>Vehicle</Label><Select onValueChange={v => handleChange('vehicle_id', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{vehicles.map(v => <SelectItem key={v.id} value={v.id}>{v.make} {v.model}</SelectItem>)}</SelectContent></Select></div>
        <div className="space-y-2"><Label>Service Date</Label><Input type="date" onChange={e => handleChange('service_date', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Odometer</Label><Input type="number" onChange={e => handleChange('odometer_reading', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Service Type</Label><Select defaultValue="Scheduled Service" onValueChange={v => handleChange('service_type', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Scheduled Service">Scheduled Service</SelectItem><SelectItem value="Repair">Repair</SelectItem><SelectItem value="Inspection">Inspection</SelectItem></SelectContent></Select></div>
        <div className="space-y-2"><Label>Cost (AED)</Label><Input type="number" step="0.01" onChange={e => handleChange('cost', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Next Service Due</Label><Input type="date" onChange={e => handleChange('next_service_due_date', e.target.value)} /></div>
        <div className="space-y-2 col-span-2"><Label>Vendor</Label><Input onChange={e => handleChange('vendor', e.target.value)} /></div>
        <div className="space-y-2 col-span-2"><Label>Notes</Label><Textarea onChange={e => handleChange('notes', e.target.value)} /></div>
        <div className="space-y-2 col-span-2"><Label>Upload Report</Label><Input type="file" /></div>
      </div>
      <div className="flex justify-end gap-2"><Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit">Log Service</Button></div>
    </form>
  );
}