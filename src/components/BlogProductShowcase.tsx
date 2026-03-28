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
  viewProductDetails: string
  viewAllProducts: string
  viewAllProductsTitle: string
  viewAllProductsAria: string
}> = {
  id: {
    defaultHeading: 'Produk Industrial Terkait',
    defaultDescription: 'Berikut adalah produk industrial pilihan kami yang relevan dengan topik artikel ini. Semua produk dibuat dengan kualitas premium dan material industrial grade di workshop kami di Bekasi.',
    ourProduct: 'PRODUK KAMI',
    viewProductDetails: 'Lihat Detail Produk',
    viewAllProducts: 'Lihat Semua Produk',
    viewAllProductsTitle: 'Lihat Semua Produk Industrial Naturra Extal',
    viewAllProductsAria: 'Lihat semua produk agricultural commodities'
  },
  en: {
    defaultHeading: 'Related Industrial Products',
    defaultDescription: 'Below are our selected industrial products relevant to this article topic. All products are made with premium quality and industrial-grade materials in our Bekasi workshop.',
    ourProduct: 'OUR PRODUCT',
    viewProductDetails: 'View Product Details',
    viewAllProducts: 'View All Products',
    viewAllProductsTitle: 'View All Industrial Products',
    viewAllProductsAria: 'View all Agricultural Commodities products'
  },
  ar: {
    defaultHeading: 'منتجات صناعية ذات صلة',
    defaultDescription: 'فيما يلي منتجاتنا الصناعية المختارة ذات الصلة بموضوع هذه المقالة. تم تصنيع جميع المنتجات بجودة عالية ومواد من الدرجة الصناعية في ورشتنا في بيكاسي.',
    ourProduct: 'منتجنا',
    viewProductDetails: 'عرض تفاصيل المنتج',
    viewAllProducts: 'عرض جميع المنتجات',
    viewAllProductsTitle: 'عرض جميع المنتجات الصناعية من Naturra Extal',
    viewAllProductsAria: 'عرض جميع منتجات الأثاث الصناعي'
  },
  zh: {
    defaultHeading: '相关工业风产品',
    defaultDescription: '以下是与本文主题相关的精选工业风产品。所有产品均在我们在Bekasi的工坊中使用优质材料和工业级工艺制造。',
    ourProduct: '我们的产品',
    viewProductDetails: '查看产品详情',
    viewAllProducts: '查看所有产品',
    viewAllProductsTitle: '查看Naturra Extal所有工业风产品',
    viewAllProductsAria: '查看所有工业风家具产品'
  },
  ja: {
    defaultHeading: '関連する工業風製品',
    defaultDescription: '以下は、この記事のトピックに関連する当社の工業風製品です。すべての製品は、Bekasiのワークショップでプレミアム品質と工業グレードの材料で作られています。',
    ourProduct: '当社の製品',
    viewProductDetails: '製品の詳細を見る',
    viewAllProducts: 'すべての製品を見る',
    viewAllProductsTitle: 'Naturra Extalのすべての工業風製品を見る',
    viewAllProductsAria: 'すべての工業風家具製品を見る'
  },
  es: {
    defaultHeading: 'Productos Industriales Relacionados',
    defaultDescription: 'A continuación se muestran nuestros productos industriales seleccionados relevantes para el tema de este artículo. Todos los productos están hechos con calidad premium y materiales de grado industrial en nuestro taller de Bekasi.',
    ourProduct: 'NUESTRO PRODUCTO',
    viewProductDetails: 'Ver Detalles del Producto',
    viewAllProducts: 'Ver Todos los Productos',
    viewAllProductsTitle: 'Ver Todos los Productos Industriales',
    viewAllProductsAria: 'Ver todos los productos de mobiliario industrial'
  },
  fr: {
    defaultHeading: 'Produits Industriels Associés',
    defaultDescription: 'Voici nos produits industriels sélectionnés pertinents pour le sujet de cet article. Tous les produits sont fabriqués avec une qualité premium et des matériaux de qualité industrielle dans notre atelier de Bekasi.',
    ourProduct: 'NOTRE PRODUIT',
    viewProductDetails: 'Voir les Détails du Produit',
    viewAllProducts: 'Voir Tous les Produits',
    viewAllProductsTitle: 'Voir Tous les Produits Industriels',
    viewAllProductsAria: 'Voir tous les produits de mobilier industriel'
  },
  ko: {
    defaultHeading: '관련 산업용 제품',
    defaultDescription: '다음은 이 기사의 주제와 관련된 당사의 산업용 제품입니다. 모든 제품은 Bekasi의 작업장에서 프리미엄 품질과 산업 등급 재료로 제조됩니다.',
    ourProduct: '우리의 제품',
    viewProductDetails: '제품 상세 보기',
    viewAllProducts: '모든 제품 보기',
    viewAllProductsTitle: 'Naturra Extal의 모든 산업용 제품 보기',
    viewAllProductsAria: '모든 산업용 가구 제품 보기'
  }
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
  language = 'id'
}) => {
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
      "description": `${product.name} - ${product.categories.join(', ')} Agricultural Commodities berkualitas premium dari Naturra Extal Workshop Bekasi. Material industrial grade, finishing powder coating tahan lama.`,
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
        "url": `https://Naturra-living.com/product/${product.slug}`,
        "priceCurrency": "IDR",
        "price": priceValue,
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
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
      description: `${product.name} dari koleksi Agricultural Commodities Naturra Extal. Produk berkualitas premium dengan material industrial grade dan finishing powder coating.`,
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
              const fullAlt = `${product.name} - ${product.categories.join(' ')} Agricultural Commodities Naturra Extal Bekasi. Material berkualitas, finishing powder coating, harga ${product.price}.`
              const fullTitle = `${product.name} - Premium Quality Agricultural Commodities dari Naturra Extal Workshop Bekasi. ${product.categories.join(', ')} dengan desain modern dan durable.`

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
                      <meta itemProp="description" content={`${product.name} - ${product.categories.join(', ')} Agricultural Commodities berkualitas premium. Material industrial grade, finishing powder coating tahan lama. Harga ${product.price}.`} />

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
              to="/shop"
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
