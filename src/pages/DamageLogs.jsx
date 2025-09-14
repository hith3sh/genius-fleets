import React, { useState, useEffect } from 'react';
import IncidentLog from '@/api/entities/incidentLog';
import Vehicle from '@/api/entities/vehicle';
import User from '@/api/entities/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import IncidentForm from '../components/fleet/IncidentForm';
import { Badge } from '@/components/ui/badge';

const severityColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-orange-100 text-orange-800',
    Critical: 'bg-red-100 text-red-800'
};

const statusColors = {
    Open: 'bg-blue-100 text-blue-800',
    'Under Review': 'bg-yellow-100 text-yellow-800',
    Resolved: 'bg-green-100 text-green-800'
};

export default function DamageLogs() {
  const [incidents, setIncidents] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Multi-level fallback loading for incidents
      let incidentsData = [];
      try {
        incidentsData = await IncidentLog.list('-incident_date');
      } catch (incidentError) {
        console.warn('Primary incident loading failed, trying alternative ordering:', incidentError);
        try {
          incidentsData = await IncidentLog.list('-created_at');
        } catch (incidentError2) {
          console.warn('Alternative incident ordering failed, trying without ordering:', incidentError2);
          try {
            incidentsData = await IncidentLog.list();
          } catch (incidentError3) {
            console.warn('Entity method failed, trying direct Supabase query:', incidentError3);
            const { supabase } = await import('@/lib/supabase');
            const { data } = await supabase.from('incident_log').select('*').order('created_at', { ascending: false });
            incidentsData = data || [];
          }
        }
      }

      // Multi-level fallback loading for vehicles
      let vehiclesData = [];
      try {
        vehiclesData = await Vehicle.list('-updated_date');
      } catch (vehicleError) {
        console.warn('Primary vehicle loading failed, trying alternative ordering:', vehicleError);
        try {
          vehiclesData = await Vehicle.list('-created_at');
        } catch (vehicleError2) {
          console.warn('Alternative vehicle ordering failed, trying without ordering:', vehicleError2);
          try {
            vehiclesData = await Vehicle.list();
          } catch (vehicleError3) {
            console.warn('Entity method failed, trying direct Supabase query:', vehicleError3);
            const { supabase } = await import('@/lib/supabase');
            const { data } = await supabase.from('vehicle').select('*').order('created_at', { ascending: false });
            vehiclesData = data || [];
          }
        }
      }

      // Multi-level fallback loading for users
      let usersData = [];
      try {
        usersData = await User.list('-updated_date');
      } catch (userError) {
        console.warn('Primary user loading failed, trying alternative ordering:', userError);
        try {
          usersData = await User.list('-created_at');
        } catch (userError2) {
          console.warn('Alternative user ordering failed, trying without ordering:', userError2);
          try {
            usersData = await User.list();
          } catch (userError3) {
            console.warn('Entity method failed, trying direct Supabase query:', userError3);
            const { supabase } = await import('@/lib/supabase');
            const { data } = await supabase.from('user_access').select('*').order('created_at', { ascending: false });
            usersData = data || [];
          }
        }
      }

      setIncidents(incidentsData);
      setVehicles(vehiclesData);
      setUsers(usersData);

      console.log(`Loaded ${incidentsData.length} incidents, ${vehiclesData.length} vehicles, ${usersData.length} users`);
    } catch (error) {
      console.error('Error fetching data:', error);
      
      // Enhanced error message with RLS policy information
      let errorMessage = 'Error loading data. Please try again.';
      if (error.message?.includes('row-level security policy')) {
        errorMessage = 'Permission denied: You don\'t have access to view incident logs. Please contact your administrator.';
      } else if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
        errorMessage = 'Database table not found. Please ensure the incident_log table exists in your database.';
      }
      
      alert(errorMessage);
    }
    setIsLoading(false);
  };
  
  const vehicleMap = vehicles.reduce((acc, v) => ({ ...acc, [v.id]: v }), {});
  const userMap = users.reduce((acc, u) => ({ ...acc, [u.id]: u }), {});

  const handleSubmit = async (formData, photos) => {
    try {
      console.log('Submitting incident:', formData);
      
      if (editingIncident) {
        // Update existing incident
        await IncidentLog.update(editingIncident.id, formData);
        console.log('Incident updated successfully');
      } else {
        // Create new incident
        await IncidentLog.create(formData);
        console.log('Incident created successfully');
      }
      
      setShowForm(false);
      setEditingIncident(null);
      await fetchData(); // Reload data to show changes
      
      // Show success message
      alert(editingIncident ? 'Incident updated successfully!' : 'Incident created successfully!');
      
    } catch (error) {
      console.error('Error saving incident:', error);
      alert(`Error ${editingIncident ? 'updating' : 'creating'} incident. Please try again.`);
    }
  };

  const handleEdit = (incident) => {
    console.log('Editing incident:', incident);
    setEditingIncident(incident);
    setShowForm(true);
  };

  const handleDelete = async (incident) => {
    if (window.confirm('Are you sure you want to delete this incident log? This action cannot be undone.')) {
      try {
        await IncidentLog.delete(incident.id);
        await fetchData(); // Reload data
        alert('Incident deleted successfully!');
      } catch (error) {
        console.error('Error deleting incident:', error);
        alert('Error deleting incident. Please try again.');
      }
    }
  };

  const handleNewIncident = () => {
    setEditingIncident(null);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setEditingIncident(null);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Damage & Incident Logs</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading incident logs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Damage & Incident Logs</h1>
          <p className="text-gray-600 mt-1">Track and manage vehicle incidents and damage reports</p>
        </div>
        <Button onClick={handleNewIncident} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Incident Reports</span>
            <Badge variant="outline" className="text-sm">
              {incidents.length} Total Records
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {incidents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No incident reports found.</p>
              <Button onClick={handleNewIncident} className="mt-4" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Create First Report
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map(incident => {
                    const vehicle = vehicleMap[incident.vehicle_id];
                    const user = userMap[incident.responsible_user_id];
                    
                    return (
                      <TableRow key={incident.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {vehicle?.license_plate || 'N/A'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {new Date(incident.incident_date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(incident.incident_date).toLocaleTimeString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{incident.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={severityColors[incident.severity]}>
                            {incident.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[incident.status]}>
                            {incident.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={incident.description}>
                            {incident.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(incident)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(incident)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingIncident ? 'Edit Incident Report' : 'New Incident Report'}
            </DialogTitle>
          </DialogHeader>
          <IncidentForm 
            vehicles={vehicles} 
            users={users} 
            incident={editingIncident}
            onSubmit={handleSubmit} 
            onCancel={handleCancelEdit} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}