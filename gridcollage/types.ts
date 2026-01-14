

export interface CollageSettings {
  rows: number;
  cols: number;
  gap: number; // in pixels
  backgroundColor: string;
  aspectRatio: number; // width / height of a SINGLE cell
  exportMode: 'width' | 'height';
  exportSize: number; // Target size in pixels for the chosen dimension
  showIndices: boolean;
  startNumber: number;
}

export interface UploadedImage {
  id: string;
  url: string;
  file: File;
}

export type AspectRatioOption = {
  label: string;
  value: number;
};
