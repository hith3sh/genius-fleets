import React, { useState, useEffect } from 'react';
import { InventoryPart } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import InventoryPartForm from '../components/finance/InventoryPartForm';

export default function Inventory() {
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPart, setEditingPart] = useState(null);

  useEffect(() => { loadParts(); }, []);

  const loadParts = async () => {
    setIsLoading(true);
    const data = await InventoryPart.list();
    setParts(data);
    setIsLoading(false);
  };

  const handleSubmit = async (formData) => {
    if (editingPart) {
      await InventoryPart.update(editingPart.id, formData);
    } else {
      await InventoryPart.create(formData);
    }
    setShowForm(false);
    setEditingPart(null);
    loadParts();
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory / Parts</h1>
        <Button onClick={() => { setEditingPart(null); setShowForm(true); }}><Plus className="mr-2 h-4 w-4" /> New Item</Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader><CardTitle>Inventory List</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Item</TableHead><TableHead>Category</TableHead><TableHead>Unit Cost</TableHead><TableHead>Quantity</TableHead><TableHead>Reorder Level</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {parts.map(part => {
                const isLowStock = part.quantity_available <= part.reorder_level;
                return (
                  <TableRow key={part.id} className={isLowStock ? 'bg-red-50' : ''}>
                    <TableCell>{part.item_name}</TableCell>
                    <TableCell>{part.category}</TableCell>
                    <TableCell>AED {part.unit_cost}</TableCell>
                    <TableCell>{part.quantity_available}</TableCell>
                    <TableCell>{part.reorder_level}</TableCell>
                    <TableCell>{isLowStock ? <Badge variant="destructive">Low Stock</Badge> : <Badge>In Stock</Badge>}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => setEditingPart(part) || setShowForm(true)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={async () => { if(confirm('Delete?')) {await InventoryPart.delete(part.id); loadParts();}}}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingPart ? 'Edit' : 'New'} Item</DialogTitle></DialogHeader>
          <InventoryPartForm part={editingPart} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}