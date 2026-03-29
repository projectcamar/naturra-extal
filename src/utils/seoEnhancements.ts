import { DEFAULT_IMAGE_RIGHTS_METADATA } from './structuredData'

// Advanced SEO Enhancement Utilities for Naturra Extal
// Optimized for Google Page 1 Ranking

/**
 * Generate comprehensive LocalBusiness schema with E-E-A-T signals
 * E-E-A-T = Experience, Expertise, Authoritativeness, Trustworthiness
 */
export const generateEnhancedOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Naturra Extal",
    "alternateName": [
      "Naturra Extal Trading",
      "Naturra Agricultural Commodities",
      "Agricultural Commodity Exporter Bekasi"
    ],
    "url": "https://naturraextal.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      "width": 250,
      "height": 60,
      ...DEFAULT_IMAGE_RIGHTS_METADATA
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
      "width": 1200,
      "height": 630,
      ...DEFAULT_IMAGE_RIGHTS_METADATA
    },
    "description": "Naturra Extal adalah eksportir agricultural commodities terpercaya di Bekasi sejak 1999. Spesialis Cocoa Powder, Cengkeh (Cloves), dan Cocopeat dengan pengalaman 25+ tahun melayani pasar internasional.",
    "foundingDate": "1999-01-01",
    "foundingLocation": {
      "@type": "Place",
      "name": "Bekasi, Indonesia"
    },
    "founder": {
      "@type": "Person",
      "name": "Naturra Extal Founders",
      "jobTitle": "Agricultural Commodity Exporter"
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 50,
      "minValue": 40,
      "maxValue": 60
    },
    "slogan": "Premium Agricultural Commodities Manufacturer Since 1999",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Raya Setu Cibitung - Bekasi, Telajung",
      "addressLocality": "Bekasi",
      "addressRegion": "Jawa Barat",
      "postalCode": "17320",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2088,
      "longitude": 107.1602
    },
    "telephone": "6289513957752",
    "email": "hello@naturraextal.com",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "6289513957752",
        "contactType": "customer service",
        "email": "hello@naturraextal.com",
        "availableLanguage": ["Indonesian", "English"],
        "areaServed": ["ID"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "17:00"
        }
      },
      {
        "@type": "ContactPoint",
        "telephone": "6289513957752",
        "contactType": "sales",
        "email": "hello@naturraextal.com",
        "availableLanguage": ["Indonesian", "English"],
        "areaServed": ["ID"]
      }
    ],
    "sameAs": [
      "https://www.instagram.com/naturraextal",
      "https://www.facebook.com/naturraextal",
      "https://wa.me/6289513957752"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia",
      "geo": {
        "@type": "GeoShape",
        "addressCountry": "ID"
      }
    },
    "knowsAbout": [
      "Agricultural Commodities Manufacturing",
      "Cocoa Powder Export",
      "Indonesian Cloves Sourcing",
      "Cocopeat Supply Chain",
      "Sustainable Agriculture",
      "International Commodity Trading",
      "Export Logistics",
      "Quality Assurance",
      "Global Market Development"
    ],
    "award": [
      "1000+ Satisfied Clients Since 1999",
      "25+ Years Industry Experience",
      "Premium Quality Manufacturing"
    ],
    "brand": {
      "@type": "Brand",
      "name": "Naturra Extal",
      "logo": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      "slogan": "Premium Agricultural Commodities Since 1999"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Agricultural Commodities Grading & Packaging",
          "description": "Jasa grading dan pengemasan komoditas pertanian kustom dengan standar ekspor internasional dan parameter teknis presisi",
          "serviceType": "Processing",
          "provider": {
            "@type": "Organization",
            "name": "Naturra Extal"
          }
        }
      },
      {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "IDR",
        "itemOffered": {
          "@type": "Service",
          "name": "Commodity Sourcing Consultation",
          "description": "Konsultasi gratis untuk pengadaan agricultural commodities sesuai kebutuhan bisnis Anda",
          "serviceType": "Consultation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Installation & Delivery Service",
          "description": "Layanan inspeksi kualitas dan pengiriman komoditas ke seluruh dunia",
          "serviceType": "Delivery",
          "areaServed": {
            "@type": "Country",
            "name": "Indonesia"
          }
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Agricultural Commodities Catalog 2025",
      "description": "Koleksi lengkap komoditas pertanian unggulan: Cocoa, Cloves, dan Cocopeat"
    }
  }
}

