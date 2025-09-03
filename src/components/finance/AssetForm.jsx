import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AssetForm({ asset, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(asset || {
    asset_name: '',
    purchase_date: '',
    purchase_cost: '',
    lifespan_years: '',
    depreciation_start_date: ''
  });

  const handleChange = (field, value) => setFormData(p => ({ ...p, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      purchase_cost: parseFloat(formData.purchase_cost),
      lifespan_years: parseInt(formData.lifespan_years)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 col-span-2"><Label>Asset Name</Label><Input value={formData.asset_name} onChange={e => handleChange('asset_name', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Purchase Date</Label><Input type="date" value={formData.purchase_date} onChange={e => handleChange('purchase_date', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Purchase Cost (AED)</Label><Input type="number" value={formData.purchase_cost} onChange={e => handleChange('purchase_cost', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Lifespan (Years)</Label><Input type="number" value={formData.lifespan_years} onChange={e => handleChange('lifespan_years', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Depreciation Start Date</Label><Input type="date" value={formData.depreciation_start_date} onChange={e => handleChange('depreciation_start_date', e.target.value)} required /></div>
      </div>
      <div className="flex justify-end gap-2"><Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit">Save Asset</Button></div>
    </form>
  );
}