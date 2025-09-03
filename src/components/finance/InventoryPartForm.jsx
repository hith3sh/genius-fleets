import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["Filters", "Brakes", "Tyres", "Engine Oil", "Batteries", "Body Parts", "Other"];

export default function InventoryPartForm({ part, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(part || {
    item_name: '',
    category: 'Other',
    unit_cost: '',
    quantity_available: '',
    reorder_level: '',
    supplier: '',
  });

  const handleChange = (field, value) => setFormData(p => ({ ...p, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      unit_cost: parseFloat(formData.unit_cost),
      quantity_available: parseInt(formData.quantity_available),
      reorder_level: parseInt(formData.reorder_level),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 col-span-2"><Label>Item Name</Label><Input value={formData.item_name} onChange={e => handleChange('item_name', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Category</Label><Select value={formData.category} onValueChange={v => handleChange('category', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
        <div className="space-y-2"><Label>Supplier</Label><Input value={formData.supplier} onChange={e => handleChange('supplier', e.target.value)} /></div>
        <div className="space-y-2"><Label>Unit Cost (AED)</Label><Input type="number" step="0.01" value={formData.unit_cost} onChange={e => handleChange('unit_cost', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Quantity Available</Label><Input type="number" value={formData.quantity_available} onChange={e => handleChange('quantity_available', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Reorder Level</Label><Input type="number" value={formData.reorder_level} onChange={e => handleChange('reorder_level', e.target.value)} required /></div>
      </div>
      <div className="flex justify-end gap-2"><Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit">Save Item</Button></div>
    </form>
  );
}