/**
 * Generate BreadcrumbList schema for better navigation
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://naturraextal.com${item.url}`
    }))
  }
}

/**
 * Generate WebPage schema with comprehensive metadata
 */
export const generateWebPageSchema = (page: {
  title: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
  image?: string
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title,
    "description": page.description,
    "url": `https://naturraextal.com${page.url}`,
    "inLanguage": "id-ID",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Naturra Extal",
      "url": "https://naturraextal.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Naturra Extal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        ...DEFAULT_IMAGE_RIGHTS_METADATA
      }
    },
    ...(page.datePublished && { datePublished: page.datePublished }),
    ...(page.dateModified && { dateModified: page.dateModified }),
    ...(page.image && {
      primaryImageOfPage: {
        "@type": "ImageObject",
        "url": page.image,
        "width": 1200,
        "height": 630,
        ...DEFAULT_IMAGE_RIGHTS_METADATA
      }
    })
  }
}

/**
 * Generate HowTo schema for tutorial content
 */
export const generateHowToSchema = (howto: {
  name: string
  description: string
  totalTime?: string
  steps: Array<{ name: string; text: string; image?: string }>
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howto.name,
    "description": howto.description,
    ...(howto.totalTime && { totalTime: howto.totalTime }),
    "step": howto.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && {
        image: {
          "@type": "ImageObject",
          "url": step.image,
          ...DEFAULT_IMAGE_RIGHTS_METADATA
        }
      })
    }))
  }
}

/**
 * Generate optimized meta description with CTA
 */
export const generateMetaDescription = (params: {
  product?: string
  service?: string
  location?: string
  type: 'product' | 'service' | 'blog' | 'page'
  cta?: string
}) => {
  const { product, service, location, type, cta } = params

  const descriptions = {
    product: `${product} dari Naturra Extal - agricultural commodities kualitas ekspor. Kapasitas besar, grade premium, sertifikasi lengkap. ${location || 'Bekasi'}. ${cta || 'Hubungi kami!'}`,
    service: `${service} oleh Naturra Extal. Pengalaman 25+ tahun di perdagangan internasional. Cocoa, Cloves, Cocopeat. ${location || 'Global Export'}. ${cta || 'Konsultasi gratis!'}`,
    blog: `Analisis pasar ${product || service}. Insight dari expert agricultural commodities dengan 25+ tahun pengalaman. ${cta || 'Baca selengkapnya!'}`,
    page: `${product || service} - Naturra Extal eksportir agricultural commodities Bekasi sejak 1999. Partner dagang terpercaya. ${cta || 'Hubungi kami!'}`
  }

  return descriptions[type].substring(0, 160) // Google truncates at ~160 chars
}

/**
 * Generate SEO-optimized keywords
 */
export const generateKeywords = (primary: string[], secondary: string[], location: string[] = []) => {
  const baseKeywords = [
    'agricultural commodities',
    'agricultural commodities',
    'export indonesia',
    'trade bekasi',
    'Naturra Extal'
  ]

  return [...baseKeywords, ...primary, ...secondary, ...location].join(', ')
}

/**
 * Generate Open Graph tags
 */
export const generateOGTags = (params: {
  title: string
  description: string
  image?: string
  url: string
  type?: 'website' | 'article' | 'product'
}) => {
  return {
    'og:type': params.type || 'website',
    'og:title': params.title,
    'og:description': params.description,
    'og:image': params.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:url': `https://naturraextal.com${params.url}`,
    'og:site_name': 'Naturra Extal',
    'og:locale': 'id_ID'
  }
}

/**
 * Generate Twitter Card tags
 */
export const generateTwitterTags = (params: {
  title: string
  description: string
  image?: string
}) => {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': params.title,
    'twitter:description': params.description,
    'twitter:image': params.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200',
    'twitter:site': '@naturraextal'
  }
}

/**
 * Image optimization helper with SEO-friendly alt tags
 */
export const generateImageAlt = (params: {
  productName?: string
  category?: string
  action?: string
  location?: string
}) => {
  const { productName, category, action, location } = params

  const parts = [
    productName,
    category && `${category} export grade`,
    action || 'ekspor komoditas pertanian',
    'Naturra Extal',
    location && `${location}`
  ].filter(Boolean)

  return parts.join(' - ')
}

/**
 * Generate Video schema for YouTube embeds
 */
