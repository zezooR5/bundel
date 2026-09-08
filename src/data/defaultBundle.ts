import { Bundle } from '../types/bundle';
import { assetUrl } from '../utils/assets';

export const DEFAULT_BUNDLE: Bundle = {
  id: 'bundle-demo-3',
  name: 'BUNDLE NO 1',
  bundleNumber: '01',
  title: 'OFFICIAL WHOLESALE BUNDLE',
  subtitle: 'Exclusive Special Offer for Electronics Retailers & Stores',
  badgeText: 'SPECIAL BUNDLE OFFER',
  currency: 'EGP',
  products: [
    {
      id: 'prod-1',
      name: 'UGREEN 20000mAh 2-Way Fast Charging Power Bank Gray',
      sku: 'PB200-GRY',
      quantity: 5,
      originalUnitPrice: 1400,
      bundleUnitPrice: 1033,
      imageUrl: assetUrl('assets/products/ugreen-powerbank-real.png'),
      imageFit: 'contain'
    },
    {
      id: 'prod-2',
      name: 'UGREEN USB-C to USB-C ROUND CABLE Braided 1M BLACK',
      sku: 'US176-BLK-1M',
      quantity: 10,
      originalUnitPrice: 232,
      bundleUnitPrice: 170,
      imageUrl: assetUrl('assets/products/ugreen-cable-real.png'),
      imageFit: 'contain'
    },
    {
      id: 'prod-3',
      name: 'UGREEN 2-Port GaN Fast Charger 30W Wide Compatibility',
      sku: 'CD319-30W',
      quantity: 10,
      originalUnitPrice: 600,
      bundleUnitPrice: 445,
      imageUrl: assetUrl('assets/products/ugreen-charger-real.png'),
      imageFit: 'contain'
    }
  ],
  manualBundlePrice: 11000,
  expirationDate: 'Limited Quantity Offer',
  contactInfo: {
    phone: '+20 100 888 9999',
    whatsapp: '+20 100 888 9999',
    location: 'Egypt - Cairo',
    salesRep: 'Al Badry B2B Sales Department',
    extraText: 'Official Authorized Distributor • Original Warranty'
  },
  template: 'cleanWhite',
  aspectRatio: '1:1',
  status: 'active',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const SAMPLE_PRODUCTS = [
  {
    name: 'UGREEN 20000mAh 2-Way Fast Charging Power Bank',
    sku: 'PB200-GRY',
    originalUnitPrice: 1400,
    bundleUnitPrice: 1033,
    imageUrl: '/assets/products/ugreen-powerbank-real.png'
  },
  {
    name: 'UGREEN USB-C to USB-C Braided Cable 1M',
    sku: 'US176-BLK-1M',
    originalUnitPrice: 232,
    bundleUnitPrice: 170,
    imageUrl: '/assets/products/ugreen-cable-real.png'
  },
  {
    name: 'UGREEN 2-Port GaN Fast Charger 30W',
    sku: 'CD319-30W',
    originalUnitPrice: 600,
    bundleUnitPrice: 445,
    imageUrl: '/assets/products/ugreen-charger-real.png'
  },
  {
    name: 'UGREEN WS207 HiTune P3 True Wireless Earbuds',
    sku: 'WS207-WHT',
    originalUnitPrice: 1000,
    bundleUnitPrice: 737,
    imageUrl: '/assets/products/earbuds.svg'
  }
];
