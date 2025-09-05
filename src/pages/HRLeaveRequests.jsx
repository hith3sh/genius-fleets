import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BarChart2, List, RefreshCw } from 'lucide-react';
import { LeaveRequest } from '@/api/entities';
import { Employee } from '@/api/entities';
import { User } from '@/api/entities';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

import LeaveRequestForm from '../components/hr/LeaveRequestForm';
import LeaveRequestList from '../components/hr/LeaveRequestList';
import LeaveBalanceCard from '../components/hr/LeaveBalanceCard';

export default function HRLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [requests, emps, user] = await Promise.all([
        LeaveRequest.list(),
        Employee.list(),
        User.me()
      ]);
      setLeaveRequests(requests);
      setEmployees(emps);
      setCurrentUser(user);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      alert('Error loading leave requests. Please try again.');
    }
    setIsLoading(false);
  };
  
  const handleFormSubmit = async (data) => {
    try {
      if (editingRequest) {
        console.log('Updating leave request:', editingRequest.id, data);
        await LeaveRequest.update(editingRequest.id, data);
        alert('Leave request updated successfully!');
      } else {
        console.log('Creating new leave request:', data);
        await LeaveRequest.create(data);
        alert('Leave request created successfully!');
      }
      
      setShowForm(false);
      setEditingRequest(null);
      await fetchData(); // Reload data
    } catch (error) {
      console.error('Error saving leave request:', error);
      alert('Error saving leave request. Please try again.');
    }
  };

  const handleStatusUpdate = async (request, newStatus, commentField, comment) => {
    try {
      const updateData = { 
        status: newStatus, 
        [commentField]: comment 
      };
      
      console.log('Updating leave request status:', request.id, updateData);
      await LeaveRequest.update(request.id, updateData);

      // If fully approved, deduct from balance
      if (newStatus === 'Approved') {
        const employee = employees.find(e => e.id === request.employee_id);
        if (employee) {
          const startDate = new Date(request.start_date);
          const endDate = new Date(request.end_date);
          const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
          
          let balanceFieldToUpdate;
          if (request.leave_type === 'Annual') balanceFieldToUpdate = 'annual_leave_balance';
          if (request.leave_type === 'Sick') balanceFieldToUpdate = 'sick_leave_balance';
          
          if (balanceFieldToUpdate && employee[balanceFieldToUpdate] !== undefined) {
            const newBalance = Math.max(0, (employee[balanceFieldToUpdate] || 0) - duration);
            console.log('Updating employee balance:', employee.id, balanceFieldToUpdate, newBalance);
            await Employee.update(employee.id, { [balanceFieldToUpdate]: newBalance });
          }
        }
      }
      
      await fetchData(); // Reload data
      alert(`Leave request ${newStatus.toLowerCase()} successfully!`);
    } catch (error) {
      console.error('Error updating leave request:', error);
      alert('Error updating leave request. Please try again.');
    }
  };

  const handleEdit = (request) => {
    console.log('Editing leave request:', request);
    setEditingRequest(request);
    setShowForm(true);
  };

  const handleNewRequest = () => {
    setEditingRequest(null);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setEditingRequest(null);
  };

  const employeeMap = employees.reduce((acc, emp) => {
    acc[emp.id] = emp;
    return acc;
  }, {});
  
  const currentUserEmployee = employees.find(e => e.email === currentUser?.email);

  // Calculate summary statistics
  const pendingRequests = leaveRequests.filter(r => r.status === 'Pending').length;
  const approvedRequests = leaveRequests.filter(r => r.status === 'Approved').length;
  const rejectedRequests = leaveRequests.filter(r => r.status === 'Rejected').length;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Leave Management</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading leave requests...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Leave Management</h1>
          <p className="text-gray-600 mt-1">Manage employee leave requests and approvals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchData} disabled={isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={handleNewRequest}>
            <Plus className="mr-2 h-4 w-4" />
            New Leave Request
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{leaveRequests.length}</p>
              </div>
              <List className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">{pendingRequests}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedRequests}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">{approvedRequests}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedRequests}</p>
              </div>
              <Badge className="bg-red-100 text-red-800">{rejectedRequests}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Current User's Leave Balance */}
      {currentUserEmployee && (
        <LeaveBalanceCard employee={currentUserEmployee} />
      )}

      {/* Leave Requests List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List className="h-5 w-5" />
            Leave Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LeaveRequestList 
            requests={leaveRequests} 
            employeeMap={employeeMap}
            currentUser={currentUser}
            onStatusUpdate={handleStatusUpdate} 
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>

      {/* Leave Request Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRequest ? 'Edit Leave Request' : 'New Leave Request'}
            </DialogTitle>
          </DialogHeader>
          <LeaveRequestForm
            employees={employees}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelEdit}
            request={editingRequest}
            currentUserEmployeeId={currentUserEmployee?.id}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}