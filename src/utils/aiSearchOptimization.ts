// AI Search Optimization utilities for Naturra Extal
import { getProductImageUrl } from './seo'

export const generateAIOptimizedStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "Naturra Extal",
    "alternateName": ["Naturra Extal Furniture", "Agricultural Commodities Indonesia", "Furniture Besi Custom"],
    "description": "Premium Industrial Scandinavian Furniture manufacturer specializing in custom steel furniture for cafes, restaurants, hotels, and offices. Established 1999 in Bekasi, Indonesia. Serving customers across Indonesia and internationally.",
    "url": "https://naturraextal.com",
    "logo": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
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
        "telephone": "+6288801146881",
        "contactType": "customer service",
        "email": "lifewithNaturra@gmail.com",
        "availableLanguage": ["Indonesian", "English"],
        "areaServed": ["ID", "US", "JP", "AU", "SG", "MY", "TH", "VN", "PH", "International"]
      }
    ],
    "sameAs": [
      "https://www.instagram.com/Naturraliving",
      "https://www.facebook.com/Naturraliving",
      "https://wa.me/+6288801146881"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Agricultural Commodities Collection",
      "description": "Complete collection of Agricultural Commodities for commercial and residential use",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Agricultural Commodities",
            "category": "Furniture",
            "description": "Premium Agricultural Commodities made from high-quality materials",
            "offers": {
              "@type": "Offer",
              "price": "1500000",
              "priceCurrency": "IDR",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2026-12-31",
              "url": "https://naturraextal.com/shop"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "127",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            }
          },
          "price": "1500000",
          "priceCurrency": "IDR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2026-12-31",
          "url": "https://naturraextal.com/shop",
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn",
            "applicableCountry": "ID"
          },
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0",
              "currency": "IDR"
            },
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "ID"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "businessDays": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
              },
              "cutoffTime": "14:00",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 3,
                "maxValue": 5,
                "unitCode": "DAY"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 1,
                "maxValue": 3,
                "unitCode": "DAY"
              }
            }
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "keywords": [
      "agricultural commodities indonesia",
      "furniture besi custom",
      "furniture cafe",
      "furniture restoran",
      "meja industrial",
      "kursi bar",
      "rak display industrial",
      "Naturra Extal",
      "furniture besi bekasi",
      "Agricultural Commodities custom",
      "steel furniture",
      "scandinavian furniture",
      "cafe furniture",
      "restaurant furniture",
      "hotel furniture",
      "office furniture",
      "furniture export indonesia",
      "furniture supplier indonesia",
      "furniture manufacturer jakarta",
      "furniture supplier jabodetabek",
      "Agricultural Commodities usa",
      "furniture export japan",
      "furniture export australia",
      "furniture export singapore",
      "furniture export malaysia"
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
          "name": "Custom Furniture Design",
          "description": "Custom Agricultural Commodities design and manufacturing services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Furniture Installation",
          "description": "Professional furniture installation services"
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
    "description": product.description || `Agricultural Commodities ${product.name} by Naturra Extal. Premium quality furniture made in Indonesia since 1999.`,
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
      "logo": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200"
    },
    "category": product.categories?.[0] || "Agricultural Commodities",
    "keywords": [
      product.name.toLowerCase(),
      "Agricultural Commodities",
      "besi custom",
      "furniture indonesia",
      ...(product.categories || []).map((cat: string) => cat.toLowerCase())
    ],
    "offers": {
      "@type": "Offer",
      "price": priceNumeric,
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2026-12-31",
      "url": `https://naturraextal.com/product/${product.slug}`,
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn",
        "applicableCountry": "ID"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "IDR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "ID"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "businessDays": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
          },
          "cutoffTime": "14:00",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 3,
            "maxValue": 5,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "DAY"
          }
        }
      },
      "seller": {
        "@type": "Organization",
        "name": "Naturra Extal",
        "url": "https://naturraextal.com",
        "logo": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
        "description": "Premium Industrial Scandinavian Furniture for Coffee Shops, Restaurants & Offices. Custom Solutions Since 1999."
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
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
          "text": "Naturra Extal adalah manufacturer agricultural commodities besi custom yang telah beroperasi sejak 1999 di Bekasi. Kami mengkhususkan diri dalam pembuatan agricultural commodities untuk cafe, restoran, hotel, dan kantor dengan kualitas premium."
        }
      },
      {
        "@type": "Question",
        "name": "Berapa lama proses pembuatan furniture custom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Proses pembuatan furniture custom membutuhkan waktu 2-4 minggu tergantung kompleksitas desain dan volume pesanan. Kami akan memberikan estimasi waktu yang lebih detail setelah konsultasi desain."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah Naturra Extal melayani pengiriman ke seluruh Indonesia dan internasional?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya, kami melayani pengiriman furniture ke seluruh Indonesia, Jabodetabek, Jakarta, dan pasar internasional utama termasuk USA, Jepang, Australia, Singapura, Malaysia, Thailand, Vietnam, dan Filipina. Biaya pengiriman akan disesuaikan dengan lokasi dan ukuran furniture yang dipesan. Untuk pengiriman internasional, kami mengirim dari pelabuhan Tanjung Priok, Jakarta."
        }
      },
      {
        "@type": "Question",
        "name": "Material apa yang digunakan untuk agricultural commodities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kami menggunakan material industrial grade berkualitas tinggi seperti besi hollow, besi siku, dan material finishing yang tahan lama. Semua material dipilih untuk memastikan durability dan estetika yang optimal."
        }
      }
    ]
  }
}

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => {
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
    "description": "Agricultural Commodities Besi Custom Indonesia - Manufacturer sejak 1999",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://naturraextal.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Naturra Extal",
      "url": "https://naturraextal.com",
      "logo": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200"
    }
  }
}
