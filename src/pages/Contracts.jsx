
import React, { useState, useEffect } from 'react';
import VehicleContract from '@/api/entities/vehicleContract';
import Vehicle from '@/api/entities/vehicle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, FileText, Edit, Trash2, Calendar } from 'lucide-react';
import ContractForm from '../components/fleet/ContractForm';

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Expired': 'bg-red-100 text-red-800',
  'Terminated': 'bg-gray-100 text-gray-800'
};

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingContract, setEditingContract] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Filter contracts logic moved inside useEffect
    let filtered = contracts.filter(contract => {
      const vehicle = vehicles.find(v => v.id === contract.vehicle_id);
      const vehicleInfo = vehicle ? `${vehicle.make} ${vehicle.model} ${vehicle.license_plate}` : '';
      
      const matchesSearch = contract.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicleInfo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || contract.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    setFilteredContracts(filtered);
  }, [contracts, vehicles, searchTerm, statusFilter]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Multi-level fallback loading for contracts
      let contractsData = [];
      try {
        contractsData = await VehicleContract.list('-created_at');
      } catch (contractError) {
        console.warn('Primary contract loading failed, trying alternative ordering:', contractError);
        try {
          contractsData = await VehicleContract.list('-start_date');
        } catch (contractError2) {
          console.warn('Alternative contract ordering failed, trying without ordering:', contractError2);
          try {
            contractsData = await VehicleContract.list();
          } catch (contractError3) {
            console.warn('Entity method failed, trying direct Supabase query:', contractError3);
            const { supabase } = await import('@/lib/railway-db');
            const allContracts = await VehicleContract.list();
            const data = allContracts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            contractsData = data || [];
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
            const { supabase } = await import('@/lib/railway-db');
            const allVehicles = await Vehicle.list();
            const data = allVehicles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            vehiclesData = data || [];
          }
        }
      }
      
      console.log(`Loaded ${contractsData.length} contracts, ${vehiclesData.length} vehicles`);
      setContracts(contractsData);
      setVehicles(vehiclesData);
    } catch (error) {
      console.error('Error loading data:', error);
      
      // Enhanced error message with RLS policy information
      let errorMessage = 'Error loading data. Please try again.';
      if (error.message?.includes('row-level security policy')) {
        errorMessage = 'Permission denied: You don\'t have access to view contracts. Please contact your administrator.';
      } else if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
        errorMessage = 'Database table not found. Please ensure the vehicle_contract table exists in your database.';
      }
      
      alert(errorMessage);
    }
    setIsLoading(false);
  };

  // Remove the separate filterContracts function since it's now inside useEffect

  const handleSubmit = async (contractData) => {
    try {
      console.log('Submitting contract data:', contractData); // Debug log
      if (editingContract) {
        await VehicleContract.update(editingContract.id, contractData);
      } else {
        const newContract = await VehicleContract.create(contractData);
        console.log('Created contract:', newContract); // Debug log
      }
      setShowForm(false);
      setEditingContract(null);
      await loadData(); // Reload data immediately
    } catch (error) {
      console.error('Error saving contract:', error);
      alert('Error saving contract. Please try again.');
    }
  };

  const handleEdit = (contract) => {
    setEditingContract(contract);
    setShowForm(true);
  };

  const handleDelete = async (contract) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      try {
        await VehicleContract.delete(contract.id);
        await loadData();
      } catch (error) {
        console.error('Error deleting contract:', error);
        alert('Error deleting contract. Please try again.');
      }
    }
  };

  const getVehicleInfo = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.make} ${vehicle.model} - ${vehicle.license_plate}` : 'Unknown Vehicle';
  };

  const isContractExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Contracts</h1>
          <p className="text-gray-600 mt-1">Manage rental agreements and contracts</p>
        </div>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Contract
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingContract ? 'Edit Contract' : 'Create New Contract'}</DialogTitle>
            </DialogHeader>
            <ContractForm
              contract={editingContract}
              vehicles={vehicles}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingContract(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Contracts</p>
                <p className="text-2xl font-bold">{contracts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">A</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{contracts.filter(c => c.status === 'Active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold">E</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expired</p>
                <p className="text-2xl font-bold">{contracts.filter(c => c.status === 'Expired').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold">
                  {contracts.filter(c => {
                    const daysToExpiry = Math.ceil((new Date(c.end_date) - new Date()) / (1000 * 60 * 60 * 24));
                    return daysToExpiry > 0 && daysToExpiry <= 30;
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by customer name or vehicle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contracts ({filteredContracts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading contracts...</div>
          ) : filteredContracts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No contracts found. Create your first contract to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Contract Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Terms</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.customer_name}</TableCell>
                      <TableCell>{getVehicleInfo(contract.vehicle_id)}</TableCell>
                      <TableCell>{new Date(contract.start_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={isContractExpired(contract.end_date) ? 'text-red-600 font-medium' : ''}>
                          {new Date(contract.end_date).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold">
                        AED {contract.contract_value?.toLocaleString() || '0'}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[contract.status]}>
                          {contract.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{contract.payment_terms || '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(contract)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(contract)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
