
import React, { useState, useEffect } from 'react';
import { Customer } from '@/api/entities';
import { User } from '@/api/entities'; // Added import for User entity
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Phone, Mail, MapPin, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CustomerForm from '../components/sales/CustomerForm';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [userRole, setUserRole] = useState(null); // Added userRole state
  const [errorMessage, setErrorMessage] = useState(''); // Added error message state

  useEffect(() => {
    loadCustomers();
    checkUserRole(); // Call checkUserRole on mount
  }, []);

  useEffect(() => {
    // Filter customers based on search term
    const filtered = customers.filter(customer =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm)
    );
    setFilteredCustomers(filtered);
  }, [customers, searchTerm]);

  const checkUserRole = async () => {
    try {
      const user = await User.me();
      setUserRole(user.role);
    } catch (error) {
      console.error('Error getting user role:', error);
    }
  };

  const loadCustomers = async () => {
    setIsLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('customer')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
      setErrorMessage(`Failed to load customers: ${error.message}. Please check your permissions.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleSaveCustomer = async (formData) => {
    try {
      let savedCustomer;

      if (editingCustomer) {
        // Update existing customer
        savedCustomer = await Customer.update(editingCustomer.id, formData);
        console.log('Customer updated successfully:', savedCustomer);
      } else {
        // Create new customer
        savedCustomer = await Customer.create(formData);
        console.log('Customer created successfully:', savedCustomer);
      }

      // Only show success and refresh if we actually have a valid customer object
      if (savedCustomer && savedCustomer.id) {
        // Close the form
        setShowForm(false);
        setEditingCustomer(null);

        // Force refresh the customer list
        console.log('Refreshing customer list...');
        await loadCustomers();

        // Clear any previous error message
        setErrorMessage('');
      } else {
        throw new Error('Invalid customer data returned');
      }

    } catch (error) {
      console.error('Error handling saved customer:', error);

      // Enhanced error message for RLS policy violations
      let errorMsg = `Error: ${error.message}`;
      if (error.message?.includes('row-level security policy')) {
        errorMsg = `Permission denied: You don't have access to create/update customers. Please contact your administrator to:\n\n1. Ensure you have a user access record with role 'Management' or 'Staff'\n2. If Staff, ensure 'Customer Management' is in your accessible modules\n3. Run the RLS policies from rls_policies.sql if not already applied`;
      }

      setErrorMessage(errorMsg);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = async (customerId) => {
    if (!confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      return;
    }

    try {
      await Customer.delete(customerId);
      await loadCustomers(); // Refresh the list
      setErrorMessage(''); // Clear any error message
    } catch (error) {
      console.error('Error deleting customer:', error);
      setErrorMessage('Failed to delete customer. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCustomerTypeColor = (type) => {
    switch (type) {
      case 'Individual': return 'bg-blue-100 text-blue-800';
      case 'Corporate': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Added manual refresh button handler
  const handleManualRefresh = async () => {
    console.log('Manual refresh requested');
    await loadCustomers();
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 via-white to-teal-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your customer database and relationships 
            {userRole && <span className="text-sm">| Role: {userRole}</span>} {/* Added user role display */}
          </p>
        </div>
        <div className="flex gap-2"> {/* Grouped buttons */}
          <Button onClick={handleManualRefresh} variant="outline" size="sm"> {/* Added Refresh button */}
            Refresh List
          </Button>
          <Button onClick={handleAddCustomer} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Add New Customer
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200"
            />
          </div>
        </div>
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
                {customers.length === 0 && !isLoading && ( // Added conditional message
                  <p className="text-xs text-red-500">No customers visible</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <h3 className="font-semibold text-red-800">Error</h3>
            </div>
            <p className="text-sm text-red-700 mt-2">{errorMessage}</p>
            <Button 
              onClick={() => {
                setErrorMessage('');
                loadCustomers();
              }} 
              variant="outline" 
              size="sm" 
              className="mt-3 border-red-300 text-red-700 hover:bg-red-100"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Debug Info */}
      {customers.length === 0 && !isLoading && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-yellow-800">Debug Information</h3>
            <p className="text-sm text-yellow-700 mt-1">
              No customers found in the list. Your role: <strong>{userRole || 'Unknown'}</strong>
            </p>
            <p className="text-sm text-yellow-700">
              Required roles for viewing customers: Management, Sales Executive, or HR Admin
            </p>
            <Button 
              onClick={() => {
                console.log('Current customers state:', customers);
                console.log('Filtered customers:', filteredCustomers);
                loadCustomers();
              }} 
              variant="outline" 
              size="sm" 
              className="mt-2"
            >
              Debug & Reload
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredCustomers.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm ? 'No customers found' : 'No customers yet'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first customer'}
            </p>
            {!searchTerm && (
              <Button onClick={handleAddCustomer} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-5 h-5 mr-2" />
                Add First Customer
              </Button>
            )}
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <Card key={customer.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {customer.name}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                      <Badge className={getCustomerTypeColor(customer.customer_type)}>
                        {customer.customer_type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditCustomer(customer)}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{customer.phone}</span>
                  </div>
                  {customer.address && (
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{customer.address}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Customer Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
            </DialogTitle>
          </DialogHeader>
          <CustomerForm
            customer={editingCustomer}
            onSave={handleSaveCustomer}
            onCancel={handleCancelForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
