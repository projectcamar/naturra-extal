// ══════════════════════════════════════════════════════════════════════════════
// Naturra Extal PREMIUM CATALOG GENERATOR 2025
// World-Class Agricultural Commodities Catalog with Elegant Typography
// ══════════════════════════════════════════════════════════════════════════════

// Lazy load PDF dependencies to reduce initial bundle size
let jsPDF: any = null
let ALL_PRODUCTS: any = null

// Import Product type for proper typing
import type { Product } from '../data/products'

const loadPDFDependencies = async () => {
  if (!jsPDF) {
    const jsPDFModule = await import('jspdf')
    jsPDF = jsPDFModule.default
  }
  if (!ALL_PRODUCTS) {
    const productsModule = await import('../data/products')
    ALL_PRODUCTS = productsModule.ALL_PRODUCTS
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// ARABIC TEXT SHAPING & BIDI SUPPORT
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Basic Arabic reshaper to join characters in their correct forms (isolated, initial, medial, final)
 * This is a lightweight implementation for essential joining logic.
 */
const reshapeArabic = (text: string): string => {
  if (!text || !/[\u0600-\u06FF]/.test(text)) return text

  const ARABIC_FORMS: Record<number, number[]> = {
    0x0621: [0xFE80, 0xFE80, 0xFE80, 0xFE80], // Hamza
    0x0622: [0xFE81, 0xFE82, 0xFE81, 0xFE82], // Alef with madda
    0x0623: [0xFE83, 0xFE84, 0xFE83, 0xFE84], // Alef with hamza above
    0x0624: [0xFE85, 0xFE86, 0xFE85, 0xFE86], // Waw with hamza
    0x0625: [0xFE87, 0xFE88, 0xFE87, 0xFE88], // Alef with hamza below
    0x0626: [0xFE89, 0xFE8A, 0xFE8B, 0xFE8C], // Ya with hamza
    0x0627: [0xFE8D, 0xFE8E, 0xFE8D, 0xFE8E], // Alef
    0x0628: [0xFE8F, 0xFE90, 0xFE91, 0xFE92], // Ba
    0x0629: [0xFE93, 0xFE94, 0xFE93, 0xFE94], // Ta Marbuta
    0x062A: [0xFE95, 0xFE96, 0xFE97, 0xFE98], // Ta
    0x062B: [0xFE99, 0xFE9A, 0xFE9B, 0xFE9C], // Tha
    0x062C: [0xFE9D, 0xFE9E, 0xFE9F, 0xFEA0], // Jeem
    0x062D: [0xFEA1, 0xFEA2, 0xFEA3, 0xFEA4], // Hah
    0x062E: [0xFEA5, 0xFEA6, 0xFEA7, 0xFEA8], // Khah
    0x062F: [0xFEA9, 0xFEAA, 0xFEA9, 0xFEAA], // Dal
    0x0630: [0xFEAB, 0xFEAC, 0xFEAB, 0xFEAC], // Thal
    0x0631: [0xFEAD, 0xFEAE, 0xFEAD, 0xFEAE], // Reh
    0x0632: [0xFEAF, 0xFEB0, 0xFEAF, 0xFEB0], // Zain
    0x0633: [0xFEB1, 0xFEB2, 0xFEB3, 0xFEB4], // Seen
    0x0634: [0xFEB5, 0xFEB6, 0xFEB7, 0xFEB8], // Sheen
    0x0635: [0xFEB9, 0xFEBA, 0xFEBB, 0xFEBC], // Sad
    0x0636: [0xFEBD, 0xFEBE, 0xFEBF, 0xFEC0], // Dad
    0x0637: [0xFEC1, 0xFEC2, 0xFEC3, 0xFEC4], // Tah
    0x0638: [0xFEC5, 0xFEC6, 0xFEC7, 0xFEC8], // Zah
    0x0639: [0xFEC9, 0xFECA, 0xFECB, 0xFECC], // Ain
    0x063A: [0xFECD, 0xFECE, 0xFECF, 0xFED0], // Ghain
    0x0641: [0xFED1, 0xFED2, 0xFED3, 0xFED4], // Feh
    0x0642: [0xFED5, 0xFED6, 0xFED7, 0xFED8], // Qaf
    0x0643: [0xFED9, 0xFEDA, 0xFEDB, 0xFEDC], // Kaf
    0x0644: [0xFEDD, 0xFEDE, 0xFEDF, 0xFEE0], // Lam
    0x0645: [0xFEE1, 0xFEE2, 0xFEE3, 0xFEE4], // Meem
    0x0646: [0xFEE5, 0xFEE6, 0xFEE7, 0xFEE8], // Noon
    0x0647: [0xFEE9, 0xFEEA, 0xFEEB, 0xFEEC], // Heh
    0x0648: [0xFEED, 0xFEEE, 0xFEED, 0xFEEE], // Waw
    0x0649: [0xFEEF, 0xFEF0, 0xFEEF, 0xFEF0], // Alef Maksura
    0x064A: [0xFEF1, 0xFEF2, 0xFEF3, 0xFEF4], // Ya
  }

  const isLigature = (current: number, next: number): boolean => {
    // Basic ligature check (mostly Lam + Alef family)
    if (current === 0x0644) {
      return [0x0622, 0x0623, 0x0625, 0x0627].includes(next)
    }
    return false
  }

  const getLigature = (current: number, next: number, connected: boolean): number => {
    if (current === 0x0644) {
      if (next === 0x0622) return connected ? 0xFEF6 : 0xFEF5
      if (next === 0x0623) return connected ? 0xFEF8 : 0xFEF7
      if (next === 0x0625) return connected ? 0xFEFA : 0xFEF9
      if (next === 0x0627) return connected ? 0xFEFC : 0xFEFB
    }
    return 0
  }

  const connectsRight = (code: number): boolean => {
    return !!ARABIC_FORMS[code] && ![0x0621, 0x0622, 0x0623, 0x0624, 0x0625, 0x0627, 0x062F, 0x0630, 0x0631, 0x0632, 0x0648, 0x0649].includes(code)
  }

  const connectsLeft = (code: number): boolean => {
    return !!ARABIC_FORMS[code] && code !== 0x0621
  }

  let result = ""
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i)
    if (ARABIC_FORMS[code]) {
      const prev = i > 0 ? text.charCodeAt(i - 1) : 0
      const next = i < text.length - 1 ? text.charCodeAt(i + 1) : 0

      const connectedPrev = connectsRight(prev)
      const connectedNext = connectsLeft(next)

      if (isLigature(code, next)) {
        result += String.fromCharCode(getLigature(code, next, connectedPrev))
        i++ // Skip next char as it's part of the ligature
        continue
      }

      let formIndex = 0 // Isolated
      if (connectedPrev && connectedNext) formIndex = 3 // Medial
      else if (connectedPrev) formIndex = 1 // Final
      else if (connectedNext) formIndex = 2 // Initial

      result += String.fromCharCode(ARABIC_FORMS[code][formIndex])
    } else {
      result += text[i]
    }
  }
  return result
}

/**
 * Handle bidirectional text and Right-To-Left reversal for PDF rendering.
 */
const processRTLText = (text: string, lang: string): string => {
  if (lang !== 'ar' || !text || !/[\u0600-\u06FF]/.test(text)) return text

  // 1. Reshape Arabic characters (isolated -> joined forms)
  const reshaped = reshapeArabic(text)

  // 2. Handle RTL reversal (simple version)
  // We flip the string but preserve segments of Latin/Numbers if mixed (basic implementation)
  return reshaped.split('').reverse().join('')
}

// Load a TTF font from a URL and register it in jsPDF VFS
// Added timeout to prevent infinite loading
const loadAndRegisterFont = async (doc: any, url: string, vfsFileName: string, jsPdfFontName: string, style: 'normal' | 'bold' | 'italic' | 'bolditalic' = 'normal') => {
  const TIMEOUT_MS = 15000 // 15 seconds timeout

  try {
    console.log(`[PDF] Fetching font from: ${url}`)

    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Font loading timeout')), TIMEOUT_MS)
    })

    // Fetch with timeout
    const fetchPromise = fetch(url, {
      credentials: 'omit',
      mode: 'cors',
      cache: 'default'
    })

    const response = await Promise.race([fetchPromise, timeoutPromise])

    if (!response.ok) {
      console.warn(`[PDF] Font fetch failed: ${response.status} ${response.statusText}`)
      return false
    }

    const blob = await response.blob()
    if (blob.size === 0) {
      console.warn(`[PDF] Font blob is empty`)
      return false
    }

    // Check if blob is too large (might cause issues)
    if (blob.size > 10 * 1024 * 1024) { // 10MB limit
      console.warn(`[PDF] Font file too large: ${(blob.size / 1024 / 1024).toFixed(2)}MB`)
      return false
    }

    const toBase64 = (b: Blob) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        const timeout = setTimeout(() => {
          reader.abort()
          reject(new Error('Base64 conversion timeout'))
        }, 10000) // 10 seconds for conversion

        reader.onload = () => {
          clearTimeout(timeout)
          resolve((reader.result as string).split(',')[1] || '')
        }
        reader.onerror = (err) => {
          clearTimeout(timeout)
          console.warn(`[PDF] Font base64 conversion failed:`, err)
          reject(err)
        }
        reader.readAsDataURL(b)
      })

    const base64 = await toBase64(blob)
    if (!base64 || base64.length === 0) {
      console.warn(`[PDF] Font base64 is empty`)
      return false
    }

    doc.addFileToVFS(vfsFileName, base64)
    doc.addFont(vfsFileName, jsPdfFontName, style)
    console.log(`[PDF] Successfully registered font: ${jsPdfFontName} (${style})`)
    return true
  } catch (error) {
    console.warn(`[PDF] Font loading error:`, error)
    return false
  }
}

