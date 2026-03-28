import { useEffect, useMemo, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import CurrencyHighlight from '../components/CurrencyHighlight'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import { ALL_PRODUCTS } from '../data/products'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { convertIDRToUSD, convertIDRToCurrency } from '../utils/currencyConverter'
import { getProductName } from '../data/productDescriptions'
import { getCurrentLanguage, getStoredLanguage, detectLanguageFromIP, type LanguageCode } from '../utils/languageManager'
import './SearchResults.css'
import '../components/DualLanguage.css'

const SUPPORTED_LANGUAGES: LanguageCode[] = ['id', 'en', 'ar', 'zh', 'ja', 'es', 'fr', 'ko']

const SEARCH_TRANSLATIONS: Record<
  LanguageCode,
  {
    loading: string
    headingWithQuery: (query: string) => string
    headingWithoutQuery: string
    subtitle: string
    languageAdjusting: string
    resultsCount: (count: number) => string
    noResultsWithQuery: (query: string) => string
    noResultsWithoutQuery: string
    sortDefault: string
    sortPriceLow: string
    sortPriceHigh: string
    home: string
    pageTitle: (query?: string) => string
    metaDescription: (query: string, hasQuery: boolean) => string
  }
> = {
  id: {
    loading: 'Memuat...',
    headingWithQuery: (query) => `Hasil Pencarian untuk "${query}"`,
    headingWithoutQuery: 'Hasil Pencarian',
    subtitle: 'Telusuri furniture industrial custom Mangala Living dengan kata kunci favorit Anda.',
    languageAdjusting: 'Menyesuaikan preferensi bahasa…',
    resultsCount: (count) => `${count} produk ditemukan`,
    noResultsWithQuery: (query) => `Tidak ada produk ditemukan untuk "${query}". Coba kata kunci lain.`,
    noResultsWithoutQuery: 'Tidak ada produk ditemukan.',
    sortDefault: 'Urutkan: Relevansi',
    sortPriceLow: 'Harga: Rendah ke Tinggi',
    sortPriceHigh: 'Harga: Tinggi ke Rendah',
    home: 'Beranda',
    pageTitle: (query) => (query ? `Pencarian: ${query} - Mangala Living` : 'Pencarian - Mangala Living'),
    metaDescription: (query, hasQuery) =>
      hasQuery ? `Hasil pencarian untuk ${query}` : 'Hasil pencarian produk Mangala Living.'
  },
  en: {
    loading: 'Loading...',
    headingWithQuery: (query) => `Search Results for "${query}"`,
    headingWithoutQuery: 'Search Results',
    subtitle: 'Discover Mangala Living industrial custom furniture based on your preferred keywords.',
    languageAdjusting: 'Adjusting language preference…',
    resultsCount: (count) => `${count} results found`,
    noResultsWithQuery: (query) => `No products found for "${query}". Try a different search term.`,
    noResultsWithoutQuery: 'No products found.',
    sortDefault: 'Sort by: Relevance',
    sortPriceLow: 'Price: Low to High',
    sortPriceHigh: 'Price: High to Low',
    home: 'Home',
    pageTitle: (query) => (query ? `Search: ${query} - Mangala Living` : 'Search - Mangala Living'),
    metaDescription: (query, hasQuery) =>
      hasQuery ? `Search results for ${query}` : 'Search results for Mangala Living products.'
  },
  ar: {
    loading: 'جارٍ التحميل...',
    headingWithQuery: (query) => `نتائج البحث عن "${query}"`,
    headingWithoutQuery: 'نتائج البحث',
    subtitle: 'اكتشف أثاث Mangala Living الصناعي المخصص حسب كلماتك المفتاحية المفضلة.',
    languageAdjusting: 'جارٍ ضبط تفضيل اللغة…',
    resultsCount: (count) => `${count} نتيجة`,
    noResultsWithQuery: (query) => `لم يتم العثور على منتجات لـ "${query}". جرّب مصطلحاً آخر.`,
    noResultsWithoutQuery: 'لم يتم العثور على منتجات.',
    sortDefault: 'ترتيب: الصلة',
    sortPriceLow: 'السعر: من الأقل إلى الأعلى',
    sortPriceHigh: 'السعر: من الأعلى إلى الأقل',
    home: 'الصفحة الرئيسية',
    pageTitle: (query) => (query ? `بحث: ${query} - Mangala Living` : 'بحث - Mangala Living'),
    metaDescription: (query, hasQuery) =>
      hasQuery ? `نتائج البحث عن ${query}` : 'نتائج البحث عن منتجات Mangala Living.'
  },
  zh: {
    loading: '加载中...',
    headingWithQuery: (query) => `搜索 “${query}” 的结果`,
    headingWithoutQuery: '搜索结果',
    subtitle: '根据关键词探索 Mangala Living 的工业风定制家具。',
    languageAdjusting: '正在调整语言偏好…',
    resultsCount: (count) => `共找到 ${count} 个结果`,
    noResultsWithQuery: (query) => `未找到与 “${query}” 匹配的产品。请尝试其他关键词。`,
    noResultsWithoutQuery: '未找到产品。',
    sortDefault: '排序：相关度',
    sortPriceLow: '价格：从低到高',
    sortPriceHigh: '价格：从高到低',
    home: '首页',
    pageTitle: (query) => (query ? `搜索: ${query} - Mangala Living` : '搜索 - Mangala Living'),
    metaDescription: (query, hasQuery) =>
      hasQuery ? `关于 ${query} 的搜索结果` : 'Mangala Living 产品的搜索结果。'
  },
  ja: {
    loading: '読み込み中...',
    headingWithQuery: (query) => `「${query}」の検索結果`,
    headingWithoutQuery: '検索結果',
    subtitle: 'お好みのキーワードで Mangala Living の工業系カスタム家具を見つけましょう。',
    languageAdjusting: '言語設定を調整しています…',
    resultsCount: (count) => `${count} 件が見つかりました`,
    noResultsWithQuery: (query) => `「${query}」に一致する商品は見つかりませんでした。別のキーワードでお試しください。`,
    noResultsWithoutQuery: '商品が見つかりません。',
    sortDefault: '並び替え: 関連度',
    sortPriceLow: '価格: 低い順',
    sortPriceHigh: '価格: 高い順',
    home: 'ホーム',
    pageTitle: (query) => (query ? `検索: ${query} - Mangala Living` : '検索 - Mangala Living'),
    metaDescription: (query, hasQuery) =>
      hasQuery ? `${query} の検索結果` : 'Mangala Living の商品の検索結果。'
  },
  es: {
    loading: 'Cargando...',
    headingWithQuery: (query) => `Resultados de búsqueda para "${query}"`,
    headingWithoutQuery: 'Resultados de búsqueda',
    subtitle: 'Descubre los muebles industriales personalizados de Mangala Living según tus palabras clave.',
    languageAdjusting: 'Ajustando la preferencia de idioma…',
    resultsCount: (count) => `${count} resultados encontrados`,
    noResultsWithQuery: (query) => `No se encontraron productos para "${query}". Intenta con otro término.`,
    noResultsWithoutQuery: 'No se encontraron productos.',
    sortDefault: 'Ordenar por: Relevancia',
    sortPriceLow: 'Precio: de menor a mayor',
    sortPriceHigh: 'Precio: de mayor a menor',
    home: 'Inicio',
    pageTitle: (query) => (query ? `Búsqueda: ${query} - Mangala Living` : 'Búsqueda - Mangala Living'),
    metaDescription: (query, hasQuery) =>
      hasQuery ? `Resultados de búsqueda para ${query}` : 'Resultados de búsqueda de productos Mangala Living.'
  },
  fr: {
    loading: 'Chargement...',
    headingWithQuery: (query) => `Résultats de recherche pour « ${query} »`,
    headingWithoutQuery: 'Résultats de recherche',
    subtitle: 'Découvrez le mobilier industriel sur mesure Mangala Living selon vos mots-clés préférés.',
    languageAdjusting: 'Ajustement de la langue…',
    resultsCount: (count) => `${count} résultats trouvés`,
    noResultsWithQuery: (query) => `Aucun produit trouvé pour « ${query} ». Essayez un autre terme de recherche.`,
    noResultsWithoutQuery: 'Aucun produit trouvé.',
    sortDefault: 'Trier par : Pertinence',
    sortPriceLow: 'Prix : du plus bas au plus élevé',
    sortPriceHigh: 'Prix : du plus élevé au plus bas',
    home: 'Accueil',
    pageTitle: (query) => (query ? `Recherche : ${query} - Mangala Living` : 'Recherche - Mangala Living'),
    metaDescription: (query, hasQuery) =>
      hasQuery ? `Résultats de recherche pour ${query}` : 'Résultats de recherche des produits Mangala Living.'
  },
  ko: {
    loading: '로딩 중...',
    headingWithQuery: (query) => `"${query}" 검색 결과`,
    headingWithoutQuery: '검색 결과',
    subtitle: '원하는 키워드로 Mangala Living 산업용 맞춤 가구를 찾아보세요.',
    languageAdjusting: '언어 환경을 조정하는 중…',
    resultsCount: (count) => `${count}개의 결과`,
    noResultsWithQuery: (query) => `"${query}"에 대한 상품이 없습니다. 다른 검색어를 시도해 주세요.`,
    noResultsWithoutQuery: '상품을 찾을 수 없습니다.',
    sortDefault: '정렬: 관련도',
    sortPriceLow: '가격: 낮은 순',
    sortPriceHigh: '가격: 높은 순',
    home: '홈',
    pageTitle: (query) => (query ? `검색: ${query} - Mangala Living` : '검색 - Mangala Living'),
    metaDescription: (query, hasQuery) =>
      hasQuery ? `${query} 검색 결과` : 'Mangala Living 상품 검색 결과.'
  }
}

const OG_LOCALES = ['id_ID', 'en_US', 'ar_SA', 'zh_CN', 'ja_JP', 'es_ES', 'fr_FR', 'ko_KR'] as const

const resolveLanguage = (value: string | null): LanguageCode =>
  value && SUPPORTED_LANGUAGES.includes(value as LanguageCode) ? (value as LanguageCode) : 'id'

interface Product {
  id: number
  name: string
  category: string
  price: string
  image: string
  slug: string
}

interface ScoredProduct extends Product {
  score: number
  tokenMatches: number
}

const allProducts: Product[] = ALL_PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  category: p.categories.join(', '),
  price: p.price,
  image: p.image,
  slug: p.slug
}))

