

import React from 'react';
import { Settings, Grid, Layers, Maximize, Palette, Download, Upload, Trash2, X, Smartphone, Monitor, Square, FileImage, Hash } from 'lucide-react';
import { CollageSettings, AspectRatioOption } from '../types';

interface SidebarProps {
  settings: CollageSettings;
  setSettings: React.Dispatch<React.SetStateAction<CollageSettings>>;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
  onClear: () => void;
  isGenerating: boolean;
  imageCount: number;
}

const RATIO_OPTIONS: AspectRatioOption[] = [
  { label: '1:1 (Square)', value: 1 },
  { label: '4:3 (Landscape)', value: 4 / 3 },
  { label: '3:4 (Portrait)', value: 3 / 4 },
  { label: '16:9 (Widescreen)', value: 16 / 9 },
  { label: '9:16 (Story)', value: 9 / 16 },
];

const GRID_PRESETS = [
  { label: 'Custom', rows: 0, cols: 0 }, // Placeholder for manual
  { type: 'Mobile', label: 'Mobile (4x3)', rows: 4, cols: 3, icon: Smartphone },
  { type: 'Mobile', label: 'Mobile Long (5x3)', rows: 5, cols: 3, icon: Smartphone },
  { type: 'Mobile', label: 'Story (6x3)', rows: 6, cols: 3, icon: Smartphone },
  { type: 'Desktop', label: 'Desktop (3x4)', rows: 3, cols: 4, icon: Monitor },
  { type: 'Desktop', label: 'Desktop Wide (3x5)', rows: 3, cols: 5, icon: Monitor },
  { type: 'Desktop', label: 'Desktop Ultrawide (3x6)', rows: 3, cols: 6, icon: Monitor },
  { type: 'Square', label: 'Square (3x3)', rows: 3, cols: 3, icon: Square },
  { type: 'Square', label: 'Square (4x4)', rows: 4, cols: 4, icon: Square },
  { type: 'Square', label: 'Square (5x5)', rows: 5, cols: 5, icon: Square },
];

