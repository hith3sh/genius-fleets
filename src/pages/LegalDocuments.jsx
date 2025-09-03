import React, { useState, useEffect } from 'react';
import { LegalDocument } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Upload, FileText, Download, Trash2, Building, Search, RefreshCw, Shield, Eye, AlertTriangle, Calendar } from 'lucide-react';
import { UploadFile } from '@/api/integrations';

const categoryColors = {
  'Legal': 'bg-red-100 text-red-800 border-red-200',
  'Registration': 'bg-blue-100 text-blue-800 border-blue-200',
  'Insurance': 'bg-green-100 text-green-800 border-green-200',
  'Compliance': 'bg-purple-100 text-purple-800 border-purple-200',
  'Financial': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Operational': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'HR': 'bg-pink-100 text-pink-800 border-pink-200'
};

const documentTypesByCategory = {
  'Legal': ['Business License', 'Trade License', 'Legal Contract', 'Court Document'],
  'Registration': ['Company Registration', 'VAT Registration', 'Tax Registration'],
  'Insurance': ['General Insurance', 'Vehicle Fleet Insurance', 'Liability Insurance'],
  'Compliance': ['Compliance Certificate', 'Audit Report', 'Regulatory Approval'],
  'Financial': ['Tax Document', 'Bank Document', 'Financial Statement'],
  'Operational': ['Company Policy', 'Procedure', 'Operational Permit'],
  'HR': ['HR Policy', 'Employment Law Document']
};

