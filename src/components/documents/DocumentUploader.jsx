import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud, File, X } from 'lucide-react';

export default function DocumentUploader({ title, onFileChange, onClear, file, disabled }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (file instanceof File) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview('pdf');
      }
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClear();
  };
  
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center relative transition-colors hover:border-violet-400 hover:bg-violet-50">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
      
      {!preview ? (
        <>
          <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={disabled}>
            <UploadCloud className="w-4 h-4 mr-2" /> Upload / Capture
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*,application/pdf"
            capture="environment"
          />
        </>
      ) : (
        <div className="relative group w-32 h-20 mx-auto">
          {preview === 'pdf' ? (
            <div className="bg-gray-100 w-full h-full rounded-md flex flex-col items-center justify-center text-gray-500">
              <File className="w-8 h-8" />
              <span className="text-xs mt-1 truncate px-1">{file.name}</span>
            </div>
          ) : (
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md" />
          )}
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleClear}
            disabled={disabled}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}