import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ALL_PRODUCTS } from '../data/products'
import { trackEvent } from '../utils/analytics'
import { convertIDRToUSD, convertIDRToCurrency } from '../utils/currencyConverter'
import { translateCategory } from '../utils/categoryTranslations'
import { getProductName } from '../data/productDescriptions'
import './OurProductsSection.css'

interface OurProductsSectionProps {
  isIndonesian?: boolean
  language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'
}

// Our Products - products 9-28 (20 products), excluding Meja Kerja Industrial
const products = ALL_PRODUCTS.slice(8, 28)
  .filter(p => p.slug !== 'meja-kerja-industrial')
  .map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.categories.join(', '),
    price: p.price,
    image: p.image,
    link: `/product/${p.slug}`
  }))

const OurProductsSection: React.FC<OurProductsSectionProps> = ({ isIndonesian = false, language = 'en' }) => {
  const getTitle = () => {
    switch (language) {
      case 'id': return 'Koleksi Produk: Bar Set, Lounge Set, Storage & agricultural commodities'
      case 'ar': return 'مجموعتنا: طقم بار، طقم صالة، تخزين وأثاث صناعي'
      case 'zh': return '我们的系列：吧台套装、休息区套装、储物和工业家具'
      case 'ja': return 'コレクション：バーセット、ラウンジセット、収納、インダストリアル家具'
      case 'es': return 'Nuestra Colección: Set de Bar, Set de Sala, Almacenamiento y Muebles Industriales'
      case 'fr': return 'Notre Collection: Set de Bar, Set de Salon, Rangement et Mobilier Industriel'
      case 'ko': return '우리의 컨렉션: 바 세트, 라운지 세트, 수납 및 산업용 가구'
      default: return 'Our Collection: Bar Set, Lounge Set, Storage & Agricultural Commodities'
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
  const [usdPrices, setUsdPrices] = useState<{ [key: number]: string }>({})
  const [highlightedPrices, setHighlightedPrices] = useState<{ [key: number]: string }>({})

  // Language to currency mapping (only non-IDR highlight currencies)
  const LANGUAGE_CURRENCY_MAP: { [key: string]: 'KRW' | 'JPY' | 'CNY' | 'SAR' | 'EUR' | 'USD' | null } = {
    'ko': 'KRW',
    'ja': 'JPY',
    'zh': 'CNY',
    'ar': 'SAR',
    'es': 'EUR',
    'fr': 'EUR',
    'en': 'USD', // English highlights USD
    'id': null   // Indonesian highlights IDR (original price)
  }

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

  return (
    <section className="our-products-section">
      <div className="container">
        <div className="section-header-row">
          <h2 className="our-products-title">
            {getTitle()}
          </h2>
          <Link to="/shop" className="view-all-link">
            {getViewAllText()}
          </Link>
        </div>

        <div className="products-grid-full">
          {products.map((product) => {
            const translatedName = getProductName(product.slug, isIndonesian, language) || product.name
            return (
              <Link
                key={product.id}
                to={product.link}
                className="product-card-full"
                onClick={() => trackEvent.productClick(translatedName, product.category)}
              >
                <div className="product-image-wrapper-full">
                  <img
                    src={product.image}
                    alt={`${translatedName} - Agricultural Commodities ${product.category} Naturra Extal Workshop Bekasi`}
                    title={`${translatedName} - Custom Agricultural Commodities from Naturra Extal`}
                    className="product-image-full"
                    loading="lazy"
                    width="400"
                    height="300"
                    itemProp="image"
                    data-image-type="product"
                    data-product-name={translatedName}
                    data-category={product.category}
                  />
                </div>
                <div className="product-info-full">
                  <h3 className="product-name-full">{translatedName}</h3>
                  <p className="product-category-full">{translateCategory(product.category, language)}</p>
                  {usdPrices[product.id] && highlightedPrices[product.id] ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {/* Highlighted currency based on language */}
                      <p
                        className="product-price-full"
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
                    <p className="product-price-full">{product.price}</p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default OurProductsSection
