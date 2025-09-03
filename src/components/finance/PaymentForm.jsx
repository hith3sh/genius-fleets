import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function PaymentForm({ payment, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(payment || {
    payment_date: '',
    counterpart: '',
    amount: '',
    method: 'Bank Transfer',
    reference_no: '',
    remarks: '',
  });

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, amount: parseFloat(formData.amount) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2"><Label>Date</Label><Input type="date" value={formData.payment_date} onChange={e => handleChange('payment_date', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Method</Label><Select value={formData.method} onValueChange={v => handleChange('method', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Cash">Cash</SelectItem><SelectItem value="Bank Transfer">Bank Transfer</SelectItem><SelectItem value="Card">Card</SelectItem></SelectContent></Select></div>
        <div className="space-y-2 col-span-2"><Label>From/To</Label><Input value={formData.counterpart} onChange={e => handleChange('counterpart', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Amount (AED)</Label><Input type="number" value={formData.amount} onChange={e => handleChange('amount', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Reference No.</Label><Input value={formData.reference_no} onChange={e => handleChange('reference_no', e.target.value)} /></div>
        <div className="space-y-2 col-span-2"><Label>Remarks</Label><Textarea value={formData.remarks} onChange={e => handleChange('remarks', e.target.value)} /></div>
      </div>
      <div className="flex justify-end gap-2"><Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit">Save Payment</Button></div>
    </form>
  );
}