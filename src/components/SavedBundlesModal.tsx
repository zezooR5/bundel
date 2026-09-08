import React, { useState } from 'react';
import { Bundle } from '../types/bundle';
import { calculateBundle, formatNumber } from '../utils/calculations';
import { 
  X, 
  FolderArchive, 
  Copy, 
  Trash2, 
  CheckCircle, 
  Calendar, 
  Tag, 
  Search, 
  PlusCircle, 
  ArrowRight 
} from 'lucide-react';

interface SavedBundlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedBundles: Bundle[];
  activeBundleId: string;
  onSelectBundle: (bundle: Bundle) => void;
  onDuplicateBundle: (bundle: Bundle) => void;
  onDeleteBundle: (id: string) => void;
  onSaveCurrentBundle: () => void;
  lang: 'ar' | 'en';
}

export const SavedBundlesModal: React.FC<SavedBundlesModalProps> = ({
  isOpen,
  onClose,
  savedBundles,
  activeBundleId,
  onSelectBundle,
  onDuplicateBundle,
  onDeleteBundle,
  onSaveCurrentBundle,
  lang
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isAr = lang === 'ar';

  if (!isOpen) return null;

  const filtered = savedBundles.filter((b) => {
    const query = searchQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(query) ||
      b.bundleNumber.toLowerCase().includes(query) ||
      b.title.toLowerCase().includes(query)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-400">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isAr ? 'إدارة الباقات المحفوظة' : 'Saved Bundles Dashboard'}
              </h2>
              <p className="text-xs text-slate-400">
                {isAr ? 'تصفح، عدّل، انسخ، أو احفظ باقات العروض الخاصة بك' : 'Browse, edit, duplicate, or export your saved promotion bundles'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSaveCurrentBundle}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isAr ? 'حفظ الباقة الحالية' : 'Save Current'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث عن باقة بالاسم أو الرقم...' : 'Search bundles by name or number...'}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Bundles List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FolderArchive className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">{isAr ? 'لا توجد باقات مطابقة' : 'No bundles found'}</p>
              <p className="text-xs text-slate-500 mt-1">
                {isAr ? 'احفظ الباقة الحالية لتظهر في هذه القائمة' : 'Save your current bundle to see it here'}
              </p>
            </div>
          ) : (
            filtered.map((b) => {
              const calc = calculateBundle(b);
              const isActive = b.id === activeBundleId;

              return (
                <div
                  key={b.id}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    isActive
                      ? 'border-emerald-500 bg-slate-800/90 ring-1 ring-emerald-500/40'
                      : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Left: Bundle Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                        #{b.bundleNumber || '01'}
                      </span>
                      <h3 className="text-sm font-bold text-white truncate">
                        {b.name}
                      </h3>
                      {isActive && (
                        <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                          {isAr ? 'الحالية' : 'Active'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-slate-500" />
                        <span>{b.products.length} {isAr ? 'منتجات' : 'products'}</span>
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{new Date(b.updatedAt || b.createdAt).toLocaleDateString()}</span>
                      </span>

                      <span className="font-bold text-emerald-400">
                        {formatNumber(calc.finalBundlePrice)} {b.currency}
                      </span>

                      {calc.totalSavings > 0 && (
                        <span className="text-amber-400 text-[11px]">
                          ({calc.discountPercentage}% OFF)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-1.5">
                    {/* Select / Edit Button */}
                    <button
                      onClick={() => {
                        onSelectBundle(b);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                    >
                      <span>{isAr ? 'فتح وتعديل' : 'Open'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Duplicate */}
                    <button
                      onClick={() => onDuplicateBundle(b)}
                      className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                      title={isAr ? 'تكرار / نسخ الباقة' : 'Duplicate'}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (confirm(isAr ? `هل أنت متأكد من حذف ${b.name}؟` : `Delete ${b.name}?`)) {
                          onDeleteBundle(b.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title={isAr ? 'حذف' : 'Delete'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>
            {savedBundles.length} {isAr ? 'باقات محفوظة في المتصفح' : 'bundles stored in local browser'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
