

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PreviewArea } from './components/PreviewArea';
import { CollageSettings, UploadedImage } from './types';
import { generateCollageImage } from './utils/imageProcessing';

// Simple UUID generator for this scope
const generateId = () => Math.random().toString(36).substr(2, 9);

const INITIAL_SETTINGS: CollageSettings = {
  rows: 5,
  cols: 5,
  gap: 4,
  backgroundColor: '#000000',
  aspectRatio: 1, // Square by default
  exportMode: 'width',
  exportSize: 2000,
  showIndices: true,
  startNumber: 1,
};

const App: React.FC = () => {
  const [settings, setSettings] = useState<CollageSettings>(INITIAL_SETTINGS);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: UploadedImage[] = Array.from(e.target.files).map((file) => ({
        id: generateId(),
        url: URL.createObjectURL(file as File),
        file: file as File,
      }));
      setImages((prev) => [...prev, ...newImages]);
      
      // Reset input value to allow re-uploading same file if needed
      e.target.value = '';
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all images?')) {
      setImages([]);
    }
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    setImages((prev) => {
      const newImages = [...prev];
      // Remove from old position
      const [movedImage] = newImages.splice(fromIndex, 1);
      // Insert at new position
      newImages.splice(toIndex, 0, movedImage);
      return newImages;
    });
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      // Give UI a moment to update loading state
      setTimeout(async () => {
        const dataUrl = await generateCollageImage(images, settings);
        
        const link = document.createElement('a');
        link.download = `grid-collage-${Date.now()}.jpg`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setIsGenerating(false);
      }, 100);
    } catch (error) {
      console.error('Failed to generate collage', error);
      alert('Failed to generate image. Please try again.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0f172a] text-slate-100">
      <Sidebar
        settings={settings}
        setSettings={setSettings}
        onUpload={handleUpload}
        onDownload={handleDownload}
        onClear={handleClearAll}
        isGenerating={isGenerating}
        imageCount={images.length}
      />
      <PreviewArea
        settings={settings}
        images={images}
        onRemoveImage={handleRemoveImage}
        onAddMore={handleUpload}
        onReorder={handleReorder}
      />
    </div>
  );
};

export default App;
