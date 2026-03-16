import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import AnnouncementBar from '../components/AnnouncementBar'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import heroImage from '../assets/main-hero-image.webp'
import { getPostsByPage, getTotalPages, getAllBlogPosts } from '../data/blog'
import { generateLanguageSpecificMeta, generateLocalizedUrls, truncateTitle, truncateMetaDescription } from '../utils/seo'
import { getCurrentLanguage, getLinkWithLanguage, type LanguageCode } from '../utils/languageManager'
import './NaturraBlog.css'

const BLOG_INTRO_TRANSLATIONS: Record<
  LanguageCode,
  {
    mainTitle: string
    introParagraph: string
    bullets: {
      title: string
      description: string
    }[]
  }
> = {
  id: {
    mainTitle: '135+ Artikel Furniture Industrial: Panduan Lengkap dari Workshop Bekasi',
    introParagraph:
      'Temukan jawaban lengkap untuk pertanyaan Anda tentang furniture industrial. Artikel kami ditulis berdasarkan pengalaman nyata menangani 1000+ project sejak 1999 di Jabodetabek.',
    bullets: [
      {
        title: 'Tips & Panduan Praktis',
        description:
          'Cara memilih, merawat, dan mengoptimalkan furniture industrial untuk bisnis Anda'
      },
      {
        title: 'Perbandingan Material & Harga',
        description:
          'Data objektif furniture besi vs kayu, custom vs ready, powder coating vs cat'
      },
      {
        title: 'Local Area Guide',
        description:
          'Coverage area lengkap Bekasi, Cikarang, Jakarta dengan workshop terdekat'
      },
      {
        title: 'Design Inspiration',
        description:
          'Tren 2025, kombinasi material, layout optimization untuk cafe dan restoran'
      }
    ]
  },
  en: {
    mainTitle: '135+ Industrial Furniture Articles: Complete Guide from Our Bekasi Workshop',
    introParagraph:
      'Find clear, practical answers to all your questions about industrial furniture. Every article is written based on real projects – 1,000+ jobs handled since 1999 across Greater Jakarta (Jabodetabek).',
    bullets: [
      {
        title: 'Practical Tips & Guides',
        description:
          'How to choose, maintain, and optimize industrial furniture for your café, restaurant, office, or hotel'
      },
      {
        title: 'Material & Price Comparisons',
        description:
          'Objective data on steel vs wood, custom vs ready-made, powder coating vs standard paint'
      },
      {
        title: 'Local Area Guides',
        description:
          'Coverage for Bekasi, Cikarang, Jakarta and nearby areas with the nearest workshop support'
      },
      {
        title: 'Design Inspiration',
        description:
          '2025 trends, material combinations, and layout optimization ideas for hospitality and commercial spaces'
      }
    ]
  },
  ar: {
    mainTitle: 'أكثر من 135 مقالاً عن الأثاث الصناعي: دليل متكامل من ورشة بيكاسي',
    introParagraph:
      'اكتشف إجابات عملية وواضحة عن جميع أسئلتك حول الأثاث الصناعي. كل مقال مبني على خبرة حقيقية من أكثر من 1000 مشروع منذ عام 1999 في منطقة جاكرتا الكبرى.',
    bullets: [
      {
        title: 'نصائح وإرشادات عملية',
        description:
          'كيفية اختيار الأثاث الصناعي المناسب، المحافظة عليه، والاستفادة القصوى منه في مشروعك التجاري'
      },
      {
        title: 'مقارنات المواد والأسعار',
        description:
          'بيانات موضوعية حول الأثاث المعدني مقابل الخشبي، المخصص مقابل الجاهز، بودرة كوتينغ مقابل الدهان العادي'
      },
      {
        title: 'دليل المناطق المحلية',
        description:
          'تغطية كاملة لمناطق بيكاسي، تشيكارانغ، جاكرتا مع أقرب ورشة دعم'
      },
      {
        title: 'إلهام للتصميم',
        description:
          'اتجاهات 2025، دمج المواد، وأفكار لتخطيط المساحات للمقاهي والمطاعم'
      }
    ]
  },
  zh: {
    mainTitle: '135+ 篇工业风家具文章：来自勿加泗工坊的完整指南',
    introParagraph:
      '在这里，你可以找到关于工业风家具的大部分问题的系统答案。所有文章都基于真实项目经验——自 1999 年以来完成 1000+ 个雅加达都会区项目。',
    bullets: [
      {
        title: '实用技巧与操作指南',
        description:
          '如何为咖啡馆、餐厅、办公室、酒店选择、保养并高效利用工业风家具'
      },
      {
        title: '材质与价格对比',
        description:
          '客观对比钢材 vs 木材、定制 vs 成品、粉末喷涂 vs 普通油漆'
      },
      {
        title: '本地区域指南',
        description:
          '覆盖勿加泗、芝卡朗、雅加达等区域，并说明就近工坊支持情况'
      },
      {
        title: '设计灵感',
        description:
          '2025 年趋势、材质搭配，以及适用于咖啡馆和餐厅的平面布局优化'
      }
    ]
  },
  ja: {
    mainTitle: '135本以上の工業系家具記事：ベカシ工房からの完全ガイド',
    introParagraph:
      '工業系家具についての疑問に、実務に基づいた答えをご用意しました。1999年以降、ジャボデタベックで1,000件以上のプロジェクトを手掛けてきた経験を記事化しています。',
    bullets: [
      {
        title: '実践的なヒントとガイド',
        description:
          'カフェ・レストラン・オフィス・ホテル向けの工業系家具の選び方、メンテナンス方法、活用ノウハウ'
      },
      {
        title: '素材・価格比較',
        description:
          'スチール vs 木材、オーダーメイド vs 既製品、パウダーコーティング vs 通常塗装の客観的な比較'
      },
      {
        title: 'ローカルエリアガイド',
        description:
          'ベカシ・チカラン・ジャカルタ周辺エリアの対応範囲と最寄り工房のご案内'
      },
      {
        title: 'デザインインスピレーション',
        description:
          '2025年トレンド、素材ミックス、カフェ／レストランのレイアウト最適化アイデア'
      }
    ]
  },
  es: {
    mainTitle: '135+ Artículos sobre Muebles Industriales: Guía Completa desde nuestro Taller en Bekasi',
    introParagraph:
      'Encuentra respuestas claras y prácticas a tus dudas sobre muebles industriales. Cada artículo está basado en proyectos reales: más de 1.000 trabajos realizados desde 1999 en el área de Yakarta (Jabodetabek).',
    bullets: [
      {
        title: 'Consejos y Guías Prácticas',
        description:
          'Cómo elegir, mantener y sacar el máximo provecho a los muebles industriales en tu negocio'
      },
      {
        title: 'Comparación de Materiales y Precios',
        description:
          'Datos objetivos sobre acero vs madera, muebles a medida vs estándar, powder coating vs pintura convencional'
      },
      {
        title: 'Guías por Zonas',
        description:
          'Cobertura detallada para Bekasi, Cikarang y Yakarta con apoyo de taller cercano'
      },
      {
        title: 'Inspiración de Diseño',
        description:
          'Tendencias 2025, combinaciones de materiales y optimización de distribución para cafés y restaurantes'
      }
    ]
  },
  fr: {
    mainTitle: '135+ Articles sur le mobilier industriel : guide complet depuis notre atelier de Bekasi',
    introParagraph:
      'Trouvez des réponses précises et concrètes à toutes vos questions sur le mobilier industriel. Chaque article s’appuie sur des projets réels : plus de 1 000 réalisations depuis 1999 dans la région de Jakarta (Jabodetabek).',
    bullets: [
      {
        title: 'Conseils & Guides Pratiques',
        description:
          'Comment choisir, entretenir et optimiser le mobilier industriel pour votre café, restaurant, bureau ou hôtel'
      },
      {
        title: 'Comparatifs Matériaux & Prix',
        description:
          'Analyse objective acier vs bois, sur‑mesure vs prêt‑à‑l’emploi, powder coating vs peinture classique'
      },
      {
        title: 'Guides Locaux',
        description:
          'Couverture détaillée de Bekasi, Cikarang et Jakarta avec indication de l’atelier le plus proche'
      },
      {
        title: 'Inspiration Design',
        description:
          'Tendances 2025, associations de matériaux et optimisation des plans pour cafés et restaurants'
      }
    ]
  },
  ko: {
    mainTitle: '135편 이상의 산업용 가구 블로그: 베카시 공방에서 전하는 완전 가이드',
    introParagraph:
      '산업용 가구에 대한 궁금증을 실제 현장 경험을 바탕으로 정리했습니다. 1999년 이후 자보데타벡 전역에서 1,000개 이상의 프로젝트를 수행한 노하우를 글로 담았습니다.',
    bullets: [
      {
        title: '실전 팁 & 가이드',
        description:
          '카페·레스토랑·오피스·호텔에 맞는 산업용 가구 선택, 관리, 활용 방법'
      },
      {
        title: '자재 & 가격 비교',
        description:
          '철제 vs 원목, 맞춤 제작 vs 기성품, 파우더 코팅 vs 일반 도장에 대한 객관적인 비교'
      },
      {
        title: '로컬 서비스 지역 안내',
        description:
          '베카시, 치카랑, 자카르타 등 서비스 가능 지역과 인근 공방 정보'
      },
      {
        title: '디자인 인스피레이션',
        description:
          '2025년 트렌드, 소재 조합, 카페·레스토랑 공간 레이아웃 최적화 아이디어'
      }
    ]
  }
}

