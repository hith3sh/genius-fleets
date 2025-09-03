import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Edit, Check, X, MessageCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Approved by Manager': 'bg-blue-100 text-blue-800 border-blue-200',
  'Approved': 'bg-green-100 text-green-800 border-green-200',
  'Rejected': 'bg-red-100 text-red-800 border-red-200'
};

export default function LeaveRequestList({ 
  requests, 
  employeeMap, 
  currentUser, 
  onStatusUpdate, 
  onEdit 
}) {
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approvalAction, setApprovalAction] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canApprove = (request) => {
    // Managers and HR Admins can approve requests
    return ['Manager', 'HR Admin', 'Management', 'admin'].includes(currentUser?.role) && 
           request.status !== 'Approved' && request.status !== 'Rejected';
  };

  const canEdit = (request) => {
    // Users can edit their own pending requests, or managers/HR can edit any
    const isOwnRequest = employeeMap[request.employee_id]?.email === currentUser?.email;
    const isManager = ['Manager', 'HR Admin', 'Management', 'admin'].includes(currentUser?.role);
    return (isOwnRequest && request.status === 'Pending') || isManager;
  };

  const handleApprovalClick = (request, action) => {
    setSelectedRequest(request);
    setApprovalAction(action);
    setComment('');
    setShowApprovalDialog(true);
  };

  const handleApprovalSubmit = async () => {
    if (!selectedRequest || !approvalAction) return;

    setIsSubmitting(true);
    try {
      let newStatus;
      let commentField;

      if (approvalAction === 'approve') {
        newStatus = currentUser?.role === 'Manager' ? 'Approved by Manager' : 'Approved';
        commentField = currentUser?.role === 'Manager' ? 'manager_comment' : 'hr_comment';
      } else {
        newStatus = 'Rejected';
        commentField = currentUser?.role === 'Manager' ? 'manager_comment' : 'hr_comment';
      }

      await onStatusUpdate(selectedRequest, newStatus, commentField, comment);
      setShowApprovalDialog(false);
      setSelectedRequest(null);
      setApprovalAction('');
      setComment('');
    } catch (error) {
      console.error('Error updating leave request:', error);
      alert('Error updating leave request. Please try again.');
    }
    setIsSubmitting(false);
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  if (!requests || requests.length === 0) {
    return (
      <div className="text-center py-8">
        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No leave requests found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map(request => {
              const employee = employeeMap[request.employee_id];
              const duration = calculateDuration(request.start_date, request.end_date);
              
              return (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {employee?.name || 'Unknown Employee'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee?.department || 'N/A'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium">
                      {request.leave_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {format(new Date(request.start_date), 'MMM dd, yyyy')}
                      </div>
                      <div className="text-sm text-gray-500">
                        to {format(new Date(request.end_date), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{duration} day{duration > 1 ? 's' : ''}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[request.status] || statusColors.Pending}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="truncate text-sm" title={request.reason}>
                        {request.reason}
                      </p>
                      {request.manager_comment && (
                        <p className="text-xs text-blue-600 mt-1 truncate" title={request.manager_comment}>
                          <MessageCircle className="inline w-3 h-3 mr-1" />
                          Manager: {request.manager_comment}
                        </p>
                      )}
                      {request.hr_comment && (
                        <p className="text-xs text-purple-600 mt-1 truncate" title={request.hr_comment}>
                          <MessageCircle className="inline w-3 h-3 mr-1" />
                          HR: {request.hr_comment}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {canEdit(request) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(request)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      )}
                      
                      {canApprove(request) && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprovalClick(request, 'approve')}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprovalClick(request, 'reject')}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {approvalAction === 'approve' ? 'Approve' : 'Reject'} Leave Request
            </DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Request Details:</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Employee:</strong> {employeeMap[selectedRequest.employee_id]?.name}</p>
                  <p><strong>Type:</strong> {selectedRequest.leave_type}</p>
                  <p><strong>Duration:</strong> {calculateDuration(selectedRequest.start_date, selectedRequest.end_date)} days</p>
                  <p><strong>Dates:</strong> {format(new Date(selectedRequest.start_date), 'MMM dd')} - {format(new Date(selectedRequest.end_date), 'MMM dd, yyyy')}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="approval-comment">
                  Comment {approvalAction === 'reject' ? '(Required)' : '(Optional)'}
                </Label>
                <Textarea
                  id="approval-comment"
                  placeholder={`Add your ${approvalAction === 'approve' ? 'approval' : 'rejection'} comments...`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  required={approvalAction === 'reject'}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowApprovalDialog(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleApprovalSubmit}
                  disabled={isSubmitting || (approvalAction === 'reject' && !comment.trim())}
                  className={approvalAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    approvalAction === 'approve' ? 'Approve Request' : 'Reject Request'
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}