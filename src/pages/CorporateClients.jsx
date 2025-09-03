import React, { useState, useEffect } from 'react';
import { CorporateClient } from '@/api/entities';
import { User } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Building, Edit, Trash2, Users, Loader2, RefreshCw } from 'lucide-react';
import CorporateClientForm from '../components/sales/CorporateClientForm';

export default function CorporateClients() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [accountManagers, setAccountManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Filter clients logic moved inside useEffect
    let filtered = clients.filter(client => {
      const matchesSearch = client.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.contacts?.some(contact => 
                             contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      
      return matchesSearch;
    });

    setFilteredClients(filtered);
  }, [clients, searchTerm]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      console.log('🔄 Loading corporate clients data...'); // Debug log
      
      const [clientsData, usersData] = await Promise.all([
        CorporateClient.list('-created_date'),
        User.list()
      ]);
      
      console.log('🏢 Loaded corporate clients:', clientsData?.length || 0, 'records'); // Debug log
      console.log('👨‍💼 Loaded users:', usersData?.length || 0, 'records'); // Debug log
      console.log('🔍 Clients data:', clientsData); // Debug log
      
      setClients(clientsData || []);
      
      const managers = usersData?.filter(user => 
        user.role === 'Sales Executive' || user.role === 'Management'
      ) || [];
      setAccountManagers(managers);
      
    } catch (error) {
      console.error('❌ Error loading corporate clients data:', error);
      setClients([]);
      setAccountManagers([]);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (clientData) => {
    try {
      console.log('💾 Submitting corporate client data:', clientData); // Debug log
      
      let savedClient;
      if (editingClient) {
        savedClient = await CorporateClient.update(editingClient.id, clientData);
        console.log('✅ Updated corporate client:', savedClient);
      } else {
        savedClient = await CorporateClient.create(clientData);
        console.log('✅ Created corporate client:', savedClient);
      }
      
      // Close form and reset state
      setShowForm(false);
      setEditingClient(null);
      
      // Reload data immediately to show the new/updated client
      console.log('🔄 Reloading corporate clients list...');
      await loadData();
      
    } catch (error) {
      console.error('❌ Error saving corporate client:', error);
      alert(`Error saving corporate client: ${error.message}. Please try again.`);
    }
  };

  const handleEdit = (client) => {
    console.log('📝 Editing corporate client:', client);
    setEditingClient(client);
    setShowForm(true);
  };

  const handleDelete = async (client) => {
    if (window.confirm('Are you sure you want to delete this corporate client?')) {
      try {
        console.log('🗑️ Deleting corporate client:', client.id);
        await CorporateClient.delete(client.id);
        console.log('✅ Corporate client deleted successfully');
        await loadData();
      } catch (error) {
        console.error('❌ Error deleting corporate client:', error);
        alert('Error deleting corporate client. Please try again.');
      }
    }
  };

  const getAccountManagerName = (managerId) => {
    const manager = accountManagers.find(m => m.id === managerId);
    return manager ? (manager.full_name || manager.email) : 'Unknown Manager';
  };

  const handleNewClient = () => {
    console.log('➕ Opening new corporate client form');
    setEditingClient(null);
    setShowForm(true);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Corporate Clients</h1>
          <p className="text-gray-600 mt-1">Manage business relationships and accounts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button onClick={handleNewClient} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Corporate Client
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingClient ? 'Edit Corporate Client' : 'Add Corporate Client'}
                </DialogTitle>
              </DialogHeader>
              <CorporateClientForm
                client={editingClient}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingClient(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold">
                  {clients.reduce((sum, client) => sum + (client.contacts?.length || 0), 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">M</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Managers</p>
                <p className="text-2xl font-bold">{accountManagers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by company name or contact details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Corporate Clients ({filteredClients.length})</span>
            <div className="text-sm font-normal text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p>Loading corporate clients...</p>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Building className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No corporate clients found</p>
              <p>
                {clients.length === 0 
                  ? "Add your first corporate client to get started." 
                  : "Try adjusting your search filters."
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Account Manager</TableHead>
                    <TableHead>Contacts</TableHead>
                    <TableHead>Billing Agreement</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.company_name}</TableCell>
                      <TableCell>{getAccountManagerName(client.account_manager_id)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {client.contacts?.slice(0, 2).map((contact, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{contact.name}</span>
                              {contact.role && <span className="text-gray-500"> - {contact.role}</span>}
                            </div>
                          ))}
                          {client.contacts?.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{client.contacts.length - 2} more
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate text-sm">
                          {client.billing_agreement || '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(client.created_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(client)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(client)}
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