// AI Search Optimization utilities for Naturra Extal
import { getProductImageUrl } from './seo'

export const generateAIOptimizedStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    "name": "Naturra Extal",
    "alternateName": ["Naturra Extal Trading", "Agricultural Commodities Indonesia", "Naturra Commodities Export"],
    "description": "Premium Agricultural Commodity Exporter specializing in Cocoa Powder, Cloves, and Cocopeat. Established 1999 in Bekasi, Indonesia. Serving global markets including the USA, Japan, Australia, Europe, and Asia.",
    "url": "https://naturraextal.com",
    "logo": "https://images.unsplash.com/photo-1559133967-313620786524?auto=format&fit=crop&q=80&w=800",
    "image": "https://images.unsplash.com/photo-1559133967-313620786524?auto=format&fit=crop&q=80&w=1200",
    "foundingDate": "1999",
    "founder": {
      "@type": "Person",
      "name": "Naturra Extal Founder"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Raya Setu Cikarang Bar.",
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
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+6289513957752",
        "contactType": "customer service",
        "email": "hello@naturraextal.com",
        "availableLanguage": ["Indonesian", "English"],
        "areaServed": ["ID", "US", "JP", "AU", "SG", "MY", "TH", "VN", "PH", "International"]
      }
    ],
    "sameAs": [
      "https://www.instagram.com/naturraextal",
      "https://www.facebook.com/naturraextal",
      "https://wa.me/+6289513957752"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Agricultural Commodities Collection",
      "description": "Complete collection of Agricultural Commodities for food industry, horticulture, and commercial use",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Cocoa Powder",
            "category": "Agricultural Commodities",
            "description": "Premium Indonesian Cocoa Powder (HS 1805 & 1806) from Sulawesi and Sumatra",
            "offers": {
              "@type": "Offer",
              "price": "1000000",
              "priceCurrency": "IDR",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2026-12-31",
              "url": "https://naturraextal.com/shop"
            }
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "127",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "keywords": [
      "agricultural commodities indonesia",
      "cocoa powder export",
      "indonesian cloves supplier",
      "cocopeat supplier bekasi",
      "commodity trading indonesia",
      "Naturra Extal",
      "export cocoa powder",
      "indonesian spices export",
      "sustainable horticulture indonesia",
      "bulk cocoa supplier",
      "lal pari cloves",
      "low ec cocopeat blocks",
      "indonesian commodity exporter",
      "global GAP certified farmer",
      "commodity supply chain bekasi"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -6.2088,
        "longitude": 107.1602
      },
      "geoRadius": "500000"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Commodity Sourcing",
          "description": "Direct sourcing from Indonesian farmers with strict quality control"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Export Logistics",
          "description": "Global shipping and supply chain management services"
        }
      }
    ]
  }
}

export const generateProductStructuredData = (product: any) => {
  const imageUrl = getProductImageUrl(product.image, product.slug)
  const priceNumeric = product.price?.replace(/[^\d]/g, '') || "0"

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `Premium Agricultural Commodity ${product.name} by Naturra Extal. Sourced directly from Indonesian farmers since 1999.`,
    "image": imageUrl,
    "url": `https://naturraextal.com/product/${product.slug}`,
    "brand": {
      "@type": "Brand",
      "name": "Naturra Extal"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Naturra Extal",
      "url": "https://naturraextal.com",
      "logo": "https://images.unsplash.com/photo-1559133967-313620786524?auto=format&fit=crop&q=80&w=800",
      "image": "https://images.unsplash.com/photo-1559133967-313620786524?auto=format&fit=crop&q=80&w=1200"
    },
    "category": product.category || "Agricultural Commodities",
    "keywords": [
      product.name.toLowerCase(),
      "agricultural commodities",
      "export indonesia",
      "naturra extal",
      product.category?.toLowerCase() || "commodity"
    ],
    "offers": {
      "@type": "Offer",
      "price": priceNumeric,
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2026-12-31",
      "url": `https://naturraextal.com/product/${product.slug}`,
      "seller": {
        "@type": "Organization",
        "name": "Naturra Extal",
        "url": "https://naturraextal.com",
        "logo": "https://images.unsplash.com/photo-1559133967-313620786524?auto=format&fit=crop&q=80&w=800",
        "image": "https://images.unsplash.com/photo-1559133967-313620786524?auto=format&fit=crop&q=80&w=1200",
        "description": "Premium Agricultural Commodity Exporter for Global Industries. Cocoa, Cloves, and Cocopeat Solutions Since 1999."
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "127",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
}

export const generateFAQStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Naturra Extal FAQ",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Apa itu Naturra Extal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Naturra Extal adalah eksportir komoditas pertanian premium yang telah beroperasi sejak 1999 di Bekasi. Kami mengkhususkan diri dalam pasokan Cocoa Powder, Cengkeh, dan Cocopeat untuk pasar global dengan standar kualitas ekspor."
        }
      },
      {
        "@type": "Question",
        "name": "Bagaimana proses pengadaan di Naturra Extal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kami bekerja sama langsung dengan jaringan petani di Sulawesi, Sumatra, dan Jawa untuk memastikan kualitas terbaik dan harga yang kompetitif. Setiap produk melalui kontrol kualitas ketat sebelum diekspor."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah Naturra Extal melayani pengiriman internasional?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya, kami melayani pengiriman ke pasar internasional utama termasuk USA, Jepang, Australia, Eropa, dan seluruh Asia. Kami menangani seluruh proses logistik ekspor mulai dari pergudangan hingga pengapalan dari Jakarta atau Surabaya."
        }
      },
      {
        "@type": "Question",
        "name": "Apa saja komoditas utama yang ditawarkan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fokus utama kami adalah pada Produk Kakao (Cocoa Powder HS 1805 & 1806), Cengkeh (Lal Pari Grade), dan Media Tanam Cocopeat (Low EC Blocks)."
        }
      }
    ]
  }
}

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string, url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export const generateWebSiteStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Naturra Extal",
    "url": "https://naturraextal.com",
    "description": "Eksportir Komoditas Pertanian Indonésia - Kakao, Cengkeh, Cocopeat sejak 1999",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://naturraextal.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Naturra Extal",
      "url": "https://naturraextal.com",
      "logo": "https://images.unsplash.com/photo-1559133967-313620786524?auto=format&fit=crop&q=80&w=800",
      "image": "https://images.unsplash.com/photo-1559133967-313620786524?auto=format&fit=crop&q=80&w=1200"
    }
  }
}

// Named exports are already provided for each function
