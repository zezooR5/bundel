import React, { useState, useEffect } from 'react';
import { Bundle } from './types/bundle';
import { DEFAULT_BUNDLE } from './data/defaultBundle';
import { Header } from './components/Header';
import { BundleForm } from './components/BundleForm';
import { CanvasPreview } from './components/CanvasPreview';
import { SavedBundlesModal } from './components/SavedBundlesModal';
import { assetUrl } from './utils/assets';

const STORAGE_KEY = 'albadry_ugreen_bundles_v3';
const ACTIVE_ID_KEY = 'albadry_ugreen_active_id_v3';
const LANG_KEY = 'albadry_bundle_lang';

export function App() {
  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    return (localStorage.getItem(LANG_KEY) as 'ar' | 'en') || 'ar';
  });

  const [savedBundles, setSavedBundles] = useState<Bundle[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading saved bundles:', e);
    }
    return [DEFAULT_BUNDLE];
  });

  const [bundle, setBundle] = useState<Bundle>(() => {
    try {
      const activeId = localStorage.getItem(ACTIVE_ID_KEY);
      if (activeId) {
        const found = savedBundles.find(b => b.id === activeId);
        if (found) return found;
      }
    } catch (e) {}
    return savedBundles[0] || DEFAULT_BUNDLE;
  });

  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBundles));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [savedBundles]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_ID_KEY, bundle.id);
    } catch (e) {}
  }, [bundle.id]);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
  }, [lang]);

  // Handlers
  const handleToggleLang = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const handleNewBundle = () => {
    const newBundle: Bundle = {
      id: `bundle-${Date.now()}`,
      name: `BUNDLE NO ${savedBundles.length + 1}`,
      bundleNumber: String(savedBundles.length + 1).padStart(2, '0'),
      title: 'SPECIAL PROMO BUNDLE',
      subtitle: 'Exclusive Wholesale Offer | Limited Quantities Available',
      badgeText: 'SPECIAL OFFER',
      currency: 'EGP',
      products: [
        {
          id: `prod-1`,
          name: 'UGREEN Fast GaN Charger 65W',
          sku: 'UG-CD244',
          quantity: 5,
          originalUnitPrice: 850,
          bundleUnitPrice: 620,
          imageUrl: assetUrl('assets/products/charger.svg'),
          imageFit: 'contain'
        },
        {
          id: `prod-2`,
          name: 'UGREEN USB-C Fast Charging Cable 1M',
          sku: 'UG-US176',
          quantity: 10,
          originalUnitPrice: 220,
          bundleUnitPrice: 160,
          imageUrl: assetUrl('assets/products/cable.svg'),
          imageFit: 'contain'
        }
      ],
      manualBundlePrice: null,
      expirationDate: 'Limited Time Offer',
      contactInfo: {
        phone: '+20 100 000 0000',
        whatsapp: '+20 100 000 0000',
        location: 'Cairo, Egypt',
        salesRep: 'Al Badry B2B Sales Department',
        extraText: 'Official Authorized Distributor'
      },
      template: 'darkTech',
      aspectRatio: '1:1',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSavedBundles(prev => [newBundle, ...prev]);
    setBundle(newBundle);
  };

  const handleResetExample = () => {
    setBundle(DEFAULT_BUNDLE);
    // Also ensure DEFAULT_BUNDLE is in saved list
    setSavedBundles(prev => {
      const exists = prev.some(b => b.id === DEFAULT_BUNDLE.id);
      if (!exists) return [DEFAULT_BUNDLE, ...prev];
      return prev.map(b => b.id === DEFAULT_BUNDLE.id ? DEFAULT_BUNDLE : b);
    });
  };

  const handleSaveCurrentBundle = () => {
    setSavedBundles(prev => {
      const exists = prev.some(b => b.id === bundle.id);
      if (exists) {
        return prev.map(b => b.id === bundle.id ? { ...bundle, updatedAt: new Date().toISOString() } : b);
      }
      return [{ ...bundle, updatedAt: new Date().toISOString() }, ...prev];
    });
    alert(lang === 'ar' ? 'تم حفظ الباقة بنجاح!' : 'Bundle saved successfully!');
  };

  const handleDuplicateBundle = (target: Bundle) => {
    const copy: Bundle = {
      ...target,
      id: `bundle-${Date.now()}`,
      name: `${target.name} (Copy)`,
      bundleNumber: `${target.bundleNumber}B`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSavedBundles(prev => [copy, ...prev]);
    setBundle(copy);
  };

  const handleDeleteBundle = (id: string) => {
    if (savedBundles.length <= 1) {
      alert(lang === 'ar' ? 'لا يمكن حذف الباقة الوحيدة المتبقية' : 'Cannot delete the only bundle');
      return;
    }
    const remaining = savedBundles.filter(b => b.id !== id);
    setSavedBundles(remaining);
    if (bundle.id === id) {
      setBundle(remaining[0]);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Top Sticky Header */}
      <Header
        onNewBundle={handleNewBundle}
        onResetExample={handleResetExample}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onQuickExport={() => {
          // Triggers preview primary download
          const btn = document.querySelector('#promotional-bundle-canvas')
            ?.closest('.relative')
            ?.parentElement
            ?.querySelector('button[title*="PNG"], button:has(svg.lucide-download)') as HTMLButtonElement | null;
          if (btn) btn.click();
        }}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main App Workspace: Split Screen */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Side (or Right side in RTL): Editor Controls Form */}
        <div className="w-full lg:w-[460px] xl:w-[500px] flex-shrink-0 h-[45vh] lg:h-full overflow-hidden border-b lg:border-b-0 border-slate-800 z-10">
          <BundleForm
            bundle={bundle}
            onChange={(updated) => {
              setBundle(updated);
              // Also update in saved list if it matches
              setSavedBundles(prev => prev.map(b => b.id === updated.id ? updated : b));
            }}
            lang={lang}
          />
        </div>

        {/* Right Side: Live Visual Canvas & Export Toolbar */}
        <div className="flex-1 h-[55vh] lg:h-full overflow-hidden">
          <CanvasPreview
            bundle={bundle}
            lang={lang}
          />
        </div>
      </main>

      {/* Saved Bundles Modal */}
      <SavedBundlesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedBundles={savedBundles}
        activeBundleId={bundle.id}
        onSelectBundle={(selected) => setBundle(selected)}
        onDuplicateBundle={handleDuplicateBundle}
        onDeleteBundle={handleDeleteBundle}
        onSaveCurrentBundle={handleSaveCurrentBundle}
        lang={lang}
      />
    </div>
  );
}

export default App;
