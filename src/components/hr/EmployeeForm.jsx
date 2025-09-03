import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EmployeeForm({ employee, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(employee || {
    employee_id: '',
    name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    nationality: '',
    gender: 'Male',
    address: '',
    department: '',
    designation: '',
    join_date: '',
    employment_type: 'Full-time',
    reporting_manager_id: '',
    status: 'Active',
    base_salary: 0,
    passport_copy_url: '',
    visa_page_url: '',
    emirates_id_url: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="job">Job</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={formData.name} onChange={e => handleChange('name', e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="employee_id">Employee ID</Label>
                    <Input id="employee_id" value={formData.employee_id} onChange={e => handleChange('employee_id', e.target.value)} required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input id="date_of_birth" type="date" value={formData.date_of_birth} onChange={e => handleChange('date_of_birth', e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={v => handleChange('gender', v)}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
                    </Select>
                </div>
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" value={formData.address} onChange={e => handleChange('address', e.target.value)} />
                </div>
            </TabsContent>
             <TabsContent value="job" className="grid grid-cols-2 gap-4 py-4">
                 <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" value={formData.department} onChange={e => handleChange('department', e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" value={formData.designation} onChange={e => handleChange('designation', e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="join_date">Join Date</Label>
                    <Input id="join_date" type="date" value={formData.join_date} onChange={e => handleChange('join_date', e.target.value)} required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="employment_type">Employment Type</Label>
                    <Select value={formData.employment_type} onValueChange={v => handleChange('employment_type', v)}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent><SelectItem value="Full-time">Full-time</SelectItem><SelectItem value="Part-time">Part-time</SelectItem><SelectItem value="Contract">Contract</SelectItem></SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="base_salary">Base Salary (AED)</Label>
                    <Input id="base_salary" type="number" value={formData.base_salary} onChange={e => handleChange('base_salary', parseFloat(e.target.value))} required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={v => handleChange('status', v)}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Inactive">Inactive</SelectItem></SelectContent>
                    </Select>
                </div>
             </TabsContent>
            <TabsContent value="documents" className="grid grid-cols-1 gap-4 py-4">
                 <div className="space-y-2">
                    <Label htmlFor="passport_copy_url">Passport Copy URL</Label>
                    <Input id="passport_copy_url" value={formData.passport_copy_url} onChange={e => handleChange('passport_copy_url', e.target.value)} placeholder="Link to uploaded document" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="visa_page_url">Visa Page URL</Label>
                    <Input id="visa_page_url" value={formData.visa_page_url} onChange={e => handleChange('visa_page_url', e.target.value)} placeholder="Link to uploaded document" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="emirates_id_url">Emirates ID URL</Label>
                    <Input id="emirates_id_url" value={formData.emirates_id_url} onChange={e => handleChange('emirates_id_url', e.target.value)} placeholder="Link to uploaded document" />
                </div>
            </TabsContent>
        </Tabs>
        <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Save Employee</Button>
        </div>
    </form>
  );
}