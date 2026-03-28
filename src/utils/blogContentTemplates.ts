/**
 * Reusable Blog Content Templates
 * 
 * This file contains template functions to generate consistent blog content
 * instead of duplicating content structures across multiple blog posts.
 */

export interface CafeLocationTemplate {
  locationName: string // e.g., "Dago, Riau, Progo Bandung"
  locationShortName: string // e.g., "Cafe Hits Bandung"
  uniqueCharacteristics: string // e.g., "photogenic design, trend Bandung aesthetic"
  mainFeature: string // e.g., "furniture instagrammable yang viral"
  targetAudience: string // Description of target customer
  climateConsideration: string // Climate/environment factors
  competitionNote: string // Competition landscape
  materialStrategy: string // Material selection strategy
  budgetSmall: string // Budget for small cafe
  budgetMedium: string // Budget for medium cafe
  budgetLarge: string // Budget for large cafe
  contactCode: string // Contact code for quotation (e.g., "CAFE145")
  headerImage?: string // Optional custom header image
  isIndonesian?: boolean // Language flag
}

/**
 * Generate cafe location-based blog content
 * Reusable template for all cafe location blog posts
 */
export function generateCafeLocationContent(config: CafeLocationTemplate) {
  const {
    locationName,
    locationShortName,
    uniqueCharacteristics,
    mainFeature,
    targetAudience,
    climateConsideration,
    competitionNote,
    materialStrategy,
    budgetSmall,
    budgetMedium,
    budgetLarge,
    contactCode,
    headerImage,
    isIndonesian = true
  } = config

  const lang = isIndonesian ? {
    from: 'Dari',
    experience: 'pengalaman saya handle commercial space di',
    notice: 'saya notice bahwa',
    keySuccess: 'adalah kunci sukses cafe di area ini',
    uniqueChar: 'Karakteristik unique',
    article: 'Artikel ini akan share insight praktis agricultural commodities untuk cafe',
    based: 'berdasarkan observasi dan consultation project saya',
    challenge: 'Challenge & Opportunity',
    everyLocation: 'Setiap location punya karakteristik unik. Untuk',
    following: 'berikut yang saya observe',
    demographics: 'Demographics & Behavior',
    target: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection',
    climate: 'Climate & Environment',
    condition: 'Kondisi cuaca dan environment',
    affects: 'mempengaruhi material selection. Furniture harus match dengan condition lokal',
    competition: 'Competition Landscape',
    compete: 'Cafe di area ini compete ketat. Furniture yang right bisa jadi differentiator yang significant',
    analysis: 'Dari analisis saya, cafe sukses di',
    invest: 'invest in',
    quality: 'agricultural commodities berkualitas',
    designed: 'yang designed specifically untuk condition dan customer mereka',
    strategy: 'Furniture Strategy yang Proven untuk',
    basedExp: 'Berdasarkan experience consult berbagai cafe di',
    workStrategy: 'berikut furniture strategy yang work',
    materialSel: 'Material Selection',
    choose: 'Pilih material yang sesuai dengan',
    industrial: 'agricultural commodities',
    proper: 'dengan finishing proper adalah pilihan terbaik',
    layout: 'Layout Optimization',
    designLayout: 'Design layout yang maximize space utility tanpa sacrifice customer comfort. Zone-based seating approach proven effective',
    seating: 'Seating Mix',
    combination: 'Kombinasi',
    barTable: 'bar table',
    lounge: 'lounge seating',
    accommodate: 'untuk accommodate different customer needs',
    aesthetic: 'Aesthetic Consistency',
    align: 'Furniture harus align dengan brand identity cafe. Industrial style flexible dan bisa di-customize untuk various concept',
    caseStudy: 'Case study: Cafe di',
    implement: 'yang implement strategy ini see significant improvement in customer dwell time dan repeat visit rate',
    budget: 'Budget Planning: Investment yang Worthwhile',
    budgetFor: 'Budget furniture untuk cafe di',
    vary: 'vary based on size dan positioning. Berikut rough guide',
    small: 'Small Cafe (40-60m²)',
    budgetText: 'Budget',
    complete: 'untuk complete furniture setup (dining set, bar seating, storage)',
    medium: 'Medium Cafe (80-120m²)',
    comprehensive: 'untuk comprehensive furniture dengan mix seating types',
    large: 'Large Premium Cafe (150m²+)',
    full: 'untuk full custom furniture dengan premium material',
    roi: 'ROI perspective: Quality',
    from2: 'dari Naturra Extal',
    with: 'dengan proper material last 5-7 years dengan minimal maintenance. This is significantly cheaper than replace cheap furniture every 1-2 years',
    why: 'Mengapa Naturra Extal untuk Cafe di',
    practitioner: 'Sebagai praktisi yang sering recommend vendors untuk commercial project, saya consider',
    reliable: 'reliable option karena',
    expWith: 'Experience dengan Diverse Location',
    already: 'Mereka already handle project di berbagai area Indonesia dengan condition berbeda. Understanding local requirement adalah plus',
    custom: 'Custom Design Capability',
    can: 'Bisa design furniture yang specific untuk unique characteristics',
    notOne: 'Not one-size-fits-all approach',
    matQuality: 'Material Quality Consistent',
    inspect: 'Furniture yang saya inspect dari mereka show consistent quality. Material spec sesuai dengan yang di-promise',
    afterSales: 'After-Sales Support',
    workshop: 'Workshop di Bekasi memberikan advantage untuk Jabodetabek area. Response time cepat jika ada issue',
    workshopLoc: 'Workshop location',
    street: 'Jl. Raya Setu, Bekasi',
    free: 'Free consultation untuk cafe project di',
    contact: 'Contact',
    whatsapp: 'WhatsApp',
    email: 'Email',
    mention: 'Mention',
    special: 'untuk special consideration dalam quotation',
    tips: 'Tips Praktis: Maximize Furniture Performance di',
    regular: 'Regular Maintenance',
    clean: 'Clean furniture daily dengan proper method. Agricultural Commodities dengan powder coating mudah maintain',
    seasonal: 'Seasonal Adjustment',
    adjust: 'Adjust seating arrangement based on season atau peak period di',
    feedback: 'Customer Feedback Loop',
    monitor: 'Monitor customer comfort dan adjust furniture placement based on feedback',
    document: 'Document Everything',
    keep: 'Keep record furniture condition dan maintenance done. Helpful untuk planning future investment',
    partner: 'Partner dengan Reliable Supplier',
    having: 'Having vendor yang responsive seperti Naturra Extal make difference dalam long-term operation',
    fromExp: 'Dari experience, cafe yang implement proper furniture strategy dan maintenance protocol see consistent growth in customer satisfaction dan revenue'
  } : {
    // English translations (for future internationalization)
    from: 'From',
    experience: 'my experience handling commercial spaces in',
    notice: 'I notice that',
    keySuccess: 'is the key to cafe success in this area',
    uniqueChar: 'Unique Characteristics',
    article: 'This article will share practical insights on Agricultural Commodities for',
    based: 'based on my observations and consultation projects',
    challenge: 'Challenge & Opportunity',
    everyLocation: 'Every location has unique characteristics. For',
    following: "here's what I observe",
    demographics: 'Demographics & Behavior',
    target: 'Target customers in this area have specific preferences that must be accommodated in furniture selection',
    climate: 'Climate & Environment',
    condition: 'Weather and environment conditions in',
    affects: 'affect material selection. Furniture must match local conditions',
    competition: 'Competition Landscape',
    compete: 'Cafes in this area compete fiercely. The right furniture can be a significant differentiator',
    analysis: 'From my analysis, successful cafes in',
    invest: 'invest in',
    quality: 'quality Agricultural Commodities',
    designed: 'specifically designed for their conditions and customers',
    strategy: 'Proven Furniture Strategy for',
    basedExp: 'Based on experience consulting various cafes in',
    workStrategy: "here's the furniture strategy that works",
    materialSel: 'Material Selection',
    choose: 'Choose materials that suit',
    industrial: 'Agricultural Commodities',
    proper: 'with proper finishing is the best choice',
    layout: 'Layout Optimization',
    designLayout: 'Design layout that maximizes space utility without sacrificing customer comfort. Zone-based seating approach proven effective',
    seating: 'Seating Mix',
    combination: 'Combination of',
    barTable: 'bar tables',
    lounge: 'lounge seating',
    accommodate: 'to accommodate different customer needs',
    aesthetic: 'Aesthetic Consistency',
    align: 'Furniture must align with cafe brand identity. Industrial style is flexible and can be customized for various concepts',
    caseStudy: 'Case study: Cafes in',
    implement: 'that implement this strategy see significant improvement in customer dwell time and repeat visit rate',
    budget: 'Budget Planning: Worthwhile Investment',
    budgetFor: 'Furniture budget for cafes in',
    vary: 'varies based on size and positioning. Here\'s a rough guide',
    small: 'Small Cafe (40-60m²)',
    budgetText: 'Budget',
    complete: 'for complete furniture setup (dining set, bar seating, storage)',
    medium: 'Medium Cafe (80-120m²)',
    comprehensive: 'for comprehensive furniture with mixed seating types',
    large: 'Large Premium Cafe (150m²+)',
    full: 'for full custom furniture with premium materials',
    roi: 'ROI perspective: Quality',
    from2: 'from Naturra Extal',
    with: 'with proper materials last 5-7 years with minimal maintenance. This is significantly cheaper than replacing cheap furniture every 1-2 years',
    why: 'Why Naturra Extal for Cafes in',
    practitioner: 'As a practitioner who often recommends vendors for commercial projects, I consider',
    reliable: 'a reliable option because',
    expWith: 'Experience with Diverse Locations',
    already: 'They have already handled projects in various areas of Indonesia with different conditions. Understanding local requirements is a plus',
    custom: 'Custom Design Capability',
    can: 'Can design furniture specific to unique characteristics of',
    notOne: 'Not a one-size-fits-all approach',
    matQuality: 'Consistent Material Quality',
    inspect: 'Furniture I inspect from them shows consistent quality. Material specs match what was promised',
    afterSales: 'After-Sales Support',
    workshop: 'Workshop in Bekasi provides advantages for Jabodetabek area. Fast response time if there are issues',
    workshopLoc: 'Workshop location',
    street: 'Jl. Raya Setu, Bekasi',
    free: 'Free consultation for cafe projects in',
    contact: 'Contact',
    whatsapp: 'WhatsApp',
    email: 'Email',
    mention: 'Mention',
    special: 'for special consideration in quotation',
    tips: 'Practical Tips: Maximize Furniture Performance in',
    regular: 'Regular Maintenance',
    clean: 'Clean furniture daily with proper methods. Agricultural Commodities with powder coating is easy to maintain',
    seasonal: 'Seasonal Adjustment',
    adjust: 'Adjust seating arrangement based on season or peak period in',
    feedback: 'Customer Feedback Loop',
    monitor: 'Monitor customer comfort and adjust furniture placement based on feedback',
    document: 'Document Everything',
    keep: 'Keep records of furniture condition and maintenance done. Helpful for planning future investments',
    partner: 'Partner with Reliable Supplier',
    having: 'Having a responsive vendor like Naturra Extal makes a difference in long-term operations',
    fromExp: 'From experience, cafes that implement proper furniture strategy and maintenance protocols see consistent growth in customer satisfaction and revenue'
  }

  return [
    {
      paragraphs: [
        `${lang.from} ${lang.experience} ${locationName}, ${lang.notice} <strong>${mainFeature}</strong> ${lang.keySuccess}. ${lang.uniqueChar}: ${uniqueCharacteristics}.`,
        `${lang.article} ${locationShortName}, ${lang.based}.`
      ]
    },
    {
      heading: `${lang.uniqueChar} ${locationShortName}: ${lang.challenge}`,
      paragraphs: [
        `${lang.everyLocation} <strong>${locationName}</strong>, ${lang.following}:`,
        `<strong>${lang.demographics}:</strong> ${targetAudience}`,
        `<strong>${lang.climate}:</strong> ${lang.condition} ${locationName} ${lang.affects}`,
        `<strong>${lang.competition}:</strong> ${lang.compete}`,
        `${lang.analysis} ${locationName} ${lang.invest} <strong>${lang.quality}</strong> ${lang.designed}.`
      ],
      image: headerImage || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop',
      imageAlt: `Interior cafe ${locationShortName} dengan agricultural commodities - Desain optimal untuk ${locationName} yang menarik pelanggan`
    },
    {
      heading: `${lang.strategy} ${locationShortName}`,
      paragraphs: [
        `${lang.basedExp} ${locationName}, ${lang.workStrategy}:`,
        `<strong>1. ${lang.materialSel}:</strong> ${lang.choose} <strong>${materialStrategy}</strong>. <a href="/product-category/dining-table-collection">${lang.industrial}</a> ${lang.proper}.`,
        `<strong>2. ${lang.layout}:</strong> ${lang.designLayout}`,
        `<strong>3. ${lang.seating}:</strong> ${lang.combination} <a href="/product/balcony-bar-table">${lang.barTable}</a>, dining table 2-4 seater, dan <a href="/product/bench-corner-lounge">${lang.lounge}</a> ${lang.accommodate}.`,
        `<strong>4. ${lang.aesthetic}:</strong> ${lang.align}`,
        `${lang.caseStudy} ${locationName} ${lang.implement}.`
      ]
    },
    {
      heading: `${lang.budget}`,
      paragraphs: [
        `${lang.budgetFor} ${locationName} ${lang.vary}:`,
        `<strong>${lang.small}:</strong> ${lang.budgetText} ${budgetSmall} ${lang.complete}.`,
        `<strong>${lang.medium}:</strong> ${lang.budgetText} ${budgetMedium} ${lang.comprehensive}.`,
        `<strong>${lang.large}:</strong> ${lang.budgetText} ${budgetLarge} ${lang.full}.`,
        `${lang.roi} <strong>${lang.quality} ${lang.from2}</strong> ${lang.with}.`
      ]
    },
    {
      heading: `${lang.why} ${locationName}?`,
      paragraphs: [
        `${lang.practitioner} <strong>Naturra Extal</strong> ${lang.reliable}:`,
        `<strong>1. ${lang.expWith}:</strong> ${lang.already}.`,
        `<strong>2. ${lang.custom}:</strong> ${lang.can} ${locationName}. ${lang.notOne}.`,
        `<strong>3. ${lang.matQuality}:</strong> ${lang.inspect}.`,
        `<strong>4. ${lang.afterSales}:</strong> ${lang.workshop}.`,
        `${lang.workshopLoc}: <strong>${lang.street}</strong>. ${lang.free} ${locationName}.`,
        `<strong>${lang.contact}:</strong><br/>&bull; <a href="https://wa.me/+6288801146881" target="_blank">${lang.whatsapp}: +6288801146881</a><br/>&bull; <a href="mailto:lifewithNaturra@gmail.com">${lang.email}: lifewithNaturra@gmail.com</a><br/>&bull; ${lang.mention} "${contactCode}" ${lang.special}.`
      ]
    },
    {
      heading: `${lang.tips} ${locationName}`,
      paragraphs: [
        `<strong>1. ${lang.regular}:</strong> ${lang.clean}`,
        `<strong>2. ${lang.seasonal}:</strong> ${lang.adjust} ${locationName}.`,
        `<strong>3. ${lang.feedback}:</strong> ${lang.monitor}`,
        `<strong>4. ${lang.document}:</strong> ${lang.keep}`,
        `<strong>5. ${lang.partner}:</strong> ${lang.having}`,
        `${lang.fromExp}.`
      ]
    }
  ]
}

