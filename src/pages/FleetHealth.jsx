import React, { useState, useEffect } from 'react';
import { MaintenanceLog } from '@/api/entities';
import { Vehicle } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Download, Edit, Trash2 } from 'lucide-react';
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
    try {
      // Multi-level fallback strategy for loading vehicles (same as FleetManagement)
      let vehiclesData = [];
      try {
        vehiclesData = await Vehicle.list('-updated_date');
      } catch (orderError) {
        console.log('Failed to load vehicles with -updated_date, trying -created_at...', orderError);
        try {
          vehiclesData = await Vehicle.list('-created_at');
        } catch (createdAtError) {
          console.log('Failed to load vehicles with -created_at, trying basic list...', createdAtError);
          try {
            vehiclesData = await Vehicle.list();
          } catch (basicError) {
            console.log('Failed basic vehicle list, trying direct query...', basicError);
            try {
              const { supabase } = await import('@/lib/railway-db');
              const result = await supabase.from('vehicle').select('*');
              if (result.error) throw result.error;
              vehiclesData = result.data || [];
              console.log('Direct vehicle query successful:', vehiclesData);
            } catch (directError) {
              console.error('All vehicle loading methods failed:', directError);
              vehiclesData = [];
            }
          }
        }
      }

      // Load maintenance logs with fallback
      let logsData = [];
      try {
        logsData = await MaintenanceLog.list('-service_date');
      } catch (logsError) {
        console.log('Failed to load maintenance logs with ordering, trying basic list...', logsError);
        try {
          logsData = await MaintenanceLog.list();
        } catch (basicLogsError) {
          console.log('Failed basic maintenance logs list, trying direct query...', basicLogsError);
          try {
            const { supabase } = await import('@/lib/railway-db');
            const result = await supabase.from('maintenance_log').select('*');
            if (result.error) throw result.error;
            logsData = result.data || [];
          } catch (directLogsError) {
            console.error('All maintenance logs loading methods failed:', directLogsError);
            logsData = [];
          }
        }
      }

      console.log('FleetHealth loaded data:', { vehicles: vehiclesData.length, logs: logsData.length });
      setLogs(logsData);
      setVehicles(vehiclesData);
    } catch (error) {
      console.error('Error in fetchData:', error);
      setLogs([]);
      setVehicles([]);
    }
    setIsLoading(false);
  };
  
  const vehicleMap = vehicles.reduce((acc, v) => ({ ...acc, [v.id]: v }), {});

  const handleSubmit = async (formData, reportFile) => {
    try {
      let report_url = editingLog?.report_url || null;

      // Upload report file if provided
      if (reportFile) {
        console.log('Uploading maintenance report:', reportFile.name);
        const { UploadFile } = await import('@/api/integrations');
        const uploadResult = await UploadFile({
          file: reportFile,
          bucket: 'VehicleImages',
          folder: 'maintenance-reports'
        });
        report_url = uploadResult.file_url;
        console.log('Report uploaded successfully:', report_url);
      }

      // Create or update maintenance log
      const maintenanceData = {
        ...formData,
        report_url,
        status: formData.status || 'Completed'
      };

      if (editingLog) {
        // Update existing log
        await MaintenanceLog.update(editingLog.id, maintenanceData);
        console.log('Maintenance log updated successfully');
      } else {
        // Create new log
        await MaintenanceLog.create(maintenanceData);
        console.log('Maintenance log created successfully');
      }

      setShowForm(false);
      setEditingLog(null);
      fetchData();
    } catch (error) {
      console.error('Error saving maintenance log:', error);
      alert('Failed to save maintenance log. Please try again.');
    }
  };

  const handleEdit = (log) => {
    setEditingLog(log);
    setShowForm(true);
  };

  const handleDelete = async (logId) => {
    if (confirm('Are you sure you want to delete this maintenance log? This action cannot be undone.')) {
      try {
        await MaintenanceLog.delete(logId);
        fetchData();
        console.log('Maintenance log deleted successfully');
      } catch (error) {
        console.error('Error deleting maintenance log:', error);
        alert('Failed to delete maintenance log. Please try again.');
      }
    }
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
            <TableHeader><TableRow><TableHead>Vehicle</TableHead><TableHead>Service Date</TableHead><TableHead>Type</TableHead><TableHead>Cost</TableHead><TableHead>Status</TableHead><TableHead>Report</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
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
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(log)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(log.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingLog ? 'Edit Maintenance Log' : 'Log New Maintenance'}
            </DialogTitle>
          </DialogHeader>
          <MaintenanceForm
            vehicles={vehicles}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingLog(null);
            }}
            editingLog={editingLog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}