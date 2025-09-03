import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Customer } from '@/api/entities';

export default function CustomerSelector({ selectedCustomer, onCustomerSelect }) {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      setIsLoading(true);
      try {
        const customerList = await Customer.list();
        setCustomers(customerList);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  const selectedValue = selectedCustomer ? selectedCustomer.id : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12 text-left font-normal"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            {selectedCustomer ? (
              <span className="font-medium">{selectedCustomer.name}</span>
            ) : (
              <span className="text-gray-500">Search and select a customer...</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Type customer name to search..." 
            className="h-12"
          />
          <CommandEmpty>
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <span>Loading customers...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center p-4">
                <span>No customer found.</span>
              </div>
            )}
          </CommandEmpty>
          <CommandGroup className="max-h-64 overflow-y-auto">
            {customers.map((customer) => (
              <CommandItem
                key={customer.id}
                value={`${customer.name} ${customer.email}`}
                onSelect={() => {
                  onCustomerSelect(customer);
                  setOpen(false);
                }}
                className="flex items-center gap-3 p-3 cursor-pointer"
              >
                <Check
                  className={cn(
                    "h-4 w-4",
                    selectedValue === customer.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex-1">
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-gray-500">{customer.email}</div>
                  {customer.phone && (
                    <div className="text-xs text-gray-400">{customer.phone}</div>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}