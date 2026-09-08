import React, { useRef, useState, useEffect } from 'react';
import { Bundle } from '../types/bundle';
import { TemplateRenderer, ASPECT_RATIO_DIMENSIONS } from './templates/TemplateRenderer';
import { exportBundleImage, copyBundleToClipboard } from '../utils/exportImage';
import { 
  Download, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Sparkles, 
  Eye, 
  FileImage, 
  Loader2 
} from 'lucide-react';

interface CanvasPreviewProps {
  bundle: Bundle;
  lang: 'ar' | 'en';
}

export const CanvasPreview: React.FC<CanvasPreviewProps> = ({ bundle, lang }) => {
  const isAr = lang === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState<number>(0.5);
  const [autoFit, setAutoFit] = useState<boolean>(true);
  const [pixelRatio, setPixelRatio] = useState<number>(2); // Default to 2x for ultra crisp images!
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const dims = ASPECT_RATIO_DIMENSIONS[bundle.aspectRatio || '1:1'];

  // Calculate auto-fit scale
  useEffect(() => {
    if (!autoFit || !containerRef.current) return;

    const updateScale = () => {
      if (!containerRef.current) return;
      const padding = 48; // padding around preview
      const availWidth = containerRef.current.clientWidth - padding;
      const availHeight = containerRef.current.clientHeight - padding;

      const scaleW = availWidth / dims.width;
      const scaleH = availHeight / dims.height;

      const newScale = Math.min(scaleW, scaleH, 0.95);
      setScale(Math.max(0.2, Math.min(newScale, 1.2)));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [dims.width, dims.height, autoFit, bundle.aspectRatio]);

  const handleDownload = async (format: 'png' | 'jpeg') => {
    if (!canvasRef.current || isExporting) return;
    try {
      setIsExporting(true);
      const safeName = (bundle.name || 'bundle')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
      const filename = `${safeName}-${bundle.aspectRatio.replace(':', 'x')}-${Date.now()}.${format === 'jpeg' ? 'jpg' : 'png'}`;

      await exportBundleImage(canvasRef.current, {
        format,
        quality: 0.95,
        pixelRatio,
        filename
      });
    } catch (err) {
      alert('Error exporting image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = async () => {
    if (!canvasRef.current || isExporting) return;
    try {
      setIsExporting(true);
      const success = await copyBundleToClipboard(canvasRef.current, pixelRatio);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        alert('Could not copy image directly to clipboard. You can download it instead.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 relative">
      {/* Top Bar: Preview Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 gap-2 flex-wrap">
        {/* Left: Size info */}
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-white">
            {isAr ? 'معاينة مباشرة فورية' : 'Live Canvas Preview'}
          </span>
          <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700 font-mono">
            {dims.width} × {dims.height} px ({bundle.aspectRatio})
          </span>
        </div>

        {/* Center: Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
          <button
            type="button"
            onClick={() => {
              setAutoFit(false);
              setScale((s) => Math.max(0.2, s - 0.08));
            }}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] font-mono font-bold text-slate-300 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            type="button"
            onClick={() => {
              setAutoFit(false);
              setScale((s) => Math.min(1.2, s + 0.08));
            }}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setAutoFit(true)}
            className={`px-2 py-0.5 text-[11px] rounded font-medium transition-colors ${
              autoFit ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            title="Auto Fit"
          >
            Fit
          </button>
        </div>

        {/* Right: Quality Resolution & Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Pixel Ratio / Clarity Selector */}
          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-slate-400 hidden lg:inline">{isAr ? 'الدقة:' : 'DPI:'}</span>
            <select
              value={pixelRatio}
              onChange={(e) => setPixelRatio(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-emerald-400 font-bold focus:outline-none"
              title="دقة وضوح الصورة المصدرة"
            >
              <option value={1}>1x (1080px)</option>
              <option value={2}>2x Ultra HD (2160px) ✨</option>
              <option value={3}>3x Print Super (3240px)</option>
            </select>
          </div>

          {/* Copy to Clipboard */}
          <button
            type="button"
            onClick={handleCopy}
            disabled={isExporting}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title="نسخ الصورة للحافظة للصقها مباشرة في واتساب"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
            <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ لواتساب' : 'Copy')}</span>
          </button>

          {/* Download JPG */}
          <button
            type="button"
            onClick={() => handleDownload('jpeg')}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <FileImage className="w-3.5 h-3.5 text-amber-400" />
            <span>JPG</span>
          </button>

          {/* Download PNG Primary */}
          <button
            type="button"
            onClick={() => handleDownload('png')}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{isAr ? 'تحميل PNG' : 'Download PNG'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport Area */}
      <div 
        ref={containerRef} 
        className="flex-1 overflow-auto flex items-center justify-center p-6 bg-slate-950 tech-grid relative"
      >
        {/* Scaled Preview Wrapper */}
        <div
          style={{
            width: `${dims.width * scale}px`,
            height: `${dims.height * scale}px`,
            transition: 'width 0.15s ease-out, height 0.15s ease-out'
          }}
          className="relative flex items-center justify-center shadow-2xl rounded-2xl overflow-hidden ring-1 ring-slate-800"
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: `${dims.width}px`,
              height: `${dims.height}px`,
            }}
            className="absolute top-0 left-0"
          >
            <TemplateRenderer bundle={bundle} canvasRef={canvasRef} />
          </div>
        </div>
      </div>

      {/* Helper Footer Bar */}
      <div className="bg-slate-900/90 border-t border-slate-800 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {isAr 
              ? 'يتم التصدير بأعلى نقاء وجودة كريستالية بدون أي تشويش لتناسب واتساب والسوشيال ميديا' 
              : 'Exported at ultra-sharp DPI for WhatsApp & High-End Social Media'}
          </span>
        </div>
        <div className="font-mono text-slate-500">
          Target: {dims.width * pixelRatio} × {dims.height * pixelRatio} px
        </div>
      </div>
    </div>
  );
};
