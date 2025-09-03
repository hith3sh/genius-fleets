import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { UploadFile } from '@/api/integrations';
import { Upload } from 'lucide-react';

export default function ContractForm({ vehicles, onSubmit, onCancel, contract }) {
  const [formData, setFormData] = useState({
    vehicle_id: contract?.vehicle_id || '',
    customer_name: contract?.customer_name || '',
    start_date: contract?.start_date || '',
    end_date: contract?.end_date || '',
    contract_value: contract?.contract_value || '',
    payment_terms: contract?.payment_terms || '',
    document_url: contract?.document_url || '',
    status: contract?.status || 'Active',
    booking_id: contract?.booking_id || ''
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      setFormData({ ...formData, document_url: file_url });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload document');
    }
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const submitData = { ...formData };
      
      // Remove empty optional fields
      if (!submitData.booking_id) {
        delete submitData.booking_id;
      }
      if (!submitData.document_url) {
        delete submitData.document_url;
      }
      
      // Convert contract value to number
      submitData.contract_value = parseFloat(submitData.contract_value);
      
      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting contract:', error);
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle_id">Vehicle *</Label>
              <Select value={formData.vehicle_id} onValueChange={(value) => setFormData({...formData, vehicle_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map(vehicle => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.make} {vehicle.model} ({vehicle.license_plate})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer_name">Customer Name *</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date *</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date *</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contract_value">Contract Value (AED) *</Label>
              <Input
                id="contract_value"
                type="number"
                step="0.01"
                value={formData.contract_value}
                onChange={(e) => setFormData({...formData, contract_value: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_terms">Payment Terms</Label>
            <Textarea
              id="payment_terms"
              value={formData.payment_terms}
              onChange={(e) => setFormData({...formData, payment_terms: e.target.value})}
              placeholder="Describe payment schedule, terms, conditions..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking_id">Booking ID (Optional)</Label>
            <Input
              id="booking_id"
              value={formData.booking_id}
              onChange={(e) => setFormData({...formData, booking_id: e.target.value})}
              placeholder="Link to existing booking"
            />
          </div>

          <div className="space-y-4">
            <Label>Contract Document</Label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:border-gray-400">
                  <Upload className="w-4 h-4" />
                  {isUploading ? 'Uploading...' : 'Upload Contract Document'}
                </div>
              </label>
              {formData.document_url && (
                <a 
                  href={formData.document_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Current Document
                </a>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isUploading}>
              {isLoading ? 'Saving...' : (contract ? 'Update Contract' : 'Create Contract')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}