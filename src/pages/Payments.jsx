import React, { useState, useEffect } from 'react';
import { Payment } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import PaymentForm from '../components/finance/PaymentForm';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  useEffect(() => { loadPayments(); }, []);

  const loadPayments = async () => {
    setIsLoading(true);
    const data = await Payment.list();
    setPayments(data);
    setIsLoading(false);
  };

  const handleSubmit = async (formData) => {
    if (editingPayment) {
      await Payment.update(editingPayment.id, formData);
    } else {
      await Payment.create(formData);
    }
    setShowForm(false);
    setEditingPayment(null);
    loadPayments();
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this payment?')) {
      await Payment.delete(id);
      loadPayments();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payments</h1>
        <Button onClick={() => { setEditingPayment(null); setShowForm(true); }}><Plus className="mr-2 h-4 w-4" /> New Payment</Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader><CardTitle>All Payments</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>From/To</TableHead><TableHead>Amount</TableHead><TableHead>Method</TableHead><TableHead>Reference</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {isLoading ? <TableRow><TableCell colSpan="6">Loading...</TableCell></TableRow> :
                payments.map(payment => (
                  <TableRow key={payment.id}>
                    <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                    <TableCell>{payment.counterpart}</TableCell>
                    <TableCell>AED {payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{payment.reference_no}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(payment)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(payment.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingPayment ? 'Edit' : 'New'} Payment</DialogTitle></DialogHeader>
          <PaymentForm payment={editingPayment} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}