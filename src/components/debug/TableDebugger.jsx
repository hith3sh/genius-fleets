import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Database, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from '@/lib/supabase';

export default function TableDebugger() {
  const [results, setResults] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const testTables = async () => {
    setIsChecking(true);
    const results = {};

    // Test both singular and plural table names
    const tablesToTest = ['vehicle', 'vehicles', 'customer', 'customers', 'booking', 'bookings'];

    for (const tableName of tablesToTest) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(3);

        if (error) {
          results[tableName] = { error: error.message, count: 0 };
        } else {
          results[tableName] = {
            success: true,
            count: data ? data.length : 0,
            sample: data ? data[0] : null
          };
        }
      } catch (err) {
        results[tableName] = { error: err.message, count: 0 };
      }
    }

    setResults(results);
    setIsChecking(false);
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Database Table Debugger
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testTables} disabled={isChecking}>
          {isChecking ? 'Checking...' : 'Test Table Names'}
        </Button>

        {results && (
          <div className="space-y-2">
            {Object.entries(results).map(([tableName, result]) => (
              <Alert key={tableName} className={result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                {result.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription>
                  <strong>{tableName}:</strong> {result.success ?
                    `✅ Found ${result.count} records` :
                    `❌ ${result.error}`
                  }
                  {result.sample && (
                    <div className="text-xs mt-1 text-gray-600">
                      Sample: {JSON.stringify(Object.keys(result.sample)).substring(0, 100)}...
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}