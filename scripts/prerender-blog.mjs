
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const BASE_URL = process.env.SITEMAP_BASE_URL || 'https://mangala-living.com'

const BLOG_FILE = path.join(ROOT_DIR, 'src', 'data', 'blog.ts')
const BLOG_CONTENT_FILE = path.join(ROOT_DIR, 'src', 'data', 'blogContent.ts')
const PRODUCT_FILE = path.join(ROOT_DIR, 'src', 'data', 'products.ts')
const OUTPUT_DIR = path.join(ROOT_DIR, 'dist', 'blog')
const OUTPUT_ASSETS_DIR = path.join(OUTPUT_DIR, 'assets')

const CSS_FILES = [
  path.join(ROOT_DIR, 'src', 'index.css'),
  path.join(ROOT_DIR, 'src', 'App.css'),
  path.join(ROOT_DIR, 'src', 'pages', 'Blog.css'),
  path.join(ROOT_DIR, 'src', 'pages', 'BlogPost.css'),
  path.join(ROOT_DIR, 'src', 'components', 'Breadcrumb.css'),
  path.join(ROOT_DIR, 'src', 'components', 'BlogProductShowcase.css'),
  path.join(ROOT_DIR, 'src', 'components', 'AuthorCard.css'),
  path.join(ROOT_DIR, 'src', 'components', 'ServiceAreasSection.css'),
  path.join(ROOT_DIR, 'src', 'components', 'Header.css'),
  path.join(ROOT_DIR, 'src', 'components', 'Footer.css'),
  path.join(ROOT_DIR, 'src', 'components', 'DualLanguage.css'),
]

const escapeHtml = (str) => {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const readFileSafe = async (filePath) => {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch (error) {
    console.warn(`[prerender] Unable to read ${filePath}:`, error.message)
    return ''
  }
}

const loadCombinedCss = async () => {
  const cssChunks = []

  for (const cssFile of CSS_FILES) {
    const css = await readFileSafe(cssFile)
    if (css && css.trim().length > 0) {
      cssChunks.push(`/* Source: ${path.relative(ROOT_DIR, cssFile)} */\n${css}`)
    }
  }

  cssChunks.push(`
/* Prerender fallback helpers */
#prerender-fallback {
  opacity: 1;
  transition: opacity 0.4s ease;
}

#prerender-fallback.prerender-fade-out {
  opacity: 0;
  pointer-events: none;
}

.prerender-header-placeholder {
  height: 120px;
}
`)

  return cssChunks.join('\n\n')
}

const loadAppAssets = async () => {
  const indexFile = path.join(ROOT_DIR, 'dist', 'index.html')
  const html = await readFileSafe(indexFile)
  if (!html) {
    console.warn('[prerender] dist/index.html not found or empty. Falling back to inline assets only.')
    return { links: '', scripts: '' }
  }

  const linkMatches = html.match(/<link[^>]+>/g) || []
  const scriptMatches = html.match(/<script[^>]*src="[^"]+"[^>]*><\/script>/g) || []

  const allowedLinkRel = /rel="(?:stylesheet|modulepreload|preload|icon|apple-touch-icon|manifest)"/i
  const assetHrefRegex = /href="\/?assets\//i
  const assetSrcRegex = /src="\/?assets\//i
  const filteredLinks = linkMatches.filter(tag => allowedLinkRel.test(tag) || assetHrefRegex.test(tag))
  const filteredScripts = scriptMatches.filter(tag => assetSrcRegex.test(tag))

  return {
    links: filteredLinks.join('\n  '),
    scripts: filteredScripts.join('\n  ')
  }
}

const formatDate = (isoDate) => {
  try {
    return new Date(isoDate).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return isoDate
  }
}

const sanitizeTypeScript = (code) => {
  let result = ''
  let inString = false
  let stringChar = ''
  let escaped = false
  let inLineComment = false
  let inBlockComment = false

  for (let i = 0; i < code.length; i++) {
    const char = code[i]
    const next = code[i + 1]

    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false
        result += char
      }
      continue
    }

    if (inBlockComment) {
      if (char === '*' && next === '/') {
        inBlockComment = false
        i++
      }
      continue
    }

    if (inString) {
      result += char
      if (escaped) {
        escaped = false
        continue
      }
      if (char === '\\') {
        escaped = true
        continue
      }
      if (char === stringChar) {
        inString = false
      }
      continue
    }

    if (char === '/' && next === '/') {
      inLineComment = true
      i++
      continue
    }

    if (char === '/' && next === '*') {
      inBlockComment = true
      i++
      continue
    }

    if (char === "'" || char === '"' || char === '`') {
      inString = true
      stringChar = char
      result += char
      continue
    }

    result += char
  }

  return result
}

const extractArrayLiteral = (source, identifier) => {
  const pattern = new RegExp(`const\\s+${identifier}\\b[^=]*=`, 'm')
  const match = pattern.exec(source)
  if (!match) {
    return null
  }

  let index = match.index + match[0].length
  const length = source.length

  // Skip whitespace
  while (index < length && /\s/.test(source[index])) {
    index++
  }

  if (source[index] !== '[') {
    return null
  }

  const start = index
  let depth = 0
  let inString = false
  let stringChar = ''
  let escaped = false

  for (let i = index; i < length; i++) {
    const char = source[i]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === stringChar) {
        inString = false
      }
      continue
    }

    if (char === "'" || char === '"' || char === '`') {
      inString = true
      stringChar = char
      continue
    }

    if (char === '[') {
      depth++
    } else if (char === ']') {
      depth--
      if (depth === 0) {
        return source.slice(start, i + 1)
      }
    }
  }

  return null
}

const evaluateArrayLiteral = (literal, identifier, context = {}) => {
  if (!literal) {
    console.warn(`[prerender] Unable to locate array literal for ${identifier}`)
    return []
  }

  const sanitized = sanitizeTypeScript(literal)
  const contextDeclarations = Object.entries(context)
    .map(([key, value]) => `const ${key} = ${JSON.stringify(value)};`)
    .join('\n')

  try {
    // Wrap in parentheses so Function can evaluate array literal
    return Function(`"use strict"; ${contextDeclarations} return (${sanitized});`)()
  } catch (error) {
    console.error(`[prerender] Failed to evaluate array literal for ${identifier}:`, error.message)
    return []
  }
}

const parseTypeScriptArray = (source, identifier, context = {}) => {
  const literal = extractArrayLiteral(source, identifier)
  return evaluateArrayLiteral(literal, identifier, context)
}

