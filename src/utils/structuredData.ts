// Structured Data utilities for Naturra Extal

const IMAGE_LICENSE_PAGE = "https://naturraextal.com/image-license"

export const DEFAULT_IMAGE_RIGHTS_METADATA = {
  acquireLicensePage: `${IMAGE_LICENSE_PAGE}#request-license`,
  license: `${IMAGE_LICENSE_PAGE}#usage-terms`,
  copyrightNotice: "Copyright 1999-2025 Naturra Extal. All image rights reserved.",
  creator: {
    "@type": "Organization",
    "name": "Naturra Extal",
    "url": "https://naturraextal.com"
  }
} as const

/**
 * Generate ImageObject schema for SEO-optimized image indexing
 * This helps Google understand and index images better for image search
 */
export const generateImageObjectSchema = (image: {
  url: string
  alt?: string
  title?: string
  width?: number
  height?: number
  contentUrl?: string
  description?: string
  caption?: string
  acquireLicensePage?: string
  license?: string
  copyrightNotice?: string
  creator?: {
    "@type": string
    name: string
    url?: string
  }
}) => {
  const rightsMetadata = {
    ...DEFAULT_IMAGE_RIGHTS_METADATA,
    ...(image.acquireLicensePage && { acquireLicensePage: image.acquireLicensePage }),
    ...(image.license && { license: image.license }),
    ...(image.copyrightNotice && { copyrightNotice: image.copyrightNotice }),
    ...(image.creator && { creator: image.creator })
  }

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": image.url,
    "contentUrl": image.contentUrl || image.url,
    "caption": image.caption || image.alt || image.title || "Agricultural Commodities by Naturra Extal",
    "description": image.description || image.alt || image.title || "Premium Agricultural Commodities from Naturra Extal Workshop Bekasi",
    ...(image.width && { "width": image.width }),
    ...(image.height && { "height": image.height }),
    "creditText": "Naturra Extal",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "Naturra Extal"
    },
    ...rightsMetadata,
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
 * Generate multiple ImageObject schemas for product galleries
 */
export const generateProductImageGallerySchema = (images: Array<{
  url: string
  alt?: string
  title?: string
  width?: number
  height?: number
}>, productName: string) => {
  return images.map((img, index) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": img.url,
    "contentUrl": img.url,
    "caption": img.alt || `${productName} - Image ${index + 1} - Naturra Extal`,
    "description": img.title || img.alt || `${productName} Premium Agricultural Commodities - Naturra Extal`,
    ...(img.width && { "width": img.width }),
    ...(img.height && { "height": img.height }),
    "creditText": "Naturra Extal",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "Naturra Extal"
    },
    ...DEFAULT_IMAGE_RIGHTS_METADATA,
    "publisher": {
      "@type": "Organization",
      "name": "Naturra Extal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        ...DEFAULT_IMAGE_RIGHTS_METADATA
      }
    }
  }))
}

