import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function StatListDialog({ isOpen, onOpenChange, title, items, columns }) {

  if (!items || items.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center text-gray-500">No items to display.</div>
        </DialogContent>
      </Dialog>
    );
  }

  // Ensure columns is an array and has fallback
  const tableColumns = Array.isArray(columns) && columns.length > 0 
    ? columns 
    : Object.keys(items[0] || {}).map(key => ({ header: key.replace(/_/g, ' ').toUpperCase(), accessor: key }));

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title} ({items.length})</DialogTitle>
           <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {tableColumns.map(col => <TableHead key={col.header}>{col.header}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  {tableColumns.map(col => (
                    <TableCell key={col.accessor}>
                      {item[col.accessor] !== null && typeof item[col.accessor] !== 'undefined' ? String(item[col.accessor]) : 'N/A'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}