const parseBlogPosts = (source) => {
  return parseTypeScriptArray(source, 'BLOG_POSTS').map(post => ({
    ...post,
    author: post.author || 'Helmi Ramdan'
  }))
}

const parseBlogContents = (source) => {
  const contents = parseTypeScriptArray(source, 'BLOG_CONTENTS')
  return Array.isArray(contents) ? contents : []
}

const createSafeFileName = (fileName, usedNames) => {
  const ext = path.extname(fileName)
  const base = path.basename(fileName, ext)
  const sanitizedBase = base
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase() || 'asset'

  let candidate = `${sanitizedBase}${ext}`
  let counter = 1
  while (usedNames.has(candidate)) {
    candidate = `${sanitizedBase}-${counter}${ext}`
    counter++
  }
  usedNames.add(candidate)
  return candidate
}

const parseProductFile = (source) => {
  if (!source) {
    console.warn('[prerender] Product source is empty')
    return { products: [], assetMap: new Map() }
  }

  const importRegex = /import\s+(\w+)\s+from\s+['"]..\/assets\/([^'"]+)['"]/g
  const assetDeclarations = new Map()
  const usedNames = new Set()
  let match

  while ((match = importRegex.exec(source)) !== null) {
    const varName = match[1]
    const relativeAssetPath = match[2]
    const absoluteAssetPath = path.join(ROOT_DIR, 'src', 'assets', relativeAssetPath)
    const safeFileName = createSafeFileName(path.basename(relativeAssetPath), usedNames)

    assetDeclarations.set(varName, {
      sourcePath: absoluteAssetPath,
      outputFileName: safeFileName,
      relativeUrl: `../assets/${safeFileName}`
    })
  }

  const context = {}
  assetDeclarations.forEach((info, varName) => {
    context[varName] = info.relativeUrl
  })

  const products = parseTypeScriptArray(source, 'ALL_PRODUCTS', context)
  const assetMap = new Map()

  assetDeclarations.forEach((info) => {
    assetMap.set(info.relativeUrl, info)
  })

  return { products: Array.isArray(products) ? products : [], assetMap }
}

const PRODUCT_KEYWORD_MAPPINGS = [
  {
    keywords: ['meja', 'table', 'meja makan', 'meja cafe', 'meja bar', 'meja kerja', 'dining table', 'bar table', 'coffee table'],
    productIds: [4, 5, 15, 3]
  },
  {
    keywords: ['kursi', 'chair', 'kursi bar', 'bar chair', 'stall chair', 'barstool'],
    productIds: [6, 7]
  },
  {
    keywords: ['rak', 'rack', 'shelf', 'display', 'storage', 'rak display', 'display rack', 'bookshelf', 'lemari', 'kabinet'],
    productIds: [1, 9, 10, 11, 12, 13]
  },
  {
    keywords: ['bar set', 'bar-set', 'outdoor', 'balcony', 'teras', 'area luar'],
    productIds: [2, 8]
  },
  {
    keywords: ['daybed', 'loung', 'sofa', 'santai', 'lounge set', 'bench'],
    productIds: [16, 17, 3]
  },
  {
    keywords: ['dining set', 'set makan', 'meja kursi set'],
    productIds: [4, 5]
  },
  {
    keywords: ['kitchen', 'dapur', 'cabinet', 'kabinet', 'lemari dapur'],
    productIds: [9, 10]
  },
  {
    keywords: ['gantungan', 'hanging', 'coat rack'],
    productIds: [13, 14]
  }
]

const getRelevantProductsForBlogPost = (post, allProducts) => {
  if (!post || !allProducts.length) {
    return []
  }

  const searchText = `${post.slug || ''} ${post.title || ''} ${post.excerpt || ''}`.toLowerCase()
  const relevantProductIds = new Set()

  for (const mapping of PRODUCT_KEYWORD_MAPPINGS) {
    const hasKeyword = mapping.keywords.some(keyword => searchText.includes(keyword.toLowerCase()))
    if (hasKeyword) {
      mapping.productIds.forEach(id => relevantProductIds.add(id))
    }
  }

  const productMap = new Map(allProducts.map(product => [product.id, product]))
  const matchedProducts = Array.from(relevantProductIds)
    .map(id => productMap.get(id))
    .filter(Boolean)

  if (matchedProducts.length === 0) {
    return allProducts.slice(0, 6)
  }

  return matchedProducts.slice(0, 6)
}

const getProductShowcaseHeadingStatic = (slug = '', title = '') => {
  const searchText = `${slug} ${title}`.toLowerCase()

  if (searchText.includes('meja')) {
    return 'Produk Meja Industrial Pilihan Kami'
  }
  if (searchText.includes('kursi')) {
    return 'Kursi Bar & Cafe Industrial Berkualitas'
  }
  if (searchText.includes('rak') || searchText.includes('display')) {
    return 'Rak Display & Storage Industrial Terbaik'
  }
  if (searchText.includes('bar') || searchText.includes('outdoor')) {
    return 'Bar Set & Outdoor Furniture Industrial'
  }
  if (searchText.includes('dining') || searchText.includes('makan')) {
    return 'Dining Set Industrial untuk Cafe & Restoran'
  }
  if (searchText.includes('kitchen') || searchText.includes('dapur')) {
    return 'Kitchen Cabinet & Storage Industrial'
  }
  if (searchText.includes('lounge') || searchText.includes('daybed')) {
    return 'Lounge Set & Daybed Industrial Nyaman'
  }

  return 'Produk Industrial Terkait yang Mungkin Anda Suka'
}

const convertIDRToUSDStatic = (idrPrice) => {
  if (!idrPrice) return null
  const numericValue = parseFloat(idrPrice.replace(/[^0-9]/g, ''))
  if (!numericValue || Number.isNaN(numericValue)) {
    return null
  }
  const exchangeRate = 15000
  const usdPrice = numericValue / exchangeRate
  if (!usdPrice || !Number.isFinite(usdPrice)) {
    return null
  }

  return usdPrice.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: usdPrice >= 100 ? 0 : 2,
    maximumFractionDigits: usdPrice >= 100 ? 0 : 2
  })
}

const ensureProductAssetsCopied = async (products, assetMap, copiedSet) => {
  for (const product of products) {
    if (!product?.image) continue
    const assetInfo = assetMap.get(product.image)
    if (!assetInfo || copiedSet.has(assetInfo.outputFileName)) continue

    try {
      await fs.copyFile(
        assetInfo.sourcePath,
        path.join(OUTPUT_ASSETS_DIR, assetInfo.outputFileName)
      )
      copiedSet.add(assetInfo.outputFileName)
    } catch (error) {
      console.warn(`[prerender] Failed to copy asset ${assetInfo.outputFileName}:`, error.message)
    }
  }
}

