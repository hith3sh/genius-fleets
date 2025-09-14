import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function MaintenanceForm({ vehicles, onSubmit, onCancel, editingLog }) {
  const [formData, setFormData] = useState({
    vehicle_id: '',
    service_date: '',
    odometer_reading: '',
    service_type: 'Scheduled Service',
    vendor: '',
    cost: '',
    notes: '',
    next_service_due_date: '',
    status: 'Completed'
  });
  const [reportFile, setReportFile] = useState(null);

  // Pre-populate form when editing
  React.useEffect(() => {
    if (editingLog) {
      setFormData({
        vehicle_id: editingLog.vehicle_id || '',
        service_date: editingLog.service_date || '',
        odometer_reading: editingLog.odometer_reading || '',
        service_type: editingLog.service_type || 'Scheduled Service',
        vendor: editingLog.vendor || '',
        cost: editingLog.cost || '',
        notes: editingLog.notes || '',
        next_service_due_date: editingLog.next_service_due_date || '',
        status: editingLog.status || 'Completed'
      });
    } else {
      // Reset form for new log
      setFormData({
        vehicle_id: '',
        service_date: '',
        odometer_reading: '',
        service_type: 'Scheduled Service',
        vendor: '',
        cost: '',
        notes: '',
        next_service_due_date: '',
        status: 'Completed'
      });
    }
    setReportFile(null);
  }, [editingLog]);

  const handleChange = (field, value) => setFormData(p => ({ ...p, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
        ...formData,
        cost: parseFloat(formData.cost),
        odometer_reading: parseInt(formData.odometer_reading)
    }, reportFile);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReportFile(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2"><Label>Vehicle</Label><Select value={formData.vehicle_id} onValueChange={v => handleChange('vehicle_id', v)}><SelectTrigger><SelectValue placeholder="Select a vehicle..." /></SelectTrigger><SelectContent>{vehicles.length === 0 ? (<SelectItem value="no-vehicles" disabled>No vehicles available</SelectItem>) : (vehicles.map(v => <SelectItem key={v.id} value={v.id}>{v.make} {v.model} ({v.license_plate})</SelectItem>))}</SelectContent></Select></div>
        <div className="space-y-2"><Label>Service Date</Label><Input type="date" value={formData.service_date} onChange={e => handleChange('service_date', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Odometer</Label><Input type="number" value={formData.odometer_reading} onChange={e => handleChange('odometer_reading', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Service Type</Label><Select value={formData.service_type} onValueChange={v => handleChange('service_type', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Scheduled Service">Scheduled Service</SelectItem><SelectItem value="Repair">Repair</SelectItem><SelectItem value="Inspection">Inspection</SelectItem></SelectContent></Select></div>
        <div className="space-y-2"><Label>Cost (AED)</Label><Input type="number" step="0.01" value={formData.cost} onChange={e => handleChange('cost', e.target.value)} required /></div>
        <div className="space-y-2"><Label>Next Service Due</Label><Input type="date" value={formData.next_service_due_date} onChange={e => handleChange('next_service_due_date', e.target.value)} /></div>
        <div className="space-y-2 col-span-2"><Label>Vendor</Label><Input value={formData.vendor} onChange={e => handleChange('vendor', e.target.value)} /></div>
        <div className="space-y-2 col-span-2"><Label>Notes</Label><Textarea value={formData.notes} onChange={e => handleChange('notes', e.target.value)} /></div>
        {editingLog && (
          <div className="space-y-2"><Label>Status</Label><Select value={formData.status || 'Completed'} onValueChange={v => handleChange('status', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Completed">Completed</SelectItem><SelectItem value="Upcoming">Upcoming</SelectItem><SelectItem value="Due">Due</SelectItem><SelectItem value="Overdue">Overdue</SelectItem></SelectContent></Select></div>
        )}
        <div className="space-y-2 col-span-2">
          <Label>Upload Report (Optional)</Label>
          <Input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          {reportFile && (
            <div className="text-sm text-gray-600 mt-1">
              Selected: {reportFile.name} ({(reportFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
          {editingLog?.report_url && !reportFile && (
            <div className="text-sm text-green-600 mt-1">
              Current report: <a href={editingLog.report_url} target="_blank" rel="noopener noreferrer" className="underline">View existing report</a>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2"><Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit">{editingLog ? 'Update Service' : 'Log Service'}</Button></div>
    </form>
  );
}