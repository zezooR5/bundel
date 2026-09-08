import React from 'react';
import { Bundle } from '../../types/bundle';
import { calculateBundle } from '../../utils/calculations';
import { TemplateDarkTech } from './TemplateDarkTech';
import { TemplateCleanWhite } from './TemplateCleanWhite';
import { TemplatePromoDiscount } from './TemplatePromoDiscount';
import { TemplateB2BCatalog } from './TemplateB2BCatalog';

interface TemplateRendererProps {
  bundle: Bundle;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  style?: React.CSSProperties;
}

export const ASPECT_RATIO_DIMENSIONS = {
  '1:1': { width: 1080, height: 1080, label: 'Square (1:1)', desc: 'Instagram / Facebook / WhatsApp Post' },
  '4:5': { width: 1080, height: 1350, label: 'Portrait (4:5)', desc: 'Instagram Feed Portrait' },
  '9:16': { width: 1080, height: 1920, label: 'Story (9:16)', desc: 'Instagram Story / WhatsApp Status' },
};

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  bundle,
  canvasRef,
  className = '',
  style = {}
}) => {
  const calc = calculateBundle(bundle);
  const dims = ASPECT_RATIO_DIMENSIONS[bundle.aspectRatio || '1:1'];

  const renderSelectedTemplate = () => {
    switch (bundle.template) {
      case 'cleanWhite':
        return <TemplateCleanWhite bundle={bundle} calc={calc} />;
      case 'promoDiscount':
        return <TemplatePromoDiscount bundle={bundle} calc={calc} />;
      case 'b2bCatalog':
        return <TemplateB2BCatalog bundle={bundle} calc={calc} />;
      case 'darkTech':
      default:
        return <TemplateDarkTech bundle={bundle} calc={calc} />;
    }
  };

  return (
    <div
      ref={canvasRef}
      id="promotional-bundle-canvas"
      className={`relative overflow-hidden font-sans ${className}`}
      style={{
        width: `${dims.width}px`,
        height: `${dims.height}px`,
        minWidth: `${dims.width}px`,
        minHeight: `${dims.height}px`,
        maxWidth: `${dims.width}px`,
        maxHeight: `${dims.height}px`,
        ...style
      }}
    >
      {renderSelectedTemplate()}
    </div>
  );
};
