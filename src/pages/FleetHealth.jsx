import React, { useState, useEffect } from 'react';
import { MaintenanceLog } from '@/api/entities';
import { Vehicle } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MaintenanceForm from '../components/fleet/MaintenanceForm';
import { Badge } from '@/components/ui/badge';

const statusColors = {
  Upcoming: 'bg-blue-100 text-blue-800',
  Due: 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-green-100 text-green-800',
  Overdue: 'bg-red-100 text-red-800'
};

export default function FleetHealth() {
  const [logs, setLogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLog, setEditingLog] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const [logsData, vehiclesData] = await Promise.all([
      MaintenanceLog.list('-service_date'),
      Vehicle.list()
    ]);
    setLogs(logsData);
    setVehicles(vehiclesData);
    setIsLoading(false);
  };
  
  const vehicleMap = vehicles.reduce((acc, v) => ({ ...acc, [v.id]: v }), {});

  const handleSubmit = async (formData, reportFile) => {
    // In a real app, you would handle the file upload here.
    // e.g., const report_url = await uploadFile(reportFile);
    await MaintenanceLog.create(formData);
    setShowForm(false);
    fetchData();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Fleet Health</h1>
        <Button onClick={() => setShowForm(true)}><Plus className="mr-2 h-4 w-4" /> Log Service</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Maintenance History</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Vehicle</TableHead><TableHead>Service Date</TableHead><TableHead>Type</TableHead><TableHead>Cost</TableHead><TableHead>Status</TableHead><TableHead>Report</TableHead></TableRow></TableHeader>
            <TableBody>
              {logs.map(log => (
                <TableRow key={log.id}>
                  <TableCell>{vehicleMap[log.vehicle_id]?.make} {vehicleMap[log.vehicle_id]?.model}</TableCell>
                  <TableCell>{new Date(log.service_date).toLocaleDateString()}</TableCell>
                  <TableCell>{log.service_type}</TableCell>
                  <TableCell>AED {log.cost.toLocaleString()}</TableCell>
                  <TableCell><Badge className={statusColors[log.status]}>{log.status}</Badge></TableCell>
                  <TableCell>
                    {log.report_url ? <a href={log.report_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View</a> : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>Log New Maintenance</DialogTitle></DialogHeader>
          <MaintenanceForm vehicles={vehicles} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}