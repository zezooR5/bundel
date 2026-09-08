import React from 'react';
import type { Bundle, BundleCalculations } from '../../types/bundle';
import { formatNumber } from '../../utils/calculations';
import { Flame, Percent, Phone, MapPin, Award } from 'lucide-react';

interface TemplateProps {
  bundle: Bundle;
  calc: BundleCalculations;
}

export const TemplatePromoDiscount: React.FC<TemplateProps> = ({ bundle, calc }) => {
  const isPortrait = bundle.aspectRatio === '4:5';
  const isStory = bundle.aspectRatio === '9:16';

  return (
    <div 
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden bg-slate-900 text-white select-none ${
        isStory ? 'p-12' : isPortrait ? 'p-10' : 'p-8'
      }`}
      style={{
        background: 'linear-gradient(145deg, #091322 0%, #0c2035 40%, #064e3b 100%)'
      }}
    >
      {/* Dynamic Background Glows */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* ELBADRY TRADE WATERMARK BACKGROUND (علامة مائية ناعمة في الخلفية) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <img 
          src="/assets/logos/elbadry-trade-transparent.png" 
          alt="" 
          className="w-[800px] h-auto object-contain opacity-[0.07] filter drop-shadow-2xl select-none transform rotate-[-12deg] scale-110"
        />
      </div>

      {/* Diagonal Ribbon */}
      <div className="absolute top-6 -right-12 rotate-45 bg-gradient-to-r from-amber-500 to-red-500 text-slate-950 font-black text-xs py-1.5 px-16 shadow-xl tracking-wider uppercase z-20">
        MEGA OFFER
      </div>

      {/* Top Header - Transparent & Enlarged Logos! */}
      <div className="relative z-10 flex items-center justify-between gap-6 pb-4 border-b border-white/10">
        {/* Logos Container */}
        <div className="flex items-center gap-6">
          <div className="flex items-center h-20 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <img 
              src="/assets/logos/elbadry-trade-transparent.png" 
              alt="Al Badry Trade" 
              className="h-20 w-auto object-contain"
            />
          </div>

          <div className="h-12 w-px bg-slate-600/60" />

          <div className="flex items-center h-20 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <img 
              src="/assets/logos/ugreen-white-text-transparent.png" 
              alt="UGREEN" 
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>

        {/* Big Promo Badge */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-0.5 rounded-2xl shadow-xl shadow-orange-500/25">
          <div className="bg-slate-950 px-5 py-2.5 rounded-[14px] flex items-center gap-2.5">
            <Flame className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
            <div className="text-right">
              <span className="text-[11px] font-black tracking-widest text-amber-400 block uppercase">
                {bundle.badgeText || 'SPECIAL DISCOUNT'}
              </span>
              <span className="text-sm font-black text-white block">
                {bundle.name || `BUNDLE #${bundle.bundleNumber}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Discount Title Banner */}
      <div className="relative z-10 my-3 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-extrabold px-3.5 py-1 rounded-full text-xs uppercase tracking-wider mb-1.5 shadow-sm">
          <Percent className="w-3.5 h-3.5" />
          <span>وفر حتى {calc.discountPercentage}% مع باقة التوفير الحصرية</span>
        </div>
        <h1 className="text-3xl lg:text-[40px] font-black text-white tracking-tight drop-shadow-lg leading-tight">
          {bundle.title || 'EXCLUSIVE WHOLESALE BUNDLE'}
        </h1>
        {bundle.subtitle && (
          <p className="text-base lg:text-xl font-black text-amber-200 mt-1 max-w-3xl mx-auto drop-shadow leading-relaxed">
            {bundle.subtitle}
          </p>
        )}
      </div>

      {/* Products Grid - Enlarged Products! */}
      <div className="relative z-10 flex-1 grid grid-cols-2 gap-4 my-2 content-center">
        {bundle.products.map((product, index) => {
          const prodCalc = calc.productCalculations.find(p => p.id === product.id);
          return (
            <div 
              key={product.id || index}
              className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/95 border-2 border-slate-700/60 hover:border-amber-500/60 rounded-2xl p-4 flex items-center gap-4 shadow-xl transition-all group"
            >
              {/* Floating Qty Pill */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/30 border border-white/40 z-10 flex items-center gap-1.5">
                <span className="text-xs font-bold opacity-90">الكمية:</span>
                <span className="text-base font-black leading-none">{product.quantity}</span>
                <span className="text-[11px] font-bold">قطع</span>
              </div>

              {/* Product Image - ENLARGED */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 flex-shrink-0 bg-slate-950/70 rounded-2xl p-3 border border-slate-700/50 flex items-center justify-center">
                <img 
                  src={product.imageUrl || '/assets/products/earbuds.svg'} 
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 pr-10">
                {product.sku && (
                  <span className="text-[11px] font-mono text-amber-400 font-extrabold uppercase tracking-wider block">
                    {product.sku}
                  </span>
                )}
                <h3 className="text-sm lg:text-base font-bold text-white leading-snug line-clamp-2 mt-1">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-black text-emerald-400">
                    {formatNumber(product.bundleUnitPrice)} <span className="text-xs text-emerald-300">{bundle.currency}</span>
                  </span>
                  {product.originalUnitPrice > product.bundleUnitPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatNumber(product.originalUnitPrice)}
                    </span>
                  )}
                </div>

                {prodCalc && (
                  <div className="text-xs text-slate-300 mt-1.5 flex items-center gap-1">
                    <span>إجمالي ({product.quantity}x):</span>
                    <span className="font-bold text-amber-300">
                      {formatNumber(prodCalc.bundleTotal)} {bundle.currency}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prominent High-Energy Pricing Strip */}
      <div className="relative z-10 mt-3 p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/60 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Savings Badge Left */}
        <div className="flex items-center gap-5">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 p-3.5 rounded-xl font-black text-center min-w-[90px] shadow-lg">
            <span className="text-[10px] uppercase tracking-wider block">خصم</span>
            <span className="text-2xl lg:text-3xl font-black block leading-none">-{calc.discountPercentage}%</span>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-400 line-through">
              السعر الأصلي: {formatNumber(calc.totalOriginalPrice)} {bundle.currency}
            </div>
            <div className="text-lg font-black text-amber-400 mt-0.5">
              وفرت: {formatNumber(calc.totalSavings)} {bundle.currency}
            </div>
          </div>
        </div>

        {/* Big Bundle Price Right */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 px-7 py-3 rounded-xl shadow-xl shadow-emerald-500/30 flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-widest block text-slate-900">
              سعر العرض الحصري
            </span>
            <span className="text-3xl lg:text-4xl font-black tracking-tight leading-none text-slate-950">
              {formatNumber(calc.finalBundlePrice)}
            </span>
          </div>
          <div className="border-l-2 border-slate-900/30 pl-3">
            <span className="text-base font-black block leading-tight">{bundle.currency}</span>
            <span className="text-[10px] font-extrabold block opacity-90">وفر الآن</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Award className="w-4 h-4" />
            <span>البدري تريد • موزع معتمد لمنتجات UGREEN</span>
          </span>
          <span className="text-slate-400">
            {bundle.expirationDate || 'الكمية محدودة جداً'}
          </span>
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
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{bundle.contactInfo.location}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
