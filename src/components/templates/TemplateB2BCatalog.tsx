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

  return (
    <div 
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden bg-slate-900 text-slate-100 select-none ${
        isStory ? 'p-12' : isPortrait ? 'p-10' : 'p-8'
      }`}
      style={{
        background: 'linear-gradient(180deg, #0b1120 0%, #0f172a 50%, #020617 100%)'
      }}
    >
      {/* ELBADRY TRADE WATERMARK BACKGROUND (علامة مائية ناعمة في الخلفية) */}
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

      {/* Products Structured Cards - Enlarged Product Visuals! */}
      <div className="relative z-10 flex-1 grid grid-cols-2 gap-4 my-2 content-center">
        {bundle.products.map((product, index) => {
          const prodCalc = calc.productCalculations.find(p => p.id === product.id);
          return (
            <div 
              key={product.id || index}
              className="relative bg-slate-800/90 border border-slate-700 rounded-xl p-4 flex items-center gap-4 shadow-lg hover:border-emerald-500/50 transition-colors group"
            >
              {/* Product Image - ENLARGED */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 bg-slate-900 rounded-xl p-2.5 border border-slate-700/60 flex items-center justify-center">
                <img 
                  src={product.imageUrl || '/assets/products/earbuds.svg'} 
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                    {product.sku || `ITEM #${index + 1}`}
                  </span>
                  <span className="bg-slate-700 text-white font-extrabold text-xs px-2.5 py-0.5 rounded">
                    x{product.quantity} PCS
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-tight line-clamp-2 mt-1">
                  {product.name}
                </h3>

                {/* Pricing Table / Breakdown */}
                <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Unit Wholesale:</span>
                    <span className="font-black text-emerald-400 text-sm">
                      {formatNumber(product.bundleUnitPrice)} {bundle.currency}
                    </span>
                  </div>

                  {prodCalc && (
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase">Subtotal ({product.quantity}x):</span>
                      <span className="font-bold text-white text-sm">
                        {formatNumber(prodCalc.bundleTotal)} {bundle.currency}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Summary Bar */}
      <div className="relative z-10 mt-3 p-4 rounded-xl bg-slate-800/90 border-2 border-emerald-500/50 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Breakdown Left */}
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
              TOTAL LIST PRICE
            </span>
            <span className="text-lg font-bold text-slate-400 line-through">
              {formatNumber(calc.totalOriginalPrice)} {bundle.currency}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-700" />

          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider block">
              TOTAL B2B SAVINGS
            </span>
            <span className="text-lg font-extrabold text-emerald-400 flex items-center gap-1.5">
              <span>{formatNumber(calc.totalSavings)} {bundle.currency}</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded font-black">
                -{calc.discountPercentage}%
              </span>
            </span>
          </div>
        </div>

        {/* Big Bundle Price Right */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 px-7 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 block">
              WHOLESALE BUNDLE PRICE
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