const PRODUCT_KEYWORD_REGEX = /meja|kursi|rak|display|bar|dining|kitchen|furniture|cabinet|shelf|chair|table/i

const hasProductRelatedKeywords = (post) => {
  const combined = `${post.slug || ''} ${post.title || ''}`
  return PRODUCT_KEYWORD_REGEX.test(combined)
}

const normalizeBaseUrl = (url) => {
  if (!url) return ''
  return url.endsWith('/') ? url.slice(0, -1) : url
}

const makeAbsoluteAssetUrl = (baseUrl, relativePath) => {
  if (!relativePath) return null
  const trimmedBase = normalizeBaseUrl(baseUrl)
  const fileName = relativePath.replace('../assets/', '')
  if (!fileName) return null
  return `${trimmedBase}/blog/assets/${encodeURIComponent(fileName)}`
}

const generateAnnouncementBarHTML = (isIndonesian) => {
  const content = isIndonesian
    ? {
      text: 'Wujudkan Furniture Impian Anda!',
      highlight: 'Gratis Konsultasi Desain',
      cta: 'Pesan Custom Order Sekarang'
    }
    : {
      text: 'Bring Your Dream Furniture to Life!',
      highlight: 'Free Design Consultation',
      cta: 'Order Custom Furniture Now'
    }

  return `
    <div class="announcement-bar" role="banner" aria-label="${isIndonesian ? 'Pengumuman' : 'Announcement'}">
      <div class="announcement-content">
        <span class="announcement-text">
          ${content.text} <span class="announcement-highlight">${content.highlight}</span>
        </span>
        <a class="announcement-cta" href="${BASE_URL}/custom-order">
          ${content.cta} &gt;
      </a>
    </div>
  </div>
`
}

const generateHeaderHTML = (isIndonesian) => `
  <header class="header" role="banner">
    <div class="header-top">
      <div class="container">
        <div class="header-top-content">
          <nav class="header-top-nav" aria-label="${isIndonesian ? 'Navigasi utama' : 'Primary navigation'}">
            <a class="header-top-link" href="${BASE_URL}/about">About</a>
            <a class="header-top-link" href="${BASE_URL}/blog">Blog</a>
            <a class="header-top-link" href="${BASE_URL}/contact-us">${isIndonesian ? 'Contact Us' : 'Contact Us'}</a>
        </nav>
          <a class="logo" href="${BASE_URL}/">
            <span class="logo-text">MANGALA</span>
          </a>
          <div class="header-top-actions">
            <div class="language-switcher">
              <button class="language-btn" type="button" aria-label="${isIndonesian ? 'Bahasa utama' : 'Current language'}" disabled>
                <span class="flag ${isIndonesian ? 'flag-id' : 'flag-us'}"></span>
                <span class="language-text">${isIndonesian ? 'ID' : 'EN'}</span>
              </button>
        </div>
            <button class="search-btn" type="button" aria-label="${isIndonesian ? 'Cari' : 'Search'}">
              <span>${isIndonesian ? 'Cari' : 'Search'}</span>
            </button>
            <a class="catalog-btn" href="${BASE_URL}/assets/Mangala-Living-Catalog-2025.pdf" target="_blank" rel="noopener noreferrer">
              ${isIndonesian ? 'Unduh Katalog Kami' : 'Download Our Catalog'}
            </a>
      </div>
    </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="container">
        <nav class="category-nav" aria-label="${isIndonesian ? 'Navigasi kategori produk' : 'Product category navigation'}">
          <a class="category-link" href="${BASE_URL}/product-category/new-arrivals">New Arrivals</a>
          <a class="category-link" href="${BASE_URL}/product-category/lounge-seating-set">Lounge Set</a>
          <a class="category-link" href="${BASE_URL}/product-category/industrial-sofa-bench">Sofa Bench</a>
          <a class="category-link" href="${BASE_URL}/product-category/dining-set-collection">Dining Set</a>
          <a class="category-link" href="${BASE_URL}/product-category/bar-furniture-collection">Bar Set</a>
          <a class="category-link" href="${BASE_URL}/product-category/balcony-outdoor-collection">Outdoor</a>
          <a class="category-link" href="${BASE_URL}/product-category/daybed-lounge-frame">Daybed</a>
          <a class="category-link" href="${BASE_URL}/product-category/accessories-storage">Storage</a>
          <a class="category-link" href="${BASE_URL}/product-category/table-collection">Tables</a>
          <a class="category-link" href="${BASE_URL}/product-category/dining-table-collection">Dine Table</a>
        </nav>
      </div>
    </div>
  </header>
`

const generateBreadcrumbHTML = (post) => {
  const items = [
    { label: 'Home', url: `${BASE_URL}/` },
    { label: post.category || 'Blog', url: `${BASE_URL}/blog` },
    { label: post.title, url: `${BASE_URL}/blog/${post.slug}` }
  ]

  const listItems = items.map((item, index) => {
    const position = index + 1
    const isLast = position === items.length
    const separator = isLast ? '' : '<span class="breadcrumb-separator" aria-hidden="true">›</span>'

    return `
      <li class="breadcrumb-item" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
        ${isLast
        ? `<span itemProp="name" aria-current="page">${escapeHtml(item.label)}</span>`
        : `<a href="${item.url}" itemProp="item"><span itemProp="name">${escapeHtml(item.label)}</span></a>`}
        <meta itemProp="position" content="${position}">
        ${separator}
      </li>
    `
  }).join('\n')

  return `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
        ${listItems}
    </ol>
  </nav>
`
}

const generateArticleMetaHTML = (post, formattedDate) => `
  <p class="blog-post-meta">
    ${escapeHtml(post.author || 'Mangala Living')} · ${formattedDate}
  </p>
`