export const Sidebar: React.FC<SidebarProps> = ({
  settings,
  setSettings,
  onUpload,
  onDownload,
  onClear,
  isGenerating,
  imageCount,
}) => {
  const handleChange = (key: keyof CollageSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') return;
    
    const [r, c] = value.split('x').map(Number);
    setSettings(prev => ({ ...prev, rows: r, cols: c }));
  };

  // Determine current preset value or 'custom'
  const currentPresetValue = GRID_PRESETS.find(
    p => p.rows === settings.rows && p.cols === settings.cols
  ) 
    ? `${settings.rows}x${settings.cols}` 
    : 'custom';

  return (
    <div className="w-full md:w-80 flex-shrink-0 bg-slate-900 border-r border-slate-800 h-full overflow-y-auto flex flex-col shadow-xl z-20">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
          <Grid className="w-6 h-6 text-blue-400" />
          GridCollage
        </h1>
        <p className="text-slate-400 text-xs mt-1">拼接你的美好瞬间</p>
      </div>

      <div className="p-6 space-y-8 flex-1">
        {/* Actions */}
        <div className="space-y-3">
          <label className="flex flex-col gap-2 w-full">
            <span className="sr-only">Upload images</span>
            <div className="flex items-center justify-center w-full h-12 px-4 transition bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer group">
              <Upload className="w-5 h-5 text-white mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-white">Select Photos</span>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={onUpload}
            />
          </label>

          {imageCount > 0 && (
             <button
             onClick={onClear}
             className="flex items-center justify-center w-full h-10 px-4 transition bg-slate-800 border border-slate-700 rounded-lg hover:bg-red-900/30 hover:border-red-800 hover:text-red-400 text-slate-400 text-sm"
           >
             <Trash2 className="w-4 h-4 mr-2" />
             Clear All ({imageCount})
           </button>
          )}
        </div>

        {/* Grid Dimensions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-300 font-medium pb-2 border-b border-slate-800">
            <Layers className="w-4 h-4" />
            <h3>Grid Layout</h3>
          </div>
          
          {/* Layout Presets Dropdown */}
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Quick Layout / Recommended</label>
            <div className="relative">
              <select
                value={currentPresetValue}
                onChange={handlePresetChange}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none cursor-pointer"
              >
                <option value="custom">Custom (Manual)</option>
                <optgroup label="📱 Mobile (Portrait)">
                  {GRID_PRESETS.filter(p => p.type === 'Mobile').map(p => (
                    <option key={p.label} value={`${p.rows}x${p.cols}`}>
                      {p.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="💻 Desktop (Landscape)">
                  {GRID_PRESETS.filter(p => p.type === 'Desktop').map(p => (
                    <option key={p.label} value={`${p.rows}x${p.cols}`}>
                      {p.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🟧 Square">
                   {GRID_PRESETS.filter(p => p.type === 'Square').map(p => (
                    <option key={p.label} value={`${p.rows}x${p.cols}`}>
                      {p.label}
                    </option>
                  ))}
                </optgroup>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Rows</label>
              <input
                type="number"
                min="1"
                max="50"
                value={settings.rows}
                onChange={(e) => handleChange('rows', Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Columns</label>
              <input
                type="number"
                min="1"
                max="50"
                value={settings.cols}
                onChange={(e) => handleChange('cols', Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>
          <div className="text-xs text-slate-500 text-center">
            Total Slots: <span className="text-blue-400 font-mono">{settings.rows * settings.cols}</span>
          </div>
        </div>

        {/* Cell Appearance */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-300 font-medium pb-2 border-b border-slate-800">
            <Maximize className="w-4 h-4" />
            <h3>Cell Style</h3>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Aspect Ratio</label>
            <div className="grid grid-cols-2 gap-2">
              {RATIO_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleChange('aspectRatio', opt.value)}
                  className={`text-xs py-2 px-2 rounded border transition ${
                    Math.abs(settings.aspectRatio - opt.value) < 0.01
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1.5 flex justify-between">
              <span>Gap (px)</span>
              <span>{settings.gap}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.gap}
              onChange={(e) => handleChange('gap', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* Numbering Overlay */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-slate-300 font-medium pb-2 border-b border-slate-800">
            <Hash className="w-4 h-4" />
            <h3>Numbering</h3>
          </div>
          
          <div className="flex items-center justify-between">
             <label className="text-xs text-slate-400">Show Order Overlay</label>
             <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.showIndices} 
                onChange={(e) => handleChange('showIndices', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {settings.showIndices && (
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Start Number</label>
              <input
                type="number"
                value={settings.startNumber}
                onChange={(e) => handleChange('startNumber', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition font-mono"
              />
            </div>
          )}
        </div>

        {/* Export Settings */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-slate-300 font-medium pb-2 border-b border-slate-800">
            <FileImage className="w-4 h-4" />
            <h3>Export Settings</h3>
          </div>
          
          <div className="space-y-3">
             <div className="flex bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => handleChange('exportMode', 'width')}
                  className={`flex-1 text-xs font-medium py-1.5 rounded-md transition ${settings.exportMode === 'width' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  Limit Width
                </button>
                <button
                  onClick={() => handleChange('exportMode', 'height')}
                   className={`flex-1 text-xs font-medium py-1.5 rounded-md transition ${settings.exportMode === 'height' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  Limit Height
                </button>
             </div>

             <div>
                <label className="text-xs text-slate-400 block mb-1.5">
                  {settings.exportMode === 'width' ? 'Max Width (px)' : 'Max Height (px)'}
                </label>
                <div className="flex items-center gap-2">
                   <input
                    type="number"
                    min="100"
                    max="10000"
                    value={settings.exportSize}
                    onChange={(e) => handleChange('exportSize', Math.min(10000, Math.max(100, parseInt(e.target.value) || 1000)))}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none transition font-mono"
                  />
                  <span className="text-xs text-slate-500 font-mono">px</span>
                </div>
             </div>
          </div>
        </div>

        {/* Background */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-slate-300 font-medium pb-2 border-b border-slate-800">
            <Palette className="w-4 h-4" />
            <h3>Background</h3>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Fill Color</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent p-0"
              />
              <span className="text-xs font-mono text-slate-500 uppercase">{settings.backgroundColor}</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Used when you have fewer images than slots.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-800 bg-slate-900">
        <button
          onClick={onDownload}
          disabled={isGenerating || imageCount === 0}
          className={`w-full flex items-center justify-center h-12 rounded-lg font-bold text-white transition shadow-lg ${
            isGenerating || imageCount === 0
              ? 'bg-slate-700 cursor-not-allowed opacity-50'
              : 'bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-500/20'
          }`}
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Collage
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
