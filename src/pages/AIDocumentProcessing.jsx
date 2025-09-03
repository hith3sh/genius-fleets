
import React, { useState, useEffect } from 'react';
import { AIDocumentProcessing } from '@/api/entities';
import { User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  Brain, 
  Eye, 
  Edit, 
  Download, 
  Trash2, 
  Search, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Zap,
  Copy,
  Plus
} from 'lucide-react';
import { UploadFile, ExtractDataFromUploadedFile } from '@/api/integrations';

const statusColors = {
  'Uploaded': 'bg-gray-100 text-gray-800 border-gray-200',
  'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
  'Completed': 'bg-green-100 text-green-800 border-green-200',
  'Error': 'bg-red-100 text-red-800 border-red-200',
  'Under Review': 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const documentTypeSchemas = {
  'Invoice': {
    type: 'object',
    properties: {
      vendor_name: { type: 'string' },
      invoice_number: { type: 'string' },
      invoice_date: { type: 'string' },
      due_date: { type: 'string' },
      total_amount: { type: 'number' },
      tax_amount: { type: 'number' },
      currency: { type: 'string' },
      items: { 
        type: 'array',
        items: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            quantity: { type: 'number' },
            unit_price: { type: 'number' },
            total: { type: 'number' }
          }
        }
      }
    }
  },
  'Contract': {
    type: 'object',
    properties: {
      contract_title: { type: 'string' },
      party_1: { type: 'string' },
      party_2: { type: 'string' },
      start_date: { type: 'string' },
      end_date: { type: 'string' },
      contract_value: { type: 'number' },
      key_terms: { type: 'array', items: { type: 'string' } },
      payment_terms: { type: 'string' }
    }
  },
  'ID Document': {
    type: 'object',
    properties: {
      full_name: { type: 'string' },
      document_number: { type: 'string' },
      date_of_birth: { type: 'string' },
      nationality: { type: 'string' },
      issue_date: { type: 'string' },
      expiry_date: { type: 'string' },
      place_of_birth: { type: 'string' },
      address: { type: 'string' }
    }
  },
  'License': {
    type: 'object',
    properties: {
      license_number: { type: 'string' },
      license_type: { type: 'string' },
      holder_name: { type: 'string' },
      issue_date: { type: 'string' },
      expiry_date: { type: 'string' },
      issuing_authority: { type: 'string' },
      restrictions: { type: 'string' }
    }
  },
  'Receipt': {
    type: 'object',
    properties: {
      merchant_name: { type: 'string' },
      transaction_date: { type: 'string' },
      total_amount: { type: 'number' },
      payment_method: { type: 'string' },
      items: { 
        type: 'array',
        items: {
          type: 'object',
          properties: {
            item_name: { type: 'string' },
            price: { type: 'number' }
          }
        }
      }
    }
  },
  'Insurance Document': {
    type: 'object',
    properties: {
      policy_number: { type: 'string' },
      policyholder_name: { type: 'string' },
      insurance_company: { type: 'string' },
      policy_type: { type: 'string' },
      start_date: { type: 'string' },
      end_date: { type: 'string' },
      coverage_amount: { type: 'number' },
      premium_amount: { type: 'number' }
    }
  },
  'Bank Statement': {
    type: 'object',
    properties: {
      account_holder: { type: 'string' },
      account_number: { type: 'string' },
      bank_name: { type: 'string' },
      statement_period: { type: 'string' },
      opening_balance: { type: 'number' },
      closing_balance: { type: 'number' },
      transactions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            date: { type: 'string' },
            description: { type: 'string' },
            amount: { type: 'number' },
            balance: { type: 'number' }
          }
        }
      }
    }
  }
};

