
import React, { useState, useEffect, useCallback } from 'react';
import { Quotation } from '@/api/entities';
import { Customer } from '@/api/entities';
import { UserAccess } from '@/api/entities';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, FileText, Edit, Trash2, Loader2, RefreshCw } from 'lucide-react';
import QuotationForm from '../components/sales/QuotationForm';

const statusColors = {
  'Draft': 'bg-gray-100 text-gray-800',
  'Sent': 'bg-blue-100 text-blue-800',
  'Accepted': 'bg-green-100 text-green-800',
  'Rejected': 'bg-red-100 text-red-800'
};

export default function Quotations() {
  const { user: currentUser } = useAuth();
  const [quotations, setQuotations] = useState([]);
  const [filteredQuotations, setFilteredQuotations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salesReps, setSalesReps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [authError, setAuthError] = useState(null);

  const checkUserAccess = useCallback(async (currentUser) => {
    console.log('🔐 Checking user access for:', currentUser.email, 'Role:', currentUser.role);
    
    // Management role has access to everything
    if (currentUser.role === 'Management') {
      console.log('✅ Management role - access granted');
      return true;
    }
    
    // Check UserAccess table for specific page permissions
    try {
      const accessRecords = await UserAccess.filter({ user_email: currentUser.email });
      console.log('📋 User access records:', accessRecords);
      
      if (accessRecords.length > 0) {
        const userAccess = accessRecords[0];
        // Check if 'all' modules are accessible or if 'Quotations' is specifically included
        const hasQuotationsAccess = userAccess.accessible_modules === 'all' || 
                                   (Array.isArray(userAccess.accessible_modules) && 
                                    userAccess.accessible_modules.includes('Quotations'));
        
        console.log('🎫 Quotations access:', hasQuotationsAccess);
        return hasQuotationsAccess;
      }
    } catch (error) {
      console.error('❌ Error checking user access:', error);
      // If there's an error fetching UserAccess, fall through to role-based check as a fallback
    }
    
    // Fallback: check if user has traditional admin/sales roles if no specific UserAccess record dictates permissions
    const allowedRoles = ['admin', 'Sales Executive', 'Manager', 'HR Admin'];
    const hasRoleAccess = allowedRoles.includes(currentUser.role);
    console.log('👥 Role-based access:', hasRoleAccess);
    
    return hasRoleAccess;
  }, []); // Dependencies: UserAccess and User entities are stable references from imports.

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      console.log('🔄 Loading quotations data...');

      console.log('👤 Current user:', currentUser ? currentUser.email : 'Not logged in', 'Role:', currentUser ? currentUser.role : 'N/A');

      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Check access using the comprehensive access check
      const hasAccess = await checkUserAccess(currentUser);
      if (!hasAccess) {
        setAuthError('You do not have permission to access quotations. Please contact your administrator to grant you access to the Quotations module.');
        setIsLoading(false);
        return;
      }
      
      console.log('✅ Access granted - loading data...');
      
      // Use direct Supabase queries to avoid BaseEntity issues
      const { supabase } = await import('@/lib/supabase');
      
      const [quotationsResult, customersResult, usersResult] = await Promise.all([
        supabase.from('quotation').select('*').order('created_at', { ascending: false }),
        supabase.from('customer').select('*').order('created_at', { ascending: false }),
        supabase.from('user_access').select('user_email, role, accessible_modules')
      ]);
      
      if (quotationsResult.error) throw quotationsResult.error;
      if (customersResult.error) throw customersResult.error;
      if (usersResult.error) throw usersResult.error;
      
      const quotationsData = quotationsResult.data || [];
      const customersData = customersResult.data || [];
      const usersData = usersResult.data || [];
      
      console.log('📋 Loaded quotations:', quotationsData?.length || 0, 'records');
      console.log('👥 Loaded customers:', customersData?.length || 0, 'records');
      
      setQuotations(quotationsData || []);
      setCustomers(customersData || []);
      
      const reps = usersData?.filter(user => 
        user.role === 'Sales Executive' || user.role === 'Management'
      ) || [];
      setSalesReps(reps);
      
    } catch (error) {
      console.error('❌ Error loading quotations data:', error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        setAuthError('You do not have permission to access quotations. Please contact your administrator to grant you access to the Quotations module.');
      } else if (error.message?.includes('not authenticated')) {
        setAuthError('Please log in to access quotations.');
      } else {
        setAuthError(`Error loading data: ${error.message}`);
      }
      
      // Set empty arrays as fallback
      setQuotations([]);
      setCustomers([]);
      setSalesReps([]);
    }
    setIsLoading(false);
  }, [checkUserAccess, setAuthError, setIsLoading, setQuotations, setCustomers, setSalesReps]); // State setters are stable. checkUserAccess is now stable.

  useEffect(() => {
    loadData();
  }, [loadData]); // Initial load now depends on the memoized loadData function

  useEffect(() => {
    // Filter quotations logic
    let filtered = quotations.filter(quotation => {
      const customer = customers.find(c => c.id === quotation.customer_id);
      const customerName = customer?.name || '';
      
      const matchesSearch = customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quotation.vehicle_details?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || quotation.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    setFilteredQuotations(filtered);
  }, [quotations, customers, searchTerm, statusFilter]); // Only depends on data that affects filtering

  const handleSubmit = async (quotationData) => {
    try {
      console.log('💾 Submitting quotation:', quotationData);
      
      let savedQuotation;
      if (editingQuotation) {
        savedQuotation = await Quotation.update(editingQuotation.id, quotationData);
        console.log('✅ Updated quotation:', savedQuotation);
      } else {
        savedQuotation = await Quotation.create(quotationData);
        console.log('✅ Created quotation:', savedQuotation);
      }
      
      // Close form and reset state
      setShowForm(false);
      setEditingQuotation(null);
      
      // Reload data immediately to show the new/updated quotation
      console.log('🔄 Reloading quotations list...');
      await loadData();
      
    } catch (error) {
      console.error('❌ Error saving quotation:', error);
      alert(`Error saving quotation: ${error.message}. Please try again.`);
    }
  };

  const handleEdit = (quotation) => {
    console.log('📝 Editing quotation:', quotation);
    setEditingQuotation(quotation);
    setShowForm(true);
  };

  const handleDelete = async (quotation) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      try {
        console.log('🗑️ Deleting quotation:', quotation.id);
        await Quotation.delete(quotation.id);
        console.log('✅ Quotation deleted successfully');
        await loadData();
      } catch (error) {
        console.error('❌ Error deleting quotation:', error);
        alert('Error deleting quotation. Please try again.');
      }
    }
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  };

  const getSalesRepName = (repId) => {
    if (!repId) return 'Unassigned';
    const rep = salesReps.find(r => r.id === repId);
    return rep ? (rep.full_name || rep.email) : 'Unknown';
  };

  const handleNewQuotation = () => {
    console.log('➕ Opening new quotation form');
    setEditingQuotation(null);
    setShowForm(true);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 via-white to-blue-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotations</h1>
          <p className="text-gray-600 mt-1">Manage customer quotations and proposals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          {!authError && (
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button onClick={handleNewQuotation} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Quotation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingQuotation ? 'Edit Quotation' : 'Create New Quotation'}
                  </DialogTitle>
                </DialogHeader>
                <QuotationForm
                  quotation={editingQuotation}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingQuotation(null);
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Show authentication error if present */}
      {authError && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold">!</span>
              </div>
              <div>
                <p className="font-semibold text-red-800">Access Denied</p>
                <p className="text-red-700">{authError}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!authError && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Quotations</p>
                    <p className="text-2xl font-bold">{quotations.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">S</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sent</p>
                    <p className="text-2xl font-bold">{quotations.filter(q => q.status === 'Sent').length}</p>
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
                    <p className="text-sm text-gray-600">Accepted</p>
                    <p className="text-2xl font-bold">{quotations.filter(q => q.status === 'Accepted').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-bold">D</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Draft</p>
                    <p className="text-2xl font-bold">{quotations.filter(q => q.status === 'Draft').length}</p>
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
                    placeholder="Search by customer name or vehicle details..."
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
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Sent">Sent</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Quotations Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Quotations ({filteredQuotations.length})</span>
                <div className="text-sm font-normal text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                  <p>Loading quotations...</p>
                </div>
              ) : filteredQuotations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No quotations found</p>
                  <p>
                    {quotations.length === 0 
                      ? "Create your first quotation to get started." 
                      : "Try adjusting your search filters."
                    }
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Vehicle Details</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Valid Until</TableHead>
                        <TableHead>Sales Rep</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQuotations.map((quotation) => (
                        <TableRow key={quotation.id}>
                          <TableCell className="font-medium">
                            {getCustomerName(quotation.customer_id)}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {quotation.vehicle_details}
                          </TableCell>
                          <TableCell>
                            {quotation.start_date && quotation.end_date ? (
                              <span className="text-sm">
                                {new Date(quotation.start_date).toLocaleDateString()} - {new Date(quotation.end_date).toLocaleDateString()}
                              </span>
                            ) : '-'}
                          </TableCell>
                          <TableCell className="font-semibold">
                            AED {quotation.total_amount?.toLocaleString() || '0'}
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[quotation.status]}>
                              {quotation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {quotation.validity_date ? 
                              new Date(quotation.validity_date).toLocaleDateString() : '-'
                            }
                          </TableCell>
                          <TableCell>
                            {getSalesRepName(quotation.sales_rep_id)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(quotation)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(quotation)}
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
        </>
      )}
    </div>
  );
}
