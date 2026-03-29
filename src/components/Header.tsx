import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, ChevronDown } from 'lucide-react'
import './Header.css'
import { ALL_PRODUCTS } from '../data/products'
import { generateCatalog } from '../utils/catalogGenerator'
import { trackEvent } from '../utils/analytics'
import { sendBackgroundEmail } from '../utils/emailHelpers'
import { storeLanguage } from '../utils/languageManager'
import CatalogModal from './CatalogModal'

interface HeaderProps {
  isIndonesian?: boolean
  language?: 'en' | 'id' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'
}

const translations = {
  en: {
    about: 'About',
    blog: 'Blog',
    contactUs: 'Contact Us',
    search: 'Search',
    downloadCatalog: 'DOWNLOAD OUR CATALOG',
    generating: 'GENERATING...',
    categories: {
      newArrivals: 'New Arrivals',
      cocoaPowder: 'Cocoa Powder',
      indonesianCloves: 'Indonesian Cloves',
      cocopeatMedia: 'Cocopeat Media',
      spicesHerbs: 'Spices & Herbs',
      essentialOils: 'Essential Oils',
      sustainable: 'Sustainable',
      cassava: 'Cassava Products',
      pepper: 'Pepper & Spices',
      bulkExport: 'Bulk Export',
      more: 'More'
    }
  },
  id: {
    about: 'Tentang',
    blog: 'Blog',
    contactUs: 'Hubungi Kami',
    search: 'Cari',
    downloadCatalog: 'UNDUH KATALOG KAMI',
    generating: 'MEMBUAT...',
    categories: {
      newArrivals: 'Produk Baru',
      cocoaPowder: 'Bubuk Kakao',
      indonesianCloves: 'Cengkeh Indonesia',
      cocopeatMedia: 'Media Cocopeat',
      spicesHerbs: 'Rempah & Herbal',
      essentialOils: 'Minyak Atsiri',
      sustainable: 'Berkelanjutan',
      cassava: 'Produk Singkong',
      pepper: 'Lada & Rempah',
      bulkExport: 'Ekspor Curah',
      more: 'Lainnya'
    }
  },
  ar: {
    about: 'حول',
    blog: 'مدونة',
    contactUs: 'اتصل بنا',
    search: 'بحث',
    downloadCatalog: 'تحميل الكتالوج',
    generating: 'جاري الإنشاء...',
    categories: {
      newArrivals: 'وصل حديثاً',
      cocoaPowder: 'مسحوق الكاكاو',
      indonesianCloves: 'القرنفل الإندونيسي',
      cocopeatMedia: 'بيئة الكوكوبيت',
      spicesHerbs: 'توابل وأعشاب',
      essentialOils: 'زيوت عطرية',
      sustainable: 'مستدام',
      cassava: 'منتجات الكسافا',
      pepper: 'فلفل وتوابل',
      bulkExport: 'تصدير كميات الكبيرة',
      more: 'المزيد'
    }
  },
  zh: {
    about: '关于',
    blog: '博客',
    contactUs: '联系我们',
    search: '搜索',
    downloadCatalog: '下载目录',
    generating: '生成中...',
    categories: {
      newArrivals: '新品',
      cocoaPowder: '可可粉',
      indonesianCloves: '印度尼西亚丁香',
      cocopeatMedia: '椰糠介质',
      spicesHerbs: '香料与草药',
      essentialOils: '精油',
      sustainable: '可持续',
      cassava: '木薯产品',
      pepper: '胡椒与香料',
      bulkExport: '大宗出口',
      more: '更多'
    }
  },
  ja: {
    about: '会社概要',
    blog: 'ブログ',
    contactUs: 'お問い合わせ',
    search: '検索',
    downloadCatalog: 'カタログをダウンロード',
    generating: '生成中...',
    categories: {
      newArrivals: '新着',
      cocoaPowder: 'ココアパウダー',
      indonesianCloves: 'インドネシア産クローブ',
      cocopeatMedia: 'ココピート培地',
      spicesHerbs: 'スパイス＆ハーブ',
      essentialOils: 'エッセンシャルオイル',
      sustainable: 'サステナブル',
      cassava: 'キャッサバ製品',
      pepper: '胡椒＆スパイス',
      bulkExport: 'バルク輸出',
      more: 'もっと見る'
    }
  },
  es: {
    about: 'Acerca de',
    blog: 'Blog',
    contactUs: 'Contáctenos',
    search: 'Buscar',
    downloadCatalog: 'DESCARGAR CATÁLOGO',
    generating: 'GENERANDO...',
    categories: {
      newArrivals: 'Novedades',
      cocoaPowder: 'Cacao en Polvo',
      indonesianCloves: 'Clavos Indonesios',
      cocopeatMedia: 'Sustrato Cocopeat',
      spicesHerbs: 'Especias y Hierbas',
      essentialOils: 'Aceites Esenciales',
      sustainable: 'Sostenible',
      cassava: 'Productos de Yuca',
      pepper: 'Pimienta y Especias',
      bulkExport: 'Exportación a Granel',
      more: 'Más'
    }
  },
  fr: {
    about: 'À propos',
    blog: 'Blog',
    contactUs: 'Contactez-nous',
    search: 'Rechercher',
    downloadCatalog: 'TÉLÉCHARGER LE CATALOGUE',
    generating: 'GÉNÉRATION...',
    categories: {
      newArrivals: 'Nouveautés',
      cocoaPowder: 'Poudre de Cacao',
      indonesianCloves: 'Clous de Girofle Indonésiens',
      cocopeatMedia: 'Substrat Cocopeat',
      spicesHerbs: 'Épices et Herbes',
      essentialOils: 'Huiles Essentielles',
      sustainable: 'Durable',
      cassava: 'Produits de Manioc',
      pepper: 'Poivre et Épices',
      bulkExport: 'Exportation en Vrac',
      more: 'Plus'
    }
  },
  ko: {
    about: '회사 소개',
    blog: '블로그',
    contactUs: '문의하기',
    search: '검색',
    downloadCatalog: '카탈로그 다운로드',
    generating: '생성 중...',
    categories: {
      newArrivals: '신제품',
      cocoaPowder: '코코아 가루',
      indonesianCloves: '인도네시아 정향',
      cocopeatMedia: '코코피트 상토',
      spicesHerbs: '향신료 및 허브',
      essentialOils: '에센셜 오일',
      sustainable: '지속 가능',
      cassava: '카사바 제품',
      pepper: '후추 및 향신료',
      bulkExport: '벌크 수출',
      more: '더보기'
    }
  }
}