// Generate BlogPosting Schema for SEO with Author E-E-A-T
export const generateBlogPostingSchema = (post: {
  title: string
  excerpt: string
  slug: string
  date: string
  image: string
  category: string
  author?: string
}) => {
  // If author is specified (Helmi Ramdan), use Person schema with full credentials
  // Otherwise fallback to Organization
  const authorSchema = post.author === 'Helmi Ramdan' ? {
    "@type": "Person",
    "name": "Helmi Ramdan",
    "url": "https://www.linkedin.com/in/helmi-ramdan-067912118/",
    "sameAs": "https://www.linkedin.com/in/helmi-ramdan-067912118/",
    "jobTitle": "Associate - Housing & Settlement Infrastructure",
    "worksFor": {
      "@type": "Organization",
      "name": "Dinas Perumahan Rakyat dan Kawasan Permukiman Provinsi DKI Jakarta"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Universitas Diponegoro"
    },
    "knowsAbout": [
      "Architecture",
      "Interior Design",
      "Commercial Space Design",
      "Infrastructure Engineering",
      "Construction",
      "Furniture Design",
      "Agricultural Commodities",
      "Space Planning",
      "Project Management"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "educationalLevel": "Diploma III",
        "name": "Desain Arsitektur"
      }
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Associate",
        "occupationLocation": {
          "@type": "City",
          "name": "Jakarta"
        },
        "skills": "Architecture, Infrastructure, Design Engineering"
      },
      {
        "@type": "Occupation",
        "name": "Infrastructure Engineer",
        "occupationLocation": {
          "@type": "City",
          "name": "Bekasi"
        },
        "skills": "Infrastructure Development, Project Management"
      },
      {
        "@type": "Occupation",
        "name": "Design Engineer",
        "skills": "Architectural Design, CAD, Technical Drawing"
      },
      {
        "@type": "Occupation",
        "name": "Architectural Drafter",
        "skills": "AutoCAD, 3D Modeling, Construction Documentation"
      }
    ],
    "description": "Architecture and infrastructure professional with 10+ years of experience in commercial space design, construction, and furniture consultation. Currently serving as Associate at Jakarta Provincial Housing and Settlement Agency, with previous roles in infrastructure engineering, procurement, and architectural drafting.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jakarta",
      "addressRegion": "DKI Jakarta",
      "addressCountry": "ID"
    }
  } : {
    "@type": "Organization",
    "name": "Naturra Extal",
    "url": "https://naturraextal.com",
    "logo": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200"
  }

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": post.image,
      "contentUrl": post.image,
      "caption": `${post.title} - ${post.category} Blog agricultural commodities`,
      "description": post.excerpt,
      "width": 1200,
      "height": 630,
      "creditText": "Naturra Extal",
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Naturra Extal"
      },
      ...DEFAULT_IMAGE_RIGHTS_METADATA
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "author": authorSchema,
    "publisher": {
      "@type": "Organization",
      "name": "Naturra Extal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        ...DEFAULT_IMAGE_RIGHTS_METADATA
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://naturraextal.com/blog/${post.slug}`
    },
    "articleSection": post.category,
    "inLanguage": "id-ID",
    "keywords": [
      "agricultural commodities",
      "furniture besi custom",
      "furniture bekasi",
      "meja industrial",
      "kursi bar",
      "furniture cafe",
      "furniture restoran"
    ]
  }
}

// Generate FAQ Schema for educational content
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Naturra Extal FAQ",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export const generateMerchantStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Naturra Extal",
    "url": "https://naturraextal.com",
    "logo": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
    "description": "Premium Industrial Scandinavian Furniture for Coffee Shops, Restaurants & Offices. Custom Solutions Since 1999.",
    "foundingDate": "1999",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Raya Setu Cikarang Bar.",
      "addressLocality": "Bekasi",
      "addressRegion": "Jawa Barat",
      "postalCode": "17320",
      "addressCountry": "ID"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "6289513957752",
        "contactType": "customer service",
        "email": "hello@naturraextal.com",
        "availableLanguage": ["Indonesian", "English"],
        "areaServed": "ID"
      },
      {
        "@type": "ContactPoint",
        "telephone": "6289513957752",
        "contactType": "sales",
        "email": "hello@naturraextal.com",
        "availableLanguage": ["Indonesian", "English"],
        "areaServed": "ID"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/Naturraliving",
      "https://www.facebook.com/Naturraliving",
      "https://wa.me/6289513957752"
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
            "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
            "offers": {
              "@type": "Offer",
              "price": "1500000",
              "priceCurrency": "IDR",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2026-12-31",
              "url": "https://naturraextal.com/shop"
            }
          },
          "price": "1500000",
          "priceCurrency": "IDR",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2026-12-31",
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
    }
  }
}