// Decide which Unicode font set to use for a given language
// Uses Google Fonts CDN for reliable font loading
const prepareLanguageFont = async (doc: any, lang: 'id' | 'en' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko') => {
  // Default: built-in helvetica works for Latin scripts (ID, EN, ES, FR)
  const latin = { family: 'helvetica', hasStyles: true }

  // Latin scripts that work with built-in fonts (English, Indonesian, French, Spanish)
  if (lang === 'id' || lang === 'en' || lang === 'fr' || lang === 'es') {
    console.log(`[PDF] Language ${lang} uses Latin script, using built-in helvetica`)
    return latin
  }

  // Map language to local font paths
  // Using static TTF files for better jsPDF compatibility
  const fontMap: Record<string, { family: string, files: { normal: string, bold?: string } }> = {
    ar: {
      family: 'NotoNaskhArabic',
      files: {
        normal: '/fonts/NotoNaskhArabic-Regular.ttf',
        bold: '/fonts/NotoNaskhArabic-Bold.ttf'
      }
    },
    zh: {
      family: 'NotoSansSC',
      files: {
        normal: '/fonts/NotoSansSC-Regular.ttf',
        bold: '/fonts/NotoSansSC-Bold.ttf'
      }
    },
    ja: {
      family: 'NotoSansJP',
      files: {
        normal: '/fonts/NotoSansJP-Regular.ttf',
        bold: '/fonts/NotoSansJP-Bold.ttf'
      }
    },
    ko: {
      family: 'NotoSansKR',
      files: {
        normal: '/fonts/NotoSansKR-Regular.ttf',
        bold: '/fonts/NotoSansKR-Bold.ttf'
      }
    }
  }

  const mapping = fontMap[lang]
  if (!mapping) {
    console.log(`[PDF] No font mapping for ${lang}, using helvetica`)
    return latin
  }

  console.log(`[PDF] Loading local font for language: ${lang}`)

  // Font loading with timeout
  const fontLoadingTimeout = 15000 // 15 seconds max for local font loading
  const fontLoadingPromise = (async () => {
    // Load normal font
    const loadedNormal = await loadAndRegisterFont(doc, mapping.files.normal, `${mapping.family}-Regular.ttf`, mapping.family, 'normal')

    if (!loadedNormal) {
      console.error(`[PDF] Failed to load local font for ${lang}, falling back to helvetica`)
      return latin
    }

    // Load bold variant if available
    let loadedBold = false
    if (mapping.files.bold) {
      loadedBold = await loadAndRegisterFont(doc, mapping.files.bold, `${mapping.family}-Bold.ttf`, mapping.family, 'bold')
      if (!loadedBold) {
        console.warn(`[PDF] Bold variant failed to load, using normal for bold text`)
      }
    }

    console.log(`[PDF] Successfully loaded font: ${mapping.family}`)
    return { family: mapping.family, hasStyles: loadedBold }
  })()

  // Race between font loading and timeout
  const timeoutPromise = new Promise<typeof latin>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Font loading timeout for ${lang} after ${fontLoadingTimeout}ms`))
    }, fontLoadingTimeout)
  })

  try {
    return await Promise.race([fontLoadingPromise, timeoutPromise])
  } catch (error) {
    console.error(`[PDF] Font loading failed or timed out for ${lang}:`, error)
    console.warn(`[PDF] Falling back to helvetica for ${lang}`)
    return latin
  }
}

// Get language preference from localStorage
const getLanguagePreference = (): 'id' | 'en' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko' => {
  try {
    const stored = localStorage.getItem('Naturra_lang_preference')
    if (stored === 'id' || stored === 'en' || stored === 'ar' || stored === 'zh' || stored === 'ja' || stored === 'es' || stored === 'fr' || stored === 'ko') {
      return stored as 'id' | 'en' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko'
    }
  } catch (error) {
    console.log('Failed to read language preference')
  }
  return 'id' // Default to Indonesian
}

// ══════════════════════════════════════════════════════════════════════════════
// BILINGUAL CONTENT - ENHANCED WITH PROFESSIONAL COPYWRITING
// ══════════════════════════════════════════════════════════════════════════════

const content = {
  id: {
    // ─────────────────────────── Cover Page ───────────────────────────
    title1: 'Naturra',
    title2: 'LIVING',
    subtitle: 'Katalog agricultural commodities Premium 2025',
    tagline: 'Keahlian Lebih dari 25 Tahun dalam Craftsmanship agricultural commodities & Scandinavian',
    since: 'Sejak 1999',
    workshop: 'Workshop & Showroom Bekasi',
    address: 'Jl. Raya Setu Cibitung, Bekasi, Jawa Barat 17320',
    copyright: '© 2025 Naturra Extal. Hak Cipta Dilindungi.',

    // ─────────────────────────── Welcome Page ───────────────────────────
    welcomeTitle: 'Selamat Datang di Naturra Extal',
    welcomeSubtitle: 'Craftsmen agricultural commodities Terpercaya Indonesia',

    welcomeIntro: 'Terima kasih telah mengunduh katalog resmi Naturra Extal 2025. Kami bangga mempersembahkan koleksi agricultural commodities premium yang dirancang dengan dedikasi penuh untuk memenuhi kebutuhan bisnis dan hunian modern Anda.',

    welcomePara1: 'Selama lebih dari 25 tahun, Naturra Extal telah menjadi pilihan utama para arsitek, desainer interior, pemilik cafe, restoran, hotel, kantor, dan pemilik rumah yang menghargai kualitas sejati. Kami bukan sekadar pembuat furniture—kami adalah craftsmen yang memahami bahwa setiap sudut ruang memiliki cerita, setiap kursi harus nyaman, dan setiap meja harus kokoh bertahan puluhan tahun.',

    welcomePara2: 'Di workshop seluas 500m² yang berlokasi strategis di Bekasi, tim produksi kami yang terdiri dari 10 tukang las berpengalaman, 5 tukang kayu ahli, dan 3 finishing specialist bekerja dengan standar kualitas ekspor. Setiap potongan besi hollow yang kami las, setiap kayu solid yang kami bentuk, dan setiap lapisan powder coating yang kami aplikasikan—semuanya melalui quality control ketat untuk memastikan produk yang sampai ke tangan Anda adalah yang terbaik.',

    welcomePara3: 'Koleksi kami mencakup berbagai kategori: furniture cafe & restoran yang stylish dan tahan lama, patio & outdoor furniture yang weatherproof hingga 7 tahun, furniture kantor yang ergonomis dan produktif, furniture residential yang hangat dan nyaman, furniture hotel hospitality standar bintang lima, serta retail display solutions yang memaksimalkan visual merchandising Anda.',

    welcomePara4: 'Kami memahami bahwa setiap project memiliki kebutuhan unik. Oleh karena itu, selain ready stock yang Anda lihat di katalog ini, kami juga melayani custom order dengan berbagai pilihan material premium: besi hollow 4x4cm hingga 6x6cm dari PT Krakatau Steel, kayu solid grade A (jati, mahoni, sungkai), powder coating Jotun/Nippon dengan 50+ pilihan warna, serta hardware import berkualitas tinggi.',

    welcomePara5: 'Harga yang kami tawarkan adalah factory direct—tanpa markup middleman. Dengan sistem pembayaran DP 50% dan pelunasan 50% setelah instalasi, serta garansi struktur 2 tahun dan finishing 1 tahun, Anda mendapatkan nilai terbaik untuk investasi furniture Anda. Area Bekasi, Jakarta Timur, dan Cikarang bahkan mendapatkan FREE delivery dan survey!',

    welcomeCTA: 'Hubungi kami hari ini untuk konsultasi gratis, diskusikan kebutuhan furniture Anda, atau kunjungi workshop kami untuk melihat langsung kualitas produk yang kami tawarkan.',

    welcomeSignature: 'Hormat kami,',
    welcomeTeam: 'Tim Naturra Extal',

    // ─────────────────────────── Why Choose Us Page ───────────────────────────
    whyChooseTitle: 'Mengapa Memilih Naturra Extal?',
    whyChooseSubtitle: '6 Keunggulan yang Membedakan Kami dari Kompetitor',

    reason1Title: '1. Kualitas Ekspor Premium yang Terjamin',
    reason1Desc: 'Setiap produk kami dibuat dengan material pilihan terbaik: besi hollow dan solid bar dari PT Krakatau Steel yang anti karat, kayu solid grade A yang telah melalui proses kiln-dried untuk stabilitas dimensi, powder coating Jotun atau Nippon standar ekspor dengan ketebalan 60-80 micron yang tahan UV dan weatherproof. Kami menggunakan standar yang sama dengan furniture ekspor ke Malaysia, Singapura, dan Australia.',

    reason2Title: '2. Craftsman Berpengalaman 25+ Tahun',
    reason2Desc: 'Workshop kami didukung oleh tim produksi yang telah berkecimpung di industri furniture besi dan kayu selama puluhan tahun. Tukang las kami ahli dalam teknik welding TIG dan MIG untuk hasil sambungan yang kuat dan rapi. Tukang kayu kami mahir dalam joinery tradisional dan modern. Finishing specialist kami menguasai teknik grinding, sanding, coating, dan polishing hingga hasil sempurna.',

    reason3Title: '3. Custom Order Fleksibel & Design 3D',
    reason3Desc: 'Tidak menemukan ukuran atau desain yang pas? Tenang! Kami melayani custom order mulai dari 1 unit. Tim designer kami akan membuat 3D rendering menggunakan SketchUp atau 3ds Max sehingga Anda bisa visualisasi produk sebelum produksi. Revisi desain 1-2 kali tanpa biaya tambahan. Konsultasi dan survey GRATIS untuk area Bekasi, Jakarta, Cikarang.',

    reason4Title: '4. Harga Factory Direct Tanpa Markup',
    reason4Desc: 'Karena Anda membeli langsung dari workshop, Anda tidak perlu membayar markup showroom atau toko furniture. Harga kami transparan dengan breakdown jelas: material, produksi, finishing, dan packing. Plus, kami memberikan diskon volume 5-15% untuk pembelian dalam jumlah banyak—ideal untuk project cafe, restoran, hotel, atau kantor.',

    reason5Title: '5. Timeline Produksi yang Transparan',
    reason5Desc: 'Kami sangat menghargai waktu Anda. Timeline produksi reguler kami adalah 15-25 hari kerja untuk furniture standard dan 30-45 hari untuk bulk order atau custom kompleks. Selama proses produksi, Anda akan mendapat update berkala via WhatsApp lengkap dengan foto dan video progress, sehingga Anda bisa pantau perkembangan project Anda secara real-time.',

    reason6Title: '6. Layanan Purna Jual & Garansi Komprehensif',
    reason6Desc: 'Kepuasan Anda adalah prioritas kami. Setiap pembelian dilengkapi dengan garansi struktur 2 tahun dan finishing 1 tahun. Kami juga memberikan bonus panduan perawatan furniture dan touch-up kit untuk perbaikan minor scratches. Tim after-sales kami siap membantu jika Anda memerlukan maintenance, refinishing, atau modifikasi di kemudian hari.',

    // ─────────────────────────── Product Categories ───────────────────────────
    categories: 'Kategori Produk',
    categoriesDesc: 'agricultural commodities Premium untuk Berbagai Kebutuhan',

    // ─────────────────────────── Pricing Guide ───────────────────────────
    pricingTitle: 'Panduan Harga Estimasi',
    pricingSubtitle: 'Harga Transparan untuk Planning Budget Anda',

    pricingNote1: '• Harga dalam katalog ini adalah estimasi harga starting point untuk desain standard dengan material grade reguler.',
    pricingNote2: '• Custom design dengan kompleksitas tinggi, material premium (besi 6x6cm, kayu jati, electroplating finish), atau dimensi extra large akan menyesuaikan harga.',
    pricingNote3: '• Harga sudah termasuk: Material, produksi, standard finishing (powder coating/painting), quality control, dan packing aman.',
    pricingNote4: '• Delivery: FREE untuk area Bekasi, Jakarta Timur, Cikarang. Luar area dikenakan biaya berdasarkan jarak (nego).',
    pricingNote5: '• Sistem Pembayaran: DP 50% setelah desain approved, Pelunasan 50% setelah instalasi selesai. Terima Rupiah (IDR) dan Dollar (USD).',
    pricingNote6: '• Diskon Volume: 5-10 unit (diskon 5%), 11-20 unit (diskon 10%), 21+ unit (negotiable hingga 15%).',

    // ─────────────────────────── Material Excellence ───────────────────────────
    materialTitle: 'Material Premium yang Kami Gunakan',
    materialSubtitle: 'Hanya Material Terbaik untuk Furniture Berkualitas Ekspor',

    material1Title: 'Besi Hollow & Solid Bar',
    material1Desc: 'Besi hollow kotak 4x4cm, 5x5cm, 6x6cm dengan ketebalan 1.2mm hingga 2mm dari PT Krakatau Steel atau setara. Untuk struktur yang memerlukan load-bearing tinggi, kami gunakan solid steel bar. Semua besi telah dilapisi galvanized coating untuk perlindungan anti karat. Proses welding menggunakan teknik TIG dan MIG untuk sambungan yang kuat dan estetis.',

    material2Title: 'Kayu Solid Grade A Premium',
    material2Desc: 'Kayu jati (teak), mahoni (mahogany), dan sungkai grade A yang telah melalui proses kiln-dried untuk mengurangi kadar air hingga 12-15%, memastikan stabilitas dimensi dan mencegah cracking atau warping. Table top kami memiliki ketebalan 2-3cm dengan finishing natural oil, melamine coating, atau duco paint sesuai preferensi. Joinery menggunakan teknik dowel, mortise-tenon, atau pocket screw untuk kekuatan maksimal.',

    material3Title: 'Powder Coating Export Quality',
    material3Desc: 'Kami menggunakan powder coating merek Jotun (Norway) atau Nippon (Japan) dengan standar ekspor. Proses coating dilakukan setelah permukaan besi di-grinding halus dan dibersihkan sempurna. Ketebalan coating 60-80 micron untuk ketahanan optimal. Tersedia 50+ pilihan warna: Black Matte, White Glossy, Grey, Bronze, Gold, Silver, Custom RAL colors. Powder coating kami UV resistant, weather resistant, dan tahan hingga 5-7 tahun untuk penggunaan outdoor.',

    material4Title: 'Hardware & Accessories Import',
    material4Desc: 'Baut dan mur stainless steel 304 yang anti karat, bracket reinforcement untuk corner joints yang kuat, leveling feet adjustable untuk permukaan lantai yang tidak rata, soft-close hinges untuk kabinet, ball-bearing drawer slides untuk laci yang smooth, dan cable management solutions untuk furniture kantor. Semua hardware kami pilih dari supplier import terpercaya untuk memastikan durabilitas jangka panjang.',

    // ─────────────────────────── Contact & Order ───────────────────────────
    contactTitle: 'Hubungi Kami & Mulai Project Anda',
    contactSubtitle: 'Tim Kami Siap Membantu Mewujudkan Furniture Impian Anda',

    contactInfo: 'Untuk konsultasi gratis, quotation, atau kunjungan showroom:',

    whatsappTitle: 'WhatsApp & Telepon',
    whatsappNumber: '+6288801146881',
    whatsappHours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
    whatsappResponse: 'Response time: 1-3 jam (jam kerja)',

    emailTitle: 'Email Resmi',
    emailGeneral: 'lifewithNaturra@gmail.com',
    emailSales: 'lifewithNaturra@gmail.com',
    emailNote: 'Untuk quotation, partnership, atau inquiry',

    addressTitle: 'Workshop & Showroom',
    addressFull1: 'Naturra Extal Workshop',
    addressFull2: 'Jl. Raya Setu Cibitung, Telajung',
    addressFull3: 'Kec. Cikarang Barat, Kabupaten Bekasi',
    addressFull4: 'Jawa Barat 17320, Indonesia',
    addressNote: '10 menit dari Tol Cibitung | 25 menit dari Jakarta Timur',

    visitTitle: 'Kunjungi Kami',
    visitDesc: 'Workshop kami terbuka untuk kunjungan. Anda bisa melihat langsung proses produksi, sample material, dan portfolio project kami. Hubungi sebelumnya untuk membuat appointment.',

    websiteTitle: 'Website & Online',
    website: 'www.naturraextal.com',
    websiteNote: 'Lihat portfolio lengkap, artikel furniture tips, dan update produk terbaru',

    exportExp: '• Export Experience: Malaysia, Singapura, Australia',
    workshopSize: '• Workshop: 500m² dengan tim produksi 18 orang',
    projectDone: '• Project Completed: 1,200+ project sejak 1999',

    // ─────────────────────────── Status & Labels ───────────────────────────
    viewOnline: 'Lihat online →',
    productsAvailable: 'produk tersedia',
    continued: '(bersambung)',

    // ─────────────────────────── Currency ───────────────────────────
    currency: 'IDR',
    currencySymbol: 'Rp',
    priceFormat: 'Mulai dari',

    // ─────────────────────────── Call to Actions ───────────────────────────
    cta1: '• WhatsApp kami untuk konsultasi & quotation gratis',
    cta2: '• Kunjungi workshop kami di Bekasi untuk lihat produk langsung',
    cta3: '• Eksplor koleksi lengkap di www.naturraextal.com',
  },

  en: {
    // ─────────────────────────── Cover Page ───────────────────────────
    title1: 'Naturra',
    title2: 'LIVING',
    subtitle: 'Premium Agricultural Commodities Catalog 2025',
    tagline: 'Over 25 Years of Expertise in Industrial & Scandinavian Furniture Craftsmanship',
    since: 'Since 1999',
    workshop: 'Workshop & Showroom Bekasi',
    address: 'Jl. Raya Setu Cibitung, Bekasi, West Java 17320',
    copyright: '© 2025 Naturra Extal. All Rights Reserved.',

    // ─────────────────────────── Welcome Page ───────────────────────────
    welcomeTitle: 'Welcome to Naturra Extal',
    welcomeSubtitle: 'Indonesia\'s Trusted Agricultural Commodities Craftsmen',

    welcomeIntro: 'Thank you for downloading the official Naturra Extal 2025 catalog. We are proud to present our premium Agricultural Commodities collection, designed with full dedication to meet the needs of your modern business and residence.',

    welcomePara1: 'For over 25 years, Naturra Extal has been the top choice for architects, interior designers, cafe owners, restaurants, hotels, offices, and homeowners who appreciate true quality. We are not just furniture makers—we are craftsmen who understand that every corner of space has a story, every chair must be comfortable, and every table must stand strong for decades.',

    welcomePara2: 'In our 500m² workshop strategically located in Bekasi, our production team consisting of 10 experienced welders, 5 skilled carpenters, and 3 finishing specialists work with export quality standards. Every piece of hollow steel we weld, every solid wood we shape, and every layer of powder coating we apply—all go through strict quality control to ensure the product that reaches you is the best.',

    welcomePara3: 'Our collection spans various categories: stylish and durable cafe & restaurant furniture, patio & outdoor furniture that\'s weatherproof for up to 7 years, ergonomic and productive office furniture, warm and comfortable residential furniture, five-star hotel hospitality furniture, and retail display solutions that maximize your visual merchandising.',

    welcomePara4: 'We understand that every project has unique needs. Therefore, in addition to the ready stock you see in this catalog, we also serve custom orders with various premium material options: 4x4cm to 6x6cm hollow steel from PT Krakatau Steel, grade A solid wood (teak, mahogany, sungkai), Jotun/Nippon powder coating with 50+ color choices, and high-quality imported hardware.',

    welcomePara5: 'Our prices are factory direct—no middleman markup. With a 50% down payment system and 50% settlement after installation, plus a 2-year structural warranty and 1-year finishing warranty, you get the best value for your furniture investment. The Bekasi, East Jakarta, and Cikarang areas even get FREE delivery and survey!',

    welcomeCTA: 'Contact us today for a free consultation, discuss your furniture needs, or visit our workshop to see firsthand the quality of the products we offer.',

    welcomeSignature: 'Best regards,',
    welcomeTeam: 'Naturra Extal Team',

    // ─────────────────────────── Why Choose Us Page ───────────────────────────
    whyChooseTitle: 'Why Choose Naturra Extal?',
    whyChooseSubtitle: '6 Advantages That Set Us Apart from Competitors',

    reason1Title: '1. Guaranteed Premium Export Quality',
    reason1Desc: 'Every product is made with the finest materials: hollow steel and solid bars from PT Krakatau Steel that are rust-resistant, grade A solid wood that has gone through a kiln-dried process for dimensional stability, Jotun or Nippon export-standard powder coating with 60-80 micron thickness that is UV and weatherproof resistant. We use the same standards as furniture exports to Malaysia, Singapore, and Australia.',

    reason2Title: '2. Craftsmen with 25+ Years Experience',
    reason2Desc: 'Our workshop is supported by a production team that has been involved in the steel and wood furniture industry for decades. Our welders are experts in TIG and MIG welding techniques for strong and neat joint results. Our carpenters are skilled in traditional and modern joinery. Our finishing specialists master grinding, sanding, coating, and polishing techniques to perfection.',

    reason3Title: '3. Flexible Custom Order & 3D Design',
    reason3Desc: 'Can\'t find the right size or design? No worries! We serve custom orders starting from 1 unit. Our designer team will create 3D renderings using SketchUp or 3ds Max so you can visualize the product before production. 1-2 design revisions at no extra cost. FREE consultation and survey for Bekasi, Jakarta, Cikarang areas.',

    reason4Title: '4. Factory Direct Pricing Without Markup',
    reason4Desc: 'Because you buy directly from the workshop, you don\'t have to pay showroom or furniture store markup. Our prices are transparent with a clear breakdown: materials, production, finishing, and packing. Plus, we offer volume discounts of 5-15% for bulk purchases—ideal for cafe, restaurant, hotel, or office projects.',

    reason5Title: '5. Transparent Production Timeline',
    reason5Desc: 'We highly value your time. Our regular production timeline is 15-25 working days for standard furniture and 30-45 days for bulk or complex custom orders. During the production process, you will receive regular updates via WhatsApp complete with photos and videos of progress, so you can monitor your project development in real-time.',

    reason6Title: '6. After-Sales Service & Comprehensive Warranty',
    reason6Desc: 'Your satisfaction is our priority. Every purchase comes with a 2-year structural warranty and 1-year finishing warranty. We also provide a bonus furniture care guide and touch-up kit for minor scratch repairs. Our after-sales team is ready to assist if you need maintenance, refinishing, or modifications in the future.',

    // ─────────────────────────── Product Categories ───────────────────────────
    categories: 'Product Categories',
    categoriesDesc: 'Premium Agricultural Commodities for Various Needs',

    // ─────────────────────────── Pricing Guide ───────────────────────────
    pricingTitle: 'Estimated Price Guide',
    pricingSubtitle: 'Transparent Pricing for Your Budget Planning',

    pricingNote1: '• Prices in this catalog are estimated starting points for standard designs with regular grade materials.',
    pricingNote2: '• Custom designs with high complexity, premium materials (6x6cm steel, teak wood, electroplating finish), or extra-large dimensions will adjust pricing.',
    pricingNote3: '• Prices include: Materials, production, standard finishing (powder coating/painting), quality control, and safe packing.',
    pricingNote4: '• Delivery: FREE for Bekasi, East Jakarta, Cikarang areas. Outside areas charged based on distance (negotiable).',
    pricingNote5: '• Payment System: 50% DP after design approved, 50% settlement after installation complete. Accept Rupiah (IDR) and Dollar (USD).',
    pricingNote6: '• Volume Discount: 5-10 units (5% off), 11-20 units (10% off), 21+ units (negotiable up to 15%).',

    // ─────────────────────────── Material Excellence ───────────────────────────
    materialTitle: 'Premium Materials We Use',
    materialSubtitle: 'Only the Best Materials for Export Quality Furniture',

    material1Title: 'Hollow Steel & Solid Bar',
    material1Desc: 'Square hollow steel 4x4cm, 5x5cm, 6x6cm with thickness 1.2mm to 2mm from PT Krakatau Steel or equivalent. For structures requiring high load-bearing, we use solid steel bars. All steel is coated with galvanized coating for rust protection. Welding process uses TIG and MIG techniques for strong and aesthetic joints.',

    material2Title: 'Grade A Premium Solid Wood',
    material2Desc: 'Teak, mahogany, and sungkai grade A wood that has undergone a kiln-dried process to reduce moisture content to 12-15%, ensuring dimensional stability and preventing cracking or warping. Our table tops have a thickness of 2-3cm with natural oil, melamine coating, or duco paint finishing as preferred. Joinery uses dowel, mortise-tenon, or pocket screw techniques for maximum strength.',

    material3Title: 'Export Quality Powder Coating',
    material3Desc: 'We use Jotun (Norway) or Nippon (Japan) brand powder coating with export standards. The coating process is done after the steel surface is ground smooth and cleaned thoroughly. Coating thickness 60-80 microns for optimal durability. Available in 50+ color options: Black Matte, White Glossy, Grey, Bronze, Gold, Silver, Custom RAL colors. Our powder coating is UV resistant, weather resistant, and lasts up to 5-7 years for outdoor use.',

    material4Title: 'Import Hardware & Accessories',
    material4Desc: 'Stainless steel 304 bolts and nuts that are rust-resistant, reinforcement brackets for strong corner joints, adjustable leveling feet for uneven floor surfaces, soft-close hinges for cabinets, ball-bearing drawer slides for smooth drawers, and cable management solutions for office furniture. All our hardware is selected from trusted import suppliers to ensure long-term durability.',

    // ─────────────────────────── Contact & Order ───────────────────────────
    contactTitle: 'Contact Us & Start Your Project',
    contactSubtitle: 'Our Team is Ready to Help Realize Your Dream Furniture',

    contactInfo: 'For free consultation, quotation, or showroom visit:',

    whatsappTitle: 'WhatsApp & Phone',
    whatsappNumber: '+6288801146881',
    whatsappHours: 'Monday - Saturday: 08.00 - 17.00 WIB',
    whatsappResponse: 'Response time: 1-3 hours (working hours)',

    emailTitle: 'Official Email',
    emailGeneral: 'lifewithNaturra@gmail.com',
    emailSales: 'lifewithNaturra@gmail.com',
    emailNote: 'For quotation, partnership, or inquiry',

    addressTitle: 'Workshop & Showroom',
    addressFull1: 'Naturra Extal Workshop',
    addressFull2: 'Jl. Raya Setu Cibitung, Telajung',
    addressFull3: 'Kec. Cikarang Barat, Kabupaten Bekasi',
    addressFull4: 'West Java 17320, Indonesia',
    addressNote: '10 mins from Cibitung Toll | 25 mins from East Jakarta',

    visitTitle: 'Visit Us',
    visitDesc: 'Our workshop is open for visits. You can see the production process, material samples, and our project portfolio firsthand. Contact us beforehand to make an appointment.',

    websiteTitle: 'Website & Online',
    website: 'www.naturraextal.com',
    websiteNote: 'View complete portfolio, furniture tips articles, and latest product updates',

    exportExp: '• Export Experience: Malaysia, Singapore, Australia',
    workshopSize: '• Workshop: 500m² with 18-person production team',
    projectDone: '• Projects Completed: 1,200+ projects since 1999',

    // ─────────────────────────── Status & Labels ───────────────────────────
    viewOnline: 'View online →',
    productsAvailable: 'products available',
    continued: '(cont.)',

    // ─────────────────────────── Currency ───────────────────────────
    currency: 'USD',
    currencySymbol: '$',
    priceFormat: 'Starting from',

    // ─────────────────────────── Call to Actions ───────────────────────────
    cta1: '• WhatsApp us for free consultation & quotation',
    cta2: '• Visit our workshop in Bekasi to see products directly',
    cta3: '• Explore full collection at www.naturraextal.com',
  },

  ar: {
    // ─────────────────────────── Cover Page ───────────────────────────
    title1: 'Naturra',
    title2: 'LIVING',
    subtitle: 'كتالوج الأثاث الصناعي المتميز 2025',
    tagline: 'أكثر من 25 عامًا من الخبرة في صناعة الأثاث الصناعي والإسكندنافي',
    since: 'منذ 1999',
    workshop: 'ورشة وصالة عرض بيكاسي',
    address: 'Jl. Raya Setu Cibitung, Bekasi, West Java 17320',
    copyright: '© 2025 Naturra Extal. جميع الحقوق محفوظة.',

    // ─────────────────────────── Welcome Page ───────────────────────────
    welcomeTitle: 'مرحبًا بكم في Naturra Extal',
    welcomeSubtitle: 'حرفيو الأثاث الصناعي الموثوقون في إندونيسيا',

    welcomeIntro: 'شكرًا لتحميل كتالوg Naturra Extal الرسمي لعام 2025. نفخر بتقديم مجموعة الأثاث الصناعي المتميزة المصممة بتفانٍ كامل لتلبية احتياجات أعمالك ومنزلك الحديث.',

    welcomePara1: 'لأكثر من 25 عامًا، كانت Naturra Extal الخيار الأول للمهندسين المعماريين ومصممي الديكور الداخلي وأصحاب المقاهي والمطاعم والفنادق والمكاتب وأصحاب المنازل الذين يقدرون الجودة الحقيقية. نحن لسنا مجرد صانعي أثاث - نحن حرفيون نفهم أن كل زاوية في المساحة لها قصة، وأن كل كرسي يجب أن يكون مريحًا، وأن كل طاولة يجب أن تصمد لعقود.',

    welcomePara2: 'في ورشتنا التي تبلغ مساحتها 500 متر مربع في موقع استراتيجي في بيكاسي، يعمل فريق الإنتاج لدينا المكون من 10 لحامين ذوي خبرة و 5 نجارين ماهرين و 3 متخصصين في التشطيب وفقًا لمعايير جودة التصدير. كل قطعة من الفولاذ المجوف التي نلحمها، وكل خشب صلب نشكله، وكل طبقة من الطلاء المسحوق التي نطبقها - كلها تخضع لرقابة صارمة على الجودة لضمان أن المنتج الذي يصل إليك هو الأفضل.',

    welcomePara3: 'تشمل مجموعتنا فئات متنوعة: أثاث المقاهي والمطاعم الأنيق والمتين، وأثاث الفناء والهواء الطلق المقاوم للعوامل الجوية لمدة تصل إلى 7 سنوات، وأثاث المكاتب المريح والإنتاجي، والأثاث السكني الدافئ والمريح، وأثاث الضيافة الفندقية من فئة خمس نجوم، وحلول العرض للبيع بالتجزئة التي تزيد من جاذبية عرض منتجاتك.',

    welcomePara4: 'نحن ندرك أن كل مشروع له احتياجات فريدة. لذلك، بالإضافة إلى المخزون الجاهز الذي تراه في هذا الكتالوج، نقدم أيضًا طلبات مخصصة بخيارات مواد متميزة متنوعة: فولاذ مجوف من 4x4 سم إلى 6x6 سم من PT Krakatau Steel، وخشب صلب من الدرجة A (خشب الساج والماهوجني والسنغكاي)، وطلاء مسحوق Jotun/Nippon مع أكثر من 50 خيار لون، ومعدات مستوردة عالية الجودة.',

    welcomePara5: 'أسعارنا مباشرة من المصنع - بدون هامش وسيط. مع نظام دفعة مقدمة 50٪ وتسوية 50٪ بعد التركيب، بالإضافة إلى ضمان هيكلي لمدة عامين وضمان تشطيب لمدة عام واحد، تحصل على أفضل قيمة لاستثمارك في الأثاث. حتى أن مناطق بيكاسي وشرق جاكرتا وسيكارانج تحصل على توصيل ومسح مجاني!',

    welcomeCTA: 'اتصل بنا اليوم للحصول على استشارة مجانية، ومناقشة احتياجاتك من الأثاث، أو زيارة ورشتنا لرؤية جودة المنتجات التي نقدمها بشكل مباشر.',

    welcomeSignature: 'مع أطيب التحيات،',
    welcomeTeam: 'فريق Naturra Extal',

    // ─────────────────────────── Why Choose Us Page ───────────────────────────
    whyChooseTitle: 'لماذا تختار Naturra Extal؟',
    whyChooseSubtitle: '6 مزايا تميزنا عن المنافسين',

    reason1Title: '1. جودة تصدير متميزة مضمونة',
    reason1Desc: 'كل منتج مصنوع من أجود المواد: فولاذ مجوف وقضبان صلبة من PT Krakatau Steel مقاومة للصدأ، وخشب صلب من الدرجة A خضع لعملية التجفيف في الفرن للحصول على استقرار في الأبعاد، وطلاء مسحوق Jotun أو Nippon بمعايير التصدير بسمك 60-80 ميكرون مقاوم للأشعة فوق البنفسجية والعوامل الجوية. نستخدم نفس المعايير المستخدمة في صادرات الأثاث إلى ماليزيا وسنغافورة وأستراليا.',

    reason2Title: '2. حرفيون بخبرة أكثر من 25 عامًا',
    reason2Desc: 'تدعم ورشتنا فريق إنتاج يعمل في صناعة الأثاث الفولاذي والخشبي منذ عقود. لحامونا خبراء في تقنيات اللحام TIG و MIG للحصول على نتائج وصلات قوية ومرتبة. نجارونا ماهرون في النجارة التقليدية والحديثة. متخصصو التشطيب لدينا يتقنون تقنيات الطحن والصنفرة والطلاء والتلميع إلى الكمال.',

    reason3Title: '3. طلب مخصص مرن وتصميم ثلاثي الأبعاد',
    reason3Desc: 'لا يمكنك العثور على الحجم أو التصميم المناسب؟ لا تقلق! نخدم الطلبات المخصصة بدءًا من وحدة واحدة. سيقوم فريق المصممين لدينا بإنشاء رسومات ثلاثية الأبعاد باستخدام SketchUp أو 3ds Max حتى تتمكن من تصور المنتج قبل الإنتاج. 1-2 مراجعة تصميم بدون تكلفة إضافية. استشارة ومسح مجاني لمناطق بيكاسي وجاكرتا وسيكارانج.',

    reason4Title: '4. تسعير مباشر من المصنع بدون هامش',
    reason4Desc: 'لأنك تشتري مباشرة من الورشة، لا يتعين عليك دفع هامش صالة العرض أو متجر الأثاث. أسعارنا شفافة مع تفصيل واضح: المواد والإنتاج والتشطيب والتعبئة. بالإضافة إلى ذلك، نقدم خصومات على الكميات من 5-15٪ للمشتريات الكبيرة - مثالية للمقاهي والمطاعم والفنادق أو مشاريع المكاتب.',

    reason5Title: '5. جدول زمني شفاف للإنتاج',
    reason5Desc: 'نحن نقدر وقتك كثيرًا. جدولنا الزمني للإنتاج المنتظم هو 15-25 يوم عمل للأثاث القياسي و 30-45 يومًا للطلبات المخصصة الكبيرة أو المعقدة. خلال عملية الإنتاج، ستتلقى تحديثات منتظمة عبر WhatsApp مع صور ومقاطع فيديو للتقدم، حتى تتمكن من مراقبة تطور مشروعك في الوقت الفعلي.',

    reason6Title: '6. خدمة ما بعد البيع وضمان شامل',
    reason6Desc: 'رضاك هو أولويتنا. كل عملية شراء تأتي مع ضمان هيكلي لمدة عامين وضمان تشطيب لمدة عام واحد. نقدم أيضًا دليل عناية بالأثاث ومجموعة إصلاح للخدوش الطفيفة. فريق خدمة ما بعد البيع لدينا جاهز للمساعدة إذا كنت بحاجة إلى صيانة أو إعادة تشطيب أو تعديلات في المستقبل.',

    // ─────────────────────────── Product Categories ───────────────────────────
    categories: 'فئات المنتجات',
    categoriesDesc: 'أثاث صناعي متميز لاحتياجات متنوعة',

    // ─────────────────────────── Pricing Guide ───────────────────────────
    pricingTitle: 'دليل الأسعار التقديرية',
    pricingSubtitle: 'تسعير شفاف لتخطيط ميزانيتك',

    pricingNote1: '• الأسعار في هذا الكتالوج هي نقاط بداية تقديرية للتصاميم القياسية بمواد من الدرجة العادية.',
    pricingNote2: '• التصاميم المخصصة ذات التعقيد العالي والمواد المتميزة (فولاذ 6x6 سم، خشب الساج، تشطيب الطلاء الكهربائي) أو الأبعاد الكبيرة جدًا سيتم تعديل الأسعار.',
    pricingNote3: '• الأسعار تشمل: المواد والإنتاج والتشطيب القياسي (الطلاء المسحوق / الطلاء) ومراقبة الجودة والتعبئة الآمنة.',
    pricingNote4: '• التوصيل: مجاني لمناطق بيكاسي وشرق جاكرتا وسيكارانج. المناطق الخارجية تُفرض عليها رسوم بناءً على المسافة (قابلة للتفاوض).',
    pricingNote5: '• نظام الدفع: دفعة مقدمة 50٪ بعد الموافقة على التصميم، تسوية 50٪ بعد اكتمال التركيب. نقبل الروبية (IDR) والدولار (USD).',
    pricingNote6: '• خصم الكمية: 5-10 وحدات (خصم 5٪)، 11-20 وحدة (خصم 10٪)، 21+ وحدة (قابلة للتفاوض حتى 15٪).',

    // ─────────────────────────── Material Excellence ───────────────────────────
    materialTitle: 'المواد المتميزة التي نستخدمها',
    materialSubtitle: 'فقط أفضل المواد لأثاث بجودة التصدير',

    material1Title: 'فولاذ مجوف وقضيب صلب',
    material1Desc: 'فولاذ مجوف مربع 4x4 سم، 5x5 سم، 6x6 سم بسمك 1.2 ملم إلى 2 ملم من PT Krakatau Steel أو ما يعادله. للهياكل التي تتطلب تحمل حمولة عالية، نستخدم قضبان الفولاذ الصلب. جميع الفولاذ مطلي بطلاء مجلفن للحماية من الصدأ. تستخدم عملية اللحام تقنيات TIG و MIG للحصول على وصلات قوية وجمالية.',

    material2Title: 'خشب صلب متميز من الدرجة A',
    material2Desc: 'خشب الساج والماهوجني والسنغكاي من الدرجة A الذي خضع لعملية التجفيف في الفرن لتقليل محتوى الرطوبة إلى 12-15٪، مما يضمن استقرار الأبعاد ويمنع التصدع أو الالتواء. أسطح طاولاتنا لها سمك 2-3 سم مع تشطيب بالزيت الطبيعي أو طلاء الميلامين أو طلاء ديكو حسب الرغبة. تستخدم النجارة تقنيات الدوويل أو المورتيز والتينون أو البراغي الجيبية لأقصى قوة.',

    material3Title: 'طلاء مسحوق بجودة التصدير',
    material3Desc: 'نستخدم طلاء مسحوق من ماركة Jotun (النرويج) أو Nippon (اليابان) بمعايير التصدير. تتم عملية الطلاء بعد طحن سطح الفولاذ بشكل ناعم وتنظيفه جيدًا. سمك الطلاء 60-80 ميكرون لمتانة مثالية. متاح بأكثر من 50 خيار لون: أسود مطفي، أبيض لامع، رمادي، برونزي، ذهبي، فضي، ألوان RAL مخصصة. طلاءنا المسحوق مقاوم للأشعة فوق البنفسجية ومقاوم للعوامل الجوية ويدوم حتى 5-7 سنوات للاستخدام الخارجي.',

    material4Title: 'معدات وإكسسوارات مستوردة',
    material4Desc: 'براغي وصواميل من الفولاذ المقاوم للصدأ 304 مقاومة للصدأ، وأقواس تعزيز لوصلات الزوايا القوية، وأقدام تسوية قابلة للتعديل للأرضيات غير المستوية، ومفصلات إغلاق ناعم للخزائن، وشرائح أدراج بمحامل كروية لأدراج سلسة، وحلول إدارة الكابلات لأثاث المكاتب. جميع معداتنا مختارة من موردين استيراد موثوقين لضمان المتانة طويلة الأجل.',

    // ─────────────────────────── Contact & Order ───────────────────────────
    contactTitle: 'اتصل بنا وابدأ مشروعك',
    contactSubtitle: 'فريقنا جاهز للمساعدة في تحقيق أثاث أحلامك',

    contactInfo: 'للحصول على استشارة مجانية أو عرض أسعار أو زيارة صالة العرض:',

    whatsappTitle: 'WhatsApp والهاتف',
    whatsappNumber: '+6288801146881',
    whatsappHours: 'الإثنين - السبت: 08.00 - 17.00 WIB',
    whatsappResponse: 'وقت الاستجابة: 1-3 ساعات (ساعات العمل)',

    emailTitle: 'البريد الإلكتروني الرسمي',
    emailGeneral: 'lifewithNaturra@gmail.com',
    emailSales: 'lifewithNaturra@gmail.com',
    emailNote: 'لعروض الأسعار أو الشراكة أو الاستفسار',

    addressTitle: 'الورشة وصالة العرض',
    addressFull1: 'ورشة Naturra Extal',
    addressFull2: 'Jl. Raya Setu Cibitung, Telajung',
    addressFull3: 'Kec. Cikarang Barat, Kabupaten Bekasi',
    addressFull4: 'West Java 17320, Indonesia',
    addressNote: '10 دقائق من Cibitung Toll | 25 دقيقة من شرق جاكرتا',

    visitTitle: 'قم بزيارتنا',
    visitDesc: 'ورشتنا مفتوحة للزيارات. يمكنك رؤية عملية الإنتاج وعينات المواد ومحفظة مشاريعنا بشكل مباشر. اتصل بنا مسبقًا لتحديد موعد.',

    websiteTitle: 'الموقع الإلكتروني والإنترنت',
    website: 'www.naturraextal.com',
    websiteNote: 'عرض المحفظة الكاملة ومقالات نصائح الأثاث وأحدث تحديثات المنتجات',

    exportExp: '• خبرة التصدير: ماليزيا، سنغافورة، أستراليا',
    workshopSize: '• الورشة: 500 متر مربع مع فريق إنتاج من 18 شخصًا',
    projectDone: '• المشاريع المكتملة: أكثر من 1,200 مشروع منذ 1999',

    // ─────────────────────────── Status & Labels ───────────────────────────
    viewOnline: 'عرض عبر الإنترنت →',
    productsAvailable: 'منتجات متوفرة',
    continued: '(تابع)',

    // ─────────────────────────── Currency ───────────────────────────
    currency: 'USD',
    currencySymbol: '$',
    priceFormat: 'يبدأ من',

    // ─────────────────────────── Call to Actions ───────────────────────────
    cta1: '• راسلنا على WhatsApp للحصول على استشارة وعرض أسعار مجاني',
    cta2: '• قم بزيارة ورشتنا في بيكاسي لرؤية المنتجات مباشرة',
    cta3: '• استكشف المجموعة الكاملة على www.naturraextal.com',
  },

  zh: {
    title1: 'Naturra',
    title2: 'LIVING',
    subtitle: '2025高端工业家具目录',
    tagline: '25年以上工业和斯堪的纳维亚家具工艺专业经验',
    since: '始于1999年',
    workshop: '勿加泗工作坊与展厅',
    address: 'Jl. Raya Setu Cibitung, Bekasi, West Java 17320',
    copyright: '© 2025 Naturra Extal. 版权所有',
    welcomeTitle: '欢迎来到Naturra Extal',
    welcomeSubtitle: '印度尼西亚值得信赖的工业家具工匠',
    welcomeIntro: '感谢您下载2025年Naturra Extal官方目录。我们自豪地展示我们的高端工业家具系列，全心全意为您的现代商业和住宅需求而设计。',
    welcomePara1: '25年来，Naturra Extal一直是建筑师、室内设计师、咖啡馆、餐厅、酒店、办公室业主和重视真正品质的房主的首选。我们不仅仅是家具制造商——我们是工匠，深知每个空间角落都有故事，每把椅子必须舒适，每张桌子必须能坚固使用数十年。',
    welcomePara2: '在我们位于勿加泗战略位置的500平方米工作坊内，我们的生产团队由10名经验丰富的焊工、5名技艺精湛的木匠和3名整理专家组成，按照出口质量标准工作。我们焊接的每一根空心钢管、塑造的每一块实木、涂抹的每一层粉末涂层——所有都经过严格的质量控制，确保送到您手中的产品是最好的。',
    welcomePara3: '我们的系列涵盖多种类别：时尚耐用的咖啡馆和餐厅家具、防风雨长达7年的庭院和户外家具、符合人体工程学且提高生产力的办公家具、温馨舒适的住宅家具、五星级酒店款待家具，以及最大化您视觉营销的零售展示解决方案。',
    welcomePara4: '我们理解每个项目都有独特需求。因此，除了您在本目录中看到的现货外，我们还提供定制订单服务，包括各种优质材料选择：来自PT Krakatau Steel的4x4cm至6x6cm空心钢管、A级实木（柚木、桃花心木、松盖）、Jotun/Nippon粉末涂层（50+种颜色选择），以及高质量进口五金件。',
    welcomePara5: '我们的价格直接来自工厂——没有中间商加价。采用50%定金和安装后50%结算的支付系统，加上2年结构保修和1年整理保修，您将获得家具投资的最佳价值。勿加泗、东雅加达和芝加让地区甚至享受免费送货和勘察！',
    welcomeCTA: '立即联系我们获取免费咨询，讨论您的家具需求，或访问我们的工作坊亲眼看看我们提供的产品质量。',
    welcomeSignature: '此致敬礼，',
    welcomeTeam: 'Naturra Extal团队',
    whyChooseTitle: '为什么选择Naturra Extal？',
    whyChooseSubtitle: '6大优势使我们脱颖而出',
    reason1Title: '1. 保证的高端出口质量',
    reason1Desc: '每件产品都采用最优质材料制作：来自PT Krakatau Steel的防锈空心钢和实心钢棒、经过窑干工艺的A级实木以确保尺寸稳定性、Jotun或Nippon出口标准粉末涂层（60-80微米厚度）具有抗紫外线和防风雨功能。我们使用与出口到马来西亚、新加坡和澳大利亚的家具相同的标准。',
    reason2Title: '2. 25年以上经验的工匠',
    reason2Desc: '我们的工作坊由在钢铁和木材家具行业工作了数十年的生产团队支持。我们的焊工是TIG和MIG焊接技术的专家，能够获得牢固整洁的接头效果。我们的木匠精通传统和现代木工。我们的整理专家掌握研磨、打磨、涂层和抛光技术，达到完美效果。',
    reason3Title: '3. 灵活定制订单和3D设计',
    reason3Desc: '找不到合适的尺寸或设计？别担心！我们提供从1件起的定制订单服务。我们的设计师团队将使用SketchUp或3ds Max创建3D渲染图，让您在生产前就能看到产品效果。1-2次设计修改无需额外费用。勿加泗、雅加达、芝加让地区免费咨询和勘察。',
    reason4Title: '4. 工厂直销价格无加价',
    reason4Desc: '因为您直接从工作坊购买，无需支付展厅或家具店的加价。我们的价格透明，明确分项：材料、生产、整理和包装。此外，我们为大宗采购提供5-15%的批量折扣——非常适合咖啡馆、餐厅、酒店或办公室项目。',
    reason5Title: '5. 透明的生产时间表',
    reason5Desc: '我们非常重视您的时间。我们的常规生产时间表是标准家具15-25个工作日，大批量或复杂定制订单30-45天。在生产过程中，您将通过WhatsApp收到定期更新，包括进度照片和视频，让您可以实时监控项目发展。',
    reason6Title: '6. 售后服务和全面保修',
    reason6Desc: '您的满意是我们的首要任务。每次购买都附带2年结构保修和1年整理保修。我们还提供家具护理指南和补漆工具包用于小划痕修复。如果您将来需要维护、重新整理或修改，我们的售后团队随时准备提供帮助。',
    categories: '产品类别',
    categoriesDesc: '满足各种需求的高端工业家具',
    pricingTitle: '估价指南',
    pricingSubtitle: '透明定价助您预算规划',
    pricingNote1: '• 本目录中的价格是常规级别材料标准设计的估算起点。',
    pricingNote2: '• 高复杂度定制设计、优质材料（6x6cm钢材、柚木、电镀饰面）或超大尺寸将调整价格。',
    pricingNote3: '• 价格包括：材料、生产、标准整理（粉末涂层/油漆）、质量控制和安全包装。',
    pricingNote4: '• 配送：勿加泗、东雅加达、芝加让地区免费。外围地区根据距离收费（可协商）。',
    pricingNote5: '• 付款方式：设计批准后50%定金，安装完成后50%结算。接受印尼盾(IDR)和美元(USD)。',
    pricingNote6: '• 批量折扣：5-10件（5%折扣），11-20件（10%折扣），21件以上（可协商至15%）。',
    materialTitle: '我们使用的优质材料',
    materialSubtitle: '只使用最好的材料打造出口品质家具',
    material1Title: '空心钢和实心钢棒',
    material1Desc: '来自PT Krakatau Steel或同等品牌的4x4cm、5x5cm、6x6cm方形空心钢，厚度1.2mm至2mm。对于需要高承载能力的结构，我们使用实心钢棒。所有钢材都涂有镀锌层以防锈。焊接过程采用TIG和MIG技术，获得牢固美观的接头。',
    material2Title: 'A级优质实木',
    material2Desc: '柚木、桃花心木和松盖A级木材，经过窑干工艺将水分含量降至12-15%，确保尺寸稳定性并防止开裂或翘曲。我们的桌面厚度为2-3cm，可选择天然油、三聚氰胺涂层或杜科漆饰面。木工采用榫卯、燕尾榫或口袋螺钉技术以获得最大强度。',
    material3Title: '出口质量粉末涂层',
    material3Desc: '我们使用Jotun（挪威）或Nippon（日本）品牌的出口标准粉末涂层。涂层过程在钢材表面打磨光滑并彻底清洁后进行。涂层厚度60-80微米，确保最佳耐用性。提供50+种颜色选择：哑光黑、亮白、灰色、青铜色、金色、银色、定制RAL颜色。我们的粉末涂层抗紫外线、防风雨，户外使用可持续5-7年。',
    material4Title: '进口五金和配件',
    material4Desc: '304不锈钢螺栓和螺母防锈、加固支架用于牢固的角接头、可调节水平脚适应不平整地板、柜门软关铰链、滚珠轴承抽屉滑轨实现平滑抽屉、办公家具线缆管理解决方案。我们所有的五金件都从可靠的进口供应商精选，确保长期耐用性。',
    contactTitle: '联系我们并开始您的项目',
    contactSubtitle: '我们的团队随时准备帮助实现您梦想中的家具',
    contactInfo: '免费咨询、报价或展厅参观：',
    whatsappTitle: 'WhatsApp和电话',
    whatsappNumber: '+6288801146881',
    whatsappHours: '周一至周六：08.00 - 17.00 WIB',
    whatsappResponse: '响应时间：1-3小时（工作时间）',
    emailTitle: '官方邮箱',
    emailGeneral: 'lifewithNaturra@gmail.com',
    emailSales: 'lifewithNaturra@gmail.com',
    emailNote: '用于报价、合作或咨询',
    addressTitle: '工作坊和展厅',
    addressFull1: 'Naturra Extal工作坊',
    addressFull2: 'Jl. Raya Setu Cibitung, Telajung',
    addressFull3: 'Kec. Cikarang Barat, Kabupaten Bekasi',
    addressFull4: 'West Java 17320, Indonesia',
    addressNote: '距Cibitung收费站10分钟 | 距东雅加达25分钟',
    visitTitle: '来访我们',
    visitDesc: '我们的工作坊欢迎参观。您可以直接看到生产过程、材料样品和我们的项目作品集。请提前联系预约。',
    websiteTitle: '网站和在线',
    website: 'www.naturraextal.com',
    websiteNote: '查看完整作品集、家具技巧文章和最新产品更新',
    exportExp: '• 出口经验：马来西亚、新加坡、澳大利亚',
    workshopSize: '• 工作坊：500平方米，18人生产团队',
    projectDone: '• 完成项目：自1999年以来超过1,200个项目',
    // ─────────────────────────── Status & Labels ───────────────────────────
    viewOnline: '在线查看 →',
    productsAvailable: '产品可用',
    continued: '(续)',
    currency: 'USD',
    currencySymbol: '$',
    priceFormat: '起价',
    cta1: '• 通过WhatsApp联系我们获取免费咨询和报价',
    cta2: '• 访问我们在勿加泗的工作坊直接查看产品',
    cta3: '• 在www.naturraextal.com探索完整系列',
  },

  ja: {
    title1: 'Naturra',
    title2: 'LIVING',
    subtitle: 'プレミアム インダストリアル家具カタログ 2025',
    tagline: '25年以上のインダストリアル・スカンジナビア家具製作の専門知識',
    since: '1999年創業',
    workshop: 'ブカシ工房・ショールーム',
    address: 'Jl. Raya Setu Cibitung, Bekasi, West Java 17320',
    copyright: '© 2025 Naturra Extal. 無断複写・転載を禁じます。',
    welcomeTitle: 'Naturra Extalへようこそ',
    welcomeSubtitle: 'インドネシアで信頼されるインダストリアル家具職人',
    welcomeIntro: 'Naturra Extal 2025年公式カタログをダウンロードいただき、ありがとうございます。現代的なビジネスと住宅のニーズに応えるため、心を込めてデザインされたプレミアム インダストリアル家具コレクションをご紹介いたします。',
    welcomePara1: '25年以上にわたり、Naturra Extalは建築家、インテリアデザイナー、カフェオーナー、レストラン、ホテル、オフィス、そして本物の品質を大切にする住宅オーナーの第一の選択肢となってきました。私たちは単なる家具メーカーではありません——空間のあらゆる角には物語があり、あらゆる椅子は快適でなければならず、あらゆるテーブルは何十年も耐えなければならないことを理解する職人です。',
    welcomePara2: 'ブカシの戦略的な場所にある500平方メートルの工房で、10名の経験豊富な溶接工、5名の熟練大工、3名の仕上げスペシャリストからなる生産チームが輸出品質基準で作業しています。私たちが溶接するすべての中空鋼管、成形するすべての無垢材、塗布するすべてのパウダーコーティング層——すべてが厳格な品質管理を経て、お客様に届く製品が最高品質であることを保証します。',
    welcomePara3: '当社のコレクションは様々なカテゴリーに及びます：スタイリッシュで耐久性のあるカフェ・レストラン家具、最大7年間の耐候性を持つパティオ・アウトドア家具、人間工学的で生産性の高いオフィス家具、温かく快適な住宅家具、五つ星ホテルのホスピタリティ家具、そしてビジュアルマーチャンダイジングを最大化する小売ディスプレイソリューション。',
    welcomePara4: '私たちは各プロジェクトに固有のニーズがあることを理解しています。したがって、本カタログに掲載されている既製品に加え、様々なプレミアム素材オプションを使用したカスタムオーダーも承っています：PT Krakatau Steelの4x4cmから6x6cmの中空鋼管、Aグレードの無垢材（チーク、マホガニー、スンガイ）、50以上の色選択肢を持つJotun/Nipponパウダーコーティング、そして高品質な輸入金具。',
    welcomePara5: '当社の価格は工場直販——中間業者のマークアップはありません。50%の手付金と設置後50%の決済システム、さらに2年間の構造保証と1年間の仕上げ保証により、家具投資の最高の価値を得られます。ブカシ、東ジャカルタ、チカランエリアでは無料配送と調査も提供しています！',
    welcomeCTA: '無料相談、家具ニーズの相談、または工房訪問で製品品質を直接ご確認ください。今すぐお問い合わせください。',
    welcomeSignature: '敬具',
    welcomeTeam: 'Naturra Extalチーム',
    whyChooseTitle: 'Naturra Extalを選ぶ理由',
    whyChooseSubtitle: '競合他社と一線を画す6つの利点',
    reason1Title: '1. 保証されたプレミアム輸出品質',
    reason1Desc: 'すべての製品は最高級の材料で作られています：PT Krakatau Steelの錆びにくい中空鋼とソリッドバー、寸法安定性のための窯乾燥プロセスを経たAグレードの無垢材、UV耐性と耐候性を持つ60-80ミクロン厚のJotunまたはNippon輸出規格パウダーコーティング。マレーシア、シンガポール、オーストラリアへの家具輸出と同じ基準を使用しています。',
    reason2Title: '2. 25年以上の経験を持つ職人',
    reason2Desc: '当社の工房は、数十年にわたり鉄鋼・木材家具産業に携わってきた生産チームによってサポートされています。当社の溶接工はTIGおよびMIG溶接技術の専門家であり、強固で整った接合結果を実現します。当社の大工は伝統的および現代的な木工に熟練しています。当社の仕上げスペシャリストは研磨、サンディング、コーティング、研磨技術を完璧に習得しています。',
    reason3Title: '3. 柔軟なカスタムオーダーと3Dデザイン',
    reason3Desc: '適切なサイズやデザインが見つかりませんか？ご心配なく！1ユニットからカスタムオーダーを承ります。当社のデザイナーチームがSketchUpまたは3ds Maxを使用して3Dレンダリングを作成し、生産前に製品を視覚化できます。1-2回のデザイン修正は追加料金なし。ブカシ、ジャカルタ、チカランエリアでは無料相談と調査を提供。',
    reason4Title: '4. マークアップなしの工場直販価格',
    reason4Desc: '工房から直接購入するため、ショールームや家具店のマークアップを支払う必要がありません。当社の価格は透明で、明確な内訳があります：材料、生産、仕上げ、梱包。さらに、大量購入には5-15%のボリューム割引を提供——カフェ、レストラン、ホテル、オフィスプロジェクトに最適です。',
    reason5Title: '5. 透明な生産タイムライン',
    reason5Desc: 'お客様の時間を大切にしています。当社の通常の生産タイムラインは、標準家具で15-25営業日、大量または複雑なカスタムオーダーで30-45日です。生産プロセス中、WhatsApp経由で進捗の写真とビデオを含む定期的な更新を受け取り、プロジェクトの進展をリアルタイムで監視できます。',
    reason6Title: '6. アフターサービスと包括的保証',
    reason6Desc: 'お客様の満足が私たちの優先事項です。すべての購入には2年間の構造保証と1年間の仕上げ保証が付いています。また、軽微な傷の修理のための家具ケアガイドとタッチアップキットのボーナスも提供しています。将来メンテナンス、再仕上げ、または修正が必要な場合、当社のアフターサービスチームがお手伝いします。',
    categories: '製品カテゴリー',
    categoriesDesc: '様々なニーズに対応するプレミアム インダストリアル家具',
    pricingTitle: '推定価格ガイド',
    pricingSubtitle: '予算計画のための透明な価格設定',
    pricingNote1: '• 本カタログの価格は、通常グレード材料を使用した標準デザインの推定開始点です。',
    pricingNote2: '• 高複雑度のカスタムデザイン、プレミアム材料（6x6cm鋼材、チーク材、電気メッキ仕上げ）、または特大寸法は価格調整が必要です。',
    pricingNote3: '• 価格には含まれます：材料、生産、標準仕上げ（パウダーコーティング/塗装）、品質管理、安全梱包。',
    pricingNote4: '• 配送：ブカシ、東ジャカルタ、チカランエリアは無料。外部エリアは距離に基づいて課金（交渉可能）。',
    pricingNote5: '• 支払いシステム：デザイン承認後50%手付金、設置完了後50%決済。ルピア(IDR)とドル(USD)を受け付けます。',
    pricingNote6: '• ボリューム割引：5-10ユニット（5%オフ）、11-20ユニット（10%オフ）、21ユニット以上（最大15%まで交渉可能）。',
    materialTitle: '使用するプレミアム材料',
    materialSubtitle: '輸出品質家具のための最高の材料のみ',
    material1Title: '中空鋼とソリッドバー',
    material1Desc: 'PT Krakatau Steel または同等品の4x4cm、5x5cm、6x6cm角型中空鋼、厚さ1.2mmから2mm。高荷重負担が必要な構造には、ソリッドスチールバーを使用します。すべての鋼材は防錆のための亜鉛メッキコーティングが施されています。溶接プロセスはTIGおよびMIG技術を使用し、強固で美的な接合部を実現します。',
    material2Title: 'Aグレードプレミアム無垢材',
    material2Desc: 'チーク、マホガニー、スンガイのAグレード木材は、窯乾燥プロセスを経て水分含有量を12-15%に減少させ、寸法安定性を確保し、ひび割れや反りを防ぎます。当社のテーブルトップは2-3cmの厚さで、ナチュラルオイル、メラミンコーティング、またはデュコペイント仕上げをお好みで選択できます。木工はダボ、ほぞ継ぎ、またはポケットネジ技術を使用し、最大の強度を実現します。',
    material3Title: '輸出品質パウダーコーティング',
    material3Desc: 'Jotun（ノルウェー）またはNippon（日本）ブランドの輸出規格パウダーコーティングを使用しています。コーティングプロセスは、鋼材表面を滑らかに研磨し徹底的に洗浄した後に行われます。最適な耐久性のためのコーティング厚60-80ミクロン。50以上の色オプション：マットブラック、グロッシーホワイト、グレー、ブロンズ、ゴールド、シルバー、カスタムRAL色。当社のパウダーコーティングはUV耐性、耐候性があり、屋外使用で5-7年持続します。',
    material4Title: '輸入金具とアクセサリー',
    material4Desc: '錆びにくいステンレス鋼304のボルトとナット、強固なコーナージョイントのための補強ブラケット、不均一な床面のための調整可能なレベリングフィート、キャビネット用ソフトクローズヒンジ、スムーズなドロワー用ボールベアリングドロワースライド、オフィス家具用ケーブル管理ソリューション。当社のすべての金具は、長期的な耐久性を確保するために信頼できる輸入サプライヤーから選定されています。',
    contactTitle: 'お問い合わせとプロジェクト開始',
    contactSubtitle: '夢の家具実現をお手伝いする準備ができています',
    contactInfo: '無料相談、見積もり、またはショールーム訪問：',
    whatsappTitle: 'WhatsAppと電話',
    whatsappNumber: '+6288801146881',
    whatsappHours: '月曜日～土曜日：08.00 - 17.00 WIB',
    whatsappResponse: '応答時間：1-3時間（営業時間内）',
    emailTitle: '公式メール',
    emailGeneral: 'lifewithNaturra@gmail.com',
    emailSales: 'lifewithNaturra@gmail.com',
    emailNote: '見積もり、パートナーシップ、またはお問い合わせ用',
    addressTitle: '工房・ショールーム',
    addressFull1: 'Naturra Extal工房',
    addressFull2: 'Jl. Raya Setu Cibitung, Telajung',
    addressFull3: 'Kec. Cikarang Barat, Kabupaten Bekasi',
    addressFull4: 'West Java 17320, Indonesia',
    addressNote: 'Cibitung有料道路から10分 | 東ジャカルタから25分',
    visitTitle: 'ご来訪ください',
    visitDesc: '当社の工房は訪問を歓迎しています。生産プロセス、材料サンプル、プロジェクトポートフォリオを直接ご覧いただけます。事前にご連絡の上、予約してください。',
    websiteTitle: 'ウェブサイトとオンライン',
    website: 'www.naturraextal.com',
    websiteNote: '完全なポートフォリオ、家具ヒント記事、最新製品更新をご覧ください',
    exportExp: '• 輸出経験：マレーシア、シンガポール、オーストラリア',
    workshopSize: '• 工房：500㎡、18人の生産チーム',
    projectDone: '• 完了プロジェクト：1999年以来1,200以上のプロジェクト',
    // ─────────────────────────── Status & Labels ───────────────────────────
    viewOnline: 'オンラインで見る →',
    productsAvailable: '利用可能な製品',
    continued: '(続き)',
    currency: 'USD',
    currencySymbol: '$',
    priceFormat: '～から',
    cta1: '• 無料相談と見積もりのためWhatsAppでご連絡ください',
    cta2: '• ブカシの工房を訪問して製品を直接ご覧ください',
    cta3: '• www.naturraextal.comで完全なコレクションをご覧ください',
  },

  es: {
    // ─────────────────────────── Cover Page ───────────────────────────
    title1: 'Naturra',
    title2: 'LIVING',
    subtitle: 'Catálogo de Muebles Industriales Premium 2025',
    tagline: 'Más de 25 Años de Experiencia en Artesanía de Muebles Industriales y Escandinavos',
    since: 'Desde 1999',
    workshop: 'Taller y Showroom en Bekasi',
    address: 'Jl. Raya Setu Cibitung, Bekasi, West Java 17320',
    copyright: '© 2025 Naturra Extal. Todos los derechos reservados.',

    // ─────────────────────────── Welcome Page ───────────────────────────
    welcomeTitle: 'Bienvenido a Naturra Extal',
    welcomeSubtitle: 'Artesanos de Muebles Industriales de Confianza en Indonesia',
    welcomeIntro: 'Gracias por descargar el catálogo oficial de Naturra Extal 2025. Nos enorgullece presentar nuestra colección de muebles industriales premium, diseñada con total dedicación para satisfacer las necesidades de su negocio y residencia moderna.',
    welcomePara1: 'Durante más de 25 años, Naturra Extal ha sido la primera opción para arquitectos, diseñadores de interiores, propietarios de cafeterías, restaurantes, hoteles, oficinas y propietarios de viviendas que aprecian la verdadera calidad. No somos solo fabricantes de muebles: somos artesanos que entienden que cada rincón del espacio tiene una historia, cada silla debe ser cómoda y cada mesa debe ser resistente durante décadas.',
    welcomePara2: 'En nuestro taller de 500m² ubicado estratégicamente en Bekasi, nuestro equipo de producción compuesto por 10 soldadores experimentados, 5 carpinteros calificados y 3 especialistas en acabado trabaja con estándares de calidad de exportación. Cada pieza de acero hueco que soldamos, cada madera maciza que damos forma y cada capa de recubrimiento en polvo que aplicamos, todo pasa por un estricto control de calidad para garantizar que el producto que llega a usted sea el mejor.',
    welcomePara3: 'Nuestra colección abarca varias categorías: muebles para cafés y restaurantes elegantes y duraderos, muebles para patio y exteriores resistentes a la intemperie hasta por 7 años, muebles de oficina ergonómicos y productivos, muebles residenciales cálidos y cómodos, muebles de hospitalidad hotelera de cinco estrellas y soluciones de exhibición minorista que maximizan su merchandising visual.',
    welcomePara4: 'Entendemos que cada proyecto tiene necesidades únicas. Por lo tanto, además del stock listo que ve en este catálogo, también servimos pedidos personalizados con varias opciones de materiales premium: acero hueco de 4x4cm a 6x6cm de PT Krakatau Steel, madera maciza de grado A (teck, acajou, sungkai), recubrimiento en polvo Jotun/Nippon con más de 50 opciones de colores y herrajes importados de alta calidad.',
    welcomePara5: 'Nuestros precios son directos de fábrica, sin marcado de intermediarios. Con un sistema de pago del 50% de anticipo y el 50% de liquidación después de la instalación, más una garantía estructural de 2 años y una garantía de acabado de 1 año, obtienes el mejor valor para tu inversión en muebles. ¡Las áreas de Bekasi, este de Yakarta y Cikarang incluso obtienen entrega y levantamiento GRATIS!',
    welcomeCTA: 'Contáctenos hoy para una consulta gratuita, analice sus necesidades de muebles o visite nuestro taller para ver de primera mano la calidad de los productos que ofrecemos.',
    welcomeSignature: 'Atentamente,',
    welcomeTeam: 'Equipo Naturra Extal',

    // ─────────────────────────── Why Choose Us Page ───────────────────────────
    whyChooseTitle: '¿Por qué elegir Naturra Extal?',
    whyChooseSubtitle: '6 Ventajas que nos Distinguent de la Competencia',
    reason1Title: '1. Calidad de Exportación Premium Garantizada',
    reason1Desc: 'Cada producto está fabricado con los mejores materiales: acero hueco y barras sólidas de PT Krakatau Steel resistentes a la oxidación, madera maciza de grado A que ha pasado por un proceso de secado en horno para la estabilidad dimensional, recubrimiento en polvo estándar de exportación Jotun o Nippon con un espesor de 60-80 micrones resistente a los rayos UV y la intemperie. Utilizamos los mismos estándares que las exportaciones de muebles a Malasia, Singapur y Australia.',
    reason2Title: '2. Artesanos con más de 25 Años de Experiencia',
    reason2Desc: 'Nuestro taller está respaldado por un equipo de producción que ha estado involucrado en la industria del mueble de acero y madera durante décadas. Nuestros soldadores son expertos en técnicas de soldadura TIG y MIG para obtener resultados de uniones fuertes y ordenadas. Nuestros carpinteros son hábiles en carpintería tradicional y moderna. Nuestros especialistas en acabado dominan las técnicas de rectificado, lijado, recubrimiento y pulido a la perfección.',
    reason3Title: '3. Pedido Personalizado Flexible y Diseño 3D',
    reason3Desc: '¿No encuentras el tamaño o diseño adecuado? ¡No te preocupes! Servimos pedidos personalizados a partir de 1 unidad. Nuestro equipo de diseñadores creará representaciones 3D utilizando SketchUp o 3ds Max para que pueda visualizar el producto antes de la producción. 1-2 revisiones de diseño sin costo adicional. Consulta y levantamiento GRATUITOS para las áreas de Bekasi, Yakarta y Cikarang.',
    reason4Title: '4. Precios Directos de Fábrica sin Marcado',
    reason4Desc: 'Debido a que compras directamente del taller, no tienes que pagar el marcado del showroom o la tienda de muebles. Nuestros precios son transparentes con un desglose claro: materiales, producción, acabado y embalaje. Además, ofrecemos descuentos por volumen del 5-15% para compras al por mayor, ideales para proyectos de cafeterías, restaurantes, hoteles u oficinas.',
    reason5Title: '5. Cronograma de Producción Transparente',
    reason5Desc: 'Valoramos mucho tu tiempo. Nuestro cronograma de producción regular es de 15-25 días hábiles para muebles estándar y 30-45 días para pedidos personalizados voluminosos o complejos. Durante el proceso de producción, recibirá actualizaciones periódicas a través de WhatsApp completas con fotos y videos del progreso, para que pueda monitorear el desarrollo de su proyecto en tiempo real.',
    reason6Title: '6. Servicio Posventa y Garantía Integral',
    reason6Desc: 'Su satisfacción es nuestra prioridad. Cada compra viene con una garantía estructural de 2 años y una garantía de acabado de 1 año. También proporcionamos una guía de cuidado de muebles de bonificación y un kit de retoque para reparaciones menores de arañazos. Nuestro equipo de posventa está listo para ayudar si necesita mantenimiento, renovación o modificaciones en el futuro.',

    // ─────────────────────────── Labels & Pricing ───────────────────────────
    categories: 'Categorías de Productos',
    categoriesDesc: 'Muebles Industriales Premium para Diversas Necesidades',
    pricingTitle: 'Guía de Precios Estimados',
    pricingSubtitle: 'Precios Transparentes para la Planificación de su Presupuesto',
    pricingNote1: '• Los precios en este catálogo son puntos de partida estimados para diseños estándar con materiales de grado regular.',
    pricingNote2: '• Los diseños personalizados con alta complejidad, materiales premium (acero 6x6cm, madera de teca, acabado galvanoplástico) o dimensiones extra grandes ajustarán los precios.',
    pricingNote3: '• Los precios incluyen: Materiales, producción, acabado estándar (recubrimiento en polvo/pintura), control de calidad y embalaje seguro.',
    pricingNote4: '• Entrega: GRATIS para áreas de Bekasi, este de Yakarta y Cikarang. Áreas externas cobradas según la distancia (negociable).',
    pricingNote5: '• Sistema de Pago: 50% de anticipo después de la aprobación del diseño, 50% de liquidación después de completar la instalación. Aceptamos Rupia (IDR) y Dólar (USD).',
    pricingNote6: '• Descuento por Volumen: 5-10 unidades (5% de descuento), 11-20 unidades (10% de descuento), 21+ unidades (negociable hasta el 15%).',
    materialTitle: 'Materiales Premium que Utilizamos',
    materialSubtitle: 'Solo los Mejores Materiales para Muebles de Calidad de Exportación',
    material1Title: 'Acero Hueco y Barra Sólida',
    material1Desc: 'Acero hueco cuadrado de 4x4cm, 5x5cm, 6x6cm con un espesor de 1.2mm a 2mm de PT Krakatau Steel o equivalente. Para estructuras que requieren alta capacidad de carga, utilizamos barras de acero sólido. Todo el acero está recubierto con revestimiento galvanizado para protección contra la oxidación. El proceso de soldadura utiliza técnicas TIG y MIG para obtener juntas fuertes y estéticas.',
    material2Title: 'Madera Maciza Premium Grado A',
    material2Desc: 'Madera de teca, caoba y sungkai de grado A que ha pasado por un proceso de secado en horno para reducir el contenido de humedad al 12-15%, asegurando la estabilidad dimensional y previniendo agrietamiento o deformación. Nuestros tableros de mesa tienen un grosor de 2-3cm con acabado de aceite natural, recubrimiento de melamina o pintura duco según se prefiera. La carpintería utiliza técnicas de tacos, mortaja y espiga o tornillos de bolsillo para máxima resistencia.',
    material3Title: 'Recubrimiento en Polvo de Calidad de Exportación',
    material3Desc: 'Utilizamos recubrimiento en polvo de marca Jotun (Noruega) o Nippon (Japon) con estándares de exportación. El proceso de recubrimiento se realiza después de que la superficie de acero se rectifica suavemente y se limpia a fondo. Grosor de recubrimiento de 60-80 micrones para una durabilidad óptima. Disponible en más de 50 opciones de color: Negro Mate, Blanco Brillante, Gris, Bronce, Dorado, Plateado, colores RAL personalizados. Nuestro recubrimiento en polvo es resistente a los rayos UV, resistente a la intemperie y dura hasta 5-7 años para uso en exteriores.',
    material4Title: 'Herrajes y Accesorios Importados',
    material4Desc: 'Pernos y tuercas de acero inoxidable 304 resistentes a la oxidación, soportes de refuerzo para juntas de esquina fuertes, patas niveladoras ajustables para superficies de piso irregulares, bisagras de cierre suave para gabinetes, rieles de cajón con rodamientos de bolas para cajones suaves y soluciones de gestión de cables para muebles de oficina. Todos nuestros herrajes están seleccionados de proveedores de importación confiables para garantizar la durabilidad a largo plazo.',
    contactTitle: 'Contáctenos y Comience su Proyecto',
    contactSubtitle: 'Nuestro Equipo está Listo para Ayudar a Realizar los Muebles de sus Sueños',
    contactInfo: 'Para consulta gratuita, cotización o visita al showroom:',
    whatsappTitle: 'WhatsApp y Teléfono',
    whatsappNumber: '+6288801146881',
    whatsappHours: 'Lunes - Sábado: 08.00 - 17.00 WIB',
    whatsappResponse: 'Tiempo de respuesta: 1-3 horas (horario laboral)',
    emailTitle: 'Correo Electrónico Oficial',
    emailGeneral: 'lifewithNaturra@gmail.com',
    emailSales: 'lifewithNaturra@gmail.com',
    emailNote: 'Para cotización, asociación o consulta',
    addressTitle: 'Taller y Showroom',
    addressFull1: 'Taller Naturra Extal',
    addressFull2: 'Jl. Raya Setu Cibitung, Telajung',
    addressFull3: 'Kec. Cikarang Barat, Kabupaten Bekasi',
    addressFull4: 'West Java 17320, Indonesia',
    addressNote: '10 minutos desde el peaje de Cibitung | 25 minutos desde el este de Yakarta',
    visitTitle: 'Visítenos',
    visitDesc: 'Nuestro taller está abierto para visitas. Puede ver el proceso de producción, muestras de materiales y el portafolio de nuestros proyectos de primera mano. Contáctenos de antemano para hacer una cita.',
    websiteTitle: 'Sitio Web y En Línea',
    website: 'www.naturraextal.com',
    websiteNote: 'Vea el portafolio completo, artículos de consejos de muebles y las últimas actualizaciones de productos',
    exportExp: '• Experiencia de Exportación: Malasia, Singapur, Australia',
    workshopSize: '• Taller: 500m² con un equipo de producción de 18 personas',
    projectDone: '• Proyectos Completados: Más de 1,200 proyectos desde 1999',
    viewOnline: 'Ver en línea →',
    productsAvailable: 'productos disponibles',
    continued: '(cont.)',
    currency: 'USD',
    currencySymbol: '$',
    priceFormat: 'Desde',
    cta1: '• Envíanos un mensaje por WhatsApp para consulta y cotización gratuitas',
    cta2: '• Visita nuestro taller en Bekasi para ver los productos directamente',
    cta3: '• Explora la colección completa en www.naturraextal.com',
  },

  fr: {
    // ─────────────────────────── Cover Page ───────────────────────────
    title1: 'Naturra',
    title2: 'LIVING',
    subtitle: 'Catalogue de Meubles Industriels Premium 2025',
    tagline: 'Plus de 25 Ans d\'Expertise en Artisanat de Meubles Industriels et Scandinaves',
    since: 'Depuis 1999',
    workshop: 'Atelier et Showroom à Bekasi',
    address: 'Jl. Raya Setu Cibitung, Bekasi, West Java 17320',
    copyright: '© 2025 Naturra Extal. Tous droits réservés.',
    welcomeTitle: 'Bienvenue chez Naturra Extal',
    welcomeSubtitle: 'Artisans de Meubles Industriels de Confiance en Indonésie',
    welcomeIntro: 'Merci d\'avoir téléchargé le catalogue officiel Naturra Extal 2025. Nous sommes fiers de présenter notre collection de meubles industriels premium, conçue avec un dévouement total pour répondre aux besoins de votre entreprise et de votre résidence moderne.',
    welcomePara1: 'Depuis plus de 25 ans, Naturra Extal est le premier choix des architectes, designers d\'intérieur, propriétaires de cafés, restaurants, hôtels, bureaux et propriétaires de maisons qui apprécient la vraie qualité. Nous ne sommes pas seulement des fabricants de meubles, nous sommes des artisans qui comprennent que chaque coin d\'espace a une histoire, que chaque chaise doit être confortable et que chaque table doit résister pendant des décennies.',
    welcomePara2: 'Dans notre atelier de 500m² situé stratégiquement à Bekasi, notre équipe de production composée de 10 soudeurs expérimentés, 5 menuisiers qualifiés et 3 spécialistes en finition travaille selon des normes de qualité d\'exportation. Chaque morceau d\'acier creux que nous soudons, chaque bois massif que nous façonnons et chaque couche de revêtement en poudre que nous appliquons, tout passe par un contrôle de qualité strict pour garantir que le produit qui vous parvient est le meilleur.',
    welcomePara3: 'Notre collection couvre diverses catégories : meubles élégants et durables pour cafés et restaurants, meubles de patio et d\'extérieur résistants aux intempéries jusqu\'à 7 ans, meubles de bureau ergonomiques et productifs, meubles résidentiels chaleureux et confortables, meubles d\'hospitalité hôtelière cinq étoiles et solutions d\'affichage au détail qui maximisent votre merchandising visuel.',
    welcomePara4: 'Nous comprenons que chaque projet a des besoins uniques. Par conséquent, en plus du stock prêt que vous voyez dans ce catalogue, nous servons également des commandes personnalisées avec diverses options de matériaux premium : acier creux de 4x4cm à 6x6cm de PT Krakatau Steel, bois massif de qualité A (teck, acajou, sungkai), revêtement en poudre Jotun/Nippon avec plus de 50 choix de couleurs et quincaillerie importée de haute qualité.',
    welcomePara5: 'Nos prix sont directs d\'usine, sans majoration d\'intermédiaire. Avec un système de paiement de 50% d\'acompte et 50% de règlement après installation, plus une garantie structurelle de 2 ans et une garantie de finition d\'1 an, vous obtenez la meilleure valeur pour votre investissement en meubles. Les zones de Bekasi, Est de Jakarta et Cikarang bénéficient même d\'une livraison et d\'un relevé GRATUITS !',
    welcomeCTA: 'Contactez-nous aujourd\'hui pour une consultation gratuite, discutez de vos besoins en meubles ou visitez notre atelier pour voir de première main la qualité des produits que nous offrons.',
    welcomeSignature: 'Cordialement,',
    welcomeTeam: 'Équipe Naturra Extal',
    whyChooseTitle: 'Pourquoi choisir Naturra Extal ?',
    whyChooseSubtitle: '6 Avantages qui nous Distinguent de la Concurrence',
    reason1Title: '1. Qualité d\'Exportation Premium Garantie',
    reason1Desc: 'Chaque produit est fabriqué avec les meilleurs matériaux : acier creux et barres solides de PT Krakatau Steel résistants à la rouille, bois massif de qualité A ayant subi un processus de séchage au four pour la stabilité dimensionnelle, revêtement en poudre standard d\'exportation Jotun ou Nippon avec une épaisseur de 60-80 microns résistant aux UV et aux intempéries. Nous utilisons les mêmes normes que les exportations de meubles vers la Malaisie, Singapour et l\'Australie.',
    reason2Title: '2. Artisans avec plus de 25 Ans d\'Expérience',
    reason2Desc: 'Notre atelier est soutenu par une équipe de production impliquée dans l\'industrie du meuble en acier et en bois depuis des décennies. Nos soudeurs sont experts en techniques de soudage TIG et MIG pour des résultats de joints solides et soignés. Nos menuisiers sont compétents en menuiserie traditionnelle et moderne. Nos spécialistes en finition maîtrisent les techniques de meulage, ponçage, revêtement et polissage à la perfection.',
    reason3Title: '3. Commande Personnalisée Flexible et Conception 3D',
    reason3Desc: 'Vous ne trouvez pas la bonne taille ou le bon design ? Pas de soucis ! Nous servons des commandes personnalisées à partir d\'1 unité. Notre équipe de designers créera des rendus 3D en utilisant SketchUp ou 3ds Max afin que vous puissiez visualiser le produit avant la production. 1-2 révisions de conception sans frais supplémentaires. Consultation et relevé GRATUITS pour les zones de Bekasi, Jakarta et Cikarang.',
    reason4Title: '4. Prix Directs d\'Usine sans Majoration',
    reason4Desc: 'Parce que vous achetez directement de l\'atelier, vous n\'avez pas à payer la majoration du showroom ou du magasin de meubles. Nos prix sont transparents avec une ventilation claire : matériaux, production, finition et emballage. De plus, nous offrons des remises sur volume de 5-15% pour les achats en gros, idéales pour les projets de cafés, restaurants, hôtels ou bureaux.',
    reason5Title: '5. Calendrier de Production Transparent',
    reason5Desc: 'Nous valorisons beaucoup votre temps. Notre calendrier de production régulier est de 15-25 jours ouvrables pour les meubles standard et 30-45 jours pour les commandes personnalisées volumineuses ou complexes. Pendant le processus de production, vous recevrez des mises à jour régulières via WhatsApp complètes avec des photos et vidéos de progression, afin que vous puissiez surveiller le développement de votre projet en temps réel.',
    reason6Title: '6. Service Après-Vente et Garantie Complète',
    reason6Desc: 'Votre satisfaction est notre priorité. Chaque achat est accompagné d\'une garantie structurelle de 2 ans et d\'une garantie de finition d\'1 an. Nous fournissons également un guide d\'entretien des meubles bonus et un kit de retouche pour les réparations mineures de rayures. Notre équipe après-vente est prête à vous aider si vous avez besoin d\'entretien, de refinition ou de modifications à l\'avenir.',
    categories: 'Catégories de Produits',
    categoriesDesc: 'Meubles Industriels Premium pour Divers Besoins',
    pricingTitle: 'Guide des Prix Estimés',
    pricingSubtitle: 'Tarification Transparente pour la Planification de votre Budget',
    pricingNote1: '• Les prix de ce catalogue sont des points de départ estimés pour les conceptions standard avec des matériaux de qualité régulière.',
    pricingNote2: '• Les conceptions personnalisées à haute complexité, les matériaux premium (acier 6x6cm, bois de teck, finition galvanoplastie) ou les dimensions extra-larges ajusteront les prix.',
    pricingNote3: '• Les prix incluent : Matériaux, production, finition standard (revêtement en poudre/peinture), contrôle qualité et emballage sûr.',
    pricingNote4: '• Livraison : GRATUITE pour les zones de Bekasi, Est de Jakarta et Cikarang. Les zones extérieures sont facturées en fonction de la distance (négociable).',
    pricingNote5: '• Système de Paiement : 50% d\'acompte après approbation de la conception, 50% de règlement après installation complète. Accepte Rupiah (IDR) et Dollar (USD).',
    pricingNote6: '• Remise sur Volume : 5-10 unités (5% de réduction), 11-20 unités (10% de réduction), 21+ unités (négociable jusqu\'à 15%).',
    materialTitle: 'Matériaux Premium que nous Utilisons',
    materialSubtitle: 'Seulement les Meilleurs Matériaux pour des Meubles de Qualité d\'Exportation',
    material1Title: 'Acier Creux et Barre Solide',
    material1Desc: 'Acier creux carré 4x4cm, 5x5cm, 6x6cm avec une épaisseur de 1.2mm à 2mm de PT Krakatau Steel ou équivalent. Pour les structures nécessitant une haute capacité portante, nous utilisons des barres d\'acier solide. Tout l\'acier est revêtu d\'un revêtement galvanisé pour la protection contre la rouille. Le processus de soudage utilise les techniques TIG et MIG pour des joints solides et esthétiques.',
    material2Title: 'Bois Massif Premium Qualité A',
    material2Desc: 'Bois de teck, acajou et sungkai de qualité A ayant subi un processus de séchage au four pour réduire la teneur en humidité à 12-15%, assurant la stabilité dimensionnelle et prévenant les fissures ou déformations. Nos plateaux de table ont une épaisseur de 2-3cm avec finition à l\'huile naturelle, revêtement en mélamine ou peinture duco selon les préférences. La menuiserie utilise des techniques de goujon, mortaise-tenon ou vis à poche pour une résistance maximale.',
    material3Title: 'Revêtement en Poudre de Qualité d\'Exportation',
    material3Desc: 'Nous utilisons un revêtement en poudre de marque Jotun (Norvège) ou Nippon (Japon) avec des normes d\'exportation. Le processus de revêtement est effectué après que la surface d\'acier soit rectifiée en douceur et nettoyée à fond. Épaisseur de revêtement de 60-80 microns pour une durabilité optimale. Disponible en plus de 50 options de couleur : Noir Mat, Blanc Brillant, Gris, Bronze, Or, Argent, couleurs RAL personnalisées. Notre revêtement en poudre est résistant aux UV, résistant aux intempéries et dure jusqu\'à 5-7 ans pour une utilisation en extérieur.',
    material4Title: 'Quincaillerie et Accessoires Importés',
    material4Desc: 'Boulons et écrous en acier inoxydable 304 résistants à la rouille, supports de renforcement pour des joints de coin solides, pieds de nivellement ajustables pour des surfaces de sol inégales, charnières à fermeture douce pour armoires, glissières de tiroir à roulement à billes pour des tiroirs lisses et solutions de gestion des câbles pour meubles de bureau. Toute notre quincaillerie est sélectionnée auprès de fournisseurs d\'importation fiables pour garantir la durabilité à long terme.',
    contactTitle: 'Contactez-nous et Commencez votre Projet',
    contactSubtitle: 'Notre Équipe est Prête à Aider à Réaliser les Meubles de vos Rêves',
    contactInfo: 'Pour une consultation gratuite, un devis ou une visite au showroom :',
    whatsappTitle: 'WhatsApp et Téléphone',
    whatsappNumber: '+6288801146881',
    whatsappHours: 'Lundi - Samedi : 08.00 - 17.00 WIB',
    whatsappResponse: 'Temps de réponse : 1-3 heures (heures de travail)',
    emailTitle: 'Email Officiel',
    emailGeneral: 'lifewithNaturra@gmail.com',
    emailSales: 'lifewithNaturra@gmail.com',
    emailNote: 'Pour devis, partenariat ou demande',
    addressTitle: 'Atelier et Showroom',
    addressFull1: 'Atelier Naturra Extal',
    addressFull2: 'Jl. Raya Setu Cibitung, Telajung',
    addressFull3: 'Kec. Cikarang Barat, Kabupaten Bekasi',
    addressFull4: 'West Java 17320, Indonesia',
    addressNote: '10 min du péage de Cibitung | 25 min de l\'est de Jakarta',
    visitTitle: 'Visitez-nous',
    visitDesc: 'Notre atelier est ouvert aux visites. Vous pouvez voir le processus de production, les échantillons de matériaux et le portefeuille de nos projets de première main. Contactez-nous à l\'avance pour prendre rendez-vous.',
    websiteTitle: 'Site Web et En Ligne',
    website: 'www.naturraextal.com',
    websiteNote: 'Consultez le portefeuille complet, les articles de conseils sur les meubles et les dernières mises à jour de produits',
    exportExp: '• Expérience d\'Exportation : Malaisie, Singapour, Australie',
    workshopSize: '• Atelier : 500m² avec une équipe de production de 18 personnes',
    projectDone: '• Projets Réalisés : Plus de 1,200 projets depuis 1999',
    continued: '(suite)',
    currency: 'USD',
    currencySymbol: '$',
    priceFormat: 'À partir de',
    cta1: '• Envoyez-nous un message sur WhatsApp pour une consultation et un devis gratuits',
    cta2: '• Visitez notre atelier à Bekasi pour voir les produits directement',
    cta3: '• Explorez la collection complète sur www.naturraextal.com',
  },

  ko: {
    title1: 'Naturra',
    title2: 'LIVING',
    subtitle: '프리미엄 인더스트리얼 가구 카탈로그 2025',
    tagline: '25년 이상의 인더스트리얼 및 스칸디나비아 가구 제작 전문 지식',
    since: '1999년 설립',
    workshop: '브카시 공방 및 쇼룸',
    address: 'Jl. Raya Setu Cibitung, Bekasi, West Java 17320',
    copyright: '© 2025 Naturra Extal. 모든 권리 보유.',
    welcomeTitle: 'Naturra Extal에 오신 것을 환영합니다',
    welcomeSubtitle: '인도네시아에서 신뢰받는 인더스트리얼 가구 장인',
    welcomeIntro: 'Naturra Extal 2025 공식 카탈로그를 다운로드해 주셔서 감사합니다. 현대적인 비즈니스와 주거 공간의 요구를 충족시키기 위해 전심으로 디자인된 프리미엄 인더스트리얼 가구 컬렉션을 자랑스럽게 선보입니다.',
    welcomePara1: '25년 이상 동안 Naturra Extal은 진정한 품질을 중시하는 건축가, 인테리어 디자이너, 카페 소유자, 레스토랑, 호텔, 사무실 및 주택 소유자들의 최우선 선택이 되어 왔습니다. 우리는 단순한 가구 제조업체가 아닙니다—공간의 모든 모서리에 이야기가 있고, 모든 의자는 편안해야 하며, 모든 테이블은 수십 년 동안 튼튼해야 한다는 것을 이해하는 장인입니다.',
    welcomePara2: '브카시의 전략적 위치에 있는 500㎡ 공방에서 경험 많은 용접공 10명, 숙련된 목수 5명, 마무리 전문가 3명으로 구성된 생산팀이 수출 품질 기준으로 작업하고 있습니다. 우리가 용접하는 모든 중공 강철, 성형하는 모든 원목, 도포하는 모든 분체 도장층—모두 엄격한 품질 관리를 거쳐 고객에게 도착하는 제품이 최고임을 보장합니다.',
    welcomePara3: '우리의 컬렉션은 다양한 카테고리를 포괄합니다: 스타일리시하고 내구성 있는 카페 및 레스토랑 가구, 최대 7년간 내후성을 가진 파티오 및 야외 가구, 인체공학적이고 생산적인 사무실 가구, 따뜻하고 편안한 주거용 가구, 5성급 호텔 환대 가구, 그리고 시각적 머천다이징을 극대화하는 소매 디스플레이 솔루션.',
    welcomePara4: '우리는 각 프로젝트에 고유한 요구사항이 있다는 것을 이해합니다. 따라서 본 카탈로그에서 보시는 기성품 외에도 다양한 프리미엄 재료 옵션을 사용한 맞춤 주문을 제공합니다: PT Krakatau Steel의 4x4cm~6x6cm 중공 강철, A등급 원목(티크, 마호가니, 숭가이), 50가지 이상의 색상 선택이 가능한 Jotun/Nippon 분체 도장, 그리고 고품질 수입 하드웨어.',
    welcomePara5: '우리의 가격은 공장 직접 판매입니다—중간상의 마크업이 없습니다. 50% 계약금과 설치 후 50% 정산 시스템, 2년 구조 보증 및 1년 마무리 보증으로 가구 투자에 최고의 가치를 얻으실 수 있습니다. 브카시, 동부 자카르타, 치카랑 지역은 무료 배송 및 현장 조사 혜택도 받으실 수 있습니다!',
    welcomeCTA: '무료 상담, 가구 요구사항 논의 또는 공방 방문을 통해 우리가 제공하는 제품의 품질을 직접 확인하시려면 오늘 연락주세요.',
    welcomeSignature: '감사합니다,',
    welcomeTeam: 'Naturra Extal 팀',
    whyChooseTitle: 'Naturra Extal을 선택하는 이유',
    whyChooseSubtitle: '경쟁사와 차별화되는 6가지 장점',
    reason1Title: '1. 보장된 프리미엄 수출 품질',
    reason1Desc: '모든 제품은 최고급 재료로 제작됩니다: 녹슬지 않는 PT Krakatau Steel의 중공 강철 및 솔리드 바, 치수 안정성을 위한 가마 건조 공정을 거친 A등급 원목, UV 및 내후성이 있는 60-80미크론 두께의 Jotun 또는 Nippon 수출 기준 분체 도장. 우리는 말레이시아, 싱가포르, 호주로 수출하는 가구와 동일한 기준을 사용합니다.',
    reason2Title: '2. 25년 이상 경험의 장인',
    reason2Desc: '우리 공방은 수십 년 동안 철강 및 목재 가구 산업에 종사해 온 생산팀의 지원을 받습니다. 우리의 용접공은 강하고 깔끔한 접합 결과를 위한 TIG 및 MIG 용접 기술의 전문가입니다. 우리의 목수는 전통적이고 현대적인 목공에 능숙합니다. 우리의 마무리 전문가는 연마, 샌딩, 코팅 및 광택 기술을 완벽하게 마스터했습니다.',
    reason3Title: '3. 유연한 맞춤 주문 및 3D 디자인',
    reason3Desc: '적절한 크기나 디자인을 찾을 수 없으신가요? 걱정 마세요! 1개 단위부터 맞춤 주문을 받습니다. 우리의 디자이너 팀은 SketchUp 또는 3ds Max를 사용하여 3D 렌더링을 만들어 생산 전에 제품을 시각화할 수 있도록 합니다. 1-2회 디자인 수정은 추가 비용 없음. 브카시, 자카르타, 치카랑 지역은 무료 상담 및 현장 조사 제공.',
    reason4Title: '4. 마크업 없는 공장 직접 가격',
    reason4Desc: '공방에서 직접 구매하기 때문에 쇼룸이나 가구점 마크업을 지불할 필요가 없습니다. 우리의 가격은 명확한 내역과 함께 투명합니다: 재료, 생산, 마무리 및 포장. 게다가, 대량 구매에 대해 5-15%의 볼륨 할인을 제공합니다—카페, 레스토랑, 호텔 또는 사무실 프로젝트에 이상적입니다.',
    reason5Title: '5. 투명한 생산 일정',
    reason5Desc: '우리는 귀하의 시간을 매우 소중히 여깁니다. 우리의 정규 생산 일정은 표준 가구의 경우 15-25 영업일, 대량 또는 복잡한 맞춤 주문의 경우 30-45일입니다. 생산 과정 중 WhatsApp을 통해 진행 상황 사진 및 비디오가 포함된 정기 업데이트를 받아 프로젝트 진행 상황을 실시간으로 모니터링할 수 있습니다.',
    reason6Title: '6. 애프터서비스 및 포괄적 보증',
    reason6Desc: '귀하의 만족이 우리의 최우선 순위입니다. 모든 구매에는 2년 구조 보증 및 1년 마무리 보증이 함께 제공됩니다. 또한 경미한 스크래치 수리를 위한 가구 관리 가이드 및 터치업 키트 보너스도 제공합니다. 향후 유지보수, 재마무리 또는 수정이 필요한 경우 애프터서비스 팀이 도와드릴 준비가 되어 있습니다.',
    categories: '제품 카테고리',
    categoriesDesc: '다양한 요구를 위한 프리미엄 인더스트리얼 가구',
    pricingTitle: '예상 가격 가이드',
    pricingSubtitle: '예산 계획을 위한 투명한 가격',
    pricingNote1: '• 본 카탈로그의 가격은 일반 등급 재료를 사용한 표준 디자인의 예상 시작점입니다.',
    pricingNote2: '• 높은 복잡성의 맞춤 디자인, 프리미엄 재료(6x6cm 강철, 티크 목재, 전기도금 마감) 또는 초대형 치수는 가격이 조정됩니다.',
    pricingNote3: '• 가격 포함 사항: 재료, 생산, 표준 마무리(분체 도장/페인팅), 품질 관리 및 안전 포장.',
    pricingNote4: '• 배송: 브카시, 동부 자카르타, 치카랑 지역 무료. 외부 지역은 거리에 따라 요금 부과(협상 가능).',
    pricingNote5: '• 결제 시스템: 디자인 승인 후 50% 계약금, 설치 완료 후 50% 정산. 루피아(IDR) 및 달러(USD) 수락.',
    pricingNote6: '• 볼륨 할인: 5-10개 (5% 할인), 11-20개 (10% 할인), 21개 이상 (최대 15%까지 협상 가능).',
    materialTitle: '사용하는 프리미엄 재료',
    materialSubtitle: '수출 품질 가구를 위한 최고의 재료만',
    material1Title: '중공 강철 및 솔리드 바',
    material1Desc: 'PT Krakatau Steel 또는 동등품의 4x4cm, 5x5cm, 6x6cm 사각 중공 강철, 두께 1.2mm~2mm. 높은 하중을 요구하는 구조물에는 솔리드 스틸 바를 사용합니다. 모든 강철은 녹 방지를 위한 아연도금 코팅이 되어 있습니다. 용접 공정은 강하고 미적인 접합부를 위해 TIG 및 MIG 기술을 사용합니다.',
    material2Title: 'A등급 프리미엄 원목',
    material2Desc: '티크, 마호가니, 숭가이 A등급 목재는 가마 건조 공정을 거쳐 수분 함량을 12-15%로 줄여 치수 안정성을 보장하고 균열 또는 휨을 방지합니다. 우리의 테이블 상판은 2-3cm 두께로 천연 오일, 멜라민 코팅 또는 듀코 페인트 마감을 선호도에 따라 선택할 수 있습니다. 목공은 최대 강도를 위해 다웰, 장부맞춤 또는 포켓 나사 기술을 사용합니다.',
    material3Title: '수출 품질 분체 도장',
    material3Desc: 'Jotun(노르웨이) 또는 Nippon(일본) 브랜드의 수출 기준 분체 도장을 사용합니다. 코팅 공정은 강철 표면을 부드럽게 연마하고 철저히 세척한 후 수행됩니다. 최적의 내구성을 위한 코팅 두께 60-80미크론. 50가지 이상의 색상 옵션: 매트 블랙, 광택 화이트, 그레이, 브론즈, 골드, 실버, 맞춤 RAL 색상. 우리의 분체 도장은 UV 저항성, 내후성이 있으며 야외 사용시 5-7년간 지속됩니다.',
    material4Title: '수입 하드웨어 및 액세서리',
    material4Desc: '녹슬지 않는 스테인리스 스틸 304 볼트 및 너트, 강한 모서리 접합부를 위한 보강 브래킷, 고르지 않은 바닥 표면을 위한 조절 가능한 레벨링 피트, 캐비닛용 소프트 클로즈 힌지, 부드러운 서랍을 위한 볼 베어링 서랍 슬라이드, 사무실 가구용 케이블 관리 솔루션. 우리의 모든 하드웨어는 장기 내구성을 보장하기 위해 신뢰할 수 있는 수입 공급업체로부터 선정됩니다.',
    contactTitle: '문의하기 및 프로젝트 시작',
    contactSubtitle: '꿈의 가구 실현을 도와드릴 준비가 되어 있습니다',
    contactInfo: '무료 상담, 견적 또는 쇼룸 방문:',
    whatsappTitle: 'WhatsApp 및 전화',
    whatsappNumber: '+6288801146881',
    whatsappHours: '월요일 - 토요일: 08.00 - 17.00 WIB',
    whatsappResponse: '응답 시간: 1-3시간 (근무 시간)',
    emailTitle: '공식 이메일',
    emailGeneral: 'lifewithNaturra@gmail.com',
    emailSales: 'lifewithNaturra@gmail.com',
    emailNote: '견적, 파트너십 또는 문의용',
    addressTitle: '공방 및 쇼룸',
    addressFull1: 'Naturra Extal 공방',
    addressFull2: 'Jl. Raya Setu Cibitung, Telajung',
    addressFull3: 'Kec. Cikarang Barat, Kabupaten Bekasi',
    addressFull4: 'West Java 17320, Indonesia',
    addressNote: 'Cibitung 톨게이트에서 10분 | 동부 자카르타에서 25분',
    visitTitle: '방문해 주세요',
    visitDesc: '우리 공방은 방문을 환영합니다. 생산 공정, 재료 샘플 및 프로젝트 포트폴리오를 직접 볼 수 있습니다. 사전에 연락하여 약속을 잡으세요.',
    websiteTitle: '웹사이트 및 온라인',
    website: 'www.naturraextal.com',
    websiteNote: '전체 포트폴리오, 가구 팁 기사 및 최신 제품 업데이트 보기',
    exportExp: '• 수출 경험: 말레이시아, 싱가포르, 호주',
    workshopSize: '• 공방: 500㎡, 18인 생산팀',
    projectDone: '• 완료된 프로젝트: 1999년 이후 1,200개 이상의 프로젝트',
    continued: '(계속)',
    currency: 'USD',
    currencySymbol: '$',
    priceFormat: '부터',
    cta1: '• 무료 상담 및 견적을 위해 WhatsApp으로 문의하세요',
    cta2: '• 브카시 공방을 방문하여 제품을 직접 확인하세요',
    cta3: '• www.naturraextal.com에서 전체 컬렉션을 탐색하세요',
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════════

// Helper function to load image and convert to base64
const loadImageAsBase64 = async (imagePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      } else {
        reject(new Error('Failed to get canvas context'))
      }
    }
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = imagePath
  })
}

// Format price with proper currency
const formatPrice = (price: string, currency: 'IDR' | 'USD'): string => {
  // Extract numeric value from price string
  const numericMatch = price.match(/[\d.,]+/)
  if (!numericMatch) return price

  const numericValue = parseFloat(numericMatch[0].replace(/[.,]/g, ''))

  if (currency === 'USD') {
    // Convert IDR to USD (approximate rate 1 USD = 16,000 IDR)
    const usdValue = Math.round(numericValue / 16000)
    return `$${usdValue}`
  } else {
    // Keep IDR format
    const formatted = numericValue.toLocaleString('id-ID')
    return `Rp ${formatted}`
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PDF GENERATION FUNCTION
// ══════════════════════════════════════════════════════════════════════════════

export const generateCatalog = async (preferredLanguage?: 'id' | 'en' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko') => {
  const MAX_GENERATION_TIME = 120000 // 2 minutes max for entire generation

  // Wrap entire generation in timeout to prevent infinite loading
  const generationPromise = (async () => {
    try {
      console.log('[PDF] Starting catalog generation...')

      // Load PDF dependencies only when needed
      try {
        await loadPDFDependencies()
        console.log('[PDF] Dependencies loaded')
      } catch (depError) {
        console.error('[PDF] Failed to load dependencies:', depError)
        throw new Error(`Failed to load PDF dependencies: ${depError instanceof Error ? depError.message : String(depError)}`)
      }

      // Get language preference - use parameter if provided, otherwise fallback to stored preference
      const lang = preferredLanguage || getLanguagePreference()
      console.log(`[PDF] Language detected: ${lang}${preferredLanguage ? ' (from parameter)' : ' (from localStorage)'}`)

      const t = (content as any)[lang]
      if (!t) {
        console.error(`[PDF] Content object for language ${lang}:`, Object.keys(content))
        throw new Error(`No content found for language: ${lang}. Available languages: ${Object.keys(content).join(', ')}`)
      }

      console.log(`[PDF] Content loaded for ${lang}, checking required fields...`)
      const requiredFields = ['title1', 'title2', 'subtitle', 'tagline', 'since', 'workshop', 'address', 'copyright']
      const missingFields = requiredFields.filter(field => !t[field])
      if (missingFields.length > 0) {
        console.warn(`[PDF] Missing content fields for ${lang}:`, missingFields)
      }

      const doc = new jsPDF('p', 'mm', 'a4')
      console.log('[PDF] PDF document created')

      // Prepare Unicode-capable font for non-Latin languages (loads from /public/fonts if available)
      console.log(`[PDF] Preparing font for language: ${lang}`)
      let baseFontFamily: string
      let hasStyles: boolean
      try {
        const fontResult = await prepareLanguageFont(doc, lang)
        baseFontFamily = fontResult.family
        hasStyles = fontResult.hasStyles
        console.log(`[PDF] Font prepared: ${baseFontFamily}`)
      } catch (fontError) {
        console.error(`[PDF] Font preparation failed for ${lang}, using helvetica:`, fontError)
        baseFontFamily = 'helvetica'
        hasStyles = true
      }

      const setF = (style: 'normal' | 'bold' | 'italic' | 'bolditalic' = 'normal') => {
        try {
          const resolvedStyle = hasStyles ? style : 'normal'
          doc.setFont(baseFontFamily, resolvedStyle)
        } catch (fontError) {
          console.warn(`[PDF] Failed to set font ${baseFontFamily} with style ${style}, using helvetica:`, fontError)
          doc.setFont('helvetica', 'normal')
        }
      }

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()

      // ══════════════════════════════════════════════════════════════════════════
      // ELEGANT COLOR PALETTE
      // ══════════════════════════════════════════════════════════════════════════
      const colors = {
        primaryDark: [26, 35, 46],          // Rich charcoal
        primaryAccent: [139, 115, 85],      // Warm bronze
        secondaryAccent: [190, 171, 153],   // Elegant taupe
        textLight: [255, 255, 255],         // Pure white
        textDark: [44, 62, 80],             // Deep slate
        textMuted: [120, 120, 120],         // Muted grey
        goldAccent: [184, 134, 11],         // Elegant gold
        backgroundLight: [248, 248, 248],   // Soft white
        lineAccent: [200, 200, 200],        // Subtle line
      }

      let pageNumber = 1

      // ══════════════════════════════════════════════════════════════════════════
      // COVER PAGE - WORLD CLASS DESIGN
      // ══════════════════════════════════════════════════════════════════════════
      doc.setFillColor(...colors.primaryDark)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')

      // Elegant geometric frame
      doc.setDrawColor(...colors.primaryAccent)
      doc.setLineWidth(0.5)
      doc.rect(15, 15, pageWidth - 30, pageHeight - 30, 'S')
      doc.setLineWidth(0.3)
      doc.rect(18, 18, pageWidth - 36, pageHeight - 36, 'S')

      // Top decorative line
      doc.setDrawColor(...colors.goldAccent)
      doc.setLineWidth(1)
      doc.line(pageWidth / 2 - 40, 45, pageWidth / 2 + 40, 45)

      // Brand name - Naturra
      doc.setTextColor(...colors.textLight)
      doc.setFontSize(60)
      setF('bold')
      try {
        doc.text(processRTLText(t.title1 || 'Naturra', lang), pageWidth / 2, 75, { align: 'center' })
      } catch (e) {
        console.error('[PDF] Error rendering title1:', e)
        doc.text('Naturra', pageWidth / 2, 75, { align: 'center' })
      }

      // Brand name - LIVING with letter spacing
      doc.setFontSize(28)
      setF('normal')
      try {
        const title2Text = t.title2 || 'LIVING'
        const processedTitle2 = processRTLText(title2Text, lang)
        const finalTitle2 = lang === 'ar' ? processedTitle2 : processedTitle2.split('').join('  ')
        doc.text(finalTitle2, pageWidth / 2, 92, { align: 'center' })
      } catch (e) {
        console.error('[PDF] Error rendering title2:', e)
        doc.text('LIVING', pageWidth / 2, 92, { align: 'center' })
      }

      // Decorative separator
      doc.setDrawColor(...colors.goldAccent)
      doc.setLineWidth(0.8)
      doc.line(pageWidth / 2 - 35, 100, pageWidth / 2 + 35, 100)

      // Subtitle
      doc.setFontSize(14)
      doc.setTextColor(...colors.secondaryAccent)
      setF('bold')
      try {
        doc.text(processRTLText(t.subtitle || '', lang), pageWidth / 2, 115, { align: 'center' })
      } catch (e) {
        console.error('[PDF] Error rendering subtitle:', e)
      }

      // Since year badge
      doc.setFillColor(...colors.goldAccent)
      doc.circle(pageWidth / 2, 135, 12, 'F')
      doc.setTextColor(...colors.primaryDark)
      doc.setFontSize(10)
      setF('bold')
      try {
        doc.text(processRTLText(t.since || 'Since 1999', lang), pageWidth / 2, 137, { align: 'center' })
      } catch (e) {
        console.error('[PDF] Error rendering since:', e)
        doc.text('Since 1999', pageWidth / 2, 137, { align: 'center' })
      }

      // Tagline
      doc.setFontSize(11)
      setF('normal')
      doc.setTextColor(...colors.textLight)
      try {
        const taglineText = processRTLText(t.tagline || '', lang)
        const taglineLines = doc.splitTextToSize(taglineText, pageWidth - 60)
        doc.text(taglineLines, pageWidth / 2, 155, { align: 'center' })
      } catch (e) {
        console.error('[PDF] Error rendering tagline:', e)
      }

      // Workshop location
      doc.setFontSize(11)
      setF('bold')
      doc.setTextColor(...colors.secondaryAccent)
      try {
        doc.text(processRTLText(t.workshop || '', lang), pageWidth / 2, 185, { align: 'center' })
      } catch (e) {
        console.error('[PDF] Error rendering workshop:', e)
      }

      doc.setFontSize(9)
      setF('normal')
      try {
        doc.text(processRTLText(t.address || '', lang), pageWidth / 2, 193, { align: 'center' })
      } catch (e) {
        console.error('[PDF] Error rendering address:', e)
      }

      // Contact information - clickable
      doc.setFontSize(11)
      setF('bold')
      doc.setTextColor(...colors.goldAccent)
      doc.textWithLink('+6288801146881', pageWidth / 2, 210, {
        align: 'center',
        url: 'https://wa.me/+6288801146881'
      })
      doc.textWithLink('lifewithNaturra@gmail.com', pageWidth / 2, 220, {
        align: 'center',
        url: 'mailto:lifewithNaturra@gmail.com'
      })

      doc.setTextColor(...colors.textLight)
      setF('normal')
      doc.setFontSize(10)
      doc.textWithLink('www.naturraextal.com', pageWidth / 2, 232, {
        align: 'center',
        url: 'https://naturraextal.com'
      })

      // Bottom decorative line
      doc.setDrawColor(...colors.goldAccent)
      doc.setLineWidth(1)
      doc.line(pageWidth / 2 - 40, 250, pageWidth / 2 + 40, 250)

      // Copyright
      doc.setFontSize(8)
      doc.setTextColor(...colors.textMuted)
      doc.text(t.copyright, pageWidth / 2, 275, { align: 'center' })

      // ══════════════════════════════════════════════════════════════════════════
      // WELCOME PAGE - PROFESSIONAL INTRODUCTION
      // ══════════════════════════════════════════════════════════════════════════
      doc.addPage()
      pageNumber++

      // Page background
      doc.setFillColor(...colors.backgroundLight)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')

      // Elegant header section
      doc.setFillColor(...colors.primaryDark)
      doc.rect(0, 0, pageWidth, 55, 'F')

      // Header decorative top line
      doc.setDrawColor(...colors.goldAccent)
      doc.setLineWidth(0.5)
      doc.line(0, 3, pageWidth, 3)

      doc.setTextColor(...colors.textLight)
      doc.setFontSize(28)
      setF('bold')
      doc.text(processRTLText(t.welcomeTitle, lang), pageWidth / 2, 30, { align: 'center' })

      doc.setFontSize(11)
      setF('italic')
      doc.setTextColor(...colors.secondaryAccent)
      doc.text(processRTLText(t.welcomeSubtitle, lang), pageWidth / 2, 42, { align: 'center' })

      // Content area - optimized to fit on ONE page
      const margin = 22
      let yPos = 68
      const lineHeight = 6

      doc.setTextColor(...colors.textDark)
      doc.setFontSize(10)
      setF('normal')

      // Introduction paragraph
      const introLines = doc.splitTextToSize(processRTLText(t.welcomeIntro, lang), pageWidth - (margin * 2))
      doc.text(introLines, margin, yPos)
      yPos += introLines.length * lineHeight + 4

      // Combine all paragraphs with minimal spacing
      const paragraphs = [
        t.welcomePara1,
        t.welcomePara2,
        t.welcomePara3,
        t.welcomePara4,
        t.welcomePara5
      ]

      paragraphs.forEach((para) => {
        const paraLines = doc.splitTextToSize(processRTLText(para, lang), pageWidth - (margin * 2))
        doc.text(paraLines, margin, yPos)
        yPos += paraLines.length * lineHeight + 4
      })

      // CTA section
      yPos += 3
      doc.setFontSize(11)
      setF('bold')
      doc.setTextColor(...colors.goldAccent)
      const ctaLines = doc.splitTextToSize(processRTLText(t.welcomeCTA, lang), pageWidth - (margin * 2))
      doc.text(ctaLines, margin, yPos)
      yPos += ctaLines.length * 6 + 8

      // Signature
      doc.setFontSize(10)
      setF('italic')
      doc.setTextColor(...colors.textDark)
      doc.text(processRTLText(t.welcomeSignature, lang), margin, yPos)
      yPos += 5
      setF('bold')
      doc.text(processRTLText(t.welcomeTeam, lang), margin, yPos)

      // Page number footer
      doc.setFontSize(8)
      doc.setTextColor(...colors.textMuted)
      doc.text(`${pageNumber}`, pageWidth / 2, 287, { align: 'center' })

      // ══════════════════════════════════════════════════════════════════════════
      // WHY CHOOSE US PAGE - ALL 6 REASONS ON ONE PAGE
      // ══════════════════════════════════════════════════════════════════════════
      doc.addPage()
      pageNumber++

      doc.setFillColor(...colors.backgroundLight)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')

      // Elegant header - more compact
      doc.setFillColor(...colors.primaryDark)
      doc.rect(0, 0, pageWidth, 45, 'F')

      doc.setTextColor(...colors.textLight)
      doc.setFontSize(24)
      setF('bold')
      doc.text(processRTLText(t.whyChooseTitle, lang), pageWidth / 2, 23, { align: 'center' })

      doc.setFontSize(10)
      setF('italic')
      doc.setTextColor(...colors.secondaryAccent)
      doc.text(processRTLText(t.whyChooseSubtitle, lang), pageWidth / 2, 35, { align: 'center' })

      // All 6 reasons with optimized spacing
      yPos = 55
      const allReasons = [
        { title: t.reason1Title, desc: t.reason1Desc },
        { title: t.reason2Title, desc: t.reason2Desc },
        { title: t.reason3Title, desc: t.reason3Desc },
        { title: t.reason4Title, desc: t.reason4Desc },
        { title: t.reason5Title, desc: t.reason5Desc },
        { title: t.reason6Title, desc: t.reason6Desc },
      ]

      allReasons.forEach((reason, index) => {
        // Reason title with number - more compact
        doc.setFontSize(11)
        setF('bold')
        doc.setTextColor(...colors.goldAccent)
        doc.text(processRTLText(reason.title, lang), margin, yPos)
        yPos += 6

        // Reason description - smaller font and spacing
        doc.setFontSize(9)
        setF('normal')
        doc.setTextColor(...colors.textDark)
        const descLines = doc.splitTextToSize(processRTLText(reason.desc, lang), pageWidth - (margin * 2))
        doc.text(descLines, margin, yPos)
        yPos += descLines.length * 5 + 6

        // Decorative separator - thinner
        if (index < allReasons.length - 1) {
          doc.setDrawColor(...colors.lineAccent)
          doc.setLineWidth(0.2)
          doc.line(margin, yPos - 3, pageWidth - margin, yPos - 3)
        }
      })

      // Page number
      doc.setFontSize(8)
      doc.setTextColor(...colors.textMuted)
      doc.text(`${pageNumber}`, pageWidth / 2, 287, { align: 'center' })

      // ══════════════════════════════════════════════════════════════════════════
      // MATERIAL EXCELLENCE PAGE
      // ══════════════════════════════════════════════════════════════════════════
      doc.addPage()
      pageNumber++

      doc.setFillColor(...colors.backgroundLight)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')

      // Elegant header
      doc.setFillColor(...colors.primaryDark)
      doc.rect(0, 0, pageWidth, 45, 'F')

      doc.setTextColor(...colors.textLight)
      doc.setFontSize(24)
      setF('bold')
      doc.text(processRTLText(t.materialTitle, lang), pageWidth / 2, 22, { align: 'center' })

      doc.setFontSize(10)
      setF('italic')
      doc.setTextColor(...colors.secondaryAccent)
      doc.text(processRTLText(t.materialSubtitle, lang), pageWidth / 2, 34, { align: 'center' })

      // Materials section
      yPos = 60
      const materials = [
        { title: t.material1Title, desc: t.material1Desc },
        { title: t.material2Title, desc: t.material2Desc },
        { title: t.material3Title, desc: t.material3Desc },
        { title: t.material4Title, desc: t.material4Desc },
      ]

      materials.forEach((material, index) => {
        // Check if we need a new page
        if (yPos > 235) {
          doc.addPage()
          pageNumber++
          doc.setFillColor(...colors.backgroundLight)
          doc.rect(0, 0, pageWidth, pageHeight, 'F')
          yPos = 30
        }

        // Material badge number
        doc.setFillColor(...colors.goldAccent)
        doc.circle(margin + 5, yPos - 2, 5, 'F')
        doc.setFontSize(10)
        setF('bold')
        doc.setTextColor(...colors.primaryDark)
        doc.text(`${index + 1}`, margin + 5, yPos, { align: 'center' })

        // Material title
        doc.setFontSize(12)
        setF('bold')
        doc.setTextColor(...colors.goldAccent)
        doc.text(processRTLText(material.title, lang), margin + 13, yPos)
        yPos += 8

        // Material description
        doc.setFontSize(9.5)
        setF('normal')
        doc.setTextColor(...colors.textDark)
        const descLines = doc.splitTextToSize(processRTLText(material.desc, lang), pageWidth - (margin * 2))
        doc.text(descLines, margin, yPos)
        yPos += descLines.length * 6 + 10

        // Decorative separator
        if (index < materials.length - 1) {
          doc.setDrawColor(...colors.lineAccent)
          doc.setLineWidth(0.3)
          doc.line(margin, yPos - 5, pageWidth - margin, yPos - 5)
        }
      })

      // Page number
      doc.setFontSize(8)
      doc.setTextColor(...colors.textMuted)
      doc.text(`${pageNumber}`, pageWidth / 2, 287, { align: 'center' })

      // ══════════════════════════════════════════════════════════════════════════
      // PRODUCT CATALOG PAGES
      // ══════════════════════════════════════════════════════════════════════════

      // Group products by category
      const productsByCategory: { [key: string]: Product[] } = {}
      ALL_PRODUCTS.forEach((product: Product) => {
        const mainCategory = product.categories[0]
        if (!productsByCategory[mainCategory]) {
          productsByCategory[mainCategory] = []
        }
        productsByCategory[mainCategory].push(product)
      })

      // Generate product pages
      for (const category of Object.keys(productsByCategory)) {
        const products = productsByCategory[category]

        doc.addPage()
        pageNumber++

        // Category header page
        doc.setFillColor(...colors.backgroundLight)
        doc.rect(0, 0, pageWidth, pageHeight, 'F')

        doc.setFillColor(...colors.primaryDark)
        doc.rect(0, 0, pageWidth, 50, 'F')

        // Category number badge
        const categoryIndex = Object.keys(productsByCategory).indexOf(category) + 1
        doc.setFillColor(...colors.goldAccent)
        doc.circle(30, 25, 8, 'F')
        doc.setFontSize(12)
        setF('bold')
        doc.setTextColor(...colors.primaryDark)
        doc.text(`${categoryIndex}`, 30, 27, { align: 'center' })

        doc.setTextColor(...colors.textLight)
        doc.setFontSize(24)
        setF('bold')
        doc.text(processRTLText(category, lang), 45, 28)

        doc.setFontSize(9)
        setF('normal')
        doc.setTextColor(...colors.secondaryAccent)
        doc.text(processRTLText(`${products.length} ${t.productsAvailable}`, lang), 45, 38)

        // Product grid
        yPos = 65
        let xPos = margin
        let itemsInRow = 0
        const itemWidth = 85
        const itemHeight = 105
        const itemsPerRow = 2

        for (const product of products) {
          try {
            // Load product image
            const imgData = await loadImageAsBase64(product.image)
            const imgWidth = 75
            const imgHeight = 56

            // Product card background
            doc.setFillColor(255, 255, 255)
            doc.roundedRect(xPos, yPos, imgWidth + 4, itemHeight, 3, 3, 'F')

            // Drop shadow effect
            doc.setFillColor(230, 230, 230)
            doc.roundedRect(xPos + 1, yPos + 1, imgWidth + 4, itemHeight, 3, 3, 'F')
            doc.setFillColor(255, 255, 255)
            doc.roundedRect(xPos, yPos, imgWidth + 4, itemHeight, 3, 3, 'F')

            // Product image
            doc.addImage(imgData, 'JPEG', xPos + 2, yPos + 2, imgWidth, imgHeight)

            // Product name - clickable
            doc.setFontSize(10)
            setF('bold')
            doc.setTextColor(...colors.textDark)

            const productName = product.name.length > 28 ? product.name.substring(0, 25) + '...' : product.name
            const productUrl = `https://naturraextal.com/product/${product.slug}`

            const nameLines = doc.splitTextToSize(productName, imgWidth)
            const nameYPos = yPos + imgHeight + 8
            doc.textWithLink(nameLines[0], xPos + 2, nameYPos, { url: productUrl })
            if (nameLines.length > 1) {
              doc.textWithLink(nameLines[1], xPos + 2, nameYPos + 5, { url: productUrl })
            }

            // Price with proper currency
            const formattedPrice = formatPrice(product.price, t.currency as 'IDR' | 'USD')
            doc.setFontSize(13)
            setF('bold')
            doc.setTextColor(...colors.goldAccent)
            doc.text(formattedPrice, xPos + 2, yPos + imgHeight + 22)

            // "View online" link
            doc.setFontSize(7)
            setF('normal')
            doc.setTextColor(...colors.primaryAccent)
            doc.textWithLink(processRTLText(t.viewOnline, lang), xPos + 2, yPos + imgHeight + 28, { url: productUrl })

            // Categories tags
            doc.setFontSize(8)
            setF('normal')
            doc.setTextColor(...colors.textMuted)
            const cats = product.categories.slice(0, 2).join(' • ')
            const catsText = cats.length > 30 ? cats.substring(0, 27) + '...' : cats
            const catsLines = doc.splitTextToSize(catsText, imgWidth)
            doc.text(catsLines[0], xPos + 2, yPos + imgHeight + 35)

            itemsInRow++

            // Move to next position
            if (itemsInRow >= itemsPerRow) {
              yPos += itemHeight + 10
              xPos = margin
              itemsInRow = 0

              // Check if we need new page
              if (yPos > 220) {
                // Page number
                doc.setFontSize(8)
                doc.setTextColor(...colors.textMuted)
                doc.text(`${pageNumber}`, pageWidth / 2, 287, { align: 'center' })

                doc.addPage()
                pageNumber++

                doc.setFillColor(...colors.backgroundLight)
                doc.rect(0, 0, pageWidth, pageHeight, 'F')

                // Repeat category header (smaller)
                doc.setFillColor(...colors.primaryDark)
                doc.rect(0, 0, pageWidth, 35, 'F')
                doc.setTextColor(...colors.textLight)
                doc.setFontSize(18)
                setF('bold')
                doc.text(category + ' ' + t.continued, pageWidth / 2, 22, { align: 'center' })

                yPos = 50
              }
            } else {
              xPos += itemWidth + 8
            }
          } catch (error) {
            console.error(`Failed to load image for ${product.name}:`, error)
          }
        }

        // Page number
        doc.setFontSize(8)
        doc.setTextColor(...colors.textMuted)
        doc.text(`${pageNumber}`, pageWidth / 2, 287, { align: 'center' })
      }

      // ══════════════════════════════════════════════════════════════════════════
      // PRICING GUIDE PAGE
      // ══════════════════════════════════════════════════════════════════════════
      doc.addPage()
      pageNumber++

      doc.setFillColor(...colors.backgroundLight)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')

      // Header
      doc.setFillColor(...colors.primaryDark)
      doc.rect(0, 0, pageWidth, 45, 'F')

      doc.setTextColor(...colors.textLight)
      doc.setFontSize(24)
      setF('bold')
      doc.text(processRTLText(t.pricingTitle, lang), pageWidth / 2, 22, { align: 'center' })

      doc.setFontSize(10)
      setF('italic')
      doc.setTextColor(...colors.secondaryAccent)
      doc.text(processRTLText(t.pricingSubtitle, lang), pageWidth / 2, 34, { align: 'center' })

      // Pricing notes
      yPos = 60
      const pricingNotes = [
        t.pricingNote1,
        t.pricingNote2,
        t.pricingNote3,
        t.pricingNote4,
        t.pricingNote5,
        t.pricingNote6
      ]

      pricingNotes.forEach((note) => {
        doc.setFontSize(9.5)
        setF('normal')
        doc.setTextColor(...colors.textDark)
        const noteLines = doc.splitTextToSize(processRTLText(note, lang), pageWidth - (margin * 2))
        doc.text(noteLines, margin, yPos)
        yPos += noteLines.length * 6 + 5
      })

      // Page number
      doc.setFontSize(8)
      doc.setTextColor(...colors.textMuted)
      doc.text(`${pageNumber}`, pageWidth / 2, 287, { align: 'center' })

      // ══════════════════════════════════════════════════════════════════════════
      // CONTACT PAGE - FINAL PAGE
      // ══════════════════════════════════════════════════════════════════════════
      doc.addPage()
      pageNumber++

      doc.setFillColor(...colors.primaryDark)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')

      // Elegant border frame
      doc.setDrawColor(...colors.goldAccent)
      doc.setLineWidth(0.5)
      doc.rect(15, 15, pageWidth - 30, pageHeight - 30, 'S')
      doc.setLineWidth(0.2)
      doc.rect(18, 18, pageWidth - 36, pageHeight - 36, 'S')

      // Top decorative line
      doc.setDrawColor(...colors.goldAccent)
      doc.setLineWidth(1)
      doc.line(pageWidth / 2 - 40, 40, pageWidth / 2 + 40, 40)

      doc.setTextColor(...colors.textLight)
      doc.setFontSize(32)
      setF('bold')
      doc.text(processRTLText(t.contactTitle, lang), pageWidth / 2, 55, { align: 'center' })

      // Decorative separator
      doc.setDrawColor(...colors.goldAccent)
      doc.setLineWidth(0.8)
      doc.line(pageWidth / 2 - 35, 63, pageWidth / 2 + 35, 63)

      doc.setFontSize(11)
      setF('italic')
      doc.setTextColor(...colors.secondaryAccent)
      doc.text(processRTLText(t.contactSubtitle, lang), pageWidth / 2, 73, { align: 'center' })

      yPos = 90

      // WhatsApp
      doc.setFontSize(13)
      setF('bold')
      doc.setTextColor(...colors.goldAccent)
      doc.text(processRTLText(t.whatsappTitle, lang), pageWidth / 2, yPos, { align: 'center' })
      yPos += 10

      doc.setFontSize(16)
      setF('bold')
      doc.setTextColor(...colors.textLight)
      doc.textWithLink(processRTLText(t.whatsappNumber, lang), pageWidth / 2, yPos, {
        align: 'center',
        url: 'https://wa.me/+6288801146881'
      })
      yPos += 8

      doc.setFontSize(9)
      setF('normal')
      doc.setTextColor(...colors.secondaryAccent)
      doc.text(processRTLText(t.whatsappHours, lang), pageWidth / 2, yPos, { align: 'center' })
      yPos += 5
      doc.text(processRTLText(t.whatsappResponse, lang), pageWidth / 2, yPos, { align: 'center' })
      yPos += 15

      // Email
      doc.setFontSize(13)
      setF('bold')
      doc.setTextColor(...colors.goldAccent)
      doc.text(processRTLText(t.emailTitle, lang), pageWidth / 2, yPos, { align: 'center' })
      yPos += 10

      doc.setFontSize(13)
      setF('bold')
      doc.setTextColor(...colors.textLight)
      doc.textWithLink(processRTLText(t.emailGeneral, lang), pageWidth / 2, yPos, {
        align: 'center',
        url: 'mailto:lifewithNaturra@gmail.com'
      })
      yPos += 7
      doc.textWithLink(processRTLText(t.emailSales, lang), pageWidth / 2, yPos, {
        align: 'center',
        url: 'mailto:lifewithNaturra@gmail.com'
      })
      yPos += 8

      doc.setFontSize(9)
      setF('normal')
      doc.setTextColor(...colors.secondaryAccent)
      doc.text(processRTLText(t.emailNote, lang), pageWidth / 2, yPos, { align: 'center' })
      yPos += 15

      // Address - clickable
      doc.setFontSize(13)
      setF('bold')
      doc.setTextColor(...colors.goldAccent)
      doc.text(processRTLText(t.addressTitle, lang), pageWidth / 2, yPos, { align: 'center' })
      yPos += 10

      doc.setFontSize(11)
      setF('bold')
      doc.setTextColor(...colors.textLight)
      doc.textWithLink(processRTLText(t.addressFull1, lang), pageWidth / 2, yPos, {
        align: 'center',
        url: 'https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9'
      })
      yPos += 6

      setF('normal')
      doc.textWithLink(processRTLText(t.addressFull2, lang), pageWidth / 2, yPos, {
        align: 'center',
        url: 'https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9'
      })
      yPos += 6
      doc.textWithLink(processRTLText(t.addressFull3, lang), pageWidth / 2, yPos, {
        align: 'center',
        url: 'https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9'
      })
      yPos += 6
      doc.textWithLink(processRTLText(t.addressFull4, lang), pageWidth / 2, yPos, {
        align: 'center',
        url: 'https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9'
      })
      yPos += 8

      doc.setFontSize(9)
      setF('italic')
      doc.setTextColor(...colors.secondaryAccent)
      doc.text(processRTLText(t.addressNote, lang), pageWidth / 2, yPos, { align: 'center' })
      yPos += 15

      // Website
      doc.setFontSize(15)
      setF('bold')
      doc.setTextColor(...colors.goldAccent)
      doc.textWithLink(processRTLText(t.website, lang), pageWidth / 2, yPos, {
        align: 'center',
        url: 'https://naturraextal.com'
      })
      yPos += 15

      // Bottom decorative line
      doc.setDrawColor(...colors.goldAccent)
      doc.setLineWidth(1)
      doc.line(pageWidth / 2 - 40, yPos, pageWidth / 2 + 40, yPos)
      yPos += 10

      // Workshop info
      doc.setFontSize(9)
      setF('normal')
      doc.setTextColor(...colors.textLight)
      doc.text(processRTLText(t.workshopSize, lang), pageWidth / 2, yPos, { align: 'center' })
      yPos += 5
      doc.text(processRTLText(t.projectDone, lang), pageWidth / 2, yPos, { align: 'center' })
      yPos += 5
      doc.text(processRTLText(t.exportExp, lang), pageWidth / 2, yPos, { align: 'center' })

      // Copyright
      doc.setFontSize(8)
      doc.setTextColor(...colors.textMuted)
      doc.text(processRTLText(t.copyright, lang), pageWidth / 2, 280, { align: 'center' })

      // Save PDF with language-specific filename
      const fileNames = {
        id: 'Katalog-Naturra-Living-2025.pdf',
        en: 'Naturra-Living-Catalog-2025.pdf',
        ar: 'Naturra-Living-Catalog-2025-AR.pdf',
        zh: 'Naturra-Living-Catalog-2025-ZH.pdf',
        ja: 'Naturra-Living-Catalog-2025-JA.pdf',
        es: 'Naturra-Living-Catalog-2025-ES.pdf',
        fr: 'Naturra-Living-Catalog-2025-FR.pdf',
        ko: 'Naturra-Living-Catalog-2025-KO.pdf'
      }
      const fileName = fileNames[lang] || 'Naturra-Living-Catalog-2025.pdf'
      console.log(`[PDF] Saving PDF as: ${fileName}`)
      console.log(`[PDF] Total pages: ${doc.getNumberOfPages()}`)
      console.log(`[PDF] Language: ${lang}, Content keys count: ${Object.keys(t).length}`)

      try {
        doc.save(fileName)
        console.log(`[PDF] Catalog saved successfully as ${fileName}`)
        console.log('[PDF] Catalog generation completed successfully!')
      } catch (saveError) {
        console.error('[PDF] Error saving PDF:', saveError)
        throw new Error(`Failed to save PDF: ${saveError instanceof Error ? saveError.message : String(saveError)}`)
      }

    } catch (error) {
      console.error('[PDF] Error generating catalog:', error)
      console.error('[PDF] Error details:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        name: error instanceof Error ? error.name : undefined
      })

      // Re-throw error so UI can handle it
      throw error
    }
  })()

  // Timeout wrapper to prevent infinite loading
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      console.error(`[PDF] Generation timeout after ${MAX_GENERATION_TIME / 1000} seconds`)
      reject(new Error(`Catalog generation timeout after ${MAX_GENERATION_TIME / 1000} seconds. Please try again or check your internet connection.`))
    }, MAX_GENERATION_TIME)
  })

  try {
    console.log('[PDF] Starting generation with timeout protection...')
    const result = await Promise.race([generationPromise, timeoutPromise])
    console.log('[PDF] Generation completed successfully')
    return result
  } catch (error) {
    console.error('[PDF] Catalog generation failed or timed out:', error)
    console.error('[PDF] Final error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    })
    throw error
  }
}
