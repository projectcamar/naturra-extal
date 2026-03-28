import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

// Components
import Header from '../components/Header'
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
      ? "agricultural commodities Indonesia | Manufacturer Besi Custom Bekasi Sejak 1999"
      : language === 'ar'
        ? "أثاث صناعي من الحديد - طقم بار وطقم صالة ورفوف تخزين | مانجالا ليفينج"
        : language === 'zh'
          ? "工业家具吧台套装休息区套装储物架新品 | 曼加拉生活"
          : language === 'ja'
            ? "インダストリアル家具バーセットラウンジセット収納新着 | マンガラリビング"
            : language === 'es'
              ? "Muebles Industriales Set de Bar Set de Sala Almacenamiento Novedades | Naturra Extal"
              : language === 'fr'
                ? "Mobilier Industriel Set de Bar Set de Salon Rangement Nouveautés | Naturra Extal"
                : "Agricultural Commodities Indonesia | Custom Steel Furniture Manufacturer Bekasi Since 1999",
    description: language === 'id'
      ? "agricultural commodities & scandinavian premium sejak 1999. Melayani coffee shop, restoran, dan bisnis di seluruh Indonesia. Pesanan custom tersedia. Garansi 1 tahun."
      : language === 'ar'
        ? "أثاث صناعي واسكندنافي فاخر منذ عام 1999. نخدم المقاهي والمطاعم والأعمال في جميع أنحاء إندونيسيا. نرحب بالطلبات المخصصة."
        : language === 'zh'
          ? "自1999年以来的优质工业和斯堪的纳维亚家具。为印度尼西亚的咖啡馆、餐厅和企业提供服务。欢迎定制家具订单。"
          : language === 'ja'
            ? "1999年以来のプレミアム家具。インドネシア全土のカフェ、レストラン、ビジネスに対応。カスタムオーダーも承ります。"
            : language === 'es'
              ? "Muebles industriales y escandinavos premium desde 1999. Sirviendo a cafeterías, restaurantes y negocios en toda Indonesia. Pedidos personalizados bienvenidos."
              : language === 'fr'
                ? "Meubles industriels et scandinaves premium depuis 1999. Au service des cafés, restaurants et entreprises en Indonésie. Commandes personnalisées bienvenues."
                : "Premium industrial & scandinavian furniture since 1999. Serving coffee shops, restaurants, and businesses across Indonesia. Custom furniture orders welcome.",
    ogTitle: language === 'id'
      ? "agricultural commodities Besi Custom Bekasi | Cafe & Restoran"
      : language === 'ar'
        ? "أثاث صناعي من الحديد مخصص بيكاسي | للمقاهي والمطاعم"
        : language === 'zh'
          ? "勿加泗定制工业铁艺家具 | 咖啡馆和餐厅"
          : language === 'ja'
            ? "ブカシ カスタムインダストリアル鉄家具 | カフェ＆レストラン"
            : language === 'es'
              ? "Muebles Industriales de Hierro Personalizados Bekasi | Café y Restaurante"
              : language === 'fr'
                ? "Mobilier Industriel en Fer Sur Mesure Bekasi | Café & Restaurant"
                : "Agricultural Commodities Besi Custom Bekasi | Cafe & Restoran",
    ogDescription: language === 'id'
      ? "Manufacturer agricultural commodities: bar set outdoor, lounge set, sofa bench, storage rack, new arrivals untuk cafe restoran hotel. Workshop Bekasi 25+ tahun. Harga pabrik."
      : language === 'ar'
        ? "مصنع الأثاث الصناعي: طقم بار خارجي، طقم صالة، أريكة، رفوف تخزين للمقاهي والمطاعم والفنادق. ورشة بيكاسي 25+ عام. أسعار المصنع."
        : language === 'zh'
          ? "工业家具制造商：户外吧台套装、休息区套装、沙发长椅、储物架，适用于咖啡馆、餐厅、酒店。勿加泗工作坊25年以上。工厂价格。"
          : language === 'ja'
            ? "インダストリアル家具メーカー：屋外バーセット、ラウンジセット、ソファベンチ、収納ラック、カフェ・レストラン・ホテル向け。ブカシ工房25年以上。工場価格。"
            : language === 'es'
              ? "Fabricante de muebles industriales: set de bar exterior, set de sala, sofá banco, estantería de almacenamiento para cafés, restaurantes, hoteles. Taller Bekasi 25+ años. Precios de fábrica."
              : language === 'fr'
                ? "Fabricant de meubles industriels : set de bar extérieur, set de salon, banc canapé, étagère de rangement pour cafés, restaurants, hôtels. Atelier Bekasi 25+ ans. Prix d'usine."
                : "Manufacturer Agricultural Commodities: bar set outdoor, lounge set, sofa bench, storage rack, new arrivals for cafes restaurants hotels. Bekasi workshop 25+ years. Factory prices."
  }

  return (
    <div className="home">
      <CatalogModal />
      <Helmet htmlAttributes={{ lang: language === 'ar' ? 'ar' : (language === 'zh' ? 'zh' : (language === 'ja' ? 'ja' : (language === 'es' ? 'es' : (language === 'fr' ? 'fr' : (language === 'ko' ? 'ko' : localeMeta.lang))))), dir: language === 'ar' ? 'rtl' : 'ltr', 'data-language': language }}>
        <title>{translations.title}</title>
        <meta name="description" content={translations.description} />
        <meta name="keywords" content="agricultural commodities indonesia, furniture besi custom, furniture bekasi, agricultural commodities jakarta, meja industrial, kursi bar industrial, furniture cafe, furniture restoran, manufacturer agricultural commodities, furniture besi custom bekasi, workshop furniture bekasi, agricultural commodities jabodetabek, bar set outdoor, lounge set, sofa bench, storage rack, display rack, meja kursi cafe, Naturra Extal" />
        <meta httpEquiv="content-language" content={localeMeta.lang} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={translations.ogTitle} />
        <meta property="og:description" content={translations.ogDescription} />
        <meta property="og:image" content="https://Naturra-living.com/og-image.jpg" />
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="agricultural commodities Bar Set Lounge Set Storage - Naturra Extal" />
        <meta name="twitter:description" content="Bar set outdoor, lounge set sofa bench, storage rack, new arrivals agricultural commodities untuk cafe restoran hotel. Workshop Bekasi 25+ tahun." />
        <meta name="twitter:image" content="https://Naturra-living.com/og-image.jpg" />

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
            "name": "agricultural commodities Naturra Extal",
            "description": "Koleksi agricultural commodities besi custom untuk cafe, restoran, dan hotel",
            "numberOfItems": ALL_PRODUCTS.length,
            "itemListElement": ALL_PRODUCTS.map((product, index) => {
              const imageUrl = getProductImageUrl(product.image, product.slug)
              const priceNumeric = product.price.replace(/[^\d]/g, '')
              const description = `Agricultural Commodities ${product.name} by Naturra Extal. Premium quality furniture made in Indonesia since 1999.`

              return {
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": product.name,
                  "description": description,
                  "image": imageUrl,
                  "url": `https://Naturra-living.com/product/${product.slug}`,
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
                    "url": `https://Naturra-living.com/product/${product.slug}`,
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
                      "url": "https://Naturra-living.com",
                      "logo": "https://Naturra-living.com/logo.png",
                      "image": "https://Naturra-living.com/og-image.jpg",
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
              "image": "https://Naturra-living.com/og-image.jpg",
              "@id": "https://Naturra-living.com",
              "url": "https://Naturra-living.com",
              "telephone": "+6288801146881",
              "email": "lifewithNaturra@gmail.com",
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
      <Header isIndonesian={isIndonesian} language={language} />
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
