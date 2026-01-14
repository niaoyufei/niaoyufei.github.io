

import React, { useState } from 'react';
import { CollageSettings, UploadedImage } from '../types';
import { Image as ImageIcon, Plus, ZoomIn, ZoomOut, Maximize, RotateCcw } from 'lucide-react';

interface PreviewAreaProps {
  settings: CollageSettings;
  images: UploadedImage[];
  onRemoveImage: (id: string) => void;
  onAddMore: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({
  settings,
  images,
  onRemoveImage,
  onAddMore,
  onReorder,
}) => {
  const { rows, cols, gap, backgroundColor, aspectRatio, showIndices, startNumber } = settings;
  const totalSlots = rows * cols;
  const slots = Array.from({ length: totalSlots }, (_, i) => i);

  // Zoom State
  const [scale, setScale] = useState(1);

  // Drag & Drop State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.1, 3));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.1, 0.2));
  const handleResetZoom = () => setScale(1);

  // DnD Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    // Set effect to move
    e.dataTransfer.effectAllowed = 'move';
    // Optional: set a custom drag image if needed, but default is usually fine
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // Necessary to allow dropping
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    // Determine target index logic:
    // If dropping on an empty slot far away, map it to the end of the current list
    let targetIndex = dropIndex;
    if (targetIndex >= images.length) {
      targetIndex = images.length - 1; 
      // If we are moving to the end, ensure we don't go out of bounds of existing items
      if (targetIndex < 0) targetIndex = 0;
    }

    onReorder(draggedIndex, targetIndex);
    setDraggedIndex(null);
  };

  return (
    <div className="flex-1 h-full bg-[#0a0f1c] relative overflow-hidden flex flex-col">
      
      {/* Zoom Toolbar */}
      <div className="absolute top-6 right-6 z-20 flex flex-col gap-2 bg-slate-800/90 backdrop-blur border border-slate-700 p-2 rounded-lg shadow-xl">
        <button onClick={handleZoomIn} className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition" title="Zoom In">
          <ZoomIn className="w-5 h-5" />
        </button>
        <button onClick={handleResetZoom} className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition" title="Reset Zoom">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button onClick={handleZoomOut} className="p-2 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition" title="Zoom Out">
          <ZoomOut className="w-5 h-5" />
        </button>
        <div className="text-[10px] text-center text-slate-500 font-mono pt-1 border-t border-slate-700/50">
          {Math.round(scale * 100)}%
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 overflow-auto p-4 md:p-10 flex items-start justify-center">
        {/* Canvas Wrapper - Scalable */}
        <div 
          className="relative transition-all duration-200 ease-out origin-top shadow-2xl"
          style={{
             width: `${Math.min(100 * scale, 300)}%`, // Basic scaling logic for responsive container
             maxWidth: `${800 * scale}px`, // Base width * scale
             minWidth: '300px', // Prevent getting too small
          }}
        >
          <div
            className="grid transition-all duration-300 ease-in-out"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gap: `${gap * scale}px`, // Scale gap visually too? Or keep absolute? Usually scaling gap looks more natural for "Zoom".
              backgroundColor: backgroundColor,
              padding: `${(gap > 0 ? gap : 0) * scale}px`,
              border: gap > 0 ? `${gap * scale}px solid ${backgroundColor}` : 'none'
            }}
          >
            {slots.map((index) => {
              const image = images[index];
              const isDragging = draggedIndex === index;
              const isDragOver = dragOverIndex === index;
              
              return (
                <div
                  key={index}
                  draggable={!!image}
                  onDragStart={(e) => image && handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`relative overflow-hidden group bg-slate-800 transition-all
                    ${isDragging ? 'opacity-40 grayscale scale-95' : 'opacity-100'}
                    ${isDragOver ? 'ring-4 ring-blue-500 z-10 scale-105 shadow-xl' : ''}
                    ${image ? 'cursor-move' : ''}
                  `}
                  style={{
                    aspectRatio: `${aspectRatio}`,
                    backgroundColor: !image ? backgroundColor : undefined
                  }}
                >
                  {image ? (
                    <>
                      <img
                        src={image.url}
                        alt={`Slot ${index}`}
                        className="w-full h-full object-cover pointer-events-none" // prevent img drag interfering with div drag
                      />
                      
                      {/* Hover Actions */}
                      <div className={`absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center ${isDragging ? 'hidden' : ''}`}>
                         <button 
                          onClick={() => onRemoveImage(image.id)}
                          className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full transform scale-90 group-hover:scale-100 transition shadow-lg"
                          title="Remove image"
                         >
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                         </button>
                      </div>
                      
                      {showIndices && (
                        <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 rounded pointer-events-none backdrop-blur-sm">
                          #{index + startNumber}
                        </div>
                      )}
                    </>
                  ) : (
                    // Empty Slot State
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                      {index === images.length ? (
                         <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-white/5 transition group/add">
                            <div className="bg-slate-700/50 p-3 rounded-full mb-1 group-hover/add:bg-blue-600/20 group-hover/add:text-blue-400 transition">
                               <Plus className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-medium opacity-50 group-hover/add:opacity-100 group-hover/add:text-blue-300">Add Image</span>
                            <input type="file" className="hidden" accept="image/*" multiple onChange={onAddMore} />
                         </label>
                      ) : (
                        <ImageIcon className="w-8 h-8 opacity-10" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Helper Info Footer */}
      <div className="p-4 bg-[#0f172a] border-t border-slate-800 text-center z-10">
        <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
          <Maximize className="w-3 h-3" />
          <span>Drag images to reorder. Use zoom controls to inspect details.</span>
        </p>
      </div>
    </div>
  );
};
