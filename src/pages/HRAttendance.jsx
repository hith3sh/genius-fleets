import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Plus, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExtractDataFromUploadedFile, UploadFile } from '@/api/integrations';
import { Attendance } from '@/api/entities';
import { Employee } from '@/api/entities';
import { Shift } from '@/api/entities';

import AttendanceLog from '../components/hr/AttendanceLog';
import ShiftManagement from '../components/hr/ShiftManagement';
import AttendanceForm from '../components/hr/AttendanceForm';

export default function HRAttendance() {
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const [emps, shfts, atts] = await Promise.all([
      Employee.list(),
      Shift.list(),
      Attendance.list('-date')
    ]);
    setEmployees(emps);
    setShifts(shfts);
    setAttendanceRecords(atts);
    setIsLoading(false);
  };
  
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const { file_url } = await UploadFile({ file });
      const schema = {
        type: "object",
        properties: {
            records: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        employee_name: { type: "string" },
                        id: { type: "string" },
                        hours: { type: "number" },
                        ot_hours: { type: "number" },
                        shift: { type: "string" }
                    },
                    required: ["id", "hours"]
                }
            }
        }
      };
      
      const { output } = await ExtractDataFromUploadedFile({ file_url, json_schema: schema });

      if (output && output.records) {
        const today = new Date().toISOString().split('T')[0];
        const recordsToCreate = output.records.map(rec => ({
          employee_id: employees.find(emp => emp.employee_id === rec.id)?.id,
          date: today,
          status: 'Present',
          working_hours: rec.hours,
          overtime_hours: rec.ot_hours || 0,
          shift_id: shifts.find(s => s.name.toLowerCase() === rec.shift?.toLowerCase())?.id
        })).filter(rec => rec.employee_id); // Filter out records where employee not found

        await Attendance.bulkCreate(recordsToCreate);
        alert(`${recordsToCreate.length} attendance records imported successfully!`);
        fetchData();
      }
    } catch (error) {
      console.error("CSV Import failed:", error);
      alert("Failed to import CSV. Please check the file format and try again.");
    }
    setIsLoading(false);
  };
  
  const handleAttendanceSubmit = async (data) => {
      if(editingAttendance) {
          await Attendance.update(editingAttendance.id, data);
      } else {
          await Attendance.create(data);
      }
      setShowAttendanceForm(false);
      setEditingAttendance(null);
      fetchData();
  };
  
  const handleEditAttendance = (att) => {
      setEditingAttendance(att);
      setShowAttendanceForm(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Attendance & Shifts</h1>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => document.getElementById('csv-upload').click()} disabled={isLoading}>
                <input type="file" id="csv-upload" className="hidden" accept=".csv" onChange={handleFileSelect} />
                <Upload className="mr-2 h-4 w-4" /> Import CSV
            </Button>
            <Button onClick={() => { setEditingAttendance(null); setShowAttendanceForm(true); }}>
                <Plus className="mr-2 h-4 w-4" /> Add Attendance
            </Button>
        </div>
      </div>
      
      <Tabs defaultValue="log">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="log">Attendance Log</TabsTrigger>
            <TabsTrigger value="shifts">Shift Management</TabsTrigger>
        </TabsList>
        <TabsContent value="log">
            <Card>
              <CardHeader><CardTitle>Daily Attendance Log</CardTitle></CardHeader>
              <CardContent>
                <AttendanceLog 
                    records={attendanceRecords} 
                    employees={employees} 
                    shifts={shifts}
                    onEdit={handleEditAttendance}
                />
              </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="shifts">
            <ShiftManagement initialShifts={shifts} onUpdate={fetchData} />
        </TabsContent>
      </Tabs>
      
      <Dialog open={showAttendanceForm} onOpenChange={setShowAttendanceForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingAttendance ? 'Edit' : 'Add'} Attendance</DialogTitle></DialogHeader>
          <AttendanceForm 
            employees={employees}
            shifts={shifts}
            attendance={editingAttendance}
            onSubmit={handleAttendanceSubmit}
            onCancel={() => setShowAttendanceForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}