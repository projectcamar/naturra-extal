import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import type { Product } from '../data/products'
import { convertIDRToUSD, convertIDRToCurrency } from '../utils/currencyConverter'
import { generateImageObjectSchema } from '../utils/structuredData'
import type { LanguageCode } from '../utils/languageManager'
import './BlogProductShowcase.css'
import './DualLanguage.css'

interface BlogProductShowcaseProps {
  products: Product[]
  heading?: string
  description?: string
  language?: LanguageCode
}

const BLOG_PRODUCT_SHOWCASE_TRANSLATIONS: Record<LanguageCode, {
  defaultHeading: string
  defaultDescription: string
  ourProduct: string
  ourCommodity: string
  viewProductDetails: string
  viewAllProducts: string
  viewAllProductsTitle: string
  viewAllProductsAria: string
}> = {
  id: {
    defaultHeading: 'Komoditas Pertanian Terkait',
    defaultDescription: 'Berikut adalah komoditas pertanian pilihan kami yang relevan dengan topik artikel ini. Semua produk memenuhi standar ekspor premium dari fasilitas kami di Bekasi.',
    ourProduct: 'PRODUK KAMI',
    ourCommodity: 'KOMODITAS KAMI',
    viewProductDetails: 'Lihat Detail Produk',
    viewAllProducts: 'Lihat Semua Produk',
    viewAllProductsTitle: 'Lihat Semua Komoditas Pertanian Naturra Extal',
    viewAllProductsAria: 'Lihat semua produk agricultural commodities'
  },
  en: {
    defaultHeading: 'Related Agricultural Commodities',
    defaultDescription: 'Below are our selected agricultural commodities relevant to this article topic. All products meet premium export standards from our Bekasi facility.',
    ourProduct: 'OUR PRODUCT',
    ourCommodity: 'OUR COMMODITY',
    viewProductDetails: 'View Product Details',
    viewAllProducts: 'View All Products',
    viewAllProductsTitle: 'View All Agricultural Commodities',
    viewAllProductsAria: 'View all Agricultural Commodities products'
  },
  ar: {
    defaultHeading: 'السلع الزراعية ذات الصلة',
    defaultDescription: 'فيما يلي سلعنا الزراعية المختارة ذات الصلة بموضوع هذا المقال. تلبي جميع المنتجات معايير التصدير الممتازة من مرفقنا في بيكاسي.',
    ourProduct: 'منتجنا',
    ourCommodity: 'سلعتنا',
    viewProductDetails: 'عرض تفاصيل المنتج',
    viewAllProducts: 'عرض جميع السلع',
    viewAllProductsTitle: 'عرض جميع السلع الزراعية من Naturra Extal',
    viewAllProductsAria: 'عرض جميع منتجات السلع الزراعية'
  },
  zh: {
    defaultHeading: '相关农业大宗商品',
    defaultDescription: '以下是与本文主题相关的精选农业大宗商品。所有产品均符合我们贝卡西工厂的优质出口标准。',
    ourProduct: '我们的产品',
    ourCommodity: '我们的商品',
    viewProductDetails: '查看产品详情',
    viewAllProducts: '查看所有产品',
    viewAllProductsTitle: '查看Naturra Extal所有农业大宗商品',
    viewAllProductsAria: '查看所有农业大宗商品产品'
  },
  ja: {
    defaultHeading: '関連する農業大宗商品',
    defaultDescription: '以下は、この記事のトピックに関連する当社の農業大宗商品です。すべての製品は、ベカシの施設からのプレミアム輸出基準を満たしています。',
    ourProduct: '当社の製品',
    ourCommodity: '当社の商品',
    viewProductDetails: '製品の詳細を見る',
    viewAllProducts: 'すべての製品を見る',
    viewAllProductsTitle: 'Naturra Extalのすべての農業大宗商品を見る',
    viewAllProductsAria: 'すべての農業大宗商品製品を見る'
  },
  es: {
    defaultHeading: 'Materias Primas Agrícolas Relacionadas',
    defaultDescription: 'A continuación se muestran nuestras materias primas agrícolas seleccionadas relevantes para el tema de este artículo. Todos los productos cumplen con los estándares de exportación premium de nuestra instalación de Bekasi.',
    ourProduct: 'NUESTRO PRODUCTO',
    ourCommodity: 'NUESTRA MERCANCÍA',
    viewProductDetails: 'Ver Detalles del Producto',
    viewAllProducts: 'Ver Todos los Productos',
    viewAllProductsTitle: 'Ver Todas las Materias Primas Agrícolas',
    viewAllProductsAria: 'Ver todos los productos de materias primas agrícolas'
  },
  fr: {
    defaultHeading: 'Matières Premières Agricoles Associées',
    defaultDescription: 'Voici nos matières premières agricoles sélectionnées pertinentes pour le sujet de cet article. Tous les produits répondent aux normes d\'exportation premium de notre usine de Bekasi.',
    ourProduct: 'NOTRE PRODUIT',
    ourCommodity: 'NOTRE MARCHANDISE',
    viewProductDetails: 'Voir les Détails du Produit',
    viewAllProducts: 'Voir Tous les Produits',
    viewAllProductsTitle: 'Voir Toutes les Matières Premières Agricoles',
    viewAllProductsAria: 'Voir tous les produits de matières premières agricoles'
  },
  ko: {
    defaultHeading: '관련 농산물',
    defaultDescription: '다음은 이 기사의 주제와 관련된 당사의 농산물입니다. 모든 제품은 베카시 시설의 프리미엄 수출 표준을 충족합니다.',
    ourProduct: '우리의 제품',
    ourCommodity: '우리의 상품',
    viewProductDetails: '제품 상세 보기',
    viewAllProducts: '모든 제품 보기',
    viewAllProductsTitle: 'Naturra Extal의 모든 농산물 보기',
    viewAllProductsAria: '모든 농산물 제품 보기'
  }
}

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

