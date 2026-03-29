// ══════════════════════════════════════════════════════════════════════════════
// Naturra Extal PREMIUM CATALOG GENERATOR 2025
// World-Class Agricultural Commodities Catalog with Elegant Typography
// ══════════════════════════════════════════════════════════════════════════════

let jsPDF: any = null
let ALL_PRODUCTS: any = null

import type { Product } from '../data/products'
// import { content } from './catalogTranslations'

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

  let result = ''
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i)
    if (!ARABIC_FORMS[code]) {
      result += text[i]
      continue
    }

    const prev = i > 0 ? text.charCodeAt(i - 1) : 0
    const next = i < text.length - 1 ? text.charCodeAt(i + 1) : 0

    if (isLigature(code, next)) {
      const connected = connectsRight(prev)
      result += String.fromCharCode(getLigature(code, next, connected))
      i++
      continue
    }

    const right = connectsRight(prev)
    const left = connectsLeft(next)

    let formIndex = 0
    if (right && left) formIndex = 2 // Medial
    else if (right) formIndex = 1 // Final
    else if (left) formIndex = 3 // Initial
    else formIndex = 0 // Isolated

    result += String.fromCharCode(ARABIC_FORMS[code][formIndex])
  }
  return result
}

const processRTLText = (text: string, lang: string): string => {
  if (!text) return ''
  if (lang !== 'ar') return text
  const reshaped = reshapeArabic(text)
  return reshaped.split('').reverse().join('')
}

const prepareLanguageFont = async (doc: any, lang: string): Promise<{ family: string; hasStyles: boolean }> => {
  const needsUnicode = ['ar', 'zh', 'ja', 'ko'].includes(lang)
  if (!needsUnicode) return { family: 'helvetica', hasStyles: true }

  try {
    const fontNameMap: Record<string, string> = {
      ar: 'Amiri-Regular',
      zh: 'NotoSansSC-Regular',
      ja: 'NotoSansJP-Regular',
      ko: 'NotoSansKR-Regular'
    }
    const fontName = fontNameMap[lang]
    if (!fontName) return { family: 'helvetica', hasStyles: true }

    const fontPath = `/fonts/${fontName}.ttf`
    const response = await fetch(fontPath)
    if (!response.ok) throw new Error('Font file not found')

    const fontBlob = await response.blob()
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const base64Font = (reader.result as string).split(',')[1]
        doc.addFileToVFS(`${fontName}.ttf`, base64Font)
        doc.addFont(`${fontName}.ttf`, fontName, 'normal')
        resolve({ family: fontName, hasStyles: false })
      }
      reader.onerror = () => reject(new Error('Failed to read font blob'))
      reader.readAsDataURL(fontBlob)
    })
  } catch (error) {
    console.warn(`[PDF] Could not load custom font for ${lang}, using fallback:`, error)
    return { family: 'helvetica', hasStyles: true }
  }
}

const getLanguagePreference = (): string => {
  try {
    const saved = localStorage.getItem('naturra_preferred_language')
    if (saved) return saved
  } catch (error) {
    console.log('Failed to read language preference')
  }
  return 'id'
}

// ══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════════

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

const formatPrice = (price: string, currency: 'IDR' | 'USD'): string => {
  const numericMatch = price.match(/[\d.,]+/)
  if (!numericMatch) return price
  const numericValue = parseFloat(numericMatch[0].replace(/[.,]/g, ''))
  if (currency === 'USD') {
    const usdValue = Math.round(numericValue / 16000)
    return `$${usdValue}`
  } else {
    const formatted = numericValue.toLocaleString('id-ID')
    return `Rp ${formatted}`
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// MODULAR PAGE DRAWING FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════════

interface DrawOptions {
  doc: any;
  t: any;
  lang: string;
  colors: any;
  pageWidth: number;
  pageHeight: number;
  setF: (style?: 'normal' | 'bold' | 'italic' | 'bolditalic') => void;
  margin: number;
}

const drawCoverPage = (opt: DrawOptions) => {
  const { doc, t, lang, colors, pageWidth, pageHeight, setF } = opt
  doc.setFillColor(...colors.primaryDark)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  doc.setDrawColor(...colors.primaryAccent)
  doc.setLineWidth(0.5)
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30, 'S')
  doc.setLineWidth(0.3)
  doc.rect(18, 18, pageWidth - 36, pageHeight - 36, 'S')

  doc.setDrawColor(...colors.goldAccent)
  doc.setLineWidth(1)
  doc.line(pageWidth / 2 - 40, 45, pageWidth / 2 + 40, 45)

  doc.setTextColor(...colors.textLight)
  doc.setFontSize(60)
  setF('bold')
  doc.text(processRTLText(t.title1 || 'Naturra', lang), pageWidth / 2, 75, { align: 'center' })

  doc.setFontSize(28)
  setF('normal')
  const title2Text = t.title2 || 'EXTAL'
  const processedTitle2 = processRTLText(title2Text, lang)
  const finalTitle2 = lang === 'ar' ? processedTitle2 : processedTitle2.split('').join('  ')
  doc.text(finalTitle2, pageWidth / 2, 92, { align: 'center' })

  doc.setDrawColor(...colors.goldAccent)
  doc.setLineWidth(0.8)
  doc.line(pageWidth / 2 - 35, 100, pageWidth / 2 + 35, 100)

  doc.setFontSize(14)
  doc.setTextColor(...colors.secondaryAccent)
  setF('bold')
  doc.text(processRTLText(t.subtitle || '', lang), pageWidth / 2, 115, { align: 'center' })

  doc.setFillColor(...colors.goldAccent)
  doc.circle(pageWidth / 2, 135, 12, 'F')
  doc.setTextColor(...colors.primaryDark)
  doc.setFontSize(10)
  setF('bold')
  doc.text(processRTLText(t.since || 'Since 1999', lang), pageWidth / 2, 137, { align: 'center' })

  doc.setFontSize(11)
  setF('normal')
  doc.setTextColor(...colors.textLight)
  const taglineText = processRTLText(t.tagline || '', lang)
  const taglineLines = doc.splitTextToSize(taglineText, pageWidth - 60)
  doc.text(taglineLines, pageWidth / 2, 155, { align: 'center' })

  doc.setFontSize(11)
  setF('bold')
  doc.setTextColor(...colors.secondaryAccent)
  doc.text(processRTLText(t.workshop || '', lang), pageWidth / 2, 185, { align: 'center' })

  doc.setFontSize(9)
  setF('normal')
  doc.text(processRTLText(t.address || '', lang), pageWidth / 2, 193, { align: 'center' })

  doc.setFontSize(11)
  setF('bold')
  doc.setTextColor(...colors.goldAccent)
  doc.textWithLink('+6289513957752', pageWidth / 2, 210, { align: 'center', url: 'https://wa.me/+6289513957752' })
  doc.textWithLink('hello@naturraextal.com', pageWidth / 2, 220, { align: 'center', url: 'mailto:hello@naturraextal.com' })

  doc.setTextColor(...colors.textLight)
  setF('normal')
  doc.setFontSize(10)
  doc.textWithLink('www.naturraextal.com', pageWidth / 2, 232, { align: 'center', url: 'https://naturraextal.com' })

  doc.setDrawColor(...colors.goldAccent)
  doc.setLineWidth(1)
  doc.line(pageWidth / 2 - 40, 250, pageWidth / 2 + 40, 250)

  doc.setFontSize(8)
  doc.setTextColor(...colors.textMuted)
  doc.text(t.copyright || '', pageWidth / 2, 275, { align: 'center' })
}

const drawWelcomePage = (opt: DrawOptions, pageNumber: number) => {
  const { doc, t, lang, colors, pageWidth, pageHeight, setF, margin } = opt
  doc.addPage()
  doc.setFillColor(...colors.backgroundLight)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
  doc.setFillColor(...colors.primaryDark)
  doc.rect(0, 0, pageWidth, 55, 'F')
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

  let yPos = 68
  doc.setTextColor(...colors.textDark)
  doc.setFontSize(10)
  setF('normal')

  const introLines = doc.splitTextToSize(processRTLText(t.welcomeIntro, lang), pageWidth - (margin * 2))
  doc.text(introLines, margin, yPos)
  yPos += introLines.length * 6 + 4

  const paragraphs = [t.welcomePara1, t.welcomePara2, t.welcomePara3, t.welcomePara4, t.welcomePara5]
  paragraphs.forEach((para) => {
    if (!para) return
    const paraLines = doc.splitTextToSize(processRTLText(para, lang), pageWidth - (margin * 2))
    doc.text(paraLines, margin, yPos)
    yPos += paraLines.length * 6 + 4
  })

  yPos += 3
  doc.setFontSize(11)
  setF('bold')
  doc.setTextColor(...colors.goldAccent)
  const ctaLines = doc.splitTextToSize(processRTLText(t.welcomeCTA, lang), pageWidth - (margin * 2))
  doc.text(ctaLines, margin, yPos)
  yPos += ctaLines.length * 6 + 8

  doc.setFontSize(10)
  setF('italic')
  doc.setTextColor(...colors.textDark)
  doc.text(processRTLText(t.welcomeSignature, lang), margin, yPos)
  yPos += 5
  setF('bold')
  doc.text(processRTLText(t.welcomeTeam, lang), margin, yPos)

  doc.setFontSize(8)
  doc.setTextColor(...colors.textMuted)
  doc.text(`${pageNumber}`, pageWidth / 2, 287, { align: 'center' })
}

const drawWhyChooseTitle = (opt: DrawOptions, pageNumber: number) => {
  const { doc, t, lang, colors, pageWidth, pageHeight, setF, margin } = opt
  doc.addPage()
  doc.setFillColor(...colors.backgroundLight)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
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

  let yPos = 55
  const reasons = [
    { title: t.reason1Title, desc: t.reason1Desc },
    { title: t.reason2Title, desc: t.reason2Desc },
    { title: t.reason3Title, desc: t.reason3Desc },
    { title: t.reason4Title, desc: t.reason4Desc },
    { title: t.reason5Title, desc: t.reason5Desc },
    { title: t.reason6Title, desc: t.reason6Desc }
  ]

  reasons.forEach((reason, index) => {
    if (!reason.title) return
    doc.setFontSize(11)
    setF('bold')
    doc.setTextColor(...colors.goldAccent)
    doc.text(processRTLText(reason.title, lang), margin, yPos)
    yPos += 6
    doc.setFontSize(9)
    setF('normal')
    doc.setTextColor(...colors.textDark)
    const descLines = doc.splitTextToSize(processRTLText(reason.desc, lang), pageWidth - (margin * 2))
    doc.text(descLines, margin, yPos)
    yPos += descLines.length * 5 + 6
    if (index < reasons.length - 1) {
      doc.setDrawColor(...colors.lineAccent)
      doc.setLineWidth(0.2)
      doc.line(margin, yPos - 3, pageWidth - margin, yPos - 3)
    }
  })

  doc.setFontSize(8)
  doc.setTextColor(...colors.textMuted)
  doc.text(`${pageNumber}`, pageWidth / 2, 287, { align: 'center' })
}

const drawMaterialExcellence = (opt: DrawOptions, pageNumber: { current: number }) => {
  const { doc, t, lang, colors, pageWidth, pageHeight, setF, margin } = opt
  doc.addPage()
  pageNumber.current++
  doc.setFillColor(...colors.backgroundLight)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
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

  let yPos = 60
  const materials = [
    { title: t.material1Title, desc: t.material1Desc },
    { title: t.material2Title, desc: t.material2Desc },
    { title: t.material3Title, desc: t.material3Desc },
    { title: t.material4Title, desc: t.material4Desc }
  ]

  materials.forEach((material, index) => {
    if (!material.title) return
    if (yPos > 235) {
      doc.addPage()
      pageNumber.current++
      doc.setFillColor(...colors.backgroundLight)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')
      yPos = 30
    }
    doc.setFillColor(...colors.goldAccent)
    doc.circle(margin + 5, yPos - 2, 5, 'F')
    doc.setFontSize(10)
    setF('bold')
    doc.setTextColor(...colors.primaryDark)
    doc.text(`${index + 1}`, margin + 5, yPos, { align: 'center' })
    doc.setFontSize(12)
    setF('bold')
    doc.setTextColor(...colors.goldAccent)
    doc.text(processRTLText(material.title, lang), margin + 13, yPos)
    yPos += 8
    doc.setFontSize(9.5)
    setF('normal')
    doc.setTextColor(...colors.textDark)
    const descLines = doc.splitTextToSize(processRTLText(material.desc, lang), pageWidth - (margin * 2))
    doc.text(descLines, margin, yPos)
    yPos += descLines.length * 6 + 10
    if (index < materials.length - 1) {
      doc.setDrawColor(...colors.lineAccent)
      doc.setLineWidth(0.3)
      doc.line(margin, yPos - 5, pageWidth - margin, yPos - 5)
    }
  })
  doc.setFontSize(8)
  doc.setTextColor(...colors.textMuted)
  doc.text(`${pageNumber.current}`, pageWidth / 2, 287, { align: 'center' })
}

const drawProductPages = async (opt: DrawOptions, pageNumber: { current: number }) => {
  const { doc, t, lang, colors, pageWidth, pageHeight, setF, margin } = opt
  const productsByCategory: { [key: string]: Product[] } = {}
  ALL_PRODUCTS.forEach((product: Product) => {
    const mainCategory = product.categories[0]
    if (!productsByCategory[mainCategory]) productsByCategory[mainCategory] = []
    productsByCategory[mainCategory].push(product)
  })

  for (const category of Object.keys(productsByCategory)) {
    const products = productsByCategory[category]
    doc.addPage()
    pageNumber.current++
    doc.setFillColor(...colors.backgroundLight)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
    doc.setFillColor(...colors.primaryDark)
    doc.rect(0, 0, pageWidth, 50, 'F')

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

    let yPos = 65
    let xPos = margin
    let itemsInRow = 0
    const itemWidth = 85
    const itemHeight = 105
    const itemsPerRow = 2

    for (const product of products) {
      try {
        const imgData = await loadImageAsBase64(product.image)
        const imgWidth = 75
        const imgHeight = 56
        doc.setFillColor(255, 255, 255)
        doc.rect(xPos, yPos, imgWidth + 4, itemHeight, 'F')
        doc.setFillColor(230, 230, 230)
        doc.rect(xPos + 1, yPos + 1, imgWidth + 4, itemHeight, 'F')
        doc.setFillColor(255, 255, 255)
        doc.rect(xPos, yPos, imgWidth + 4, itemHeight, 'F')
        doc.addImage(imgData, 'JPEG', xPos + 2, yPos + 2, imgWidth, imgHeight)
        doc.setFontSize(10)
        setF('bold')
        doc.setTextColor(...colors.textDark)
        const productName = product.name.length > 28 ? product.name.substring(0, 25) + '...' : product.name
        const productUrl = `https://naturraextal.com/product/${product.slug}`
        const nameLines = doc.splitTextToSize(productName, imgWidth)
        const nameYPos = yPos + imgHeight + 8
        doc.textWithLink(nameLines[0], xPos + 2, nameYPos, { url: productUrl })
        if (nameLines.length > 1) doc.textWithLink(nameLines[1], xPos + 2, nameYPos + 5, { url: productUrl })
        const formattedPrice = formatPrice(product.price, t.currency as 'IDR' | 'USD')
        doc.setFontSize(13)
        setF('bold')
        doc.setTextColor(...colors.goldAccent)
        doc.text(formattedPrice, xPos + 2, yPos + imgHeight + 22)
        doc.setFontSize(7)
        setF('normal')
        doc.setTextColor(...colors.primaryAccent)
        doc.textWithLink(processRTLText(t.viewOnline, lang), xPos + 2, yPos + imgHeight + 28, { url: productUrl })
        doc.setFontSize(8)
        setF('normal')
        doc.setTextColor(...colors.textMuted)
        const cats = product.categories.slice(0, 2).join(' • ')
        const catsLines = doc.splitTextToSize(cats.length > 30 ? cats.substring(0, 27) + '...' : cats, imgWidth)
        doc.text(catsLines[0], xPos + 2, yPos + imgHeight + 35)

        itemsInRow++
        if (itemsInRow >= itemsPerRow) {
          yPos += itemHeight + 10
          xPos = margin
          itemsInRow = 0
          if (yPos > 220) {
            doc.setFontSize(8)
            doc.setTextColor(...colors.textMuted)
            doc.text(`${pageNumber.current}`, pageWidth / 2, 287, { align: 'center' })
            doc.addPage()
            pageNumber.current++
            doc.setFillColor(...colors.backgroundLight)
            doc.rect(0, 0, pageWidth, pageHeight, 'F')
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
      } catch (e) { console.error(e) }
    }
    doc.setFontSize(8)
    doc.setTextColor(...colors.textMuted)
    doc.text(`${pageNumber.current}`, pageWidth / 2, 287, { align: 'center' })
  }
}

const drawPricingAndLogistics = (opt: DrawOptions, pageNumber: number) => {
  const { doc, t, lang, colors, pageWidth, pageHeight, setF, margin } = opt
  doc.addPage()
  doc.setFillColor(...colors.backgroundLight)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
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

  let yPos = 60
  const notes = [t.pricingNote1, t.pricingNote2, t.pricingNote3, t.pricingNote4, t.pricingNote5, t.pricingNote6]
  notes.forEach((note) => {
    if (!note) return
    doc.setFontSize(9.5)
    setF('normal')
    doc.setTextColor(...colors.textDark)
    const lines = doc.splitTextToSize(processRTLText(note, lang), pageWidth - (margin * 2))
    doc.text(lines, margin, yPos)
    yPos += lines.length * 6 + 5
  })
  doc.setFontSize(8)
  doc.setTextColor(...colors.textMuted)
  doc.text(`${pageNumber}`, pageWidth / 2, 287, { align: 'center' })
}

const drawContactPage = (opt: DrawOptions, pageNumber: number) => {
  const { doc, t, lang, colors, pageWidth, pageHeight, setF } = opt
  doc.addPage()
  doc.setFillColor(...colors.primaryDark)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')
  doc.setDrawColor(...colors.goldAccent)
  doc.setLineWidth(0.5)
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30, 'S')
  doc.setLineWidth(0.2)
  doc.rect(18, 18, pageWidth - 36, pageHeight - 36, 'S')
  doc.setDrawColor(...colors.goldAccent)
  doc.setLineWidth(1)
  doc.line(pageWidth / 2 - 40, 40, pageWidth / 2 + 40, 40)
  doc.setTextColor(...colors.textLight)
  doc.setFontSize(32)
  setF('bold')
  doc.text(processRTLText(t.contactTitle, lang), pageWidth / 2, 55, { align: 'center' })
  doc.setDrawColor(...colors.goldAccent)
  doc.setLineWidth(0.8)
  doc.line(pageWidth / 2 - 35, 63, pageWidth / 2 + 35, 63)
  doc.setFontSize(11)
  setF('italic')
  doc.setTextColor(...colors.secondaryAccent)
  doc.text(processRTLText(t.contactSubtitle, lang), pageWidth / 2, 73, { align: 'center' })

  let yPos = 90
  doc.setFontSize(13); setF('bold'); doc.setTextColor(...colors.goldAccent)
  doc.text(processRTLText(t.whatsappTitle, lang), pageWidth / 2, yPos, { align: 'center' })
  yPos += 10
  doc.setFontSize(16); setF('bold'); doc.setTextColor(...colors.textLight)
  doc.textWithLink(processRTLText(t.whatsappNumber, lang), pageWidth / 2, yPos, { align: 'center', url: 'https://wa.me/+6289513957752' })
  yPos += 8
  doc.setFontSize(9); setF('normal'); doc.setTextColor(...colors.secondaryAccent)
  doc.text(processRTLText(t.whatsappHours, lang), pageWidth / 2, yPos, { align: 'center' })
  yPos += 5
  doc.text(processRTLText(t.whatsappResponse, lang), pageWidth / 2, yPos, { align: 'center' })
  yPos += 15
  doc.setFontSize(13); setF('bold'); doc.setTextColor(...colors.goldAccent)
  doc.text(processRTLText(t.emailTitle, lang), pageWidth / 2, yPos, { align: 'center' })
  yPos += 10
  doc.setFontSize(13); setF('bold'); doc.setTextColor(...colors.textLight)
  doc.textWithLink(processRTLText(t.emailGeneral, lang), pageWidth / 2, yPos, { align: 'center', url: 'mailto:hello@naturraextal.com' })
  yPos += 7
  doc.textWithLink(processRTLText(t.emailSales, lang), pageWidth / 2, yPos, { align: 'center', url: 'mailto:hello@naturraextal.com' })
  yPos += 8
  doc.setFontSize(9); setF('normal'); doc.setTextColor(...colors.secondaryAccent)
  doc.text(processRTLText(t.emailNote, lang), pageWidth / 2, yPos, { align: 'center' })
  yPos += 15
  doc.setFontSize(13); setF('bold'); doc.setTextColor(...colors.goldAccent)
  doc.text(processRTLText(t.addressTitle, lang), pageWidth / 2, yPos, { align: 'center' })
  yPos += 10
  doc.setFontSize(11); setF('bold'); doc.setTextColor(...colors.textLight)
  doc.textWithLink(processRTLText(t.addressFull1, lang), pageWidth / 2, yPos, { align: 'center', url: 'https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9' })
  yPos += 6
  setF('normal')
  doc.textWithLink(processRTLText(t.addressFull2, lang), pageWidth / 2, yPos, { align: 'center', url: 'https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9' })
  yPos += 6
  doc.textWithLink(processRTLText(t.addressFull3, lang), pageWidth / 2, yPos, { align: 'center', url: 'https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9' })
  yPos += 6
  doc.textWithLink(processRTLText(t.addressFull4, lang), pageWidth / 2, yPos, { align: 'center', url: 'https://maps.app.goo.gl/ABqcrJ4Wv864RrjT9' })
  yPos += 8
  doc.setFontSize(9); setF('italic'); doc.setTextColor(...colors.secondaryAccent)
  doc.text(processRTLText(t.addressNote, lang), pageWidth / 2, yPos, { align: 'center' })
  yPos += 15
  doc.setFontSize(15); setF('bold'); doc.setTextColor(...colors.goldAccent)
  doc.textWithLink(processRTLText(t.website, lang), pageWidth / 2, yPos, { align: 'center', url: 'https://naturraextal.com' })
  yPos += 15
  doc.setDrawColor(...colors.goldAccent); doc.setLineWidth(1)
  doc.line(pageWidth / 2 - 40, yPos, pageWidth / 2 + 40, yPos)
  yPos += 10
  doc.setFontSize(9); setF('normal'); doc.setTextColor(...colors.textLight)
  doc.text(processRTLText(t.workshopSize, lang), pageWidth / 2, yPos, { align: 'center' })
  yPos += 5
  doc.text(processRTLText(t.projectDone, lang), pageWidth / 2, yPos, { align: 'center' })
  yPos += 5
  doc.text(processRTLText(t.exportExp, lang), pageWidth / 2, yPos, { align: 'center' })
  doc.setFontSize(8); doc.setTextColor(...colors.textMuted)
  doc.text(processRTLText(t.copyright, lang), pageWidth / 2, 280, { align: 'center' })
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PDF GENERATION FUNCTION
// ══════════════════════════════════════════════════════════════════════════════

export const generateCatalog = async (preferredLanguage?: 'id' | 'en' | 'ar' | 'zh' | 'ja' | 'es' | 'fr' | 'ko') => {
  const MAX_GENERATION_TIME = 120000
  const generationPromise = (async () => {
    await loadPDFDependencies()
    const lang = preferredLanguage || getLanguagePreference()

    // Dynamic import to avoid Rollup stack overflow with massive translation objects
    let t: any;
    try {
      const langModule = await import(`./translations/${lang}.ts`);
      t = langModule[lang];
    } catch (importError) {
      console.error(`[PDF] Failed to load translation module for ${lang}:`, importError);
      throw new Error(`Failed to load translation data for ${lang}. Please try again.`);
    }

    if (!t) throw new Error(`No content for language: ${lang}`)

    const doc = new jsPDF('p', 'mm', 'a4')
    const fontResult = await prepareLanguageFont(doc, lang)
    const baseFontFamily = fontResult.family
    const hasStyles = fontResult.hasStyles

    const setF = (style: 'normal' | 'bold' | 'italic' | 'bolditalic' = 'normal') => {
      doc.setFont(baseFontFamily, hasStyles ? style : 'normal')
    }

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const colors = {
      primaryDark: [26, 35, 46], primaryAccent: [139, 115, 85], secondaryAccent: [190, 171, 153],
      textLight: [255, 255, 255], textDark: [44, 62, 80], textMuted: [120, 120, 120],
      goldAccent: [184, 134, 11], backgroundLight: [248, 248, 248], lineAccent: [200, 200, 200],
    }

    const opt: DrawOptions = { doc, t, lang, colors, pageWidth, pageHeight, setF, margin: 22 }
    let currentPg = 1
    const pgRef = { current: currentPg }

    drawCoverPage(opt)
    currentPg++; drawWelcomePage(opt, currentPg)
    currentPg++; drawWhyChooseTitle(opt, currentPg)
    drawMaterialExcellence(opt, pgRef)
    await drawProductPages(opt, pgRef)
    pgRef.current++; drawPricingAndLogistics(opt, pgRef.current)
    pgRef.current++; drawContactPage(opt, pgRef.current)

    const fileNames: Record<string, string> = {
      id: 'Katalog-Naturra-Extal-2025.pdf', en: 'Naturra-Extal-Catalog-2025.pdf',
      ar: 'Naturra-Extal-Catalog-2025-AR.pdf', zh: 'Naturra-Extal-Catalog-2025-ZH.pdf',
      ja: 'Naturra-Extal-Catalog-2025-JA.pdf', es: 'Naturra-Extal-Catalog-2025-ES.pdf',
      fr: 'Naturra-Extal-Catalog-2025-FR.pdf', ko: 'Naturra-Extal-Catalog-2025-KO.pdf'
    }
    doc.save(fileNames[lang] || 'Naturra-Extal-Catalog-2025.pdf')
  })()

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Catalog generation timeout')), MAX_GENERATION_TIME)
  })

  return await Promise.race([generationPromise, timeoutPromise])
}
