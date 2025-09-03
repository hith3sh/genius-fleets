import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CarImage } from '@/api/entities';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ImageSelectorDialog({ isOpen, onClose, make, color, onSelectImages, currentSelection }) {
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedUrls, setSelectedUrls] = useState(currentSelection || []);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      loadAllImages();
      setSelectedUrls(currentSelection || []);
    }
  }, [isOpen]);

  useEffect(() => {
    const filter = () => {
        if (!make && !color) {
            setFilteredImages(allImages);
            return;
        }
        const lowerMake = make?.toLowerCase() || '';
        const lowerColor = color?.toLowerCase() || '';
        
        const results = allImages.filter(image => {
            const imageMake = image.model_tag?.toLowerCase() || '';
            const imageColor = image.color_tag?.toLowerCase() || '';
            
            const makeMatch = !make || imageMake.includes(lowerMake);
            const colorMatch = !color || imageColor.includes(lowerColor);

            return makeMatch && colorMatch;
        });
        setFilteredImages(results);
    };
    filter();
  }, [make, color, allImages]);
  
  const loadAllImages = async () => {
    setIsLoading(true);
    try {
      const data = await CarImage.list();
      setAllImages(data);
      setFilteredImages(data); // Initially show all
    } catch (error) {
      console.error("Failed to load car images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (url) => {
    setSelectedUrls(prev => 
      prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
    );
  };

  const handleConfirm = () => {
    onSelectImages(selectedUrls);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Vehicle Images</DialogTitle>
          <div className="text-sm text-gray-500">
            Filtering for Make: <span className="font-semibold text-blue-600">{make || 'any'}</span>, 
            Color: <span className="font-semibold text-blue-600">{color || 'any'}</span>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-4 border-t border-b">
            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="w-full h-32 rounded-lg" />)}
                </div>
            ) : filteredImages.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    <p>No images found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredImages.map(image => (
                        <div key={image.id} className="relative cursor-pointer group" onClick={() => handleImageClick(image.image_url)}>
                            <img src={image.image_url} alt={`${image.model_tag} ${image.color_tag}`} className="w-full h-32 object-cover rounded-lg border-2 border-transparent group-hover:border-blue-500 transition-all" />
                            {selectedUrls.includes(image.image_url) && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                    <CheckCircle className="w-8 h-8 text-white" />
                                </div>
                            )}
                             <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 rounded-b-lg truncate">
                                {image.model_tag} - {image.color_tag}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm Selection ({selectedUrls.length})</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}