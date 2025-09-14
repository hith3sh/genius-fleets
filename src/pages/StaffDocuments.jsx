import React, { useState, useEffect } from 'react';
import StaffDocument from '@/api/entities/staffDocument';
import Employee from '@/api/entities/employee';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Upload, FileText, Download, Trash2, User, Search, RefreshCw, Shield, Eye } from 'lucide-react';
import { UploadFile } from '@/api/integrations';

export default function StaffDocuments() {
  const [documents, setDocuments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    employee_id: '',
    document_type: 'Employment Contract',
    document_name: '',
    expiry_date: '',
    description: '',
    is_confidential: false
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      console.log('🔄 Loading staff documents and employees data...');

      // Load documents and employees with fallback logic
      let documentsData = [];
      let employeesData = [];

      // Load documents with multi-level fallback
      try {
        // Try with upload_date ordering first
        documentsData = await StaffDocument.list('-upload_date');
        console.log('✅ Documents loaded with upload_date ordering:', documentsData?.length || 0);
      } catch (orderError) {
        console.warn('⚠️ upload_date ordering failed, trying created_at:', orderError.message);
        try {
          // Try with created_at ordering instead
          documentsData = await StaffDocument.list('-created_at');
          console.log('✅ Documents loaded with created_at ordering:', documentsData?.length || 0);
        } catch (createdAtError) {
          console.warn('⚠️ created_at ordering failed, trying without ordering:', createdAtError.message);
          try {
            // Try without any ordering
            documentsData = await StaffDocument.list();
            console.log('✅ Documents loaded without ordering:', documentsData?.length || 0);
          } catch (basicError) {
            console.warn('⚠️ Basic document list failed, trying direct query:', basicError.message);
            // Direct Supabase query as fallback
            const { supabase } = await import('@/lib/supabase');
            const result = await supabase.from('staff_document').select('*');
            if (result.error) throw result.error;
            documentsData = result.data || [];
            console.log('✅ Documents loaded via direct query:', documentsData.length);
          }
        }
      }

      // Load employees with fallback
      try {
        employeesData = await Employee.list();
        console.log('✅ Employees loaded:', employeesData?.length || 0);
      } catch (employeeError) {
        console.warn('⚠️ Employee list failed, trying direct query:', employeeError.message);
        // Direct Supabase query as fallback
        const { supabase } = await import('@/lib/supabase');
        const result = await supabase.from('employee').select('*');
        if (result.error) throw result.error;
        employeesData = result.data || [];
        console.log('✅ Employees loaded via direct query:', employeesData.length);
      }

      setDocuments(documentsData || []);
      setEmployees(employeesData || []);

      console.log('🏁 Final counts - Documents:', documentsData?.length || 0, 'Employees:', employeesData?.length || 0);
    } catch (error) {
      console.error('❌ Error loading staff documents data:', error);
      setDocuments([]);
      setEmployees([]);

      let errorMsg = 'Error loading staff documents. Please try again.';
      if (error.message?.includes('row-level security policy')) {
        errorMsg = 'Permission denied: You don\'t have access to view staff documents. Please contact your administrator to ensure you have the right role and permissions.';
      } else if (error.message) {
        errorMsg = `Error: ${error.message}`;
      }

      alert(errorMsg);
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

  const handleUpload = async () => {
    if (!selectedFile || !uploadFormData.employee_id || !uploadFormData.document_type) {
      alert('Please select an employee, document type, and file to upload.');
      return;
    }

    setUploadingFile(true);
    try {
      console.log('Starting file upload for employee:', uploadFormData.employee_id);
      
      // Upload file to storage
      const uploadResult = await UploadFile({ file: selectedFile });
      console.log('File uploaded successfully:', uploadResult);
      
      if (!uploadResult.file_url) {
        throw new Error('File upload failed - no URL returned');
      }

      // Create document record
      const documentData = {
        employee_id: uploadFormData.employee_id,
        document_type: uploadFormData.document_type,
        document_name: uploadFormData.document_name || selectedFile.name,
        file_url: uploadResult.file_url,
        file_type: selectedFile.type,
        upload_date: new Date().toISOString().split('T')[0],
        expiry_date: uploadFormData.expiry_date || null,
        description: uploadFormData.description || '',
        is_confidential: uploadFormData.is_confidential,
        is_verified: false
      };

      console.log('Creating staff document record:', documentData);
      await StaffDocument.create(documentData);
      
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
      employee_id: '',
      document_type: 'Employment Contract',
      document_name: '',
      expiry_date: '',
      description: '',
      is_confidential: false
    });
    setSelectedFile(null);
    // Reset file input
    const fileInput = document.getElementById('staff-file-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleDelete = async (document) => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      try {
        await StaffDocument.delete(document.id);
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
      await StaffDocument.update(document.id, { is_verified: !document.is_verified });
      await fetchData();
      alert(`Document ${document.is_verified ? 'unverified' : 'verified'} successfully!`);
    } catch (error) {
      console.error('Error updating document verification:', error);
      alert('Error updating document. Please try again.');
    }
  };

  // Create employee lookup
  const employeeMap = employees.reduce((acc, employee) => {
    acc[employee.id] = employee;
    return acc;
  }, {});

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const employee = employeeMap[doc.employee_id];
    const employeeName = employee ? `${employee.name} (${employee.employee_id})` : 'Unknown Employee';
    
    const matchesSearch = employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.document_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'All' || doc.document_type === filterType;
    const matchesEmployee = selectedEmployee === 'all' || !selectedEmployee || doc.employee_id === selectedEmployee;
    
    return matchesSearch && matchesType && matchesEmployee;
  });

  const documentTypes = [
    'Employment Contract', 
    'ID Copy', 
    'Passport Copy', 
    'CV/Resume', 
    'Educational Certificate', 
    'Professional License', 
    'Performance Review', 
    'Training Record', 
    'Medical Certificate', 
    'Other'
  ];

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Staff Documents</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading staff documents...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Staff Documents</h1>
          <p className="text-gray-600 mt-1">Manage employee contracts, certifications, and HR documents</p>
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
            
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger>
                <SelectValue placeholder="All Employees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {employees.map(employee => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name} ({employee.employee_id})
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
          <CardTitle>Staff Documents</CardTitle>
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
                    <TableHead>Employee</TableHead>
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
                    const employee = employeeMap[document.employee_id];
                    return (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <div>
                              <div className="font-medium">
                                {employee ? employee.name : 'Unknown Employee'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {employee?.employee_id || 'N/A'} • {employee?.department || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {document.document_name}
                              {document.is_confidential && (
                                <Shield className="h-3 w-3 text-red-500" title="Confidential Document" />
                              )}
                            </div>
                            {document.description && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {document.description}
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
                          <div className="flex flex-col gap-1">
                            <Badge className={document.is_verified ? 'bg-green-100 text-green-800 cursor-pointer hover:bg-green-200' : 'bg-yellow-100 text-yellow-800 cursor-pointer hover:bg-yellow-200'}
                                   onClick={() => handleVerifyToggle(document)}>
                              {document.is_verified ? 'Verified' : 'Pending'}
                            </Badge>
                            {document.is_confidential && (
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                Confidential
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
            <DialogTitle>Upload Staff Document</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Employee Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Employee *</label>
              <Select 
                value={uploadFormData.employee_id} 
                onValueChange={(value) => setUploadFormData(prev => ({ ...prev, employee_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an employee..." />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(employee => (
                    <SelectItem key={employee.id} value={employee.id}>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-xs text-gray-500">
                          {employee.employee_id} • {employee.department} • {employee.designation}
                        </div>
                      </div>
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
                onValueChange={(value) => setUploadFormData(prev => ({ ...prev, document_type: value }))}
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
              <Input 
                placeholder="Brief description of the document..."
                value={uploadFormData.description}
                onChange={(e) => setUploadFormData(prev => ({ ...prev, description: e.target.value }))}
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

            {/* Confidential Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_confidential"
                checked={uploadFormData.is_confidential}
                onChange={(e) => setUploadFormData(prev => ({ ...prev, is_confidential: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <label htmlFor="is_confidential" className="text-sm font-medium cursor-pointer">
                Mark as Confidential Document
              </label>
            </div>

            {/* File Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select File *</label>
              <Input 
                id="staff-file-input"
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
                disabled={uploadingFile || !selectedFile || !uploadFormData.employee_id}
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