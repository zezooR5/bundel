import React from 'react';
import type { Bundle, BundleCalculations } from '../../types/bundle';
import { formatNumber } from '../../utils/calculations';
import { assetUrl } from '../../utils/assets';
import { ShieldCheck, Zap, Phone, MapPin, Sparkles } from 'lucide-react';

interface TemplateProps {
  bundle: Bundle;
  calc: BundleCalculations;
}

export const TemplateDarkTech: React.FC<TemplateProps> = ({ bundle, calc }) => {
  const isPortrait = bundle.aspectRatio === '4:5';
  const isStory = bundle.aspectRatio === '9:16';
  const isThree = bundle.products.length === 3;

  return (
    <div 
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden bg-slate-950 text-slate-100 select-none ${
        isStory ? 'p-12' : isPortrait ? 'p-10' : 'p-8'
      }`}
      style={{
        background: 'radial-gradient(circle at 80% 15%, #064e3b 0%, #022c22 30%, #090d16 65%, #020617 100%)'
      }}
    >
      {/* Background Cyber Grid & Glow */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.3) 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px'
        }}
      />
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* ELBADRY TRADE WATERMARK IN THE BACKGROUND */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <img 
          src={assetUrl('assets/logos/elbadry-trade-transparent.png')} 
          alt="" 
          className="w-[780px] h-auto object-contain opacity-[0.06] filter drop-shadow-2xl select-none transform rotate-[-12deg] scale-110"
        />
      </div>

      {/* Top Header: Brand Logos & Badge */}
      <div className="relative z-10 flex items-center justify-between gap-6 pb-4 border-b border-emerald-500/25">
        <div className="flex items-center gap-6">
          <div className="flex items-center h-20 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <img 
              src={assetUrl('assets/logos/elbadry-trade-transparent.png')} 
              alt="Al Badry Trade" 
              className="h-20 w-auto object-contain"
            />
          </div>

          <div className="h-12 w-px bg-slate-700/70" />

          <div className="flex items-center h-20 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <img 
              src={assetUrl('assets/logos/ugreen-white-text-transparent.png')} 
              alt="UGREEN" 
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black px-4 py-2 rounded-full text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/25">
            <Sparkles className="w-4 h-4" />
            <span>{bundle.badgeText || 'SPECIAL BUNDLE'}</span>
          </div>
          <span className="text-emerald-400 text-base font-black tracking-widest mt-1.5 uppercase drop-shadow font-mono">
            {bundle.name || `BUNDLE #${bundle.bundleNumber}`}
          </span>
        </div>
      </div>

      {/* Main Title & Subtitle Banner */}
      <div className="relative z-10 my-2 text-center">
        <h1 className="text-3xl lg:text-[42px] font-black tracking-tight text-white drop-shadow-lg leading-tight">
          {bundle.title || 'EXCLUSIVE WHOLESALE BUNDLE'}
        </h1>
        {bundle.subtitle && (
          <p className="text-base lg:text-xl font-black text-emerald-300 mt-1 max-w-3xl mx-auto drop-shadow leading-relaxed">
            {bundle.subtitle}
          </p>
        )}
      </div>

      {/* Products Grid - ENLARGED & CLOSE-UP */}
      <div 
        className={`relative z-10 flex-1 grid ${
          isThree ? 'grid-cols-3' : 'grid-cols-2'
        } gap-4 my-2 content-center`}
      >
        {bundle.products.map((product, index) => {
          if (isThree) {
            return (
              <div 
                key={product.id || index}
                className="relative bg-slate-900/90 border-2 border-emerald-500/40 rounded-2xl p-4 flex flex-col justify-between backdrop-blur-md shadow-2xl hover:border-emerald-400 transition-all overflow-hidden group"
              >
                {/* Quantity Badge */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-sm px-3.5 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 border border-white/40 z-10 flex items-center gap-1.5">
                  <span className="text-xs font-bold opacity-90">الكمية:</span>
                  <span className="text-base font-black leading-none">{product.quantity}</span>
                  <span className="text-[11px] font-bold">قطع</span>
                </div>

                {/* Significantly Enlarged Product Image Container */}
                <div className="relative h-48 sm:h-52 w-full bg-gradient-to-b from-slate-800/95 to-slate-950/95 rounded-2xl p-3 border border-slate-700/70 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300 my-1 overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl pointer-events-none" />
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="max-h-44 max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] relative z-10"
                  />
                </div>

                {/* Product Details & Clear Unit Price */}
                <div className="mt-2 text-center">
                  {product.sku && (
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold block">
                      SKU: {product.sku}
                    </span>
                  )}
                  <h3 className="text-sm lg:text-base font-black text-white leading-snug line-clamp-2 mt-1 min-h-[2.6rem]">
                    {product.name}
                  </h3>

                  {/* Clear strikethrough & unit offer price */}
                  <div className="mt-2.5 flex flex-col items-center gap-1.5">
                    {product.originalUnitPrice > product.bundleUnitPrice && (
                      <div className="flex items-center flex-wrap justify-center gap-1.5 bg-rose-950/60 border-2 border-rose-500/50 px-3 py-1 rounded-xl shadow-md">
                        <span className="text-xs font-black text-rose-400">بدلاً من:</span>
                        <span className="text-sm sm:text-base font-black text-slate-200 line-through decoration-rose-500 decoration-2">
                          {formatNumber(product.originalUnitPrice)} {bundle.currency}
                        </span>
                        <span className="text-[11px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-md shadow-sm">
                          وفر {formatNumber(product.originalUnitPrice - product.bundleUnitPrice)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline justify-center gap-1.5 mt-0.5">
                      <span className="text-2xl lg:text-3xl font-black text-emerald-400">
                        {formatNumber(product.bundleUnitPrice)}
                      </span>
                      <span className="text-xs font-bold text-emerald-300">{bundle.currency}</span>
                      <span className="text-[11px] font-bold bg-emerald-500/25 text-emerald-300 px-2 py-0.5 rounded">
                        للقطعة
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div 
              key={product.id || index}
              className="relative bg-slate-900/90 border-2 border-emerald-500/40 rounded-2xl p-4 flex items-center gap-5 backdrop-blur-md shadow-2xl hover:border-emerald-400 transition-all overflow-hidden group"
            >
              <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-sm px-4 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5">
                <span className="text-xs font-bold opacity-90">الكمية:</span>
                <span className="text-base font-black leading-none">{product.quantity}</span>
                <span className="text-[11px] font-bold">قطع</span>
              </div>

              {/* Significantly Enlarged Product Image */}
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex-shrink-0 bg-gradient-to-b from-slate-800/95 to-slate-950/95 rounded-2xl p-3 border border-slate-700/70 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl pointer-events-none" />
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] relative z-10"
                />
              </div>

              <div className="flex-1 min-w-0 pr-12">
                {product.sku && (
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold block">
                    SKU: {product.sku}
                  </span>
                )}
                <h3 className="text-base lg:text-lg font-black text-white leading-snug line-clamp-2 mt-1">
                  {product.name}
                </h3>

                {/* Clear strikethrough & unit offer price */}
                <div className="mt-3 flex flex-col items-start gap-1.5">
                  {product.originalUnitPrice > product.bundleUnitPrice && (
                    <div className="inline-flex items-center gap-2 bg-rose-950/60 border-2 border-rose-500/50 px-3 py-1 rounded-xl shadow-md">
                      <span className="text-xs font-black text-rose-400">بدلاً من:</span>
                      <span className="text-sm sm:text-base font-black text-slate-200 line-through decoration-rose-500 decoration-2">
                        {formatNumber(product.originalUnitPrice)} {bundle.currency}
                      </span>
                      <span className="text-[11px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-md shadow-sm">
                        وفر {formatNumber(product.originalUnitPrice - product.bundleUnitPrice)} {bundle.currency}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl lg:text-3xl font-black text-emerald-400">
                      {formatNumber(product.bundleUnitPrice)}
                    </span>
                    <span className="text-xs font-bold text-emerald-300">{bundle.currency}</span>
                    <span className="text-[11px] font-bold bg-emerald-500/25 text-emerald-300 px-2 py-0.5 rounded">
                      للقطعة
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Hero Banner - HIGH CONTRAST & ULTRA CLEAR */}
      <div className="relative z-10 mt-3 p-5 rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 border-2 border-emerald-500/50 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          {/* Total Original Price */}
          <div className="bg-slate-950/70 border border-slate-700/80 px-4 py-2.5 rounded-xl">
            <span className="text-xs font-bold text-slate-300 block mb-0.5">
              السعر الأصلي الإجمالي
            </span>
            <div className="text-xl font-bold text-rose-400 line-through decoration-rose-500 decoration-2">
              {formatNumber(calc.totalOriginalPrice)} {bundle.currency}
            </div>
          </div>

          <div className="h-12 w-px bg-slate-700/80" />

          {/* Total Savings & Percentage */}
          <div className="bg-emerald-950/60 border border-emerald-500/50 px-4 py-2.5 rounded-xl">
            <span className="text-xs font-black text-emerald-300 block mb-0.5">
              إجمالي التوفير في العرض
            </span>
            <div className="text-xl font-black text-emerald-400 flex items-center gap-2">
              <span>{formatNumber(calc.totalSavings)} {bundle.currency}</span>
              <span className="bg-emerald-400 text-slate-950 text-xs px-2.5 py-0.5 rounded-md font-black shadow">
                وفر {calc.discountPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Big Bundle Price */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-8 py-3.5 rounded-xl shadow-xl shadow-emerald-500/30 flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] font-black uppercase tracking-widest block text-slate-900">
              سعر الباقة الخاص
            </span>
            <span className="text-3xl lg:text-4xl font-black tracking-tight leading-none text-slate-950">
              {formatNumber(calc.finalBundlePrice)}
            </span>
          </div>
          <div className="border-l-2 border-slate-900/30 pl-3">
            <span className="text-base font-black block leading-tight">{bundle.currency}</span>
            <span className="text-[10px] font-extrabold block opacity-90">شامل العرض</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Al Badry Trade • Authorized UGREEN Distributor</span>
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{bundle.expirationDate || 'Special Offer • Limited Stock'}</span>
          </span>
        </div>

        <div className="flex items-center gap-4 font-bold text-white">
          {bundle.contactInfo?.whatsapp && (
            <span className="flex items-center gap-1 text-emerald-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{bundle.contactInfo.whatsapp}</span>
            </span>
          )}
          {bundle.contactInfo?.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{bundle.contactInfo.location}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