const BLOG_PAGINATION_TRANSLATIONS: Record<
  LanguageCode,
  {
    prev: string
    next: string
    numberLocale: string
  }
> = {
  id: { prev: 'Sebelumnya', next: 'Selanjutnya', numberLocale: 'id-ID' },
  en: { prev: 'Prev', next: 'Next', numberLocale: 'en-US' },
  ar: { prev: 'السابق', next: 'التالي', numberLocale: 'ar-EG' },
  zh: { prev: '上一页', next: '下一页', numberLocale: 'zh-CN' },
  ja: { prev: '前へ', next: '次へ', numberLocale: 'ja-JP' },
  es: { prev: 'Anterior', next: 'Siguiente', numberLocale: 'es-ES' },
  fr: { prev: 'Précédent', next: 'Suivant', numberLocale: 'fr-FR' },
  ko: { prev: '이전', next: '다음', numberLocale: 'ko-KR' }
}

const NaturraBlog: React.FC = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const [language, setLanguage] = useState<LanguageCode>(() => {
    return getCurrentLanguage(location.pathname, location.search)
  })

  const [isArchiveExpanded, setIsArchiveExpanded] = useState(false)

  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname, location.search)
    if (currentLang !== language) {
      setLanguage(currentLang)
    }
  }, [location.pathname, location.search, language])

  const isIndonesian = language === 'id'
  const postsPerPage = 8
  const rawPage = Number.parseInt(searchParams.get('page') || '1', 10)
  const totalPages = getTotalPages(postsPerPage)
  const currentPage = Number.isNaN(rawPage) ? 1 : Math.min(Math.max(rawPage, 1), totalPages || 1)
  const posts = getPostsByPage(currentPage, postsPerPage)
  const allBlogPosts = getAllBlogPosts()

  const buildPageUrl = (page: number) => (page <= 1 ? '/blog' : `/blog?page=${page}`)
  const prevUrl = currentPage > 1 ? buildPageUrl(currentPage - 1) : null
  const nextUrl = currentPage < totalPages ? buildPageUrl(currentPage + 1) : null

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const localeMeta = generateLanguageSpecificMeta(isIndonesian)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)
  const intro = BLOG_INTRO_TRANSLATIONS[language] ?? BLOG_INTRO_TRANSLATIONS.en
  const paginationTexts = BLOG_PAGINATION_TRANSLATIONS[language] ?? BLOG_PAGINATION_TRANSLATIONS.en
  const formatPageNumber = (value: number) =>
    new Intl.NumberFormat(paginationTexts.numberLocale).format(value)

  return (
    <div className="blog-page">
      <AnnouncementBar language={language} isIndonesian={isIndonesian} />
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>{truncateTitle('Blog Furniture Industrial & Tips Desain - Naturra Extal')}</title>
        <meta name="description" content={truncateMetaDescription('Panduan lengkap furniture industrial untuk cafe, restoran, hotel. Tips memilih furniture besi custom, cara merawat, tren desain 2025, perbandingan material, harga, dan area workshop Bekasi Jakarta. 135+ artikel berbasis pengalaman 25 tahun Naturra Extal.')} />
        <meta name="keywords" content="blog furniture industrial, tips furniture cafe, cara memilih furniture restoran, furniture besi custom panduan, workshop furniture bekasi, harga furniture industrial 2025, tips desain interior industrial, furniture cafe murah, perbandingan furniture besi vs kayu, cara merawat furniture industrial, tren furniture 2025, furniture bekasi guide, furniture jakarta tips, inspirasi desain cafe industrial" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`blog-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}
        {prevUrl && <link rel="prev" href={`https://Naturra Extal-living.com${prevUrl}`} />}
        {nextUrl && <link rel="next" href={`https://Naturra Extal-living.com${nextUrl}`} />}

        {/* AI Search Optimization: Clear article purpose */}
        <meta property="og:title" content="Blog Furniture Industrial - 135+ Artikel Tips & Panduan Lengkap" />
        <meta property="og:description" content="Artikel komprehensif tentang furniture industrial: tips pemilihan, perbandingan material, panduan harga, area coverage Jabodetabek, dan best practices dari 1000+ project sejak 1999." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
      </Helmet>

      <NaturraHeader />

      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-image">
          <img
            src={heroImage}
            alt="Blog Furniture Industrial & Tips Desain Cafe Restoran - 135+ Artikel Panduan Lengkap Naturra Extal"
            title="Blog Furniture Industrial - Tips & Panduan Lengkap dari Workshop Bekasi Naturra Extal"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
            itemProp="image"
            data-image-type="blog-hero"
            data-category="blog"
          />
          <div className="blog-hero-overlay"></div>
        </div>
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">Blog & Article</h1>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="blog-content-section">
        <div className="blog-container">
          {/* AI Search Optimized: Clear intent and value proposition */}
          <h2 className="blog-main-title">{intro.mainTitle}</h2>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto 3rem',
            padding: '1.5rem',
            background: '#f8f9fa',
            borderRadius: '8px',
            borderLeft: '4px solid #2C3E50'
          }}>
            <p style={{ margin: '0 0 1rem', fontSize: '1rem', lineHeight: '1.6', color: '#2C3E50' }}>
              {intro.introParagraph}
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.95rem', lineHeight: '1.7', color: '#555' }}>
              {intro.bullets.map((item, index) => (
                <li key={index}>
                  <strong>{item.title}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Grid */}
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.id} className="blog-card">
                <Link to={`/blog/${post.slug}`} className="blog-card-link">
                  <div className="blog-card-image">
                    <img
                      src={post.image}
                      alt={`${post.title} - ${post.category} Blog Furniture Industrial Naturra Extal`}
                      title={`${post.title} - ${post.category} Artikel Furniture Industrial`}
                      loading="lazy"
                      width="400"
                      height="250"
                      itemProp="image"
                      data-image-type="blog-post"
                      data-post-slug={post.slug}
                      data-category={post.category}
                    />
                    <div className="blog-card-badge">Naturra Extal</div>
                  </div>
                  <div className="blog-card-content">
                    <span className="blog-card-category">{post.category.toUpperCase()}</span>
                    <h3 className="blog-card-title">{post.title}</h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Pagination - Compact Version */}
          {totalPages > 1 && (
            <nav className="blog-pagination" aria-label="Blog pagination">
              {currentPage > 1 && (
                <Link
                  to={buildPageUrl(currentPage - 1)}
                  className="pagination-btn pagination-prev"
                  aria-label="Previous page"
                >
                  {paginationTexts.prev}
                </Link>
              )}

              {/* Smart Pagination with Ellipsis */}
              {(() => {
                const pages: (number | string)[] = []
                const showEllipsis = totalPages > 7

                if (!showEllipsis) {
                  // Show all pages if 7 or less
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i)
                  }
                } else {
                  // Always show first page
                  pages.push(1)

                  if (currentPage <= 3) {
                    // Near the beginning
                    pages.push(2, 3, 4, 5, '...', totalPages)
                  } else if (currentPage >= totalPages - 2) {
                    // Near the end
                    pages.push('...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
                  } else {
                    // In the middle
                    pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
                  }
                }

                return pages.map((page, index) => {
                  if (page === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className="pagination-ellipsis" aria-hidden="true">
                        ...
                      </span>
                    )
                  }

                  const pageNumber = page as number
                  return (
                    <Link
                      key={pageNumber}
                      to={buildPageUrl(pageNumber)}
                      className={`pagination-btn pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                      aria-current={currentPage === pageNumber ? 'page' : undefined}
                    >
                      {formatPageNumber(pageNumber)}
                    </Link>
                  )
                })
              })()}

              {currentPage < totalPages && (
                <Link
                  to={buildPageUrl(currentPage + 1)}
                  className="pagination-btn pagination-next"
                  aria-label="Next page"
                >
                  {paginationTexts.next}
                </Link>
              )}
            </nav>
          )}

          {/* Complete Blog Archive - Collapsible for SEO */}
          <div className="blog-archive-section" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #e0e0e0' }}>
            <button
              className="blog-archive-toggle"
              onClick={() => setIsArchiveExpanded(!isArchiveExpanded)}
              aria-expanded={isArchiveExpanded}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: 'none',
                border: 'none',
                padding: '1rem 0',
                cursor: 'pointer',
                color: '#2C3E50',
                fontSize: '1.1rem',
                fontWeight: 600
              }}
            >
              <span>
                {language === 'id' ? "Arsip Blog Lengkap (Semua Artikel)" :
                  language === 'ar' ? "أرشيف المدونة الكامل (جميع المقالات)" :
                    language === 'zh' ? "完整博客存档（所有文章）" :
                      language === 'ja' ? "完全なブログアーカイブ（全記事）" :
                        language === 'es' ? "Archivo Completo del Blog (Todos los Artículos)" :
                          language === 'fr' ? "Archives Complètes du Blog (Tous les Articles)" :
                            language === 'ko' ? "완전한 블로그 아카이브 (모든 기사)" :
                              "Complete Blog Archive (All Articles)"}
              </span>
              {isArchiveExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
            <nav
              className={`blog-archive-links ${isArchiveExpanded ? 'expanded' : 'collapsed'}`}
              aria-label="All blog posts"
              aria-hidden={!isArchiveExpanded}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '10px 20px',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease, opacity 0.3s ease',
                maxHeight: isArchiveExpanded ? '800px' : '0',
                opacity: isArchiveExpanded ? 1 : 0,
                paddingTop: isArchiveExpanded ? '1rem' : '0',
                paddingBottom: isArchiveExpanded ? '1rem' : '0'
              }}
            >
              {allBlogPosts.map((post) => (
                <Link
                  key={post.id}
                  to={getLinkWithLanguage(`/blog/${post.slug}`, language)}
                  style={{
                    color: '#555',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'color 0.3s ease',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#8B7355'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                >
                  {post.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>


      <NaturraFooter />
    </div>
  )
}

export default NaturraBlog

