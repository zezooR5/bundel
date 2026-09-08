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

  const config = {
    quality,
    pixelRatio,
    cacheBust: true,
    style: {
      transform: 'none',
      margin: '0'
    }
  };

  try {
    let dataUrl = '';
    if (options.format === 'jpeg') {
      dataUrl = await toJpeg(element, config);
    } else {
      dataUrl = await toPng(element, config);
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
  try {
    const blob = await toBlob(element, {
      pixelRatio,
      cacheBust: true,
      style: {
        transform: 'none',
        margin: '0'
      }
    });

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