const generateSectionHTML = (section, post, index) => {
  const parts = []

  if (section.heading) {
    parts.push(`<h2 class="blog-post-section-heading">${escapeHtml(section.heading)}</h2>`)
  }

  if (section.paragraphs?.length) {
    section.paragraphs.forEach(paragraph => {
      if (!paragraph) return
      parts.push(`<p class="blog-post-paragraph">${paragraph}</p>`)
    })
  }

  if (section.image) {
    parts.push(`
      <figure class="blog-post-figure">
        <img
          src="${section.image}"
          alt="${escapeHtml(section.imageAlt || `${post.title} - ${section.heading || 'Industrial Furniture Article'} - Mangala Living`)}"
          loading="${index <= 1 ? 'eager' : 'lazy'}"
          width="800"
          height="500"
        />
        ${section.imageAlt ? `<figcaption class="blog-post-figcaption">${escapeHtml(section.imageAlt)}</figcaption>` : ''}
      </figure>
    `)
  }

  if (section.list?.length) {
    const listItems = section.list.map(item => `<li>${item}</li>`).join('')
    parts.push(`<ul class="blog-post-list">${listItems}</ul>`)
  }

  if (!parts.length) {
    return ''
  }

  return `<section class="blog-post-section">${parts.join('\n')}</section>`
}

const generateArticleSectionsHTML = (content, post) => {
  if (!content?.sections?.length) {
    return ''
  }

  return content.sections
    .map((section, index) => generateSectionHTML(section, post, index))
    .join('\n')
}

const generateProductShowcaseHTML = (products, heading, isIndonesian) => {
  if (!products || products.length === 0) {
    return ''
  }

  const displayProducts = products.slice(0, 3)
  const description = isIndonesian
    ? 'Berikut adalah produk industrial pilihan kami yang relevan dengan topik artikel ini. Semua produk dibuat dengan kualitas premium dan material industrial grade di workshop kami di Bekasi.'
    : 'Discover our premium industrial furniture collection, manufactured in our Bekasi workshop with high-quality materials and powder coating finish.'

  const cards = displayProducts.map((product, index) => {
    const categories = Array.isArray(product.categories) ? product.categories : []
    const usdPrice = convertIDRToUSDStatic(product.price)
    return `
      <article class="blog-product-showcase-item">
        <a class="blog-product-showcase-card" href="${BASE_URL}/product/${product.slug}">
          <div class="blog-product-showcase-image-wrapper">
            ${product.image ? `<img class="blog-product-showcase-image" src="${product.image}" alt="${escapeHtml(product.name)}" loading="${index === 0 ? 'eager' : 'lazy'}" width="350" height="250" />` : ''}
            <div class="blog-product-showcase-badge">
              <span class="blog-product-badge-text">${isIndonesian ? 'Produk Kami' : 'Our Product'}</span>
          </div>
            </div>
          <div class="blog-product-showcase-info">
            <h3 class="blog-product-showcase-name">${escapeHtml(product.name)}</h3>
            ${categories.length ? `<div class="blog-product-showcase-categories">${categories.map(cat => `<span class="blog-product-category-tag">${escapeHtml(cat)}</span>`).join('')}</div>` : ''}
            <div class="blog-product-showcase-price-container">
              <p class="blog-product-showcase-price-primary">${escapeHtml(product.price || '')}</p>
              ${usdPrice ? `<p class="blog-product-showcase-price-secondary">${usdPrice}</p>` : ''}
            </div>
            <div class="blog-product-showcase-cta">
              <span class="blog-product-showcase-link">${isIndonesian ? 'Lihat Detail Produk' : 'View Product Details'}</span>
            </div>
          </div>
        </a>
      </article>
    `
  }).join('\n')

  return `
    <section class="blog-product-showcase">
      <div class="blog-product-showcase-container">
        <div class="blog-product-showcase-header">
          <h2 class="blog-product-showcase-heading">${escapeHtml(heading || (isIndonesian ? 'Produk Industrial Terkait' : 'Related Industrial Products'))}</h2>
          <p class="blog-product-showcase-description">${description}</p>
      </div>
        <div class="blog-product-showcase-grid">
        ${cards}
      </div>
        <div class="blog-product-showcase-footer">
          <a class="blog-product-showcase-all-products-btn" href="${BASE_URL}/shop">${isIndonesian ? 'Lihat Semua Produk' : 'View All Products'}</a>
        </div>
      </div>
    </section>
  `
}

const generateSidebarHTML = (otherArticles) => {
  if (!otherArticles?.length) {
    return ''
  }

  const items = otherArticles.map(article => `
    <li>
      <a class="blog-post-sidebar-link" href="${BASE_URL}/blog/${article.slug}">
        <span class="blog-post-sidebar-link-title">${escapeHtml(article.title)}</span>
        <span class="blog-post-sidebar-link-category">${escapeHtml(article.category || '')}</span>
      </a>
    </li>
  `).join('\n')

  return `
    <aside class="blog-post-sidebar" aria-labelledby="blog-post-sidebar-title">
      <div class="blog-post-sidebar-card card">
        <h2 id="blog-post-sidebar-title" class="blog-post-sidebar-title">Other Articles</h2>
        <ul class="blog-post-sidebar-list">
          ${items}
        </ul>
            </div>
    </aside>
  `
}

const generateAuthorCardHTML = (post, isIndonesian) => {
  if (post.author !== 'Helmi Ramdan') {
    return ''
  }

  const isExport = post.category === 'Export & International'
  const title = isExport
    ? 'Associate at Housing and Settlement Department, DKI Jakarta Province'
    : 'Associate at Dinas Perumahan Rakyat dan Kawasan Permukiman Provinsi DKI Jakarta'
  const experiences = isExport
    ? [
      'Infrastructure Engineer at Damai Putra Group (3+ years)',
      'Design Engineer & Architectural Drafter (5+ years)',
      'Alumni of Diponegoro University',
      'Commercial Space Design & Construction Specialist'
    ]
    : [
      'Infrastructure Engineer at Damai Putra Group (3+ tahun)',
      'Design Engineer & Architectural Drafter (5+ tahun)',
      'Alumni Universitas Diponegoro',
      'Spesialis Commercial Space Design & Construction'
    ]

  return `
    <div class="blog-post-author-card">
      <div class="author-card">
        <div class="author-card-header">
          <div class="author-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
        </div>
          <div class="author-info">
            <h4 class="author-name">${isIndonesian ? 'Oleh:' : 'By:'} Helmi Ramdan</h4>
            <p class="author-title">${escapeHtml(title)}</p>
      </div>
        </div>
        <div class="author-experience">
          ${experiences.map(item => `<span class="experience-item">${escapeHtml(item)}</span>`).join('')}
        </div>
        <a class="author-linkedin" href="https://www.linkedin.com/in/helmi-ramdan-067912118/" target="_blank" rel="noopener noreferrer">
          LinkedIn Profile
        </a>
      </div>
    </div>
  `
}

