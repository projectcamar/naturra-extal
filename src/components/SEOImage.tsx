import React from 'react';
import { generateImageAlt, getImageLoadingStrategy } from '../utils/seoEnhancements';

interface SEOImageProps {
  src: string;
  productName?: string;
  category?: string;
  alt?: string;
  title?: string;
  position?: 'hero' | 'above-fold' | 'below-fold';
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  itemProp?: string; // For structured data (schema.org)
  itemScope?: boolean;
}

/**
 * SEO-optimized Image Component
 * - Automatic lazy loading for below-fold images
 * - SEO-friendly alt text generation
 * - Performance optimization with fetchPriority
 * - Responsive image loading
 * - Image protection (disable right-click and drag)
 * - Structured data support (itemProp, itemScope)
 * - Title attribute for better SEO and accessibility
 * - Comprehensive meta tags for image SEO
 */
const SEOImage: React.FC<SEOImageProps> = ({
  src,
  productName,
  category,
  alt,
  title,
  position = 'below-fold',
  width,
  height,
  className = '',
  style,
  onClick,
  itemProp,
  itemScope
}) => {
  // Get loading strategy based on position
  const loadingStrategy = getImageLoadingStrategy(position);
  
  // Generate SEO-optimized alt text if not provided
  const altText = alt || generateImageAlt({
    productName,
    category,
    action: 'furniture besi custom'
  });

  // Generate SEO-optimized title if not provided
  const titleText = title || altText || productName || 'agricultural commodities Naturra Extal';

  // Handler untuk mencegah drag (context menu sudah di-handle global di imageProtection.ts)
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
    return false;
  };
  
  // Build image attributes for SEO
  const imageAttributes: React.ImgHTMLAttributes<HTMLImageElement> & {
    'data-image-type'?: string;
    'data-product-name'?: string;
    'data-category'?: string;
  } = {
    src,
    alt: altText,
    title: titleText,
    className,
    style: {
      ...style,
      userSelect: 'none',
      // CSS properties untuk drag prevention sudah di-handle oleh CSS global di imageProtection.ts
    } as React.CSSProperties,
    width,
    height,
    loading: loadingStrategy.loading,
    fetchPriority: loadingStrategy.fetchPriority,
    decoding: loadingStrategy.decoding,
    onClick,
    onDragStart: handleDragStart,
    draggable: false,
  };

  // Add structured data attributes if provided
  if (itemProp) {
    imageAttributes.itemProp = itemProp;
  }
  if (itemScope) {
    imageAttributes.itemScope = true;
  }

  // Add data attributes for SEO tracking
  imageAttributes['data-image-type'] = productName ? 'product' : category ? 'category' : 'general';
  if (productName) {
    imageAttributes['data-product-name'] = productName;
  }
  if (category) {
    imageAttributes['data-category'] = category;
  }
  
  return <img {...imageAttributes} />;
};

export default SEOImage;
