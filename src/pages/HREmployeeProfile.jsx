import React, { useState, useEffect } from 'react';
import { Employee } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Phone, Mail, MapPin, Briefcase, Calendar, Edit, Upload } from 'lucide-react';

export default function HREmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');
    if (employeeId) {
      loadEmployee(employeeId);
    }
  }, []);

  const loadEmployee = async (id) => {
    setIsLoading(true);
    const data = await Employee.get(id);
    setEmployee(data);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="p-6">Loading employee profile...</div>;
  }

  if (!employee) {
    return <div className="p-6">Employee not found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="p-6 flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{employee.name}</h1>
            <p className="text-xl text-gray-600">{employee.designation}</p>
            <p className="text-gray-500">{employee.department}</p>
          </div>
          <Button className="ml-auto">
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal Details</TabsTrigger>
          <TabsTrigger value="job">Job Information</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={Mail} label="Email" value={employee.email} />
              <InfoItem icon={Phone} label="Phone" value={employee.phone} />
              <InfoItem icon={Calendar} label="Date of Birth" value={new Date(employee.date_of_birth).toLocaleDateString()} />
              <InfoItem icon={User} label="Gender" value={employee.gender} />
              <InfoItem icon={MapPin} label="Address" value={employee.address} className="col-span-2" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="job" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Job Details</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={Briefcase} label="Employment Type" value={employee.employment_type} />
              <InfoItem icon={Calendar} label="Joining Date" value={new Date(employee.join_date).toLocaleDateString()} />
              <InfoItem icon={User} label="Reporting Manager" value={employee.reporting_manager_id || 'N/A'} />
              <InfoItem icon={Briefcase} label="Base Salary" value={`AED ${employee.base_salary.toLocaleString()}`} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Uploaded Documents</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <DocumentItem label="Passport Copy" url={employee.passport_copy_url} />
                <DocumentItem label="Visa Page" url={employee.visa_page_url} />
                <DocumentItem label="Emirates ID" url={employee.emirates_id_url} />
                <Button><Upload className="mr-2 h-4 w-4" /> Upload New Document</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const InfoItem = ({ icon: Icon, label, value, className }) => (
  <div className={className}>
    <p className="text-sm text-gray-500 flex items-center gap-2"><Icon className="w-4 h-4" /> {label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const DocumentItem = ({ label, url }) => (
    <div className="flex justify-between items-center p-3 border rounded-lg">
        <p className="font-medium">{label}</p>
        {url ? <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Document</a> : <p className="text-gray-400">Not Uploaded</p>}
    </div>
);