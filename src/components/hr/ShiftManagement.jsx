import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Shift } from '@/api/entities';

export default function ShiftManagement({ initialShifts, onUpdate }) {
  const [shifts, setShifts] = useState(initialShifts);
  const [newShift, setNewShift] = useState({ name: '', start_time: '', end_time: '' });

  const handleAddShift = async () => {
    if (!newShift.name || !newShift.start_time || !newShift.end_time) {
      alert("Please fill all fields for the new shift.");
      return;
    }
    const start = new Date(`1970-01-01T${newShift.start_time}`);
    const end = new Date(`1970-01-01T${newShift.end_time}`);
    let duration_hours = (end - start) / (1000 * 60 * 60);
    if(duration_hours < 0) duration_hours += 24;

    await Shift.create({ ...newShift, duration_hours });
    setNewShift({ name: '', start_time: '', end_time: '' });
    onUpdate(); // Re-fetch all data in parent
  };

  const handleDeleteShift = async (id) => {
    if(confirm("Are you sure you want to delete this shift?")) {
      await Shift.delete(id);
      onUpdate();
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle>Manage Shifts</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-4 gap-4 items-end">
          <div className="space-y-2 col-span-2">
            <Label>Shift Name</Label>
            <Input value={newShift.name} onChange={e => setNewShift({...newShift, name: e.target.value})} placeholder="e.g., Morning Shift"/>
          </div>
          <div className="space-y-2">
            <Label>Start Time</Label>
            <Input type="time" value={newShift.start_time} onChange={e => setNewShift({...newShift, start_time: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label>End Time</Label>
            <Input type="time" value={newShift.end_time} onChange={e => setNewShift({...newShift, end_time: e.target.value})}/>
          </div>
        </div>
        <Button onClick={handleAddShift}><Plus className="mr-2 h-4 w-4"/> Add Shift</Button>
        <div className="space-y-2 pt-4">
          {shifts.map(shift => (
            <div key={shift.id} className="flex justify-between items-center p-2 border rounded">
              <div>
                <p className="font-medium">{shift.name}</p>
                <p className="text-sm text-gray-500">{shift.start_time} - {shift.end_time} ({shift.duration_hours} hours)</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteShift(shift.id)}>
                <Trash2 className="w-4 h-4 text-red-500"/>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}