import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FineForm({ vehicles, users, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
      vehicle_id: '',
      driver_user_id: '',
      fine_date: '',
      type: 'Salik',
      amount: '',
      payment_status: 'Unpaid',
      reference_number: ''
  });

  const handleChange = (field, value) => setFormData(p => ({ ...p, [field]: value }));
  const handleSubmit = (e) => { e.preventDefault(); onSubmit({...formData, amount: parseFloat(formData.amount)}); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2"><Label>Vehicle</Label><Select onValueChange={v => handleChange('vehicle_id', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{vehicles.map(v => <SelectItem key={v.id} value={v.id}>{v.make} {v.model}</SelectItem>)}</SelectContent></Select></div>
        <div className="space-y-2"><Label>Driver</Label><Select onValueChange={v => handleChange('driver_user_id', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{users.map(u => <SelectItem key={u.id} value={u.id}>{u.full_name}</SelectItem>)}</SelectContent></Select></div>
        <div className="space-y-2"><Label>Fine Date</Label><Input type="date" onChange={e => handleChange('fine_date', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Type</Label><Select defaultValue="Salik" onValueChange={v => handleChange('type', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Salik">Salik</SelectItem><SelectItem value="Speeding">Speeding</SelectItem><SelectItem value="Parking">Parking</SelectItem><SelectItem value="Miscellaneous">Miscellaneous</SelectItem></SelectContent></Select></div>
        <div className="space-y-2"><Label>Amount (AED)</Label><Input type="number" step="0.01" onChange={e => handleChange('amount', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Status</Label><Select defaultValue="Unpaid" onValueChange={v => handleChange('payment_status', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Unpaid">Unpaid</SelectItem><SelectItem value="Paid">Paid</SelectItem><SelectItem value="Disputed">Disputed</SelectItem></SelectContent></Select></div>
        <div className="space-y-2 col-span-2"><Label>Reference Number</Label><Input onChange={e => handleChange('reference_number', e.target.value)} /></div>
      </div>
      <div className="flex justify-end gap-2"><Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit">Save Fine</Button></div>
    </form>
  );
}