export const generateVideoSchema = (video: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
  embedUrl: string
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    ...(video.duration && { duration: video.duration }),
    "embedUrl": video.embedUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Naturra Extal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        ...DEFAULT_IMAGE_RIGHTS_METADATA
      }
    }
  }
}

/**
 * Generate ItemList schema for category pages
 */
export const generateItemListSchema = (params: {
  name: string
  description: string
  items: Array<{ name: string; url: string; image?: string; position: number }>
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": params.name,
    "description": params.description,
    "numberOfItems": params.items.length,
    "itemListElement": params.items.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "url": `https://naturraextal.com${item.url}`,
      ...(item.image && { image: item.image })
    }))
  }
}

/**
 * Generate Review schema
 */
export const generateReviewSchema = (review: {
  author: string
  reviewBody: string
  rating: number
  datePublished: string
  itemReviewed: string
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewBody": review.reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "datePublished": review.datePublished,
    "itemReviewed": {
      "@type": "Product",
      "name": review.itemReviewed,
      "brand": {
        "@type": "Brand",
        "name": "Naturra Extal"
      }
    }
  }
}

/**
 * Calculate reading time for blog posts (SEO signal)
 */
export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `PT${minutes}M`
}

/**
 * Generate Article schema for blog posts with E-E-A-T signals
 */
export const generateArticleSchema = (article: {
  title: string
  description: string
  content: string
  url: string
  image: string
  datePublished: string
  dateModified: string
  author: string
  category: string
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": "Agricultural Commodity Expert",
      "worksFor": {
        "@type": "Organization",
        "name": "Naturra Extal"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Naturra Extal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        "width": 250,
        "height": 60,
        ...DEFAULT_IMAGE_RIGHTS_METADATA
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://naturraextal.com${article.url}`
    },
    "articleSection": article.category,
    "inLanguage": "id-ID",
    "wordCount": article.content.trim().split(/\s+/).length,
    "timeRequired": calculateReadingTime(article.content),
    "about": {
      "@type": "Thing",
      "name": "Agricultural Commodities",
      "sameAs": "https://en.wikipedia.org/wiki/Agricultural_commodity"
    }
  }
}

/**
 * Enhanced LocalBusiness schema with more E-E-A-T signals
 */
export const generateEnhancedLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": ["WholesaleStore", "LocalBusiness"],
    "name": "Naturra Extal - International Agricultural Commodity Trading",
    "image": [
      {
        "@type": "ImageObject",
        "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
        ...DEFAULT_IMAGE_RIGHTS_METADATA
      },
      {
        "@type": "ImageObject",
        "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920",
        ...DEFAULT_IMAGE_RIGHTS_METADATA
      }
    ],
    "@id": "https://naturraextal.com",
    "url": "https://naturraextal.com",
    "telephone": "6289513957752",
    "priceRange": "Rp 1.500.000 - Rp 15.000.000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Raya Setu Cibitung - Bekasi, Telajung",
      "addressLocality": "Bekasi",
      "addressRegion": "Jawa Barat",
      "postalCode": "17320",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2088,
      "longitude": 107.1602
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "15:00"
      }
    ],
    "paymentAccepted": "Cash, Bank Transfer, Credit Card",
    "currenciesAccepted": "IDR",
    "hasMap": "https://maps.app.goo.gl/5Bc5ymfVtAYRPtpK7"
  }
}

/**
 * Performance hints for image loading
 */
export const getImageLoadingStrategy = (position: 'hero' | 'above-fold' | 'below-fold') => {
  const strategies = {
    'hero': {
      loading: 'eager' as const,
      fetchPriority: 'high' as const,
      decoding: 'sync' as const
    },
    'above-fold': {
      loading: 'eager' as const,
      fetchPriority: 'high' as const,
      decoding: 'async' as const
    },
    'below-fold': {
      loading: 'lazy' as const,
      fetchPriority: 'low' as const,
      decoding: 'async' as const
    }
  }

  return strategies[position]
}

/**
 * Get optimal image dimensions for different contexts
 */
export const getImageDimensions = (context: 'hero' | 'product' | 'thumbnail' | 'og-image') => {
  const dimensions = {
    hero: { width: 1920, height: 1080, aspectRatio: '16/9' },
    product: { width: 800, height: 600, aspectRatio: '4/3' },
    thumbnail: { width: 400, height: 300, aspectRatio: '4/3' },
    'og-image': { width: 1200, height: 630, aspectRatio: '1.91/1' }
  }

  return dimensions[context]
}

// Named exports are already provided for each function

