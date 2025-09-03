import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, AlertCircle } from 'lucide-react';

export default function IncidentForm({ vehicles, users, incident, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    vehicle_id: '',
    incident_date: '',
    type: '',
    severity: '',
    description: '',
    responsible_user_id: '',
    status: 'Open',
    photo_urls: []
  });
  
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when editing an existing incident
  useEffect(() => {
    if (incident) {
      console.log('Initializing form with incident data:', incident);
      
      // Format the incident_date for the datetime-local input
      const incidentDate = incident.incident_date ? 
        new Date(incident.incident_date).toISOString().slice(0, 16) : '';

      setFormData({
        vehicle_id: incident.vehicle_id || '',
        incident_date: incidentDate,
        type: incident.type || '',
        severity: incident.severity || '',
        description: incident.description || '',
        responsible_user_id: incident.responsible_user_id || '',
        status: incident.status || 'Open',
        photo_urls: incident.photo_urls || []
      });
    } else {
      // Reset form for new incident
      setFormData({
        vehicle_id: '',
        incident_date: '',
        type: '',
        severity: '',
        description: '',
        responsible_user_id: '',
        status: 'Open',
        photo_urls: []
      });
    }
  }, [incident]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(prev => [...prev, ...files]);
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.vehicle_id || !formData.incident_date || !formData.type || 
        !formData.severity || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert the datetime-local value to ISO format
      const submitData = {
        ...formData,
        incident_date: new Date(formData.incident_date).toISOString()
      };

      console.log('Submitting form data:', submitData);
      await onSubmit(submitData, photos);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vehicle Selection */}
        <div className="space-y-2">
          <Label htmlFor="vehicle">Vehicle <span className="text-red-500">*</span></Label>
          <Select value={formData.vehicle_id} onValueChange={(value) => handleInputChange('vehicle_id', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select vehicle" />
            </SelectTrigger>
            <SelectContent>
              {vehicles.map(vehicle => (
                <SelectItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model} - {vehicle.license_plate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Incident Date */}
        <div className="space-y-2">
          <Label htmlFor="incident_date">Incident Date & Time <span className="text-red-500">*</span></Label>
          <Input
            id="incident_date"
            type="datetime-local"
            value={formData.incident_date}
            onChange={(e) => handleInputChange('incident_date', e.target.value)}
            required
          />
        </div>

        {/* Incident Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Incident Type <span className="text-red-500">*</span></Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Damage">Damage</SelectItem>
              <SelectItem value="Theft">Theft</SelectItem>
              <SelectItem value="Accident">Accident</SelectItem>
              <SelectItem value="Mechanical Issue">Mechanical Issue</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Severity */}
        <div className="space-y-2">
          <Label htmlFor="severity">Severity <span className="text-red-500">*</span></Label>
          <Select value={formData.severity} onValueChange={(value) => handleInputChange('severity', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Responsible User */}
        <div className="space-y-2">
          <Label htmlFor="responsible_user">Responsible User</Label>
          <Select value={formData.responsible_user_id} onValueChange={(value) => handleInputChange('responsible_user_id', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select responsible user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>No specific user</SelectItem>
              {users.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.full_name || user.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
        <Textarea
          id="description"
          placeholder="Describe the incident in detail..."
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          required
        />
      </div>

      {/* Photo Upload */}
      <div className="space-y-2">
        <Label htmlFor="photos">Photos</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <div className="mt-2">
              <label htmlFor="photo-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-500">Upload photos</span>
                <input
                  id="photo-upload"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>
            <p className="text-gray-500 text-sm">PNG, JPG up to 10MB each</p>
          </div>
        </div>

        {/* Display uploaded photos */}
        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {incident ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            incident ? 'Update Report' : 'Create Report'
          )}
        </Button>
      </div>
    </form>
  );
}