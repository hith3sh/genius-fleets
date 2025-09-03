import React, { useState, useEffect } from 'react';
import { FineLog } from '@/api/entities';
import { Vehicle } from '@/api/entities';
import { User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FineForm from '../components/fleet/FineForm';
import { Badge } from '@/components/ui/badge';

export default function SalikFines() {
  const [fines, setFines] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchData() }, []);

  const fetchData = async () => {
    const [finesData, vehiclesData, usersData] = await Promise.all([
        FineLog.list('-fine_date'),
        Vehicle.list(),
        User.list()
    ]);
    setFines(finesData);
    setVehicles(vehiclesData);
    setUsers(usersData);
  };
  
  const vehicleMap = vehicles.reduce((acc, v) => ({ ...acc, [v.id]: v }), {});

  const handleSubmit = async (formData) => {
    await FineLog.create(formData);
    setShowForm(false);
    fetchData();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Salik & Fines</h1>
        <div>
            <Button variant="outline" className="mr-2">Fetch from RTA</Button>
            <Button onClick={() => setShowForm(true)}><Plus className="mr-2 h-4 w-4" /> Add Manually</Button>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle>All Fines</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Vehicle</TableHead><TableHead>Date</TableHead><TableHead>Type</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {fines.map(fine => (
                <TableRow key={fine.id}>
                  <TableCell>{vehicleMap[fine.vehicle_id]?.make} {vehicleMap[fine.vehicle_id]?.model}</TableCell>
                  <TableCell>{new Date(fine.fine_date).toLocaleDateString()}</TableCell>
                  <TableCell>{fine.type}</TableCell>
                  <TableCell>AED {fine.amount.toLocaleString()}</TableCell>
                  <TableCell><Badge>{fine.payment_status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent><DialogHeader><DialogTitle>Add Fine Manually</DialogTitle></DialogHeader>
          <FineForm vehicles={vehicles} users={users} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
          </DialogContent>
      </Dialog>
    </div>
  );
}