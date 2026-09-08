import React, { useState } from 'react';
import { Bundle, Product, TemplateId, AspectRatio } from '../types/bundle';
import { calculateBundle, formatNumber } from '../utils/calculations';
import { SAMPLE_PRODUCTS } from '../data/defaultBundle';
import { 
  Info, 
  Package, 
  Calculator, 
  Palette, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Upload, 
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';

interface BundleFormProps {
  bundle: Bundle;
  onChange: (updated: Bundle) => void;
  lang: 'ar' | 'en';
}

export const BundleForm: React.FC<BundleFormProps> = ({ bundle, onChange, lang }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'products' | 'pricing' | 'design'>('products');
  const isAr = lang === 'ar';
  const calc = calculateBundle(bundle);

  // Helper to update top-level fields
  const updateField = <K extends keyof Bundle>(field: K, value: Bundle[K]) => {
    onChange({ ...bundle, [field]: value, updatedAt: new Date().toISOString() });
  };

  // Helper to update contact info
  const updateContact = (key: keyof Bundle['contactInfo'], val: string) => {
    onChange({
      ...bundle,
      contactInfo: { ...bundle.contactInfo, [key]: val },
      updatedAt: new Date().toISOString()
    });
  };

  // Product actions
  const updateProduct = (index: number, updatedFields: Partial<Product>) => {
    const updatedProducts = [...bundle.products];
    updatedProducts[index] = { ...updatedProducts[index], ...updatedFields };
    onChange({ ...bundle, products: updatedProducts, updatedAt: new Date().toISOString() });
  };

  const addProduct = (customProduct?: Partial<Product>) => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: customProduct?.name || 'New UGREEN Electronics Product',
      sku: customProduct?.sku || 'UG-SKU-00',
      quantity: customProduct?.quantity || 1,
      originalUnitPrice: customProduct?.originalUnitPrice || 500,
      bundleUnitPrice: customProduct?.bundleUnitPrice || 380,
      imageUrl: customProduct?.imageUrl || '/assets/products/charger.svg',
      imageFit: 'contain'
    };
    onChange({ ...bundle, products: [...bundle.products, newProd], updatedAt: new Date().toISOString() });
  };

  const removeProduct = (index: number) => {
    if (bundle.products.length <= 1) {
      alert(isAr ? 'يجب أن تحتوي الباقة على منتج واحد على الأقل' : 'A bundle must have at least one product');
      return;
    }
    const updated = bundle.products.filter((_, i) => i !== index);
    onChange({ ...bundle, products: updated, updatedAt: new Date().toISOString() });
  };

  const moveProduct = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= bundle.products.length) return;
    const updated = [...bundle.products];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange({ ...bundle, products: updated, updatedAt: new Date().toISOString() });
  };

  // Handle local file upload
  const handleImageUpload = (index: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, SVG, WebP)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        updateProduct(index, { imageUrl: result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-100">
      {/* Tabs Bar */}
      <div className="grid grid-cols-4 border-b border-slate-800 p-2 gap-1 bg-slate-950/40">
        <button
          type="button"
          onClick={() => setActiveTab('info')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'info'
              ? 'bg-emerald-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isAr ? 'بيانات الباقة' : 'Bundle Info'}</span>
          <span className="sm:hidden">{isAr ? 'البيانات' : 'Info'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('products')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'products'
              ? 'bg-emerald-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isAr ? 'المنتجات' : 'Products'}</span>
          <span className="sm:hidden">({bundle.products.length})</span>
          <span className="hidden sm:inline text-[10px] bg-slate-900/30 px-1.5 py-0.2 rounded-full">
            {bundle.products.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pricing')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'pricing'
              ? 'bg-emerald-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isAr ? 'الأسعار والخصم' : 'Pricing'}</span>
          <span className="sm:hidden">{isAr ? 'السعر' : 'Price'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('design')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === 'design'
              ? 'bg-emerald-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isAr ? 'القوالب والمقاس' : 'Design'}</span>
          <span className="sm:hidden">{isAr ? 'القالب' : 'Style'}</span>
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
        {/* TAB 1: BUNDLE INFO */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'معلومات العرض والباقة' : 'Bundle & Offer Information'}</span>
              </h2>
              <span className="text-[11px] text-slate-400">Step 1 of 4</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isAr ? 'اسم الباقة' : 'Bundle Name'}
                </label>
                <input
                  type="text"
                  value={bundle.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. BUNDLE NO 3"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isAr ? 'رقم الباقة' : 'Bundle #'}
                </label>
                <input
                  type="text"
                  value={bundle.bundleNumber}
                  onChange={(e) => updateField('bundleNumber', e.target.value)}
                  placeholder="03"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isAr ? 'شارة العرض (Badge)' : 'Offer Badge / Ribbon'}
              </label>
              <input
                type="text"
                value={bundle.badgeText || ''}
                onChange={(e) => updateField('badgeText', e.target.value)}
                placeholder="SPECIAL BUNDLE OFFER"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isAr ? 'العنوان الرئيسي للترويج' : 'Main Promotional Title'}
              </label>
              <input
                type="text"
                value={bundle.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="OFFICIAL WHOLESALE BUNDLE"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isAr ? 'الوصف الترويجي / العنوان الفرعي' : 'Subtitle / Offer Description'}
              </label>
              <textarea
                rows={2}
                value={bundle.subtitle}
                onChange={(e) => updateField('subtitle', e.target.value)}
                placeholder="Exclusive Special Offer for Electronics Retailers & Stores"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isAr ? 'العملة' : 'Currency'}
                </label>
                <select
                  value={bundle.currency}
                  onChange={(e) => updateField('currency', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-bold"
                >
                  <option value="EGP">EGP (ج.م)</option>
                  <option value="USD">USD ($)</option>
                  <option value="SAR">SAR (ر.س)</option>
                  <option value="AED">AED (د.إ)</option>
                  <option value="KWD">KWD (د.ك)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isAr ? 'مدة العرض / الصلاحية' : 'Expiry / Validity Notice'}
                </label>
                <input
                  type="text"
                  value={bundle.expirationDate || ''}
                  onChange={(e) => updateField('expirationDate', e.target.value)}
                  placeholder="Limited Quantity Offer"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {isAr ? 'بيانات التواصل والموزع' : 'Distributor Contact Information'}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {isAr ? 'رقم الواتساب' : 'WhatsApp Number'}
                  </label>
                  <input
                    type="text"
                    value={bundle.contactInfo?.whatsapp || ''}
                    onChange={(e) => updateContact('whatsapp', e.target.value)}
                    placeholder="+20 100 000 0000"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {isAr ? 'الفرع / الموقع' : 'Location / Branch'}
                  </label>
                  <input
                    type="text"
                    value={bundle.contactInfo?.location || ''}
                    onChange={(e) => updateContact('location', e.target.value)}
                    placeholder="Cairo, Egypt"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'المنتجات داخل الباقة' : 'Products in Bundle'}</span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  {isAr ? 'أضف المنتجات، حدد الكميات والأسعار، وارفع الصور الحقيقية' : 'Add products, set quantities, prices & upload real product images'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => addProduct()}
                className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs shadow-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAr ? 'إضافة منتج' : 'Add Product'}</span>
              </button>
            </div>

            {/* Quick Sample Selector */}
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAr ? 'إضافة سريعة من كتالوج UGREEN:' : 'Quick Add from Catalog:'}</span>
              </span>

              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_PRODUCTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addProduct(p)}
                    className="text-[10px] font-semibold bg-slate-700 hover:bg-slate-600 text-slate-200 px-2 py-1 rounded transition-colors"
                  >
                    + {p.name.split(' ').slice(1, 3).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards List */}
            <div className="space-y-3">
              {bundle.products.map((product, index) => {
                const prodTotalOrig = (Number(product.quantity) || 0) * (Number(product.originalUnitPrice) || 0);
                const prodTotalBundle = (Number(product.quantity) || 0) * (Number(product.bundleUnitPrice) || 0);

                return (
                  <div 
                    key={product.id || index}
                    className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-3.5 space-y-3 shadow-md transition-all hover:border-emerald-500/40"
                  >
                    {/* Top Row: Index, Name, Reorder, Delete */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="w-6 h-6 rounded-full bg-slate-700 text-emerald-400 flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => updateProduct(index, { name: e.target.value })}
                          placeholder="Product Name"
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-bold focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveProduct(index, 'up')}
                          disabled={index === 0}
                          className="p-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-slate-300"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveProduct(index, 'down')}
                          disabled={index === bundle.products.length - 1}
                          className="p-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-slate-300"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeProduct(index)}
                          className="p-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400 ml-1"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Middle Row: Image Upload & Preview + SKU & Qty */}
                    <div className="flex items-center gap-3">
                      {/* Image Preview & Upload Box */}
                      <div className="relative group w-16 h-16 rounded-lg bg-slate-950 border border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img 
                          src={product.imageUrl} 
                          alt="Product" 
                          className="w-full h-full object-contain p-1"
                        />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-[9px] text-white font-bold text-center">
                          <Upload className="w-3.5 h-3.5 mb-0.5" />
                          <span>تغيير</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(index, file);
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Details Fields */}
                      <div className="grid grid-cols-3 gap-2 flex-1">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">SKU / الكود</label>
                          <input
                            type="text"
                            value={product.sku || ''}
                            onChange={(e) => updateProduct(index, { sku: e.target.value })}
                            placeholder="SKU"
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">الكمية (Qty)</label>
                          <input
                            type="number"
                            min={1}
                            value={product.quantity}
                            onChange={(e) => updateProduct(index, { quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">سعر الوحدة الأصلي</label>
                          <input
                            type="number"
                            min={0}
                            value={product.originalUnitPrice}
                            onChange={(e) => updateProduct(index, { originalUnitPrice: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 font-semibold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Bundle Unit Price & Calculated Subtotals */}
                    <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] font-bold text-emerald-400">سعر الوحدة بالباقة:</label>
                        <input
                          type="number"
                          min={0}
                          value={product.bundleUnitPrice}
                          onChange={(e) => updateProduct(index, { bundleUnitPrice: parseFloat(e.target.value) || 0 })}
                          className="w-24 bg-slate-900 border border-emerald-500/50 rounded px-2 py-1 text-xs text-emerald-400 font-black"
                        />
                        <span className="text-[11px] text-slate-400">{bundle.currency}</span>
                      </div>

                      <div className="text-right text-[11px] text-slate-400">
                        <span>إجمالي {product.quantity} قطع: </span>
                        <span className="font-bold text-white">{formatNumber(prodTotalBundle)} {bundle.currency}</span>
                        {prodTotalOrig > prodTotalBundle && (
                          <span className="text-emerald-400 ml-1 text-[10px]">
                            (وفرت {formatNumber(prodTotalOrig - prodTotalBundle)})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PRICING & DISCOUNTS */}
        {activeTab === 'pricing' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'حسابات الأسعار والخصومات التلقائية' : 'Automatic Price & Discount Calculations'}</span>
              </h2>
              <span className="text-[11px] text-slate-400">Step 3 of 4</span>
            </div>

            {/* Calculations Dashboard Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">
                  {isAr ? 'إجمالي السعر الأصلي' : 'Original Total Price'}
                </span>
                <div className="text-xl font-bold text-slate-300 line-through">
                  {formatNumber(calc.totalOriginalPrice)} {bundle.currency}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  مجموع (الكمية × السعر الأصلي)
                </span>
              </div>

              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-emerald-500/40">
                <span className="text-xs text-emerald-400 font-bold block mb-1">
                  {isAr ? 'سعر الباقة النهائي' : 'Final Bundle Price'}
                </span>
                <div className="text-2xl font-black text-white">
                  {formatNumber(calc.finalBundlePrice)} {bundle.currency}
                </div>
                <span className="text-[10px] text-emerald-400 mt-1 block font-medium">
                  {bundle.manualBundlePrice ? 'سعر مخصص محدد يدوياً' : 'مجموع أسعار المنتجات بالباقة'}
                </span>
              </div>

              <div className="bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/30">
                <span className="text-xs text-emerald-400 font-bold block mb-1">
                  {isAr ? 'إجمالي التوفير للعميل' : 'Total Customer Savings'}
                </span>
                <div className="text-xl font-black text-emerald-400">
                  {formatNumber(calc.totalSavings)} {bundle.currency}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  الفرق بين الأصلي وسعر الباقة
                </span>
              </div>

              <div className="bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/30">
                <span className="text-xs text-amber-400 font-bold block mb-1">
                  {isAr ? 'نسبة الخصم المئوية' : 'Discount Percentage'}
                </span>
                <div className="text-2xl font-black text-amber-400">
                  {calc.discountPercentage}% OFF
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  خصم ترويجي قوي
                </span>
              </div>
            </div>

            {/* Custom Overall Bundle Price Override */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAr ? 'تخصيص السعر الإجمالي للباقة (اختياري)' : 'Bundle Fixed Price Override'}</span>
                </label>
                {bundle.manualBundlePrice && (
                  <button
                    type="button"
                    onClick={() => updateField('manualBundlePrice', null)}
                    className="text-[10px] text-slate-400 hover:text-white underline"
                  >
                    استعادة المجموع التلقائي
                  </button>
                )}
              </div>

              <p className="text-[11px] text-slate-400">
                {isAr 
                  ? 'يمكنك وضع رقم مستدير للباقة ككل (مثلاً 15,000 ج.م كما في العرض النموذجي)، أو تركه فارغاً ليحسب تلقائياً.'
                  : 'Specify an exact total bundle amount (e.g. 15,000 EGP), or leave empty to use calculated sum.'}
              </p>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={0}
                  value={bundle.manualBundlePrice ?? ''}
                  onChange={(e) => {
                    const val = e.target.value === '' ? null : parseFloat(e.target.value);
                    updateField('manualBundlePrice', val);
                  }}
                  placeholder="مثال: 15000"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
                />
                <span className="text-sm font-bold text-slate-400">{bundle.currency}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DESIGN & ASPECT RATIO */}
        {activeTab === 'design' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'اختيار القالب ومقاس الصورة' : 'Design Template & Aspect Ratio'}</span>
              </h2>
              <span className="text-[11px] text-slate-400">Step 4 of 4</span>
            </div>

            {/* Template Selector Cards */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {isAr ? '1. اختر القالب الترويجي:' : '1. Select Promotional Template:'}
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Template 1: Dark Tech */}
                <button
                  type="button"
                  onClick={() => updateField('template', 'darkTech')}
                  className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                    bundle.template === 'darkTech'
                      ? 'border-emerald-500 bg-slate-800 shadow-glow-green ring-1 ring-emerald-500'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="h-10 bg-slate-950 rounded-lg mb-2 flex items-center justify-center border border-emerald-500/30">
                    <span className="text-xs font-bold text-emerald-400">Dark Tech</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Premium Dark Tech</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">ستايل إلكترونيات داكن مع توهج نيون أخضر</p>
                </button>

                {/* Template 2: Clean White */}
                <button
                  type="button"
                  onClick={() => updateField('template', 'cleanWhite')}
                  className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                    bundle.template === 'cleanWhite'
                      ? 'border-emerald-500 bg-slate-800 shadow-glow-green ring-1 ring-emerald-500'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="h-10 bg-white rounded-lg mb-2 flex items-center justify-center border border-slate-300">
                    <span className="text-xs font-bold text-slate-900">Clean White</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Clean White UGREEN</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">تصميم أبيض ناصع هادئ وأنيق جداً</p>
                </button>

                {/* Template 3: Promo Discount */}
                <button
                  type="button"
                  onClick={() => updateField('template', 'promoDiscount')}
                  className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                    bundle.template === 'promoDiscount'
                      ? 'border-amber-500 bg-slate-800 shadow-lg ring-1 ring-amber-500'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="h-10 bg-gradient-to-r from-amber-500 to-red-500 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-xs font-black text-slate-950">MEGA DISCOUNT</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Strong Promo Offer</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">عرض خصم قوي مع شارات وشريط ملفت</p>
                </button>

                {/* Template 4: B2B Catalog */}
                <button
                  type="button"
                  onClick={() => updateField('template', 'b2bCatalog')}
                  className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                    bundle.template === 'b2bCatalog'
                      ? 'border-sky-500 bg-slate-800 shadow-glow-blue ring-1 ring-sky-500'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="h-10 bg-slate-900 rounded-lg mb-2 flex items-center justify-center border border-sky-500/40">
                    <span className="text-xs font-bold text-sky-400">B2B Wholesale</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">B2B Distributor Catalog</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">جدول تجاري رسمي لتجار التجزئة والمحلات</p>
                </button>
              </div>
            </div>

            {/* Aspect Ratio Selector */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {isAr ? '2. اختر أبعاد ومقاس الصورة للتصدير:' : '2. Select Output Aspect Ratio:'}
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => updateField('aspectRatio', '1:1')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    bundle.aspectRatio === '1:1'
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="w-8 h-8 border-2 border-current rounded mx-auto mb-1 flex items-center justify-center text-[10px]">
                    1:1
                  </div>
                  <div className="text-xs font-bold">مربع 1:1</div>
                  <div className="text-[9px] text-slate-400">1080 × 1080</div>
                  <div className="text-[9px] text-emerald-400 mt-0.5">واتساب / فيسبوك</div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField('aspectRatio', '4:5')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    bundle.aspectRatio === '4:5'
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="w-6 h-8 border-2 border-current rounded mx-auto mb-1 flex items-center justify-center text-[10px]">
                    4:5
                  </div>
                  <div className="text-xs font-bold">طولي 4:5</div>
                  <div className="text-[9px] text-slate-400">1080 × 1350</div>
                  <div className="text-[9px] text-emerald-400 mt-0.5">إنستغرام فيد</div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField('aspectRatio', '9:16')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    bundle.aspectRatio === '9:16'
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="w-5 h-9 border-2 border-current rounded mx-auto mb-1 flex items-center justify-center text-[10px]">
                    9:16
                  </div>
                  <div className="text-xs font-bold">ستوري 9:16</div>
                  <div className="text-[9px] text-slate-400">1080 × 1920</div>
                  <div className="text-[9px] text-emerald-400 mt-0.5">حالات واتساب</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
