import React, { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ChevronDown } from 'lucide-react'
import NaturraHeader from '../components/NaturraHeader'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import CategoryAIContent from '../components/CategoryAIContent'
import CurrencyHighlight from '../components/CurrencyHighlight'
import { ALL_PRODUCTS } from '../data/products'
import { CATEGORIES } from '../data/categories'
import { generateMerchantStructuredData } from '../utils/structuredData'
import { generateLanguageSpecificMeta, generateLocalizedUrls, getProductImageUrl } from '../utils/seo'
import { convertIDRToUSD, convertIDRToCurrency } from '../utils/currencyConverter'
import { getProductName } from '../data/productDescriptions'
import { getCurrentLanguage, type LanguageCode } from '../utils/languageManager'
import { translateCategories } from '../utils/categoryTranslations'
import './ProductCategory.css'
import './Shop.css'

const PRODUCTS_PER_PAGE = 24

// Language to currency mapping (only non-IDR highlight currencies)
const LANGUAGE_CURRENCY_MAP: { [key in LanguageCode]: 'KRW' | 'JPY' | 'CNY' | 'SAR' | 'EUR' | 'USD' | null } = {
  'ko': 'KRW',
  'ja': 'JPY',
  'zh': 'CNY',
  'ar': 'SAR',
  'es': 'EUR',
  'fr': 'EUR',
  'en': 'USD', // English highlights USD
  'id': null   // Indonesian highlights IDR (original price)
}

