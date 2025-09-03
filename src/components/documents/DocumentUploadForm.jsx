import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText } from 'lucide-react';

export default function DocumentUploadForm({ 
  vehicles, 
  onUpload, 
  onCancel, 
  isUploading, 
  documentTypes 
}) {
  const [formData, setFormData] = useState({
    vehicle_id: '',
    document_type: 'Insurance',
    document_name: '',
    expiry_date: '',
    notes: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Auto-populate document name if not set
      if (!formData.document_name) {
        setFormData(prev => ({ ...prev, document_name: file.name }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    if (!formData.vehicle_id || !formData.document_type) {
      alert('Please select a vehicle and document type.');
      return;
    }

    await onUpload(
      formData.vehicle_id,
      formData.document_type,
      selectedFile,
      formData.document_name,
      formData.expiry_date,
      formData.notes
    );
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      {/* Vehicle Selection */}
      <div className="space-y-2">
        <Label htmlFor="vehicle_id">Vehicle *</Label>
        <Select 
          value={formData.vehicle_id} 
          onValueChange={(value) => handleInputChange('vehicle_id', value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a vehicle..." />
          </SelectTrigger>
          <SelectContent>
            {vehicles.map(vehicle => (
              <SelectItem key={vehicle.id} value={vehicle.id}>
                <div>
                  <div className="font-medium">
                    {vehicle.make} {vehicle.model} ({vehicle.license_plate})
                  </div>
                  <div className="text-xs text-gray-500">
                    {vehicle.year} • {vehicle.color}
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Document Type */}
      <div className="space-y-2">
        <Label htmlFor="document_type">Document Type *</Label>
        <Select 
          value={formData.document_type} 
          onValueChange={(value) => handleInputChange('document_type', value)}
          required
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {documentTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Document Name */}
      <div className="space-y-2">
        <Label htmlFor="document_name">Document Name</Label>
        <Input 
          id="document_name"
          placeholder="Enter document name..."
          value={formData.document_name}
          onChange={(e) => handleInputChange('document_name', e.target.value)}
        />
      </div>

      {/* Expiry Date */}
      <div className="space-y-2">
        <Label htmlFor="expiry_date">Expiry Date (Optional)</Label>
        <Input 
          id="expiry_date"
          type="date"
          value={formData.expiry_date}
          onChange={(e) => handleInputChange('expiry_date', e.target.value)}
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea 
          id="notes"
          placeholder="Add any additional notes about this document..."
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          rows={3}
        />
      </div>

      {/* File Selection */}
      <div className="space-y-2">
        <Label htmlFor="file_input">Select File *</Label>
        <Input 
          id="file_input"
          type="file" 
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFileSelect}
          className="cursor-pointer"
          required
        />
        {selectedFile && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-800">
              <FileText className="h-4 w-4" />
              <span className="font-medium">Selected: {selectedFile.name}</span>
            </div>
            <div className="text-sm text-green-600 mt-1">
              Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-800">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Uploading document...</span>
          </div>
          <div className="text-sm text-blue-600 mt-1">
            Please wait while your document is being processed.
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isUploading || !selectedFile}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </>
          )}
        </Button>
      </div>
    </form>
  );
}