const Header: React.FC<HeaderProps> = ({ isIndonesian = false, language = 'en' }) => {
  const t = translations[language]
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSearchClosing, setIsSearchClosing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  const toggleSearch = () => {
    if (isSearchOpen) {
      closeSearch()
    } else {
      setIsSearchOpen(true)
      setIsSearchClosing(false)
      setSearchQuery('')
    }
  }

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen)
  }

  const handleLanguageKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleLanguage()
    } else if (e.key === 'Escape') {
      setIsLanguageOpen(false)
    }
  }

  const handleLanguageChange = (lang: 'id' | 'en' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko') => {
    setIsLanguageOpen(false)
    const currentPath = location.pathname

    // Store language preference
    storeLanguage(lang)

    // Track language switch
    const currentLang = getCurrentLanguageFromUrl() || (isIndonesian ? 'id' : 'en')
    trackEvent.languageSwitch(currentLang, lang)

    // Remove existing language prefix if any
    let cleanPath = currentPath

    // Handle /id/, /eng/, /ar/, /zh/, /ja/, /es/, /fr/, /ko/ (with trailing slash)
    if (currentPath.startsWith('/id/') || currentPath.startsWith('/eng/') || currentPath.startsWith('/ar/') || currentPath.startsWith('/zh/') || currentPath.startsWith('/ja/') || currentPath.startsWith('/es/') || currentPath.startsWith('/fr/') || currentPath.startsWith('/ko/')) {
      cleanPath = currentPath.substring(4) // Remove language prefix
    }
    // Handle /id, /eng, /ar, /zh, /ja, /es, /fr, /ko (without trailing slash)
    else if (currentPath === '/id' || currentPath === '/eng' || currentPath === '/ar' || currentPath === '/zh' || currentPath === '/ja' || currentPath === '/es' || currentPath === '/fr' || currentPath === '/ko') {
      cleanPath = '/' // Go to home
    }
    // Handle language prefix followed by more path
    else if (currentPath.startsWith('/id') || currentPath.startsWith('/eng') || currentPath.startsWith('/ar') || currentPath.startsWith('/zh') || currentPath.startsWith('/ja') || currentPath.startsWith('/es') || currentPath.startsWith('/fr') || currentPath.startsWith('/ko')) {
      cleanPath = currentPath.substring(3) // Remove language prefix
    }

    // If cleanPath is empty or just '/', go to home with language prefix for SEO
    if (!cleanPath || cleanPath === '/') {
      const newPath = lang === 'id' ? '/id' : (lang === 'ar' ? '/ar' : (lang === 'zh' ? '/zh' : (lang === 'ja' ? '/ja' : (lang === 'es' ? '/es' : (lang === 'fr' ? '/fr' : (lang === 'ko' ? '/ko' : '/eng'))))))
      navigate(newPath)
      return
    }

    // For other paths, preserve the path and set ?lang=...
    const params = new URLSearchParams(location.search)
    params.set('lang', lang)
    navigate({ pathname: cleanPath, search: `?${params.toString()}` })
  }


  const getCurrentLanguageFromUrl = () => {
    const path = location.pathname
    if (path.startsWith('/id')) return 'id'
    if (path.startsWith('/eng')) return 'en'
    if (path.startsWith('/ar')) return 'ar'
    if (path.startsWith('/zh')) return 'zh'
    if (path.startsWith('/ja')) return 'ja'
    if (path.startsWith('/es')) return 'es'
    if (path.startsWith('/fr')) return 'fr'
    if (path.startsWith('/ko')) return 'ko'
    const params = new URLSearchParams(location.search)
    const qLang = params.get('lang')
    if (qLang === 'id' || qLang === 'en' || qLang === 'ar' || qLang === 'zh' || qLang === 'ja' || qLang === 'es' || qLang === 'fr' || qLang === 'ko') return qLang
    return null
  }

  const getCurrentLanguageDisplay = () => {
    const urlLang = getCurrentLanguageFromUrl()
    if (urlLang) return urlLang.toUpperCase()
    return isIndonesian ? 'ID' : 'EN'
  }

  const getCurrentFlag = () => {
    const urlLang = getCurrentLanguageFromUrl()
    if (urlLang === 'id') return 'flag-id'
    if (urlLang === 'ar') return 'flag-ar'
    if (urlLang === 'zh') return 'flag-zh'
    if (urlLang === 'ja') return 'flag-ja'
    if (urlLang === 'es') return 'flag-es'
    if (urlLang === 'fr') return 'flag-fr'
    if (urlLang === 'ko') return 'flag-ko'
    // Use language prop as fallback, then isIndonesian, then default to English
    if (language === 'id') return 'flag-id'
    if (language === 'ar') return 'flag-ar'
    if (language === 'zh') return 'flag-zh'
    if (language === 'ja') return 'flag-ja'
    if (language === 'es') return 'flag-es'
    if (language === 'fr') return 'flag-fr'
    if (language === 'ko') return 'flag-ko'
    if (isIndonesian) return 'flag-id'
    return 'flag-us'
  }

  const closeSearch = () => {
    setIsSearchClosing(true)
    setTimeout(() => {
      setIsSearchOpen(false)
      setIsSearchClosing(false)
      setSearchQuery('')
    }, 350) // Match the CSS transition duration for closing animation
  }


  const clearSearch = () => {
    setSearchQuery('')
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Track search query
      trackEvent.searchQuery(searchQuery.trim(), filteredProducts.length)
      closeSearch()
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // All products for search - use centralized data
  const filteredProducts = searchQuery.trim()
    ? ALL_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
      .map(p => ({
        name: p.name,
        category: p.categories.join(', '),
        slug: p.slug,
        image: p.image
      }))
    : []

  useEffect(() => {
    const handleScroll = () => {
      // Don't hide header if search is open
      if (isSearchOpen) {
        setIsHeaderVisible(true)
        return
      }

      const currentScrollY = window.scrollY

      // Show header at top (first 100px)
      if (currentScrollY < 100) {
        setIsHeaderVisible(true)
      }
      // Hide header when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, isSearchOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isLanguageOpen) {
        const target = event.target as HTMLElement
        if (!target.closest('.language-switcher')) {
          setIsLanguageOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isLanguageOpen])

  return (
    <header className={`header ${!isHeaderVisible ? 'header-hidden' : ''}`} role="banner" itemScope itemType="https://schema.org/WPHeader">
      {/* Top Header */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <nav className="header-top-nav">
              <Link to="/about" className="header-top-link">{t.about}</Link>
              <Link to="/blog" className="header-top-link">{t.blog}</Link>
              <Link to="/contact-us" className="header-top-link">{t.contactUs}</Link>
            </nav>

            <Link to="/" className="logo">
              <span className="logo-text">Naturra</span>
            </Link>

            <div className="header-top-actions">
              {/* Language Switcher */}
              <div className="language-switcher">
                <button
                  className="language-btn"
                  onClick={toggleLanguage}
                  onKeyDown={handleLanguageKeyDown}
                  aria-label={isIndonesian ? "Pilih bahasa" : "Choose language"}
                  aria-expanded={isLanguageOpen}
                  aria-haspopup="true"
                  tabIndex={0}
                >
                  <span className={`flag ${getCurrentFlag()}`}></span>
                  <span className="language-text">{getCurrentLanguageDisplay()}</span>
                  <ChevronDown size={16} />
                </button>
                {isLanguageOpen && (
                  <div className="language-dropdown" onClick={(e) => e.stopPropagation()} role="menu" aria-label={isIndonesian ? "Pilih bahasa" : "Choose language"}>
                    <button
                      className="language-option"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => handleLanguageChange('id')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleLanguageChange('id')
                        }
                      }}
                    >
                      <span className="flag flag-id"></span>
                      <span>Indonesia</span>
                    </button>
                    <button
                      className="language-option"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => handleLanguageChange('en')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleLanguageChange('en')
                        }
                      }}
                    >
                      <span className="flag flag-us"></span>
                      <span>English</span>
                    </button>
                    <button
                      className="language-option"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => handleLanguageChange('ar')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleLanguageChange('ar')
                        }
                      }}
                    >
                      <span className="flag flag-ar"></span>
                      <span>العربية</span>
                    </button>
                    <button
                      className="language-option"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => handleLanguageChange('zh')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleLanguageChange('zh')
                        }
                      }}
                    >
                      <span className="flag flag-zh"></span>
                      <span>中文</span>
                    </button>
                    <button
                      className="language-option"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => handleLanguageChange('ja')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleLanguageChange('ja')
                        }
                      }}
                    >
                      <span className="flag flag-ja"></span>
                      <span>日本語</span>
                    </button>
                    <button
                      className="language-option"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => handleLanguageChange('es')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleLanguageChange('es')
                        }
                      }}
                    >
                      <span className="flag flag-es"></span>
                      <span>Español</span>
                    </button>
                    <button
                      className="language-option"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => handleLanguageChange('fr')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleLanguageChange('fr')
                        }
                      }}
                    >
                      <span className="flag flag-fr"></span>
                      <span>Français</span>
                    </button>
                    <button
                      className="language-option"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => handleLanguageChange('ko')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleLanguageChange('ko')
                        }
                      }}
                    >
                      <span className="flag flag-ko"></span>
                      <span>한국어</span>
                    </button>
                  </div>
                )}
              </div>

              <button className="search-btn" aria-label={t.search} onClick={toggleSearch}>
                <Search size={20} />
                <span>{t.search}</span>
              </button>
              <button
                className="catalog-btn"
                onClick={async (event) => {
                  try {
                    // Show loading state
                    const button = event.target as HTMLButtonElement
                    button.textContent = t.generating
                    button.disabled = true

                    // Generate catalog in new tab
                    const newWindow = window.open('', '_blank', 'width=800,height=600')
                    if (newWindow) {
                      newWindow.document.write(`
                  <html>
                    <head>
                      <title>Generating Catalog...</title>
                      <style>
                        body { 
                          font-family: Arial, sans-serif; 
                          display: flex; 
                          justify-content: center; 
                          align-items: center; 
                          height: 100vh; 
                          margin: 0; 
                          background: #f5f5f5;
                        }
                        .loading {
                          text-align: center;
                          padding: 40px;
                          background: white;
                          
                          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        }
                        .spinner {
                          border: 4px solid #f3f3f3;
                          border-top: 4px solid #8B7355;
                          
                          width: 40px;
                          height: 40px;
                          animation: spin 1s linear infinite;
                          margin: 0 auto 20px;
                        }
                        @keyframes spin {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                        h2 { color: #333; margin-bottom: 10px; }
                        p { color: #666; margin: 0; }
                      </style>
                    </head>
                    <body>
                      <div class="loading">
                        <div class="spinner"></div>
                        <h2>${t.generating.replace('...', ' Katalog...')}</h2>
                        <p>${language === 'id' ? 'Mohon tunggu sementara kami menyiapkan katalog produk Anda' : language === 'ar' ? 'يرجى الانتظار بينما نقوم بإعداد كتالوج المنتجات الخاص بك' : language === 'zh' ? '请稍候，我们正在准备您的产品目录' : language === 'ja' ? '製品カタログを準備していますのでお待ちください' : language === 'es' ? 'Por favor espere mientras preparamos su catálogo de productos' : language === 'fr' ? 'Veuillez patienter pendant que nous préparons votre catalogue de produits' : language === 'ko' ? '제품 카탈로그를 준비하는 동안 잠시 기다려 주세요' : 'Please wait while we prepare your product catalog'}</p>
                      </div>
                    </body>
                  </html>
                `)
                    }

                    // Send background email notification
                    sendBackgroundEmail('catalog_download', {
                      catalogLanguage: language
                    })

                    await generateCatalog(language)

                    // Track catalog download
                    trackEvent.catalogDownload()

                    // Close the loading window
                    if (newWindow) {
                      newWindow.close()
                    }

                    // Reset button
                    button.textContent = isMobile ? 'CATALOG' : t.downloadCatalog
                    button.disabled = false

                    // NOW show the lead capture / thank you popup
                    setIsCatalogModalOpen(true)

                  } catch (error) {
                    console.error('Error generating catalog:', error)
                    const errorMsg = language === 'id' ? 'Gagal mengunduh katalog. Silakan coba lagi.' : language === 'ar' ? 'فشل تحميل الكتالوج. يرجى المحاولة مرة أخرى.' : language === 'zh' ? '下载目录失败。请重试。' : language === 'ja' ? 'カタログのダウンロードに失敗しました。もう一度お試しください。' : language === 'es' ? 'Error al descargar el catálogo. Por favor, inténtalo de nuevo.' : language === 'fr' ? 'Échec du téléchargement du catalogue. Veuillez réessayer.' : language === 'ko' ? '카탈로그 다운로드에 실패했습니다. 다시 시도해주세요.' : 'Failed to download catalog. Please try again.'
                    alert(errorMsg)

                    // Reset button on error
                    const button = event.target as HTMLButtonElement
                    button.textContent = isMobile ? 'CATALOG' : t.downloadCatalog
                    button.disabled = false
                  }
                }}
              >
                {isMobile ? 'CATALOG' : t.downloadCatalog}
              </button>
            </div>
          </div>
        </div>
      </div>

      <CatalogModal
        show={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
      />

      {/* Bottom Header - Category Navigation */}
      <div className="header-bottom">
        <div className="container">
          {/* Desktop Navigation */}
          <nav className="category-nav">
            <Link to="/product-category/new-arrivals" className="category-link">{t.categories.newArrivals}</Link>
            <Link to="/product-category/cocoa-powder" className="category-link">{t.categories.cocoaPowder}</Link>
            <Link to="/product-category/indonesian-cloves" className="category-link">{t.categories.indonesianCloves}</Link>
            <Link to="/product-category/cocopeat-media" className="category-link">{t.categories.cocopeatMedia}</Link>
            <Link to="/product-category/spices-herbs" className="category-link">{t.categories.spicesHerbs}</Link>
            <Link to="/product-category/essential-oils" className="category-link">{t.categories.essentialOils}</Link>
            <Link to="/product-category/sustainable-growing" className="category-link">{t.categories.sustainable}</Link>
            <Link to="/product-category/cassava-products" className="category-link">{t.categories.cassava}</Link>
            <Link to="/product-category/pepper-spices" className="category-link">{t.categories.pepper}</Link>
            <Link to="/product-category/export-quality" className="category-link">{t.categories.bulkExport}</Link>
          </nav>

          {/* Mobile Compact Category Navigation */}
          <nav className="mobile-category-nav">
            {[
              { to: "/product-category/new-arrivals", label: t.categories.newArrivals },
              { to: "/product-category/cocoa-powder", label: t.categories.cocoaPowder },
              { to: "/product-category/indonesian-cloves", label: t.categories.indonesianCloves },
              { to: "/product-category/cocopeat-media", label: t.categories.cocopeatMedia },
              { to: "/product-category/spices-herbs", label: t.categories.spicesHerbs },
              { to: "/product-category/essential-oils", label: t.categories.essentialOils },
              { to: "/product-category/sustainable-growing", label: t.categories.sustainable },
              { to: "/product-category/cassava-products", label: t.categories.cassava },
              { to: "/product-category/pepper-spices", label: t.categories.pepper },
              { to: "/product-category/export-quality", label: t.categories.bulkExport }
            ].slice(0, showAllCategories ? 10 : 5).map((category) => (
              <Link
                key={category.to}
                to={category.to}
                className="mobile-category-link"
              >
                {category.label}
              </Link>
            ))}
            {!showAllCategories && (
              <button
                className="mobile-category-more"
                onClick={() => setShowAllCategories(true)}
                aria-label={t.categories.more}
              >
                {t.categories.more}
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <>
          <div className={`search-modal-backdrop ${isSearchClosing ? 'closing' : ''}`} onClick={closeSearch}></div>
          <div className={`search-modal-container ${isSearchClosing ? 'closing' : ''}`}>
            <div className="search-modal-content">
              <button className="search-close-btn" onClick={closeSearch} aria-label={isIndonesian ? "Tutup pencarian" : "Close search"}>
                x
              </button>
              <div className="search-modal-inner">
                <div className="search-input-wrapper">
                  <Search size={22} className="search-input-icon" />
                  <input
                    type="text"
                    className="search-modal-input"
                    placeholder={isIndonesian ? "Cari di sini" : "Search here"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                  {searchQuery ? (
                    <>
                      <button className="search-clear-btn" onClick={clearSearch} aria-label={isIndonesian ? "Hapus pencarian" : "Clear search"}>
                        x
                      </button>
                      <button className="search-submit-btn" onClick={handleSearch} aria-label={isIndonesian ? "Cari" : "Search"}>
                        <Search size={20} />
                      </button>
                    </>
                  ) : null}
                </div>

                {/* Search Results */}
                {filteredProducts.length > 0 && (
                  <div className="search-results">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.slug}
                        to={`/product/${product.slug}`}
                        className="search-result-item"
                        onClick={closeSearch}
                      >
                        <div className="search-result-image">
                          <img
                            src={product.image}
                            alt={`${product.name} - ${product.category} Agricultural Commodities Naturra Extal`}
                            title={`${product.name} - Quick Search Result`}
                            loading="lazy"
                            width="60"
                            height="60"
                            itemProp="image"
                            data-image-type="header-search"
                            data-product-name={product.name}
                          />
                        </div>
                        <div className="search-result-info">
                          <div className="search-result-name">{product.name}</div>
                          <div className="search-result-category">{product.category}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Suggestions - only show when no search query */}
                {!searchQuery && (
                  <div className="search-suggestions">
                    <span className="suggestions-label">{language === 'id' ? 'Disarankan:' : language === 'ar' ? 'مقترح:' : language === 'zh' ? '建议：' : language === 'ja' ? 'おすすめ：' : language === 'es' ? 'Sugerido:' : language === 'fr' ? 'Suggéré :' : language === 'ko' ? '추천:' : 'Suggested:'}</span>
                    <Link to="/product-category/cocoa-powder" className="suggestion-tag" onClick={closeSearch}>
                      {t.categories.cocoaPowder}
                    </Link>
                    <Link to="/product-category/indonesian-cloves" className="suggestion-tag" onClick={closeSearch}>
                      {t.categories.indonesianCloves}
                    </Link>
                    <Link to="/product-category/cocopeat-media" className="suggestion-tag" onClick={closeSearch}>
                      {t.categories.cocopeatMedia}
                    </Link>
                    <Link to="/product-category/spices-herbs" className="suggestion-tag" onClick={closeSearch}>
                      {t.categories.spicesHerbs}
                    </Link>
                    <Link to="/product-category/export-quality" className="suggestion-tag" onClick={closeSearch}>
                      {t.categories.bulkExport}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default Header

