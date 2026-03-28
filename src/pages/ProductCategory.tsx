import React, { useState, useMemo, useEffect } from 'react'
import { useParams, Link, useLocation, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ChevronDown } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import CategoryAIContent from '../components/CategoryAIContent'
import { ALL_PRODUCTS } from '../data/products'
import { CATEGORY_MAP } from '../data/categories'
import { generateLanguageSpecificMeta, generateLocalizedUrls } from '../utils/seo'
import { convertIDRToUSD, convertIDRToCurrency } from '../utils/currencyConverter'
import { getProductName } from '../data/productDescriptions'
import { getCurrentLanguage, type LanguageCode } from '../utils/languageManager'
import { translateCategories } from '../utils/categoryTranslations'
import './ProductCategory.css'

const CATEGORY_NAME_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  'New Arrivals': {
    id: 'Produk Baru',
    en: 'New Arrivals',
    ar: 'وصل حديثاً',
    zh: '新品',
    ja: '新着',
    es: 'Novedades',
    fr: 'Nouveautés',
    ko: '신제품'
  },
  'Lounge Set': {
    id: 'Set Lounge',
    en: 'Lounge Set',
    ar: 'طقم صالة',
    zh: '休闲套装',
    ja: 'ラウンジセット',
    es: 'Set de sala',
    fr: 'Set de salon',
    ko: '라운지 세트'
  },
  'Sofa Bench': {
    id: 'Sofa Bench',
    en: 'Sofa Bench',
    ar: 'أريكة بمقعد',
    zh: '沙发长凳',
    ja: 'ソファベンチ',
    es: 'Banco sofá',
    fr: 'Banc canapé',
    ko: '소파 벤치'
  },
  'Dining Set': {
    id: 'Set Makan',
    en: 'Dining Set',
    ar: 'طقم طعام',
    zh: '餐桌套装',
    ja: 'ダイニングセット',
    es: 'Juego de comedor',
    fr: 'Ensemble de salle à manger',
    ko: '다이닝 세트'
  },
  'Bar Set': {
    id: 'Set Bar',
    en: 'Bar Set',
    ar: 'طقم بار',
    zh: '吧台套装',
    ja: 'バーセット',
    es: 'Juego de bar',
    fr: 'Set de bar',
    ko: '바 세트'
  },
  'Outdoor': {
    id: 'Outdoor',
    en: 'Outdoor',
    ar: 'خارجي',
    zh: '户外',
    ja: 'アウトドア',
    es: 'Exterior',
    fr: 'Extérieur',
    ko: '야외용'
  },
  'Daybed': {
    id: 'Daybed',
    en: 'Daybed',
    ar: 'سرير نهاري',
    zh: '躺椅',
    ja: 'デイベッド',
    es: 'Cama de día',
    fr: 'Lit de jour',
    ko: '데이베드'
  },
  'Storage': {
    id: 'Penyimpanan',
    en: 'Storage',
    ar: 'تخزين',
    zh: '储物',
    ja: '収納',
    es: 'Almacenamiento',
    fr: 'Rangement',
    ko: '수납'
  },
  'Tables': {
    id: 'Meja',
    en: 'Tables',
    ar: 'طاولات',
    zh: '桌子',
    ja: 'テーブル',
    es: 'Mesas',
    fr: 'Tables',
    ko: '테이블'
  },
  'Dine Table': {
    id: 'Meja Makan',
    en: 'Dine Table',
    ar: 'طاولة طعام',
    zh: '餐桌',
    ja: 'ダイニングテーブル',
    es: 'Mesa de comedor',
    fr: 'Table à manger',
    ko: '식탁'
  },
  'Products': {
    id: 'Produk',
    en: 'Products',
    ar: 'منتجات',
    zh: '产品',
    ja: '製品',
    es: 'Productos',
    fr: 'Produits',
    ko: '제품'
  }
}

const getLocalizedCategoryName = (category: string, language: LanguageCode) => {
  const translations = CATEGORY_NAME_TRANSLATIONS[category] ?? CATEGORY_NAME_TRANSLATIONS['Products']
  if (!translations) return category
  return translations[language] ?? translations.en ?? category
}