export default function LegalDocuments() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    category: 'Legal',
    document_type: '',
    document_name: '',
    expiry_date: '',
    description: '',
    is_critical: false,
    renewal_reminder_days: 30,
    responsible_department: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const documentsData = await LegalDocument.list('-upload_date');
      setDocuments(documentsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error loading legal documents. Please try again.');
    }
    setIsLoading(false);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (!uploadFormData.document_name) {
        setUploadFormData(prev => ({ ...prev, document_name: file.name }));
      }
    }
  };

  const handleCategoryChange = (category) => {
    setUploadFormData(prev => ({ 
      ...prev, 
      category: category,
      document_type: '' // Reset document type when category changes
    }));
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadFormData.category || !uploadFormData.document_type) {
      alert('Please select a category, document type, and file to upload.');
      return;
    }

    setUploadingFile(true);
    try {
      console.log('Starting file upload for legal document:', uploadFormData.category);
      
      // Upload file to storage
      const uploadResult = await UploadFile({ file: selectedFile });
      console.log('File uploaded successfully:', uploadResult);
      
      if (!uploadResult.file_url) {
        throw new Error('File upload failed - no URL returned');
      }

      // Create document record
      const documentData = {
        category: uploadFormData.category,
        document_type: uploadFormData.document_type,
        document_name: uploadFormData.document_name || selectedFile.name,
        file_url: uploadResult.file_url,
        file_type: selectedFile.type,
        upload_date: new Date().toISOString().split('T')[0],
        expiry_date: uploadFormData.expiry_date || null,
        description: uploadFormData.description || '',
        is_critical: uploadFormData.is_critical,
        renewal_reminder_days: uploadFormData.renewal_reminder_days || 30,
        responsible_department: uploadFormData.responsible_department || '',
        is_verified: false
      };

      console.log('Creating legal document record:', documentData);
      await LegalDocument.create(documentData);
      
      await fetchData(); // Reload documents
      setShowUploadForm(false);
      resetUploadForm();
      alert('Legal document uploaded successfully!');
      
    } catch (error) {
      console.error('Error uploading document:', error);
      alert(`Error uploading document: ${error.message}`);
    }
    setUploadingFile(false);
  };

  const resetUploadForm = () => {
    setUploadFormData({
      category: 'Legal',
      document_type: '',
      document_name: '',
      expiry_date: '',
      description: '',
      is_critical: false,
      renewal_reminder_days: 30,
      responsible_department: ''
    });
    setSelectedFile(null);
    // Reset file input
    const fileInput = document.getElementById('legal-file-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleDelete = async (document) => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      try {
        await LegalDocument.delete(document.id);
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

  const handleVerifyToggle = async (document) => {
    try {
      await LegalDocument.update(document.id, { is_verified: !document.is_verified });
      await fetchData();
      alert(`Document ${document.is_verified ? 'unverified' : 'verified'} successfully!`);
    } catch (error) {
      console.error('Error updating document verification:', error);
      alert('Error updating document. Please try again.');
    }
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.document_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.responsible_department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'All' || doc.category === filterCategory;
    const matchesType = filterType === 'All' || doc.document_type === filterType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Get all document types for filter
  const allDocumentTypes = Object.values(documentTypesByCategory).flat();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Legal & Company Documents</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading legal documents...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Legal & Company Documents</h1>
          <p className="text-gray-600 mt-1">Manage business licenses, registrations, compliance documents, and company policies</p>
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

      {/* Expiry Alerts */}
      {documents.some(doc => isExpired(doc.expiry_date) || isExpiringSoon(doc.expiry_date)) && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Document Expiry Alerts</span>
            </div>
            <div className="mt-2 text-sm text-orange-700">
              {documents.filter(doc => isExpired(doc.expiry_date)).length > 0 && (
                <p>⚠️ {documents.filter(doc => isExpired(doc.expiry_date)).length} document(s) have expired</p>
              )}
              {documents.filter(doc => isExpiringSoon(doc.expiry_date)).length > 0 && (
                <p>🔔 {documents.filter(doc => isExpiringSoon(doc.expiry_date)).length} document(s) expiring within 30 days</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

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
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {Object.keys(documentTypesByCategory).map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Document Types</SelectItem>
                {allDocumentTypes.map(type => (
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
          <CardTitle>Legal & Company Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8">
              <Building className="w-12 h-12 text-gray-300 mx-auto mb-4" />
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
                    <TableHead>Document</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map(document => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {document.document_name}
                              {document.is_critical && (
                                <Shield className="h-3 w-3 text-red-500" title="Critical Business Document" />
                              )}
                            </div>
                            {document.description && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {document.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={categoryColors[document.category] || 'bg-gray-100 text-gray-800'}>
                          {document.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{document.document_type}</Badge>
                      </TableCell>
                      <TableCell>
                        {document.upload_date ? new Date(document.upload_date).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {document.expiry_date ? (
                          <div className="flex items-center gap-1">
                            <span className={
                              isExpired(document.expiry_date) ? 'text-red-600 font-medium' :
                              isExpiringSoon(document.expiry_date) ? 'text-orange-600 font-medium' : ''
                            }>
                              {new Date(document.expiry_date).toLocaleDateString()}
                            </span>
                            {(isExpired(document.expiry_date) || isExpiringSoon(document.expiry_date)) && (
                              <AlertTriangle className="h-3 w-3 text-orange-500" />
                            )}
                          </div>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell>
                        {document.responsible_department || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge className={document.is_verified ? 'bg-green-100 text-green-800 cursor-pointer hover:bg-green-200' : 'bg-yellow-100 text-yellow-800 cursor-pointer hover:bg-yellow-200'}
                                 onClick={() => handleVerifyToggle(document)}>
                            {document.is_verified ? 'Verified' : 'Pending'}
                          </Badge>
                          {document.is_critical && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              Critical
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(document)}
                            className="text-blue-600 hover:text-blue-700"
                            title="View/Download"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(document)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
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
            <DialogTitle>Upload Legal & Company Document</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category *</label>
              <Select 
                value={uploadFormData.category} 
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(documentTypesByCategory).map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Document Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Document Type *</label>
              <Select 
                value={uploadFormData.document_type} 
                onValueChange={(value) => setUploadFormData(prev => ({ ...prev, document_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type..." />
                </SelectTrigger>
                <SelectContent>
                  {documentTypesByCategory[uploadFormData.category]?.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Document Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Document Name</label>
              <Input 
                placeholder="Enter document name..."
                value={uploadFormData.document_name}
                onChange={(e) => setUploadFormData(prev => ({ ...prev, document_name: e.target.value }))}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                placeholder="Brief description of the document..."
                value={uploadFormData.description}
                onChange={(e) => setUploadFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Responsible Department */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Responsible Department</label>
              <Input 
                placeholder="Department responsible for this document..."
                value={uploadFormData.responsible_department}
                onChange={(e) => setUploadFormData(prev => ({ ...prev, responsible_department: e.target.value }))}
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

            {/* Renewal Reminder Days */}
            {uploadFormData.expiry_date && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Renewal Reminder (Days Before Expiry)</label>
                <Input 
                  type="number"
                  value={uploadFormData.renewal_reminder_days}
                  onChange={(e) => setUploadFormData(prev => ({ ...prev, renewal_reminder_days: parseInt(e.target.value) || 30 }))}
                  min="1"
                  max="365"
                />
              </div>
            )}

            {/* Critical Document Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_critical"
                checked={uploadFormData.is_critical}
                onChange={(e) => setUploadFormData(prev => ({ ...prev, is_critical: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <label htmlFor="is_critical" className="text-sm font-medium cursor-pointer">
                Mark as Critical Business Document
              </label>
            </div>

            {/* File Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select File *</label>
              <Input 
                id="legal-file-input"
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
                disabled={uploadingFile || !selectedFile || !uploadFormData.category || !uploadFormData.document_type}
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