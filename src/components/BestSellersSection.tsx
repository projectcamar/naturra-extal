import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ALL_PRODUCTS } from '../data/products'
import { convertIDRToUSD, convertIDRToCurrency } from '../utils/currencyConverter'
import { translateCategories } from '../utils/categoryTranslations'
import { getProductName } from '../data/productDescriptions'
import './BestSellersSection.css'

interface BestSellersSectionProps {
  isIndonesian?: boolean
  language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'
}

// Best Sellers - first 8 products
const products = ALL_PRODUCTS.slice(0, 8).map(p => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  categories: p.categories,
  price: p.price,
  image: p.image,
  link: `/product/${p.slug}`
}))

// Language to currency mapping (only non-IDR highlight currencies)
const LANGUAGE_CURRENCY_MAP: { [key in 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko']: 'KRW' | 'JPY' | 'CNY' | 'SAR' | 'EUR' | 'USD' | null } = {
  'ko': 'KRW',
  'ja': 'JPY',
  'zh': 'CNY',
  'ar': 'SAR',
  'es': 'EUR',
  'fr': 'EUR',
  'en': 'USD', // English highlights USD
  'id': null   // Indonesian highlights IDR (original price)
}

const BestSellersSection: React.FC<BestSellersSectionProps> = ({ isIndonesian = false, language = 'en' }) => {
  const getTitle = () => {
    switch (language) {
      case 'id': return 'Produk Terlaris'
      case 'ar': return 'الأكثر مبيعاً'
      case 'zh': return '畅销品'
      case 'ja': return 'ベストセラー'
      case 'es': return 'Más Vendidos'
      case 'fr': return 'Meilleures Ventes'
      case 'ko': return '베스트셀러'
      default: return 'Best Sellers'
    }
  }

  const getViewAllText = () => {
    switch (language) {
      case 'id': return 'LIHAT SEMUA'
      case 'ar': return 'عرض الكل'
      case 'zh': return '查看全部'
      case 'ja': return 'すべて見る'
      case 'es': return 'VER TODO'
      case 'fr': return 'VOIR TOUT'
      case 'ko': return '전체보기'
      default: return 'VIEW ALL'
    }
  }
  const [currentIndex, setCurrentIndex] = useState(0)
  const [usdPrices, setUsdPrices] = useState<{ [key: number]: string }>({})
  const [highlightedPrices, setHighlightedPrices] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    const convertPrices = async () => {
      const usdPriceMap: { [key: number]: string } = {}
      const highlightedPriceMap: { [key: number]: string } = {}

      const targetCurrency = LANGUAGE_CURRENCY_MAP[language] || 'USD'

      for (const product of products) {
        // Always convert to USD
        const usdPrice = await convertIDRToUSD(product.price)
        usdPriceMap[product.id] = usdPrice

        // Determine highlighted price based on language
        if (language === 'id') {
          // Indonesian: highlight IDR (original price), show USD as secondary
          highlightedPriceMap[product.id] = product.price
        } else if (language === 'en') {
          // English: highlight USD, show IDR as secondary
          highlightedPriceMap[product.id] = usdPrice
        } else if (targetCurrency && targetCurrency !== 'USD') {
          // Other languages with local highlight currency
          const highlightedPrice = await convertIDRToCurrency(product.price, targetCurrency)
          highlightedPriceMap[product.id] = highlightedPrice
        } else {
          // Fallback: use USD
          highlightedPriceMap[product.id] = usdPrice
        }
      }

      setUsdPrices(usdPriceMap)
      setHighlightedPrices(highlightedPriceMap)
    }
    convertPrices()
  }, [language])
  const itemsPerPage = 4

  const nextSlide = () => {
    if (currentIndex < products.length - itemsPerPage) {
      setCurrentIndex(currentIndex + itemsPerPage)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage)
    }
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage)
  const totalDots = Math.ceil(products.length / itemsPerPage)

  return (
    <section className="bestsellers-section">
      <div className="container">
        <div className="section-header-row">
          <h2 className="bestsellers-title">
            {getTitle()}
          </h2>
          <Link to="/product-tag/best-seller" className="view-all-link">
            {getViewAllText()}
          </Link>
        </div>

        <div className="bestsellers-carousel">
          {currentIndex > 0 && (
            <button
              className="carousel-btn carousel-btn-prev"
              onClick={prevSlide}
              aria-label="Previous products"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="products-grid">
            {visibleProducts.map((product) => {
              const translatedName = getProductName(product.slug, language) || product.name
              return (
                <Link
                  key={product.id}
                  to={product.link}
                  className="product-card"
                >
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={`${translatedName} - Agricultural Commodities ${product.categories.join(' ')} Naturra Extal Bekasi`}
                      title={`${translatedName} - Premium Agricultural Commodities by Naturra Extal`}
                      className="product-image"
                      loading="lazy"
                      width="300"
                      height="200"
                      itemProp="image"
                      data-image-type="product"
                      data-product-name={translatedName}
                      data-category={product.categories.join(',')}
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{translatedName}</h3>
                    <p className="product-categories">{translateCategories(product.categories, language)}</p>
                    {usdPrices[product.id] && highlightedPrices[product.id] ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {/* Highlighted currency based on language */}
                        <p
                          className="product-price"
                          style={{
                            margin: 0,
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: '#333'
                          }}
                        >
                          {highlightedPrices[product.id]}
                        </p>
                        {/* Secondary currency (opposite of highlighted) */}
                        <p
                          style={{
                            margin: 0,
                            fontSize: '0.75rem',
                            fontWeight: 400,
                            color: '#999'
                          }}
                        >
                          {language === 'en' ? product.price : usdPrices[product.id]}
                        </p>
                      </div>
                    ) : (
                      <p className="product-price">{product.price}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>

          {currentIndex < products.length - itemsPerPage && (
            <button
              className="carousel-btn carousel-btn-next"
              onClick={nextSlide}
              aria-label="Next products"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {totalDots > 1 && (
          <div className="carousel-dots">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === Math.floor(currentIndex / itemsPerPage) ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BestSellersSection
