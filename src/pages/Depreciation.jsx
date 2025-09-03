import React, { useState, useEffect } from 'react';
import { Asset } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AssetForm from '../components/finance/AssetForm';

export default function Depreciation() {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  useEffect(() => { loadAssets(); }, []);

  const loadAssets = async () => {
    setIsLoading(true);
    const data = await Asset.list();
    setAssets(data);
    setIsLoading(false);
  };

  const handleSubmit = async (formData) => {
    if (editingAsset) {
      await Asset.update(editingAsset.id, formData);
    } else {
      await Asset.create(formData);
    }
    setShowForm(false);
    setEditingAsset(null);
    loadAssets();
  };

  const calculateDepreciation = (asset) => {
    const yearlyDep = asset.purchase_cost / asset.lifespan_years;
    const yearsOwned = (new Date() - new Date(asset.purchase_date)) / (1000 * 60 * 60 * 24 * 365);
    const accumulatedDep = Math.min(yearlyDep * yearsOwned, asset.purchase_cost);
    const currentValue = asset.purchase_cost - accumulatedDep;
    return { yearlyDep, currentValue };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Asset Depreciation</h1>
        <Button onClick={() => { setEditingAsset(null); setShowForm(true); }}><Plus className="mr-2 h-4 w-4" /> New Asset</Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader><CardTitle>Tracked Assets</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Asset</TableHead><TableHead>Purchase Cost</TableHead><TableHead>Purchase Date</TableHead><TableHead>Lifespan</TableHead><TableHead>Yearly Dep.</TableHead><TableHead>Current Value</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {assets.map(asset => {
                const { yearlyDep, currentValue } = calculateDepreciation(asset);
                return (
                  <TableRow key={asset.id}>
                    <TableCell>{asset.asset_name}</TableCell>
                    <TableCell>AED {asset.purchase_cost.toLocaleString()}</TableCell>
                    <TableCell>{new Date(asset.purchase_date).toLocaleDateString()}</TableCell>
                    <TableCell>{asset.lifespan_years} years</TableCell>
                    <TableCell>AED {yearlyDep.toLocaleString(undefined, {maximumFractionDigits: 2})}</TableCell>
                    <TableCell>AED {currentValue.toLocaleString(undefined, {maximumFractionDigits: 2})}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => setEditingAsset(asset) || setShowForm(true)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={async () => { if(confirm('Delete?')) {await Asset.delete(asset.id); loadAssets();}}}><Trash2 className="h-4 w-4" /></Button>
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
          <DialogHeader><DialogTitle>{editingAsset ? 'Edit' : 'New'} Asset</DialogTitle></DialogHeader>
          <AssetForm asset={editingAsset} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}