const CATEGORY_UI_TRANSLATIONS: Record<
  LanguageCode,
  {
    loading: string
    showingResults: (count: number) => string
    resultsCount: (count: number) => string
    sortByLabel: string
    defaultSort: string
    priceLow: string
    priceHigh: string
    noResults: string
    home: string
    pageTitle: (category: string) => string
    metaDescription: (category: string, count: number) => string
    metaKeywords: (category: string) => string
    ogTitle: (category: string) => string
    ogDescription: (category: string) => string
    twitterTitle: (category: string) => string
    twitterDescription: (category: string, count: number) => string
    collectionName: (category: string) => string
    collectionDescription: (category: string, count: number) => string
  }
> = {
  id: {
    loading: 'Memuat...',
    showingResults: (count) => `Menampilkan 1-${count} dari ${count} hasil`,
    resultsCount: (count) => `${count} produk ditemukan`,
    sortByLabel: 'Urutkan:',
    defaultSort: 'Default',
    priceLow: 'Harga: Rendah ke Tinggi',
    priceHigh: 'Harga: Tinggi ke Rendah',
    noResults: 'Tidak ada produk ditemukan',
    home: 'Beranda',
    pageTitle: (category) => `${category} Industrial Bekasi - Furniture Berkualitas | Mangala Living`,
    metaDescription: (category, count) =>
      `${category} industrial custom dari Mangala Living Bekasi. Harga pabrik, kualitas premium, pengalaman 25+ tahun. Workshop langsung melayani Jabodetabek. ${count} produk tersedia.`,
    metaKeywords: (category) =>
      `${category.toLowerCase()} industrial bekasi, ${category.toLowerCase()} custom, furniture industrial bekasi, furniture besi custom, mangala living`,
    ogTitle: (category) => `${category} Industrial - Mangala Living Bekasi`,
    ogDescription: (category) => `${category} industrial custom dengan harga pabrik. Workshop di Bekasi, pengalaman 25+ tahun.`,
    twitterTitle: (category) => `${category} Industrial - Mangala Living`,
    twitterDescription: (category, count) => `${count} produk ${category} industrial berkualitas premium.`,
    collectionName: (category) => `${category} Furniture Industrial - Mangala Living`,
    collectionDescription: (category, count) =>
      `Koleksi ${category} furniture industrial. Kualitas premium, harga pabrik, pengalaman 25+ tahun. Workshop Bekasi melayani Jabodetabek. ${count} produk.`
  },
  en: {
    loading: 'Loading...',
    showingResults: (count) => `Showing 1-${count} of ${count} results`,
    resultsCount: (count) => `${count} results found`,
    sortByLabel: 'Sort by:',
    defaultSort: 'Default',
    priceLow: 'Price: Low to High',
    priceHigh: 'Price: High to Low',
    noResults: 'No products found',
    home: 'Home',
    pageTitle: (category) => `${category} Industrial Furniture Bekasi - Premium Quality | Mangala Living`,
    metaDescription: (category, count) =>
      `${category} industrial custom furniture by Mangala Living Bekasi. Factory-direct pricing, premium quality, 25+ years experience. Serving Jabodetabek. ${count} products available.`,
    metaKeywords: (category) =>
      `${category.toLowerCase()} industrial furniture, ${category.toLowerCase()} bekasi, custom industrial furniture, mangala living`,
    ogTitle: (category) => `${category} Industrial - Mangala Living Bekasi`,
    ogDescription: (category) => `${category} industrial furniture with factory-direct pricing. Bekasi workshop with 25+ years of experience.`,
    twitterTitle: (category) => `${category} Industrial - Mangala Living`,
    twitterDescription: (category, count) => `${count} premium ${category} industrial furniture products.`,
    collectionName: (category) => `${category} Industrial Furniture - Mangala Living`,
    collectionDescription: (category, count) =>
      `Collection of ${category} industrial furniture. Premium quality, factory prices, 25+ years experience. Bekasi workshop serving Jabodetabek. ${count} items.`
  },
  ar: {
    loading: 'جارٍ التحميل...',
    showingResults: (count) => `عرض 1-${count} من ${count} نتيجة`,
    resultsCount: (count) => `${count} نتيجة`,
    sortByLabel: 'فرز حسب:',
    defaultSort: 'افتراضي',
    priceLow: 'السعر: من الأقل إلى الأعلى',
    priceHigh: 'السعر: من الأعلى إلى الأقل',
    noResults: 'لم يتم العثور على منتجات',
    home: 'الصفحة الرئيسية',
    pageTitle: (category) => `${category} أثاث صناعي بيكاسي - جودة متميزة | Mangala Living`,
    metaDescription: (category, count) =>
      `${category} أثاث صناعي مخصص من Mangala Living في بيكاسي. أسعار المصنع، جودة عالية، خبرة لأكثر من 25 سنة. نخدم منطقة جاكرتا الكبرى. يتوفر ${count} منتج.`,
    metaKeywords: (category) =>
      `${category} اثاث صناعي، ${category} بيكاسي، اثاث صناعي مخصص، Mangala Living`,
    ogTitle: (category) => `${category} أثاث صناعي - Mangala Living بيكاسي`,
    ogDescription: (category) => `أثاث ${category} صناعي بأسعار المصنع. ورشة بيكاسي بخبرة تتجاوز 25 عاماً.`,
    twitterTitle: (category) => `${category} أثاث صناعي - Mangala Living`,
    twitterDescription: (category, count) => `${count} منتج ${category} صناعي بجودة متميزة.`,
    collectionName: (category) => `${category} أثاث صناعي - Mangala Living`,
    collectionDescription: (category, count) =>
      `مجموعة ${category} من الأثاث الصناعي. جودة متميزة وأسعار المصنع وخبرة 25+ عاماً. ورشة بيكاسي تخدم جاكرتا الكبرى. ${count} عنصر.`
  },
  zh: {
    loading: '加载中...',
    showingResults: (count) => `显示第 1-${count} 条，共 ${count} 条结果`,
    resultsCount: (count) => `共找到 ${count} 个结果`,
    sortByLabel: '排序：',
    defaultSort: '默认',
    priceLow: '价格：从低到高',
    priceHigh: '价格：从高到低',
    noResults: '未找到产品',
    home: '首页',
    pageTitle: (category) => `${category} 工业风家具 Bekasi - 高品质定制 | Mangala Living`,
    metaDescription: (category, count) =>
      `${category} 工业风定制家具，由 Mangala Living Bekasi 制作。工厂直供，优质做工，25+ 年经验。服务雅加达大都市区。共有 ${count} 件产品。`,
    metaKeywords: (category) =>
      `${category} 工业家具, ${category} Bekasi, 定制工业家具, Mangala Living`,
    ogTitle: (category) => `${category} 工业家具 - Mangala Living Bekasi`,
    ogDescription: (category) => `${category} 工业家具，工厂直供，Bekasi 工坊拥有 25+ 年经验。`,
    twitterTitle: (category) => `${category} 工业家具 - Mangala Living`,
    twitterDescription: (category, count) => `${count} 款优质 ${category} 工业风家具。`,
    collectionName: (category) => `${category} 工业家具 - Mangala Living`,
    collectionDescription: (category, count) =>
      `${category} 工业家具系列。优质工艺，工厂价格，25+ 年经验。Bekasi 工坊服务雅加达地区。共 ${count} 件。`
  },
  ja: {
    loading: '読み込み中...',
    showingResults: (count) => `${count} 件中 1-${count} 件を表示`,
    resultsCount: (count) => `${count} 件が見つかりました`,
    sortByLabel: '並び替え:',
    defaultSort: 'デフォルト',
    priceLow: '価格: 低い順',
    priceHigh: '価格: 高い順',
    noResults: '商品が見つかりません',
    home: 'ホーム',
    pageTitle: (category) => `${category} 工業家具 ベカシ - プレミアム品質 | Mangala Living`,
    metaDescription: (category, count) =>
      `${category} の工業系カスタム家具。Mangala Living ベカシ工房。工場直販、プレミアム品質、25年以上の経験。ジャボデタベック全域対応。${count} 商品。`,
    metaKeywords: (category) =>
      `${category} 工業家具, ${category} ベカシ, カスタム工業家具, Mangala Living`,
    ogTitle: (category) => `${category} 工業家具 - Mangala Living ベカシ`,
    ogDescription: (category) => `工場直販の ${category} 工業家具。ベカシ工房、25年以上の経験。`,
    twitterTitle: (category) => `${category} 工業家具 - Mangala Living`,
    twitterDescription: (category, count) => `高品質な ${category} 工業家具を ${count} 点ご用意しています。`,
    collectionName: (category) => `${category} 工業家具 - Mangala Living`,
    collectionDescription: (category, count) =>
      `${category} 工業家具のコレクション。プレミアム品質、工場価格、25年以上の経験。ベカシ工房がジャボデタベック対応。${count} 点。`
  },
  es: {
    loading: 'Cargando...',
    showingResults: (count) => `Mostrando 1-${count} de ${count} resultados`,
    resultsCount: (count) => `${count} resultados encontrados`,
    sortByLabel: 'Ordenar por:',
    defaultSort: 'Predeterminado',
    priceLow: 'Precio: de menor a mayor',
    priceHigh: 'Precio: de mayor a menor',
    noResults: 'No se encontraron productos',
    home: 'Inicio',
    pageTitle: (category) => `${category} Muebles Industriales Bekasi - Calidad Premium | Mangala Living`,
    metaDescription: (category, count) =>
      `${category} muebles industriales personalizados de Mangala Living Bekasi. Precios de fábrica, calidad premium, más de 25 años de experiencia. Servicio en Jabodetabek. ${count} productos disponibles.`,
    metaKeywords: (category) =>
      `${category.toLowerCase()} muebles industriales, ${category.toLowerCase()} bekasi, muebles industriales personalizados, mangala living`,
    ogTitle: (category) => `${category} Industrial - Mangala Living Bekasi`,
    ogDescription: (category) => `Muebles industriales ${category} con precios directos de fábrica. Taller en Bekasi con más de 25 años de experiencia.`,
    twitterTitle: (category) => `${category} Industrial - Mangala Living`,
    twitterDescription: (category, count) => `${count} productos industriales ${category} de calidad premium.`,
    collectionName: (category) => `${category} Muebles Industriales - Mangala Living`,
    collectionDescription: (category, count) =>
      `Colección de muebles industriales ${category}. Calidad premium, precios de fábrica y más de 25 años de experiencia. Taller en Bekasi para Jabodetabek. ${count} artículos.`
  },
  fr: {
    loading: 'Chargement...',
    showingResults: (count) => `Affichage de 1-${count} sur ${count} résultats`,
    resultsCount: (count) => `${count} résultats trouvés`,
    sortByLabel: 'Trier par :',
    defaultSort: 'Par défaut',
    priceLow: 'Prix : du plus bas au plus élevé',
    priceHigh: 'Prix : du plus élevé au plus bas',
    noResults: 'Aucun produit trouvé',
    home: 'Accueil',
    pageTitle: (category) => `${category} Mobilier Industriel Bekasi - Qualité Premium | Mangala Living`,
    metaDescription: (category, count) =>
      `${category} mobilier industriel sur mesure par Mangala Living Bekasi. Prix d'usine, qualité premium, plus de 25 ans d'expérience. Service Jabodetabek. ${count} produits disponibles.`,
    metaKeywords: (category) =>
      `${category.toLowerCase()} mobilier industriel, ${category.toLowerCase()} bekasi, mobilier industriel sur mesure, mangala living`,
    ogTitle: (category) => `${category} Industriel - Mangala Living Bekasi`,
    ogDescription: (category) => `Mobilier industriel ${category} avec prix d'usine. Atelier de Bekasi avec plus de 25 ans d'expérience.`,
    twitterTitle: (category) => `${category} Industriel - Mangala Living`,
    twitterDescription: (category, count) => `${count} produits industriels ${category} de qualité premium.`,
    collectionName: (category) => `${category} Mobilier Industriel - Mangala Living`,
    collectionDescription: (category, count) =>
      `Collection de mobilier industriel ${category}. Qualité premium, prix d'usine, plus de 25 ans d'expérience. Atelier de Bekasi pour Jabodetabek. ${count} articles.`
  },
  ko: {
    loading: '로딩 중...',
    showingResults: (count) => `총 ${count}개 중 1-${count}개 표시`,
    resultsCount: (count) => `${count}개의 결과`,
    sortByLabel: '정렬:',
    defaultSort: '기본값',
    priceLow: '가격: 낮은 순',
    priceHigh: '가격: 높은 순',
    noResults: '상품을 찾을 수 없습니다',
    home: '홈',
    pageTitle: (category) => `${category} 산업용 가구 베카시 - 프리미엄 품질 | Mangala Living`,
    metaDescription: (category, count) =>
      `${category} 산업용 맞춤 가구, Mangala Living Bekasi 제작. 공장 직영 가격, 프리미엄 품질, 25년 이상 경험. 자보데타벡 전역 서비스. 총 ${count}개 제품.`,
    metaKeywords: (category) =>
      `${category} 산업 가구, ${category} 베카시, 맞춤 산업 가구, mangala living`,
    ogTitle: (category) => `${category} 산업 가구 - Mangala Living Bekasi`,
    ogDescription: (category) => `공장 직영 가격의 ${category} 산업 가구. 베카시 공방, 25년 이상의 경험.`,
    twitterTitle: (category) => `${category} 산업 가구 - Mangala Living`,
    twitterDescription: (category, count) => `프리미엄 ${category} 산업 가구 ${count}개.`,
    collectionName: (category) => `${category} 산업 가구 - Mangala Living`,
    collectionDescription: (category, count) =>
      `${category} 산업 가구 컬렉션. 프리미엄 품질, 공장 가격, 25년 이상 경험. 베카시 공방이 자보데타벡을 지원. 총 ${count}개.`
  }
}