export const generateLocalBusinessStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": ["FurnitureStore", "LocalBusiness"],
    "name": "Naturra Extal - Workshop agricultural commodities Bekasi",
    "alternateName": "Naturra Extal agricultural commodities Bekasi",
    "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
    "description": "Workshop Furniture Besi Custom Bekasi sejak 1999. Spesialis Agricultural Commodities untuk Cafe, Restoran, Hotel, Kantor. Produksi langsung harga pabrik, material berkualitas, finishing powder coating. Melayani Jakarta, Bekasi, Jabodetabek.",
    "url": "https://naturraextal.com",
    "telephone": "6289513957752",
    "email": "hello@naturraextal.com",
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
    "areaServed": [
      // BEKASI KOTA
      { "@type": "City", "name": "Bekasi Barat" },
      { "@type": "City", "name": "Bekasi Timur" },
      { "@type": "City", "name": "Bekasi Selatan" },
      { "@type": "City", "name": "Bekasi Utara" },
      { "@type": "City", "name": "Rawalumbu" },
      { "@type": "City", "name": "Pondok Gede" },
      { "@type": "City", "name": "Jatiasih" },
      { "@type": "City", "name": "Bantargebang" },
      { "@type": "City", "name": "Mustika Jaya" },
      { "@type": "City", "name": "Medan Satria" },
      // BEKASI KABUPATEN - CIKARANG
      { "@type": "City", "name": "Cikarang Barat" },
      { "@type": "City", "name": "Cikarang Utara" },
      { "@type": "City", "name": "Cikarang Selatan" },
      { "@type": "City", "name": "Cikarang Timur" },
      { "@type": "City", "name": "Cikarang Pusat" },
      { "@type": "City", "name": "Tambun Selatan" },
      { "@type": "City", "name": "Tambun Utara" },
      { "@type": "City", "name": "Cibitung" },
      { "@type": "City", "name": "Setu" },
      // KAWASAN KOMERSIAL PREMIUM BEKASI
      { "@type": "Place", "name": "Summarecon Bekasi" },
      { "@type": "Place", "name": "Harapan Indah" },
      { "@type": "Place", "name": "Grand Galaxy City" },
      { "@type": "Place", "name": "Galaxy Bekasi" },
      { "@type": "Place", "name": "Kemang Pratama" },
      { "@type": "Place", "name": "Lippo Cikarang" },
      { "@type": "Place", "name": "Jababeka" },
      { "@type": "Place", "name": "Deltamas" },
      { "@type": "Place", "name": "EJIP (East Jakarta Industrial Park)" },
      { "@type": "Place", "name": "Greenland International Cikarang" },
      { "@type": "Place", "name": "MM2100 Industrial Town" },
      // JAKARTA
      { "@type": "City", "name": "Jakarta Timur" },
      { "@type": "City", "name": "Jakarta Pusat" },
      { "@type": "City", "name": "Jakarta Selatan" },
      { "@type": "City", "name": "Jakarta Barat" },
      { "@type": "City", "name": "Jakarta Utara" },
      // JABODETABEK LAINNYA
      { "@type": "City", "name": "Depok" },
      { "@type": "City", "name": "Bogor" },
      { "@type": "City", "name": "Tangerang" },
      { "@type": "City", "name": "Karawang" },
      { "@type": "City", "name": "Cileungsi" },
      { "@type": "State", "name": "Jabodetabek" }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -6.2088,
        "longitude": 107.1602
      },
      "geoRadius": "100000"
    },
    "slogan": "agricultural commodities Bekasi - Workshop Terpercaya Sejak 1999",
    "foundingDate": "1999",
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
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Bank Transfer", "Credit Card"],
    "currenciesAccepted": "IDR",
    "hasMap": "https://maps.app.goo.gl/5Bc5ymfVtAYRPtpK7",
    "brand": {
      "@type": "Brand",
      "name": "Naturra Extal"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Furniture Besi Custom Bekasi",
          "description": "Jasa pembuatan furniture besi custom untuk cafe, restoran, hotel, dan kantor"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Agricultural Commodities Bekasi",
          "description": "Produksi agricultural commodities dengan desain modern dan material berkualitas"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Furniture Cafe Industrial Bekasi",
          "description": "Spesialis furniture cafe industrial: meja, kursi, display rack, kitchen cabinet"
        }
      }
    ],
    "keywords": "furniture besi custom bekasi, Agricultural Commodities bekasi, furniture cafe industrial bekasi, workshop furniture besi bekasi, jual agricultural commodities jakarta bekasi, meja makan besi custom bekasi, meja cafe industrial besi, furniture besi hotel custom, bikin furniture besi custom jabodetabek, furniture besi untuk restoran, furniture bekasi barat, furniture bekasi timur, furniture bekasi selatan, furniture bekasi utara, furniture cikarang barat, furniture cikarang utara, furniture cikarang selatan, furniture cikarang timur, furniture cikarang pusat, furniture harapan indah, furniture summarecon bekasi, furniture jatiasih, furniture pekayon, furniture tambun, furniture pondok gede, furniture mustika jaya, furniture rawalumbu, furniture medan satria, furniture lippo cikarang, furniture jababeka, furniture grand galaxy city, furniture galaxy bekasi, furniture kemang pratama, furniture deltamas, furniture ejip, furniture greenland cikarang, furniture mm2100, furniture jakarta timur, furniture jakarta pusat, furniture jakarta selatan, furniture depok, furniture bogor, furniture karawang, furniture cibitung, furniture setu, furniture kranji, furniture bintara, furniture kayuringin, furniture pekayon jaya, furniture margahayu, furniture kaliabang"
  }
}

