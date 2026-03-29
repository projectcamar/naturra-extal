import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

// Components
import NaturraHeader from '../components/NaturraHeader'
import Hero from '../components/Hero'
import CatalogModal from '../components/CatalogModal'
import CategoriesSection from '../components/CategoriesSection'
import BestSellersSection from '../components/BestSellersSection'
import OurProductsSection from '../components/OurProductsSection'
import MessageSection from '../components/MessageSection'
import Footer from '../components/Footer'
import AISearchOptimizedContent from '../components/AISearchOptimizedContent'
import AISearchFeatures from '../components/AISearchFeatures'

// Utils
import { generateAIOptimizedStructuredData, generateFAQStructuredData, generateWebSiteStructuredData } from '../utils/aiSearchOptimization'
import { ALL_PRODUCTS } from '../data/products'
import { generateLanguageSpecificMeta, generateLocalizedUrls, getProductImageUrl } from '../utils/seo'
import { getCurrentLanguage, getStoredLanguage, getLanguageFromLocation } from '../utils/languageManager'

const Home: React.FC = () => {
  const location = useLocation()

  // Initialize language with consistent priority: URL > Stored > Browser
  const [language, setLanguage] = useState<'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'>(() => {
    return getCurrentLanguage(location.pathname, location.search)
  })

  // Update language when URL changes (makes language switcher work without refresh!)
  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname, location.search)
    if (currentLang !== language) {
      setLanguage(currentLang)
    }
  }, [location.pathname, location.search, language])

  // Only do IP detection on first visit (no stored preference) and no URL language
  useEffect(() => {
    // Skip IP detection if:
    // 1. User already has stored preference (they've chosen before)
    // 2. Language is set from URL (query param or path prefix)
    const stored = getStoredLanguage()
    const urlLang = getLanguageFromLocation(location.pathname, location.search)

    if (stored || urlLang) {
      return // User has chosen language, don't override
    }

    // Only detect from IP on first visit (no stored preference)
    const detectLocation = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout')), 2000)
        })

        const fetchPromise = fetch('https://ipapi.co/json/')
          .then(response => response.json())

        const data = await Promise.race([fetchPromise, timeoutPromise]) as any
        const countryCode = data.country_code

        const frenchCountries = ['FR', 'BE', 'CH', 'LU', 'MC', 'CA', 'HT', 'CI', 'SN', 'ML', 'NE', 'BF', 'TG', 'BJ', 'CD', 'CG', 'GA', 'CM', 'CF', 'TD', 'MG', 'RE', 'MU', 'SC', 'KM', 'YT', 'DJ']
        const spanishCountries = ['ES', 'MX', 'AR', 'CO', 'VE', 'PE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY']
        const chineseCountries = ['CN', 'TW', 'HK', 'SG', 'MO']
        const arabicCountries = ['SA', 'AE', 'KW', 'QA', 'OM', 'BH', 'EG', 'JO', 'LB', 'SY', 'IQ', 'YE', 'MA', 'DZ', 'TN', 'LY', 'SD', 'PS']

        let detectedLang: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko' = 'en'

        if (countryCode === 'ID') {
          detectedLang = 'id'
        } else if (countryCode === 'KR') {
          detectedLang = 'ko'
        } else if (countryCode === 'JP') {
          detectedLang = 'ja'
        } else if (frenchCountries.includes(countryCode)) {
          detectedLang = 'fr'
        } else if (spanishCountries.includes(countryCode)) {
          detectedLang = 'es'
        } else if (chineseCountries.includes(countryCode)) {
          detectedLang = 'zh'
        } else if (arabicCountries.includes(countryCode)) {
          detectedLang = 'ar'
        }

        // Only update if no stored preference exists
        if (!stored) {
          setLanguage(detectedLang)
        }
      } catch (error) {
        // Silently fail
        console.log('IP detection skipped or failed')
      }
    }

    detectLocation()
  }, []) // Only run once on mount

  const isIndonesian = language === 'id'

  const localeMeta = generateLanguageSpecificMeta(isIndonesian)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  // Multi-language translations - SEO Optimized with Priority Keywords
  const translations = {
    title: language === 'id'
      ? "Komoditas Pertanian Indonesia | Eksportir Kakao, Cengkeh, Cocopeat Sejak 1999"
      : language === 'ar'
        ? "السلع الزراعية الإندونيسية - الكاكاو والقرنفل والكوكوبيت | ناتورا إكستال"
        : language === 'zh'
          ? "印度尼西亚农产品 - 可可、丁香和椰糠 | Naturra Extal"
          : language === 'ja'
            ? "インドネシア農産物 - カカオ、クローブ、ココピート | Naturra Extal"
            : language === 'es'
              ? "Mercancías Agrícolas de Indonesia - Cacao, Clavo y Cocopeat | Naturra Extal"
              : language === 'fr'
                ? "Matières Premières Agricoles d'Indonésie - Cacao, Girofle et Cocopeat | Naturra Extal"
                : "Agricultural Commodities Indonesia | Cocoa, Cloves, & Cocopeat Exporter Since 1999",
    description: language === 'id'
      ? "Komoditas pertanian Indonesia kualitas premium sejak 1999. Menyediakan bubuk kakao, cengkeh, dan cocopeat untuk pasar global. Pesanan curah tersedia."
      : language === 'ar'
        ? "سلع زراعية إندونيسية فاخرة منذ عام 1999. نوفر مسحوق الكاكاو والقرنفل والكوكوبيت للأسواق العالمية. تتوفر طلبات الجملة."
        : language === 'zh'
          ? "自1999年以来的优质印度尼西亚农产品。为全球市场提供可可粉、丁香和椰糠。提供大宗订单。"
          : language === 'ja'
            ? "1999年以来のプレミアムなインドネシア農産物。グローバル市場向けにココアパウダー、クローブ、ココピートを提供しています。バルク注文も承ります。"
            : language === 'es'
              ? "Mercancías agrícolas indonesias de primera calidad desde 1999. Suministro de cacao en polvo, clavo y cocopeat para el mercado global. Pedidos a granel disponibles."
              : language === 'fr'
                ? "Matières premières agricoles indonésiennes de qualité supérieure depuis 1999. Fourniture de poudre de cacao, clous de girofle et cocopeat pour le marché mondial."
                : "Premium Indonesian agricultural commodities since 1999. Supplying cocoa powder, cloves, and cocopeat for the global market. Bulk orders available.",
    ogTitle: language === 'id'
      ? "Eksportir Komoditas Pertanian Indonesia | Kualitas Global"
      : language === 'ar'
        ? "مصدر السلع الزراعية الإندونيسية | جودة عالمية"
        : language === 'zh'
          ? "印度尼西亚农产品出口商 | 全球品质"
          : language === 'ja'
            ? "インドネシア農産物輸出業者 | グローバル品質"
            : language === 'es'
              ? "Exportador de Mercancías Agrícolas de Indonesia | Calidad Global"
              : language === 'fr'
                ? "Exportateur de Matières Premières Agricoles d'Indonésie | Qualité Mondiale"
                : "Indonesian Agricultural Commodities Exporter | Global Quality",
    ogDescription: language === 'id'
      ? "Eksportir komoditas pertanian: bubuk kakao, cengkeh Indonesia, cocopeat media tanam. Pengalaman 25+ tahun. Harga kompetitif dan kualitas ekspor."
      : language === 'ar'
        ? "مصدر السلع الزراعية: مسحوق الكاكاو، القرنفل الإندونيسي، بيئة الكوكوبيت. خبرة 25+ عاماً. أسعار تنافسية وجودة تصدير."
        : language === 'zh'
          ? "农产品出口商：可可粉、印度尼西亚丁香、椰糠培养基。25年以上经验。具有竞争力的价格和出口品质。"
          : language === 'ja'
            ? "農産物輸出業者：ココアパウダー、インドネシア産クローブ、ココピート培地。25年以上の経験。競争力のある価格と輸出品質。"
            : language === 'es'
              ? "Exportador de mercancías agrícolas: cacao en polvo, clavo de Indonesia, sustrato de cocopeat. Más de 25 años de experiencia. Precios competitivos y calidad de exportación."
              : language === 'fr'
                ? "Exportateur de matières premières agricoles : poudre de cacao, clous de girofle indonésiens, substrat cocopeat. 25+ ans d'expérience. Prix compétitifs et qualité export."
                : "Exporter of agricultural commodities: cocoa powder, Indonesian cloves, cocopeat growing media. 25+ years experience. Competitive pricing and export quality."
  }

  return (
    <div className="home">
      <CatalogModal />
      <Helmet htmlAttributes={{ lang: language === 'ar' ? 'ar' : (language === 'zh' ? 'zh' : (language === 'ja' ? 'ja' : (language === 'es' ? 'es' : (language === 'fr' ? 'fr' : (language === 'ko' ? 'ko' : localeMeta.lang))))), dir: language === 'ar' ? 'rtl' : 'ltr', 'data-language': language }}>
        <title>{translations.title}</title>
        <meta name="description" content={translations.description} />
        <meta name="keywords" content="agricultural commodities indonesia, cocoa powder exporter, indonesian cloves supplier, cocopeat block, spices and herbs indonesia, essential oils manufacturer, sustainable growing media, export quality agriculture, Naturra Extal" />
        <meta httpEquiv="content-language" content={localeMeta.lang} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={translations.ogTitle} />
        <meta property="og:description" content={translations.ogDescription} />
        <meta property="og:image" content="https://naturraextal.com/og-image.jpg" />
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Indonesian Agricultural Commodities - Naturra Extal" />
        <meta name="twitter:description" content="Premium cocoa powder, Indonesian cloves, and cocopeat media. Export quality agricultural commodities. 25+ years experience in global supply." />
        <meta name="twitter:image" content="https://naturraextal.com/og-image.jpg" />

        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="geo.region" content="ID-JB" />
        <meta name="geo.placename" content="Bekasi" />
        <meta name="geo.position" content="-6.2088;107.1602" />
        {/* Canonical and Hreflang */}
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`home-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}

        {/* Structured Data - Product Catalog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Naturra Extal Agricultural Commodities",
            "description": "Koleksi komoditas pertanian premium: Kakao, Cengkeh, dan Cocopeat untuk pasar internasional",
            "numberOfItems": ALL_PRODUCTS.length,
            "itemListElement": ALL_PRODUCTS.map((product, index) => {
              const imageUrl = getProductImageUrl(product.image, product.slug)
              const priceNumeric = product.price.replace(/[^\d]/g, '')
              const description = `${product.name} agricultural commodity by Naturra Extal. Premium quality products from Indonesia since 1999.`

              return {
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": product.name,
                  "description": description,
                  "image": imageUrl,
                  "url": `https://naturraextal.com/product/${product.slug}`,
                  "brand": {
                    "@type": "Brand",
                    "name": "Naturra Extal"
                  },
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
                      "logo": "https://naturraextal.com/logo.png",
                      "image": "https://naturraextal.com/og-image.jpg",
                      "description": "Premium Indonesian agricultural commodities exporter. Supplying cocoa, cloves, and cocopeat worldwide since 1999."
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
            })
          })}
        </script>

        {/* Local Business Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Naturra Extal",
              "image": "https://naturraextal.com/og-image.jpg",
              "@id": "https://naturraextal.com",
              "url": "https://naturraextal.com",
              "telephone": "+6289513957752",
              "email": "naturraextal@gmail.com",
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
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "08:00",
                "closes": "17:00"
              },
              "priceRange": "Rp$$-$$$"
            }
          `}
        </script>

        {/* AI-Optimized Merchant Schema */}
        <script type="application/ld+json">
          {JSON.stringify(generateAIOptimizedStructuredData())}
        </script>

        {/* FAQ Schema for AI Understanding */}
        <script type="application/ld+json">
          {JSON.stringify(generateFAQStructuredData())}
        </script>

        {/* WebSite Schema with Search Action */}
        <script type="application/ld+json">
          {JSON.stringify(generateWebSiteStructuredData())}
        </script>
      </Helmet>
      <NaturraHeader isIndonesian={isIndonesian} language={language} />
      <Hero isIndonesian={isIndonesian} language={language} />


      <CategoriesSection isIndonesian={isIndonesian} language={language} />
      <BestSellersSection isIndonesian={isIndonesian} language={language} />
      <OurProductsSection isIndonesian={isIndonesian} language={language} />
      <MessageSection isIndonesian={isIndonesian} language={language} />
      <Footer isIndonesian={isIndonesian} language={language} />

      {/* AI Search Optimized Content */}
      <AISearchOptimizedContent isIndonesian={isIndonesian} />

      {/* AI Search Features */}
      <AISearchFeatures isIndonesian={isIndonesian} />
    </div>
  )
}

export default Home