/**
 * Komponen Product Showcase untuk Artikel Blog
 * Menampilkan produk yang relevan dengan konten artikel
 * dengan desain yang menarik dan hard-selling
 */
const BlogProductShowcase: React.FC<BlogProductShowcaseProps> = ({
  products,
  heading,
  description,
  language = 'en'
}) => {
  const [usdPrices, setUsdPrices] = useState<{ [key: number]: string }>({})
  const [highlightedPrices, setHighlightedPrices] = useState<{ [key: number]: string }>({})

  const translations = BLOG_PRODUCT_SHOWCASE_TRANSLATIONS[language] || BLOG_PRODUCT_SHOWCASE_TRANSLATIONS.en

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
  }, [products, language])

  if (!products || products.length === 0) {
    return null
  }

  // Tampilkan maksimal 3 produk untuk compact view
  const displayProducts = products.slice(0, 3)

  // Generate Product schema untuk setiap produk
  const generateProductSchema = (product: Product) => {
    const priceValue = product.price.replace(/[^0-9]/g, '')
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": `${product.name} - ${product.categories.join(', ')} Agricultural Commodities berkualitas premium dari Naturra Extal. Standar kualitas ekspor internasional untuk Cocoa, Cloves, dan Cocopeat.`,
      "image": product.image,
      "category": product.categories.join(', '),
      "brand": {
        "@type": "Brand",
        "name": "Naturra Extal"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Naturra Extal",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bekasi",
          "addressRegion": "Jawa Barat",
          "addressCountry": "ID"
        }
      },
      "offers": {
        "@type": "Offer",
        "url": `https://naturraextal.com/product/${product.slug}`,
        "priceCurrency": "IDR",
        "price": priceValue,
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
        "seller": {
          "@type": "Organization",
          "name": "Naturra Extal",
          "url": "https://naturraextal.com",
          "logo": "https://naturraextal.com/logo.png",
          "image": "https://naturraextal.com/og-image.jpg",
          "description": "Premium Indonesian Agricultural Commodities Exporter. Specializing in Cocoa Powder, Cloves, and Cocopeat Media for Global Markets Since 1999."
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  }

  // Generate ItemList schema untuk showcase collection
  const generateItemListSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": heading,
      "description": description || "Koleksi produk industrial berkualitas premium dari Naturra Extal",
      "itemListElement": displayProducts.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": generateProductSchema(product)
      }))
    }
  }

  // Generate image schemas untuk semua produk
  const productImageSchemas = displayProducts.map(product => {
    return generateImageObjectSchema({
      url: product.image,
      alt: `${product.name} - ${product.categories.join(' ')} Agricultural Commodities Naturra Extal Bekasi`,
      title: `${product.name} - Premium Quality Agricultural Commodities`,
      width: 350,
      height: 250,
      description: `${product.name} dari koleksi Agricultural Commodities Naturra Extal. Produk berkualitas premium dengan standar ekspor internasional.`,
      caption: `${product.name} - ${product.categories.join(', ')} Agricultural Commodities`
    })
  })

  const itemListSchema = generateItemListSchema()

  return (
    <>
      {/* Structured Data for SEO */}
      <Helmet>
        {/* ItemList Schema */}
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>

        {/* Product Schemas */}
        {displayProducts.map((product) => (
          <script key={`product-schema-${product.id}`} type="application/ld+json">
            {JSON.stringify(generateProductSchema(product))}
          </script>
        ))}

        {/* Image Schemas */}
        {productImageSchemas.map((imgSchema, imgIndex) => (
          <script key={`image-schema-${imgIndex}`} type="application/ld+json">
            {JSON.stringify(imgSchema)}
          </script>
        ))}
      </Helmet>

      <section className="blog-product-showcase" itemScope itemType="https://schema.org/ItemList">
        <div className="blog-product-showcase-container">
          <div className="blog-product-showcase-header">
            <h2 className="blog-product-showcase-heading" itemProp="name">
              {heading || translations.defaultHeading}
            </h2>
            {description && (
              <p className="blog-product-showcase-description">
                {description || translations.defaultDescription}
              </p>
            )}
          </div>

          <div className="blog-product-showcase-grid" itemProp="itemListElement" itemScope itemType="https://schema.org/ItemList">
            {displayProducts.map((product, index) => {
              const fullAlt = `${product.name} - ${product.categories.join(' ')} Agricultural Commodities Naturra Extal. Kualitas ekspor premium, pengiriman global, harga ${product.price}.`
              const fullTitle = `${product.name} - Premium Quality Agricultural Commodities dari Naturra Extal. ${product.categories.join(', ')} dengan standar kualitas internasional.`

              return (
                <article
                  key={product.id}
                  itemScope
                  itemType="https://schema.org/Product"
                  className="blog-product-showcase-item"
                  data-item-position={index + 1}
                >
                  <Link
                    to={`/product/${product.slug}`}
                    className="blog-product-showcase-card"
                    title={fullTitle}
                    itemProp="url"
                    rel="nofollow sponsored"
                    aria-label={`${translations.viewProductDetails}: ${product.name}`}
                  >
                    <div className="blog-product-showcase-image-wrapper" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
                      <img
                        src={product.image}
                        alt={fullAlt}
                        title={fullTitle}
                        className="blog-product-showcase-image"
                        loading="lazy"
                        width="350"
                        height="250"
                        itemProp="contentUrl"
                        data-image-type="blog-product-showcase"
                        data-product-name={product.name}
                        data-product-id={product.id}
                        data-product-slug={product.slug}
                        data-category={product.categories.join(',')}
                        data-image-index={index + 1}
                        decoding="async"
                        fetchPriority={index < 2 ? "high" : "low"}
                      />
                      <meta itemProp="caption" content={`${product.name} - ${product.categories.join(', ')} Agricultural Commodities`} />
                      <meta itemProp="description" content={`Produk ${product.name} dengan kualitas premium dari Naturra Extal Workshop Bekasi`} />
                      <meta itemProp="url" content={product.image} />
                      <div className="blog-product-showcase-badge">
                        <span className="blog-product-badge-text">{translations.ourProduct}</span>
                      </div>
                    </div>

                    <div className="blog-product-showcase-info">
                      <h3 className="blog-product-showcase-name" itemProp="name">
                        {product.name}
                      </h3>
                      <meta itemProp="description" content={`${product.name} - ${product.categories.join(', ')} Agricultural Commodities berkualitas premium. Standar ekspor internasional untuk industri global. Harga ${product.price}.`} />

                      <div className="blog-product-showcase-categories">
                        {product.categories.map((cat, idx) => (
                          <span key={idx} className="blog-product-category-tag" itemProp="category">
                            {cat}
                          </span>
                        ))}
                      </div>

                      <div className="blog-product-showcase-price-container" itemScope itemType="https://schema.org/Offer">
                        <meta itemProp="priceCurrency" content="IDR" />
                        <meta itemProp="availability" content="https://schema.org/InStock" />
                        <meta itemProp="price" content={product.price.replace(/[^0-9]/g, '')} />
                        {usdPrices[product.id] && highlightedPrices[product.id] ? (
                          <>
                            <p className="blog-product-showcase-price-primary" itemProp="price">
                              {highlightedPrices[product.id]}
                            </p>
                            <p className="blog-product-showcase-price-secondary">
                              {language === 'en' ? product.price : usdPrices[product.id]}
                            </p>
                          </>
                        ) : (
                          <p className="blog-product-showcase-price-primary" itemProp="price">
                            {product.price}
                          </p>
                        )}
                      </div>

                      <div className="blog-product-showcase-cta">
                        <span className="blog-product-showcase-link">
                          {translations.viewProductDetails}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>

          <div className="blog-product-showcase-footer">
            <Link
              to="/products"
              className="blog-product-showcase-all-products-btn"
              title={translations.viewAllProductsTitle}
              rel="nofollow"
              aria-label={translations.viewAllProductsAria}
            >
              {translations.viewAllProducts}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogProductShowcase

