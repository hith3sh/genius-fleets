import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function LeaveRequestForm({ 
  employees, 
  onSubmit, 
  onCancel, 
  request, 
  currentUserEmployeeId 
}) {
  const [formData, setFormData] = useState({
    employee_id: currentUserEmployeeId || '',
    leave_type: 'Annual',
    start_date: '',
    end_date: '',
    reason: '',
    status: 'Pending'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when editing an existing request
  useEffect(() => {
    if (request) {
      console.log('Initializing form with request data:', request);
      setFormData({
        employee_id: request.employee_id || '',
        leave_type: request.leave_type || 'Annual',
        start_date: request.start_date || '',
        end_date: request.end_date || '',
        reason: request.reason || '',
        status: request.status || 'Pending'
      });
    } else {
      // Reset form for new request
      setFormData({
        employee_id: currentUserEmployeeId || '',
        leave_type: 'Annual',
        start_date: '',
        end_date: '',
        reason: '',
        status: 'Pending'
      });
    }
  }, [request, currentUserEmployeeId]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.employee_id || !formData.start_date || !formData.end_date || !formData.reason.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    // Validate date range
    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);
    if (endDate < startDate) {
      alert('End date cannot be earlier than start date.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
    setIsSubmitting(false);
  };

  const calculateDuration = () => {
    if (!formData.start_date || !formData.end_date) return 0;
    const start = new Date(formData.start_date);
    const end = new Date(formData.end_date);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const duration = calculateDuration();
  const selectedEmployee = employees.find(e => e.id === formData.employee_id);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      {/* Employee Selection */}
      <div className="space-y-2">
        <Label htmlFor="employee_id">Employee <span className="text-red-500">*</span></Label>
        <Select 
          value={formData.employee_id} 
          onValueChange={v => handleChange('employee_id', v)} 
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select employee..." />
          </SelectTrigger>
          <SelectContent>
            {employees.map(emp => (
              <SelectItem key={emp.id} value={emp.id}>
                <div>
                  <div className="font-medium">{emp.name}</div>
                  <div className="text-xs text-gray-500">{emp.department} - {emp.designation}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Leave Type */}
      <div className="space-y-2">
        <Label htmlFor="leave_type">Leave Type <span className="text-red-500">*</span></Label>
        <Select 
          value={formData.leave_type} 
          onValueChange={v => handleChange('leave_type', v)} 
          required
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Annual">Annual Leave</SelectItem>
            <SelectItem value="Sick">Sick Leave</SelectItem>
            <SelectItem value="Casual">Casual Leave</SelectItem>
            <SelectItem value="Unpaid">Unpaid Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start_date">Start Date <span className="text-red-500">*</span></Label>
          <Input 
            id="start_date" 
            type="date" 
            value={formData.start_date} 
            onChange={e => handleChange('start_date', e.target.value)} 
            min={new Date().toISOString().split('T')[0]} // Prevent past dates for new requests
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end_date">End Date <span className="text-red-500">*</span></Label>
          <Input 
            id="end_date" 
            type="date" 
            value={formData.end_date} 
            onChange={e => handleChange('end_date', e.target.value)} 
            min={formData.start_date || new Date().toISOString().split('T')[0]}
            required 
          />
        </div>
      </div>

      {/* Duration Display */}
      {duration > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-800">
            <CalendarDays className="h-5 w-5" />
            <span className="font-medium">
              Duration: {duration} day{duration > 1 ? 's' : ''}
            </span>
          </div>
          {formData.start_date && formData.end_date && (
            <div className="text-sm text-blue-600 mt-1">
              {format(new Date(formData.start_date), 'EEEE, MMM dd, yyyy')} to {format(new Date(formData.end_date), 'EEEE, MMM dd, yyyy')}
            </div>
          )}
        </div>
      )}

      {/* Leave Balance Information */}
      {selectedEmployee && formData.leave_type === 'Annual' && selectedEmployee.annual_leave_balance !== undefined && (
        <div className={`border rounded-lg p-4 ${selectedEmployee.annual_leave_balance < duration ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <div className="flex items-center gap-2">
            <AlertCircle className={`h-5 w-5 ${selectedEmployee.annual_leave_balance < duration ? 'text-red-600' : 'text-green-600'}`} />
            <span className={`font-medium ${selectedEmployee.annual_leave_balance < duration ? 'text-red-800' : 'text-green-800'}`}>
              Annual Leave Balance: {selectedEmployee.annual_leave_balance || 0} days
            </span>
          </div>
          {selectedEmployee.annual_leave_balance < duration && (
            <p className="text-sm text-red-600 mt-1">
              Warning: This request exceeds available balance by {duration - selectedEmployee.annual_leave_balance} days.
            </p>
          )}
        </div>
      )}

      {selectedEmployee && formData.leave_type === 'Sick' && selectedEmployee.sick_leave_balance !== undefined && (
        <div className={`border rounded-lg p-4 ${selectedEmployee.sick_leave_balance < duration ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <div className="flex items-center gap-2">
            <AlertCircle className={`h-5 w-5 ${selectedEmployee.sick_leave_balance < duration ? 'text-red-600' : 'text-green-600'}`} />
            <span className={`font-medium ${selectedEmployee.sick_leave_balance < duration ? 'text-red-800' : 'text-green-800'}`}>
              Sick Leave Balance: {selectedEmployee.sick_leave_balance || 0} days
            </span>
          </div>
          {selectedEmployee.sick_leave_balance < duration && (
            <p className="text-sm text-red-600 mt-1">
              Warning: This request exceeds available balance by {duration - selectedEmployee.sick_leave_balance} days.
            </p>
          )}
        </div>
      )}

      {/* Reason */}
      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Leave <span className="text-red-500">*</span></Label>
        <Textarea 
          id="reason" 
          placeholder="Please provide details about your leave request..."
          value={formData.reason} 
          onChange={e => handleChange('reason', e.target.value)} 
          rows={4}
          required 
        />
      </div>

      {/* Status (for editing only) */}
      {request && (
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={v => handleChange('status', v)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved by Manager">Approved by Manager</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {request ? 'Updating...' : 'Submitting...'}
            </>
          ) : (
            request ? 'Update Request' : 'Submit Request'
          )}
        </Button>
      </div>
    </form>
  );
}