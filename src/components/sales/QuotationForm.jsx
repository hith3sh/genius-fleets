
import React, { useState, useEffect } from 'react';
import { Customer } from '@/api/entities';
import { Lead } from '@/api/entities';
import { UserAccess } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Plus, UserPlus, AlertCircle, RefreshCw } from 'lucide-react';
import CustomerForm from './CustomerForm';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function QuotationForm({ quotation, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    customer_id: quotation?.customer_id || '',
    lead_id: quotation?.lead_id || '',
    vehicle_details: quotation?.vehicle_details || '',
    daily_rate: quotation?.daily_rate || '',
    start_date: quotation?.start_date || '',
    end_date: quotation?.end_date || '',
    total_amount: quotation?.total_amount || '',
    validity_date: quotation?.validity_date || '',
    terms_and_conditions: quotation?.terms_and_conditions || 'Standard rental terms and conditions apply.',
    status: quotation?.status || 'Draft',
    sales_rep_id: quotation?.sales_rep_id || ''
  });
  
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [salesReps, setSalesReps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [dataError, setDataError] = useState(null); // New state for data loading errors

  useEffect(() => {
    loadData();
  }, []);

  // Calculate total amount when daily rate or dates change
  useEffect(() => {
    if (formData.daily_rate && formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      const total = parseFloat(formData.daily_rate) * days;
      setFormData(prev => ({...prev, total_amount: total.toString()}));
    }
  }, [formData.daily_rate, formData.start_date, formData.end_date]);

  const loadData = async () => {
    setIsDataLoading(true);
    setDataError(null); // Reset error state on new attempt
    
    try {
      console.log('🔄 Loading quotation form data...'); // Debug log
      
      // Load data with individual error handling for better debugging
      const loadCustomersData = async () => {
        try {
          console.log('📋 Fetching customers...'); // Debug log

          // Try different approaches to load customers
          let data = null;

          try {
            // First try with created_at ordering
            data = await Customer.list('-created_at');
            console.log('✅ Customers loaded with created_at ordering:', data?.length || 0, 'records');
          } catch (orderError) {
            console.log('⚠️ created_at ordering failed, trying without ordering:', orderError.message);

            try {
              // Try without any ordering
              data = await Customer.list();
              console.log('✅ Customers loaded without ordering:', data?.length || 0, 'records');
            } catch (basicError) {
              console.log('⚠️ Basic list failed, trying direct Supabase query:', basicError.message);

              // Direct Supabase query as last resort
              const { supabase } = await import('@/lib/railway-db');
              const result = await supabase.from('customer').select('*');

              if (result.error) throw result.error;
              data = result.data;
              console.log('✅ Customers loaded via direct query:', data?.length || 0, 'records');
            }
          }

          console.log('👥 Customer data sample:', data?.[0]); // Debug log - show structure
          return data || [];
        } catch (error) {
          console.error('❌ Error loading customers:', error);

          // Enhanced error message for column issues
          let errorMsg = `Failed to load customers: ${error.message}`;
          if (error.message?.includes('column') && error.message?.includes('does not exist')) {
            errorMsg = `Database column error when loading customers. The customer table might have different column names than expected. Please check the database schema.`;
          } else if (error.message?.includes('row-level security policy')) {
            errorMsg = `Permission denied: You don't have access to view customers. Please ensure your user has the right role and permissions.`;
          }

          throw new Error(errorMsg); // Throw to be caught by the main try-catch
        }
      };

      const loadLeadsData = async () => {
        try {
          const data = await Lead.list();
          console.log('📝 Leads loaded:', data?.length || 0, 'records'); // Debug log
          return data || [];
        } catch (error) {
          console.error('❌ Error loading leads:', error);
          return []; // Return empty array on error for leads, as it's not critical
        }
      };

      const loadUsersData = async () => {
        try {
          const data = await UserAccess.list();
          const reps = data?.filter(user =>
            user.role === 'Sales Executive' || user.role === 'Management'
          ) || [];
          console.log('👨‍💼 Sales reps loaded:', reps?.length || 0, 'records'); // Debug log
          return reps;
        } catch (error) {
          console.error('❌ Error loading users:', error);
          return []; // Return empty array on error for users, as it's not critical
        }
      };

      // Use Promise.all to load all necessary data concurrently
      const [customersData, leadsData, salesRepsData] = await Promise.all([
        loadCustomersData(),
        loadLeadsData(),
        loadUsersData()
      ]);
      
      setCustomers(customersData);
      setLeads(leadsData);
      setSalesReps(salesRepsData);

      console.log('🎉 All data loaded successfully!'); // Debug log
      
    } catch (error) {
      console.error('💥 Critical error loading form data:', error);
      setDataError(error.message); // Set the error message for display
      // Ensure state is cleared or handled even if individual loads failed critically
      setCustomers([]);
      setLeads([]);
      setSalesReps([]);
    }
    
    setIsDataLoading(false);
  };

  const handleNewCustomerSubmit = async (customerData) => {
    try {
      console.log('🆕 Creating new customer:', customerData); // Debug log
      const newCustomer = await Customer.create(customerData);
      console.log('✅ Customer created successfully:', newCustomer); // Debug log
      
      // Reload customers list
      await loadCustomers(); // Call the specific loadCustomers function
      
      // Select the newly created customer
      setFormData(prev => ({...prev, customer_id: newCustomer.id}));
      
      // Close the new customer form
      setShowNewCustomerForm(false);
      
    } catch (error) {
      console.error('❌ Error creating customer:', error);
      alert('Error creating customer. Please try again.');
    }
  };

  // Dedicated function to reload only customers, used after new customer creation
  const loadCustomers = async () => {
    try {
      console.log('🔄 Reloading customers...'); // Debug log

      let customersData = null;

      try {
        // First try with ordering
        customersData = await Customer.list('-created_at');
        console.log('✅ Customers reloaded with ordering:', customersData?.length || 0, 'records');
      } catch (orderError) {
        try {
          // Try without ordering
          customersData = await Customer.list();
          console.log('✅ Customers reloaded without ordering:', customersData?.length || 0, 'records');
        } catch (basicError) {
          // Direct query fallback
          const { supabase } = await import('@/lib/railway-db');
          const result = await supabase.from('customer').select('*');

          if (result.error) throw result.error;
          customersData = result.data;
          console.log('✅ Customers reloaded via direct query:', customersData?.length || 0, 'records');
        }
      }

      setCustomers(customersData || []);
    } catch (error) {
      console.error('❌ Error reloading customers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.customer_id || formData.customer_id.trim() === '') {
      alert('Please select a customer');
      return;
    }

    if (!formData.vehicle_details || formData.vehicle_details.trim() === '') {
      alert('Please enter vehicle details');
      return;
    }

    // Validate total amount is a number
    if (!formData.total_amount || formData.total_amount.trim() === '') {
      alert('Please enter total amount');
      return;
    }

    const totalAmountNum = parseFloat(formData.total_amount);
    if (isNaN(totalAmountNum) || totalAmountNum <= 0) {
      alert('Please enter a valid total amount greater than 0');
      return;
    }

    // Validate daily rate if provided
    if (formData.daily_rate && formData.daily_rate.trim() !== '') {
      const dailyRateNum = parseFloat(formData.daily_rate);
      if (isNaN(dailyRateNum) || dailyRateNum <= 0) {
        alert('Please enter a valid daily rate greater than 0');
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      console.log('💾 Submitting quotation data:', formData); // Debug log
      
      // Create a clean copy of formData
      const submitData = { ...formData };

      // Remove empty optional fields before submission
      if (!submitData.sales_rep_id) {
        delete submitData.sales_rep_id;
      }
      if (!submitData.lead_id) {
        delete submitData.lead_id;
      }

      // Handle numeric fields properly - convert to numbers or remove if empty
      if (submitData.daily_rate) {
        const dailyRate = parseFloat(submitData.daily_rate);
        if (isNaN(dailyRate)) {
          delete submitData.daily_rate; // Remove if not a valid number
        } else {
          submitData.daily_rate = dailyRate;
        }
      } else {
        delete submitData.daily_rate; // Remove if empty string
      }

      if (submitData.total_amount) {
        const totalAmount = parseFloat(submitData.total_amount);
        if (isNaN(totalAmount)) {
          alert('Please enter a valid total amount');
          return;
        } else {
          submitData.total_amount = totalAmount;
        }
      } else {
        delete submitData.total_amount; // Remove if empty string
      }

      // Handle optional date fields - remove if empty
      if (!submitData.start_date || submitData.start_date.trim() === '') {
        delete submitData.start_date;
      }
      if (!submitData.end_date || submitData.end_date.trim() === '') {
        delete submitData.end_date;
      }
      if (!submitData.validity_date || submitData.validity_date.trim() === '') {
        delete submitData.validity_date;
      }

      // Handle optional text fields - remove if empty
      if (!submitData.vehicle_details || submitData.vehicle_details.trim() === '') {
        alert('Please enter vehicle details');
        return;
      }
      if (!submitData.terms_and_conditions || submitData.terms_and_conditions.trim() === '') {
        delete submitData.terms_and_conditions;
      }

      console.log('📋 Final submit data:', submitData); // Debug log - shows cleaned data

      await onSubmit(submitData);
      
    } catch (error) {
      console.error('❌ Error submitting quotation:', error);

      // Enhanced error handling with specific messages
      let errorMsg = 'Error creating quotation. Please try again.';

      if (error.message?.includes('invalid input syntax for type numeric')) {
        errorMsg = 'Invalid number format detected. Please check that all numeric fields contain valid numbers.';
      } else if (error.message?.includes('violates not-null constraint')) {
        errorMsg = 'Missing required fields. Please ensure all required fields are filled.';
      } else if (error.message?.includes('row-level security policy')) {
        errorMsg = 'Permission denied: You don\'t have access to create quotations. Please contact your administrator.';
      } else if (error.message) {
        errorMsg = `Error: ${error.message}`;
      }

      alert(errorMsg);
    }
    setIsLoading(false);
  };

  if (isDataLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Loading form data...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {dataError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-2">
              <p>Error loading initial form data: {dataError}</p>
              <Button variant="outline" size="sm" onClick={loadData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Loading Data
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="customer_id">Customer *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowNewCustomerForm(true)}
                className="text-xs"
              >
                <UserPlus className="w-3 h-3 mr-1" />
                Add New Customer
              </Button>
            </div>
            <Select 
              value={formData.customer_id} 
              onValueChange={(value) => {
                console.log('🎯 Selected customer:', value); // Debug log
                const selectedCustomer = customers.find(c => c.id === value);
                console.log('👤 Customer details:', selectedCustomer); // Debug log
                setFormData({...formData, customer_id: value});
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.length === 0 ? (
                  // Display a non-selectable message when no customers are found
                  <div className="p-2 text-center text-gray-500">
                    <p>No customers found in database</p>
                    <p className="text-xs">Click "Add New Customer" to create one</p>
                  </div>
                ) : (
                  customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{customer.name}</span>
                        <span className="text-xs text-gray-500">{customer.email}</span>
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{customers.length} customers available</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={loadData} // Re-load all dropdown data, including customers
                className="h-6 px-2 text-xs"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sales_rep_id">Sales Representative (Optional)</Label>
            <Select 
              value={formData.sales_rep_id} 
              onValueChange={(value) => setFormData({...formData, sales_rep_id: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sales rep (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>No Sales Rep</SelectItem>
                {salesReps.map(rep => (
                  <SelectItem key={rep.id} value={rep.id}>
                    {rep.user_email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vehicle_details">Vehicle Details *</Label>
          <Input
            id="vehicle_details"
            value={formData.vehicle_details}
            onChange={(e) => setFormData({...formData, vehicle_details: e.target.value})}
            placeholder="e.g., Toyota Camry 2023, Luxury Sedan Class"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="daily_rate">Daily Rate (AED)</Label>
            <Input
              id="daily_rate"
              type="number"
              value={formData.daily_rate}
              onChange={(e) => setFormData({...formData, daily_rate: e.target.value})}
              placeholder="150"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="start_date">Start Date</Label>
            <Input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({...formData, start_date: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end_date">End Date</Label>
            <Input
              id="end_date"
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({...formData, end_date: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="total_amount">Total Amount (AED) *</Label>
            <Input
              id="total_amount"
              type="number"
              value={formData.total_amount}
              onChange={(e) => setFormData({...formData, total_amount: e.target.value})}
              placeholder="1500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="validity_date">Valid Until</Label>
            <Input
              id="validity_date"
              type="date"
              value={formData.validity_date}
              onChange={(e) => setFormData({...formData, validity_date: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="terms_and_conditions">Terms & Conditions</Label>
          <Textarea
            id="terms_and_conditions"
            value={formData.terms_and_conditions}
            onChange={(e) => setFormData({...formData, terms_and_conditions: e.target.value})}
            rows={4}
            placeholder="Enter terms and conditions..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Sent">Sent</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              quotation ? 'Update Quotation' : 'Create Quotation'
            )}
          </Button>
        </div>
      </form>

      {/* New Customer Dialog */}
      <Dialog open={showNewCustomerForm} onOpenChange={setShowNewCustomerForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <CustomerForm
            onSubmit={handleNewCustomerSubmit}
            onCancel={() => setShowNewCustomerForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
