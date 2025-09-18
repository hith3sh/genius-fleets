import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAccess } from '@/api/entities';
import { Plus, Trash2 } from 'lucide-react';

export default function CorporateClientForm({ client, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    company_name: client?.company_name || '',
    account_manager_id: client?.account_manager_id || '',
    billing_agreement: client?.billing_agreement || '',
    contacts: client?.contacts || [{ name: '', role: '', phone: '', email: '' }],
    notes: client?.notes || ''
  });
  
  const [salesReps, setSalesReps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSalesReps();
  }, []);

  const loadSalesReps = async () => {
    try {
      const users = await UserAccess.list();
      const reps = users.filter(user =>
        user.role === 'Sales Executive' || user.role === 'Management'
      );
      setSalesReps(reps);
    } catch (error) {
      console.error('Error loading sales reps:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.company_name || formData.company_name.trim() === '') {
      alert('Please enter a company name');
      return;
    }

    setIsLoading(true);

    try {
      // Filter out empty contacts
      const filteredContacts = formData.contacts.filter(contact =>
        contact.name.trim() || contact.email.trim() || contact.phone.trim()
      );

      // Create clean submit data
      const submitData = {
        ...formData,
        contacts: filteredContacts.length > 0 ? filteredContacts : null,
        // Remove empty optional fields
        account_manager_id: formData.account_manager_id || null,
        billing_agreement: formData.billing_agreement.trim() || null,
        notes: formData.notes.trim() || null
      };

      console.log('📋 Submitting corporate client data:', submitData); // Debug log

      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting corporate client:', error);

      // Enhanced error handling
      let errorMsg = 'Error saving corporate client. Please try again.';

      if (error.message?.includes('row-level security policy')) {
        errorMsg = 'Permission denied: You don\'t have access to create/update corporate clients. Please contact your administrator to ensure you have the right role and permissions.';
      } else if (error.message?.includes('violates not-null constraint')) {
        errorMsg = 'Missing required fields. Please ensure all required fields are filled.';
      } else if (error.message) {
        errorMsg = `Error: ${error.message}`;
      }

      alert(errorMsg);
    }
    setIsLoading(false);
  };

  const addContact = () => {
    setFormData({
      ...formData,
      contacts: [...formData.contacts, { name: '', role: '', phone: '', email: '' }]
    });
  };

  const removeContact = (index) => {
    const newContacts = formData.contacts.filter((_, i) => i !== index);
    setFormData({ ...formData, contacts: newContacts });
  };

  const updateContact = (index, field, value) => {
    const newContacts = [...formData.contacts];
    newContacts[index][field] = value;
    setFormData({ ...formData, contacts: newContacts });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-2">
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                required
                className="text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account_manager_id">Account Manager</Label>
              <Select 
                value={formData.account_manager_id} 
                onValueChange={(value) => setFormData({...formData, account_manager_id: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select account manager" />
                </SelectTrigger>
                <SelectContent>
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
            <Label htmlFor="billing_agreement">Billing Agreement</Label>
            <Textarea
              id="billing_agreement"
              value={formData.billing_agreement}
              onChange={(e) => setFormData({...formData, billing_agreement: e.target.value})}
              placeholder="Describe billing terms, payment schedule, etc."
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Contacts</Label>
              <Button type="button" variant="outline" size="sm" onClick={addContact}>
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
            
            {formData.contacts.map((contact, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Contact {index + 1}</h4>
                  {formData.contacts.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeContact(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={contact.name}
                      onChange={(e) => updateContact(index, 'name', e.target.value)}
                      placeholder="Contact name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input
                      value={contact.role}
                      onChange={(e) => updateContact(index, 'role', e.target.value)}
                      placeholder="Job title/role"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={contact.email}
                      onChange={(e) => updateContact(index, 'email', e.target.value)}
                      placeholder="contact@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={contact.phone}
                      onChange={(e) => updateContact(index, 'phone', e.target.value)}
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Additional notes about the client..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (client ? 'Update Client' : 'Add Client')}
            </Button>
          </div>
        </form>
    </div>
  );
}