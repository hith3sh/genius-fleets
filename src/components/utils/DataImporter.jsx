import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Database, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { importAllSampleData } from '@/utils/importData';

export default function DataImporter({ onImportComplete }) {
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  const handleImport = async () => {
    setIsImporting(true);
    setImportResult(null);

    try {
      const result = await importAllSampleData();
      setImportResult(result);

      // Call the callback to refresh data if import was successful
      if (result.success && onImportComplete) {
        onImportComplete();
      }
    } catch (error) {
      setImportResult({
        success: false,
        error: error.message
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Database Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Import sample vehicles and customers to get started with the booking system.
        </p>

        <Button
          onClick={handleImport}
          disabled={isImporting}
          className="w-full"
        >
          {isImporting ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Importing Data...
            </>
          ) : (
            <>
              <Database className="w-4 h-4 mr-2" />
              Import Sample Data
            </>
          )}
        </Button>

        {importResult && (
          <Alert className={importResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            {importResult.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={importResult.success ? "text-green-800" : "text-red-800"}>
              {importResult.success ? (
                <div>
                  <p className="font-medium">Import successful!</p>
                  <p className="text-xs mt-1">
                    Vehicles: {importResult.vehicles?.message || 'Success'}
                  </p>
                  <p className="text-xs">
                    Customers: {importResult.customers?.message || 'Success'}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-medium">Import failed</p>
                  <p className="text-xs mt-1">
                    {importResult.error || 'Unknown error occurred'}
                  </p>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}