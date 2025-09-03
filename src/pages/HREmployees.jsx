import React, { useState, useEffect } from 'react';
import { Employee } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, User as UserIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import EmployeeForm from '../components/hr/EmployeeForm';

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Inactive': 'bg-red-100 text-red-800',
};

export default function HREmployees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    let filtered = employees.filter(emp => 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const loadEmployees = async () => {
    setIsLoading(true);
    const data = await Employee.list('-created_date');
    setEmployees(data);
    setIsLoading(false);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await Employee.delete(employeeId);
      loadEmployees();
    }
  };

  const handleSubmit = async (employeeData) => {
    if (editingEmployee) {
      await Employee.update(editingEmployee.id, employeeData);
    } else {
      await Employee.create(employeeData);
    }
    setShowForm(false);
    setEditingEmployee(null);
    loadEmployees();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        <Button onClick={() => { setEditingEmployee(null); setShowForm(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, email, department..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan="7" className="text-center">Loading...</TableCell></TableRow>
              ) : (
                filteredEmployees.map(employee => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.employee_id}</TableCell>
                    <TableCell>
                      <Link to={createPageUrl(`HREmployeeProfile?id=${employee.id}`)} className="font-medium text-blue-600 hover:underline">
                        {employee.name}
                      </Link>
                    </TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{new Date(employee.join_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[employee.status]}>{employee.status}</Badge>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(employee)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(employee.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
          </DialogHeader>
          <EmployeeForm 
            employee={editingEmployee} 
            onSubmit={handleSubmit} 
            onCancel={() => setShowForm(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}