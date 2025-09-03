import React, { useState, useEffect } from 'react';
import { CustomerDocument } from '@/api/entities';
import { Customer } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Upload, FileText, Download, Trash2, User, Search, RefreshCw } from 'lucide-react';
import { UploadFile } from '@/api/integrations';

export default function CustomerDocuments() {
  const [documents, setDocuments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    customer_id: '',
    document_type: 'Driving License',
    document_part: '',
    file_name: '',
    expiry_date: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [documentsData, customersData] = await Promise.all([
        CustomerDocument.list('-created_date'),
        Customer.list()
      ]);
      setDocuments(documentsData);
      setCustomers(customersData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error loading customer documents. Please try again.');
    }
    setIsLoading(false);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (!uploadFormData.file_name) {
        setUploadFormData(prev => ({ ...prev, file_name: file.name }));
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadFormData.customer_id || !uploadFormData.document_type) {
      alert('Please select a customer, document type, and file to upload.');
      return;
    }

    setUploadingFile(true);
    try {
      console.log('Starting file upload for customer:', uploadFormData.customer_id);
      
      // Upload file to storage
      const uploadResult = await UploadFile({ file: selectedFile });
      console.log('File uploaded successfully:', uploadResult);
      
      if (!uploadResult.file_url) {
        throw new Error('File upload failed - no URL returned');
      }

      // Create document record
      const documentData = {
        customer_id: uploadFormData.customer_id,
        document_type: uploadFormData.document_type,
        document_part: uploadFormData.document_part || null,
        file_name: uploadFormData.file_name || selectedFile.name,
        file_url: uploadResult.file_url,
        expiry_date: uploadFormData.expiry_date || null,
        is_verified: false
      };

      console.log('Creating customer document record:', documentData);
      await CustomerDocument.create(documentData);
      
      await fetchData(); // Reload documents
      setShowUploadForm(false);
      resetUploadForm();
      alert('Document uploaded successfully!');
      
    } catch (error) {
      console.error('Error uploading document:', error);
      alert(`Error uploading document: ${error.message}`);
    }
    setUploadingFile(false);
  };

  const resetUploadForm = () => {
    setUploadFormData({
      customer_id: '',
      document_type: 'Driving License',
      document_part: '',
      file_name: '',
      expiry_date: ''
    });
    setSelectedFile(null);
    // Reset file input
    const fileInput = document.getElementById('customer-file-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleDelete = async (document) => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      try {
        await CustomerDocument.delete(document.id);
        await fetchData();
        alert('Document deleted successfully!');
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Error deleting document. Please try again.');
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

  // Create customer lookup
  const customerMap = customers.reduce((acc, customer) => {
    acc[customer.id] = customer;
    return acc;
  }, {});

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const customer = customerMap[doc.customer_id];
    const customerName = customer ? `${customer.name} (${customer.email})` : 'Unknown Customer';
    
    const matchesSearch = customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.file_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'All' || doc.document_type === filterType;
    const matchesCustomer = !selectedCustomer || doc.customer_id === selectedCustomer;
    
    return matchesSearch && matchesType && matchesCustomer;
  });

  const documentTypes = ['Driving License', 'Emirates ID', 'Passport', 'Visa'];
  const documentParts = {
    'Driving License': ['Front', 'Back'],
    'Emirates ID': ['Front', 'Back'],
    'Passport': ['Bio Page', 'Full Passport'],
    'Visa': ['Visa Page', 'Entry Stamp']
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Customer Documents</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading customer documents...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customer Documents</h1>
          <p className="text-gray-600 mt-1">Manage customer identification, contracts, and other important documents</p>
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
            
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger>
                <SelectValue placeholder="All Customers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All Customers</SelectItem>
                {customers.map(customer => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name} ({customer.email})
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
          <CardTitle>Customer Documents</CardTitle>
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
                    <TableHead>Customer</TableHead>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Part</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map(document => {
                    const customer = customerMap[document.customer_id];
                    return (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <div>
                              <div className="font-medium">
                                {customer ? customer.name : 'Unknown Customer'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {customer?.email || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{document.file_name}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{document.document_type}</Badge>
                        </TableCell>
                        <TableCell>
                          {document.document_part || 'N/A'}
                        </TableCell>
                        <TableCell>
                          {document.created_date ? new Date(document.created_date).toLocaleDateString() : 'N/A'}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Customer Document</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Customer Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer *</label>
              <Select 
                value={uploadFormData.customer_id} 
                onValueChange={(value) => setUploadFormData(prev => ({ ...prev, customer_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer..." />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} ({customer.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Document Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Document Type *</label>
              <Select 
                value={uploadFormData.document_type} 
                onValueChange={(value) => setUploadFormData(prev => ({ ...prev, document_type: value, document_part: '' }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Document Part */}
            {documentParts[uploadFormData.document_type] && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Document Part</label>
                <Select 
                  value={uploadFormData.document_part} 
                  onValueChange={(value) => setUploadFormData(prev => ({ ...prev, document_part: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document part..." />
                  </SelectTrigger>
                  <SelectContent>
                    {documentParts[uploadFormData.document_type].map(part => (
                      <SelectItem key={part} value={part}>{part}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* File Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Document Name</label>
              <Input 
                placeholder="Enter document name..."
                value={uploadFormData.file_name}
                onChange={(e) => setUploadFormData(prev => ({ ...prev, file_name: e.target.value }))}
              />
            </div>

            {/* Expiry Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Expiry Date (Optional)</label>
              <Input 
                type="date"
                value={uploadFormData.expiry_date}
                onChange={(e) => setUploadFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
              />
            </div>

            {/* File Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select File *</label>
              <Input 
                id="customer-file-input"
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
              {selectedFile && (
                <p className="text-sm text-green-600">Selected: {selectedFile.name}</p>
              )}
            </div>

            {/* Upload Progress */}
            {uploadingFile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-800">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Uploading document...</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowUploadForm(false);
                  resetUploadForm();
                }}
                disabled={uploadingFile}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpload}
                disabled={uploadingFile || !selectedFile || !uploadFormData.customer_id}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {uploadingFile ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}