const OG_LOCALES = ['id_ID', 'en_US', 'ar_SA', 'zh_CN', 'ja_JP', 'es_ES', 'fr_FR', 'ko_KR'] as const

const ProductCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>()
  const location = useLocation()
  const [sortBy, setSortBy] = useState('default')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [language, setLanguage] = useState<LanguageCode>(() => {
    return getCurrentLanguage(location.pathname, location.search)
  })
  const [usdPrices, setUsdPrices] = useState<{ [key: number]: string }>({})
  const [highlightedPrices, setHighlightedPrices] = useState<{ [key: number]: string }>({})

  // Language to currency mapping
  const LANGUAGE_CURRENCY_MAP: { [key in LanguageCode]: 'KRW' | 'JPY' | 'CNY' | 'SAR' | 'EUR' | 'USD' | null } = {
    'ko': 'KRW',
    'ja': 'JPY',
    'zh': 'CNY',
    'ar': 'SAR',
    'es': 'EUR',
    'fr': 'EUR',
    'en': 'USD',
    'id': 'USD'
  }

  // Check if category exists in CATEGORY_MAP - if not, redirect to 404 to prevent Soft 404
  const categoryName = category ? CATEGORY_MAP[category] : null
  if (!category || !categoryName) {
    return <Navigate to="/404-not-found" replace />
  }
  const localizedCategoryName = getLocalizedCategoryName(categoryName, language)

  // Language detection - instant, no async needed!
  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname, location.search)
    if (currentLang !== language) {
      setLanguage(currentLang)
    }
  }, [location.pathname, location.search, language])

  const isIndonesian = language === 'id'
  const isLoading = false
  const uiTranslations = CATEGORY_UI_TRANSLATIONS[language] ?? CATEGORY_UI_TRANSLATIONS.en

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [category])

  // Convert prices to USD and highlighted currency based on language
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

  const filteredProducts = useMemo(() => {
    let products = ALL_PRODUCTS.filter(product =>
      product.categories.some(cat => cat.toLowerCase() === categoryName.toLowerCase())
    )

    // Sort products
    if (sortBy === 'price-low') {
      products = [...products].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\D/g, ''))
        const priceB = parseInt(b.price.replace(/\D/g, ''))
        return priceA - priceB
      })
    } else if (sortBy === 'price-high') {
      products = [...products].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/\D/g, ''))
        const priceB = parseInt(b.price.replace(/\D/g, ''))
        return priceB - priceA
      })
    }

    return products
  }, [categoryName, sortBy])

  const breadcrumbItems = [
    { label: uiTranslations.home, path: '/' },
    { label: localizedCategoryName, path: `/product-category/${category}` }
  ]

  const localeMeta = generateLanguageSpecificMeta(language)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  if (isLoading) {
    return (
      <div className="product-category-page">
        <Header isIndonesian={isIndonesian} language={language} />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          background: '#f8f9fa'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #8B7355',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p style={{ color: '#666', margin: 0 }}>
              {uiTranslations.loading}
            </p>
          </div>
        </div>
        <Footer isIndonesian={isIndonesian} language={language} />
      </div>
    )
  }

  return (
    <div className="product-category-page">
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>{uiTranslations.pageTitle(localizedCategoryName)}</title>
        <meta name="description" content={uiTranslations.metaDescription(localizedCategoryName, filteredProducts.length)} />
        <meta name="keywords" content={uiTranslations.metaKeywords(localizedCategoryName)} />
        {/* Add noindex if category has no products to prevent Soft 404 */}
        <meta name="robots" content={filteredProducts.length > 0 ? "index, follow" : "noindex, follow"} />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`product-category-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}

        {/* Open Graph */}
        <meta property="og:title" content={uiTranslations.ogTitle(localizedCategoryName)} />
        <meta property="og:description" content={uiTranslations.ogDescription(localizedCategoryName)} />
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={localeMeta.locale} />
        {OG_LOCALES.filter(altLocale => altLocale !== localeMeta.locale).map((altLocale) => (
          <meta key={`product-category-og-${altLocale}`} property="og:locale:alternate" content={altLocale} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={uiTranslations.twitterTitle(localizedCategoryName)} />
        <meta name="twitter:description" content={uiTranslations.twitterDescription(localizedCategoryName, filteredProducts.length)} />

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": uiTranslations.home,
                "item": "https://mangala-living.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": localizedCategoryName,
                "item": `https://mangala-living.com/product-category/${category}`
              }
            ]
          })}
        </script>

        {/* CollectionPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": uiTranslations.collectionName(localizedCategoryName),
            "description": uiTranslations.collectionDescription(localizedCategoryName, filteredProducts.length),
            "url": `https://mangala-living.com/product-category/${category}`,
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": filteredProducts.length,
              "itemListElement": filteredProducts.map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": product.name,
                  "url": `https://mangala-living.com/product/${product.slug}`,
                  "image": product.image,
                  "offers": {
                    "@type": "Offer",
                    "price": product.price.replace(/[^\d]/g, ''),
                    "priceCurrency": "IDR",
                    "availability": "https://schema.org/InStock"
                  }
                }
              }))
            }
          })}
        </script>
      </Helmet>

      <Header isIndonesian={isIndonesian} language={language} />

      <main className="category-main">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />

          <h1 className="category-page-title">{localizedCategoryName}</h1>

          <div className="category-controls">
            {filteredProducts.length > 0 ? (
              <p className="showing-results">
                {uiTranslations.showingResults(filteredProducts.length)}
              </p>
            ) : (
              <p className="showing-results">{uiTranslations.noResults}</p>
            )}

            {filteredProducts.length > 0 && (
              <div className="sort-dropdown">
                <button
                  className="sort-button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {uiTranslations.sortByLabel} {sortBy === 'default' ? uiTranslations.defaultSort : sortBy === 'price-low' ? uiTranslations.priceLow : uiTranslations.priceHigh}
                  <ChevronDown size={16} />
                </button>

                {isDropdownOpen && (
                  <div className="sort-options">
                    <button onClick={() => { setSortBy('default'); setIsDropdownOpen(false); }}>{uiTranslations.defaultSort}</button>
                    <button onClick={() => { setSortBy('price-low'); setIsDropdownOpen(false); }}>{uiTranslations.priceLow}</button>
                    <button onClick={() => { setSortBy('price-high'); setIsDropdownOpen(false); }}>{uiTranslations.priceHigh}</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="category-products-grid">
            {filteredProducts.map((product) => {
              const translatedName = getProductName(product.slug, isIndonesian) || product.name
              return (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="category-product-card"
                >
                  <div className="category-product-image">
                    <img
                      src={product.image}
                      alt={`${translatedName} - ${localizedCategoryName} Industrial Furniture Collection Mangala Living`}
                      title={`${translatedName} - ${localizedCategoryName} Premium Furniture from Mangala Living Workshop Bekasi`}
                      loading="lazy"
                      width="300"
                      height="200"
                      itemProp="image"
                      data-image-type="category-product"
                      data-product-name={translatedName}
                      data-product-slug={product.slug}
                      data-category={categoryName}
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

          {/* AI-Optimized Category Content */}
          <CategoryAIContent
            category={categoryName}
            productCount={filteredProducts.length}
            isIndonesian={isIndonesian}
          />
        </div>
      </main>

      <Footer isIndonesian={isIndonesian} language={language} />
    </div>
  )
}

export default ProductCategory

