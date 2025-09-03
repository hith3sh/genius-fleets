import React, { useState, useEffect } from 'react';
import { Invoice } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const VAT_RATE = 0.05;

export default function TaxVAT() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInvoices() {
      setIsLoading(true);
      const data = await Invoice.list();
      setInvoices(data);
      setIsLoading(false);
    }
    loadInvoices();
  }, []);

  const taxableInvoices = invoices.filter(inv => inv.tax > 0);
  const totalVAT = taxableInvoices.reduce((sum, inv) => sum + inv.amount * VAT_RATE, 0);
  
  const handleExport = () => {
    const headers = "Date,Invoice Ref,Transaction Type,Taxable Amount,VAT %,VAT Amount\n";
    const csv = taxableInvoices.map(inv => {
        const vatAmount = inv.amount * VAT_RATE;
        return `"${inv.invoice_date}","${inv.invoice_number}","Sale","${inv.amount}","5","${vatAmount.toFixed(2)}"`;
    }).join('\n');
    const blob = new Blob([headers + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'vat_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tax / VAT Report</h1>
         <Button onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export Report</Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>VAT Summary</CardTitle>
            <p className="text-2xl font-bold text-blue-600">Total VAT Collected: AED {totalVAT.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Invoice Ref</TableHead><TableHead>Transaction</TableHead><TableHead>Taxable Amt</TableHead><TableHead>VAT %</TableHead><TableHead>VAT Amt</TableHead></TableRow></TableHeader>
            <TableBody>
              {isLoading ? <TableRow><TableCell colSpan="6">Loading...</TableCell></TableRow> :
                taxableInvoices.map(invoice => {
                  const vatAmount = invoice.amount * VAT_RATE;
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell>{new Date(invoice.invoice_date).toLocaleDateString()}</TableCell>
                      <TableCell>{invoice.invoice_number}</TableCell>
                      <TableCell>Sale</TableCell>
                      <TableCell>AED {invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>5%</TableCell>
                      <TableCell>AED {vatAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}