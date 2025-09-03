
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  CheckCircle2, 
  Edit3, 
  Save, 
  X 
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function MulkiaExtractedData({ extractedData, onDataConfirmed, onCancel }) {
  const [editableData, setEditableData] = useState(extractedData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setEditableData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirm = () => {
    onDataConfirmed(editableData);
  };

  const fieldLabels = {
    license_plate_number: 'License Plate Number',
    registration_expiry_date: 'Registration Expiry Date',
    registration_date: 'Registration Date',
    insurance_expiry_date: 'Insurance Expiry Date',
    insurance_policy_number: 'Insurance Policy Number',
    tc_number: 'TC Number',
    owner_name: 'Owner Name',
    model_year: 'Model Year',
    country_of_origin: 'Country of Origin',
    vehicle_type: 'Vehicle Type',
    chassis_number: 'Chassis Number',
    number_of_passengers: 'Number of Passengers',
    place_of_issue: 'Place of Issue'
  };

  return (
    <Card className="border-violet-200 bg-gradient-to-r from-violet-50 to-teal-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-violet-600" />
          AI-Extracted Mulkia Data
          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              {isEditing ? 'View Mode' : 'Edit Mode'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            AI has successfully extracted data from your Mulkia document. Please review and verify the information before saving.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(fieldLabels).map(([field, label]) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field} className="text-sm font-medium text-gray-700">
                {label}
              </Label>
              {isEditing ? (
                <Input
                  id={field}
                  value={editableData[field] || ''}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="bg-white"
                />
              ) : (
                <div className="p-2 bg-white rounded-md border min-h-[40px] flex items-center">
                  <span className={`text-sm ${editableData[field] ? 'text-gray-900' : 'text-gray-400 italic'}`}>
                    {editableData[field] || 'Not extracted'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-violet-200">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600 text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Confirm & Use Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