// Generate Service Area Schema with Geo Coordinates for all Bekasi areas
export const generateServiceAreaSchema = () => {
  const bekasiAreas = [
    // BEKASI KOTA
    { name: "Bekasi Barat", lat: -6.2367, lon: 106.9944, kelurahan: ["Bintara", "Kranji", "Kota Baru", "Jakasampurna", "Bintara Jaya"] },
    { name: "Bekasi Timur", lat: -6.2440, lon: 107.0076, kelurahan: ["Jatiasih", "Pekayon", "Aren Jaya", "Duren Jaya", "Margahayu"] },
    { name: "Bekasi Selatan", lat: -6.2638, lon: 106.9891, kelurahan: ["Kayuringin Jaya", "Margajaya", "Jakasetia", "Pekayon Jaya"] },
    { name: "Bekasi Utara", lat: -6.2131, lon: 107.0067, kelurahan: ["Harapan Indah", "Pejuang", "Teluk Pucung", "Kaliabang", "Kaliabang Tengah"] },
    { name: "Rawalumbu", lat: -6.2600, lon: 106.9766, kelurahan: ["Bojong Rawalumbu", "Sepanjang Jaya", "Pengasinan", "Rawalumbu"] },
    { name: "Pondok Gede", lat: -6.2759, lon: 106.9784, kelurahan: ["Jatiwaringin", "Jatibening", "Jatiraden", "Jatimakmur"] },
    { name: "Mustika Jaya", lat: -6.2855, lon: 106.9924, kelurahan: ["Mustikasari", "Pedurenan", "Cimuning", "Mustika Jaya"] },
    { name: "Medan Satria", lat: -6.1951, lon: 107.0071, kelurahan: ["Kali Baru", "Pejuang", "Harapan Baru", "Medan Satria"] },
    { name: "Bantargebang", lat: -6.3238, lon: 106.9951, kelurahan: ["Bantargebang", "Sumur Batu"] },
    { name: "Jatiasih", lat: -6.2765, lon: 106.9557, kelurahan: ["Jatiasih", "Jatiluhur", "Jatisari", "Jatimekar"] },
    
    // BEKASI KABUPATEN - CIKARANG
    { name: "Cikarang Barat", lat: -6.2703, lon: 107.1483, kelurahan: ["Lippo Cikarang", "Cibatu", "Telaga Murni", "Pasir Gombong", "Gandamekar"] },
    { name: "Cikarang Utara", lat: -6.2481, lon: 107.1529, kelurahan: ["Karang Asih", "Simpangan", "Sukamaju", "Danau Indah", "Mekarmukti"] },
    { name: "Cikarang Selatan", lat: -6.2887, lon: 107.1552, kelurahan: ["Jababeka", "Greenland", "Pasirsari", "Ciantra", "Sukasejati"] },
    { name: "Cikarang Timur", lat: -6.2674, lon: 107.1730, kelurahan: ["Serang Baru", "Karangreja", "Jayamukti", "Sukamanah", "Karangbaru"] },
    { name: "Cikarang Pusat", lat: -6.2813, lon: 107.1442, kelurahan: ["Taman Galaxy", "Lemahabang", "Hegarmukti", "Kalijaya", "Cikarang"] },
    { name: "Tambun Selatan", lat: -6.2546, lon: 107.0529, kelurahan: ["Sertajaya", "Mangunjaya", "Lambangjaya", "Setiadarma", "Tridaya Sakti"] },
    { name: "Tambun Utara", lat: -6.2178, lon: 107.0514, kelurahan: ["Satria Jaya", "Karang Satria", "Wanasari", "Karang Bahagia", "Setia Mekar"] },
    { name: "Cibitung", lat: -6.2369, lon: 107.0969, kelurahan: ["Wanajaya", "Mekarjaya", "Cikedokan", "Lambang Jaya"] },
    { name: "Setu", lat: -6.2088, lon: 107.1002, kelurahan: ["Telajung", "Lubang Buaya", "Kertajaya", "Cijengkol"] },
    { name: "Sukatani", lat: -6.1832, lon: 107.0724, kelurahan: ["Sukatani", "Sukaramai", "Ciledug", "Hegarmanah"] },
    
    // KAWASAN KOMERSIAL & INDUSTRIAL ESTATE
    { name: "Summarecon Bekasi", lat: -6.2235, lon: 107.0024, kelurahan: ["Marga Mulya", "Boulevard Summarecon"], commercial: true },
    { name: "Harapan Indah", lat: -6.2148, lon: 107.0053, kelurahan: ["Boulevard Harapan Indah", "Taman Harapan Indah"], commercial: true },
    { name: "Grand Galaxy City", lat: -6.2615, lon: 106.9924, kelurahan: ["Jakasetia", "Pekayon Jaya"], commercial: true },
    { name: "Galaxy Bekasi", lat: -6.2627, lon: 106.9934, kelurahan: ["Jakasetia"], commercial: true },
    { name: "Kemang Pratama", lat: -6.2590, lon: 107.0152, kelurahan: ["Bojong Rawalumbu"], commercial: true },
    { name: "Lippo Cikarang", lat: -6.2751, lon: 107.1519, kelurahan: ["Cibatu", "Pasir Gombong"], commercial: true },
    { name: "Jababeka", lat: -6.2896, lon: 107.1575, kelurahan: ["Pasirsari", "Ciantra"], industrial: true },
    { name: "Deltamas", lat: -6.2634, lon: 107.1283, kelurahan: ["Kalijaya", "Cikarang Pusat"], commercial: true },
    { name: "EJIP", lat: -6.3210, lon: 107.1642, kelurahan: ["Lemahabang", "Sukaresmi"], industrial: true },
    { name: "Greenland International", lat: -6.2915, lon: 107.1548, kelurahan: ["Pasirsari"], commercial: true },
    { name: "MM2100", lat: -6.2583, lon: 107.1489, kelurahan: ["Gandasari", "Cibatu"], industrial: true },
    
    // JAKARTA (PERBATASAN & AREA UTAMA)
    { name: "Jakarta Timur", lat: -6.2607, lon: 106.9003, kelurahan: ["Cakung", "Kramat Jati", "Makasar", "Cipayung", "Pondok Gede"], jakarta: true },
    { name: "Jakarta Pusat", lat: -6.1863, lon: 106.8341, kelurahan: ["Sudirman", "Thamrin", "Kuningan"], jakarta: true },
    { name: "Jakarta Selatan", lat: -6.2608, lon: 106.8106, kelurahan: ["Kemang", "SCBD", "Senopati", "Kebayoran"], jakarta: true },
    
    // JABODETABEK LAINNYA
    { name: "Depok", lat: -6.4025, lon: 106.7942, kelurahan: ["Margonda", "UI", "Sawangan", "Beji"], jabodetabek: true },
    { name: "Bogor", lat: -6.5974, lon: 106.8060, kelurahan: ["Bogor Kota", "Cibinong", "Sentul City"], jabodetabek: true },
    { name: "Karawang", lat: -6.3214, lon: 107.3047, kelurahan: ["Karawang Barat", "Karawang Timur", "Teluk Jambe"], jabodetabek: true },
    { name: "Cileungsi", lat: -6.3949, lon: 106.9596, kelurahan: ["Metland Transyogi", "Cileungsi Kidul"], jabodetabek: true }
  ]

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Furniture Besi Custom & Agricultural Commodities Manufacturing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Naturra Extal",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Raya Setu Cikarang Bar.",
        "addressLocality": "Bekasi",
        "addressRegion": "Jawa Barat",
        "postalCode": "17320",
        "addressCountry": "ID"
      }
    },
    "areaServed": bekasiAreas.map(area => ({
      "@type": "City",
      "name": area.name,
      "containedIn": {
        "@type": "AdministrativeArea",
        "name": "Bekasi"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": area.lat,
        "longitude": area.lon
      }
    }))
  }
}
