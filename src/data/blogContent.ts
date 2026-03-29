import type { BlogPost } from './blog'
import { BLOG_POSTS } from './blog'

export interface BlogSection {
  heading?: string
  paragraphs?: string[]
  image?: string
  imageAlt?: string
  imageSearchQuery?: string
  list?: string[]
  productId?: number
}

export interface BlogContent {
  slug: string
  sections: BlogSection[]
}

const STOP_WORDS = new Set([
  '', 'dan', 'yang', 'untuk', 'dengan', 'atau', 'para', 'dari', 'pada', 'kami', 'anda',
  'Naturra', 'extal', 'commodity', 'trading', 'export', 'smeter', '2025'
])

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)


const detectLocationSentence = (post: BlogPost, isEnglish = false) => {
  const regions = ['Sulawesi', 'Sumatra', 'Java', 'Maluku', 'Surabaya', 'Medan', 'Makassar']
  const found = post.slug.split('-').find(token => regions.some(r => r.toLowerCase() === token.toLowerCase()))

  if (!found) {
    return isEnglish
      ? 'Naturra Extal sources premium commodities from across the Indonesian archipelago, from Northern Sulawesi to Sumatra.'
      : 'Naturra Extal memasok komoditas premium dari seluruh kepulauan Indonesia, mulai dari Sulawesi Utara hingga Sumatra.'
  }
  return isEnglish
    ? `We maintain strong partnerships with farmers in the ${capitalize(found)} region to ensure consistent supply and quality.`
    : `Kami menjaga kemitraan kuat dengan petani di wilayah ${capitalize(found)} untuk memastikan pasokan dan kualitas yang konsisten.`
}

const generateAIOptimizedFAQ = (post: BlogPost, isEnglish = false): string[] => {
  const categoryFAQs: { [key: string]: { id: string[]; en: string[] } } = {
    'Trade & Sourcing': {
      id: [
        '<strong>Bagaimana Naturra Extal memastikan kualitas bubuk kakao?</strong><br/>Setiap batch bubuk kakao kami (HS 1805 & 1806) melalui uji lab internal untuk kadar lemak, pH, dan kehalusan partikel sesuai standar COA (Certificate of Analysis).',
        '<strong>Apakah tersedia pengiriman LCL untuk cocopeat?</strong><br/>Biasanya kami merekomendasikan FCL (Full Container Load) untuk efisiensi biaya, namun kami bisa mengakomodasi pengiriman parsial untuk kebutuhan sampel industri.',
        '<strong>Berapa kadar eugenol dalam cengkeh Anda?</strong><br/>Cengkeh Grade A kami dari Sulawesi Utara secara konsisten memiliki kadar eugenol di atas 70%, ideal untuk industri farmasi dan rokok.'
      ],
      en: [
        '<strong>How does Naturra Extal ensure cocoa powder quality?</strong><br/>Every batch of our cocoa powder (HS 1805 & 1806) undergoes internal lab testing for fat content, pH, and particle fineness according to COA standards.',
        '<strong>Is LCL shipping available for cocopeat?</strong><br/>While we recommend FCL for cost efficiency, we can accommodate partial shipments for industrial sampling needs.',
        '<strong>What is the eugenol content in your cloves?</strong><br/>Our Grade A cloves from North Sulawesi consistently feature eugenol levels above 70%, ideal for pharmaceutical and industrial use.'
      ]
    }
  }

  const defaultFAQ = {
    id: [
      '<strong>Mengapa memilih Naturra Extal sebagai mitra dagang?</strong><br/>Kami memiliki akses langsung ke petani di wilayah sumber utama, memastikan harga kompetitif dan rantai pasokan yang transparan tanpa perantara berlebihan.',
      '<strong>Berapa waktu tunggu (lead time) standar untuk ekspor?</strong><br/>Lead time standar adalah 14-25 hari setelah konfirmasi deposit, tergantung pada jenis komoditas dan jadwal kapal dari Jakarta atau Surabaya.'
    ],
    en: [
      '<strong>Why choose Naturra Extal as a trading partner?</strong><br/>We have direct access to farmers in key sourcing regions, ensuring competitive pricing and a transparent supply chain without unnecessary middlemen.',
      '<strong>What is the standard lead time for exports?</strong><br/>Standard lead time is 14-25 days after deposit confirmation, depending on the commodity type and vessel schedules from Jakarta or Surabaya.'
    ]
  }

  const categoryEntry = categoryFAQs[post.category] || defaultFAQ
  return isEnglish ? categoryEntry.en : categoryEntry.id
}

const generateDataDrivenSection = (isEnglish = false): BlogSection => {
  return {
    heading: isEnglish ? 'Indonesian Commodity Data & Market Insights' : 'Data Komoditas Indonesia & Wawasan Pasar',
    paragraphs: isEnglish
      ? ['Naturra Extal leverages the latest market data to provide premium sourcing solutions:']
      : ['Naturra Extal menggunakan data pasar terbaru untuk memberikan solusi pengadaan premium:'],
    list: isEnglish
      ? [
        '<strong>Cocoa Output:</strong> Indonesia is a top 3 global producer; we source from Sulawesi for the highest yield.',
        '<strong>Clove Purity:</strong> 99% purity guaranteed for our Lal Pari grade cloves.',
        '<strong>Sustainable Logistics:</strong> 85% of our shipments are processed through eco-friendly supply chain protocols.'
      ]
      : [
        '<strong>Produksi Kakao:</strong> Indonesia adalah produsen 3 besar dunia; kami memasok dari Sulawesi untuk hasil terbaik.',
        '<strong>Kemurnian Cengkeh:</strong> Jaminan kemurnian 99% untuk cengkeh grade Lal Pari kami.',
        '<strong>Logistik Berkelanjutan:</strong> 85% pengiriman kami diproses melalui protokol rantai pasok ramah lingkungan.'
      ]
  }
}

const createFallbackContent = (post: BlogPost): BlogContent => {
  const isEnglishPost = post.title.split(' ').length > 3 && !/[aiueo]/.test(post.title.toLowerCase()) // Simplistic check or just default to check category
  const introExcerpt = post.excerpt || (isEnglishPost ? 'Expert insights on international agricultural commodity trading.' : 'Wawasan ahli tentang perdagangan komoditas pertanian internasional.')

  return {
    slug: post.slug,
    sections: [
      {
        paragraphs: [
          introExcerpt,
          isEnglishPost
            ? `<strong>Overview:</strong> This professional guide explores ${post.title.toLowerCase()} from the perspective of an Indonesian exporter.`
            : `<strong>Tinjauan:</strong> Panduan profesional ini mengeksplorasi ${post.title.toLowerCase()} dari perspektif eksportir Indonesia.`,
          detectLocationSentence(post, isEnglishPost)
        ]
      },
      generateDataDrivenSection(isEnglishPost),
      {
        heading: isEnglishPost ? 'Key FAQ' : 'Pertanyaan Umum',
        list: generateAIOptimizedFAQ(post, isEnglishPost)
      }
    ]
  }
}

export const BLOG_CONTENTS: BlogContent[] = BLOG_POSTS.map(post => createFallbackContent(post))

export const getBlogPostContentLocalized = (slug: string, _language: string) => {
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return undefined;
  // For now, fallback to generated content since we purged hand-written furniture blogs
  return createFallbackContent(post);
};
