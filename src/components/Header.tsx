import React from 'react';
import { FolderArchive, PlusCircle, RotateCcw, ImageDown } from 'lucide-react';

interface HeaderProps {
  onNewBundle: () => void;
  onResetExample: () => void;
  onOpenSavedModal: () => void;
  onQuickExport: () => void;
  lang: 'ar' | 'en';
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNewBundle,
  onResetExample,
  onOpenSavedModal,
  onQuickExport,
  lang,
  onToggleLang,
}) => {
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Left */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center h-11">
            <img 
              src="/assets/logos/elbadry-trade-transparent.png" 
              alt="Elbadry Trade" 
              className="h-10 w-auto object-contain"
            />
          </div>

          <div className="h-6 w-px bg-slate-700 hidden sm:block" />

          <div className="hidden sm:flex items-center h-11">
            <img 
              src="/assets/logos/ugreen-white-text-transparent.png" 
              alt="UGREEN" 
              className="h-8 w-auto object-contain"
            />
          </div>

          <div className="hidden md:block ml-2">
            <h1 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              <span>Al Badry Trade</span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                UGREEN Promo Creator
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              {isAr ? 'صانع صور وبنرات العروض الترويجية للباقات' : 'B2B Electronics Bundle Promo Graphics Generator'}
            </p>
          </div>
        </div>

        {/* Action Buttons Right */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="تبديل اللغة / Switch Language"
          >
            {isAr ? 'English' : 'عربي'}
          </button>

          {/* Reset Example */}
          <button
            onClick={onResetExample}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Load Reference Bundle (No. 3)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'نموذج باقة 3' : 'Sample Bundle 3'}</span>
          </button>

          {/* Saved Bundles */}
          <button
            onClick={onOpenSavedModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <FolderArchive className="w-3.5 h-3.5 text-sky-400" />
            <span>{isAr ? 'الباقات المحفوظة' : 'Saved'}</span>
          </button>

          {/* New Bundle */}
          <button
            onClick={onNewBundle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{isAr ? 'باقة جديدة' : 'New Bundle'}</span>
          </button>

          {/* Download Quick Button */}
          <button
            onClick={onQuickExport}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
          >
            <ImageDown className="w-4 h-4" />
            <span>{isAr ? 'تحميل الصورة' : 'Export Image'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
