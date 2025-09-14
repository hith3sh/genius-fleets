import React, { useState, useEffect } from 'react';
import CarImage from '@/api/entities/carImage';
// Also try importing from the index
import { CarImage as CarImageFromIndex } from '@/api/entities';
import { UploadFile } from '@/api/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Upload, Tag, Palette, Fingerprint, Loader2, Image as ImageIcon, Trash2 } from 'lucide-react';

export default function VehicleImageLibrary() {
  const [carImages, setCarImages] = useState([]);
  const [groupedImages, setGroupedImages] = useState({});
  const [newImageData, setNewImageData] = useState({
    image_set_id: '',
    model_tag: '',
    color_tag: '',
    notes: ''
  });
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    console.log('VehicleImageLibrary mounted, CarImage object:', CarImage);
    console.log('CarImageFromIndex object:', CarImageFromIndex);
    console.log('CarImage methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(CarImage)));
    console.log('CarImageFromIndex methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(CarImageFromIndex)));
    console.log('CarImage.bulkCreate exists:', typeof CarImage.bulkCreate);
    console.log('CarImageFromIndex.bulkCreate exists:', typeof CarImageFromIndex.bulkCreate);
    console.log('CarImage.list exists:', typeof CarImage.list);
    loadImages();
  }, []);

  useEffect(() => {
    // Group images by their set ID whenever the main image list changes
    const groups = carImages.reduce((acc, image) => {
      const key = image.image_set_id;
      if (!acc[key]) {
        acc[key] = {
          model: image.model_tag,
          color: image.color_tag,
          notes: image.notes,
          images: []
        };
      }
      acc[key].images.push(image);
      return acc;
    }, {});
    setGroupedImages(groups);
  }, [carImages]);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      // Try with created_at first, fallback to no ordering if that fails
      let data;
      try {
        data = await CarImage.list('created_at', false); // false = descending order
      } catch (orderError) {
        console.log('created_at ordering failed, trying without ordering:', orderError.message);
        try {
          data = await CarImage.list();
        } catch (basicError) {
          console.log('Basic list failed, trying direct query:', basicError.message);
          // Direct Supabase query as last resort
          const { supabase } = await import('@/lib/supabase');
          const result = await supabase.from('car_image').select('*');
          
          if (result.error) throw result.error;
          data = result.data;
        }
      }
      setCarImages(data || []);
    } catch (error) {
      console.error("Error loading car images:", error);
      setCarImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewImageData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFilesToUpload(Array.from(e.target.files));
  };
  
  const handleDeleteSet = async (setId) => {
    if (!window.confirm(`Are you sure you want to delete the entire image set "${setId}"? This cannot be undone.`)) {
        return;
    }
    
    const imagesToDelete = carImages.filter(img => img.image_set_id === setId);
    try {
        const deletePromises = imagesToDelete.map(img => CarImage.delete(img.id));
        await Promise.all(deletePromises);
        alert('Image set deleted successfully!');
        loadImages(); // Refresh the list
    } catch (error) {
        console.error("Error deleting image set:", error);
        alert('Failed to delete the image set.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (filesToUpload.length === 0 || !newImageData.image_set_id || !newImageData.model_tag || !newImageData.color_tag) {
      alert('Please fill in all required fields and select at least one image.');
      return;
    }

    setIsUploading(true);
    try {
      const uploadPromises = filesToUpload.map(file => UploadFile({ file }));
      const uploadedFiles = await Promise.all(uploadPromises);

      const newImageRecords = uploadedFiles.map(file => ({
        ...newImageData,
        image_url: file.file_url,
      }));

      console.log('About to call CarImage.bulkCreate with:', newImageRecords);
      console.log('CarImage object:', CarImage);
      console.log('CarImage.bulkCreate method:', CarImage.bulkCreate);
      console.log('CarImage.bulkCreate type:', typeof CarImage.bulkCreate);
      
      // Test if bulkCreate exists
      if (typeof CarImage.bulkCreate !== 'function') {
        console.log('CarImage.bulkCreate not found, trying CarImageFromIndex...');
        if (typeof CarImageFromIndex.bulkCreate === 'function') {
          console.log('Using CarImageFromIndex.bulkCreate');
          await CarImageFromIndex.bulkCreate(newImageRecords);
        } else {
          throw new Error('CarImage.bulkCreate is not a function. Available methods: ' + Object.getOwnPropertyNames(Object.getPrototypeOf(CarImage)));
        }
      } else {
        await CarImage.bulkCreate(newImageRecords);
      }

      alert('Images uploaded successfully!');
      setNewImageData({ image_set_id: '', model_tag: '', color_tag: '', notes: '' });
      setFilesToUpload([]);
      document.getElementById('file-upload-input').value = ''; // Reset file input
      loadImages();
    } catch (error) {
      console.error("Error uploading images:", error);
      
      // Enhanced error handling
      let errorMsg = 'An error occurred during upload. Please try again.';
      
      if (error.message?.includes('row-level security policy')) {
        errorMsg = 'Permission denied: You don\'t have access to upload vehicle images. Please contact your administrator.';
      } else if (error.message?.includes('Bucket not found')) {
        errorMsg = 'Storage bucket not found. The system is using a temporary storage method. Images will be stored locally.';
      } else if (error.message?.includes('File upload failed')) {
        errorMsg = 'File upload failed. The system is using a temporary storage method. Images will be stored locally.';
      } else if (error.message?.includes('duplicate key value')) {
        errorMsg = 'An image with this set ID already exists. Please use a unique Image Set ID.';
      } else if (error.message?.includes('base64-fallback')) {
        errorMsg = 'Images uploaded successfully using temporary storage. They will be visible but may not persist across sessions.';
      } else if (error.message) {
        errorMsg = `Upload error: ${error.message}`;
      }
      
      alert(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Vehicle Image Library</h1>
      </div>

      <Card className="shadow-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-6 h-6 text-teal-600" />
              Add New Image Set
            </CardTitle>
            <CardDescription>Upload one or more images for a specific car model and color. The Image Set ID will be used to link these photos to vehicles.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="image_set_id" className="font-semibold">Image Set ID (Unique)</Label>
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-gray-400" />
                  <Input id="image_set_id" name="image_set_id" value={newImageData.image_set_id} onChange={handleInputChange} placeholder="e.g., CAMRY-WHITE-2023" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model_tag" className="font-semibold">Model Tag</Label>
                 <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-gray-400" />
                  <Input id="model_tag" name="model_tag" value={newImageData.model_tag} onChange={handleInputChange} placeholder="e.g., Camry" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color_tag" className="font-semibold">Color Tag</Label>
                 <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-gray-400" />
                  <Input id="color_tag" name="color_tag" value={newImageData.color_tag} onChange={handleInputChange} placeholder="e.g., White" required />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes" className="font-semibold">Notes</Label>
              <Textarea id="notes" name="notes" value={newImageData.notes} onChange={handleInputChange} placeholder="Optional notes about this image set..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file-upload-input" className="font-semibold">Images</Label>
              <Input id="file-upload-input" type="file" onChange={handleFileChange} multiple required className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Images'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Image Gallery</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
          </div>
        ) : Object.keys(groupedImages).length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
             <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No images have been uploaded yet.</p>
            <p className="text-sm text-gray-400">Use the form above to add your first image set.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedImages).map(([setId, group]) => (
              <Card key={setId} className="shadow-md">
                <CardHeader className="flex flex-row justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-3">
                            <Fingerprint className="w-5 h-5 text-gray-500" />
                            {setId}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1.5"><Tag className="w-4 h-4 text-gray-400"/> {group.model}</span>
                            <span className="flex items-center gap-1.5"><Palette className="w-4 h-4 text-gray-400"/> {group.color}</span>
                        </CardDescription>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteSet(setId)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Set
                    </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {group.images.map(image => (
                      <div key={image.id} className="relative group aspect-w-1 aspect-h-1">
                        <img 
                          src={image.image_url} 
                          alt={`${group.model} ${group.color}`}
                          className="w-full h-full object-cover rounded-lg shadow-sm border"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}