const generateCTAHTML = (post, isIndonesian) => {
  const isExport = post.category === 'Export & International'
  return `
    <div class="blog-post-cta card">
      <div class="section-header">
        <h2>${isExport ? 'Interested in Our Industrial Furniture?' : 'Tertarik dengan Furniture Industrial Kami?'}</h2>
        <p class="section-subtitle">
          ${isExport
      ? 'Visit our complete collection of high-quality custom industrial furniture from Mangala Living.'
      : 'Kunjungi koleksi lengkap furniture industrial custom berkualitas tinggi dari Mangala Living.'}
        </p>
      </div>
      <div class="blog-post-cta-actions">
        <a class="btn-primary" href="${BASE_URL}/shop">${isExport ? 'View All Products' : 'Lihat Semua Produk'}</a>
        <a class="btn-secondary" href="${BASE_URL}/contact-us">${isExport ? 'Contact Us' : 'Hubungi Kami'}</a>
      </div>
    </div>
  `
}

const generateServiceAreasHTML = (isIndonesian) => `
  <section class="service-areas-section">
    <div class="service-areas-container">
      <div class="service-areas-header">
        <h2 class="section-title">${isIndonesian ? 'Wilayah Layanan Kami' : 'Our Service Areas'}</h2>
        <p class="section-subtitle">${isIndonesian ? 'Melayani Bekasi, Jakarta, dan seluruh Jabodetabek dengan pengalaman 25+ tahun' : 'Serving Bekasi, Jakarta, and entire Jabodetabek with 25+ years of experience'}</p>
        </div>
      <div class="service-area-group">
        <h3 class="area-group-title"><span class="area-icon">*</span>BEKASI KOTA</h3>
        <div class="areas-grid">
          <div class="area-card"><h4 class="area-name">Bekasi Barat</h4><p class="area-kelurahan">Bintara, Kranji, Kota Baru, Jakasampurna</p></div>
          <div class="area-card"><h4 class="area-name">Bekasi Timur</h4><p class="area-kelurahan">Jatiasih, Pekayon, Margahayu, Aren Jaya</p></div>
          <div class="area-card"><h4 class="area-name">Bekasi Selatan</h4><p class="area-kelurahan">Kayuringin Jaya, Pekayon Jaya, Jakasetia</p></div>
          <div class="area-card"><h4 class="area-name">Bekasi Utara</h4><p class="area-kelurahan">Harapan Indah, Pejuang, Kaliabang, Medan Satria</p></div>
          <div class="area-card"><h4 class="area-name">Rawalumbu</h4><p class="area-kelurahan">Bojong Rawalumbu, Sepanjang Jaya, Pengasinan</p></div>
          <div class="area-card"><h4 class="area-name">Pondok Gede</h4><p class="area-kelurahan">Jatiwaringin, Jatibening, Jatiraden</p></div>
          <div class="area-card"><h4 class="area-name">Mustika Jaya</h4><p class="area-kelurahan">Mustikasari, Pedurenan, Cimuning</p></div>
        </div>
        </div>
      <div class="service-area-group">
        <h3 class="area-group-title"><span class="area-icon">*</span>CIKARANG & SEKITARNYA</h3>
        <div class="areas-grid">
          <div class="area-card"><h4 class="area-name">Cikarang Barat</h4><p class="area-kelurahan">Lippo Cikarang, Cibatu, Telaga Murni</p></div>
          <div class="area-card"><h4 class="area-name">Cikarang Utara</h4><p class="area-kelurahan">Karang Asih, Simpangan, Sukamaju</p></div>
          <div class="area-card"><h4 class="area-name">Cikarang Selatan</h4><p class="area-kelurahan">Jababeka, Greenland, Pasirsari</p></div>
          <div class="area-card"><h4 class="area-name">Cikarang Timur</h4><p class="area-kelurahan">Serang Baru, Karangreja, Jayamukti</p></div>
          <div class="area-card"><h4 class="area-name">Cikarang Pusat</h4><p class="area-kelurahan">Taman Galaxy, Lemahabang, Hegarmukti</p></div>
          <div class="area-card"><h4 class="area-name">Tambun Selatan</h4><p class="area-kelurahan">Sertajaya, Mangunjaya, Setiadarma</p></div>
          <div class="area-card"><h4 class="area-name">Tambun Utara</h4><p class="area-kelurahan">Satria Jaya, Karang Satria, Wanasari</p></div>
          <div class="area-card"><h4 class="area-name">Cibitung</h4><p class="area-kelurahan">Wanajaya, Mekarjaya, Lambang Jaya</p></div>
          <div class="area-card"><h4 class="area-name">Setu</h4><p class="area-kelurahan">Telajung (Workshop Location)</p></div>
        </div>
      </div>
      <div class="service-area-group commercial">
        <h3 class="area-group-title"><span class="area-icon">*</span>KAWASAN KOMERSIAL & INDUSTRIAL</h3>
        <div class="commercial-grid">
          ${[
    { icon: 'MB', name: 'Summarecon Bekasi', desc: 'Mall & Boulevard Area' },
    { icon: 'RC', name: 'Harapan Indah', desc: 'Residential & Commercial' },
    { icon: 'GG', name: 'Grand Galaxy City', desc: 'Superblock F&B District' },
    { icon: 'ME', name: 'Galaxy Bekasi', desc: 'Mall & Entertainment' },
    { icon: 'PR', name: 'Kemang Pratama', desc: 'Premium Residential' },
    { icon: 'LC', name: 'Lippo Cikarang', desc: 'Mall & Commercial Hub' },
    { icon: 'IN', name: 'Jababeka', desc: 'Industrial Estate' },
    { icon: 'MU', name: 'Deltamas', desc: 'Mixed-Use Development' },
    { icon: 'EI', name: 'EJIP Cikarang', desc: 'East Jakarta Industrial Park' },
    { icon: 'CR', name: 'Greenland International', desc: 'Commercial & Residential' },
    { icon: 'IT', name: 'MM2100', desc: 'Industrial Town' }
  ].map(area => `
            <div class="commercial-card">
              <span class="commercial-icon">${area.icon}</span>
              <h4 class="commercial-name">${area.name}</h4>
              <p class="commercial-desc">${area.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="service-area-group">
        <h3 class="area-group-title"><span class="area-icon">*</span>JAKARTA & JABODETABEK</h3>
        <div class="areas-grid">
          <div class="area-card jakarta"><h4 class="area-name">Jakarta Timur</h4><p class="area-kelurahan">Cakung, Kramat Jati, Makasar, Cipayung</p></div>
          <div class="area-card jakarta"><h4 class="area-name">Jakarta Pusat</h4><p class="area-kelurahan">Sudirman, Thamrin, Kuningan (CBD)</p></div>
          <div class="area-card jakarta"><h4 class="area-name">Jakarta Selatan</h4><p class="area-kelurahan">Kemang, SCBD, Senopati, Kebayoran</p></div>
          <div class="area-card jakarta"><h4 class="area-name">Depok</h4><p class="area-kelurahan">Margonda, UI, Sawangan</p></div>
          <div class="area-card jakarta"><h4 class="area-name">Bogor</h4><p class="area-kelurahan">Bogor Kota, Cibinong, Sentul</p></div>
          <div class="area-card jakarta"><h4 class="area-name">Karawang</h4><p class="area-kelurahan">Karawang Barat, Karawang Timur</p></div>
          <div class="area-card jakarta"><h4 class="area-name">Cileungsi</h4><p class="area-kelurahan">Metland Transyogi</p></div>
        </div>
      </div>
      <div class="service-areas-cta">
        <div class="cta-content">
          <h3>${isIndonesian ? 'Area Anda Tidak Tercantum?' : 'Your Area Not Listed?'}</h3>
          <p>${isIndonesian ? 'Hubungi kami untuk diskusi cakupan layanan kami. Kami melayani seluruh Jabodetabek dan sekitarnya.' : 'Contact us to discuss our service coverage. We serve entire Jabodetabek and surrounding areas.'}</p>
          <a class="cta-button" href="https://wa.me/+6288801146881?text=Halo%20Mangala%20Living%2C%20saya%20tertarik%20dengan%20furniture%20industrial%20untuk%20area%20saya" target="_blank" rel="noopener noreferrer">
            <span class="whatsapp-icon">WA</span>
            ${isIndonesian ? 'Konsultasi Gratis' : 'Free Consultation'}
          </a>
        </div>
      </div>
      <div class="service-areas-seo-text">
        <p><strong>Mangala Living</strong> adalah workshop furniture industrial terpercaya yang melayani seluruh wilayah Bekasi, Jakarta, dan Jabodetabek. Kami menyediakan solusi custom furniture besi industrial untuk cafe, restoran, hotel, kantor, dan proyek komersial lainnya.</p>
      </div>
    </div>
  </section>
`

const generateFooterHTML = (isIndonesian) => `
  <footer class="footer" role="contentinfo">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h2 class="footer-logo">MANGALA</h2>
          <p class="footer-description">${isIndonesian ? 'Pilihan terbaik untuk furniture industrial scandinavian premium sejak 1999. Melayani coffee shop, restoran, dan bisnis di seluruh Indonesia. Pesanan custom diterima.' : 'Your best choice for premium industrial Scandinavian furniture since 1999. Serving coffee shops, restaurants, and businesses across Indonesia. Custom orders welcome.'}</p>
          <div class="footer-contact-info">
            <h4>${isIndonesian ? 'Hubungi Kami' : 'Contact Us'}</h4>
            <p><a href="mailto:lifewithmangala@gmail.com">lifewithmangala@gmail.com</a></p>
            <p><a href="https://wa.me/+6288801146881" target="_blank" rel="noopener noreferrer">+6288801146881</a></p>
        </div>
        </div>
        <div class="footer-column">
          <h4>${isIndonesian ? 'Temukan Kami' : 'Find Us'}</h4>
          <div class="footer-location">
            <h5>Workshop Bekasi :</h5>
            <p><a class="footer-address-link" href="https://maps.app.goo.gl/5Bc5ymfVtAYRPtpK7" target="_blank" rel="noopener noreferrer">Jl. Raya Setu Cibitung - Bekasi, Jawa Barat 17320</a></p>
          </div>
        </div>
        <div class="footer-column">
          <h4>${isIndonesian ? 'Tautan Cepat' : 'Quick Links'}</h4>
          <ul class="footer-links">
            <li><a href="${BASE_URL}/about">About</a></li>
            <li><a href="${BASE_URL}/blog">Blog</a></li>
            <li><a href="${BASE_URL}/shipping-information">${isIndonesian ? 'Pengiriman' : 'Shipping'}</a></li>
            <li><a href="${BASE_URL}/contact-us">Contact Us</a></li>
            <li><a href="${BASE_URL}/custom-order">${isIndonesian ? 'Custom Order' : 'Custom Order'}</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Categories</h4>
          <ul class="footer-links">
            <li><a href="${BASE_URL}/product-category/new-arrivals">New Arrivals</a></li>
            <li><a href="${BASE_URL}/product-category/lounge-seating-set">Lounge Set</a></li>
            <li><a href="${BASE_URL}/product-category/dining-set-collection">Dining Set</a></li>
            <li><a href="${BASE_URL}/product-category/bar-furniture-collection">Bar Set</a></li>
            <li><a href="${BASE_URL}/product-category/accessories-storage">Storage</a></li>
          </ul>
        </div>
        </div>
      <div class="footer-bottom">
        <p>Copyright ${new Date().getFullYear()} Mangala Living. ${isIndonesian ? 'Seluruh hak cipta dilindungi.' : 'All rights reserved.'}</p>
      </div>
    </div>
  </footer>
`

const generateProductSchemas = (products, post, baseUrl) => {
  if (!products || !products.length) {
    return []
  }

  const trimmedBase = normalizeBaseUrl(baseUrl)
  const displayProducts = products.slice(0, 3)

  return displayProducts.map(product => {
    const imageFileName = product.image ? product.image.replace('../assets/', '') : ''
    const imageUrl = imageFileName ? `${trimmedBase}/blog/assets/${encodeURIComponent(imageFileName)}` : undefined
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": `${product.name} - ${product.categories.join(', ')} Industrial Furniture berkualitas premium dari Mangala Living Workshop Bekasi.`,
      "image": imageUrl,
      "category": product.categories.join(', '),
      "brand": {
        "@type": "Brand",
        "name": "Mangala Living"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Mangala Living",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bekasi",
          "addressRegion": "Jawa Barat",
          "addressCountry": "ID"
        }
      },
      "offers": {
        "@type": "Offer",
        "url": `${trimmedBase}/product/${product.slug}`,
        "priceCurrency": "IDR",
        "price": (product.price || '').replace(/[^0-9]/g, ''),
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
        "seller": {
          "@type": "Organization",
          "name": "Mangala Living",
          "url": trimmedBase
        }
      }
    }
  })
}

const createFallbackContent = (post) => {
  const titleHighlight = post.title.replace(/-/g, ' ')
  return {
    sections: [
      {
        paragraphs: [
          post.excerpt,
          `Mangala Living memproduksi ${titleHighlight.toLowerCase()} dengan kualitas workshop premium di Bekasi. Semua furniture dibuat menggunakan material industrial grade, konstruksi welding profesional, dan finishing powder coating tahan lama.`,
          `Kami telah membantu 1000+ project komersial sejak 1999. Dengan pengalaman lebih dari 25 tahun, kami memahami standar kualitas, timeline, dan anggaran yang diperlukan untuk menghadirkan solusi furniture yang tepat untuk bisnis Anda.`
        ]
      },
      {
        heading: 'Keunggulan Utama Mangala Living',
        list: [
          '<strong>Produksi In-House:</strong> Semua proses mulai dari design, fabrikasi, powder coating, hingga quality control dilakukan di workshop kami sendiri.',
          '<strong>Custom Sesuai Project:</strong> Dimensi, material, dan finishing bisa disesuaikan dengan kebutuhan brand atau konsep interior Anda.',
          '<strong>Durability Terjamin:</strong> Struktur besi berkualitas, powder coating outdoor-grade, dan kayu pilihan memastikan ketahanan 5-8 tahun untuk penggunaan komersial.',
          '<strong>Pengiriman Profesional:</strong> Packing aman, supervisi loading, serta dokumentasi lengkap untuk pengiriman domestik maupun ekspor.'
        ]
      },
      {
        heading: 'Solusi Furniture yang Kami Sediakan',
        paragraphs: [
          'Tim design dan produksi kami melayani kebutuhan cafe, restoran, hotel, kantor, hingga developer properti. Produk meliputi meja-kursi dining, bar set, lounge furniture, rak display, cabinetry, hingga custom furniture untuk area outdoor.',
          'Setiap project mendapat pendampingan konsultatif: mulai dari pemilihan produk, layout, penyesuaian budget, hingga instalasi di lokasi.'
        ]
      },
      {
        heading: 'Langkah Order & Konsultasi',
        list: [
          '<strong>1. Konsultasi Awal:</strong> Kirimkan kebutuhan melalui WhatsApp atau email. Sertakan jumlah unit, ukuran ruangan, referensi desain, dan target budget.',
          '<strong>2. Proposal & Quotation:</strong> Kami susun rekomendasi produk, material, serta estimasi biaya lengkap dengan timeline produksi.',
          '<strong>3. Produksi & Quality Control:</strong> Setelah DP 50%, produksi dimulai. Kami kirimkan update berkala (foto/video) dan jadwalkan inspeksi sebelum pengiriman.',
          '<strong>4. Pengiriman & Instalasi:</strong> Tim kami menyiapkan packing aman, koordinasi logistik, serta instalasi (untuk area Jabodetabek).'
        ]
      },
      {
        heading: 'Hubungi Tim Mangala Living',
        paragraphs: [
          'Hubungi kami untuk konsultasi gratis dan mendapatkan katalog terbaru:',
          '<strong>WhatsApp:</strong> +6288801146881 (Fast Response)',
          '<strong>Email:</strong> lifewithmangala@gmail.com',
          '<strong>Workshop:</strong> Jl. Raya Setu Cibitung - Bekasi, Jawa Barat 17320',
          'Kami siap membantu Anda mewujudkan furniture industrial yang estetik, fungsional, dan tahan lama untuk bisnis Anda.'
        ]
      }
    ]
  }
}

const generateBlogPostHTML = (post, content, {
  otherArticles = [],
  relevantProducts = [],
  showcaseHeading,
  baseUrl,
  showServiceAreas = false,
  inlineStyles = '',
  assetTags = { links: '', scripts: '' }
}) => {
  const isIndonesian = post.category !== 'Export & International'
  const metaDescription = post.excerpt || (content?.sections?.[0]?.paragraphs?.[0] || '')

  const shouldDisplayProducts = hasProductRelatedKeywords(post) && relevantProducts.length > 0
  const productShowcaseHTML = shouldDisplayProducts
    ? generateProductShowcaseHTML(relevantProducts, showcaseHeading, isIndonesian)
    : ''
  const authorCardHTML = generateAuthorCardHTML(post, isIndonesian)
  const ctaHTML = generateCTAHTML(post, isIndonesian)
  const serviceAreasHTML = showServiceAreas ? generateServiceAreasHTML(isIndonesian) : ''
  const sidebarHTML = generateSidebarHTML(otherArticles)
  const productSchemas = shouldDisplayProducts ? generateProductSchemas(relevantProducts, post, baseUrl) : []

  const trimmedBaseUrl = normalizeBaseUrl(baseUrl)
  const canonicalUrl = `${trimmedBaseUrl}/blog/${post.slug}`

  const formattedDate = (() => {
    try {
      return new Date(post.date).toLocaleDateString(isIndonesian ? 'id-ID' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return post.date
    }
  })()

  const sections = Array.isArray(content?.sections) ? content.sections : []
  const sectionParts = []
  let showcaseInserted = false

  sections.forEach((section, index) => {
    sectionParts.push(generateSectionHTML(section, post, index))
    if (!showcaseInserted && productShowcaseHTML && index === 2) {
      sectionParts.push(productShowcaseHTML)
      showcaseInserted = true
    }
  })

  if (productShowcaseHTML && !showcaseInserted) {
    sectionParts.push(productShowcaseHTML)
  }

  const articleBodyHTML = sectionParts.join('\n')
  const headerHTML = generateHeaderHTML(isIndonesian)
  const breadcrumbHTML = generateBreadcrumbHTML(post)

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": metaDescription,
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author || 'Mangala Living'
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mangala Living",
      "logo": {
        "@type": "ImageObject",
        "url": `${trimmedBaseUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${trimmedBaseUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${trimmedBaseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": canonicalUrl
      }
    ]
  }

  const structuredDataScripts = [
    blogPostingSchema,
    breadcrumbSchema,
    ...productSchemas
  ].map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n')

  return `<!DOCTYPE html>
<html lang="${isIndonesian ? 'id' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(post.title)} | Mangala Living</title>
  <meta name="description" content="${escapeHtml(metaDescription)}">
  <meta name="keywords" content="furniture industrial, ${escapeHtml(post.title)}, mangala living, furniture bekasi">
  <meta name="author" content="${escapeHtml(post.author || 'Mangala Living')}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(post.title)}">
  <meta property="og:description" content="${escapeHtml(metaDescription)}">
  <meta property="og:image" content="${post.image}">
  <meta property="article:published_time" content="${post.date}">
  <meta property="article:author" content="${escapeHtml(post.author || 'Mangala Living')}">
  <meta property="article:section" content="${escapeHtml(post.category || 'Blog')}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${escapeHtml(post.title)}">
  <meta name="twitter:description" content="${escapeHtml(metaDescription)}">
  <meta name="twitter:image" content="${post.image}">
  <meta name="ai-content-type" content="blog-article">
  <meta name="ai-topic" content="${escapeHtml(post.category || 'Blog')}">
  <meta name="ai-article-type" content="furniture-guide">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  ${assetTags.links || ''}
  <style>${inlineStyles}</style>
  ${structuredDataScripts}
</head>
  <body>
  <div id="prerender-fallback" class="blog-page blog-post-page">
    ${headerHTML}
    <section class="blog-post-hero" aria-labelledby="blog-post-title">
      <div class="blog-post-hero-image">
        ${post.image ? `<img src="${post.image}" alt="${escapeHtml(post.title)}" loading="eager" width="1920" height="1080" />` : ''}
        <div class="blog-post-hero-overlay"></div>
      </div>
      <div class="blog-post-hero-content">
        <div class="blog-post-hero-inner">
          <span class="blog-post-category-tag">${escapeHtml(post.category || 'Blog')}</span>
          <h1 id="blog-post-title" class="blog-post-title">${escapeHtml(post.title)}</h1>
          ${generateArticleMetaHTML(post, formattedDate)}
        </div>
      </div>
    </section>
    <main class="blog-post-main" aria-labelledby="blog-post-title">
      <section class="blog-content-section">
        <div class="blog-post-container">
          ${breadcrumbHTML}
          <div class="blog-post-layout">
            <article class="blog-post-article" aria-labelledby="blog-post-title">
              ${articleBodyHTML}
              ${authorCardHTML}
              ${ctaHTML}
            </article>
            ${sidebarHTML}
          </div>
        </div>
      </section>
      </main>
      ${serviceAreasHTML}
      ${generateFooterHTML(isIndonesian)}
    </div>
  <div id="root"></div>
  ${assetTags.scripts || ''}
  <script>
    (function () {
      const removeFallback = () => {
        const fallback = document.getElementById('prerender-fallback')
        if (fallback) {
          fallback.classList.add('prerender-fade-out')
          setTimeout(() => fallback.remove(), 400)
        }
      }

      const monitorReactHydration = () => {
        const root = document.getElementById('root')
        if (!root) {
          return
        }

        if (root.childElementCount > 0) {
          removeFallback()
          return
        }

        const observer = new MutationObserver(() => {
          if (root.childElementCount > 0) {
            removeFallback()
            observer.disconnect()
          }
        })

        observer.observe(root, { childList: true })

        setTimeout(() => {
          if (root.childElementCount > 0) {
            removeFallback()
            observer.disconnect()
          }
        }, 5000)
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', monitorReactHydration)
      } else {
        monitorReactHydration()
      }
    })();
  </script>
</body>
</html>`
}