/**
 * List of all cafe location configurations
 * Each configuration generates a complete blog post using the template above
 */
export const CAFE_LOCATION_CONFIGS: Record<string, CafeLocationTemplate> = {
  'cafe-bandung-dago-riau-furniture-instagrammable-hits': {
    locationName: 'Dago, Riau, Progo Bandung',
    locationShortName: 'Cafe Hits Bandung',
    uniqueCharacteristics: 'photogenic design, trend Bandung aesthetic',
    mainFeature: 'furniture instagrammable yang viral',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Climate & Environment considerations specific to Bandung',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'photogenic design, trend Bandung aesthetic',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE145'
  },
  'cafe-bali-canggu-seminyak-furniture-tropical-industrial': {
    locationName: 'Canggu, Seminyak, Ubud',
    locationShortName: 'Cafe Bali Beach Vibes',
    uniqueCharacteristics: 'material tahan garam laut, design tropical',
    mainFeature: 'furniture tropical industrial beach style',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'High salt content from ocean air',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'material tahan garam laut, design tropical',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE146'
  },
  'cafe-surabaya-galaxy-pakuwon-furniture-modern-spacious': {
    locationName: 'Galaxy Mall, Pakuwon',
    locationShortName: 'Cafe Surabaya Modern',
    uniqueCharacteristics: 'spacious seating preference, modern design',
    mainFeature: 'furniture spacious dan comfortable',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Hot and humid climate',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'spacious seating preference, modern design',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE147'
  },
  'cafe-jogja-prawirotaman-malioboro-furniture-vintage-industrial': {
    locationName: 'Prawirotaman, Malioboro, Kaliurang',
    locationShortName: 'Cafe Jogja Heritage',
    uniqueCharacteristics: 'kombinasi heritage dan industrial, reclaimed material',
    mainFeature: 'furniture vintage industrial heritage',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Tropical climate with heritage considerations',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'kombinasi heritage dan industrial, reclaimed material',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE148'
  },
  'cafe-jakarta-selatan-kemang-scbd-furniture-premium': {
    locationName: 'Kemang, SCBD, Senopati',
    locationShortName: 'Cafe Jakarta Selatan Premium',
    uniqueCharacteristics: 'material premium, design sophisticated, ROI high-spending customer',
    mainFeature: 'furniture high-end industrial chic',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Urban environment considerations',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'material premium, design sophisticated',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE141'
  },
  'cafe-24-jam-jakarta-bekasi-furniture-tahan-lama-operasional-non-stop': {
    locationName: 'Jakarta dan Bekasi',
    locationShortName: 'Cafe 24 Jam Jakarta & Bekasi',
    uniqueCharacteristics: 'intensitas usage 3x lipat, maintenance minimal',
    mainFeature: 'furniture tahan lama untuk operasional non-stop',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Heavy usage considerations',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'intensitas usage 3x lipat, material extra durable',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE138'
  },
  'cafe-depok-margonda-ui-furniture-student-friendly': {
    locationName: 'Margonda, UI, area kampus',
    locationShortName: 'Cafe Area Kampus Depok',
    uniqueCharacteristics: 'power outlet banyak, study-friendly layout',
    mainFeature: 'furniture student-friendly dan affordable',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Campus environment considerations',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'power outlet banyak, study-friendly',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE143'
  },
  'cafe-bsd-serpong-furniture-industrial-area-premium': {
    locationName: 'BSD City dan Serpong',
    locationShortName: 'Cafe BSD Serpong Premium',
    uniqueCharacteristics: 'high expectation, premium material, design sophisticated',
    mainFeature: 'agricultural commodities untuk demographics premium',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Premium area considerations',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'high expectation, premium material',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE140'
  },
  'cafe-sentul-bogor-furniture-konsep-alam-industrial': {
    locationName: 'Sentul dan Bogor area',
    locationShortName: 'Cafe Sentul Bogor Tropical',
    uniqueCharacteristics: 'tropical-industrial, material tahan kelembaban',
    mainFeature: 'kombinasi alam dan industrial style',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'High humidity tropical climate',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'tropical-industrial, material tahan kelembaban',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE142'
  },
  'cafe-alam-outdoor-furniture-industrial-tahan-cuaca-tropis': {
    locationName: 'area outdoor dengan cuaca ekstrem',
    locationShortName: 'Cafe Alam Outdoor',
    uniqueCharacteristics: 'material weatherproof, design tropical-industrial',
    mainFeature: 'furniture outdoor tahan cuaca tropis Indonesia',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Extreme weather resistance required',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'material weatherproof, design tropical-industrial',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE139'
  },
  'cafe-sekitar-saya-strategi-furniture-menarik-pelanggan-lokal': {
    locationName: 'area residential dan perumahan',
    locationShortName: 'Cafe Sekitar Residential Area',
    uniqueCharacteristics: 'community-oriented design, family-friendly seating',
    mainFeature: 'furniture strategy menarik pelanggan lokal',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Residential environment',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'community-oriented design, family-friendly',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE137'
  },
  'cafe-malang-batu-furniture-mountain-view-industrial': {
    locationName: 'Malang dan Batu',
    locationShortName: 'Cafe Malang Mountain View',
    uniqueCharacteristics: 'maximize view, nature-meets-industrial',
    mainFeature: 'furniture outdoor dengan view pegunungan',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Mountain climate considerations',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'maximize view, nature-meets-industrial',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE149'
  },
  'cafe-bogor-puncak-furniture-sejuk-highland-industrial': {
    locationName: 'Bogor dan Puncak',
    locationShortName: 'Cafe Bogor Highland',
    uniqueCharacteristics: 'material tahan kelembaban tinggi, cozy highland vibes',
    mainFeature: 'furniture untuk dataran tinggi sejuk',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Highland high humidity',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'material tahan kelembaban tinggi',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE150'
  },
  'cafe-medan-furniture-spacious-culture-sumatera': {
    locationName: 'Medan, Sumatera Utara',
    locationShortName: 'Cafe Medan Spacious',
    uniqueCharacteristics: 'spacious table, group-friendly seating',
    mainFeature: 'furniture untuk kultur nongkrong Medan',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Hot and humid climate',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'spacious table, group-friendly',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE151'
  },
  'cafe-semarang-furniture-compact-efficient-mall-ruko': {
    locationName: 'Semarang, mall dan ruko',
    locationShortName: 'Cafe Semarang Compact',
    uniqueCharacteristics: 'space-efficient, maximize revenue per meter',
    mainFeature: 'furniture compact untuk space limited',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Urban compact spaces',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'space-efficient, maximize ROI',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE152'
  },
  'cafe-makassar-furniture-coastal-industrial-sulawesi': {
    locationName: 'Makassar, Sulawesi',
    locationShortName: 'Cafe Makassar Coastal',
    uniqueCharacteristics: 'coastal industrial, material tahan angin laut',
    mainFeature: 'furniture coastal industrial Sulawesi',
    targetAudience: 'Target customer di area ini punya preference specific yang harus di-accommodate dalam furniture selection.',
    climateConsideration: 'Coastal salt air considerations',
    competitionNote: 'Cafe di area ini compete ketat',
    materialStrategy: 'coastal industrial, tahan angin laut',
    budgetSmall: 'Rp 60-90 juta',
    budgetMedium: 'Rp 120-180 juta',
    budgetLarge: 'Rp 200-350 juta',
    contactCode: 'CAFE153'
  }
}