export default function AIDocumentProcessingPage() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [processingDocument, setProcessingDocument] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [uploadFormData, setUploadFormData] = {
    document_type: 'Invoice',
    processing_notes: ''
  };
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [reviewData, setReviewData] = useState({});

  useEffect(() => {
    fetchData();
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const documentsData = await AIDocumentProcessing.list('-upload_date');
      setDocuments(documentsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error loading AI processing queue. Please try again.');
    }
    setIsLoading(false);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !uploadFormData.document_type) {
      alert('Please select files and document type.');
      return;
    }

    setUploadingFile(true);
    try {
      for (const file of selectedFiles) {
        console.log('Uploading file:', file.name);
        
        // Upload file to storage
        const uploadResult = await UploadFile({ file });
        
        if (!uploadResult.file_url) {
          throw new Error(`File upload failed for ${file.name}`);
        }

        // Create processing record
        const processingData = {
          document_name: file.name,
          file_url: uploadResult.file_url,
          file_type: file.type,
          document_type: uploadFormData.document_type,
          processing_status: 'Uploaded',
          upload_date: new Date().toISOString(),
          processing_notes: uploadFormData.processing_notes || '',
          is_reviewed: false
        };

        await AIDocumentProcessing.create(processingData);
        console.log('Processing record created for:', file.name);
      }
      
      await fetchData();
      setShowUploadForm(false);
      resetUploadForm();
      alert(`${selectedFiles.length} document(s) uploaded successfully and added to processing queue!`);
      
    } catch (error) {
      console.error('Error uploading documents:', error);
      alert(`Error uploading documents: ${error.message}`);
    }
    setUploadingFile(false);
  };

  const resetUploadForm = () => {
    setUploadFormData({
      document_type: 'Invoice',
      processing_notes: ''
    });
    setSelectedFiles([]);
    const fileInput = document.getElementById('ai-file-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleProcessDocument = async (document) => {
    setProcessingDocument(true);
    try {
      console.log('Processing document:', document.document_name);
      
      // Update status to Processing
      await AIDocumentProcessing.update(document.id, {
        processing_status: 'Processing'
      });
      
      // Refresh data to show processing status
      await fetchData();

      // Get the appropriate schema for the document type
      const schema = documentTypeSchemas[document.document_type];
      if (!schema) {
        throw new Error(`No schema defined for document type: ${document.document_type}`);
      }
      
      // Call AI extraction
      const extractionResult = await ExtractDataFromUploadedFile({
        file_url: document.file_url,
        json_schema: schema
      });

      console.log('AI extraction result:', extractionResult);

      let updateData = {
        processed_date: new Date().toISOString()
      };

      if (extractionResult.status === 'success' && extractionResult.output) {
        updateData.processing_status = 'Completed';
        updateData.ai_extracted_data = extractionResult.output;
        updateData.reviewed_data = extractionResult.output; // Initialize with AI data
        
        // Mock confidence scores (in real implementation, AI would provide these)
        const confidenceScores = {};
        Object.keys(extractionResult.output).forEach(key => {
          confidenceScores[key] = Math.random() * 0.3 + 0.7; // 70-100% confidence
        });
        updateData.confidence_scores = confidenceScores;
        
      } else {
        updateData.processing_status = 'Error';
        updateData.error_message = extractionResult.details || 'AI processing failed';
      }

      await AIDocumentProcessing.update(document.id, updateData);
      await fetchData();
      
      if (extractionResult.status === 'success') {
        alert('Document processed successfully! Click "Review" to examine extracted data.');
      } else {
        alert('Document processing failed. Please check the error details.');
      }
      
    } catch (error) {
      console.error('Error processing document:', error);
      
      // Update status to Error
      await AIDocumentProcessing.update(document.id, {
        processing_status: 'Error',
        error_message: error.message
      });
      await fetchData();
      
      alert(`Error processing document: ${error.message}`);
    }
    setProcessingDocument(false);
  };

  const handleReview = (document) => {
    setSelectedDocument(document);
    setReviewData(document.reviewed_data || document.ai_extracted_data || {});
    setShowReviewDialog(true);
  };

  const handleSaveReview = async () => {
    if (!selectedDocument) return;

    try {
      await AIDocumentProcessing.update(selectedDocument.id, {
        reviewed_data: reviewData,
        is_reviewed: true,
        processing_status: 'Completed',
        processed_by: currentUser?.email || 'Unknown',
        processing_notes: selectedDocument.processing_notes || ''
      });
      
      await fetchData();
      setShowReviewDialog(false);
      alert('Review saved successfully!');
      
    } catch (error) {
      console.error('Error saving review:', error);
      alert(`Error saving review: ${error.message}`);
    }
  };

  const handleDelete = async (document) => {
    if (window.confirm('Are you sure you want to delete this processing record? This action cannot be undone.')) {
      try {
        await AIDocumentProcessing.delete(document.id);
        await fetchData();
        alert('Processing record deleted successfully!');
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Error deleting processing record. Please try again.');
      }
    }
  };

  const handleDownload = (document) => {
    if (document.file_url) {
      window.open(document.file_url, '_blank');
    } else {
      alert('Original document not available for download.');
    }
  };

  const handleExportData = (document) => {
    try {
      // Get the data to export (prioritize reviewed data over AI data)
      const dataToExport = document.reviewed_data || document.ai_extracted_data;
      
      if (!dataToExport) {
        alert('No extracted data available for export.');
        return;
      }

      // Create export object with metadata
      const exportObject = {
        document_info: {
          document_id: document.id,
          document_name: document.document_name,
          document_type: document.document_type,
          processing_status: document.processing_status,
          upload_date: document.upload_date,
          processed_date: document.processed_date,
          is_reviewed: document.is_reviewed,
          processed_by: document.processed_by || null,
          processing_notes: document.processing_notes || ''
        },
        extracted_data: dataToExport,
        confidence_scores: document.confidence_scores || {},
      };

      // Convert to JSON string with formatting
      const jsonString = JSON.stringify(exportObject, null, 2);
      
      // Create blob and download
      const blob = new Blob([jsonString], { 
        type: 'application/json;charset=utf-8' 
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Create filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, ''); // YYYYMMDDTHHMMSS
      const cleanDocName = document.document_name.replace(/\.[^/.]+$/, ''); // Remove extension
      const filename = `${cleanDocName}_extracted_data_${timestamp}.json`;
      
      link.download = filename;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup: Use setTimeout to defer cleanup, ensuring the browser initiates the download
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 0);
      
      console.log('Data exported successfully:', filename);
      
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data. Please try again.');
    }
  };

  const handleBatchProcess = async () => {
    const uploadedDocuments = documents.filter(doc => doc.processing_status === 'Uploaded');
    if (uploadedDocuments.length === 0) {
      alert('No documents in queue for processing.');
      return;
    }

    if (window.confirm(`Process ${uploadedDocuments.length} document(s) with AI? This may take several minutes.`)) {
      for (const doc of uploadedDocuments) {
        await handleProcessDocument(doc);
        // Small delay between processing to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.document_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.processing_notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || doc.processing_status === statusFilter;
    const matchesType = typeFilter === 'All' || doc.document_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getProcessingStats = () => {
    return {
      total: documents.length,
      uploaded: documents.filter(d => d.processing_status === 'Uploaded').length,
      processing: documents.filter(d => d.processing_status === 'Processing').length,
      completed: documents.filter(d => d.processing_status === 'Completed').length,
      error: documents.filter(d => d.processing_status === 'Error').length
    };
  };

  const stats = getProcessingStats();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manual AI Document Processing</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading AI processing queue...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manual AI Document Processing</h1>
          <p className="text-gray-600 mt-1">Upload documents for AI analysis and data extraction</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchData} disabled={isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          {stats.uploaded > 0 && (
            <Button 
              onClick={handleBatchProcess} 
              className="bg-purple-600 hover:bg-purple-700"
              disabled={processingDocument}
            >
              <Zap className="mr-2 h-4 w-4" />
              Process All ({stats.uploaded})
            </Button>
          )}
          <Button onClick={() => setShowUploadForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Upload Documents
          </Button>
        </div>
      </div>

      {/* Processing Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.uploaded}</div>
            <div className="text-sm text-gray-600">Queue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
            <div className="text-sm text-gray-600">Processing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.error}</div>
            <div className="text-sm text-gray-600">Errors</div>
          </CardContent>
        </Card>
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
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Uploaded">Uploaded</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Error">Error</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Document Types</SelectItem>
                {Object.keys(documentTypeSchemas).map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-600 flex items-center">
              <Brain className="mr-2 h-4 w-4" />
              {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Document Processing Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                {documents.length === 0 ? 'No documents in processing queue.' : 'No documents match your search criteria.'}
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
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Processed Date</TableHead>
                    <TableHead>Review Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map(document => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">
                              {document.document_name}
                            </div>
                            {document.processing_notes && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {document.processing_notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{document.document_type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={statusColors[document.processing_status]}>
                            {document.processing_status === 'Processing' && (
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1"></div>
                            )}
                            {document.processing_status}
                          </Badge>
                          {document.processing_status === 'Error' && document.error_message && (
                            <AlertCircle className="h-4 w-4 text-red-500" title={document.error_message} />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {document.upload_date ? new Date(document.upload_date).toLocaleString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {document.processed_date ? new Date(document.processed_date).toLocaleString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Badge className={document.is_reviewed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {document.is_reviewed ? 'Reviewed' : 'Pending'}
                          </Badge>
                          {document.is_reviewed && (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {document.processing_status === 'Uploaded' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleProcessDocument(document)}
                              disabled={processingDocument}
                              className="text-purple-600 hover:text-purple-700"
                              title="Process with AI"
                            >
                              <Brain className="h-3 w-3" />
                            </Button>
                          )}
                          {document.processing_status === 'Completed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReview(document)}
                              className="text-blue-600 hover:text-blue-700"
                              title="Review Extracted Data"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          )}
                          {(document.processing_status === 'Completed' && (document.ai_extracted_data || document.reviewed_data)) && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleExportData(document)}
                              className="text-green-600 hover:text-green-700"
                              title="Export Extracted Data"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(document)}
                            className="text-gray-600 hover:text-gray-700"
                            title="View Original Document"
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Documents for AI Processing</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Document Type Selection */}
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
                  {Object.keys(documentTypeSchemas).map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Select the type of document for optimal AI processing
              </p>
            </div>

            {/* Processing Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Processing Notes (Optional)</label>
              <Textarea 
                placeholder="Add any specific instructions for AI processing..."
                value={uploadFormData.processing_notes}
                onChange={(e) => setUploadFormData(prev => ({ ...prev, processing_notes: e.target.value }))}
                rows={3}
              />
            </div>

            {/* File Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Documents *</label>
              <Input 
                id="ai-file-input"
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.tiff,.bmp"
                onChange={handleFileSelect}
                multiple
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500">
                Supported formats: PDF, Images (JPG, PNG, TIFF), Word documents. Multiple files allowed.
              </p>
              {selectedFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium text-green-600">Selected Files:</p>
                  {selectedFiles.map((file, index) => (
                    <p key={index} className="text-sm text-gray-600">• {file.name}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Progress */}
            {uploadingFile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-800 mb-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Uploading documents to AI processing queue...</span>
                </div>
                <Progress value={50} className="w-full" />
              </div>
            )}

            {/* Info Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">How AI Processing Works:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Documents are uploaded to a secure processing queue</li>
                <li>• AI analyzes and extracts key information based on document type</li>
                <li>• Review and correct extracted data manually if needed</li>
                <li>• Export processed data to other systems or download as JSON</li>
              </ul>
            </div>

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
                disabled={uploadingFile || selectedFiles.length === 0 || !uploadFormData.document_type}
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
                    Upload to Queue ({selectedFiles.length})
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review AI-Extracted Data</DialogTitle>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="space-y-6 py-4">
              {/* Document Info */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Document Information:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Name:</span> {selectedDocument.document_name}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {selectedDocument.document_type}
                  </div>
                  <div>
                    <span className="font-medium">Upload Date:</span> {selectedDocument.upload_date ? new Date(selectedDocument.upload_date).toLocaleString() : 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Processing Date:</span> {selectedDocument.processed_date ? new Date(selectedDocument.processed_date).toLocaleString() : 'N/A'}
                  </div>
                </div>
              </div>

              {/* Extracted Data Review */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Review & Edit Extracted Data:</h4>
                
                {Object.entries(reviewData).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium capitalize">
                        {key.replace(/_/g, ' ')}
                      </label>
                      {selectedDocument.confidence_scores?.[key] && (
                        <Badge 
                          className={
                            selectedDocument.confidence_scores[key] > 0.8 
                              ? 'bg-green-100 text-green-800' 
                              : selectedDocument.confidence_scores[key] > 0.6 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                          }
                        >
                          {Math.round(selectedDocument.confidence_scores[key] * 100)}% confident
                        </Badge>
                      )}
                    </div>
                    
                    {Array.isArray(value) ? (
                      <Textarea
                        value={JSON.stringify(value, null, 2)}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            setReviewData(prev => ({ ...prev, [key]: parsed }));
                          } catch (error) {
                            // Keep as string if JSON parsing fails
                            setReviewData(prev => ({ ...prev, [key]: e.target.value }));
                          }
                        }}
                        rows={4}
                        className="font-mono text-sm"
                      />
                    ) : (
                      <Input
                        value={value || ''}
                        onChange={(e) => setReviewData(prev => ({ ...prev, [key]: e.target.value }))}
                        className={
                          selectedDocument.confidence_scores?.[key] && selectedDocument.confidence_scores[key] < 0.7 
                            ? 'border-orange-300 bg-orange-50' 
                            : ''
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Original Document Link */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-900">Original Document</h4>
                    <p className="text-sm text-blue-700">View the original document while reviewing extracted data</p>
                  </div>
                  <Button 
                    onClick={() => handleDownload(selectedDocument)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Original
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setShowReviewDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleExportData(selectedDocument)}
                  variant="outline"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button 
                  onClick={handleSaveReview}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Save Review
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
