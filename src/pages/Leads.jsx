
import React, { useState, useEffect } from 'react';
import { Lead } from '@/api/entities';
import { User } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Filter, Users, Edit, Trash2 } from 'lucide-react';
import LeadForm from '../components/sales/LeadForm';

const statusColors = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Quoted': 'bg-purple-100 text-purple-800',
  'Follow-up': 'bg-orange-100 text-orange-800',
  'Won': 'bg-green-100 text-green-800',
  'Lost': 'bg-red-100 text-red-800'
};

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [salesReps, setSalesReps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [assignedFilter, setAssignedFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    loadLeads();
    loadSalesReps();
  }, []);

  useEffect(() => {
    // Filter leads logic moved inside useEffect
    let filtered = leads.filter(lead => {
      const matchesSearch = lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.phone?.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      
      const matchesAssigned = assignedFilter === 'All' || 
                             (assignedFilter === 'Unassigned' && !lead.assigned_to_id) ||
                             lead.assigned_to_id === assignedFilter;
      
      return matchesSearch && matchesStatus && matchesAssigned;
    });

    setFilteredLeads(filtered);
  }, [leads, searchTerm, statusFilter, assignedFilter]);

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      // Try to load leads with proper ordering
      const data = await Lead.list('-created_at'); // Changed from created_date to created_at
      console.log('Loaded leads:', data); // Debug log
      console.log('Leads count:', data?.length || 0);
      setLeads(data || []);
    } catch (error) {
      console.error('Error loading leads:', error);

      // Enhanced error handling - try alternative approaches
      if (error.message?.includes('column') || error.message?.includes('created_at')) {
        console.log('Trying alternative date column...');
        try {
          // Try without ordering first
          const data = await Lead.list();
          console.log('Loaded leads without ordering:', data);
          setLeads(data || []);
        } catch (fallbackError) {
          console.error('Fallback load failed:', fallbackError);
          setLeads([]);
        }
      } else {
        setLeads([]);
      }
    }
    setIsLoading(false);
  };

  const loadSalesReps = async () => {
    try {
      const users = await User.list();
      const reps = users.filter(user => 
        user.role === 'Sales Executive' || user.role === 'Management'
      );
      setSalesReps(reps);
    } catch (error) {
      console.error('Error loading sales reps:', error);
    }
  };

  const handleSubmit = async (leadData) => {
    try {
      console.log('Submitting lead data:', leadData); // Debug log

      // Debug: Check current user and permissions
      const currentUser = await User.me();
      console.log('Current user info:', currentUser);

      if (editingLead) {
        await Lead.update(editingLead.id, leadData);
      } else {
        const newLead = await Lead.create(leadData);
        console.log('Created lead:', newLead); // Debug log
      }
      setShowForm(false);
      setEditingLead(null);
      await loadLeads(); // Reload data immediately
    } catch (error) {
      console.error('Error saving lead:', error);

      // Enhanced error message for RLS policy violations
      let errorMsg = `Error saving lead. Please try again.\n\nDetails: ${error.message}`;
      if (error.message?.includes('row-level security policy')) {
        errorMsg = `Permission denied: You don't have access to create/update leads. Please contact your administrator to:\n\n1. Ensure you have a user access record with role 'Management' or 'Staff'\n2. If Staff, ensure 'Leads' is in your accessible modules\n3. Run the updated RLS policies from rls_policies.sql`;
      }

      alert(errorMsg);
    }
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setShowForm(true);
  };

  const handleDelete = async (lead) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await Lead.delete(lead.id);
        await loadLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
        alert('Error deleting lead. Please try again.');
      }
    }
  };

  const getSalesRepName = (repId) => {
    const rep = salesReps.find(r => r.id === repId);
    return rep ? (rep.full_name || rep.email) : 'Unassigned';
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-600 mt-1">Track and manage potential customers</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={loadLeads}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingLead ? 'Edit Lead' : 'Add New Lead'}</DialogTitle>
              </DialogHeader>
            <LeadForm
              lead={editingLead}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingLead(null);
              }}
            />
          </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold">{leads.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">W</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Won</p>
                <p className="text-2xl font-bold">{leads.filter(l => l.status === 'Won').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold">F</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Follow-up</p>
                <p className="text-2xl font-bold">{leads.filter(l => l.status === 'Follow-up').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">N</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">New</p>
                <p className="text-2xl font-bold">{leads.filter(l => l.status === 'New').length}</p>
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
                placeholder="Search by name, email, or phone..."
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
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Quoted">Quoted</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
                <SelectItem value="Won">Won</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={assignedFilter} onValueChange={setAssignedFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Assignments</SelectItem>
                <SelectItem value="Unassigned">Unassigned</SelectItem>
                {salesReps.map(rep => (
                  <SelectItem key={rep.id} value={rep.id}>
                    {rep.full_name || rep.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading leads...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No leads found. Add your first lead to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.phone || '-'}</TableCell>
                      <TableCell>{lead.source || '-'}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[lead.status]}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{getSalesRepName(lead.assigned_to_id)}</TableCell>
                      <TableCell>
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString() :
                         lead.created_date ? new Date(lead.created_date).toLocaleDateString() :
                         'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(lead)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(lead)}
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
