import React from 'react';
import type { Bundle, BundleCalculations } from '../../types/bundle';
import { formatNumber } from '../../utils/calculations';
import { assetUrl } from '../../utils/assets';
import { ShieldCheck, Phone, MapPin, Sparkles } from 'lucide-react';

interface TemplateProps {
  bundle: Bundle;
  calc: BundleCalculations;
}

export const TemplateCleanWhite: React.FC<TemplateProps> = ({ bundle, calc }) => {
  const isPortrait = bundle.aspectRatio === '4:5';
  const isStory = bundle.aspectRatio === '9:16';
  const isThree = bundle.products.length === 3;

  return (
    <div 
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden bg-white text-slate-900 select-none border-[16px] border-[#00b06f] ${
        isStory ? 'p-12' : isPortrait ? 'p-10' : 'p-8'
      }`}
      style={{
        background: 'linear-gradient(145deg, #ffffff 0%, #f9fbf9 50%, #f0fdf4 100%)'
      }}
    >
      {/* Subtle Inner Accent Border */}
      <div className="absolute inset-2 border-2 border-emerald-500/20 rounded-xl pointer-events-none z-20" />

      {/* Background Soft Geometry */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#10b981 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/80 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-100/70 rounded-full blur-3xl pointer-events-none" />

      {/* ELBADRY TRADE WATERMARK IN BACKGROUND */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <img 
          src={assetUrl('assets/logos/elbadry-trade-transparent.png')} 
          alt="" 
          className="w-[880px] max-w-none h-auto object-contain opacity-[0.09] filter select-none transform rotate-[-12deg]"
        />
      </div>

      {/* TOP HEADER: Prominent Logos & Green Highlights */}
      <div className="relative z-10 flex items-center justify-between gap-6 pb-3.5 border-b-2 border-emerald-500/30">
        {/* Prominent Logos Showcase */}
        <div className="flex items-center gap-6">
          {/* Al Badry Trade Logo */}
          <div className="flex items-center h-24 filter drop-shadow-sm">
            <img 
              src={assetUrl('assets/logos/elbadry-trade-transparent.png')} 
              alt="Al Badry Trade" 
              className="h-24 w-auto object-contain"
            />
          </div>

          <div className="h-14 w-[2px] bg-emerald-500/40" />

          {/* UGREEN Logo */}
          <div className="flex items-center h-24 filter drop-shadow-sm">
            <img 
              src={assetUrl('assets/logos/ugreen-transparent.png')} 
              alt="UGREEN" 
              className="h-20 w-auto object-contain"
            />
          </div>
        </div>

        {/* Offer Tag & Bundle Badge */}
        <div className="flex flex-col items-end">
          <div className="inline-flex items-center gap-2 bg-[#00b06f] text-white font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-emerald-500/30">
            <Sparkles className="w-4 h-4" />
            <span>{bundle.badgeText || 'SPECIAL BUNDLE OFFER'}</span>
          </div>
          <span className="text-[#00b06f] text-base font-black tracking-widest mt-1.5 uppercase font-mono">
            {bundle.name || `BUNDLE #${bundle.bundleNumber}`}
          </span>
        </div>
      </div>

      {/* Main Title & ENLARGED Subtitle Banner */}
      <div className="relative z-10 my-2 text-center">
        <h1 className="text-3xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight">
          {bundle.title || 'EXCLUSIVE WHOLESALE BUNDLE'}
        </h1>
        {bundle.subtitle && (
          <p className="text-base lg:text-xl font-black text-emerald-800 mt-1 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
            {bundle.subtitle}
          </p>
        )}
      </div>

      {/* PRODUCTS GRID - WITH ENLARGED QUANTITY BADGES */}
      <div 
        className={`relative z-10 flex-1 grid ${
          isThree ? 'grid-cols-3' : 'grid-cols-2'
        } gap-4 my-2 content-center`}
      >
        {bundle.products.map((product, index) => {
          const prodCalc = calc.productCalculations.find(p => p.id === product.id);

          if (isThree) {
            // 3-Product Vertical Card with ENLARGED QUANTITY BADGE
            return (
              <div 
                key={product.id || index}
                className="relative bg-white/95 border-2 border-emerald-500/30 hover:border-[#00b06f] rounded-2xl p-4 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all group overflow-hidden"
              >
                {/* ENLARGED QUANTITY BADGE */}
                <div className="absolute top-3 right-3 bg-[#00b06f] text-white font-black text-sm px-4 py-1.5 rounded-full shadow-lg shadow-emerald-600/30 border border-white/50 z-10 flex items-center gap-1.5">
                  <span className="text-xs opacity-90">الكمية:</span>
                  <span className="text-base font-black leading-none">{product.quantity}</span>
                  <span className="text-[11px] font-bold">قطع</span>
                </div>

                {/* Balanced Product Image */}
                <div className="h-32 w-full bg-gradient-to-b from-slate-50 to-emerald-50/30 rounded-2xl p-2.5 border border-slate-200/80 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300 my-1">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="max-h-28 max-w-full object-contain filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.12)]"
                  />
                </div>

                {/* Product Info */}
                <div className="mt-2 text-center">
                  {product.sku && (
                    <span className="text-[11px] font-mono text-[#00b06f] font-extrabold uppercase tracking-wider block">
                      SKU: {product.sku}
                    </span>
                  )}
                  <h3 className="text-base font-black text-slate-900 leading-snug line-clamp-2 mt-1 min-h-[2.8rem]">
                    {product.name}
                  </h3>

                  {/* Pricing Info: Prominent Original vs Bundle Price */}
                  <div className="mt-2.5 flex flex-col items-center">
                    {product.originalUnitPrice > product.bundleUnitPrice && (
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-500 line-through decoration-rose-500/80 decoration-2">
                        <span className="text-[11px] font-semibold text-slate-400 no-underline">بدلاً من:</span>
                        <span>{formatNumber(product.originalUnitPrice)} {bundle.currency}</span>
                      </div>
                    )}
                    <div className="flex items-baseline justify-center gap-1.5 mt-0.5">
                      <span className="text-xl lg:text-2xl font-black text-[#00b06f]">
                        {formatNumber(product.bundleUnitPrice)}
                      </span>
                      <span className="text-xs font-black text-emerald-950">{bundle.currency}</span>
                      <span className="text-[10px] font-extrabold text-[#00b06f] bg-emerald-50 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                        للقطعة
                      </span>
                    </div>
                  </div>

                  {/* Subtotal */}
                  {prodCalc && (
                    <div className="text-xs font-bold text-slate-700 mt-2 bg-emerald-50/90 border border-emerald-500/30 py-1.5 px-3 rounded-xl flex items-center justify-between">
                      <span className="text-slate-500">إجمالي {product.quantity} قطع:</span>
                      <span className="text-sm font-black text-slate-950">{formatNumber(prodCalc.bundleTotal)} {bundle.currency}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          // 2 or 4 products Horizontal Card
          return (
            <div 
              key={product.id || index}
              className="relative bg-white/95 border-2 border-emerald-500/30 hover:border-[#00b06f] rounded-2xl p-4 flex items-center gap-4 shadow-lg hover:shadow-xl transition-all group overflow-hidden"
            >
              {/* ENLARGED QUANTITY BADGE */}
              <div className="absolute top-3 right-3 bg-[#00b06f] text-white font-black text-sm px-4 py-1.5 rounded-full shadow-lg shadow-emerald-600/30 border border-white/50 z-10 flex items-center gap-1.5">
                <span className="text-xs opacity-90">الكمية:</span>
                <span className="text-base font-black leading-none">{product.quantity}</span>
                <span className="text-[11px] font-bold">قطع</span>
              </div>

              <div className="w-28 h-28 flex-shrink-0 bg-gradient-to-b from-slate-50 to-emerald-50/40 rounded-2xl p-2.5 border border-slate-200/80 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]"
                />
              </div>

              <div className="flex-1 min-w-0 pr-16">
                {product.sku && (
                  <span className="text-[11px] font-mono text-[#00b06f] font-extrabold uppercase tracking-wider block">
                    SKU: {product.sku}
                  </span>
                )}
                <h3 className="text-base font-black text-slate-900 leading-snug line-clamp-2 mt-1">
                  {product.name}
                </h3>

                <div className="mt-2 flex flex-col items-start gap-0.5">
                  {product.originalUnitPrice > product.bundleUnitPrice && (
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-500 line-through decoration-rose-500/80 decoration-2">
                      <span className="text-[11px] font-semibold text-slate-400 no-underline">بدلاً من:</span>
                      <span>{formatNumber(product.originalUnitPrice)} {bundle.currency}</span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-[#00b06f]">
                      {formatNumber(product.bundleUnitPrice)}
                    </span>
                    <span className="text-xs font-black text-emerald-950">{bundle.currency}</span>
                    <span className="text-[10px] font-extrabold text-[#00b06f] bg-emerald-50 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                      للقطعة
                    </span>
                  </div>
                </div>

                {prodCalc && (
                  <div className="text-xs font-bold text-slate-700 mt-2 bg-emerald-50/90 border border-emerald-500/30 py-1.5 px-3 rounded-xl flex items-center justify-between">
                    <span className="text-slate-500">إجمالي {product.quantity} قطع:</span>
                    <span className="text-sm font-black text-slate-950">{formatNumber(prodCalc.bundleTotal)} {bundle.currency}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* PRICING HERO: BOLD GREEN HIGHLIGHT BAR */}
      <div className="relative z-10 mt-3 p-5 rounded-2xl bg-white border-2 border-[#00b06f] shadow-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Left: Original Price & Savings */}
        <div className="flex items-center gap-6">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Original Price / السعر الأصلي
            </span>
            <div className="text-xl font-bold text-slate-400 line-through mt-0.5">
              {formatNumber(calc.totalOriginalPrice)} {bundle.currency}
            </div>
          </div>

          <div className="h-10 w-[2px] bg-slate-200" />

          <div>
            <span className="text-xs font-black text-[#00b06f] uppercase tracking-wider block">
              You Save / إجمالي التوفير
            </span>
            <div className="text-xl font-black text-[#00b06f] mt-0.5 flex items-center gap-2">
              <span>{formatNumber(calc.totalSavings)} {bundle.currency}</span>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-black">
                {calc.discountPercentage}% OFF
              </span>
            </div>
          </div>
        </div>

        {/* Right: Big Prominent Bundle Price */}
        <div className="bg-[#00b06f] text-white px-7 py-3 rounded-xl shadow-xl shadow-emerald-600/30 flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100 block">
              SPECIAL BUNDLE PRICE
            </span>
            <span className="text-3xl lg:text-4xl font-black tracking-tight leading-none text-white">
              {formatNumber(calc.finalBundlePrice)}
            </span>
          </div>
          <div className="border-l-2 border-white/30 pl-3">
            <span className="text-base font-black block leading-tight">{bundle.currency}</span>
            <span className="text-[10px] font-extrabold block text-emerald-100">شامل العرض</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 mt-3 pt-3 border-t-2 border-emerald-500/20 flex items-center justify-between text-xs text-slate-700">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-[#00b06f]" />
            <span>Al Badry Trade • Authorized UGREEN Distributor</span>
          </span>
          <span className="text-slate-500 font-semibold">
            {bundle.expirationDate || 'Special Offer • Limited Stock'}
          </span>
        </div>

        <div className="flex items-center gap-4 font-black text-slate-900">
          {bundle.contactInfo?.whatsapp && (
            <span className="flex items-center gap-1 text-[#00b06f]">
              <Phone className="w-3.5 h-3.5" />
              <span>{bundle.contactInfo.whatsapp}</span>
            </span>
          )}
          {bundle.contactInfo?.location && (
            <span className="flex items-center gap-1 text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{bundle.contactInfo.location}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