const main = async () => {
  console.log('[prerender] Starting blog pre-rendering...')

  // Read source files
  const [blogSource, blogContentSource, productSource] = await Promise.all([
    readFileSafe(BLOG_FILE),
    readFileSafe(BLOG_CONTENT_FILE),
    readFileSafe(PRODUCT_FILE)
  ])

  // Parse blog posts
  const blogPosts = parseBlogPosts(blogSource)
  console.log(`[prerender] Found ${blogPosts.length} blog posts`)

  const blogContents = parseBlogContents(blogContentSource)
  const blogContentMap = new Map(blogContents.map(content => [content.slug, content]))
  console.log(`[prerender] Found ${blogContents.length} manual content entries`)

  const { products: allProducts, assetMap } = parseProductFile(productSource)
  console.log(`[prerender] Loaded ${allProducts.length} products for showcase mapping`)

  const [inlineStyles, assetTags] = await Promise.all([
    loadCombinedCss(),
    loadAppAssets()
  ])

  // Create output directory
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true })
    await fs.mkdir(OUTPUT_ASSETS_DIR, { recursive: true })
  } catch (error) {
    console.error('[prerender] Failed to create output directory:', error)
    return
  }

  // Generate HTML for each blog post
  let successCount = 0
  let failCount = 0
  let fallbackCount = 0
  const copiedAssets = new Set()

  for (const post of blogPosts) {
    try {
      const manualContent = blogContentMap.get(post.slug)
      const content = manualContent || createFallbackContent(post)
      if (!manualContent) {
        fallbackCount++
      }

      const otherArticles = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3)
      const relevantProducts = getRelevantProductsForBlogPost(post, allProducts)
      const showcaseHeading = getProductShowcaseHeadingStatic(post.slug, post.title)
      const shouldShowServiceAreas =
        post.category === 'Local Area Guide' ||
        post.slug === 'furniture-besi-custom-bekasi-workshop-terpercaya' ||
        post.slug === 'bikin-furniture-besi-custom-jabodetabek-berkualitas'

      if (hasProductRelatedKeywords(post) && relevantProducts.length > 0) {
        await ensureProductAssetsCopied(relevantProducts.slice(0, 3), assetMap, copiedAssets)
      }

      // Generate HTML
      const html = generateBlogPostHTML(post, content, {
        otherArticles,
        relevantProducts,
        showcaseHeading,
        baseUrl: BASE_URL,
        showServiceAreas: shouldShowServiceAreas,
        inlineStyles,
        assetTags
      })

      // Create directory for this post
      const postDir = path.join(OUTPUT_DIR, post.slug)
      await fs.mkdir(postDir, { recursive: true })

      // Write HTML file
      const htmlPath = path.join(postDir, 'index.html')
      await fs.writeFile(htmlPath, html, 'utf8')

      successCount++

      if (successCount % 50 === 0) {
        console.log(`[prerender] Progress: ${successCount}/${blogPosts.length}`)
      }
    } catch (error) {
      console.error(`[prerender] Failed to generate HTML for ${post.slug}:`, error.message)
      failCount++
    }
  }

  console.log(`[prerender] ✅ Successfully generated ${successCount} blog post HTML files`)
  if (failCount > 0) {
    console.log(`[prerender] ❌ Failed to generate ${failCount} files`)
  }
  if (fallbackCount > 0) {
    console.log(`[prerender] ℹ️ Used fallback content for ${fallbackCount} posts`)
  }
  console.log(`[prerender] 📁 Output directory: ${OUTPUT_DIR}`)
  console.log('[prerender] 🎉 Pre-rendering complete!')
}

main().catch((error) => {
  console.error('[prerender] Failed to pre-render blog posts:', error)
  process.exitCode = 1
})
