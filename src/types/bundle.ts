export type TemplateId = 'darkTech' | 'cleanWhite' | 'promoDiscount' | 'b2bCatalog';

export type AspectRatio = '1:1' | '4:5' | '9:16';

export interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  originalUnitPrice: number;
  bundleUnitPrice: number;
  imageUrl: string;
  imageFit?: 'contain' | 'cover';
}

export interface BundleContactInfo {
  phone: string;
  whatsapp: string;
  location: string;
  salesRep?: string;
  extraText?: string;
}

export interface Bundle {
  id: string;
  name: string;
  bundleNumber: string;
  title: string;
  subtitle: string;
  currency: string;
  products: Product[];
  manualBundlePrice?: number | null; // if explicitly set (e.g. 15,000 EGP)
  expirationDate?: string;
  badgeText?: string; // e.g. "SPECIAL BUNDLE" or "OFFER OF THE MONTH"
  contactInfo: BundleContactInfo;
  template: TemplateId;
  aspectRatio: AspectRatio;
  status: 'active' | 'draft' | 'expired';
  createdAt: string;
  updatedAt: string;
}

export interface BundleCalculations {
  productCalculations: Array<{
    id: string;
    originalTotal: number;
    bundleTotal: number;
    savings: number;
  }>;
  totalOriginalPrice: number;
  finalBundlePrice: number;
  totalSavings: number;
  discountPercentage: number;
}
