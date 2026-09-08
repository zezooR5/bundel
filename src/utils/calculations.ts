import { Bundle, BundleCalculations } from '../types/bundle';

export function calculateBundle(bundle: Bundle): BundleCalculations {
  let totalOriginalPrice = 0;
  let sumProductBundleTotal = 0;

  const productCalculations = bundle.products.map(product => {
    const qty = Number(product.quantity) || 0;
    const origUnit = Number(product.originalUnitPrice) || 0;
    const bundleUnit = Number(product.bundleUnitPrice) || 0;

    const originalTotal = qty * origUnit;
    const bundleTotal = qty * bundleUnit;
    const savings = Math.max(0, originalTotal - bundleTotal);

    totalOriginalPrice += originalTotal;
    sumProductBundleTotal += bundleTotal;

    return {
      id: product.id,
      originalTotal,
      bundleTotal,
      savings
    };
  });

  // If a manual bundle price override is provided and > 0, use it; otherwise use sum of product bundle totals
  const finalBundlePrice = (bundle.manualBundlePrice !== undefined && bundle.manualBundlePrice !== null && bundle.manualBundlePrice > 0)
    ? Number(bundle.manualBundlePrice)
    : sumProductBundleTotal;

  const totalSavings = Math.max(0, totalOriginalPrice - finalBundlePrice);
  const discountPercentage = totalOriginalPrice > 0 
    ? Math.round((totalSavings / totalOriginalPrice) * 1000) / 10 
    : 0;

  return {
    productCalculations,
    totalOriginalPrice,
    finalBundlePrice,
    totalSavings,
    discountPercentage
  };
}

export function formatPrice(amount: number, currency = 'EGP'): string {
  if (isNaN(amount)) return `0 ${currency}`;
  return `${amount.toLocaleString('en-US')} ${currency}`;
}

export function formatNumber(amount: number): string {
  if (isNaN(amount)) return '0';
  return amount.toLocaleString('en-US');
}
