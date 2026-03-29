import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link, useLocation, Navigate } from 'react-router-dom'
import { Mail, MessageCircle, Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react'
import NaturraHeader from '../components/NaturraHeader'
import NaturraFooter from '../components/NaturraFooter'
import Breadcrumb from '../components/Breadcrumb'
import ServiceAreasSection from '../components/ServiceAreasSection'
import AuthorCard from '../components/AuthorCard'
import { getPostBySlug, BLOG_POSTS, type BlogPost } from '../data/blog'
import { ALL_PRODUCTS } from '../data/products'
import { getBlogPostContentLocalized, type BlogSection } from '../data/blogContent'
import { convertIDRToUSD, convertIDRToCurrency } from '../utils/currencyConverter'
import { generateBlogPostingSchema, generateFAQSchema } from '../utils/structuredData'
import { generateLanguageSpecificMeta, generateLocalizedUrls, truncateTitle, truncateMetaDescription } from '../utils/seo'
import BlogProductShowcase from '../components/BlogProductShowcase'
import { getRelevantProductsForBlog, getProductShowcaseHeading } from '../utils/blogProductMapping'
import { getCurrentLanguage, type LanguageCode } from '../utils/languageManager'
import { trackWhatsAppClick } from '../utils/whatsappTracking'
import {
  SIDEBAR_FEATURES_TRANSLATIONS,
  BLOG_POST_TRANSLATIONS,
  BLOG_PRODUCT_SHOWCASE_DESCRIPTION,
  MENTIONED_PRODUCT_LABEL,
  VIEW_PRODUCT_LABEL,
  CTA_TRANSLATIONS
} from '../utils/blogTranslations'
import './NaturraBlog.css'
import './NaturraBlogPost.css'
import '../components/DualLanguage.css'

// Translations imported from ../utils/blogTranslations

/**
 * Component to handle localized currency display for mentioned products
 */
const ProductMentionPrice: React.FC<{ price: string; language: LanguageCode }> = ({ price, language }) => {
  const [highlightedPrice, setHighlightedPrice] = useState<string>(price)
  const [secondaryPrice, setSecondaryPrice] = useState<string | null>(null)

  useEffect(() => {
    const convert = async () => {
      if (language === 'id') {
        const usdVal = await convertIDRToUSD(price);
        setHighlightedPrice(price);
        setSecondaryPrice(usdVal);
        return;
      }

      const currencyMap: Record<string, 'USD' | 'SAR' | 'CNY' | 'JPY' | 'EUR' | 'KRW'> = {
        'en': 'USD',
        'ar': 'SAR',
        'zh': 'CNY',
        'ja': 'JPY',
        'es': 'EUR',
        'fr': 'EUR',
        'ko': 'KRW'
      };

      const targetCurrency = currencyMap[language] || 'USD';

      try {
        const converted = await convertIDRToCurrency(price, targetCurrency);
        setHighlightedPrice(converted);

        if (targetCurrency !== 'USD') {
          const usdVal = await convertIDRToUSD(price);
          setSecondaryPrice(usdVal);
        } else {
          // For English/others where USD is primary, show IDR as secondary
          setSecondaryPrice(price);
        }
      } catch (error) {
        console.error('Price conversion error:', error);
      }
    };

    convert();
  }, [price, language]);

  return (
    <div className="mentioned-product-price-container">
      <span className="mentioned-product-price-primary">{highlightedPrice}</span>
      {secondaryPrice && <span className="mentioned-product-price-secondary">{secondaryPrice}</span>}
    </div>
  );
};

// CTA translations imported from ../utils/blogTranslations

const NaturraBlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const [isIndonesian, setIsIndonesian] = useState(false)
  const [isLanguageLoading, setIsLanguageLoading] = useState(true)
  const [language, setLanguage] = useState<LanguageCode>('en')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [newsletterLoading, setNewsletterLoading] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const post = slug ? getPostBySlug(slug) : undefined

  // Check if post has custom content, otherwise use AI-generated content
  const hasCustomContent = post?.customContent && (
    post.customContent.introduction ||
    (post.customContent.sections && post.customContent.sections.length > 0) ||
    post.customContent.conclusion
  )

  const content = slug ? (hasCustomContent ? {
    sections: [
      // Introduction section
      ...(post.customContent?.introduction ? [{
        heading: '',
        paragraphs: [post.customContent.introduction]
      }] : []),
      // Custom sections
      ...(post.customContent?.sections?.map(section => ({
        heading: section.heading,
        paragraphs: [section.content],
        image: section.image,
        imageAlt: section.imageAlt,
        productId: section.productId
      } as BlogSection)) || []),
      // Conclusion section
      ...(post.customContent?.conclusion ? [{
        heading: '',
        paragraphs: [post.customContent.conclusion]
      }] : [])
    ]
  } : getBlogPostContentLocalized(slug, language)) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    // If the post has custom content with an explicit language set, use it.
    // Otherwise, fall back to URL/browser detection.
    if (post?.customContent?.language) {
      const explicitLang = post.customContent.language
      setLanguage(explicitLang)
      setIsIndonesian(explicitLang === 'id')
      setIsLanguageLoading(false)
    } else {
      const detectedLang = getCurrentLanguage(location.pathname, location.search)
      setLanguage(detectedLang)
      setIsIndonesian(detectedLang === 'id')
      setIsLanguageLoading(false)
    }
  }, [location.pathname, location.search, post?.customContent?.language])

  if (isLanguageLoading) {
    return (
      <div className="blog-page blog-post-page">
        <NaturraHeader />
        <main className="blog-post-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #333',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
            <p>Loading...</p>
          </div>
        </main>
        <NaturraFooter />
      </div>
    )
  }

  // Redirect to NotFound page if blog post doesn't exist to prevent Soft 404
  if (!post || !content) {
    return <Navigate to="/404-not-found" replace />
  }

  // Get other articles (exclude current)
  const otherArticles = BLOG_POSTS
    .filter(p => p.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 7)

  // Share article functions
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const articleTitle = post?.title || ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 3000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(articleTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${articleTitle} ${currentUrl}`)}`
  }

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim() || newsletterLoading) return

    setNewsletterLoading(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'Blog Visitor',
          email: newsletterEmail,
          notificationType: 'newsletter_subscription',
          blogPost: post?.title || '',
          blogPostUrl: window.location.href,
          language: language
        }),
      })
      setNewsletterSubmitted(true)
      setNewsletterEmail('')
      setTimeout(() => setNewsletterSubmitted(false), 5000)
    } catch (error) {
      console.error('Newsletter subscription error:', error)
    } finally {
      setNewsletterLoading(false)
    }
  }

  // Get translations for sidebar features
  const sidebarFeatures = BLOG_POST_TRANSLATIONS[language] ?? BLOG_POST_TRANSLATIONS.en

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: post.category, path: '/blog' },
    { label: post.title, path: `/blog/${post.slug}` }
  ]

  // Generate SEO-optimized keywords based on post slug
  const generateKeywords = (slug: string, title: string) => {
    const keywordMap: { [key: string]: string } = {
      // HIGH-INTENT KEYWORDS
      'indonesian-cocoa-export-requirements': 'indonesian cocoa export, cocoa export requirements, export cocoa beans indonesia, premium cocoa powder supplier',
      'sourcing-premium-cloves-indonesia': 'sourcing premium cloves, indonesian cloves supplier, cengkeh export indonesia, buy cloves bulk',
      'cocopeat-supplier-guide-agriculture': 'cocopeat supplier indonesia, cocopeat bulk export, sustainable agriculture cocopeat, indonesian cocopeat manufacturer',
      'global-commodity-trading-logistics': 'global commodity trading, agricultural logistics export, shipping soft commodities, indonesian export logistics'
    }
    return keywordMap[slug] || `${title}, agricultural commodities, cocoa export, indonesian cloves, cocopeat, Naturra Extal`
  }

  // Generate BlogPosting Schema
  const blogSchema = generateBlogPostingSchema(post)
  const metaDescription = (post.excerpt && post.excerpt.trim().length > 0)
    ? post.excerpt
    : (post.category === 'Export & International'
      ? `Read: ${post.title} — Practical guide, FAQs, and product references from Naturra Extal.`
      : `Baca: ${post.title} — Panduan praktis, FAQ, dan referensi produk dari Naturra Extal.`)

  // Extract FAQ from content for AI Search Optimization (Strategy 1 & 5)
  const extractFAQFromContent = () => {
    if (!content?.sections) return []

    const faqSection = content.sections.find(section =>
      section.heading?.toLowerCase().includes('faq') ||
      section.heading?.toLowerCase().includes('pertanyaan')
    )

    if (!faqSection?.list) return []

    // Parse FAQ list items (format: <strong>Question</strong><br/>Answer)
    return faqSection.list.map(item => {
      // Split by <br/> or : while preserving the content
      const parts = item.split(/<br\s*\/?>|:\s*/)

      if (parts.length >= 2) {
        return {
          question: parts[0].replace(/<[^>]*>/g, '').trim(),
          answer: parts.slice(1).join(' ').replace(/<[^>]*>/g, '').trim()
        }
      }
      return null
    }).filter(Boolean) as Array<{ question: string; answer: string }>
  }

  const faqData = extractFAQFromContent()
  const faqSchema = faqData.length > 0 ? generateFAQSchema(faqData) : null

  // Check if this blog post should show Service Areas Section
  // Currently disabled for Naturra Extal as it's a global trading company
  const shouldShowServiceAreas = false

  const localeMeta = generateLanguageSpecificMeta(isIndonesian)
  const localizedUrls = generateLocalizedUrls(location.pathname, location.search)

  const formattedDate = new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="blog-page blog-post-page">
      <Helmet htmlAttributes={{ lang: localeMeta.lang, dir: localeMeta.direction, 'data-language': localeMeta.lang }}>
        <title>{truncateTitle(`${post.title} - Naturra Extal`)}</title>
        <meta name="description" content={truncateMetaDescription(metaDescription)} />
        <meta name="keywords" content={generateKeywords(post.slug, post.title)} />
        <meta httpEquiv="content-language" content={localeMeta.lang} />
        {/* Robots meta - allow indexing, follow links, point to canonical */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={localizedUrls.canonical} />
        {localizedUrls.alternates.map((alternate) => (
          <link key={`blog-post-hreflang-${alternate.hrefLang}`} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
        ))}

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={localizedUrls.canonical} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author || 'Naturra Extal'} />
        <meta property="og:locale" content={localeMeta.locale} />
        <meta property="og:locale:alternate" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
        {post.author === 'Moh Rifki' && (
          <>
            <meta name="author" content="Moh Rifki" />
            <meta name="article:author" content="Moh Rifki" />
            <meta name="article:author:role" content="Export Associate / International Business Development at Naturra Extal" />
            <meta name="article:author:expertise" content="International Trade, Agricultural Commodities, Export Logistics, Cocoa Supply Chain, Global Market Development" />
            <meta name="article:author:experience" content="Specialized in the Indonesian agricultural commodity sector, bridging the gap between local farming communities and the global market." />
            <meta name="article:author:education" content="Asiatop / Universitas Padjadjaran" />
            <meta name="article:author:specialization" content="International Business Development & Export Operations" />
            <link rel="author" href="https://www.linkedin.com/in/mohamad-bebi-rifki/" />
          </>
        )}

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={post.image} />

        {/* BlogPosting Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>

        {/* FAQ Structured Data for AI Search Optimization */}
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>
      <NaturraHeader />

      <section className="blog-post-hero" aria-labelledby="blog-post-title">
        <div className="blog-post-hero-image">
          <img
            src={post.image}
            alt={`${post.title} - ${post.category} Agricultural Commodities Article by Naturra Extal`}
            title={`${post.title} | Naturra Extal`}
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
          />
          <div className="blog-post-hero-overlay" />
        </div>
        <div className="blog-post-hero-content">
          <div className="blog-post-hero-inner">
            <span className="blog-post-category-tag">{post.category}</span>
            <h1 id="blog-post-title" className="blog-post-title">
              {post.title}
            </h1>
            <p className="blog-post-meta">
              {post.author || 'Naturra Extal'} · {formattedDate}
            </p>
          </div>
        </div>
      </section>

      <div className="blog-breadcrumb-container">
        <div className="blog-post-container">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <main className="blog-post-main" aria-labelledby="blog-post-title">
        <section className="blog-content-section">
          <div className="blog-post-container">

            <div className="blog-post-layout">
              <article className="blog-post-article" aria-labelledby="blog-post-title">
                {content.sections.map((section: BlogSection, index: number) => (
                  <React.Fragment key={index}>
                    <section className="blog-post-section">
                      {section.heading && <h2 className="blog-post-section-heading">{section.heading}</h2>}

                      {section.paragraphs?.map((para: string, pIndex: number) => (
                        <p
                          key={pIndex}
                          className="blog-post-paragraph"
                          dangerouslySetInnerHTML={{ __html: para }}
                        />
                      ))}

                      {section.image && (
                        <figure className="blog-post-figure">
                          <img
                            src={section.image}
                            alt={section.imageAlt || `${post.title} - ${section.heading || 'Agricultural Commodities Article'} - Naturra Extal`}
                            title={section.imageAlt || `${post.title} - ${section.heading || 'agricultural commodities Guide'} by Naturra Extal`}
                            loading="lazy"
                            width="800"
                            height="500"
                            itemProp="image"
                            data-image-type="blog-content"
                            data-post-slug={post.slug}
                            data-section-heading={section.heading || ''}
                          />
                          {section.imageAlt && <figcaption className="blog-post-figcaption">{section.imageAlt}</figcaption>}
                        </figure>
                      )}

                      {/* Mentioned Product Card */}
                      {section.productId && (() => {
                        const product = ALL_PRODUCTS.find(p => p.id === section.productId);
                        if (!product) return null;

                        return (
                          <div className="blog-post-mentioned-product">
                            <div className="mentioned-product-image">
                              <img src={product.image} alt={product.name} />
                            </div>
                            <div className="mentioned-product-info">
                              <span className="mentioned-product-label">
                                {MENTIONED_PRODUCT_LABEL[language] || MENTIONED_PRODUCT_LABEL.en}
                              </span>
                              <h4 className="mentioned-product-name">{product.name}</h4>
                              <ProductMentionPrice price={product.price} language={language} />
                            </div>
                            <Link
                              to={`/product/${product.slug}?ref=blog_mention&language=${language}`}
                              className="mentioned-product-action"
                            >
                              {VIEW_PRODUCT_LABEL[language] || VIEW_PRODUCT_LABEL.en}
                            </Link>
                          </div>
                        );
                      })()}

                      {section.list && (
                        <ul className="blog-post-list">
                          {section.list.map((item: string, lIndex: number) => (
                            <li key={lIndex} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      )}
                    </section>

                    {index === 2 && (() => {
                      const relevantProducts = getRelevantProductsForBlog(post.slug, post.title, post.excerpt)
                      if (relevantProducts.length > 0) {
                        const showcaseHeading = getProductShowcaseHeading(post.slug, post.title, language)
                        const showcaseDescription = BLOG_PRODUCT_SHOWCASE_DESCRIPTION[language] || BLOG_PRODUCT_SHOWCASE_DESCRIPTION.en

                        return (
                          <div className="blog-post-product-showcase">
                            <BlogProductShowcase
                              products={relevantProducts}
                              heading={showcaseHeading}
                              description={showcaseDescription}
                              language={language}
                            />
                          </div>
                        )
                      }
                      return null
                    })()}
                  </React.Fragment>
                ))}

                {post.author === 'Moh Rifki' && (
                  <div className="blog-post-author-card">
                    <AuthorCard
                      name="Moh Rifki"
                      title={language === 'id' ? 'Export Associate di Asiatop / Unpad' : 'Export Associate at Asiatop / Unpad'}
                      experience={language === 'id' ? [
                        'Pengembangan Bisnis Internasional',
                        'Spesialis Operasi Ekspor',
                        'Rantai Pasok Komoditas Pertanian',
                        'Riset & Analisis Pasar'
                      ] : [
                        'International Business Development',
                        'Export Operations Specialist',
                        'Agricultural Commodity Supply Chain',
                        'Market Research & Analysis'
                      ]}
                      linkedIn="https://www.linkedin.com/in/mohamad-bebi-rifki/"
                      language={language}
                      backgroundImage="https://images.unsplash.com/photo-1559133967-313620786524?auto=format&fit=crop&q=80&w=1200"
                    />
                  </div>
                )}

                {(() => {
                  const showcaseAlreadyShown = content.sections.length > 3

                  if (!showcaseAlreadyShown) {
                    const relevantProducts = getRelevantProductsForBlog(post.slug, post.title, post.excerpt)
                    if (relevantProducts.length > 0) {
                      const showcaseHeading = getProductShowcaseHeading(post.slug, post.title, language)
                      const showcaseDescription = BLOG_PRODUCT_SHOWCASE_DESCRIPTION[language] || BLOG_PRODUCT_SHOWCASE_DESCRIPTION.en

                      return (
                        <div className="blog-post-product-showcase">
                          <BlogProductShowcase
                            products={relevantProducts}
                            heading={showcaseHeading}
                            description={showcaseDescription}
                            language={language}
                          />
                        </div>
                      )
                    }
                  }
                  return null
                })()}

                {post.customContent?.keyPoints && post.customContent.keyPoints.length > 0 && (
                  <div className="key-takeaways-box">
                    <h3 className="key-takeaways-title">
                      🔑 Key Takeaways
                    </h3>
                    <ul className="key-takeaways-list">
                      {post.customContent.keyPoints.map((point: string, idx: number) => (
                        <li key={idx} className="key-takeaway-item">
                          <div className="key-takeaway-icon" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="blog-post-cta-v2">
                  <div className="cta-v2-container">
                    <div className="cta-v2-content">
                      <div className="cta-v2-badge">International Commodity Sourcing</div>
                      <h2 className="cta-v2-title">
                        {CTA_TRANSLATIONS[language]?.title || CTA_TRANSLATIONS.en.title}
                      </h2>
                      <p className="cta-v2-subtitle">
                        {CTA_TRANSLATIONS[language]?.subtitle || CTA_TRANSLATIONS.en.subtitle}
                      </p>
                    </div>
                    <div className="cta-v2-actions">
                      <Link to="/products" className="btn-v2-primary">
                        {CTA_TRANSLATIONS[language]?.viewAllProducts || CTA_TRANSLATIONS.en.viewAllProducts}
                      </Link>
                      <a
                        href="https://wa.me/628951395752"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-v2-secondary"
                        onClick={() => trackWhatsAppClick('blog_post_cta_whatsapp', {
                          blogPost: post?.title || '',
                        })}
                      >
                        {CTA_TRANSLATIONS[language]?.contactUs || CTA_TRANSLATIONS.en.contactUs}
                      </a>
                    </div>
                  </div>
                  <div className="cta-v2-decorator" />
                </div>
              </article>

              {otherArticles.length > 0 && (
                <aside className="blog-post-sidebar" aria-labelledby="blog-post-sidebar-title">
                  <div className="blog-post-sidebar-card card">
                    <h2 id="blog-post-sidebar-title" className="blog-post-sidebar-title">Other Articles</h2>
                    <ul className="blog-post-sidebar-list">
                      {otherArticles.map((article: BlogPost) => (
                        <li key={article.id}>
                          <Link to={`/blog/${article.slug}`} className="blog-post-sidebar-link">
                            <span className="blog-post-sidebar-link-title">{article.title}</span>
                            <span className="blog-post-sidebar-link-category">{article.category}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Feature 1: Newsletter Subscription */}
                  <div className="blog-post-sidebar-feature card">
                    <div className="sidebar-feature-icon">
                      <Mail size={20} />
                    </div>
                    <h3 className="sidebar-feature-title">{sidebarFeatures.newsletter.title}</h3>
                    <p className="sidebar-feature-description">{sidebarFeatures.newsletter.description}</p>
                    {!newsletterSubmitted ? (
                      <form onSubmit={handleNewsletterSubmit} className="sidebar-newsletter-form">
                        <input
                          type="email"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder={sidebarFeatures.newsletter.placeholder}
                          required
                          className="sidebar-newsletter-input"
                          disabled={newsletterLoading}
                        />
                        <button
                          type="submit"
                          className="sidebar-newsletter-btn"
                          disabled={newsletterLoading || !newsletterEmail.trim()}
                        >
                          {newsletterLoading ? '...' : sidebarFeatures.newsletter.button}
                        </button>
                      </form>
                    ) : (
                      <div className="sidebar-newsletter-success">
                        <p>{sidebarFeatures.newsletter.success}</p>
                      </div>
                    )}
                  </div>

                  {/* Feature 2: Share Article */}
                  <div className="blog-post-sidebar-feature card">
                    <div className="sidebar-feature-icon">
                      <Share2 size={20} />
                    </div>
                    <h3 className="sidebar-feature-title">{sidebarFeatures.share.title}</h3>
                    <p className="sidebar-feature-description">{sidebarFeatures.share.description}</p>
                    <div className="share-buttons-grid">
                      <a
                        href={shareUrls.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-button share-facebook"
                        onClick={() => trackWhatsAppClick('blog_post_share_facebook', {
                          blogPost: post?.title || '',
                          blogPostSlug: slug || ''
                        })}
                      >
                        <Facebook size={18} />
                        <span>Facebook</span>
                      </a>
                      <a
                        href={shareUrls.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-button share-twitter"
                        onClick={() => trackWhatsAppClick('blog_post_share_twitter', {
                          blogPost: post?.title || '',
                          blogPostSlug: slug || ''
                        })}
                      >
                        <Twitter size={18} />
                        <span>Twitter</span>
                      </a>
                      <a
                        href={shareUrls.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-button share-linkedin"
                        onClick={() => trackWhatsAppClick('blog_post_share_linkedin', {
                          blogPost: post?.title || '',
                          blogPostSlug: slug || ''
                        })}
                      >
                        <Linkedin size={18} />
                        <span>LinkedIn</span>
                      </a>
                      <a
                        href={shareUrls.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="share-button share-whatsapp"
                        onClick={() => trackWhatsAppClick('blog_post_share_whatsapp', {
                          blogPost: post?.title || '',
                          blogPostSlug: slug || ''
                        })}
                      >
                        <MessageCircle size={18} />
                        <span>WhatsApp</span>
                      </a>
                      <button
                        onClick={handleCopyLink}
                        className={`share-button share-copy ${linkCopied ? 'copied' : ''}`}
                      >
                        {linkCopied ? <Check size={18} /> : <Copy size={18} />}
                        <span>{linkCopied ? sidebarFeatures.share.copied : 'Copy Link'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Feature 3: Free Consultation CTA */}
                  <div className="blog-post-sidebar-feature card sidebar-consultation">
                    <div className="sidebar-feature-icon">
                      <MessageCircle size={20} />
                    </div>
                    <h3 className="sidebar-feature-title">{sidebarFeatures.consultation.title}</h3>
                    <p className="sidebar-feature-description">{sidebarFeatures.consultation.description}</p>
                    <a
                      href={`https://wa.me/+6289513957752?text=${encodeURIComponent(
                        post?.category === 'Export & International'
                          ? `Hello Naturra Extal,\n\nI just read your article: "${post?.title}". I'm interested in Agricultural Commodities for my project. Can I get more information and consultation?\n\nArticle: ${window.location.href}\n\nThank you!`
                          : `Halo Naturra Extal,\n\nSaya baru membaca artikel Anda: "${post?.title}". Saya tertarik dengan agricultural commodities untuk project saya. Bisakah saya mendapatkan informasi lebih lanjut dan konsultasi?\n\nArtikel: ${window.location.href}\n\nTerima kasih!`
                      )}`}
                      className="sidebar-consultation-btn"
                      onClick={() => trackWhatsAppClick('blog_post_consultation_sidebar', {
                        blogPost: post?.title || '',
                        blogPostSlug: slug || '',
                        blogPostCategory: post?.category || ''
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={16} />
                      {sidebarFeatures.consultation.button}
                    </a>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>
      </main>

      {shouldShowServiceAreas && <ServiceAreasSection isIndonesian={isIndonesian} />}

      <NaturraFooter />
    </div >
  )
}

export default NaturraBlogPost

