import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export default function Marketing() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
          <Mail className="w-8 h-8 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Marketing Campaigns
          </h1>
          <p className="text-gray-600 mt-1">This feature is under construction.</p>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle>Coming Soon</CardTitle></CardHeader>
        <CardContent>
            <p>A full-featured marketing module to create, send, and track email campaigns is being developed.</p>
            <p className="mt-2">You will be able to:</p>
            <ul className="list-disc pl-6 mt-2">
                <li>Build audience segments from customers and leads.</li>
                <li>Design beautiful emails with a rich text editor.</li>
                <li>Schedule campaigns to send at the perfect time.</li>
                <li>Track opens, clicks, and engagement.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}