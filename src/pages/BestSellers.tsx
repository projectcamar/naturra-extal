import React, { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ChevronDown } from 'lucide-react'
import NaturraHeader from '../components/NaturraHeader'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import { ALL_PRODUCTS } from '../data/products'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { getProductName } from '../data/productDescriptions'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import { translateCategories } from '../utils/categoryTranslations'
import './ProductCategory.css'

// Best sellers - first 10 products from ALL_PRODUCTS
const bestSellersProducts = ALL_PRODUCTS.slice(0, 10)

const BestSellers: React.FC = () => {
  const location = useLocation()
  const [language, setLanguage] = useState<LanguageCode>(() => {
    return getCurrentLanguage(location.pathname, location.search)
  })

  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname, location.search)
    if (currentLang !== language) {
      setLanguage(currentLang)
    }
  }, [location.pathname, location.search, language])

  // IP detection for first visit (only if no stored preference)
  useEffect(() => {
    const stored = getStoredLanguage()
    const urlLang = getCurrentLanguage(location.pathname, location.search)

    if (stored || urlLang !== 'en') {
      return
    }

    const detectIP = async () => {
      const ipLang = await detectLanguageFromIP()
      if (ipLang && !stored) {
        setLanguage(ipLang)
      }
    }

    detectIP()
  }, [])

  const isIndonesian = language === 'id'
  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  const [sortBy, setSortBy] = useState('default')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sortedProducts = useMemo(() => {
    let products = [...bestSellersProducts]

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
  }, [sortBy])

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Best Sellers', path: '/product-tag/best-seller' }
  ]

  return (
    <div className="product-category-page">
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>Best Sellers - Naturra Extal</title>
        <meta name="description" content="Browse our best-selling Agricultural Commodities collection at Naturra Extal" />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`best-sellers-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
      </Helmet>

      <NaturraHeader isIndonesian={isIndonesian} language={language} />

      <main className="category-main">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />

          <h1 className="category-page-title">Best Sellers</h1>

          <div className="category-controls">
            <p className="showing-results">
              Showing 1-{sortedProducts.length} of {sortedProducts.length} results
            </p>

            <div className="sort-dropdown">
              <button
                className="sort-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Sort by: {sortBy === 'default' ? 'Default' : sortBy === 'price-low' ? 'Price: Low to High' : 'Price: High to Low'}
                <ChevronDown size={16} />
              </button>

              {isDropdownOpen && (
                <div className="sort-options">
                  <button onClick={() => { setSortBy('default'); setIsDropdownOpen(false); }}>Default</button>
                  <button onClick={() => { setSortBy('price-low'); setIsDropdownOpen(false); }}>Price: Low to High</button>
                  <button onClick={() => { setSortBy('price-high'); setIsDropdownOpen(false); }}>Price: High to Low</button>
                </div>
              )}
            </div>
          </div>

          <div className="category-products-grid">
            {sortedProducts.map((product) => {
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
                      alt={`${translatedName} - Best Seller Agricultural Commodities ${product.categories.join(' ')} Naturra Extal`}
                      title={`${translatedName} - Best Seller ${product.categories.join(' ')} Premium Commodities`}
                      loading="lazy"
                      width="300"
                      height="200"
                      itemProp="image"
                      data-image-type="best-seller"
                      data-product-name={translatedName}
                      data-category={product.categories.join(',')}
                    />
                  </div>
                  <div className="category-product-info">
                    <h3 className="category-product-name">{translatedName}</h3>
                    <p className="category-product-cats">{translateCategories(product.categories, language)}</p>
                    <p className="category-product-price">{product.price}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      <Footer isIndonesian={isIndonesian} language={language} />
    </div>
  )
}

export default BestSellers
