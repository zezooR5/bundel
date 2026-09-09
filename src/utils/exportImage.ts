import { toPng, toJpeg, toBlob } from 'html-to-image';
import confetti from 'canvas-confetti';

export interface ExportOptions {
  format: 'png' | 'jpeg';
  quality?: number;
  pixelRatio?: number;
  filename?: string;
}
export async function exportBundleImage(
  element: HTMLElement,
  options: ExportOptions = { format: 'png', quality: 0.95, pixelRatio: 2 }
): Promise<string> {
  const pixelRatio = options.pixelRatio || 2;
  const quality = options.quality ?? 0.95;

  const baseConfig = {
    quality,
    pixelRatio,
    cacheBust: false,
    skipFonts: true,
    style: {
      transform: 'none',
      margin: '0'
    }
  };

  try {
    let dataUrl = '';
    
    // Attempt export with primary config, with automatic fallback if browser memory/CORS limits hit
    try {
      if (options.format === 'jpeg') {
        dataUrl = await toJpeg(element, baseConfig);
      } else {
        dataUrl = await toPng(element, baseConfig);
      }
    } catch (primaryErr) {
      console.warn('Export with pixelRatio 2 failed, falling back to 1.5x/1x:', primaryErr);
      const fallbackConfig = { ...baseConfig, pixelRatio: Math.min(pixelRatio, 1.5) };
      if (options.format === 'jpeg') {
        dataUrl = await toJpeg(element, fallbackConfig);
      } else {
        dataUrl = await toPng(element, fallbackConfig);
      }
    }

    if (!dataUrl) {
      throw new Error('Generated empty image data');
    }

    // Trigger download
    const link = document.createElement('a');
    const ext = options.format === 'jpeg' ? 'jpg' : 'png';
    const filename = options.filename || `bundle-promo-${Date.now()}.${ext}`;
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Fire subtle celebration
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#0284c7', '#f59e0b']
    });

    return dataUrl;
  } catch (error) {
    console.error('Failed to export bundle image:', error);
    throw error;
  }
}

export async function copyBundleToClipboard(element: HTMLElement, pixelRatio = 2): Promise<boolean> {
  const baseConfig = {
    pixelRatio,
    cacheBust: false,
    skipFonts: true,
    style: {
      transform: 'none',
      margin: '0'
    }
  };

  try {
    let blob: Blob | null = null;
    try {
      blob = await toBlob(element, baseConfig);
    } catch (primaryErr) {
      console.warn('Copy to clipboard primary attempt failed, retrying with fallback:', primaryErr);
      blob = await toBlob(element, { ...baseConfig, pixelRatio: 1.5 });
    }

    if (!blob) throw new Error('Could not create image blob');

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#10b981', '#38bdf8']
    });

    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