function SearchResults() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get('q') || ''
  const langParam = searchParams.get('lang')
  const [language, setLanguage] = useState<LanguageCode>(resolveLanguage(langParam))
  const [sortBy, setSortBy] = useState('default')
  const [usdPrices, setUsdPrices] = useState<Record<number, string>>({})
  const [highlightedPrices, setHighlightedPrices] = useState<Record<number, string>>({})
  const [isDetectingLanguage, setIsDetectingLanguage] = useState(true)

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

  // Language detection - instant, no async needed!
  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname, location.search)
    setLanguage(currentLang)
    setIsDetectingLanguage(false)
  }, [location.pathname, location.search])

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
  const uiTranslations = SEARCH_TRANSLATIONS[language] ?? SEARCH_TRANSLATIONS.en

  useEffect(() => {
    let isMounted = true

    const convertPrices = async () => {
      const usdPriceMap: Record<number, string> = {}
      const highlightedPriceMap: Record<number, string> = {}

      const targetCurrency = LANGUAGE_CURRENCY_MAP[language]

      for (const product of allProducts) {
        try {
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
        } catch (error) {
          console.error(`Failed to convert price for product ${product.slug}:`, error)
        }
      }

      if (isMounted) {
        setUsdPrices(usdPriceMap)
        setHighlightedPrices(highlightedPriceMap)
      }
    }

    convertPrices()

    return () => {
      isMounted = false
    }
  }, [language])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const normalizedQuery = query.trim().toLowerCase()
  const hasQuery = normalizedQuery.length > 0

  const queryTokens = useMemo(() => {
    return hasQuery
      ? Array.from(
        new Set(
          normalizedQuery
            .split(/[\s\-_,.]+/)
            .map(token => token.trim())
            .filter(token => token.length > 1)
        )
      )
      : []
  }, [hasQuery, normalizedQuery])

  const matchedProducts = useMemo<ScoredProduct[]>(() => {
    if (!hasQuery) {
      return allProducts
        .map(product => ({
          ...product,
          score: 0,
          tokenMatches: 0
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    }

    return allProducts
      .map(product => {
        const nameLower = product.name.toLowerCase()
        const categoryLower = product.category.toLowerCase()
        const combinedText = `${nameLower} ${categoryLower}`

        const matched = queryTokens.filter(token => combinedText.includes(token))
        const tokenMatches = matched.length
        const containsAllTokens = queryTokens.length > 0 && tokenMatches === queryTokens.length
        const nameTokenMatches = matched.filter(token => nameLower.includes(token)).length
        const categoryTokenMatches = matched.filter(token => categoryLower.includes(token)).length
        const exactNameMatch = nameLower === normalizedQuery
        const phraseInName = nameLower.includes(normalizedQuery)

        let score = 0
        if (exactNameMatch) score += 200
        if (phraseInName) score += 120
        if (containsAllTokens) score += 80
        score += tokenMatches * 18
        score += nameTokenMatches * 12
        score += categoryTokenMatches * 6

        if (queryTokens.some(token => nameLower.startsWith(token))) {
          score += 25
        }

        const nameWords = nameLower.split(/\s+/)
        const wordMatchBonus = queryTokens.filter(token => nameWords.includes(token)).length * 10
        score += wordMatchBonus

        return {
          ...product,
          score,
          tokenMatches
        }
      })
      .filter(product => product.tokenMatches > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        if (b.tokenMatches !== a.tokenMatches) return b.tokenMatches - a.tokenMatches
        return a.name.localeCompare(b.name)
      })
  }, [hasQuery, normalizedQuery, queryTokens])

  const sortedProducts = useMemo<Product[]>(() => {
    if (sortBy === 'price-low') {
      return [...matchedProducts].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\D/g, ''), 10)
        const priceB = parseInt(b.price.replace(/\D/g, ''), 10)
        return priceA - priceB
      })
    }

    if (sortBy === 'price-high') {
      return [...matchedProducts].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\D/g, ''), 10)
        const priceB = parseInt(b.price.replace(/\D/g, ''), 10)
        return priceB - priceA
      })
    }

    return matchedProducts
  }, [matchedProducts, sortBy])

  const resultsCount = sortedProducts.length
  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  const searchPath = hasQuery ? `/search?q=${encodeURIComponent(query)}` : '/search'
  const headingText = hasQuery ? uiTranslations.headingWithQuery(query) : uiTranslations.headingWithoutQuery

  const breadcrumbItems = [
    { label: uiTranslations.home, path: '/' },
    { label: headingText, path: searchPath }
  ]

  return (
    <div className="search-results-page">
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>{uiTranslations.pageTitle(hasQuery ? query : undefined)}</title>
        <meta
          name="description"
          content={uiTranslations.metaDescription(query, hasQuery)}
        />
        {/* Add noindex for empty search results to prevent Soft 404 */}
        <meta name="robots" content={hasQuery && resultsCount === 0 ? "noindex, follow" : "index, follow"} />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`search-results-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        {OG_LOCALES.filter(altLocale => altLocale !== localeMeta.locale).map((altLocale) => (
          <meta key={`search-results-og-${altLocale}`} property="og:locale:alternate" content={altLocale} />
        ))}
      </Helmet>

      <Header isIndonesian={isIndonesian} language={language} />
      <CurrencyHighlight isIndonesian={isIndonesian} language={language} />

      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        <div className="search-results-header">
          <div className="search-results-heading">
            <h1 className="search-results-title">{headingText}</h1>
            <p className="search-results-subtitle">
              {uiTranslations.subtitle}
            </p>
            {isDetectingLanguage && (
              <span className="search-language-indicator">{uiTranslations.languageAdjusting}</span>
            )}
          </div>
          <div className="search-results-controls">
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">{uiTranslations.sortDefault}</option>
              <option value="price-low">{uiTranslations.sortPriceLow}</option>
              <option value="price-high">{uiTranslations.sortPriceHigh}</option>
            </select>
          </div>
        </div>

        <p className="results-count">{uiTranslations.resultsCount(resultsCount)}</p>

        {sortedProducts.length > 0 ? (
          <div className="products-grid">
            {sortedProducts.map((product) => {
              const translatedName = getProductName(product.slug, isIndonesian) || product.name
              return (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="product-card"
                >
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={`${translatedName} - Industrial Furniture ${product.category} Search Results Mangala Living`}
                      title={`${translatedName} - ${product.category} Industrial Furniture - Mangala Living`}
                      loading="lazy"
                      width="300"
                      height="200"
                      itemProp="image"
                      data-image-type="search-result"
                      data-product-name={translatedName}
                      data-category={product.category}
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{translatedName}</h3>
                    <p className="product-category">{product.category}</p>
                    {usdPrices[product.id] && highlightedPrices[product.id] && usdPrices[product.id] !== 'N/A' ? (
                      <div className="product-price-stack">
                        <span className="product-price-primary">
                          {highlightedPrices[product.id]}
                        </span>
                        <span className="product-price-secondary">
                          {usdPrices[product.id]}
                        </span>
                      </div>
                    ) : (
                      <p className="product-price">{product.price}</p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="no-results">
            <p className="no-results-message">
              {hasQuery ? uiTranslations.noResultsWithQuery(query) : uiTranslations.noResultsWithoutQuery}
            </p>
          </div>
        )}
      </div>

      <Footer isIndonesian={isIndonesian} language={language} />
    </div>
  )
}

export default SearchResults
