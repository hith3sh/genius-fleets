import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus, Upload, FileText, Download, Trash2, Car, Search, RefreshCw } from 'lucide-react';
import VehicleDocument from '@/api/entities/vehicleDocument';
import Vehicle from '@/api/entities/vehicle';
import { UploadFile } from '@/api/integrations';
import { extractMulkiaData } from '@/api/functions';
import DocumentUploadForm from '../components/documents/DocumentUploadForm';
import MulkiaExtractedData from '../components/documents/MulkiaExtractedData';
import { useAuth } from '@/contexts/AuthContext';

export default function VehicleDocuments() {
  const { user: currentUser, hasAccess } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    console.log('VehicleDocuments component mounted');
    console.log('VehicleDocument entity:', VehicleDocument);
    console.log('Vehicle entity:', Vehicle);
    console.log('UploadFile function:', UploadFile);
    
    // Debug user access
    debugUserAccess();
    fetchData();
  }, []);

  const debugUserAccess = async () => {
    try {
      console.log('🔍 Current user data:', currentUser);
      console.log('🔍 User role:', currentUser?.role);
      console.log('🔍 User email:', currentUser?.user_email);
      console.log('🔍 Accessible modules:', currentUser?.accessible_modules);

      // Check specific access
      const hasVehicleDocsAccess = hasAccess('Vehicle Documents');
      console.log('🔍 Has Vehicle Documents access:', hasVehicleDocsAccess);

    } catch (error) {
      console.error('❌ Error checking user access:', error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      console.log('🔄 Loading vehicle documents and vehicles data...');

      // Load documents and vehicles with fallback logic similar to other pages
      let documentsData = [];
      let vehiclesData = [];

      try {
        // Try with ordering first
        documentsData = await VehicleDocument.list('-upload_date');
        console.log('✅ Documents loaded with ordering:', documentsData?.length || 0);
      } catch (orderError) {
        console.warn('⚠️ Documents ordering failed, trying without ordering:', orderError.message);
        try {
          documentsData = await VehicleDocument.list();
          console.log('✅ Documents loaded without ordering:', documentsData?.length || 0);
        } catch (basicError) {
          console.warn('⚠️ Basic documents list failed, trying direct query:', basicError.message);
          // Direct Supabase query as fallback
          const { supabase } = await import('@/lib/supabase');
          const result = await supabase.from('vehicle_document').select('*');
          if (result.error) throw result.error;
          documentsData = result.data || [];
          console.log('✅ Documents loaded via direct query:', documentsData.length);
        }
      }

      try {
        vehiclesData = await Vehicle.list();
        console.log('✅ Vehicles loaded:', vehiclesData?.length || 0);
      } catch (vehicleError) {
        console.warn('⚠️ Vehicle list failed, trying direct query:', vehicleError.message);
        // Direct Supabase query as fallback
        const { supabase } = await import('@/lib/supabase');
        const result = await supabase.from('vehicle').select('*');
        if (result.error) throw result.error;
        vehiclesData = result.data || [];
        console.log('✅ Vehicles loaded via direct query:', vehiclesData.length);
      }

      setDocuments(documentsData || []);
      setVehicles(vehiclesData || []);

      console.log('🏁 Final counts - Documents:', documentsData?.length || 0, 'Vehicles:', vehiclesData?.length || 0);
    } catch (error) {
      console.error('❌ Error loading vehicle documents data:', error);
      setDocuments([]);
      setVehicles([]);

      let errorMsg = 'Error loading vehicle documents. Please try again.';
      if (error.message?.includes('row-level security policy')) {
        errorMsg = 'Permission denied: You don\'t have access to view vehicle documents. Please contact your administrator to ensure you have the right role and permissions.';
      } else if (error.message) {
        errorMsg = `Error: ${error.message}`;
      }

      alert(errorMsg);
    }
    setIsLoading(false);
  };

  const handleFileUpload = async (vehicleId, documentType, file, documentName, expiryDate, notes) => {
    setUploadingFile(true);
    try {
      console.log('Starting file upload for vehicle:', vehicleId, 'type:', documentType);
      
      // Upload file to storage
      const uploadResult = await UploadFile({ file });
      console.log('File uploaded successfully:', uploadResult);
      
      if (!uploadResult.file_url) {
        throw new Error('File upload failed - no URL returned');
      }

      // Create document record
      const documentData = {
        vehicle_id: vehicleId,
        document_type: documentType,
        document_name: documentName || file.name,
        file_url: uploadResult.file_url,
        file_type: file.type,
        upload_date: new Date().toISOString().split('T')[0],
        expiry_date: expiryDate || null,
        notes: notes || '',
        is_verified: false
      };

      console.log('Creating document record:', documentData);
      await VehicleDocument.create(documentData);
      
      // If it's a Mulkia document, try to extract data
      if (documentType === 'Mulkia') {
        try {
          console.log('Extracting Mulkia data...');
          const extractionResult = await extractMulkiaData({ file_url: uploadResult.file_url });
          
          if (extractionResult.data?.success && extractionResult.data?.extracted_data) {
            // Update the document with extracted data
            const updatedDocumentData = {
              ...documentData,
              extracted_data: extractionResult.data.extracted_data
            };
            
            // Find the document we just created and update it
            const createdDoc = await VehicleDocument.filter({ 
              vehicle_id: vehicleId, 
              file_url: uploadResult.file_url 
            });
            
            if (createdDoc.length > 0) {
              await VehicleDocument.update(createdDoc[0].id, { 
                extracted_data: extractionResult.data.extracted_data 
              });
              console.log('Mulkia data extracted and saved successfully');
            }
          }
        } catch (extractionError) {
          console.error('Mulkia extraction failed:', extractionError);
          // Don't fail the entire upload if extraction fails
        }
      }

      await fetchData(); // Reload documents
      setShowUploadForm(false);
      alert('Document uploaded successfully!');
      
    } catch (error) {
      console.error('Error uploading document:', error);
      
      // Enhanced error handling
      let errorMsg = 'Error uploading document. Please try again.';
      
      if (error.message?.includes('row-level security policy')) {
        errorMsg = 'Permission denied: You don\'t have access to upload vehicle documents. Please contact your administrator.';
      } else if (error.message?.includes('File upload failed')) {
        errorMsg = 'File upload failed. Please check your internet connection and file size.';
      } else if (error.message?.includes('Bucket not found')) {
        errorMsg = 'Storage configuration issue. Please contact your administrator.';
      } else if (error.message) {
        errorMsg = `Upload error: ${error.message}`;
      }
      
      alert(errorMsg);
    }
    setUploadingFile(false);
  };

  const handleDelete = async (document) => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      try {
        await VehicleDocument.delete(document.id);
        await fetchData();
        alert('Document deleted successfully!');
      } catch (error) {
        console.error('Error deleting document:', error);
        
        let errorMsg = 'Error deleting document. Please try again.';
        
        if (error.message?.includes('row-level security policy')) {
          errorMsg = 'Permission denied: You don\'t have access to delete vehicle documents. Please contact your administrator.';
        } else if (error.message) {
          errorMsg = `Delete error: ${error.message}`;
        }
        
        alert(errorMsg);
      }
    }
  };

  const handleDownload = (document) => {
    if (document.file_url) {
      window.open(document.file_url, '_blank');
    } else {
      alert('Document file not available for download.');
    }
  };

  // Create vehicle lookup
  const vehicleMap = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.id] = vehicle;
    return acc;
  }, {});

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const vehicle = vehicleMap[doc.vehicle_id];
    const vehicleName = vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.license_plate})` : 'Unknown Vehicle';
    
    const matchesSearch = vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.document_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'All' || doc.document_type === filterType;
    const matchesVehicle = !selectedVehicle || selectedVehicle === 'all' || doc.vehicle_id === selectedVehicle;
    
    return matchesSearch && matchesType && matchesVehicle;
  });

  const documentTypes = ['Insurance', 'Mulkia', 'Vehicle Pictures', 'Other'];

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Vehicle Documents</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading vehicle documents...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Documents</h1>
          <p className="text-gray-600 mt-1">Manage vehicle registration, insurance, and other important documents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchData} disabled={isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={() => setShowUploadForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger>
                <SelectValue placeholder="All Vehicles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vehicles</SelectItem>
                {vehicles.map(vehicle => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.make} {vehicle.model} ({vehicle.license_plate})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Document Types</SelectItem>
                {documentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-600 flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                {documents.length === 0 ? 'No documents uploaded yet.' : 'No documents match your search criteria.'}
              </p>
              <Button onClick={() => setShowUploadForm(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Upload First Document
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map(document => {
                    const vehicle = vehicleMap[document.vehicle_id];
                    return (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-gray-500" />
                            <div>
                              <div className="font-medium">
                                {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {vehicle?.license_plate || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{document.document_name}</div>
                            {document.notes && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {document.notes}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{document.document_type}</Badge>
                        </TableCell>
                        <TableCell>
                          {document.upload_date ? new Date(document.upload_date).toLocaleDateString() : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {document.expiry_date ? (
                            <span className={new Date(document.expiry_date) < new Date() ? 'text-red-600 font-medium' : ''}>
                              {new Date(document.expiry_date).toLocaleDateString()}
                            </span>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={document.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {document.is_verified ? 'Verified' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownload(document)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(document)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Form Dialog */}
      <Dialog open={showUploadForm} onOpenChange={setShowUploadForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Vehicle Document</DialogTitle>
            <DialogDescription>
              Upload insurance, Mulkia, or other important vehicle documents. The system will process the document and extract relevant information automatically.
            </DialogDescription>
          </DialogHeader>
          <DocumentUploadForm
            vehicles={vehicles}
            onUpload={handleFileUpload}
            onCancel={() => setShowUploadForm(false)}
            isUploading={uploadingFile}
            documentTypes={documentTypes}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}