const Shop: React.FC = () => {
  const [sortBy, setSortBy] = useState('default')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 60000000])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isIndonesian, setIsIndonesian] = useState(false)
  const [language, setLanguage] = useState<LanguageCode>('en')
  const [usdPrices, setUsdPrices] = useState<{ [key: number]: string }>({})
  const [highlightedPrices, setHighlightedPrices] = useState<{ [key: number]: string }>({})
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  // Language detection - instant, no async needed!
  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname, location.search)
    setLanguage(currentLang)
    setIsIndonesian(currentLang === 'id')
  }, [location.pathname, location.search])

  useEffect(() => {
    const convertPrices = async () => {
      const usdPriceMap: { [key: number]: string } = {}
      const highlightedPriceMap: { [key: number]: string } = {}

      const targetCurrency = LANGUAGE_CURRENCY_MAP[language]

      for (const product of ALL_PRODUCTS) {
        // Always convert to USD
        const usdPrice = await convertIDRToUSD(product.price)

        let primaryPrice = usdPrice
        let secondaryUsdLabel = usdPrice

        if (language === 'id') {
          // Indonesian: highlight IDR, show USD as secondary
          primaryPrice = product.price
          secondaryUsdLabel = usdPrice
        } else if (language === 'en') {
          // English: highlight USD, show IDR as secondary
          primaryPrice = usdPrice
          secondaryUsdLabel = product.price
        } else if (targetCurrency && targetCurrency !== 'USD') {
          // Other languages with local highlight currency
          const highlightedPrice = await convertIDRToCurrency(product.price, targetCurrency)
          primaryPrice = highlightedPrice
          secondaryUsdLabel = usdPrice
        }

        usdPriceMap[product.id] = secondaryUsdLabel
        highlightedPriceMap[product.id] = primaryPrice
      }

      setUsdPrices(usdPriceMap)
      setHighlightedPrices(highlightedPriceMap)
    }
    convertPrices()
  }, [language])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
    setCurrentPage(1)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...priceRange]
    const newValue = parseInt(e.target.value)

    if (index === 0) {
      // Min slider - ensure it doesn't exceed max
      newRange[0] = Math.min(newValue, priceRange[1])
    } else {
      // Max slider - ensure it doesn't go below min
      newRange[1] = Math.max(newValue, priceRange[0])
    }

    setPriceRange(newRange as [number, number])
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 60000000])
    setCurrentPage(1)
  }

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...ALL_PRODUCTS]

    // Filter by category
    if (selectedCategories.length > 0) {
      products = products.filter(product =>
        product.categories.some(cat => selectedCategories.includes(cat))
      )
    }

    // Filter by price
    products = products.filter(product => {
      const price = parseInt(product.price.replace(/\D/g, ''))
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort
    if (sortBy === 'price-low') {
      products = products.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\D/g, ''))
        const priceB = parseInt(b.price.replace(/\D/g, ''))
        return priceA - priceB
      })
    } else if (sortBy === 'price-high') {
      products = products.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\D/g, ''))
        const priceB = parseInt(b.price.replace(/\D/g, ''))
        return priceB - priceA
      })
    }

    return products
  }, [sortBy, selectedCategories, priceRange])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  const getPaginationRange = () => {
    const range: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) range.push(i)
        range.push('...')
        range.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        range.push(1)
        range.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) range.push(i)
      } else {
        range.push(1)
        range.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) range.push(i)
        range.push('...')
        range.push(totalPages)
      }
    }

    return range
  }

  // Translations for Shop page
  const shopTranslations = {
    id: {
      home: 'Beranda',
      shop: 'Toko',
      allProduct: 'Semua Produk',
      categories: 'Kategori',
      price: 'Harga',
      clearAll: 'Hapus Semua',
      filters: 'Filter',
      sortBy: 'Urutkan',
      default: 'Default',
      priceLow: 'Harga: Rendah ke Tinggi',
      priceHigh: 'Harga: Tinggi ke Rendah',
      showing: 'Menampilkan',
      of: 'dari',
      results: 'hasil',
      prev: 'Sebelumnya',
      next: 'Selanjutnya',
      page: 'Halaman'
    },
    en: {
      home: 'Home',
      shop: 'Shop',
      allProduct: 'All Product',
      categories: 'Categories',
      price: 'Price',
      clearAll: 'Clear All',
      filters: 'Filters',
      sortBy: 'Sort by',
      default: 'Default',
      priceLow: 'Price: Low to High',
      priceHigh: 'Price: High to Low',
      showing: 'Showing',
      of: 'of',
      results: 'results',
      prev: 'Prev',
      next: 'Next',
      page: 'Page'
    },
    ar: {
      home: 'الرئيسية',
      shop: 'المتجر',
      allProduct: 'جميع المنتجات',
      categories: 'الفئات',
      price: 'السعر',
      clearAll: 'مسح الكل',
      filters: 'المرشحات',
      sortBy: 'ترتيب حسب',
      default: 'افتراضي',
      priceLow: 'السعر: من الأقل إلى الأعلى',
      priceHigh: 'السعر: من الأعلى إلى الأقل',
      showing: 'عرض',
      of: 'من',
      results: 'نتيجة',
      prev: 'السابق',
      next: 'التالي',
      page: 'صفحة'
    },
    zh: {
      home: '首页',
      shop: '商店',
      allProduct: '所有产品',
      categories: '类别',
      price: '价格',
      clearAll: '清除全部',
      filters: '筛选',
      sortBy: '排序',
      default: '默认',
      priceLow: '价格：从低到高',
      priceHigh: '价格：从高到低',
      showing: '显示',
      of: '共',
      results: '个结果',
      prev: '上一页',
      next: '下一页',
      page: '页'
    },
    ja: {
      home: 'ホーム',
      shop: 'ショップ',
      allProduct: 'すべての商品',
      categories: 'カテゴリー',
      price: '価格',
      clearAll: 'すべてクリア',
      filters: 'フィルター',
      sortBy: '並び替え',
      default: 'デフォルト',
      priceLow: '価格：安い順',
      priceHigh: '価格：高い順',
      showing: '表示中',
      of: '/',
      results: '件',
      prev: '前へ',
      next: '次へ',
      page: 'ページ'
    },
    es: {
      home: 'Inicio',
      shop: 'Tienda',
      allProduct: 'Todos los Productos',
      categories: 'Categorías',
      price: 'Precio',
      clearAll: 'Limpiar Todo',
      filters: 'Filtros',
      sortBy: 'Ordenar por',
      default: 'Predeterminado',
      priceLow: 'Precio: Menor a Mayor',
      priceHigh: 'Precio: Mayor a Menor',
      showing: 'Mostrando',
      of: 'de',
      results: 'resultados',
      prev: 'Anterior',
      next: 'Siguiente',
      page: 'Página'
    },
    fr: {
      home: 'Accueil',
      shop: 'Boutique',
      allProduct: 'Tous les Produits',
      categories: 'Catégories',
      price: 'Prix',
      clearAll: 'Tout Effacer',
      filters: 'Filtres',
      sortBy: 'Trier par',
      default: 'Par Défaut',
      priceLow: 'Prix: Croissant',
      priceHigh: 'Prix: Décroissant',
      showing: 'Affichage',
      of: 'sur',
      results: 'résultats',
      prev: 'Précédent',
      next: 'Suivant',
      page: 'Page'
    },
    ko: {
      home: '홈',
      shop: '쇼핑',
      allProduct: '모든 제품',
      categories: '카테고리',
      price: '가격',
      clearAll: '모두 지우기',
      filters: '필터',
      sortBy: '정렬',
      default: '기본',
      priceLow: '가격: 낮은순',
      priceHigh: '가격: 높은순',
      showing: '표시 중',
      of: '/',
      results: '개',
      prev: '이전',
      next: '다음',
      page: '페이지'
    }
  }

  const t = shopTranslations[language] || shopTranslations.en

  const breadcrumbItems = [
    { label: t.home, path: '/' },
    { label: t.shop, path: '/shop' }
  ]

  const localeMeta = generateLanguageSpecificMeta(isIndonesian)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  return (
    <div className="product-category-page shop-page-layout">
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>All Products - Cocoa, Cloves, Cocopeat & Agricultural Commodities | Naturra Extal</title>
        <meta name="description" content="Browse all Agricultural Commodities: Premium Cocoa Powder, Indonesian Cloves, and Cocopeat Media. Export quality products from Bekasi Indonesia." />
        <meta name="keywords" content="cocoa powder, indonesian cloves, cocopeat media, spices and herbs, essential oils, agricultural commodities exporter, Naturra Extal, export quality" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`shop-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}

        {/* Open Graph */}
        <meta property="og:title" content="All Products - Cocoa, Cloves, & Agricultural Commodities | Naturra Extal" />
        <meta property="og:description" content="Browse our complete collection of premium agricultural commodities including Cocoa Powder, Indonesian Cloves, and Cocopeat." />
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Indonesian Agricultural Commodities - Naturra Extal" />
        <meta name="twitter:description" content="Explore our premium collection of Cocoa, Cloves, and Cocopeat agricultural commodities at Naturra Extal." />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Agricultural Commodities Collection - Naturra Extal",
            "description": "Browse our complete collection of Agricultural Commodities: Cocoa, Cloves, and Cocopeat. Premium quality products exported from Indonesia since 1999.",
            "url": "https://naturraextal.com/shop",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": ALL_PRODUCTS.length,
              "itemListElement": ALL_PRODUCTS.map((product, index) => {
                const imageUrl = getProductImageUrl(product.image, product.slug)
                const priceNumeric = product.price.replace(/[^\d]/g, '')
                const description = `${product.name} agricultural commodity by Naturra Extal. Premium quality product from Indonesia since 1999.`

                return {
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Product",
                    "name": product.name,
                    "description": description,
                    "url": `https://naturraextal.com/product/${product.slug}`,
                    "image": imageUrl,
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
            }
          })}
        </script>

        {/* Merchant Schema */}
        <script type="application/ld+json">
          {JSON.stringify(generateMerchantStructuredData())}
        </script>
      </Helmet>

      <NaturraHeader isIndonesian={isIndonesian} language={language} />
      <CurrencyHighlight isIndonesian={isIndonesian} language={language} />

      <main className="category-main">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />

          <h1 className="category-page-title">{t.allProduct}</h1>

          {/* Mobile Filter Toggle */}
          <div className="mobile-filter-toggle">
            <button
              className="filter-toggle-btn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span>{t.filters}</span>
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="shop-layout">
            {/* Sidebar */}
            <aside className={`shop-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
              <div className="filter-section">
                <h3 className="filter-title">{t.categories}</h3>
                <div className="filter-options">
                  {CATEGORIES.map(category => (
                    <label key={category} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <span>{translateCategories([category], language)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3 className="filter-title">{t.price}</h3>
                <div className="price-range">
                  <div className="dual-range-slider">
                    <input
                      type="range"
                      min="0"
                      max="60000000"
                      step="100000"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="price-slider price-slider-min"
                    />
                    <input
                      type="range"
                      min="0"
                      max="60000000"
                      step="100000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="price-slider price-slider-max"
                    />
                  </div>
                  <div className="price-labels">
                    <span>Rp{priceRange[0].toLocaleString('id-ID')}</span>
                    <span>Rp{priceRange[1].toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              <button className="clear-filters-btn" onClick={clearFilters}>
                {t.clearAll}
              </button>
            </aside>

            {/* Main Content */}
            <div className="shop-content">
              <div className="category-controls">
                <p className="showing-results">
                  {t.showing} {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} {t.of} {filteredAndSortedProducts.length} {t.results}
                </p>

                <div className="sort-dropdown">
                  <button
                    className="sort-button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {t.sortBy}: {sortBy === 'default' ? t.default : sortBy === 'price-low' ? t.priceLow : t.priceHigh}
                    <ChevronDown size={16} />
                  </button>

                  {isDropdownOpen && (
                    <div className="sort-options">
                      <button onClick={() => { setSortBy('default'); setIsDropdownOpen(false); }}>{t.default}</button>
                      <button onClick={() => { setSortBy('price-low'); setIsDropdownOpen(false); }}>{t.priceLow}</button>
                      <button onClick={() => { setSortBy('price-high'); setIsDropdownOpen(false); }}>{t.priceHigh}</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="category-products-grid">
                {currentProducts.map((product) => {
                  const translatedName = getProductName(product.slug, language) || product.name
                  return (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      className="category-product-card"
                    >
                      <div className="category-product-image">
                        <img
                          src={product.image}
                          alt={`${translatedName} - Agricultural Commodities ${product.categories.join(' ')} Naturra Extal Shop`}
                          title={`${translatedName} - Premium Agricultural Commodities ${product.categories.join(' ')} - Shop Now`}
                          loading="lazy"
                          width="300"
                          height="200"
                          itemProp="image"
                          data-image-type="shop-product"
                          data-product-name={translatedName}
                          data-product-slug={product.slug}
                          data-category={product.categories.join(',')}
                        />
                      </div>
                      <div className="category-product-info">
                        <h3 className="category-product-name">{translatedName}</h3>
                        <p className="category-product-cats">{translateCategories(product.categories, language)}</p>
                        {usdPrices[product.id] && highlightedPrices[product.id] ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {/* Highlighted currency based on language */}
                            <p
                              className="category-product-price"
                              style={{
                                margin: 0,
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: '#333'
                              }}
                            >
                              {highlightedPrices[product.id]}
                            </p>
                            {/* USD always non-highlighted */}
                            <p
                              style={{
                                margin: 0,
                                fontSize: '0.75rem',
                                fontWeight: 400,
                                color: '#999'
                              }}
                            >
                              {usdPrices[product.id]}
                            </p>
                          </div>
                        ) : (
                          <p className="category-product-price">{product.price}</p>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn pagination-prev"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    {t.prev}
                  </button>

                  {getPaginationRange().map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="pagination-ellipsis">&hellip;</span>
                    ) : (
                      <button
                        key={page}
                        className={`pagination-btn pagination-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page as number)}
                      >
                        {t.page} {page}
                      </button>
                    )
                  ))}

                  <button
                    className="pagination-btn pagination-next"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    {t.next}
                  </button>
                </div>
              )}

              {/* AI-Optimized Content for Shop Page */}
              <CategoryAIContent
                category="All Products"
                productCount={ALL_PRODUCTS.length}
                isIndonesian={isIndonesian}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer isIndonesian={isIndonesian} language={language} />
    </div>
  )
}

export default Shop

