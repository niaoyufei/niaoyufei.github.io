
import { CollageSettings, UploadedImage } from '../types';

/**
 * Loads an image from a URL into an HTMLImageElement
 */
const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = url;
  });
};

/**
 * Generates the final collage image as a Data URL
 */
export const generateCollageImage = async (
  images: UploadedImage[],
  settings: CollageSettings
): Promise<string> => {
  const { rows, cols, gap, backgroundColor, aspectRatio, exportMode, exportSize } = settings;

  // 1. Calculate Dimensions based on Export Mode
  let canvasWidth: number;
  let canvasHeight: number;
  let cellWidth: number;
  let cellHeight: number;

  const totalGapWidth = (cols - 1) * gap;
  const totalGapHeight = (rows - 1) * gap;

  if (exportMode === 'width') {
    // Fixed Width Mode
    canvasWidth = exportSize;
    // (cellWidth * cols) + totalGapWidth = canvasWidth
    // cellWidth = (canvasWidth - totalGapWidth) / cols
    cellWidth = (canvasWidth - totalGapWidth) / cols;
    // aspect = w / h => h = w / aspect
    cellHeight = cellWidth / aspectRatio;
    canvasHeight = (cellHeight * rows) + totalGapHeight;
  } else {
    // Fixed Height Mode
    canvasHeight = exportSize;
    // (cellHeight * rows) + totalGapHeight = canvasHeight
    // cellHeight = (canvasHeight - totalGapHeight) / rows
    cellHeight = (canvasHeight - totalGapHeight) / rows;
    // aspect = w / h => w = h * aspect
    cellWidth = cellHeight * aspectRatio;
    canvasWidth = (cellWidth * cols) + totalGapWidth;
  }
  
  // Ensure valid dimensions (prevent negatives if gap is too large for size)
  if (cellWidth < 1) cellWidth = 1;
  if (cellHeight < 1) cellHeight = 1;
  canvasWidth = Math.max(canvasWidth, 1);
  canvasHeight = Math.max(canvasHeight, 1);

  // 2. Setup Canvas
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // 3. Fill Background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 4. Draw Images
  // Pre-load all images
  const loadedImages = await Promise.all(
    images.map(async (imgItem) => {
      try {
        return await loadImage(imgItem.url);
      } catch (e) {
        console.error(`Failed to load image ${imgItem.id}`, e);
        return null;
      }
    })
  );

  const totalSlots = rows * cols;

  for (let i = 0; i < totalSlots; i++) {
    const rowIndex = Math.floor(i / cols);
    const colIndex = i % cols;

    // Calculate position
    const x = colIndex * (cellWidth + gap);
    const y = rowIndex * (cellHeight + gap);

    // If we have an image for this slot, draw it
    // If not, we just leave the background color (which we already filled)
    if (i < loadedImages.length) {
      const img = loadedImages[i];
      if (img) {
        // Draw with "object-fit: cover" logic
        drawCover(ctx, img, x, y, cellWidth, cellHeight);
      }
    }
  }

  return canvas.toDataURL('image/jpeg', 0.95);
};

/**
 * Helper to simulate object-fit: cover on canvas
 */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgRatio = img.width / img.height;
  const targetRatio = w / h;

  let sx, sy, sw, sh;

  if (imgRatio > targetRatio) {
    // Image is wider than target: crop width
    sh = img.height;
    sw = img.height * targetRatio;
    sy = 0;
    sx = (img.width - sw) / 2;
  } else {
    // Image is taller than target: crop height
    sw = img.width;
    sh = img.width / targetRatio;
    sx = 0;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}
