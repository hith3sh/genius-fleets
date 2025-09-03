import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UploadFile } from '@/api/integrations';
import { Vehicle } from '@/api/entities';
import { Upload, FileText, X } from 'lucide-react';

export default function ExpenseForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    expense_date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: '',
    paid_to: '',
    payment_method: 'Cash',
    project_client: '', // This will now store the selected vehicle license plate
    receipt_url: '',
    ...initialData
  });

  const [vehicles, setVehicles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const vehicleData = await Vehicle.list();
      setVehicles(vehicleData);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      setFormData(prev => ({ ...prev, receipt_url: file_url }));
      setUploadedFile(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, receipt_url: '' }));
    setUploadedFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert amount to number
    const submissionData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    onSubmit(submissionData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Expense' : 'Add New Expense'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expense_date">Expense Date</Label>
              <Input
                id="expense_date"
                type="date"
                value={formData.expense_date}
                onChange={(e) => handleInputChange('expense_date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salaries">Salaries</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Supplies">Supplies</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Expense description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (AED)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paid_to">Paid To</Label>
              <Input
                id="paid_to"
                placeholder="Vendor/Company name"
                value={formData.paid_to}
                onChange={(e) => handleInputChange('paid_to', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payment_method">Payment Method</Label>
              <Select value={formData.payment_method} onValueChange={(value) => handleInputChange('payment_method', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Company Account">Company Account</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle_number">Vehicle Number</Label>
              <Select value={formData.project_client} onValueChange={(value) => handleInputChange('project_client', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>No vehicle selected</SelectItem>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.license_plate}>
                      {vehicle.license_plate} - {vehicle.make} {vehicle.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Receipt Upload */}
          <div className="space-y-2">
            <Label>Receipt</Label>
            {formData.receipt_url ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">
                    {uploadedFile ? uploadedFile.name : 'Receipt uploaded'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href={formData.receipt_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View
                  </a>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="receipt-upload"
                  disabled={isUploading}
                />
                <label
                  htmlFor="receipt-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {isUploading ? 'Uploading...' : 'Click to upload receipt'}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PNG, JPG, PDF up to 10MB
                  </span>
                </label>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {initialData ? 'Update Expense' : 'Add Expense'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}