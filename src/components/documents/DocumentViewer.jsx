import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Calendar, 
  Car, 
  Eye, 
  Download,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const documentTypeColors = {
  'Insurance': 'bg-blue-100 text-blue-800 border-blue-200',
  'Mulkia': 'bg-green-100 text-green-800 border-green-200',
  'Other': 'bg-gray-100 text-gray-800 border-gray-200'
};

export default function DocumentViewer({ document, vehicleInfo, onClose }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  const isDocumentExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const isDocumentExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const expiry = new Date(expiryDate);
    return expiry <= thirtyDaysFromNow && expiry >= new Date();
  };

  const getFileIcon = (fileType) => {
    if (fileType === 'pdf') return '📄';
    if (['jpg', 'jpeg', 'png'].includes(fileType)) return '🖼️';
    return '📄';
  };

  return (
    <div className="space-y-6">
      {/* Document Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-100 to-violet-100 rounded-xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {document.document_name}
              {document.document_type === 'Mulkia' && (
                <Sparkles className="w-5 h-5 text-violet-500" />
              )}
            </h2>
            <p className="text-gray-600">
              {vehicleInfo} • {getFileIcon(document.file_type)} {document.file_type?.toUpperCase()}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={documentTypeColors[document.document_type]}>
                {document.document_type}
              </Badge>
              {document.is_verified && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              {document.expiry_date && (
                <Badge variant={
                  isDocumentExpired(document.expiry_date) 
                    ? "destructive" 
                    : isDocumentExpiringSoon(document.expiry_date)
                    ? "secondary"
                    : "outline"
                }>
                  {isDocumentExpired(document.expiry_date) 
                    ? 'Expired' 
                    : isDocumentExpiringSoon(document.expiry_date)
                    ? 'Expiring Soon'
                    : 'Valid'
                  }
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => window.open(document.file_url, '_blank')}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(document.file_url, '_blank')}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Full Size
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Document Details</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          {document.extracted_data && (
            <TabsTrigger value="extracted">AI Extracted Data</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Document Name</p>
                  <p className="text-gray-900 mt-1">{document.document_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Document Type</p>
                  <Badge className={documentTypeColors[document.document_type]} size="sm">
                    {document.document_type}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Upload Date</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{formatDate(document.upload_date)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className={`${
                      isDocumentExpired(document.expiry_date) 
                        ? 'text-red-600 font-semibold' 
                        : isDocumentExpiringSoon(document.expiry_date)
                        ? 'text-orange-600 font-semibold'
                        : 'text-gray-900'
                    }`}>
                      {formatDate(document.expiry_date)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Vehicle</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Car className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{vehicleInfo}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">File Type</p>
                  <p className="text-gray-900 mt-1 font-mono">
                    {getFileIcon(document.file_type)} {document.file_type?.toUpperCase()}
                  </p>
                </div>
              </div>
              
              {document.notes && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-500 mb-2">Notes</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{document.notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                {['jpg', 'jpeg', 'png'].includes(document.file_type) ? (
                  <img
                    src={document.file_url}
                    alt={document.document_name}
                    className="max-w-full max-h-96 rounded-lg shadow-lg border"
                  />
                ) : document.file_type === 'pdf' ? (
                  <div className="w-full h-96 border rounded-lg">
                    <iframe
                      src={document.file_url}
                      className="w-full h-full rounded-lg"
                      title={document.document_name}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <FileText className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">Preview not available for this file type</p>
                    <Button
                      variant="outline"
                      onClick={() => window.open(document.file_url, '_blank')}
                      className="mt-4"
                    >
                      Open in New Tab
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {document.extracted_data && (
          <TabsContent value="extracted" className="space-y-6">
            <Card className="border-violet-200 bg-gradient-to-r from-violet-50 to-teal-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  AI-Extracted Mulkia Data
                  {document.is_verified && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries({
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
                  }).map(([field, label]) => (
                    <div key={field} className="space-y-1">
                      <p className="text-sm font-medium text-gray-600">{label}</p>
                      <div className="p-3 bg-white rounded-lg border">
                        <p className={`text-sm ${
                          document.extracted_data[field] 
                            ? 'text-gray-900' 
                            : 'text-gray-400 italic'
                        }`}>
                          {document.extracted_data[field] || 'Not extracted'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}