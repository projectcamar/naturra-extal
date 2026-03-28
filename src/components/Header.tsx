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
      loungeSet: 'Lounge Set',
      sofaBench: 'Sofa Bench',
      diningSet: 'Dining Set',
      barSet: 'Bar Set',
      outdoor: 'Outdoor',
      daybed: 'Daybed',
      storage: 'Storage',
      tables: 'Tables',
      dineTable: 'Dine Table',
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
      loungeSet: 'Set Lounge',
      sofaBench: 'Sofa Bench',
      diningSet: 'Set Makan',
      barSet: 'Set Bar',
      outdoor: 'Outdoor',
      daybed: 'Daybed',
      storage: 'Penyimpanan',
      tables: 'Meja',
      dineTable: 'Meja Makan',
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
      loungeSet: 'طقم صالة',
      sofaBench: 'أريكة',
      diningSet: 'طقم طعام',
      barSet: 'طقم بار',
      outdoor: 'خارجي',
      daybed: 'سرير نهاري',
      storage: 'تخزين',
      tables: 'طاولات',
      dineTable: 'طاولة طعام',
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
      loungeSet: '休息区套装',
      sofaBench: '沙发长椅',
      diningSet: '餐桌套装',
      barSet: '吧台套装',
      outdoor: '户外',
      daybed: '躺椅',
      storage: '储物',
      tables: '桌子',
      dineTable: '餐桌',
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
      loungeSet: 'ラウンジセット',
      sofaBench: 'ソファベンチ',
      diningSet: 'ダイニングセット',
      barSet: 'バーセット',
      outdoor: 'アウトドア',
      daybed: 'デイベッド',
      storage: '収納',
      tables: 'テーブル',
      dineTable: 'ダイニングテーブル',
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
      loungeSet: 'Set de Sala',
      sofaBench: 'Sofá Banco',
      diningSet: 'Set de Comedor',
      barSet: 'Set de Bar',
      outdoor: 'Exterior',
      daybed: 'Cama de Día',
      storage: 'Almacenamiento',
      tables: 'Mesas',
      dineTable: 'Mesa de Comedor',
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
      loungeSet: 'Set de Salon',
      sofaBench: 'Banc Canapé',
      diningSet: 'Set de Salle à Manger',
      barSet: 'Set de Bar',
      outdoor: 'Extérieur',
      daybed: 'Lit de Jour',
      storage: 'Rangement',
      tables: 'Tables',
      dineTable: 'Table à Manger',
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
      loungeSet: '라운지 세트',
      sofaBench: '소파 벤치',
      diningSet: '다이닝 세트',
      barSet: '바 세트',
      outdoor: '야외용',
      daybed: '데이베드',
      storage: '수납',
      tables: '테이블',
      dineTable: '식탁',
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
                        <p>${language === 'id' ? 'Mohon tunggu sementara kami menyiapkan katalog furniture Anda' : language === 'ar' ? 'يرجى الانتظار بينما نقوم بإعداد كتالوج الأثاث الخاص بك' : language === 'zh' ? '请稍候，我们正在准备您的家具目录' : language === 'ja' ? '家具カタログを準備していますのでお待ちください' : language === 'es' ? 'Por favor espere sementara preparamos su catálogo de muebles' : language === 'fr' ? 'Veuillez patienter pendant que nous préparons votre catalogue de meubles' : language === 'ko' ? '가구 카탈로그를 준비하는 동안 잠시 기다려 주세요' : 'Please wait while we prepare your furniture catalog'}</p>
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
            <Link to="/product-category/lounge-seating-set" className="category-link">{t.categories.loungeSet}</Link>
            <Link to="/product-category/industrial-sofa-bench" className="category-link">{t.categories.sofaBench}</Link>
            <Link to="/product-category/dining-set-collection" className="category-link">{t.categories.diningSet}</Link>
            <Link to="/product-category/bar-furniture-collection" className="category-link">{t.categories.barSet}</Link>
            <Link to="/product-category/balcony-outdoor-collection" className="category-link">{t.categories.outdoor}</Link>
            <Link to="/product-category/daybed-lounge-frame" className="category-link">{t.categories.daybed}</Link>
            <Link to="/product-category/accessories-storage" className="category-link">{t.categories.storage}</Link>
            <Link to="/product-category/table-collection" className="category-link">{t.categories.tables}</Link>
            <Link to="/product-category/dining-table-collection" className="category-link">{t.categories.dineTable}</Link>
          </nav>

          {/* Mobile Compact Category Navigation */}
          <nav className="mobile-category-nav">
            {[
              { to: "/product-category/new-arrivals", label: t.categories.newArrivals },
              { to: "/product-category/lounge-seating-set", label: t.categories.loungeSet },
              { to: "/product-category/industrial-sofa-bench", label: t.categories.sofaBench },
              { to: "/product-category/dining-set-collection", label: t.categories.diningSet },
              { to: "/product-category/bar-furniture-collection", label: t.categories.barSet },
              { to: "/product-category/balcony-outdoor-collection", label: t.categories.outdoor },
              { to: "/product-category/daybed-lounge-frame", label: t.categories.daybed },
              { to: "/product-category/accessories-storage", label: t.categories.storage },
              { to: "/product-category/table-collection", label: t.categories.tables },
              { to: "/product-category/dining-table-collection", label: t.categories.dineTable }
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
                    <Link to="/product-category/lounge-seating-set" className="suggestion-tag" onClick={closeSearch}>
                      {t.categories.loungeSet}
                    </Link>
                    <Link to="/product-category/industrial-sofa-bench" className="suggestion-tag" onClick={closeSearch}>
                      {t.categories.sofaBench}
                    </Link>
                    <Link to="/product-category/dining-set-collection" className="suggestion-tag" onClick={closeSearch}>
                      {t.categories.diningSet}
                    </Link>
                    <Link to="/product-category/bar-furniture-collection" className="suggestion-tag" onClick={closeSearch}>
                      {t.categories.barSet}
                    </Link>
                    <Link to="/product-category/accessories-storage" className="suggestion-tag" onClick={closeSearch}>
                      {t.categories.storage}
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

