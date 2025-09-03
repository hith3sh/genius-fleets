import React, { useState, useEffect } from 'react';
import { Expense } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Download } from 'lucide-react';
import ExpenseForm from '../components/finance/ExpenseForm';
import { UploadFile } from '@/api/integrations';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => { loadExpenses(); }, []);

  const loadExpenses = async () => {
    setIsLoading(true);
    const data = await Expense.list('-expense_date');
    setExpenses(data);
    setIsLoading(false);
  };

  const handleSubmit = async (formData, receiptFile) => {
    let receipt_url = editingExpense?.receipt_url || '';
    if (receiptFile) {
        const { file_url } = await UploadFile({ file: receiptFile });
        receipt_url = file_url;
    }
    
    const finalData = { ...formData, receipt_url };

    if (editingExpense) {
      await Expense.update(editingExpense.id, finalData);
    } else {
      await Expense.create(finalData);
    }
    setShowForm(false);
    setEditingExpense(null);
    loadExpenses();
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      await Expense.delete(id);
      loadExpenses();
    }
  };
  
  const handleExport = () => {
    const headers = "Date,Category,Description,Amount,Paid To,Method,Project/Client\n";
    const csv = expenses.map(e => `"${e.expense_date}","${e.category}","${e.description}","${e.amount}","${e.paid_to}","${e.payment_method}","${e.project_client || ''}"`).join('\n');
    const blob = new Blob([headers + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <div>
           <Button onClick={handleExport} variant="outline" className="mr-2"><Download className="mr-2 h-4 w-4" /> Export to Excel</Button>
           <Button onClick={() => { setEditingExpense(null); setShowForm(true); }}><Plus className="mr-2 h-4 w-4" /> New Expense</Button>
        </div>
      </div>
      <Card className="shadow-lg">
        <CardHeader><CardTitle>All Expenses</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Category</TableHead><TableHead>Description</TableHead><TableHead>Amount</TableHead><TableHead>Paid To</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {isLoading ? <TableRow><TableCell colSpan="6">Loading...</TableCell></TableRow> :
                expenses.map(expense => (
                  <TableRow key={expense.id}>
                    <TableCell>{new Date(expense.expense_date).toLocaleDateString()}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>AED {expense.amount.toLocaleString()}</TableCell>
                    <TableCell>{expense.paid_to}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(expense)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(expense.id)}><Trash2 className="h-4 w-4" /></Button>
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
          <DialogHeader><DialogTitle>{editingExpense ? 'Edit' : 'New'} Expense</DialogTitle></DialogHeader>
          <ExpenseForm expense={editingExpense} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}