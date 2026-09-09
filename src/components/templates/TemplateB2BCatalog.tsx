import React from 'react';
import type { Bundle, BundleCalculations } from '../../types/bundle';
import { formatNumber } from '../../utils/calculations';
import { Building2, Phone, MapPin, Briefcase } from 'lucide-react';

interface TemplateProps {
  bundle: Bundle;
  calc: BundleCalculations;
}

export const TemplateB2BCatalog: React.FC<TemplateProps> = ({ bundle, calc }) => {
  const isPortrait = bundle.aspectRatio === '4:5';
  const isStory = bundle.aspectRatio === '9:16';

  const isThree = bundle.products.length === 3;

  return (
    <div 
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden bg-slate-900 text-slate-100 select-none ${
        isStory ? 'p-12' : isPortrait ? 'p-10' : 'p-8'
      }`}
      style={{
        background: 'linear-gradient(180deg, #0b1120 0%, #0f172a 50%, #020617 100%)'
      }}
    >
      {/* ELBADRY TRADE WATERMARK BACKGROUND */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <img 
          src="/assets/logos/elbadry-trade-transparent.png" 
          alt="" 
          className="w-[820px] h-auto object-contain opacity-[0.06] filter drop-shadow-2xl select-none transform rotate-[-10deg] scale-110"
        />
      </div>

      {/* Top Header: B2B Brand Identity Bar - Transparent & Large Logos! */}
      <div className="relative z-10 flex items-center justify-between gap-6 pb-4 border-b-2 border-emerald-500/40">
        <div className="flex items-center gap-6">
          <div className="flex items-center h-20 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <img 
              src="/assets/logos/elbadry-trade-transparent.png" 
              alt="Al Badry Trade" 
              className="h-20 w-auto object-contain"
            />
          </div>

          <div className="h-12 w-px bg-slate-700" />

          <div className="flex items-center h-20 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <img 
              src="/assets/logos/ugreen-white-text-transparent.png" 
              alt="UGREEN" 
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>

        {/* B2B Status Tag */}
        <div className="text-right">
          <div className="inline-flex items-center gap-1.5 bg-slate-800 border border-emerald-500/40 text-emerald-400 font-bold px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider shadow">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>B2B WHOLESALE PROMOTION</span>
          </div>
          <div className="text-base font-mono font-bold text-white mt-1.5">
            {bundle.name || `BUNDLE #${bundle.bundleNumber}`}
          </div>
        </div>
      </div>

      {/* Title & Offer Description */}
      <div className="relative z-10 my-3 flex items-center justify-between gap-4 bg-slate-800/70 p-4 rounded-xl border border-slate-700/60 backdrop-blur-sm">
        <div>
          <h1 className="text-2xl lg:text-[34px] font-black text-white tracking-tight leading-tight">
            {bundle.title || 'EXCLUSIVE WHOLESALE BUNDLE'}
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 mt-1">
            {bundle.subtitle || 'Special Distributor Pricing for Electronics Retailers & Tech Shops'}
          </p>
        </div>

        <div className="flex-shrink-0 text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">
            CATEGORY
          </span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded">
            Accessories & Power
          </span>
        </div>
      </div>

      {/* Products Structured Cards - ENLARGED & CLOSE-UP */}
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
                className="relative bg-slate-800/90 border border-slate-700 rounded-xl p-4 flex flex-col justify-between shadow-lg hover:border-emerald-500/50 transition-colors group overflow-hidden"
              >
                {/* Quantity */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                    {product.sku || `ITEM #${index + 1}`}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black text-xs px-3 py-1 rounded-full">
                    الكمية: {product.quantity} قطع
                  </span>
                </div>

                {/* Significantly Enlarged Product Image */}
                <div className="relative h-48 sm:h-52 w-full bg-slate-900 rounded-xl p-3 border border-slate-700/60 flex items-center justify-center my-2 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/5 rounded-xl blur-lg pointer-events-none" />
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="max-h-44 max-w-full object-contain filter drop-shadow-md relative z-10"
                  />
                </div>

                <h3 className="text-sm lg:text-base font-bold text-white leading-tight line-clamp-2 mt-1 min-h-[2.5rem]">
                  {product.name}
                </h3>

                {/* Clear Pricing Breakdown */}
                <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex flex-col items-center gap-1.5">
                  {product.originalUnitPrice > product.bundleUnitPrice && (
                    <div className="flex items-center flex-wrap justify-center gap-1.5 bg-rose-950/60 border border-rose-500/40 px-3 py-1 rounded-lg">
                      <span className="text-xs font-black text-rose-400">بدلاً من:</span>
                      <span className="text-sm sm:text-base font-black text-slate-200 line-through decoration-rose-500 decoration-2">
                        {formatNumber(product.originalUnitPrice)} {bundle.currency}
                      </span>
                      <span className="text-[11px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-md shadow-sm">
                        وفر {formatNumber(product.originalUnitPrice - product.bundleUnitPrice)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-black text-emerald-400">
                      {formatNumber(product.bundleUnitPrice)}
                    </span>
                    <span className="text-xs font-bold text-slate-300">{bundle.currency}</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                      للقطعة
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div 
              key={product.id || index}
              className="relative bg-slate-800/90 border border-slate-700 rounded-xl p-4 flex items-center gap-5 shadow-lg hover:border-emerald-500/50 transition-colors group overflow-hidden"
            >
              {/* Significantly Enlarged Product Image */}
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex-shrink-0 bg-slate-900 rounded-xl p-3 border border-slate-700/60 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/5 rounded-xl blur-lg pointer-events-none" />
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-md relative z-10"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                    {product.sku || `ITEM #${index + 1}`}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black text-xs px-3 py-1 rounded-full">
                    الكمية: {product.quantity} قطع
                  </span>
                </div>

                <h3 className="text-base lg:text-lg font-bold text-white leading-tight line-clamp-2 mt-2">
                  {product.name}
                </h3>

                {/* Clear Pricing Breakdown */}
                <div className="mt-3 pt-2 border-t border-slate-700/60 flex flex-col items-start gap-1.5">
                  {product.originalUnitPrice > product.bundleUnitPrice && (
                    <div className="inline-flex items-center gap-2 bg-rose-950/60 border border-rose-500/40 px-3 py-1 rounded-lg">
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
                    <span className="text-xs font-bold text-slate-300">{bundle.currency}</span>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                      للقطعة
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Summary Bar */}
      <div className="relative z-10 mt-3 p-5 rounded-xl bg-slate-800/90 border-2 border-emerald-500/50 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Breakdown Left */}
        <div className="flex items-center gap-5">
          <div className="bg-slate-900/80 border border-slate-700 px-4 py-2.5 rounded-xl">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block mb-0.5">
              السعر الأصلي الإجمالي
            </span>
            <span className="text-xl font-bold text-rose-400 line-through decoration-rose-500 decoration-2">
              {formatNumber(calc.totalOriginalPrice)} {bundle.currency}
            </span>
          </div>

          <div className="h-12 w-px bg-slate-700" />

          <div className="bg-emerald-950/50 border border-emerald-500/40 px-4 py-2.5 rounded-xl">
            <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider block mb-0.5">
              إجمالي التوفير بالجملة
            </span>
            <span className="text-xl font-black text-emerald-400 flex items-center gap-2">
              <span>{formatNumber(calc.totalSavings)} {bundle.currency}</span>
              <span className="bg-emerald-500 text-slate-950 text-xs px-2.5 py-0.5 rounded font-black">
                -{calc.discountPercentage}%
              </span>
            </span>
          </div>
        </div>

        {/* Big Bundle Price Right */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 px-8 py-3.5 rounded-lg shadow-lg flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 block">
              سعر العرض الإجمالي
            </span>
            <span className="text-3xl lg:text-4xl font-black tracking-tight leading-none text-slate-950">
              {formatNumber(calc.finalBundlePrice)}
            </span>
          </div>
          <div className="border-l-2 border-slate-900/30 pl-3">
            <span className="text-base font-black block leading-tight">{bundle.currency}</span>
            <span className="text-[10px] font-bold block opacity-90">Net Total</span>
          </div>
        </div>
      </div>

      {/* B2B Footer */}
      <div className="relative z-10 mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Al Badry Trade • Commercial Sales & Distribution</span>
          </span>
          <span className="text-slate-400">{bundle.expirationDate || 'Special Offer • Quantities are subject to prior sale'}</span>
        </div>

        <div className="flex items-center gap-4 font-bold text-white">
          {bundle.contactInfo?.whatsapp && (
            <span className="flex items-center gap-1 text-emerald-400">
              <Phone className="w-3.5 h-3.5" />
              <span>{bundle.contactInfo.whatsapp}</span>
            </span>
          )}
          {bundle.contactInfo?.location && (
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{bundle.contactInfo.location}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
